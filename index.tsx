import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ModalProvider } from './src/context/ModalContext';
import { TextVectorProvider } from './src/context/TextVectorContext';
import { SystemProvider } from './contexts/SystemContext';
import { CodexProvider } from './src/context/CodexContext';
import { ImageCodexProvider } from './src/context/ImageCodexContext';
import { SubdomainRegistryProvider } from './src/geometronomics/subdomainRegistry';
import { NOMICS_MANIFEST } from './src/geometronomics/nomicsManifest';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <SubdomainRegistryProvider rootDomain="solveforce.com" manifest={NOMICS_MANIFEST}>
      <ModalProvider>
        <SystemProvider>
          <TextVectorProvider>
            <CodexProvider>
              <ImageCodexProvider>
                <App />
              </ImageCodexProvider>
            </CodexProvider>
          </TextVectorProvider>
        </SystemProvider>
      </ModalProvider>
    </SubdomainRegistryProvider>
  </React.StrictMode>
);