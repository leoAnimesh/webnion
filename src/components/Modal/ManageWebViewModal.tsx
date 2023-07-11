import React, { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { addWebView } from '../../redux/slices/WorkspaceSlice';

const ManageWebViewModal = ({ toggleModal }: any) => {
  const { sideBarExpanded } = useAppSelector((state) => state.workspaceState);
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState({
    name: '',
    url: 'https://',
  });

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { value, name } = e.target;
    setFormData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    let id = uuid();
    dispatch(addWebView({ ...formData, id, active: true }));
    toggleModal();
  };

  useEffect(() => {
    if (
      (formData.url.includes('com') ||
        formData.url.includes('org') ||
        formData.url.includes('so') ||
        formData.url.includes('in') ||
        formData.url.includes('us')) &&
      formData.url.includes('https')
    ) {
      let NAME = '';
      let splited_url = formData.url.split('//')[1].split('.');
      if (splited_url.length > 2) {
        splited_url.reverse().forEach((item, index) => {
          if (index !== 0) {
            NAME += `${item} `;
          }
        });
      } else {
        NAME = splited_url[0];
      }

      setFormData((prev: any): any => {
        return {
          ...prev,
          name: NAME,
        };
      });
    } else {
      if (formData.url === '') {
        setFormData((prev: any): any => {
          return {
            ...prev,
            name: '',
          };
        });
      }
    }
  }, [formData.url]);

  return (
    <div
      style={{ left: `${sideBarExpanded ? 258 : 68}px` }}
      className="absolute top-0 right-0 bottom-0 h-screen w-screen z-10  backdrop-blur-sm backdrop-opacity-2 flex justify-start items-center"
    >
      <div
        className="bg-white shadow-lg flex p-4 "
        style={{ width: '300px', height: '100%' }}
      >
        <form onSubmit={onSubmit} className="flex flex-col gap-3 w-full">
          <h1>Add Web Apps</h1>
          <input
            value={formData.url}
            onChange={handleFormChange}
            type="text"
            className="border-2 w-full px-2 py-1 placeholder:text-sm"
            placeholder="https://example.com"
            name="url"
          />
          <input
            value={formData.name}
            onChange={handleFormChange}
            type="text"
            className="border-2 w-full px-2 py-1 placeholder:text-sm"
            placeholder="Name of WebApp"
            name="name"
          />
          <button
            type="submit"
            className="bg-blue-500 py-2 w-full rounded-md text-white"
          >
            Add +{' '}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ManageWebViewModal;
