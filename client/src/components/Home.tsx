import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/reducers/RootReducer";
import { NavBar } from "./NavBar";
import { RecipesCardList } from "./RecipesCardList";
import { FaLongArrowAltUp } from "react-icons/fa";
import { MdAutorenew } from "react-icons/md";
import { loadMoreRecipes, loadMoreTopRecipes } from "../redux/action-creators";
import { VscLoading } from "react-icons/vsc";

export default function Home() {
  // const recipes = useSelector<RootState, Recipe[]>((state) => state.recipes);
  const dispatch = useDispatch();
  const cookie = localStorage.getItem("userId");

  const [page, setPage] = useState<number>(1);

  const loading = useSelector((state: RootState) => state.storeRecipes.loading);

  const totalRecipes = useSelector(
    (state: RootState) => state.storeRecipes.totalNumRecipes
  );

  const recipesList = useSelector(
    (state: RootState) => state.storeRecipes.recipesList
  );

  const topRecipesList = useSelector(
    (state: RootState) => state.storeRecipes.topRecipesList
  );

  const followingRecipesList = useSelector(
    (state: RootState) => state.storeUser.userData.following
  );

  const totalPages = Math.ceil(totalRecipes / 10) - 1;

  const handleLoadMore = async (page: number) => {
    if (page <= totalPages) {
      dispatch(loadMoreRecipes(page));
      dispatch(loadMoreTopRecipes(page));
      setPage(page + 1);
    }
  };

  return (
    <div className="">
      <div>
        <NavBar route="home" />
      </div>
      <div className=" ">
        <div className=" max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:mb-12 lg:pt-6">
            <div className="col-span-2 lg:col-span-1 px-6">
              <div className="flex items-center gap-2 text-main">
                <p className="my-4 ml-2 font-semibold  text-2xl">New Recipes</p>
                <div className=" text-2xl">
                  <MdAutorenew className="animate-spin-slow" />
                </div>
              </div>
              <RecipesCardList recipesList={recipesList} />
            </div>
            <div className="col-span-2 lg:col-span-1 px-6">
              <div className="flex items-center gap-2 text-main">
                <p className="my-4 ml-2 font-semibold  text-2xl">Top Recipes</p>
                <div className=" text-2xl">
                  <FaLongArrowAltUp className="animate-bounce-slow" />
                </div>
              </div>
              <RecipesCardList recipesList={topRecipesList} />
            </div>
          </div>

          {/* LOAD MORE BUTTON ---------------------------------- */}
          {!loading && (
            <div className="flex justify-center mb-10">
              <button
                onClick={() => handleLoadMore(page)}
                className={`px-2 border rounded-sm ${
                  page <= totalPages
                    ? "border-main  hover:bg-main hover:text-white"
                    : "border-gray-400 text-gray-400"
                }`}
                disabled={page <= totalPages ? false : true}
              >
                LOAD MORE
              </button>
            </div>
          )}

          {/* FOLLOWED --------------------------------------------- */}
          {cookie && (
            <div className="grid grid-cols-2 md:mb-12 lg:pt-6">
              <div className="col-span-2 lg:col-span-1 px-6">
                <div className="flex items-center gap-2 text-main">
                  <p className="my-4 ml-2 font-semibold  text-2xl">
                    Hombrewers Followed:
                  </p>
                </div>
                {followingRecipesList.length > 0 ? (
                  <RecipesCardList
                    recipesList={followingRecipesList
                      .map((user) => user.ownRecipes)
                      .flat()}
                  />
                ) : (
                  <>
                    <span className="font-semibold mx-2 text-lg text-main bg-mainC">
                      You are not following any homebrewer.
                    </span>
                    <p className="font-semibold mx-2 text-main ">
                      Start following homebrewers you like to see their latest
                      recipes!
                    </p>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* LOADING ----------------------------- */}
      {loading && (
        <div className="flex justify-center items-center mb-10">
          <div className="font-bold text-4xl text-mainC2">
            <span>
              <VscLoading className="animate-spin-load" />
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
