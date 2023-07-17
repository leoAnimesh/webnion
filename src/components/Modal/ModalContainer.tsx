import { useEffect, useRef, ReactNode } from 'react';

interface ModalContainerProps {
  children: ReactNode;
  toggleModal: () => void;
  outerContainerStyles: { [key: string]: string | number };
  innerContainerStyles: { [key: string]: string | number };
}

const ModalContainer: React.FC<ModalContainerProps> = ({
  children,
  toggleModal,
  outerContainerStyles,
  innerContainerStyles,
}) => {
  let modalRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = ({ target }: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(target as Node)) {
      toggleModal();
    }
  };

  const handleESCKeyPress = (e: KeyboardEvent) => {
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
        className="bg-white dark:bg-darker dark:border-dark border-2 dark:text-white shadow-lg flex flex-col p-4 "
        style={{ ...innerContainerStyles }}
      >
        {children}
      </div>
    </div>
  );
};

export default ModalContainer;
