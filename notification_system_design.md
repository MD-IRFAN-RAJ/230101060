# Notification System

Simple notification app with React frontend and Express backend using mock data.

## Structure

- Backend: Express server with `/api/notifications` endpoint, returns mock notification data
- Frontend: React app that fetches and displays notifications with Material UI
- Logging: Simple Express middleware that logs requests

## Running

Backend:
```
cd notification_app_be
npm install
npm start
```

Frontend:
```
cd notification_app_fe
npm install
npm run dev
```

Visit `http://localhost:5173` after starting both servers.
