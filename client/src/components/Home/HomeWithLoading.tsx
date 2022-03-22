import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/reducers/RootReducer";
import { WithLoading } from "../HOC/WithLoading";
import Home from "./Home";

export const HomeWithLoading: React.FC = () => {
  const storeRecipes = useSelector(
    (state: RootState) => state.storeRecipes.loading
  );

  return (
    <>
      <WithLoading isLoading={storeRecipes}>
        <Home />
      </WithLoading>
    </>
  );
};
