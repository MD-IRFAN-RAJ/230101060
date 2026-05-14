# Codebase Analysis

## Structure
- **logging_middleware/logger.js** - Centralized logging via axios POST
- **notification_app_be/** - Express backend with REST API
- **notification_app_fe/** - React frontend with Material-UI

## Logger Function
```
Log(stack, level, pkg, msg)
- stack: identifier (e.g., 'App.jsx:fetch')
- level: INFO|WARN|ERROR|DEBUG
- pkg: package name (e.g., 'be'/'fe')
- msg: log message
```

Posts to: `http://4.224.186.213/evaluation-service/logs`
Auth: Bearer token from `.env` (backend only)

## Backend
- **index.js** - Express setup, starts on PORT 4000
- **routes/notifications.js** - GET/POST notification handlers
- **data.js** - In-memory notification store

## Frontend
- **App.jsx** - Main React component, fetch/create notifications
- **utils/logger.js** - Frontend logging client (no auth)
- **components/NotificationList.jsx** - Display notifications

## Dependencies
Backend: express, dotenv, cors, axios
Frontend: react, react-dom, @mui/material, vite, axios

## Usage
Backend: `npm run dev`
Frontend: `npm run dev`
