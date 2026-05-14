import { useState, useEffect } from 'react';
import { Container, TextField, Button, Box, Typography } from '@mui/material';
import NotificationList from './components/NotificationList.jsx';

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
      const response = await fetch('/api/notifications');
      const data = await response.json();
      setNotifications(data);
    } catch (err) {
      console.error('Error fetching notifications:', err);
    }
  };

  const handleCreate = async () => {
    if (!title.trim() || !message.trim()) return;

    setLoading(true);
    try {
      const response = await fetch('/api/notifications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, message }),
      });

      if (response.ok) {
        setTitle('');
        setMessage('');
        fetchNotifications();
      }
    } catch (err) {
      console.error('Error creating notification:', err);
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
