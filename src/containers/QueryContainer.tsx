import { ReactElement } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

type Props = {
  children: ReactElement | ReactElement[];
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      suspense: false,
      refetchOnWindowFocus: false,
      retryDelay: 500,
      staleTime: 10000
    },
    mutations: {
      retry: 1,
      retryDelay: 500
    }
  }
});

function QueryContainer(props: Props) {
  const { children } = props;
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
export default QueryContainer;
