import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setCookie } from "../redux/action-creators";
import { RootState } from "../redux/reducers/RootReducer";

export const NavBar: React.FC = () => {
  const dispatch = useDispatch();

  const cookie = useSelector((state: RootState) => state.storeUser.cookie);

  const logOut = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    dispatch(setCookie(""));
  };

  return (
    <nav className="flex items-center bg-orange-400 p-6">
      <div className="text-white mr-24">
        <p className="font-semibold text-xl font-serif">CUYO BREWERS FRIENDS</p>
      </div>
      <div className="flex justify-center items-center gap-10">
        <div className="">
          <a href="#ref" className="font-semibold">
            Recipes
          </a>
        </div>
        <div className="">
          <a href="/createrecipe" className="font-semibold">
            Add Recipe
          </a>
        </div>
        {cookie && (
          <div className="">
            <p onClick={logOut} className="text-orange-800 cursor-pointer font-semibold">
              Log Out
            </p>
          </div>
        )}
        {!cookie && (
          <div className="">
            <Link to="/login">
              <p onClick={logOut} className="text-orange-800 cursor-pointer font-semibold">
                Log In
              </p>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};
