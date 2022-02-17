import { useNavigate } from "react-router-dom";

type Props = {
  setModal: React.Dispatch<React.SetStateAction<any>>;
  message: string;
  pathTo: string
};

export const Modal: React.FC<Props> = ({ setModal, message, pathTo }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`${pathTo}`);
  };

  return (
    <div className="overflow-y-auto overflow-x-hidden fixed right-0 left-0 top-4 z-50 flex justify-center items-center md:inset-0 h-modal sm:h-full">
      <div className="relative px-4 w-full max-w-lg h-full md:h-auto">
        <div className="relative bg-white rounded-lg shadow-lg">
          <div className="border rounded-lg p-6 space-y-6">
            <div className="flex justify-center">
              <p className="text-lg font-semibold">
                {message}
              </p>
            </div>
            <div className="flex justify-evenly">
              <button
                className="transition ease-in-out duration-150 bg-mainC rounded p-2 px-4 hover:bg-bgMain hover:text-mainC"
                onClick={handleClick}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
