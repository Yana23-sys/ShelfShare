import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';


const NotificationMenu = ({ notifications, onNotificationClick }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleBellClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationClick = (notificationId) => {
    handleClose();
    onNotificationClick(notificationId);
  };

  return (
    <>
      <IconButton color="inherit" onClick={handleBellClick} style={{ padding: '0' }}>
        <Badge badgeContent={notifications.filter((notification) => !notification.seen).length} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          elevation: 4,
          style: { width: '300px' },
        }}
      >
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <MenuItem
              key={notification._id}
              onClick={() => handleNotificationClick(notification._id)}
            >
                <Typography variant="subtitle2" 
                sx={{
                  backgroundColor: notification.seen
                    ? (theme) => theme.palette.action.hover
                    : 'inherit',
                }}
                style={{
                    textAlign: "left",
                    fontSize: "0.7rem",
                    maxWidth: "100%",
                    whiteSpace: "normal",
                    wordWrap: "break-word",
                }}>
                    • {notification.message}
                </Typography>
              <Divider />
            </MenuItem>
          ))
        ) : (
          <MenuItem disabled>
            <Typography variant="subtitle2"
                style={{
                        textAlign: "left",
                        fontSize: "0.7rem",
                        maxWidth: "80%",
                        whiteSpace: "normal",
                        wordWrap: "break-word",
                    }}
                >
                No new notifications
            </Typography>
          </MenuItem>
        )}
      </Menu>
    </>
  );
};

export default NotificationMenu;
