import { QueryClient, QueryClientProvider } from 'react-query';
import { useRouter } from 'next/router';
import HomePage from './HomePage';
import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';

function App() {
  const queryClient = new QueryClient();
  const router = useRouter();
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <Header />
        {router.pathname === '/signup' && <SignUpPage />}
        {router.pathname === '/login' && <LoginPage />}
        {router.pathname === '/' && <HomePage />}
        <Footer />
      </div>
    </QueryClientProvider>
  );
}

export default App;
