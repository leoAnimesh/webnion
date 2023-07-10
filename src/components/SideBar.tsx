import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import {
  changeCurrentWebView,
  deleteWebAppEntry,
  toggleActivenessWebView,
} from '../redux/slices/WebViewsSlice';
import AddWebViewModal from './Modal/AddWebViewModal';
import {
  RiExpandRightLine,
  RiExpandLeftLine,
  RiDeleteBin5Line,
} from 'react-icons/ri';
import { RxCross2 } from 'react-icons/rx';
import { BsBrowserChrome } from 'react-icons/bs';

// import { GiNightSleep } from 'react-icons/gi';
interface WebView {
  id: string;
  name: string;
  url: string;
}

const SideBar = () => {
  const dispatch = useAppDispatch();
  const [AddModalVisible, setAddModalVisible] = useState(false);
  const toggleModal = () => setAddModalVisible(!AddModalVisible);
  const [sideBarExpanded, setsideBarExpanded] = useState<boolean>(false);
  const { currentWebViewId, webViews } = useAppSelector(
    (state) => state.webviewsState
  );

  const changeWebView = (id: string) => {
    dispatch(changeCurrentWebView({ id }));
  };

  const deactiveWebView = (id: string) => {
    dispatch(toggleActivenessWebView({ id, active: false }));
  };

  const deleteWebApp = (id: string, index: number) => {
    dispatch(deleteWebAppEntry({ id, index }));
  };

  const activateWebView = (id: string) => {
    dispatch(toggleActivenessWebView({ id, active: true }));
  };

  useEffect(() => {
    if (webViews.filter((item) => item.active === true).length === 1) {
      dispatch(
        changeCurrentWebView({ id: '03220916-6c71-4d83-9545-487d09e8bc87' })
      );
    }
  }, [webViews]);

  return (
    <aside
      className=" border-2 flex flex-col fixed left-0 h-screen bg-white z-30  justify-between gap-2 p-2 "
      style={{ width: `${sideBarExpanded ? 250 : 70}px` }}
    >
      {/* sidebar top buttons  */}
      <section className="flex flex-col gap-3">
        {/* top main icon  */}
        <div
          className={`border-gray-100 text-gray-500 relative w-full cursor-pointer h-5 mt-2 rounded-lg text-sm bold flex justify-between gap-4 px-3 items-center `}
        >
          <div className="flex items-center gap-2">
            <BsBrowserChrome className="text-2xl" />
            {sideBarExpanded && <p>Webx</p>}
          </div>
        </div>
        <hr />
        {/* active webviews */}
        {webViews
          .filter((item) => item.active === true)
          .map((items: WebView, index: number) => (
            <div
              onClick={() => changeWebView(items.id)}
              key={index}
              className={`border-2 ${
                currentWebViewId === items.id
                  ? 'border-blue-600'
                  : 'border-gray-100'
              } text-gray-500 relative w-full cursor-pointer h-12 rounded-lg text-sm bold flex justify-between gap-4 px-3 items-center `}
            >
              {!sideBarExpanded && items.name !== 'Google' && (
                <div
                  className="w-4 h-4 absolute -right-2 -bottom-2 flex justify-center items-center text-white text-xs rounded-full bg-gray-400"
                  onClick={() => deactiveWebView(items.id)}
                >
                  <RxCross2 />
                </div>
              )}
              <div className="flex gap-2">
                <img
                  className="w-5 h-5 shadow-md rounded-md"
                  src={`http://www.google.com/s2/favicons?domain=${items.url}`}
                  alt="icon"
                />
                {sideBarExpanded && <p>{items.name}</p>}
              </div>
              {/* web view item buttons  */}
              {sideBarExpanded && items.name !== 'Google' && (
                <div>
                  <div
                    className="border-2 p-1 cursor-pointer border-gray-200 rounded-md"
                    onClick={() => deactiveWebView(items.id)}
                  >
                    <RxCross2 className="text-xs  " />
                  </div>
                </div>
              )}
            </div>
          ))}
        <hr className="my-1" />
        {/* unactive web views  */}
        {webViews
          .filter((item) => item.active === false)
          .map((items: WebView, index: number) => (
            <div
              onClick={() => activateWebView(items.id)}
              key={index}
              className={`border-2 text-gray-500 relative bg-gray-50 w-full cursor-pointer h-12 rounded-lg text-sm bold flex justify-between gap-3 px-3 items-center `}
            >
              <div className="flex gap-2">
                <img
                  className="w-5 h-5 shadow-md rounded-md"
                  src={`http://www.google.com/s2/favicons?domain=${items.url}`}
                  alt="icon"
                />
                {sideBarExpanded && <p>{items.name}</p>}
              </div>
              {/* web view item buttons  */}
              {sideBarExpanded && (
                <div>
                  <div className="border-2 p-1 cursor-pointer border-gray-200 rounded-md">
                    <RiDeleteBin5Line
                      className="text-xs  "
                      onClick={() => deleteWebApp(items.id, index)}
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
      </section>
      {/* sidebar bottom buttons  */}
      <section className="flex flex-col gap-2">
        <button
          onClick={toggleModal}
          className="border-2 bg-blue-500 hover:bg-blue-400 text-white w-full h-12 rounded-lg text-3xl bold "
        >
          {sideBarExpanded && <p className="text-sm">Add New WebApp</p>}{' '}
          {!sideBarExpanded && '+'}
        </button>
        <button
          onClick={() => setsideBarExpanded(!sideBarExpanded)}
          className="border-2 hover:bg-gray-100 flex justify-center items-center text-white w-full h-12 rounded-lg text-3xl bold "
        >
          {sideBarExpanded && (
            <>
              <RiExpandLeftLine className="text-gray-500 text-xl mr-2" />
              <p className="text-gray-500 text-sm">Shrink Down</p>
            </>
          )}
          {!sideBarExpanded && (
            <RiExpandRightLine className="text-gray-500 text-2xl" />
          )}
        </button>
      </section>
      {AddModalVisible && (
        <AddWebViewModal
          sideBarExpanded={sideBarExpanded}
          toggleModal={toggleModal}
        />
      )}
    </aside>
  );
};

export default SideBar;
