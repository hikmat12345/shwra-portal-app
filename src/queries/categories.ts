import { useQuery, UseQueryResult } from '@tanstack/react-query';
import axios from '../utils/axios';
import { MasterCategory } from '../@types/categories';

const masterCategoriesKey = 'master-categories';

export function useMasterCategories(): UseQueryResult<Array<MasterCategory>> {
  return useQuery({
    queryKey: [masterCategoriesKey],
    queryFn: ({ signal }) =>
      axios.get('/MasterCategory/MasterCategoryLanguageWise', { signal }).then((res) => res?.data)
  });
}
