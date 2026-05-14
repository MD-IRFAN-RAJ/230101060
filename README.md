# Notification System

Simple full-stack app to manage and view notifications.

## Project Overview

- View all notifications
- View priority notifications
- Filter by type
- Mark notifications as read

## Tech Stack

- Frontend: React, Material UI, Axios, Vite
- Backend: Node.js, Express
- Logging: Custom middleware with Axios

## Setup Instructions

1. Open two terminals
2. Start backend first
3. Start frontend next

## Backend Setup

```bash
cd notification_app_be
npm install
npm run dev
```

Backend runs on: http://localhost:4000

## Frontend Setup

```bash
cd notification_app_fe
npm install
npm run dev
```

Frontend runs on: http://localhost:5173

## Logging Middleware Usage

Use Log function:

```js
import { Log } from '../logging_middleware/logger.js';

Log('file:function', 'INFO', 'be', 'Message here');
```

## API Endpoints

- GET /api/notifications
- GET /api/notifications/unread
- PATCH /api/notifications/:id/read
- POST /api/notifications

## Screenshots
<img width="933" height="434" alt="Screenshot 2026-05-14 140759" src="https://github.com/user-attachments/assets/5be65545-3a4d-417b-9633-a9c7afcd6daf" />

###Postman 

<img width="843" height="260" alt="Screenshot 2026-05-14 140731" src="https://github.com/user-attachments/assets/ee930c5f-6080-4d8b-90d3-eacfa3b61a58" />
<img width="892" height="362" alt="Screenshot 2026-05-14 123450" src="https://github.com/user-attachments/assets/a35f3f64-60a5-4d30-8965-e3716e434a2e" />
<img width="833" height="417" alt="Screenshot 2026-05-14 140552" src="https://github.com/user-attachments/assets/76da31c1-3dd7-4c9a-bc84-1fafa3446984" />
<img width="839" height="430" alt="Screenshot 2026-05-14 140616" src="https://github.com/user-attachments/assets/e4a09e6c-a3b5-498f-aa7d-e3f15d535ec3" />
<img width="831" height="412" alt="Screenshot 2026-05-14 140637" src="https://github.com/user-attachments/assets/5a4b8c60-3083-427c-9a83-f188951c858e" />
<img width="846" height="332" alt="Screenshot 2026-05-14 140703" src="https://github.com/user-attachments/assets/8ca91fe2-725a-4e0d-ad59-98c3ebbbe1c4" />
<img width="843" height="260" alt="Screenshot 2026-05-14 140731" src="https://github.com/user-attachments/assets/96668e22-7773-4662-8e11-9d51f43a4f50" />








