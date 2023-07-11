import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  addWorkSpace,
  switchWorkSpace,
} from '../../redux/slices/WorkspaceSlice';
import { RiCloseLine } from 'react-icons/ri';

const ManageWorkspaceModal = () => {
  const dispatch = useAppDispatch();
  const { workSpaces, currentWorkSpace } = useAppSelector(
    (state) => state.workspaceState
  );
  const [formData, setFormData] = useState({
    workspaceName: '',
    workspaceEmoji: '',
  });
  const [showInputs, setShowInput] = useState<boolean>(false);

  const handleFromDataChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev): any => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    dispatch(
      addWorkSpace({
        name: formData.workspaceName,
        emoji: formData.workspaceEmoji,
      })
    );
  };

  return (
    <div className="absolute left-0 top-0 right-0 bottom-0 h-screen w-screen z-50 backdrop-blur-sm backdrop-opacity-2 flex justify-start items-center">
      <div
        className="bg-white shadow-lg flex flex-col gap-3 p-4"
        style={{ width: '370px', height: '100%' }}
      >
        <h1>Choose Workspace</h1>
        {/* workspace items container  */}
        <div className="flex flex-col gap-2">
          {/* workspace item  */}
          {Object.entries(workSpaces).map(([key, value], index) => (
            <div
              key={index}
              onClick={() => dispatch(switchWorkSpace({ name: key }))}
              className={`${
                currentWorkSpace === key
                  ? 'border-blue-400'
                  : 'border-gray-100 hover:border-gray-200'
              }  border-2 p-2 h-fit text-gray-500 relative w-full cursor-pointer rounded-lg text-sm bold flex justify-between items-center `}
            >
              <div className="flex items-center gap-3">
                <div
                  className="bg-blue-100 rounded-md text-center flex justify-center items-center"
                  style={{ width: '50px', height: '50px' }}
                >
                  <p className="text-2xl">{value.workspaceDetails.emoji}</p>
                </div>
                <div className="mb-2">
                  <p className="text-md capitalize ">{key} Workspace </p>
                  <p className="text-xs">webx-appname </p>
                </div>
                {/* <BsBrowserChrome className="text-2xl" /> */}
              </div>
            </div>
          ))}
        </div>
        <hr className="my-1" />
        {/* add workspace container  */}
        {showInputs ? (
          <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
            <div className="flex justify-between items-center ">
              <h1>Add Workspace Details</h1>
              <div
                onClick={() => setShowInput(!showInputs)}
                className="bg-gray-100 w-5 cursor-pointer h-5 flex justify-center items-center rounded-full"
              >
                <RiCloseLine className="text-sm" />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <input
                value={formData.workspaceName}
                onChange={handleFromDataChange}
                type="text"
                className="border-2 w-full px-2 py-1 placeholder:text-sm"
                placeholder="Workspace Name"
                name="workspaceName"
              />
              <input
                value={formData.workspaceEmoji}
                onChange={handleFromDataChange}
                type="text"
                placeholder="Add Emoji"
                className="border-2 w-full px-2 py-1 placeholder:text-sm"
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
        ) : (
          <button
            onClick={() => setShowInput(!showInputs)}
            className="bg-blue-500 py-2 w-full rounded-md text-white"
          >
            Add Workspaces
          </button>
        )}
      </div>
    </div>
  );
};

export default ManageWorkspaceModal;