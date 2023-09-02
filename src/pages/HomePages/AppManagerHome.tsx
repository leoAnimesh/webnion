import { useState } from 'react';
import { BiLinkExternal } from 'react-icons/bi';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import {
  changeCurrentWebView,
  deleteWebAppEntry,
  switchWorkSpace,
  toggleManageWorkspaceModal,
} from '../../redux/slices/WorkspaceSlice';
import { useNavigate } from 'react-router-dom';
import { RiDeleteBin3Line, RiSettings2Fill } from 'react-icons/ri';
import ModalContainer from '../../components/Modal/ModalContainer';
import AddWebViewModal from '../../components/Modal/ManageWebViewModal';
import AlertModal from '../../components/Modal/AlertModal';
import ManageWorkspaceModal from '../../components/Modal/ManageWorkspaceModal';
import WorkspaceSettingsModal from '../../components/Modal/WorkspaceSettingsModal';
import LottieMessageScreen from '../../components/shared/LottieMessageScreen';
import NotFountAnimation from '../../assets/lottie/notFound.json';

const AppManagerHome = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { workSpaces, currentWorkSpace, showWorkspaceModal } = useAppSelector(
    (state) => state.workspaceState
  );

  const [showAddWebViewModal, setShowAddWebViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showWorkSpaceSettingsModal, setShowWorkSpaceSettingsModal] =
    useState(false);
  const [currentData, setCurrentData] = useState<{
    data: WebViewData;
    index: number;
  }>({ data: workSpaces[currentWorkSpace]?.webViews?.[0], index: 0 });
  const [selectedWorkspace, setSelectedWorkspace] = useState({
    workspace: currentWorkSpace,
    index: 0,
  });

  const toggleAddWebViewModal = () =>
    setShowAddWebViewModal(!showAddWebViewModal);
  const toggleDeleteModal = () => setShowDeleteModal(!showDeleteModal);
  const toggleWorkspaceSettingsModal = () =>
    setShowWorkSpaceSettingsModal(!showWorkSpaceSettingsModal);

  const deleteWebApp = (id: string, url: string, index: number) => {
    dispatch(deleteWebAppEntry({ id, url, index }));
  };

  const changeWebView = (id: string) => {
    dispatch(changeCurrentWebView({ id }));
    navigate('/webAppsHome');
  };

  const AllWorkspaces = () => {
    return Object.entries(workSpaces).sort((a, b) =>
      a[1].webViews.length < b[1].webViews.length ? 1 : -1
    );
  };

  return (
    <div className="px-4 flex flex-col gap-4 overflow-auto h-full w-full pb-3 ">
      {/* header  */}
      <div className="mt-4 flex items-center justify-between">
        <h1 className="font-medium">App Workspaces</h1>

        <button
          onClick={() => dispatch(toggleManageWorkspaceModal())}
          className="bg-blue-500 px-3 py-1 rounded-md text-sm text-white"
        >
          Create Workspace
        </button>
      </div>

      <hr className="dark:border-dark" />

      {/* main body  */}
      <main className="flex flex-col flex-1">
        {/* no worspace found messsage  */}
        {Object.keys(workSpaces).length === 0 && (
          <LottieMessageScreen
            animationData={NotFountAnimation}
            message="No Workspace Found"
            extra='Click on "Create Workspace" to create one'
          />
        )}

        {/* rendering workspaces  */}
        {Object.keys(workSpaces).length > 0 && (
          <section className="grid grid-cols-3 xl:grid-cols-4 gap-3">
            {AllWorkspaces().map(([key, value], index) => (
              <div
                key={index}
                className={`${
                  currentWorkSpace === key
                    ? 'border-blue-400'
                    : 'border-gray-100 dark:border-dark'
                } border-2 px-3 py-2  text-gray-500 dark:bg-dark dark:text-white relative rounded-lg text-sm bold flex items-center justify-between`}
              >
                <div
                  className="flex items-center gap-3 cursor-pointer"
                  onClick={() => {
                    dispatch(switchWorkSpace({ name: key }));
                  }}
                >
                  <div
                    className="bg-blue-100 dark:bg-darker rounded-md text-center flex justify-center items-center"
                    style={{ width: '50px', height: '50px' }}
                  >
                    <p className="text-2xl">{value?.workspaceDetails?.emoji}</p>
                  </div>
                  <div className=" flex flex-col gap-1">
                    <p className="text-md capitalize line-clamp-1 ">
                      {key} Workspace{' '}
                    </p>
                    <p className="text-xs">
                      Contains {value.webViews.length}{' '}
                      {value.webViews.length > 1 ? 'Apps' : 'App'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <RiSettings2Fill
                    onClick={() => {
                      setSelectedWorkspace({ workspace: key, index: index });
                      toggleWorkspaceSettingsModal();
                    }}
                    className="text-lg cursor-pointer"
                  />
                  <BiLinkExternal
                    className="text-lg cursor-pointer"
                    onClick={() => {
                      dispatch(switchWorkSpace({ name: key }));
                      navigate('/webAppsHome');
                    }}
                  />
                </div>
              </div>
            ))}
          </section>
        )}

        {/* rendering worspace apps  */}
        {Object.keys(workSpaces).length > 0 && (
          <section className="flex flex-1 flex-col ">
            <hr className="my-4 dark:border-dark" />

            <div className="flex items-center justify-between">
              <h1 className="font-medium capitalize">
                {currentWorkSpace} Workspace Apps{' '}
              </h1>

              <button
                onClick={toggleAddWebViewModal}
                className="bg-blue-500 px-3 py-1 rounded-md text-sm text-white"
              >
                Add WebApp
              </button>
            </div>

            <hr className="my-4 dark:border-dark" />

            {workSpaces[currentWorkSpace]?.webViews.length === 0 && (
              <LottieMessageScreen
                animationData={NotFountAnimation}
                message="No Apps Added"
                extra='Click on "Add WebApp" to add apps'
              />
            )}

            <section className="grid grid-cols-3 xl:grid-cols-4 gap-3">
              {workSpaces[currentWorkSpace]?.webViews.map((item, index) => (
                <div
                  key={index}
                  className={`h-[200px] border-2 ${
                    item.id === workSpaces[currentWorkSpace].currentWebViewId
                      ? 'border-blue-500'
                      : 'border-gray-100 dark:border-transparent'
                  }  rounded-md`}
                >
                  {item.screenshot ? (
                    <img
                      src={item?.screenshot}
                      onError={(err) => console.log(err)}
                      className="w-full h-[70%] bg-white object-cover rounded-t-md"
                      alt="ss"
                    />
                  ) : (
                    <div className="h-[70%] w-full flex justify-center items-center  bg-gray-100 rounded-t-md">
                      <img
                        className="w-7 h-7 backdrop-blur-md shadow-md rounded-md"
                        src={`http://www.google.com/s2/favicons?domain=${item.url}`}
                        alt="icon"
                      />
                    </div>
                  )}
                  <div className="flex h-[30%] border-gray-100  dark:border-dark dark:bg-dark dark:text-white relative items-center justify-between gap-3 p-4 w-full rounded-b-md">
                    <div
                      className="flex items-center gap-3 cursor-pointer"
                      onClick={() => changeWebView(item.id)}
                    >
                      <img
                        className="w-6 h-6 shadow-md rounded-md"
                        src={`http://www.google.com/s2/favicons?domain=${item.url}`}
                        alt="icon"
                      />
                      <div>
                        <h2 className="text-base">{item.name}</h2>
                        <p className="text-xs">
                          {item.url.length > 25
                            ? `${item.url.slice(0, 25)}...`
                            : item.url}
                        </p>
                      </div>
                    </div>
                    <div className="flex">
                      <div
                        className="mx-2"
                        onClick={() => {
                          setCurrentData({ data: item, index: index });
                          toggleDeleteModal();
                        }}
                      >
                        <RiDeleteBin3Line className="text-xl hover:text-red-500 cursor-pointer " />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </section>
          </section>
        )}
      </main>

      {/* modals  */}
      {showAddWebViewModal && (
        <ModalContainer
          toggleModal={toggleAddWebViewModal}
          innerContainerStyles={{
            width: '300px',
            height: '100%',
            overflowY: 'auto',
          }}
          outerContainerStyles={{ justifyContent: 'flex-start' }}
        >
          <AddWebViewModal toggleModal={toggleAddWebViewModal} />
        </ModalContainer>
      )}
      {showWorkSpaceSettingsModal && (
        <ModalContainer
          toggleModal={toggleWorkspaceSettingsModal}
          innerContainerStyles={{
            width: '300px',
            height: '100%',
            overflowY: 'auto',
          }}
          outerContainerStyles={{ justifyContent: 'flex-start' }}
        >
          <WorkspaceSettingsModal
            toggleModal={toggleWorkspaceSettingsModal}
            selectedWorkspace={selectedWorkspace}
          />
        </ModalContainer>
      )}
      {showDeleteModal && (
        <AlertModal
          title="⚠️ Confirmation for Deletion"
          message={`Do you want to delete "${currentData.data.name}" from your ${currentWorkSpace} workspace ?`}
          toggleModal={toggleDeleteModal}
          actionButtonTitle="delete"
          actionBtnFunc={() => {
            deleteWebApp(
              currentData.data.id,
              currentData.data.url,
              currentData.index
            );
            toggleDeleteModal();
          }}
        />
      )}
      {showWorkspaceModal && <ManageWorkspaceModal home={true} />}
    </div>
  );
};

export default AppManagerHome;
