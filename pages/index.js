import React from 'react';
import '../styles/global.css';
import App from './App';
import { UserProvider } from '@/context/UserContext';

const Index = () => {
  return (
    <React.StrictMode>
      <UserProvider>
        <App />
      </UserProvider>
    </React.StrictMode>
  );
};

export default Index;
