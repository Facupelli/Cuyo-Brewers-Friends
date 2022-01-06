import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { setCookie } from "../redux/action-creators";
import { RootState } from "../redux/reducers/RootReducer";
import { FaSearch } from "react-icons/fa";

type Props = {
  route: string;
};

export const NavBar: React.FC<Props> = ({ route }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cookie = useSelector((state: RootState) => state.storeUser.cookie);

  const logOut = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    dispatch(setCookie(""));
    navigate("/home");
  };

  return (
    <nav className="grid grid-cols-7 bg-blue1 px-6 py-4 shadow-md">
      <div className="col-span-2 flex text-white mr-24">
        <p className="font-semibold text-xl font-serif ">
          CUYO BREWERS FRIENDS
        </p>
      </div>
      <div className="col-span-5 flex justify-start items-center  gap-10">
        {cookie && (
          <div className="">
            {route === "home" ? (
              <Link to="/home">
                <p className="font-semibold text-white border-b-2 border-blueLight">
                  RECIPES
                </p>
              </Link>
            ) : (
              <Link to="/home">
                <p className="font-semibold">RECIPES</p>
              </Link>
            )}
          </div>
        )}

        {cookie && (
          <div className="">
            {route === "searchrecipes" ? (
              <Link to="/searchrecipes">
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-white border-b-2 border-blueLight">
                    SEARCH
                  </p>
                  <div className="text-white">
                    <FaSearch />
                  </div>
                </div>
              </Link>
            ) : (
              <Link to="/searchrecipes">
                <div className="flex items-center gap-2">
                  <p className="font-semibold ">SEARCH</p>
                  <div className="text-xs">
                    <FaSearch />
                  </div>
                </div>
              </Link>
            )}
          </div>
        )}

        {cookie && (
          <div className="">
            {route === "myrecipes" ? (
              <Link to="/myrecipes">
                <p className="font-semibold text-white border-b-2 border-blueLight">
                  MY RECIPES
                </p>
              </Link>
            ) : (
              <Link to="/myrecipes">
                <p className="font-semibold">MY RECIPES</p>
              </Link>
            )}
          </div>
        )}

        {cookie && (
          <div className="">
            {route === "createrecipe" ? (
              <Link to="/createrecipe">
                <p className="font-semibold text-white border-b-2 border-blueLight">
                  ADD RECIPE
                </p>
              </Link>
            ) : (
              <Link to="/createrecipe">
                <p className="font-semibold">ADD RECIPE</p>
              </Link>
            )}
          </div>
        )}

        {cookie && (
          <div className="ml-auto ">
            <p onClick={logOut} className=" cursor-pointer font-semibold ">
              Log Out
            </p>
          </div>
        )}

        {!cookie && (
          <>
            <div className="ml-auto">
              <Link to="/login">
                <p onClick={logOut} className="cursor-pointer font-semibold">
                  Log In
                </p>
              </Link>
            </div>
            <div>
              <Link to="/register">
                <p className="cursor-pointer font-semibold">Register</p>
              </Link>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};
