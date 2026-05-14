import { Box, Button, Chip, List, ListItem, Paper, Typography } from '@mui/material';

export default function NotificationList({ notifications = [], onMarkAsRead, marking = false }) {
  if (notifications.length === 0) {
    return (
      <Paper sx={{ p: 2 }}>
        <Typography color="text.secondary">No notifications found</Typography>
      </Paper>
    );
  }

  return (
    <Paper sx={{ p: 1 }}>
      <List>
        {notifications.map((notification) => (
          <ListItem key={notification.id} divider>
            <Box sx={{ width: '100%' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 1, flexWrap: 'wrap' }}>
                <Typography variant="subtitle1">{notification.title}</Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  <Chip
                    size="small"
                    label={notification.read ? 'Read' : 'Unread'}
                    color={notification.read ? 'default' : 'primary'}
                  />
                  <Chip
                    size="small"
                    label={notification.type || 'Event'}
                    variant="outlined"
                  />
                  {!notification.read ? (
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={() => onMarkAsRead?.(notification.id)}
                      disabled={marking}
                    >
                      Mark Read
                    </Button>
                  ) : null}
                </Box>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                {notification.message}
              </Typography>
            </Box>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}
