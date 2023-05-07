import { QueryClient, QueryClientProvider } from 'react-query';
import { useRouter } from 'next/router';
import HomePage from './HomePage';
import Layout from '@/components/Layout';

function App({ Component, pageProps }) {
  const queryClient = new QueryClient();
  const router = useRouter();
  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <HomePage/>
      </Layout>
    </QueryClientProvider>
  );
}

export default App;
