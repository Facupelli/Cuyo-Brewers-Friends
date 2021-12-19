import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setCookie } from "../redux/action-creators";
import { RootState } from "../redux/reducers/RootReducer";

type Props = {
  route: string;
};

export const NavBar: React.FC<Props> = ({ route }) => {
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
        {cookie && route === "createrecipe" ? (
          <div className="">
            <Link to="/home">
              <p className="font-semibold">Recipes</p>
            </Link>
          </div>
        ) : null}

        {cookie &&
          (route === "createrecipe" ? null : (
            <div className="">
              <Link to="/createrecipe">
                <p className="font-semibold">Add Recipe</p>
              </Link>
            </div>
          ))}

        {cookie && (
          <>
            <div className="">
              <p
                onClick={logOut}
                className="text-orange-800 cursor-pointer font-semibold"
              >
                Log Out
              </p>
            </div>
          </>
        )}

        {!cookie && (
          <div className="">
            <Link to="/login">
              <p
                onClick={logOut}
                className="text-orange-800 cursor-pointer font-semibold"
              >
                Log In
              </p>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};
