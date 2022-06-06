import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { QueryCache, QueryClient, QueryClientProvider } from 'react-query';
// import { ReactQueryDevtools } from 'react-query/devtools';
import ModalsProvider from './Context/Modal/ModalsProvider';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      refetchOnWindowFocus: false,
      suspense: true,
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
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      <ModalsProvider>
        <App />
      </ModalsProvider>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
