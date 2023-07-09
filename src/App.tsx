import { useMemo } from 'react';
import WebView from './components/WebView';
import { useAppSelector } from './redux/hooks';
import SideBar from './components/SideBar';

interface WebView {
  id: string;
  name: string;
  url: string;
}

function App() {
  const { currentWebViewId, webViews } = useAppSelector(
    (state) => state.webviewsState
  );

  const renderWebViews = useMemo(() => {
    return webViews.map((item: WebView, index: number) => {
      return (
        <WebView
          show={currentWebViewId === item.id ? true : false}
          data={item}
          key={index}
        />
      );
    });
  }, [currentWebViewId]);

  return (
    <main style={{ display: 'flex', flex: 1, height: '100vh', width: '100%' }}>
      <SideBar />
      {renderWebViews}
    </main>
  );
}

export default App;
