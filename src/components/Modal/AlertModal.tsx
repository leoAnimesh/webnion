import ModalContainer from './ModalContainer';

const AlertModal: React.FC<{
  toggleModal: () => void;
  title: string;
  actionButtonTitle: string;
  message: string;
  actionBtnFunc: () => void;
}> = ({ toggleModal, title, actionBtnFunc, actionButtonTitle, message }) => {
  return (
    <ModalContainer
      outerContainerStyles={{ justifyContent: 'center' }}
      innerContainerStyles={{
        width: '30%',
        height: 'fit-content',
        borderRadius: '10px',
      }}
      toggleModal={toggleModal}
    >
      <section>
        <h1 className="text-center font-medium">{title}</h1>
        <hr className="my-2" />
        <p className="text-sm">{message}</p>
        <div className="flex justify-end gap-3 mt-3">
          <button
            className="dark:bg-dark py-1 border-2 px-3 rounded-md capitalize text-sm"
            onClick={toggleModal}
          >
            cancel
          </button>
          <button
            className="py-1 px-3 rounded-md capitalize text-white text-sm bg-red-500"
            onClick={actionBtnFunc}
          >
            {actionButtonTitle}
          </button>
        </div>
      </section>
    </ModalContainer>
  );
};

export default AlertModal;
