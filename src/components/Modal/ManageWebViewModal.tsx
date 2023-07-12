import React, { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { addWebView } from '../../redux/slices/WorkspaceSlice';
import { WebViewPresets } from '../../utils/StaticData/PresetWebApps';
import { RiAddCircleLine, RiCloseLine } from 'react-icons/ri';
import ModalContainer from './ModalContainer';
import { toggleAddWenViewModal } from '../../redux/slices/ConditonsSlice';

const ManageWebViewModal = ({ toggleModal }: any) => {
  const { sideBarExpanded } = useAppSelector((state) => state.conditionsState);
  const { workSpaces, currentWorkSpace } = useAppSelector(
    (state) => state.workspaceState
  );
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<{
    name: string;
    url: string;
  }>({
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
    console.log(workSpaces[currentWorkSpace].webViewsObj);

    if (workSpaces[currentWorkSpace].webViewsObj.hasOwnProperty(formData.url)) {
      window.alert('already presen in current workspace ');
      return;
    }
    dispatch(addWebView({ ...formData, pinned: false, id }));
    toggleModal();
  };

  const addPresentToWorkspace = (webApp: any) => {
    let id = uuid();
    console.log(workSpaces[currentWorkSpace].webViewsObj);
    if (workSpaces[currentWorkSpace].webViewsObj.hasOwnProperty(webApp.url)) {
      window.alert('already presen in current workspace ');
      return;
    }
    dispatch(addWebView({ ...webApp, id, pinned: false }));
    dispatch(toggleAddWenViewModal());
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
    <ModalContainer
      toggleModal={toggleModal}
      innerContainerStyles={{ width: '300px', height: '100%' }}
      outerContainerStyles={{ left: `${sideBarExpanded ? 258 : 68}px` }}
    >
      <form onSubmit={onSubmit} className="flex flex-col gap-3 mb-1 w-full">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold">Add Web Apps</h1>
          <div
            onClick={toggleModal}
            className="bg-gray-100 w-5 cursor-pointer h-5 flex justify-center items-center rounded-full"
          >
            <RiCloseLine className="text-sm" />
          </div>
        </div>
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

      <hr className="text-gray-200 my-3 " />
      <div>
        {Object.entries(WebViewPresets).map(([title, webApps], index) => (
          <div key={index}>
            <h1 className="mb-3 font-medium">{title}</h1>
            <div className="grid grid-cols-4 gap-3">
              {webApps.map((item, index) => (
                <div key={index}>
                  <div className="border-2 relative p-3 rounded-md w-fit">
                    <img
                      className="w-7 h-7 rounded-md"
                      src={`http://www.google.com/s2/favicons?domain=${item.url}`}
                      alt="icon"
                    />
                    <RiAddCircleLine
                      onClick={() => addPresentToWorkspace(item)}
                      className="text-xl absolute -right-2 hover:text-blue-500 cursor-pointer "
                    />
                  </div>
                  <p className="text-xs text-center mt-2">
                    {item.name.length > 9
                      ? `${item.name.slice(0, 8)}..`
                      : item.name}
                  </p>
                </div>
              ))}
            </div>
            {index !== Object.entries(WebViewPresets).length - 1 && (
              <hr className="my-4" />
            )}
          </div>
        ))}
      </div>
    </ModalContainer>
  );
};

export default ManageWebViewModal;
