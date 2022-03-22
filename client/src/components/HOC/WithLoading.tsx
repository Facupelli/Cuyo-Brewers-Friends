import React from "react";
import { VscLoading } from "react-icons/vsc";
import { NavBar } from "../NavBar";

type Props = {
  isLoading: boolean;
  children: React.ReactNode;
};

export const WithLoading = ({ isLoading, children }: Props) => {
  if (!isLoading) return <>{children}</>;
  return (
    <>
      <NavBar route="home" />
      <div className="flex justify-center items-center mt-32">
        <div className="font-bold text-4xl text-mainC2">
          <span>
            <VscLoading className="animate-spin-load" />
          </span>
        </div>
      </div>
    </>
  );
};
