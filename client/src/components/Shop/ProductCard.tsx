import React, { useState } from "react";
import { Product } from "../../redux/reducers/types";
import { MdModeEdit } from "react-icons/md";
import { AiOutlineSave } from "react-icons/ai";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/reducers/RootReducer";
import { getUserByUsername } from "../../utils/blogUtils";

type Props = {
  product: Product;
  id: string;
  own: boolean;
  setUserProfile?: React.Dispatch<React.SetStateAction<any>>;
};

const schema = yup.object().shape({
  title: yup.string().required().min(3),
  description: yup.string().max(50),
  price: yup.number().typeError("Price must be a number").min(1),
  available: yup.boolean(),
});

export const ProductCard: React.FC<Props> = ({
  product,
  id,
  own,
  setUserProfile,
}) => {
  const mockImage =
    "https://images.unsplash.com/photo-1535958636474-b021ee887b13?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80";

  const [edit, setEdit] = useState<Boolean>(false);

  const handleEditClick = () => {
    setEdit(true);
  };

  const methods = useForm<Product>({ resolver: yupResolver(schema) });

  const username = useSelector(
    (state: RootState) => state.storeUser.userData.username
  );
  const user_id = useSelector(
    (state: RootState) => state.storeUser.userData._id
  );

  const formSubmitHandler: SubmitHandler<Product> = async (data: Product) => {
    try {
      console.log("FORM DATA IS", data);
      const info = {
        title: data.title,
        description: data.description,
        price: data.price,
        available: Boolean(data.available),
        _id: id,
      };

      const newProduct = {
        productInfo: info,
        username,
        _id: user_id,
      };
      await axios.put("/products", newProduct);
      setEdit(false);
      if (setUserProfile) {
        getUserByUsername(username)
          .then((data) => setUserProfile({ userProfile: data }))
          .catch((e) => console.log(e));
      }
    } catch (e) {
      console.log({ onSubmitError: e });
    }
  };

  return (
    <div className="bg-mainC w-64 shadow-card-shadow rounded-sm">
      <div
        className="w-64 h-56 bg-cover rounded-t-sm"
        style={{ backgroundImage: `url(${mockImage})` }}
      ></div>
      <form onSubmit={methods.handleSubmit(formSubmitHandler)}>
        <div className="font-bold text-xl px-4 pt-4">
          {!edit ? (
            <p>{product.title}</p>
          ) : (
            <input
              {...methods.register("title")}
              defaultValue={product.title}
              className="rounded bg-edit text-gray-600 focus:outline-none active:font-semibold px-2"
            />
          )}
        </div>
        <div className="mx-2 py-2 border-b border-bgMain">
          {!edit ? (
            <p>{product.description}</p>
          ) : (
            <textarea
              {...methods.register("description")}
              defaultValue={product.description}
              className="rounded bg-edit text-gray-600 w-full focus:outline-none active:font-semibold px-2"
            />
          )}
        </div>
        <div
          className={`font-semibold pt-4 px-2 flex ${own ? "null" : "pb-4"}`}
        >
          {!edit ? (
            <p>
              {new Intl.NumberFormat("es-AR", {
                style: "currency",
                currency: "ARS",
              }).format(Number(product.price))}
            </p>
          ) : (
            <input
              {...methods.register("price")}
              defaultValue={product.price}
              className="rounded bg-edit text-gray-600 focus:outline-none active:font-semibold px-2"
            />
          )}

          {!own ? (
            <button className="transition ease-in-out delay-50 ml-auto font-semibold bg-bgMain hover:bg-mainC2 text-main hover:text-white rounded px-4">
              BUY
            </button>
          ) : (
            <>
              {!edit && (
                <button
                  onClick={handleEditClick}
                  className="transition ease-in-out delay-50 ml-auto font-semibold bg-bgMain hover:bg-mainC2 text-main hover:text-white rounded p-2"
                >
                  <MdModeEdit />
                </button>
              )}
              {edit && (
                <button
                  type="submit"
                  className="transition ease-in-out delay-50 ml-auto font-semibold bg-bgMain hover:bg-mainC2 text-main hover:text-white rounded p-2"
                >
                  <AiOutlineSave />
                </button>
              )}
            </>
          )}
        </div>
        {own ? (
          <div className="font-semibold p-2 flex ">
            <p>{product.date}</p>
            {edit && (
              <select {...methods.register('available')} className="ml-auto focus:outline-none bg-edit">
                <option value={1}>Available</option>
                <option value={0}>No Stock</option>
              </select>
            )}
            {!edit && (
              <p
              className={`ml-auto ${
                product.available ? "text-mainC2" : "text-red-500"
              }`}
            >
              {product.available ? "Avialable" : "No Stock"}
            </p>
            )}
            
          </div>
        ) : null}
      </form>
    </div>
  );
};
