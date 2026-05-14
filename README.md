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


