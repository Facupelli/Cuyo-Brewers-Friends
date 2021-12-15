import React from "react";

export const NavBar: React.FC = () => {
  return (
    <nav className="flex items-center flex-wrap bg-orange-400 p-6">
      <div className="text-white mr-6">
        <p className="font-semibold text-xl tracking-tight font-serif">
          CUYO BREWERS FRIENDS
        </p>
      </div>
      <div className="ml-24 w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div className="text-sm lg:flex-grow">
          <a
            href="#ref"
            className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
          >
            Recipes
          </a>
        </div>
      </div>
    </nav>
  );
};
