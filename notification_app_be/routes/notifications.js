import express from 'express';
import { getNotifications, addNotification } from '../data.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.json(getNotifications());
});

router.post('/', (req, res) => {
  const { title, message } = req.body;

  if (!title || !message) {
    return res.status(400).json({ error: 'title and message required' });
  }

  const notification = addNotification(title, message);
  res.status(201).json(notification);
});

export default router;
