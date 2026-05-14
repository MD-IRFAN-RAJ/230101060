let notifications = [
  { id: 1, title: 'Welcome', message: 'Welcome', type: 'info', read: false, created_at: new Date().toISOString() },
  { id: 2, title: 'Alert', message: 'System alert', type: 'alert', read: false, created_at: new Date().toISOString() },
  { id: 3, title: 'Success', message: 'Task completed', type: 'success', read: true, created_at: new Date().toISOString() },
  { id: 4, title: 'Warning', message: 'Check this', type: 'warning', read: false, created_at: new Date().toISOString() },
  { id: 5, title: 'Info', message: 'New info', type: 'info', read: true, created_at: new Date().toISOString() },
];

let nextId = 6;

export function getNotifications() {
  return notifications.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
}

export function addNotification(title, message, type = 'info') {
  const notif = {
    id: nextId++,
    title,
    message,
    type,
    read: false,
    created_at: new Date().toISOString(),
  };
  notifications.push(notif);
  return notif;
}

export function updateNotifRead(id, read) {
  const notif = notifications.find(n => n.id === id);
  if (notif) {
    notif.read = read;
    return notif;
  }
  return null;
}
