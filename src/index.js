import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'
import App from './App';
import { SearchContextProvider } from './components/context/SearchContext';
import { AuthContextProvider } from './components/context/AuthContext';
import Login from './pages/login/Login';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
    <SearchContextProvider>

    <App />
    </SearchContextProvider>
    </AuthContextProvider>  
  </React.StrictMode>
);