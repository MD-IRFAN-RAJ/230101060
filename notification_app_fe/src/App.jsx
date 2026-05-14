import { useState, useEffect } from 'react';
import { Container, TextField, Button, Box, Typography } from '@mui/material';
import NotificationList from './components/NotificationList.jsx';
import { Log } from './utils/logger.js';

const pkg = 'fe';

export default function App() {
  const [notifications, setNotifications] = useState([]);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const res = await fetch('/api/notifications');
      const data = await res.json();
      setNotifications(data);
      Log('App.jsx:fetch', 'INFO', pkg, `Got ${data.length}`);
    } catch (err) {
      Log('App.jsx:fetch', 'ERROR', pkg, err.message);
    }
  };

  const handleCreate = async () => {
    if (!title.trim() || !message.trim()) return;
    setLoading(true);
    try {
      const res = await fetch('/api/notifications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, message }),
      });
      if (res.ok) {
        Log('App.jsx:create', 'INFO', pkg, `Created: ${title}`);
        setTitle('');
        setMessage('');
        fetchNotifications();
      }
    } catch (err) {
      Log('App.jsx:create', 'ERROR', pkg, err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Notifications
      </Typography>

      <Box sx={{ mb: 4, p: 2, border: '1px solid #ccc', borderRadius: 1 }}>
        <TextField
          fullWidth
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          margin="normal"
          size="small"
        />
        <TextField
          fullWidth
          label="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          margin="normal"
          multiline
          rows={3}
          size="small"
        />
        <Button
          variant="contained"
          onClick={handleCreate}
          disabled={loading}
          sx={{ mt: 2 }}
        >
          {loading ? 'Creating...' : 'Create Notification'}
        </Button>
      </Box>

      <NotificationList notifications={notifications} />
    </Container>
  );
}
