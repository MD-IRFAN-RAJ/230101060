let notifications = [
  { id: 1, title: 'Placement Drive', message: 'Interview scheduled', type: 'Placement', read: false, created_at: new Date().toISOString() },
  { id: 2, title: 'Exam Result', message: 'Result published', type: 'Result', read: false, created_at: new Date().toISOString() },
  { id: 3, title: 'Club Event', message: 'Event starts at 5 PM', type: 'Event', read: true, created_at: new Date().toISOString() },
  { id: 4, title: 'Placement Update', message: 'New company added', type: 'Placement', read: false, created_at: new Date().toISOString() },
  { id: 5, title: 'Result Reminder', message: 'Check result portal', type: 'Result', read: true, created_at: new Date().toISOString() },
];

let nextId = 6;

export function getNotifications() {
  return notifications.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
}

export function addNotification(title, message, type = 'Event') {
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
