import { List, ListItem, ListItemText, Paper, Typography } from '@mui/material';

export default function NotificationList({ notifications = [] }) {
  if (notifications.length === 0) {
    return (
      <Paper sx={{ p: 2 }}>
        <Typography color="textSecondary">No notifications yet</Typography>
      </Paper>
    );
  }

  return (
    <Paper>
      <List>
        {notifications.map((notification) => (
          <ListItem key={notification.id} divider>
            <ListItemText
              primary={notification.title}
              secondary={notification.message}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}
