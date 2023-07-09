import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { changeCurrentWebView } from '../redux/slices/WebViewsSlice';
import AddWebViewModal from './Modal/AddWebViewModal';

interface WebView {
  id: string;
  name: string;
  url: string;
}

const SideBar = () => {
  const dispatch = useAppDispatch();
  const [AddModalVisible, setAddModalVisible] = useState(false);
  const toggleModal = () => setAddModalVisible(!AddModalVisible);
  const { currentWebViewId, webViews } = useAppSelector(
    (state) => state.webviewsState
  );

  const changeWebView = (id: string) => {
    dispatch(changeCurrentWebView({ id }));
  };

  return (
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
      {AddModalVisible && <AddWebViewModal toggleModal={toggleModal} />}
    </aside>
  );
};

export default SideBar;
