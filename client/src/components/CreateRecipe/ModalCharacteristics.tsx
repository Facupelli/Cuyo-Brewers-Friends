import React, { useEffect } from "react";
import { GrClose } from "react-icons/gr";

type Props = {
  setModal: React.Dispatch<React.SetStateAction<any>>;
  message: string;
};

export const ModalCharacteristics: React.FC<Props> = ({
  setModal,
  message,
}) => {
  const handleClose = () => {
    setModal(false);
    document.body.style.overflow = "unset";
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
  }, []);

  return (
    <div className="overflow-y-auto overflow-x-hidden fixed right-0 left-0 top-4 z-50 flex justify-center items-center md:inset-0 h-modal sm:h-full">
      <div className="relative px-4 w-full max-w-2xl h-full md:h-auto">
        <div className="relative bg-white rounded-lg shadow-menu-shadow">
          <div className="flex justify-end p-3 rounded-t border-b border-mainC2">
            <div
              onClick={handleClose}
              className="cursor-pointer hover:text-mainC2"
            >
              <GrClose className="hover:text-mainC2" />
            </div>
          </div>
          <div className="p-6 space-y-6">
            <p>{message}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
