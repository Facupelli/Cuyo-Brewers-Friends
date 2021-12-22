import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipes } from "../redux/action-creators";
import { RootState } from "../redux/reducers/RootReducer";
import { useForm } from "react-hook-form";
import { NavBar } from "./NavBar";

interface Form {
  style: string;
  sub_category: string;
  beer_title: string;
  username: string;
}

export const SearchRecipes: React.FC = () => {
  const dispatch = useDispatch();

  const recipes = useSelector(
    (state: RootState) => state.storeRecipes.recipesList
  );

  const { register, handleSubmit, reset } = useForm<Form>();

  const onSubmit = async (data: Form) => {
    try {
      console.log(data);
      dispatch(getRecipes(data));
      reset();
    } catch (e) {
      console.log({ onSubmitError: e });
    }
  };

  return (
    <>
      <NavBar route="searchrecipes" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-10 bg-orange-400 p-4 m-8 gap-2">
          <div className="col-span-2 bg-orange-100">
            <div className="grid grid-cols-2 mb-4">
              <label className="col-span-1">Style</label>
              <select {...register("style")} className="col-span-1">
                <option disabled>Style</option>
              </select>
            </div>

            <div className="grid grid-cols-2 mb-4">
              <label className="col-span-1">Sub Category</label>
              <select {...register("sub_category")} className="col-span-1">
                <option disabled>Sub Category</option>
              </select>
            </div>

            <div className="grid grid-cols-2 mb-4">
              <label className="col-span-1">Beer Title</label>
              <input
                type="text"
                {...register("beer_title")}
                className="col-span-1"
              />
            </div>

            <div className="grid grid-cols-2 mb-4">
              <label className="col-span-1">Username</label>
              <input
                type="text"
                {...register("username")}
                className="col-span-1"
              />
            </div>

            <button type="submit">Search</button>
          </div>
          <div className="col-span-8 bg-orange-200">
            {recipes &&
              recipes.map((el) => (
                <div key={el._id} className="flex gap-4">
                  <p className="">{el.recipe.title}</p>
                  <p>{el.username}</p>
                </div>
              ))}
          </div>
        </div>
      </form>
    </>
  );
};
