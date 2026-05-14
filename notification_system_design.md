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
