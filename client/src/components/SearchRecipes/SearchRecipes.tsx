import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { NavBar } from "../NavBar";
import { SearchRecipesTable } from "./SearchRecipesTable";
import bjcp from "bjcp";
import axios from "axios";
import { RecipeList } from "../../redux/reducers/types";
import { VscLoading } from "react-icons/vsc";

interface Form {
  style: string;
  sub_category: string;
  beer_title: string;
  username: string;
  orderBy: string;
}

export const SearchRecipes: React.FC = () => {
  const [searchRecipes, setSearchRecipes] = useState<RecipeList[]>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { register, handleSubmit, reset } = useForm<Form>();

  useEffect(() => {
    axios
      .get(`/recipe?recipesPerPage=30`)
      .then((res) => setSearchRecipes(res.data.recipesList))
      .then(() => setIsLoading(false))
      .catch((e) => console.log(e));
  }, []);

  const beerSubCategories = bjcp.beers
    .map((el) => el.subcategories)
    .map((el) => el.map((el) => el.name))
    .flat();

  const clean = () => {
    setIsLoading(true);
    axios
      .get(`/recipe?recipesPerPage=30`)
      .then((res) => setSearchRecipes(res.data.recipesList))
      .then(() => setIsLoading(false))
      .catch((e) => console.log(e));
    reset()
  };

  const onSubmit = async (data: Form) => {
    try {
      const filters = {
        sub_category: data.sub_category.replace(/ /g, "%20"),
        beer_title: data.beer_title?.replace(/ /g, "%20"),
        username: data.username?.replace(/ /g, "%20"),
        orderBy: data.orderBy?.replace(/ /g, "%20"),
      };
      setIsLoading(true);
      axios
        .get(
          `/recipe?title=${filters.beer_title}&username=${filters.username}&sub_category=${filters.sub_category}&orderBy=${filters.orderBy}&recipesPerPage=30`
        )
        .then((res) => setSearchRecipes(res.data.recipesList))
        .then(() => setIsLoading(false))
        .catch((e) => console.log(e));
    } catch (e) {
      console.log({ onSubmitError: e });
    }
  };

  return (
    <>
      <NavBar route="searchrecipes" />
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-11  p-4 my-8">
          <div className="col-span-11 md:col-span-3 p-4 border-r border-main bg-mainC rounded-l mb-4">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-3 items-center mb-4">
                <label className="col-span-1 text-main font-semibold">
                  Style
                </label>
                <select
                  {...register("sub_category")}
                  className="col-span-2 p-2 bg-white border border-bgMain text-gray-700 rounded leading-tight focus:outline-none focus:bg-white focus:border-blueDark"
                >
                  <option value='undefined'>Select an option</option>
                  {beerSubCategories.map((el) => (
                    <option key={el}>{el}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-3 items-center mb-4">
                <label className="col-span-1 text-main font-semibold">
                  Beer Title:
                </label>
                <input
                  type="text"
                  {...register("beer_title")}
                  className="col-span-2 p-2 shadow appearance-none rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              <div className="grid grid-cols-3 items-center mb-4">
                <label className="col-span-1 text-main font-semibold">
                  Username:
                </label>
                <input
                  type="text"
                  {...register("username")}
                  className="col-span-2 p-2 shadow appearance-none rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              <div className="grid grid-cols-3 items-center mb-4 border-t border-main pt-4">
                <label className="col-span-1 text-main font-semibold">
                  Order by:
                </label>
                <select
                  {...register("orderBy")}
                  className="col-span-2 p-2 bg-white border border-bgMain text-gray-700 rounded leading-tight focus:outline-none focus:bg-white focus:border-blueDark"
                >
                  <option value='undefined'>Select an option</option>
                  <option value='alcohol_by_volume+asc'>ABV +</option>
                  <option value='alcohol_by_volume+desc'>ABV -</option>
                  <option value='ibu+asc'>IBU +</option>
                  <option value='ibu+desc'>IBU -</option>
                  <option value='original_gravity+asc'>OG +</option>
                  <option value='original_gravity+desc'>OG -</option>
                  <option value='rating+asc'>Rating +</option>
                  <option value='rating+desc'>Rating -</option>
                </select>
              </div>

              <div className="flex gap-4 md:mt-6 justify-end">
                <button
                  type="submit"
                  className="cursor-pointer p-2  hover:bg-bgMain font-semibold hover:text-mainC2 px-2 border border-bgMain hover:border-transparent rounded"
                >
                  Search
                </button>
                <p
                  onClick={clean}
                  className="cursor-pointer p-2  hover:bg-bgMain  font-semibold hover:text-mainC2 px-2 border border-bgMain hover:border-transparent rounded"
                >
                  Clean
                </p>
              </div>
            </form>
          </div>

          <div className="col-span-11 md:col-span-8 p-4 bg-bgMain rounded-r">
            {isLoading && (
              <div className="flex justify-center items-center mt-24">
                <div className="font-bold text-4xl text-mainC2">
                  <span>
                    <VscLoading className="animate-spin-load" />
                  </span>
                </div>
              </div>
            )}
            {searchRecipes && searchRecipes.length > 0 && !isLoading && (
              <SearchRecipesTable recipes={searchRecipes} />
            )}
            {searchRecipes && searchRecipes.length <= 0 && !isLoading && (
              <p className="flex justify-center font-semibold">
                No recipes found
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
