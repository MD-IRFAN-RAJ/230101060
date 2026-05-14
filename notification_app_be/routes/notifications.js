import express from 'express';
import { addNotification } from '../data.js';
import { getAllNotifs, getUnread, markAsRead } from '../controllers/notificationController.js';
import { Log } from '../utils/logger.js';

const router = express.Router();

router.get('/', getAllNotifs);

router.get('/unread', getUnread);

router.patch('/:id/read', markAsRead);

router.post('/', (req, res) => {
  try {
    const { title, message, type } = req.body;
    if (!title || !message) {
      Log('routes:post', 'WARN', 'be', 'Missing fields');
      return res.status(400).json({ error: 'title and message required' });
    }
    const notif = addNotification(title, message, type);
    Log('routes:post', 'INFO', 'be', `Created: ${title}`);
    res.status(201).json(notif);
  } catch (e) {
    Log('routes:post', 'ERROR', 'be', e.message);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
