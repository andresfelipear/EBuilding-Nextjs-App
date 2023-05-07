import HomePage from "./pages/HomePage";
import { Routes, Route } from "react-router-dom"
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import { QueryClient, QueryClientProvider } from 'react-query'

function App() {
  const queryCliente = new QueryClient()
  return (
    <QueryClientProvider client={queryCliente}>
      <div className="App font-sans">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
        <Footer />
      </div>

    </QueryClientProvider>

  );
}

export default App;