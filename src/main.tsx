import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import store, { persistor } from './redux/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <BrowserRouter>
        <App />
        <ToastContainer newestOnTop={true} />
      </BrowserRouter>
    </PersistGate>
  </Provider>
);

postMessage({ payload: 'removeLoading' }, '*');
