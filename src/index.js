import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthContextProvider } from "./context/AuthContext";
import { ChatContextProvider } from "./context/ChatContext";
import { CustReqContextProvider } from './context/CustReqContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthContextProvider>
    <ChatContextProvider>
      <CustReqContextProvider>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </CustReqContextProvider>
    </ChatContextProvider>
  </AuthContextProvider >
);

