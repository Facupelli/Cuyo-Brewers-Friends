import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/reducers/RootReducer";
import { NavBar } from "../NavBar";
import { ProductCardList } from "./ProductCardList";

export const Shop: React.FC = () => {
  const productList = useSelector(
    (state: RootState) => state.storeProducts.productsList
  );

  // console.log('PRODUCTLIST', productList)

  return (
    <div className="mb-12">
      <div>
        <NavBar route="shop" />
      </div>
      <p className="flex justify-center mt-24 font-bold text-2xl">
        SHOP COMING SOON...
      </p>

      {/* <ProductCardList productList={productList} /> */}
    </div>
  );
};
