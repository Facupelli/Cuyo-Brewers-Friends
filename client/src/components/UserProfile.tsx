import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { UserData } from "../redux/reducers/types";
import { getUserByUsername } from "../utils/blogUtils";
import { NavBar } from "./NavBar";
import { RecipeCard } from "./RecipeCard";

type ParamsType = {
  username: string;
};

type UserProfileState = {
  userProfile: UserData;
};

export const UserProfile: React.FC = () => {
  const username = useParams<ParamsType>();
  const [userProfile, setUserProfile] = useState<UserProfileState>();

  useEffect(() => {
    getUserByUsername(username.username)
      .then((data) => setUserProfile({ userProfile: data }))
      .catch((e) => console.log(e));
  }, [username]);

  return (
    <div>
      <NavBar route="userprofile" />
      <div className="max-w-7xl md:mx-auto mx-4 mt-8">
        <div>
          <div className="flex gap-4 items-baseline">
            <span className="text-4xl pb-3 border-b-2 border-blueLight">
              {userProfile?.userProfile.username}
            </span>
            <p className="text-gray-500 text-lg">homebrewer</p>
          </div>
          <div className="grid grid-cols-2 gap-y-8 md:gap-x-8 mt-12">
            <div className="col-span-2 md:col-span-1">
              <p className="font-semibold text-xl md:ml-2">MY RECIPES:</p>
              {userProfile &&
                userProfile.userProfile.ownRecipes.map((recipe, i) => (
                  <RecipeCard key={i} recipe={recipe.recipe} id={recipe._id} />
                ))}
            </div>

            <div className="col-span-2 md:col-span-1">
              <p className="font-semibold text-xl">MY ARTICLES:</p>
              {userProfile?.userProfile.ownBlogs.map((el, i) => (
                <div
                  key={i}
                  className="flex md:gap-x-3 bg-blue-50 rounded shadow hover:shadow-none p-4 my-3"
                >
                  <Link to={`/blogdetail/${el._id}`}>
                    <p className="transition ease-in-out duration-150 hover:text-brown1">
                      {el.blog_title}
                    </p>
                  </Link>
                  <p className="text-gray-400 ml-auto">{el.date}</p>
                </div>
              ))}
            </div>

            <div className="col-span-2 md:col-span-1">
              <p className="font-semibold text-xl md:ml-2">MY FAVS:</p>
              {userProfile &&
                userProfile.userProfile.favs.map((recipe, i) => (
                  <RecipeCard key={i} recipe={recipe.recipe} id={recipe._id} />
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
