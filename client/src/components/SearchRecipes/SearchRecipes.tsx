import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipes } from "../../redux/action-creators";
import { RootState } from "../../redux/reducers/RootReducer";
import { useForm } from "react-hook-form";
import { NavBar } from "../NavBar";
import { SearchRecipesTable } from "./SearchRecipesTable";
import bjcp from "bjcp";

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

  const beerSubCategories = bjcp.beers
    .map((el) => el.subcategories)
    .map((el) => el.map((el) => el.name))
    .flat();

  const { register, handleSubmit, reset } = useForm<Form>();

  const clean = () => {
    dispatch(getRecipes());
  };

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
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-11  p-4 my-8">
          <div className="col-span-3 p-4 border-r border-blueDark bg-gray-200 rounded-l">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-3 items-center mb-4">
                <label className="col-span-1 text-brown1">Style</label>
                <select
                  {...register("sub_category")}
                  autoComplete="on"
                  className="col-span-2 p-2 bg-white border border-blueLight text-gray-700 rounded leading-tight focus:outline-none focus:bg-white focus:border-blueDark"
                >
                  <option disabled>Style:</option>
                  {beerSubCategories.map((el) => (
                    <option>{el}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 items-center mb-4">
                <label className="col-span-1 text-brown1">Beer Title:</label>
                <input
                  type="text"
                  {...register("beer_title")}
                  className="col-span-1 p-2 shadow appearance-none rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              <div className="grid grid-cols-2 items-center mb-4">
                <label className="col-span-1 text-brown1">Username:</label>
                <input
                  type="text"
                  {...register("username")}
                  className="col-span-1 p-2 shadow appearance-none rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              <div className="flex gap-4 mt-16 justify-center">
                <button
                  type="submit"
                  className="cursor-pointer bg-transparent hover:bg-blueLight font-semibold hover:text-white px-2 border border-blueLight hover:border-transparent rounded"
                >
                  Search
                </button>
                <p
                  onClick={clean}
                  className="cursor-pointer bg-transparent hover:bg-blueLight  font-semibold hover:text-white px-2 border border-blueLight hover:border-transparent rounded"
                >
                  Clean
                </p>
              </div>
            </form>
          </div>

          <div className="col-span-8 p-4 bg-gray-100 rounded-r">
            <SearchRecipesTable recipes={recipes} />
          </div>

          {/* <div className="col-span-8 bg-orange-200 ">
          <div className="grid grid-cols-12 mb-4">
            <p className="col-span-2 font-semibold">Title</p>
            <p className="col-span-3 font-semibold">Style</p>
            <p className="col-span-1 font-semibold">Size</p>
            <p className="col-span-1 font-semibold">OG</p>
            <p className="col-span-1 font-semibold">FG</p>
            <p className="col-span-1 font-semibold">ABV</p>
            <p className="col-span-1 font-semibold">IBU</p>
            <p className="col-span-1 font-semibold">Color</p>
            <p className="col-span-1 font-semibold">Rating</p>
          </div>
          {recipes &&
            recipes.map((el) => (
              <div key={el._id} className="grid grid-cols-12 mb-2">
                <p className="col-span-2">{el.recipe.title}</p>
                <p className="col-span-3">{el.recipe.style.split(". ")[1]}</p>
                <p className="col-span-1">{el.recipe.parameters.batch_size}</p>
                <p className="col-span-1">
                  {el.recipe.characteristics.original_gravity}
                </p>
                <p className="col-span-1">
                  {el.recipe.characteristics.final_gravity}
                </p>
                <p className="col-span-1">
                  {el.recipe.characteristics.alcohol_by_volume}
                </p>
                <p className="col-span-1">{el.recipe.characteristics.ibu}</p>
                <p className="col-span-1">{el.recipe.characteristics.srm}</p>
                <p className="col-span-12 text-sm text-gray-500">
                  {el.username}
                </p>
              </div>
            ))}
        </div> */}
        </div>
      </div>
    </>
  );
};
