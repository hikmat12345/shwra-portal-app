import { useEffect } from 'react';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';

import useAuth from './useAuth';
import { useQueryClient } from '@tanstack/react-query';
import { notificationsKey } from '../queries/notifications';

function useAppointmentsNotification(): void {
  const { user: loggedInUser } = useAuth();
  const queryClient = useQueryClient();

  useEffect(() => {
    const connection = new HubConnectionBuilder()
      .withUrl('https://shwraapidevops.azurewebsites.net/hub/shwra')
      .configureLogging(LogLevel.Information)
      .build();

    connection.start().then(() => {
      if (!navigator.userAgent.match(/(iPod|iPhone|iPad)/)) {
        Notification.requestPermission().then((permission) => {
          connection.on('NotifyForUpcomingAppointment', (user) => {
            if (loggedInUser?.id === user?.userId) {
              if (permission === 'granted') {
                new Notification('شورى', {
                  body: user.message,
                  icon: '/favicon/mstile-144x144.png'
                });
              }
              queryClient.invalidateQueries([notificationsKey]).then();
            }
          });
        });
      } else {
        connection.on('NotifyForUpcomingAppointment', (user) => {
          if (loggedInUser?.id === user?.userId) {
            queryClient.invalidateQueries([notificationsKey]).then();
          }
        });
      }
    });

    return () => {
      connection.stop().then();
    };
    // eslint-disable-next-line
  }, []);
}
export default useAppointmentsNotification;
