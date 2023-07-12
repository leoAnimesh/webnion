import { useEffect, useRef } from 'react';

const ModalContainer = ({
  children,
  toggleModal,
  outerContainerStyles,
  innerContainerStyles,
}: any) => {
  let modalRef = useRef<any>();

  const handleClickOutside = (event: any) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      toggleModal();
    }
  };

  const handleESCKeyPress = (e: any) => {
    if (e.key === 'Escape') {
      toggleModal();
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
    <div
      style={{ ...outerContainerStyles }}
      className="absolute top-0 right-0 bottom-0 h-screen w-screen z-10  backdrop-blur-sm backdrop-opacity-2 flex justify-start items-center"
    >
      <div
        ref={modalRef}
        className="bg-white shadow-lg flex flex-col p-4 "
        style={{ ...innerContainerStyles }}
      >
        {children}
      </div>
    </div>
  );
};

export default ModalContainer;
