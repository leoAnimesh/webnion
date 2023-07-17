import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  changeCurrentWebView,
  toggleManageWorkspaceModal,
} from '../../redux/slices/WorkspaceSlice';
import AddWebViewModal from '../Modal/ManageWebViewModal';
// import {
//   RiExpandRightLine,
//   RiExpandLeftLine,
//   RiPushpinLine,
//   RiUnpinLine,
// } from 'react-icons/ri';

// import { BsBrowserChrome } from 'react-icons/bs';
import {
  toggleAddWenViewModal,
  togglesideBarExpanded,
} from '../../redux/slices/ConditonsSlice';
import { BiPin } from 'react-icons/bi';
import { useEffect, useRef } from 'react';
import { WebViewData } from '../../types/workspaceDataTypes';

const SideBar = () => {
  const dispatch = useAppDispatch();
  const toggleModal = () => dispatch(toggleAddWenViewModal());
  const { sideBarExpanded, showAddWenViewModal } = useAppSelector(
    (state) => state.conditionsState
  );
  const { workSpaces, currentWorkSpace } = useAppSelector(
    (state) => state.workspaceState
  );

  const changeWebView = (id: string) => {
    dispatch(changeCurrentWebView({ id }));
  };

  let sidebarRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = ({ target }: MouseEvent) => {
    if (sidebarRef.current && !sidebarRef.current.contains(target as Node)) {
      dispatch(togglesideBarExpanded(false));
    }
  };

  const handleESCKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      dispatch(togglesideBarExpanded(false));
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleESCKeyPress);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleESCKeyPress);
    };
  }, []);

  return (
    <aside
      ref={sidebarRef}
      className=" border-r-2 flex flex-col fixed left-0 h-screen bg-white dark:bg-darker dark:border-dark z-30  justify-between gap-2 p-2 "
      style={{ width: `${sideBarExpanded ? 260 : 70}px` }}
    >
      {/* sidebar top buttons  */}
      <section className="flex flex-col gap-3">
        {/* top main icon  */}
        <div
          onClick={() => dispatch(toggleManageWorkspaceModal())}
          className={`border-gray-100 hover:border-gray-200  h-fit text-gray-500 relative w-full cursor-pointer rounded-lg text-sm bold flex justify-between items-center `}
        >
          <div className="flex items-center gap-3">
            <div
              className="bg-blue-100 dark:bg-dark rounded-md text-center flex justify-center items-center"
              style={{ width: '50px', height: '50px' }}
            >
              <p className="text-2xl">
                {workSpaces[currentWorkSpace].workspaceDetails.emoji}
              </p>
            </div>
            {sideBarExpanded && (
              <div className="mb-2">
                <p className="text-md capitalize ">
                  {currentWorkSpace} Workspace{' '}
                </p>
                <p className="text-xs">Webnion </p>
              </div>
            )}
          </div>
        </div>

        <hr />

        {/* menu button  */}
        <div
          onClick={() =>
            changeWebView(workSpaces[currentWorkSpace].WorkspaceMenu.id)
          }
          className={`border-2 ${
            workSpaces[currentWorkSpace].currentWebViewId ===
            workSpaces[currentWorkSpace].WorkspaceMenu.id
              ? 'border-blue-600'
              : 'border-gray-100 dark:border-dark'
          } text-gray-500 dark:bg-dark  relative w-full cursor-pointer h-12 rounded-lg text-sm bold flex justify-between gap-4 px-3 items-center `}
        >
          <div className="flex gap-3">
            <div className="text-xl">📦</div>

            {sideBarExpanded && (
              <p className="capitalize">
                {workSpaces[currentWorkSpace].WorkspaceMenu.name}
              </p>
            )}
          </div>
        </div>

        <hr />

        {/* active webviews */}
        {workSpaces[currentWorkSpace].webViews.map(
          (items: WebViewData, index: number) => (
            <div
              onClick={() => changeWebView(items.id)}
              key={index}
              className={`border-2 ${
                workSpaces[currentWorkSpace].currentWebViewId === items.id
                  ? 'border-blue-600'
                  : 'border-gray-100 dark:border-dark'
              } text-gray-500 dark:bg-dark relative w-full cursor-pointer h-12 rounded-lg text-sm bold flex justify-between gap-4 px-3 items-center `}
            >
              {!sideBarExpanded && items.pinned === true && (
                <div className="w-4 h-4 absolute -right-2 -bottom-2 flex justify-center items-center text-white text-xs rounded-full bg-gray-400">
                  <BiPin />
                </div>
              )}
              <div className="flex gap-3">
                <img
                  className="w-5 h-5 shadow-md rounded-md"
                  src={`http://www.google.com/s2/favicons?domain=${items.url}`}
                  alt="icon"
                />

                {sideBarExpanded && <p className="capitalize">{items.name}</p>}
              </div>
              {/* web view item buttons  */}
              {/* {sideBarExpanded && (
                <div>
                  {items.pinned === true ? (
                    <div
                      onClick={() => togglePins(items.id, false)}
                      className="border-2 p-1 cursor-pointer border-gray-200 rounded-md"
                    >
                      <RiUnpinLine className="text-xs  " />
                    </div>
                  ) : (
                    <div
                      onClick={() => togglePins(items.id, true)}
                      className="border-2 p-1 cursor-pointer border-gray-200 rounded-md"
                    >
                      <RiPushpinLine className="text-xs  " />
                    </div>
                  )}
                </div>
              )} */}
            </div>
          )
        )}
      </section>

      {/* sidebar bottom buttons  */}
      <section className="flex flex-col gap-2">
        <hr />
        <button
          disabled={showAddWenViewModal}
          onClick={toggleModal}
          className="flex items-center justify-center bg-blue-500 hover:bg-blue-400  text-white w-full h-12 rounded-lg text-3xl bold "
        >
          {sideBarExpanded && <p className="text-sm ">Add New WebApp</p>}{' '}
          {!sideBarExpanded && <p className="pointer-events-none">+</p>}
        </button>
        {/* expand button  */}
        {/* <button
          onClick={() => dispatch(togglesideBarExpanded(!sideBarExpanded))}
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
        </button> */}
      </section>
      {showAddWenViewModal && <AddWebViewModal toggleModal={toggleModal} />}
    </aside>
  );
};

export default SideBar;
