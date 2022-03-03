import React from "react";
import { NavBar } from "../NavBar";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Product } from "../../redux/reducers/types";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/reducers/RootReducer";

const schema = yup.object().shape({
  title: yup.string().required().min(3),
  description: yup.string().max(50),
  price: yup.number().typeError("Price must be a number").min(1),
});

export const PostProduct: React.FC = () => {
  const username = useSelector(
    (state: RootState) => state.storeUser.userData.username
  );
  const user_id = useSelector(
    (state: RootState) => state.storeUser.userData._id
  );

  const methods = useForm<Product>({ resolver: yupResolver(schema) });
  const errors = methods.formState.errors;
  console.log("ERRORS", errors);

  const formSubmitHandler: SubmitHandler<Product> = async (data: Product) => {
    try {
      console.log("FORM DATA IS", data);
      const info = {
        images: [""],
        title: data.title,
        description: data.description,
        price: data.price,
        available: true,
      };

      const newProduct = {
        product: info,
        username,
        user_id,
      };
      await axios.post("/products", newProduct);
    } catch (e) {
      console.log({ onSubmitError: e });
    }
  };

  return (
    <div>
      <NavBar route="postproduct" />
      <div className="max-w-2xl mx-auto mt-24">
        <form onSubmit={methods.handleSubmit(formSubmitHandler)}>
          <div className="grid grid-cols-3 gap-y-4 items-center">
            <label className="col-span-1 font-semibold">Title:</label>
            <input
              className="col-span-2  p-2 shadow-input appearance-none rounded-sm text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              {...methods.register("title")}
            />
            {errors.title && (
              <>
                <div className="col-span-1"></div>
                <div className=" col-span-2  text-orange-600 text-sm">
                  <span>{errors && errors.title?.message}</span>
                </div>
              </>
            )}

            <label className="col-span-1 font-semibold">
              Brief description:
            </label>
            <input
              className="col-span-2 p-2 shadow-input appearance-none rounded-sm text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              {...methods.register("description")}
            />
            {errors.description && (
              <>
                <div className="col-span-1"></div>
                <div className="col-span-2  text-orange-600 text-sm">
                  <span>{errors.description?.message}</span>
                </div>
              </>
            )}

            <label className="col-span-1 font-semibold">Price:</label>
            <input
              className="col-span-2  p-2 shadow-input appearance-none rounded-sm text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              {...methods.register("price")}
            />
            {errors.price && (
              <>
                <div className="col-span-1"></div>
                <div className="col-span-2  text-orange-600 text-sm">
                  <span>{errors && errors.price?.message}</span>
                </div>
              </>
            )}
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="transition ease-in-out delay-50 mt-6 p-2 text-sm rounded-sm font-semibold border border-main hover:border-mainC2 hover:bg-mainC2 hover:text-white"
            >
              POST PRODUCT
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
