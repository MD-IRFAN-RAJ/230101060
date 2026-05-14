import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import {
  Alert,
  Box,
  CircularProgress,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';
import NotificationList from './components/NotificationList.jsx';
import { Log } from './utils/logger.js';

const pkg = 'fe';
const PAGE_SIZE = 5;
const typeOptions = ['All', 'Placement', 'Result', 'Event'];

export default function App() {
  const [tab, setTab] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [type, setType] = useState('All');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchNotifications();
  }, [tab, page, type]);

  const fetchNotifications = async () => {
    setLoading(true);
    setError('');
    try {
      const params = { page, limit: PAGE_SIZE };
      if (tab === 0 && type !== 'All') params.type = type;

      const path = tab === 0 ? '/api/notifications' : '/api/notifications/unread';
      const res = await axios.get(path, { params });
      const payload = res.data || {};

      setNotifications(payload.data || []);
      setTotal(payload.total || 0);
      Log('App.jsx:fetch', 'INFO', pkg, `Got ${payload.total || 0}`);
    } catch (err) {
      setError('Failed to load notifications.');
      Log('App.jsx:fetch', 'ERROR', pkg, err.message);
    } finally {
      setLoading(false);
    }
  };

  const pageCount = useMemo(() => {
    const count = Math.ceil(total / PAGE_SIZE);
    return count > 0 ? count : 1;
  }, [total]);

  const onTabChange = (_, value) => {
    setTab(value);
    setPage(1);
  };

  const onTypeChange = (e) => {
    setType(e.target.value);
    setPage(1);
  };

  const onMarkAsRead = async (id) => {
    try {
      await axios.patch(`/api/notifications/${id}/read`);
      Log('App.jsx:markRead', 'INFO', pkg, `Marked ${id} as read`);
      fetchNotifications();
    } catch (err) {
      setError('Failed to mark as read.');
      Log('App.jsx:markRead', 'ERROR', pkg, err.message);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Notification Center
      </Typography>

      <Tabs value={tab} onChange={onTabChange} sx={{ mb: 2 }}>
        <Tab label="Notifications" />
        <Tab label="Priority Notifications" />
      </Tabs>

      <Box sx={{ mb: 2, display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
        {tab === 0 ? (
          <FormControl size="small" sx={{ minWidth: 180 }}>
            <InputLabel>Type</InputLabel>
            <Select value={type} label="Type" onChange={onTypeChange}>
              {typeOptions.map((item) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        ) : null}

        <Typography variant="body2" color="text.secondary">
          Showing {notifications.length} of {total}
        </Typography>
      </Box>

      {loading ? (
        <Box sx={{ py: 6, display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </Box>
      ) : null}

      {!loading && error ? <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert> : null}

      {!loading && !error ? (
        <NotificationList
          notifications={notifications}
          onMarkAsRead={onMarkAsRead}
          marking={loading}
        />
      ) : null}

      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
        <Pagination
          page={page}
          count={pageCount}
          onChange={(_, value) => setPage(value)}
          color="primary"
        />
      </Box>
    </Container>
  );
}
