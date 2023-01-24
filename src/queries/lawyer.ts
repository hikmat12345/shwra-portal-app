import { useQuery, UseQueryResult } from '@tanstack/react-query';

import axios from '../utils/axios';
import { lawyerAssignment } from '../@types/lawyer';

export const lawyerAssignmentsKey = 'lawyer-assignments';

export function useLawyerAssignmentsQuery(): UseQueryResult<Array<lawyerAssignment>> {
  return useQuery({
    queryKey: [lawyerAssignmentsKey],
    queryFn: ({ signal }) =>
      axios.get('/Report/LawyerAssignments', { signal }).then((res) => res?.data?.result)
  });
}
