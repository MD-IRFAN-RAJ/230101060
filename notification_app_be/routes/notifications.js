import express from 'express';
import { getNotifications, addNotification } from '../data.js';
import { Log } from '../../logging_middleware/logger.js';

const router = express.Router();

router.get('/', (req, res) => {
  try {
    const notif = getNotifications();
    Log('routes.js:get', 'INFO', 'be', 'Fetched notifications');
    res.json(notif);
  } catch (e) {
    Log('routes.js:get', 'ERROR', 'be', e.message);
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/', (req, res) => {
  try {
    const { title, message } = req.body;
    if (!title || !message) {
      Log('routes.js:post', 'WARN', 'be', 'Missing fields');
      return res.status(400).json({ error: 'title and message required' });
    }
    const notif = addNotification(title, message);
    Log('routes.js:post', 'INFO', 'be', `Created: ${title}`);
    res.status(201).json(notif);
  } catch (e) {
    Log('routes.js:post', 'ERROR', 'be', e.message);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
