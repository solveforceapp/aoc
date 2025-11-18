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
import { AuditProvider } from './contexts/AuditContext';
import { DirectoryProvider } from './src/context/DirectoryContext';
import { HealthProvider } from './src/system/HealthContext';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <SubdomainRegistryProvider rootDomain="solveforce.com" manifest={NOMICS_MANIFEST}>
      <SystemProvider>
        <AuditProvider>
          <ModalProvider>
            <TextVectorProvider>
              <CodexProvider>
                <ImageCodexProvider>
                  <DirectoryProvider>
                      <HealthProvider>
                        <App />
                      </HealthProvider>
                  </DirectoryProvider>
                </ImageCodexProvider>
              </CodexProvider>
            </TextVectorProvider>
          </ModalProvider>
        </AuditProvider>
      </SystemProvider>
    </SubdomainRegistryProvider>
  </React.StrictMode>
);
