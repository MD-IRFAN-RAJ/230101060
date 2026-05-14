let notifications = [
  { id: 1, title: 'Welcome', message: 'Welcome to the notification system', created_at: new Date().toISOString() },
  { id: 2, title: 'Info', message: 'This is a sample notification', created_at: new Date().toISOString() },
  { id: 3, title: 'Alert', message: 'Check this out', created_at: new Date().toISOString() },
];

let nextId = 4;

export function getNotifications() {
  return notifications.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
}

export function addNotification(title, message) {
  const notification = {
    id: nextId++,
    title,
    message,
    created_at: new Date().toISOString(),
  };
  notifications.push(notification);
  return notification;
}
