import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { setCookie } from "../redux/action-creators";
import { RootState } from "../redux/reducers/RootReducer";

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
    <nav className="grid grid-cols-7 bg-orange-400 px-6 py-2">
      <div className="col-span-2 flex text-white mr-24">
        <p className="font-semibold text-xl font-serif ">
          CUYO BREWERS FRIENDS
        </p>
      </div>
      <div className="col-span-5 flex justify-start items-center  gap-10">
        {cookie && route === "home" ? null : (
          <div className="">
            <Link to="/home">
              <p className="font-semibold">Recipes</p>
            </Link>
          </div>
        )}

        {cookie &&
          (route === "searchrecipes" ? null : (
            <div className="">
              <Link to="/searchrecipes">
                <p className="font-semibold">Search</p>
              </Link>
            </div>
          ))}

        {cookie &&
          (route === "myrecipes" ? null : (
            <div className="">
              <Link to="/myrecipes">
                <p className="font-semibold">My Recipes</p>
              </Link>
            </div>
          ))}

        {cookie &&
          (route === "createrecipe" ? null : (
            <div className="">
              <Link to="/createrecipe">
                <p className="font-semibold">Add Recipe</p>
              </Link>
            </div>
          ))}

        {cookie && (
          <div className="ml-auto ">
            <p
              onClick={logOut}
              className="text-orange-800 cursor-pointer font-semibold"
            >
              Log Out
            </p>
          </div>
        )}

        {!cookie && (
          <>
            <div className="ml-auto">
              <Link to="/login">
                <p
                  onClick={logOut}
                  className="text-orange-800 cursor-pointer font-semibold"
                >
                  Log In
                </p>
              </Link>
            </div>
            <div>
              <Link to="/register">
                <p className="text-orange-800 cursor-pointer font-semibold">
                  Register
                </p>
              </Link>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};
