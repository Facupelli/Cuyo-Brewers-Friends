import React from "react";
import { NavBar } from "../NavBar";

export const Shop: React.FC = () => {
  return (
    <div>
      <div>
        <NavBar route="shop" />
      </div>
      <p className="flex justify-center mt-24 font-bold text-2xl">SHOP COMING SOON...</p>
    </div>
  );
};
