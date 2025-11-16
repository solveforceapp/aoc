import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ModalProvider } from './src/context/ModalContext';
import { TextVectorProvider } from './src/context/TextVectorContext';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <ModalProvider>
      <TextVectorProvider>
        <App />
      </TextVectorProvider>
    </ModalProvider>
  </React.StrictMode>
);
