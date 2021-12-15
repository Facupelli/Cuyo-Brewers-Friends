import React from "react";

export const NavBar: React.FC = () => {
  return (
    <nav className="flex items-center bg-orange-400 p-6">
      <div className="text-white mr-24">
        <p className="font-semibold text-xl font-serif">
          CUYO BREWERS FRIENDS
        </p>
      </div>
      <div className="flex justify-center items-center gap-10">
        <div className="">
          <a
            href="#ref"
            className="mt-4 font-semibold"
          >
            Recipes
          </a>
        </div>
        <div className="">
          <a
            href="/createrecipe"
            className="mt-4 font-semibold"
          >
            Add Recipe
          </a>
        </div>
      </div>
    </nav>
  );
};
