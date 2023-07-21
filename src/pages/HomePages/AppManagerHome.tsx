import { useState } from 'react';
import { BiPlay } from 'react-icons/bi';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import {
  addWorkSpace,
  changeCurrentWebView,
  switchWorkSpace,
} from '../../redux/slices/WorkspaceSlice';
import { useNavigate } from 'react-router-dom';
import { RiDeleteBin3Line } from 'react-icons/ri';
import ModalContainer from '../../components/Modal/ModalContainer';
import { RiCloseLine } from 'react-icons/ri';
import AddWebViewModal from '../../components/Modal/ManageWebViewModal';

interface formDataType {
  workspaceName: string;
  workspaceEmoji: string;
}

const AppManagerHome = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { workSpaces, currentWorkSpace } = useAppSelector(
    (state) => state.workspaceState
  );

  const [showaddWorkspaceModal, setShowaddWorkspaceModal] =
    useState<boolean>(false);
  const toggleAddWorkspaceModal = () =>
    setShowaddWorkspaceModal(!showaddWorkspaceModal);
  const [showAddWebViewModal, setShowAddWebViewModal] = useState(false);
  const toggleAddWebViewModal = () =>
    setShowAddWebViewModal(!showAddWebViewModal);

  const [formData, setFormData] = useState<formDataType>({
    workspaceName: '',
    workspaceEmoji: '',
  });

  const handleFromDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev: formDataType): formDataType => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const changeWebView = (id: string) => {
    dispatch(changeCurrentWebView({ id }));
    navigate('/webAppsHome');
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      addWorkSpace({
        name: formData.workspaceName,
        emoji: formData.workspaceEmoji,
      })
    );
    toggleAddWorkspaceModal();
  };

  return (
    <div className="px-4 flex flex-col gap-4 ">
      {/* header  */}
      <div className="mt-4 flex items-center justify-between">
        <h1 className="font-medium">App Workspaces</h1>

        <button
          onClick={toggleAddWorkspaceModal}
          className="bg-blue-500 px-3 py-1 rounded-md text-sm text-white"
        >
          Create Workspace
        </button>
      </div>

      <hr className="dark:border-dark" />

      {/* main body  */}
      {Object.keys(workSpaces).length > 0 && (
        <main>
          <section className="flex gap-3">
            {Object.entries(workSpaces).map(([key, value], index) => (
              <div
                onClick={() => {
                  dispatch(switchWorkSpace({ name: key }));
                }}
                key={index}
                className={`${
                  currentWorkSpace === key
                    ? 'border-blue-400'
                    : 'border-gray-100 dark:border-dark'
                } border-2 p-2 h-fit text-gray-500 dark:bg-dark dark:text-white relative w-fit cursor-pointer rounded-lg text-sm bold flex justify-between items-center `}
              >
                <div className="flex items-center gap-4 p-1">
                  <div
                    className="bg-blue-100 dark:bg-darker rounded-md text-center flex justify-center items-center"
                    style={{ width: '50px', height: '50px' }}
                  >
                    <p className="text-2xl">{value.workspaceDetails.emoji}</p>
                  </div>
                  <div className=" flex flex-col gap-1">
                    <p className="text-md capitalize ">{key} Workspace </p>
                    <p className="text-xs">
                      Contains {value.webViews.length}{' '}
                      {value.webViews.length > 1 ? 'Apps' : 'App'}
                    </p>
                  </div>
                  <div>
                    {currentWorkSpace === key && (
                      <button
                        onClick={() => navigate('/webAppsHome')}
                        className="bg-blue-500 w-6 h-6 flex items-center justify-center rounded-full"
                      >
                        <BiPlay className="text-white" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </section>

          <hr className="my-4 dark:border-dark" />

          <div className="mt-4 flex items-center justify-between">
            <h1 className="font-medium">{currentWorkSpace} Workspace Apps </h1>

            <button
              onClick={toggleAddWebViewModal}
              className="bg-blue-500 px-3 py-1 rounded-md text-sm text-white"
            >
              Add WebApp
            </button>
          </div>

          <hr className="my-4 dark:border-dark" />

          <section className="h-full">
            <div className="grid grid-cols-3 xl:grid-cols-4 gap-3">
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
                      className="w-full h-[70%] object-cover rounded-t-md"
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
                        <p className="text-xs">{item.url}</p>
                      </div>
                    </div>
                    <div className="flex">
                      <div className="mx-2">
                        <RiDeleteBin3Line className="text-xl hover:text-red-500 cursor-pointer " />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      )}

      {/* modals  */}
      {showaddWorkspaceModal && (
        <ModalContainer toggleModal={toggleAddWorkspaceModal}>
          <form
            className="w-[25vw] xl:w-[20vw] h-fit flex flex-col gap-3"
            onSubmit={handleSubmit}
          >
            <div className="flex justify-between items-center ">
              <h1>Create Workspace</h1>
              <div
                className="bg-gray-100 dark:bg-dark w-5 cursor-pointer h-5 flex justify-center items-center rounded-full"
                onClick={toggleAddWorkspaceModal}
              >
                <RiCloseLine className="text-sm" />
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <input
                value={formData.workspaceName}
                onChange={handleFromDataChange}
                type="text"
                className="border-2 rounded-md w-full px-2 py-1 dark:bg-dark dark:border-dark placeholder:text-sm"
                placeholder="Workspace Name"
                name="workspaceName"
              />
              <input
                value={formData.workspaceEmoji}
                onChange={handleFromDataChange}
                type="text"
                placeholder="Add Emoji"
                className="border-2 rounded-md w-full px-2 py-1 dark:bg-dark dark:border-dark placeholder:text-sm"
                name="workspaceEmoji"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 py-2 w-full rounded-md text-white"
            >
              Add Workspaces
            </button>
          </form>
        </ModalContainer>
      )}
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
    </div>
  );
};

export default AppManagerHome;
