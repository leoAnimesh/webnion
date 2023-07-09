import { useEffect, useMemo, useState } from 'react';
import WebView from './components/WebView';
import { useAppSelector, useAppDispatch } from './redux/hooks';
import { changeCurrentWebView } from './redux/slices/WebViewsSlice';
import AddWebViewModal from './components/Modal/AddWebViewModal';

interface WebView {
  id: string;
  name: string;
  url: string;
}

function App() {
  const [AddModalVisible, setAddModalVisible] = useState(false);
  const toggleModal = () => setAddModalVisible(!AddModalVisible);
  const { currentWebViewId, webViews } = useAppSelector(
    (state) => state.webviewsState
  );
  const dispatch = useAppDispatch();

  const changeWebView = (id: string) => {
    dispatch(changeCurrentWebView({ id }));
  };

  const renderWebViews = useMemo(
    () =>
      webViews.map((item: WebView, index: number) => (
        <WebView
          show={currentWebViewId === item.id ? true : false}
          data={item}
          key={index}
        />
      )),
    [currentWebViewId]
  );

  useEffect(() => {
    if (webViews.length > 0) {
      changeWebView(webViews[0].id);
    }
  }, []);

  return (
    <main style={{ display: 'flex', flex: 1, height: '100vh', width: '100%' }}>
      <aside
        className="border-2 flex flex-col justify-start gap-2 p-2 "
        style={{ width: '70px' }}
      >
        {webViews.map((items: WebView, index: number) => (
          <button
            onClick={() => changeWebView(items.id)}
            key={index}
            className={`border-2 ${
              currentWebViewId === items.id
                ? 'border-blue-600'
                : 'border-gray-200'
            } text-gray-500 w-full h-12 rounded-lg text-3xl bold flex justify-center items-center `}
          >
            <img
              className="w-5 h-5 shadow-md rounded-md"
              src={`http://www.google.com/s2/favicons?domain=${items.url}`}
              alt="icon"
            />
          </button>
        ))}
        <button
          onClick={toggleModal}
          className="border-2 bg-blue-500 hover:bg-blue-400 text-white w-full h-12 rounded-lg text-3xl bold "
        >
          +
        </button>
      </aside>
      {renderWebViews}
      {AddModalVisible && <AddWebViewModal toggleModal={toggleModal} />}
    </main>
  );
}

export default App;
