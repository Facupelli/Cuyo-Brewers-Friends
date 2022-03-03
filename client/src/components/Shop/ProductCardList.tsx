import React from "react";
import { Product } from "../../redux/reducers/types";
import { ProductCard } from "./ProductCard";

type Props = {
  productList: Product[];
};

export const ProductCardList: React.FC<Props> = ({ productList }) => {
  return (
    <div>
      <div className="mx-10 mt-24 grid grid-cols-4 gap-y-12">
        {productList &&
          productList.map((product) => (
            <div className="col-span-1" key={product._id}>
              <ProductCard own={false} product={product} id={product._id} />
            </div>
          ))}
      </div>
    </div>
  );
};
