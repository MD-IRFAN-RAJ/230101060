import { getNotifications, updateNotifRead } from '../data.js';
import { Log } from '../../logging_middleware/logger.js';

export async function getAllNotifs(req, res) {
  try {
    const { type, page = 1, limit = 10 } = req.query;
    let data = getNotifications();

    if (type) {
      data = data.filter(n => n.type === type);
      Log('ctrl:getAllNotifs', 'INFO', 'be', `Filtered by type: ${type}`);
    }

    const start = (page - 1) * limit;
    const paginated = data.slice(start, start + limit);

    res.json({
      total: data.length,
      page: parseInt(page),
      limit: parseInt(limit),
      data: paginated,
    });
  } catch (e) {
    Log('ctrl:getAllNotifs', 'ERROR', 'be', e.message);
    res.status(500).json({ error: 'Server error' });
  }
}

export async function getUnread(req, res) {
  try {
    const { page = 1, limit = 10 } = req.query;
    let data = getNotifications().filter(n => !n.read);

    const start = (page - 1) * limit;
    const paginated = data.slice(start, start + limit);

    Log('ctrl:getUnread', 'INFO', 'be', `Found ${data.length} unread`);
    res.json({
      total: data.length,
      page: parseInt(page),
      limit: parseInt(limit),
      data: paginated,
    });
  } catch (e) {
    Log('ctrl:getUnread', 'ERROR', 'be', e.message);
    res.status(500).json({ error: 'Server error' });
  }
}

export async function markAsRead(req, res) {
  try {
    const { id } = req.params;
    const notif = updateNotifRead(parseInt(id), true);

    if (!notif) {
      Log('ctrl:markAsRead', 'WARN', 'be', `Notif not found: ${id}`);
      return res.status(404).json({ error: 'Not found' });
    }

    Log('ctrl:markAsRead', 'INFO', 'be', `Marked ${id} as read`);
    res.json(notif);
  } catch (e) {
    Log('ctrl:markAsRead', 'ERROR', 'be', e.message);
    res.status(500).json({ error: 'Server error' });
  }
}
