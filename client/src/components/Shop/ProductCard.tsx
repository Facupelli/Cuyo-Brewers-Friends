import React from "react";
import { Product } from "../../redux/reducers/types";

type Props = {
  product: Product;
  id: string;
};

export const ProductCard: React.FC<Props> = ({ product, id }) => {
  const mockImage =
    "https://images.unsplash.com/photo-1535958636474-b021ee887b13?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80";

  return (
    <div className="bg-mainC w-64 shadow-card-shadow rounded-sm">
      <div
        className="w-64 h-56 bg-cover rounded-t-sm"
        style={{ backgroundImage: `url(${mockImage})` }}
      ></div>
      <div className="font-bold text-xl px-4 pt-4">
        <p>{product.title}</p>
      </div>
      <div className="mx-2 py-2 border-b border-bgMain">
        <p>{product.description}</p>
      </div>
      <div className="font-semibold py-4 px-2 flex ">
        <p>
          {new Intl.NumberFormat("es-AR", {
            style: "currency",
            currency: "ARS",
          }).format(Number(product.price))}
        </p>
        <button className="transition ease-in-out delay-50 ml-auto font-semibold bg-bgMain hover:bg-mainC2 text-main hover:text-white rounded px-4">BUY</button>
      </div>
    </div>
  );
};
