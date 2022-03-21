
type Props = {
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  message: string;
  pathTo: string;
  handleSeller: () => void
};

export const BecomeSellerModal: React.FC<Props> = ({ setModal, message, pathTo, handleSeller }) => {

  const handleClick = () => {
    setModal(false);
  };

  return (
    <div className="overflow-y-auto overflow-x-hidden fixed right-0 left-0 top-4 z-50 flex justify-center items-center md:inset-0 h-modal sm:h-full">
      <div className="relative px-4 w-full max-w-lg h-full md:h-auto">
        <div className="relative bg-white rounded-lg shadow-menu-shadow">
          <div className="border rounded-lg p-6 space-y-6">
            <div className="flex justify-center">
              <p className="text-lg font-semibold">
                {message}
              </p>
            </div>
            <div className="flex justify-evenly">
              <button
                className="transition ease-in-out duration-150 bg-mainC rounded p-2 px-4 hover:bg-mainC2 hover:text-white"
                onClick={handleSeller}
              >
                YES
              </button>
              <button
                className="transition ease-in-out duration-150 bg-mainC rounded p-2 px-4 hover:bg-mainC2 hover:text-white"
                onClick={handleClick}
              >
                NO
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

