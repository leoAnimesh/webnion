import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  changeCurrentWebView,
  toggleManageWorkspaceModal,
} from '../../redux/slices/WorkspaceSlice';
import AddWebViewModal from '../Modal/ManageWebViewModal';

import { BiPin } from 'react-icons/bi';
import { useState } from 'react';
import ModalContainer from '../Modal/ModalContainer';

const SideBar = () => {
  const dispatch = useAppDispatch();
  const { workSpaces, currentWorkSpace } = useAppSelector(
    (state) => state.workspaceState
  );
  const [showAddWebViewModal, setShowAddWebViewModal] = useState(false);
  const toggleAddWebViewModal = () =>
    setShowAddWebViewModal(!showAddWebViewModal);

  const changeWebView = (id: string) => {
    dispatch(changeCurrentWebView({ id }));
  };

  return (
    <aside className=" border-r-2 flex flex-col fixed left-0 h-screen bg-white dark:bg-darker dark:border-dark z-30  justify-between gap-2 p-2 w-[70px]">
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
              {items.pinned === true && (
                <div className="w-4 h-4 absolute -right-2 -bottom-2 flex justify-center items-center text-white text-xs rounded-full bg-gray-400">
                  <BiPin />
                </div>
              )}
              <div className="flex gap-3">
                <img
                  className="w-5 h-5 shadow-md rounded-md "
                  src={`http://www.google.com/s2/favicons?domain=${items.url}`}
                  alt="icon"
                />
              </div>
            </div>
          )
        )}
      </section>

      {/* sidebar bottom buttons  */}
      <section className="flex flex-col gap-2">
        <hr />
        <button
          disabled={showAddWebViewModal}
          onClick={toggleAddWebViewModal}
          className="flex items-center justify-center bg-blue-500 hover:bg-blue-400  text-white w-full h-12 rounded-lg text-3xl bold "
        >
          <p className="pointer-events-none">+</p>
        </button>
      </section>
      {showAddWebViewModal && (
        <ModalContainer
          toggleModal={toggleAddWebViewModal}
          innerContainerStyles={{
            width: '300px',
            height: '100%',
            overflowY: 'auto',
          }}
          outerContainerStyles={{ left: `68px`, justifyContent: 'flex-start' }}
        >
          <AddWebViewModal toggleModal={toggleAddWebViewModal} />
        </ModalContainer>
      )}
    </aside>
  );
};

export default SideBar;
