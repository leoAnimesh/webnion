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
    return webViews
      .filter((item) => item.active === true)
      .map((item: WebView, index: number) => {
        return (
          <WebView
            show={currentWebViewId === item.id ? true : false}
            data={item}
            key={index}
          />
        );
      });
  }, [currentWebViewId, webViews]);

  return (
    <main
      style={{
        display: 'flex',
        justifyContent: 'end',
        flex: 1,
        height: '100vh',
        width: '100%',
      }}
    >
      <SideBar />
      {renderWebViews}
    </main>
  );
}

export default App;
