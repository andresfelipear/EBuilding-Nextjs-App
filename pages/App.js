import { QueryClient, QueryClientProvider } from 'react-query';
import { useRouter } from 'next/router';
import HomePage from './HomePage';
import Layout from '@/components/Layout';
import { useContext, useEffect, useCallback, useState } from 'react'
import { UserContext } from '@/context/UserContext';

function App({ Component, pageProps }) {
  const queryClient = new QueryClient();
  const router = useRouter();

  const [userContext, setUserContext] = useContext(UserContext)

  const verifyUser = useCallback(() => {
    fetch(process.env.NEXT_PUBLIC_API_URL + "/api/refreshToken", {
      method: 'POST',
      credentials: "include",
      header: { "Content-Type": "application/json" }
    }).then(async response => {
      if (response.ok) {
        const data = await response.json()
        setUserContext(prev => ({ ...prev, token: data.token }))
      } else {
        setUserContext(prev => ({ ...prev, token: null }))
      }

      setTimeout(verifyUser, 5 * 30 * 1000) //call refreshtoken every 5 minutes to renew tokens
    })
  }, [setUserContext])

  useEffect(() => verifyUser(), [verifyUser])

  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <HomePage/>
      </Layout>
    </QueryClientProvider>
  );
}

export default App;
