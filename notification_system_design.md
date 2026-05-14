# Notification System Design

This project currently uses in-memory data for learning and prototyping.

## Why Notification Systems Need Databases

- In-memory data is lost when the server restarts.
- Real apps need persistent history of notifications.
- Multiple app servers need shared storage to stay consistent.
- User-specific notifications require querying by user, status, and time.

## Why Indexing Improves Performance

- A database index is like a book index.
- Without an index, the database scans every row.
- With an index, it can jump directly to matching rows.
- This reduces response time when data grows.

Common useful indexes for notifications:

- user_id
- read_status
- type
- created_at

## Why SELECT * Is Inefficient

- It fetches all columns, even unused ones.
- More data transfer means slower queries.
- It can prevent some query optimizations.

Better approach:

- Select only required columns.

## Simple Optimized Query Examples

Get latest unread notifications for a user:

SELECT id, title, type, created_at
FROM notifications
WHERE user_id = ? AND read_status = false
ORDER BY created_at DESC
LIMIT 20 OFFSET 0;

Filter by type with pagination:

SELECT id, title, message, created_at
FROM notifications
WHERE user_id = ? AND type = ?
ORDER BY created_at DESC
LIMIT 10 OFFSET 20;

## Pagination Explanation

- Pagination returns data in small chunks.
- This avoids loading thousands of rows at once.
- It improves API speed and frontend rendering.
- Typical parameters are page and limit.

Example:

- page = 3, limit = 10 means rows 21 to 30.

## Caching Explanation

- Caching stores frequently requested results in fast memory.
- It reduces repeated database reads.
- Useful for recent notifications or unread counts.
- Cache should expire or refresh after updates.

Simple cache ideas:

- Cache first page of notifications for short time.
- Cache unread count per user.
- Invalidate cache when a notification is marked as read.

## Why Synchronous Notification Sending Is Slow

- In synchronous flow, the API waits until sending is finished.
- If sending takes 2-3 seconds, the user waits 2-3 seconds.
- If provider is slow, API response is also slow.

Pseudocode:

```text
function createNotification(request):
	saveToDatabase(request)
	sendNotification(request)   // API waits here
	return "done"
```

## Why Queues Improve Reliability

- Queue stores jobs even if sender is busy.
- API can respond quickly after putting a job in queue.
- Temporary failures do not lose notifications.

Pseudocode:

```text
function createNotification(request):
	id = saveToDatabase(request)
	queue.push({ notificationId: id })
	return "accepted"
```

## Retry Mechanism Concept

- Sending can fail due to network or provider timeout.
- Retry tries again a few times before marking failed.
- This improves delivery success rate.

Pseudocode:

```text
function processJob(job):
	maxRetries = 3
	while job.attempts < maxRetries:
		ok = trySend(job.notificationId)
		if ok:
			markDelivered(job.notificationId)
			return
		job.attempts = job.attempts + 1
	markFailed(job.notificationId)
```

## Async Processing

- API writes data and returns immediately.
- Background worker handles sending later.
- User sees faster API response.

Pseudocode:

```text
function apiHandler(request):
	id = saveToDatabase(request)
	queue.push({ id: id, attempts: 0 })
	return { status: 202, message: "queued" }
```

## Worker Based Architecture (Simple)

- One API process accepts requests.
- One worker process keeps polling queue.
- Worker sends notifications and updates status.

Pseudocode:

```text
// API side
function onCreate(request):
	id = saveToDatabase(request)
	queue.push({ id: id, attempts: 0 })

// Worker side
function workerLoop():
	while true:
		job = queue.pop()
		if job exists:
			processJob(job)
		sleep(1 second)
```
