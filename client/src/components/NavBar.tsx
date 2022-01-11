import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { setCookie } from "../redux/action-creators";
import { RootState } from "../redux/reducers/RootReducer";
import { FaSearch } from "react-icons/fa";
import { HiMenu } from "react-icons/hi";

type Props = {
  route: string;
};

export const NavBar: React.FC<Props> = ({ route }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cookie = useSelector((state: RootState) => state.storeUser.cookie);

  const [mobileNavbar, setMobileNavbar] = useState(false);

  const handleMobileNavbar = () => {
    setMobileNavbar(!mobileNavbar);
  };

  const logOut = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    dispatch(setCookie(""));
    navigate("/home");
  };

  return (
    <>
      <nav className="bg-blue1 p-6 shadow-md">
        <div className="max-w-6xl mx-auto md:px-4">
          <div className="flex justify-between items-center">
            <div className="flex space-x-7">
              <div className="md:pr-8">
                <p className="font-semibold text-white text-xl font-serif ">
                  CUYO BREWERS FRIENDS
                </p>
              </div>
              <div className="hidden md:flex items-center space-x-6">
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
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-6 ">
              {cookie && (
                <div className="">
                  <p
                    onClick={logOut}
                    className=" cursor-pointer font-semibold "
                  >
                    Log Out
                  </p>
                </div>
              )}

              {!cookie && (
                <>
                  <div className="">
                    <Link to="/login">
                      <p
                        onClick={logOut}
                        className="cursor-pointer font-semibold"
                      >
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

            <div className="md:hidden flex items-center">
              <div
                className="text-3xl text-white cursor-pointer"
                onClick={handleMobileNavbar}
              >
                <HiMenu />
              </div>
            </div>

            {/*------------------------ MOBILE NAV BAR ------------------ */}
          </div>
        </div>
      </nav>
      {mobileNavbar && <MobileNavBar cookie={cookie} logOut={logOut} />}
    </>
  );
};

type MobileProps = {
  cookie: string;
  logOut: () => void;
};

const MobileNavBar: React.FC<MobileProps> = ({ cookie, logOut }) => {
  return (
    <div className="bg-blue1 p-6 space-y-7 text-2xl">
      <div className="space-y-2">
        <div>
          <Link to="/home">
            <p className="font-semibold ">RECIPES</p>
          </Link>
        </div>

        <div>
          <Link to="/searchrecipes">
            <div className="flex items-center gap-2">
              <p className="font-semibold ">SEARCH</p>
              <div className="text-lg">
                <FaSearch />
              </div>
            </div>
          </Link>
        </div>

        <div>
          <Link to="/myrecipes">
            <p className="font-semibold">MY RECIPES</p>
          </Link>
        </div>

        <div>
          <Link to="/createrecipe">
            <p className="font-semibold">ADD RECIPE</p>
          </Link>
        </div>
      </div>

      <div className="space-y-1">
        {cookie ? (
          <div className="">
            <p onClick={logOut} className=" cursor-pointer font-semibold ">
              Log Out
            </p>
          </div>
        ) : (
          <>
            <div className="">
              <Link to="/login">
                <p className="cursor-pointer font-semibold">Log In</p>
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
    </div>
  );
};
