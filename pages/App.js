import { QueryClient, QueryClientProvider } from 'react-query';
import HomePage from './HomePage';
import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <Header />
        <HomePage />
        <Footer />
      </div>
    </QueryClientProvider>
  );
}

export default App;
