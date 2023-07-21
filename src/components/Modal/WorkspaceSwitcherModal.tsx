import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  switchWorkSpace,
  toggleManageWorkspaceModal,
} from '../../redux/slices/WorkspaceSlice';
import ModalContainer from './ModalContainer';
import { useNavigate } from 'react-router-dom';
import { BiLeftArrow } from 'react-icons/bi';

const WorkspaceSwitcherModal = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { workSpaces, currentWorkSpace } = useAppSelector(
    (state) => state.workspaceState
  );

  const chanegWorkspace = (key: string) => {
    dispatch(switchWorkSpace({ name: key }));
    navigate(`/webAppsHome/${key}`);
  };

  return (
    <ModalContainer
      toggleModal={() => dispatch(toggleManageWorkspaceModal())}
      outerContainerStyles={{ zIndex: 50, justifyContent: 'flex-start' }}
      innerContainerStyles={{ width: '370px', height: '100%' }}
    >
      <h1
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => {
          dispatch(toggleManageWorkspaceModal());
          navigate('/');
        }}
      >
        <BiLeftArrow /> Dashboard
      </h1>

      <hr className="my-3" />

      <h1 className="font-medium mb-3">Choose Workspace</h1>

      {/* workspace items container  */}
      <div className="flex flex-col gap-3">
        {/* workspace item  */}
        {Object.entries(workSpaces).map(([key, value], index) => (
          <div
            key={index}
            onClick={() => chanegWorkspace(key)}
            className={`${
              currentWorkSpace === key
                ? 'border-blue-400'
                : 'border-gray-100 dark:border-dark hover:border-gray-200'
            }  border-2 p-2 h-fit text-gray-500 dark:bg-dark dark:text-white relative w-full cursor-pointer rounded-lg text-sm bold flex justify-between items-center `}
          >
            <div className="flex items-center gap-3">
              <div
                className="bg-blue-100 dark:bg-darker rounded-md text-center flex justify-center items-center"
                style={{ width: '50px', height: '50px' }}
              >
                <p className="text-2xl">{value.workspaceDetails.emoji}</p>
              </div>
              <div className="mb-2">
                <p className="text-md capitalize ">{key} Workspace </p>
                <p className="text-xs">
                  {' '}
                  Contains {value.webViews.length}{' '}
                  {value.webViews.length > 1 ? 'Apps' : 'App'}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </ModalContainer>
  );
};

export default WorkspaceSwitcherModal;
