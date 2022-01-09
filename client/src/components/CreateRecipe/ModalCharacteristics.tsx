import React from "react";
import { GrClose } from "react-icons/gr";

type Props = {
  setModal: React.Dispatch<React.SetStateAction<any>>;
};

export const ModalCharacteristics: React.FC<Props> = ({ setModal }) => {
  const handleClose = () => {
    setModal(false);
  };

  return (
    <div className="overflow-y-auto overflow-x-hidden fixed right-0 left-0 top-4 z-50 flex justify-center items-center md:inset-0 h-modal sm:h-full">
      <div className="relative px-4 w-full max-w-2xl h-full md:h-auto">
        <div className="relative bg-white rounded-lg shadow-lg">
          <div className="flex justify-end p-3 rounded-t border-b border-blueLight">
            <div onClick={handleClose} className="cursor-pointer">
              <GrClose />
            </div>
          </div>
          <div className="p-6 space-y-6">
            <p>
              Los resultados (OG, FG, ABV, SRM) son solamente aproximaciones.
              Los verdaderos resultados dependeran de la cualidades del equipo y
              las variables que puedan o no ser controladas asi como tambien de
              la calidad de los ingredientes utilizados
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
