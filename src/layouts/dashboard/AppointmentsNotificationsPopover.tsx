import { Icon } from '@iconify/react';
import { useRef, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clockFill from '@iconify/icons-eva/clock-fill';
import NotificationsIcon from '@mui/icons-material/Notifications';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
// material
import {
  Box,
  List,
  Badge,
  Avatar,
  Divider,
  Typography,
  ListItemText,
  ListSubheader,
  ListItemAvatar,
  ListItemButton
} from '@mui/material';
// utils
import { fToNow } from '../../utils/formatTime';
// components
import Scrollbar from '../../components/Scrollbar';
import MenuPopover from '../../components/MenuPopover';
import { INotification } from '../../@types/notifications';
import { MIconButton } from '../../components/@material-extend';
import useAppointmentsNotification from '../../hooks/useAppointmentsNotification';
import {
  notificationsKey,
  useNotificationReadMutation,
  useNotificationsQuery
} from '../../queries/notifications';
import { useQueryClient } from '@tanstack/react-query';

function NotificationItem({ notification }: { notification: INotification }) {
  return (
    <ListItemButton
      to="#"
      component={RouterLink}
      sx={{
        py: 1.5,
        px: 2.5,
        mt: '1px',
        ...(!notification.isRead && {
          bgcolor: 'action.selected'
        })
      }}
    >
      <ListItemAvatar>
        <Avatar sx={{ bgcolor: 'background.neutral' }}>
          <CalendarMonthIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={
          <>
            <Typography variant="subtitle2">موعد</Typography>
            <Typography component="span" variant="body2" sx={{ color: 'text.secondary' }}>
              {notification.message}
            </Typography>
          </>
        }
        secondary={
          <Typography
            variant="caption"
            sx={{
              mt: 0.5,
              display: 'flex',
              alignItems: 'center',
              color: 'text.disabled'
            }}
          >
            <Box component={Icon} icon={clockFill} sx={{ mr: 0.5, width: 16, height: 16 }} />
            {fToNow(notification.createdDate)}
          </Typography>
        }
      />
    </ListItemButton>
  );
}

function AppointmentsNotificationsPopover() {
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);

  const queryClient = useQueryClient();
  const { data } = useNotificationsQuery();
  const { mutate } = useNotificationReadMutation();
  const unReadNotifications = data?.filter((item) => !item.isRead);
  const readNotifications = data?.filter((item) => item.isRead);
  const totalUnRead = unReadNotifications?.length ?? 0;

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    handleMarkAllAsRead();
    if (totalUnRead) mutate(0);
    setOpen(false);
  };

  const handleMarkAllAsRead = () => {
    queryClient.setQueryData([notificationsKey], (prevData: INotification[] | undefined) => {
      return prevData?.map((notification) => ({ ...notification, isRead: true }));
    });
  };

  useAppointmentsNotification();

  return (
    <>
      <MIconButton
        ref={anchorRef}
        size="large"
        color={open ? 'primary' : 'default'}
        onClick={handleOpen}
      >
        <Badge
          badgeContent={totalUnRead}
          color="primary"
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left'
          }}
        >
          <NotificationsIcon />
        </Badge>
      </MIconButton>

      <MenuPopover
        open={open}
        onClose={handleClose}
        anchorEl={anchorRef.current}
        sx={{ width: 360 }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', py: 2, px: 2.5 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle1">الإشعارات</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              لديك {totalUnRead} رسائل غير مقروءة
            </Typography>
          </Box>
        </Box>

        <Divider />

        {data?.length ? (
          <Scrollbar sx={{ height: { xs: 340, sm: 540 } }}>
            {unReadNotifications?.length ? (
              <List
                disablePadding
                subheader={
                  <ListSubheader disableSticky sx={{ py: 1, px: 2.5, typography: 'overline' }}>
                    جديد
                  </ListSubheader>
                }
              >
                {unReadNotifications?.map((notification) => (
                  <NotificationItem key={notification.id} notification={notification} />
                ))}
              </List>
            ) : null}

            {readNotifications?.length ? (
              <List
                disablePadding
                subheader={
                  unReadNotifications?.length ? (
                    <ListSubheader disableSticky sx={{ py: 1, px: 2.5, typography: 'overline' }}>
                      قبل ذلك
                    </ListSubheader>
                  ) : undefined
                }
              >
                {readNotifications?.map((notification) => (
                  <NotificationItem key={notification.id} notification={notification} />
                ))}
              </List>
            ) : null}
          </Scrollbar>
        ) : (
          <Typography align="center" sx={{ py: 2 }}>
            لا يوجد لديك أي أشعارات
          </Typography>
        )}
      </MenuPopover>
    </>
  );
}
export default AppointmentsNotificationsPopover;
