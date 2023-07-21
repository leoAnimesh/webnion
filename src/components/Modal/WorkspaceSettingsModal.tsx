import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  deleteWorkspace,
  editWorkspaceData,
} from '../../redux/slices/WorkspaceSlice';
import AlertModal from './AlertModal';

interface formDataType {
  workspaceName: string;
  workspaceEmoji: string;
}

const WorkspaceSettingsModal: React.FC<{
  selectedWorkspace: { workspace: string; index: number };
  toggleModal: () => void;
}> = ({ selectedWorkspace, toggleModal }) => {
  const dispatch = useAppDispatch();
  const { workSpaces } = useAppSelector((state) => state.workspaceState);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [formData, setFormData] = useState<formDataType>({
    workspaceName: selectedWorkspace.workspace,
    workspaceEmoji:
      workSpaces[selectedWorkspace.workspace]?.workspaceDetails?.emoji,
  });
  const toggleDeleteModal = () => setShowDeleteModal(!showDeleteModal);

  const handleFromDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev: formDataType): formDataType => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(
      editWorkspaceData({
        data: {
          name: formData.workspaceName,
          emoji: formData.workspaceEmoji,
        },
        workspaceName: selectedWorkspace.workspace,
      })
    );
    toggleModal();
  };

  return (
    <div>
      <h1 className="capitalize">
        {selectedWorkspace.workspace} Workspace Settings
      </h1>
      <hr className="my-4" />
      <form
        className="w-full h-fit flex flex-col gap-3"
        onSubmit={handleSubmit}
      >
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
          className="bg-blue-500 py-1 w-full rounded-md text-white"
        >
          Save changes
        </button>
      </form>

      <hr className="my-4" />
      <button
        onClick={toggleDeleteModal}
        className="bg-red-500 py-1 w-full rounded-md text-white"
      >
        Delete Workspace
      </button>
      {showDeleteModal && (
        <AlertModal
          title="⚠️ Confirmation for Deletion"
          message={`Are you sure , you want to delete "${selectedWorkspace.workspace}" workspace ? All the workspace and apps data will be removed.`}
          toggleModal={toggleDeleteModal}
          actionButtonTitle="delete"
          actionBtnFunc={() => {
            dispatch(
              deleteWorkspace({
                selectedWorkspace: selectedWorkspace.workspace,
                index: selectedWorkspace.index,
              })
            );
            toggleModal();
          }}
        />
      )}
    </div>
  );
};

export default WorkspaceSettingsModal;
