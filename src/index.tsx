import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '../App';
import { ModalProvider } from './context/ModalContext';
import { TextVectorProvider } from './context/TextVectorContext';
// FIX: Corrected import path for SystemProvider
import { SystemProvider } from '../contexts/SystemContext';
import { CodexProvider } from './context/CodexContext';
import { ImageCodexProvider } from './context/ImageCodexContext';
import { SubdomainRegistryProvider } from './geometronomics/subdomainRegistry';
import { NOMICS_MANIFEST } from './geometronomics/nomicsManifest';
import { AuditProvider } from '../contexts/AuditContext';
import { DirectoryProvider } from './context/DirectoryContext';
import { HealthProvider } from './system/HealthContext';

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
