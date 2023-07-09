import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { useAppDispatch } from '../../redux/hooks';
import { addWebView } from '../../redux/slices/WebViewsSlice';

const AddWebViewModal = ({ toggleModal }: any) => {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState({
    name: '',
    url: '',
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
    dispatch(addWebView({ ...formData, id }));
    toggleModal();
  };

  return (
    <div
      style={{ left: '70px' }}
      className="absolute top-0 right-0 bottom-0 backdrop-blur-sm backdrop-opacity-2 flex justify-start items-center"
    >
      <div
        className="bg-white shadow-lg"
        style={{ width: '300px', height: '100%' }}
      >
        <form onSubmit={onSubmit}>
          <h1>Add Web Apps</h1>
          <input
            value={formData.name}
            onChange={handleFormChange}
            type="text"
            placeholder="Name of web-app"
            name="name"
          />
          <input
            value={formData.url}
            onChange={handleFormChange}
            type="text"
            placeholder="https://example.com"
            name="url"
          />
          <button type="submit">Add + </button>
        </form>
      </div>
    </div>
  );
};

export default AddWebViewModal;
