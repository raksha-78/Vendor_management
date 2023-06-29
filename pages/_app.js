import '@/styles/globals.css'
import { store } from '../redux/store';
import { Provider } from 'react-redux';

import { QueryClientProvider,QueryClient } from 'react-query'

// create a clint

const queryClient=new QueryClient();
export default function App({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
      <Component {...pageProps} />
      </Provider>
      
    </QueryClientProvider>
  )
}

