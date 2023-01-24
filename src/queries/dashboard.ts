import { useQuery, UseQueryResult } from '@tanstack/react-query';

import axios from '../utils/axios';
import { TotalAppointments } from '../@types/dashboard';

export const totalAppointments = 'lawyer-appointments';

export function useTotalAppointments(): UseQueryResult<TotalAppointments> {
  return useQuery({
    staleTime: 10000,
    queryKey: [totalAppointments],
    queryFn: ({ signal }) =>
      axios.get('/Report/AppointmentsByMonthDetail', { signal }).then((res) => res?.data?.result)
  });
}
