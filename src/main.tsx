import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import store, { persistor } from './redux/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from "./components/theme/theme-provider"
import { Toaster } from "@/components/ui/toaster"

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <BrowserRouter>
          <App />
          <Toaster />
        </BrowserRouter>
      </ThemeProvider>
    </PersistGate>
  </Provider>
);

postMessage({ payload: 'removeLoading' }, '*');
