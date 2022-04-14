import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { QueryCache, QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

const queryClient = new QueryClient({
  defaultOptions: {
    refetchOnWindowFocus: false,
    queries: {
      retry: 0,
      suspense: true
    }
  },
  queryCache: new QueryCache({
    onError: (error, query) => {
      console.log(error, query);
    },
    onSuccess: data => {
      console.log(data)
    }
  })
});

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
