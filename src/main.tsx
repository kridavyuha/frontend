import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import '@mantine/core/styles.css';
import App from './App'
import ProvidedApp from './ProvidedApp';
import { styled } from 'styled-components';

const SIndex = styled.div`
  display: flex;
  justify-content: center;
  height: calc(100vh - 60px);
  max-width: 1400px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 60px;
`;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ProvidedApp>
      <SIndex>
         <App />
      </SIndex>
    </ProvidedApp>
  </StrictMode>
)
