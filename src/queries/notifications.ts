import { useMutation, UseMutationResult, useQuery, UseQueryResult } from '@tanstack/react-query';
import axios from '../utils/axios';
import { INotification } from '../@types/notifications';
import { AxiosError } from 'axios';

export const notificationsKey = 'notifications';

export function useNotificationsQuery(): UseQueryResult<Array<INotification>> {
  return useQuery({
    staleTime: Infinity,
    queryKey: [notificationsKey],
    queryFn: ({ signal }) =>
      axios.get('/account/notifications', { signal }).then((res) => res?.data)
  });
}

export function useNotificationReadMutation(): UseMutationResult<AxiosError, Array<INotification>> {
  return useMutation((notificationId: any) =>
    axios.patch('/account/NotificationsRead', { notificationId }).then((res) => res?.data)
  );
}
