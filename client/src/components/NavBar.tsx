import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { setCookie } from "../redux/action-creators";
import { RootState } from "../redux/reducers/RootReducer";
import { FaSearch, FaUserCircle } from "react-icons/fa";
import { HiMenu } from "react-icons/hi";

type Props = {
  route: string;
};

export const NavBar: React.FC<Props> = ({ route }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cookie = useSelector((state: RootState) => state.storeUser.cookie);
  const username = useSelector(
    (state: RootState) => state.storeUser.userData.username
  );

  const [mobileNavbar, setMobileNavbar] = useState(false);

  const handleMobileNavbar = () => {
    setMobileNavbar(!mobileNavbar);
  };

  const [userMenu, setUserMenu] = useState(false);
  const container = useRef(document.createElement("div"));

  const hanldeUserMenu = () => {
    setUserMenu(!userMenu);
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (container.current) {
        if (!container.current.contains(event.target as Node)) {
          if (!userMenu) return;
          setUserMenu(false);
        }
      }
    };

    window.addEventListener("click", handleOutsideClick);
    return () => window.removeEventListener("click", handleOutsideClick);
  }, [userMenu, container]);

  const logOut = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    dispatch(setCookie(""));
    navigate("/");
  };

  return (
    <>
      <nav className="bg-main p-6 shadow-navbar-shadow">
        <div className="max-w-6xl mx-auto md:px-4">
          <div className="flex justify-between items-center">
            <div className="flex space-x-7">
              <div className="md:pr-8">
                <p className="font-semibold text-white text-2xl font-title ">
                  CUYO BREWERS FRIENDS
                </p>
              </div>
              <div className="hidden md:flex items-center space-x-6">
                <div className="">
                  {route === "home" ? (
                    <Link to="/">
                      <p className="font-semibold text-mainC2 border-b-2 border-mainC2">
                        RECIPES
                      </p>
                    </Link>
                  ) : (
                    <Link to="/">
                      <p className="font-semibold text-mainC hover:text-bgMain">
                        RECIPES
                      </p>
                    </Link>
                  )}
                </div>

                <div className="">
                  {route === "searchrecipes" ? (
                    <Link to="/searchrecipes">
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-mainC2 border-b-2 border-mainC2">
                          SEARCH
                        </p>
                        <div className="text-mainC2">
                          <FaSearch />
                        </div>
                      </div>
                    </Link>
                  ) : (
                    <Link to="/searchrecipes">
                      <div className="flex items-center gap-2 text-mainC hover:text-bgMain">
                        <p className="font-semibold  ">SEARCH</p>
                        <div className="text-xs">
                          <FaSearch />
                        </div>
                      </div>
                    </Link>
                  )}
                </div>

                {cookie && (
                  <div className="">
                    {route === "createrecipe" ? (
                      <Link to="/createrecipe">
                        <p className="font-semibold text-mainC2 border-b-2 border-mainC2">
                          ADD RECIPE
                        </p>
                      </Link>
                    ) : (
                      <Link to="/createrecipe">
                        <p className="font-semibold text-mainC hover:text-bgMain">
                          ADD RECIPE
                        </p>
                      </Link>
                    )}
                  </div>
                )}

                <div className="">
                  {route === "blog" ? (
                    <Link to="/blog">
                      <span className="font-semibold text-mainC2 border-b-2 py-1 border-mainC2">
                        BLOG
                      </span>
                    </Link>
                  ) : (
                    <Link to="/blog">
                      <p className="font-semibold text-mainC hover:text-bgMain">
                        BLOG
                      </p>
                    </Link>
                  )}
                </div>

                <div className="">
                  {route === "shop" ? (
                    <Link to="/shop">
                      <span className="font-semibold text-mainC2 border-b-2 py-1 border-mainC2">
                        SHOP
                      </span>
                    </Link>
                  ) : (
                    <Link to="/shop">
                      <p className="font-semibold text-mainC hover:text-bgMain">
                        SHOP
                      </p>
                    </Link>
                  )}
                </div>
              </div>
            </div>

            <div ref={container} className="hidden md:block relative ">
              <button
                onClick={hanldeUserMenu}
                className={`menu flex gap-2 items-center focus:outline-none focus:shadow-solid font-semibold ${
                  userMenu ? "text-mainC2" : "text-mainC hover:text-bgMain"
                }`}
              >
                MENU
                <FaUserCircle className="text-2xl" />
              </button>

              {userMenu && (
                <div className="origin-top-right absolute right-0 w-48 p-2 mt-2 bg-white rounded shadow-menu-shadow">
                  {cookie && (
                    <>
                      <div
                        className={`${
                          route === `/userprofile/${username}` ? "my-2" : "mb-0"
                        }`}
                      >
                        {route === `/userprofile/${username}` ? (
                          <Link to={`/userprofile/${username}`}>
                            <span className="font-semibold  border-b-2 border-mainC2">
                              MY PROFILE
                            </span>
                          </Link>
                        ) : (
                          <Link to={`/userprofile/${username}`}>
                            <p className="transition ease-in-out duration-150 font-semibold hover:text-mainC">
                              MY PROFILE
                            </p>
                          </Link>
                        )}
                      </div>
                      <div
                        className={`${route === "myrecipes" ? "mb-2" : "mb-0"}`}
                      >
                        {route === "myrecipes" ? (
                          <Link to="/myrecipes">
                            <span className="font-semibold  border-b-2 border-mainC2 ">
                              MY RECIPES
                            </span>
                          </Link>
                        ) : (
                          <Link to="/myrecipes">
                            <p className="transition ease-in-out duration-150 font-semibold hover:text-mainC">
                              MY RECIPES
                            </p>
                          </Link>
                        )}
                      </div>

                      <div
                        className={`${
                          route === "createblog" ? "my-1" : "my-0"
                        }`}
                      >
                        {route === "createblog" ? (
                          <Link to="/createblog">
                            <span className="font-semibold  border-b-2 border-mainC2">
                              ADD ARTICLE
                            </span>
                          </Link>
                        ) : (
                          <Link to="/createblog">
                            <p className="transition ease-in-out duration-150 font-semibold hover:text-mainC">
                              ADD ARTICLE
                            </p>
                          </Link>
                        )}
                      </div>
                    </>
                  )}
                  {cookie && (
                    <div className="mt-2 border-t border-blue-100">
                      <p
                        onClick={logOut}
                        className="transition ease-in-out duration-150 cursor-pointer font-semibold hover:text-mainC"
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
                            className="transition ease-in-out duration-150 cursor-pointer font-semibold hover:text-mainC"
                          >
                            Log In
                          </p>
                        </Link>
                      </div>
                      <div>
                        <Link to="/register">
                          <p className="transition ease-in-out duration-150 cursor-pointer font-semibold hover:text-mainC">
                            Register
                          </p>
                        </Link>
                      </div>
                    </>
                  )}
                </div>
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
      {mobileNavbar && (
        <MobileNavBar
          cookie={cookie}
          logOut={logOut}
          route={route}
          username={username}
        />
      )}
    </>
  );
};

//---------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------

type MobileProps = {
  cookie: string;
  logOut: () => void;
  route: string;
  username: string;
};

const MobileNavBar: React.FC<MobileProps> = ({
  route,
  cookie,
  logOut,
  username,
}) => {
  return (
    <div className="bg-main text-mainC  pl-6 pb-6 space-y-5 text-xl pt-4">
      <div className="space-y-2">
        <div className="">
          {route === "home" ? (
            <Link to="/">
              <span className="font-semibold text-white border-b-2 py-1 border-mainC2">
                RECIPES
              </span>
            </Link>
          ) : (
            <Link to="/">
              <p className="font-semibold hover:text-white">RECIPES</p>
            </Link>
          )}
        </div>

        <div className="">
          {route === "searchrecipes" ? (
            <Link to="/searchrecipes">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-white border-b-2 py-1 border-mainC2">
                  SEARCH
                </span>
                <div className="text-white">
                  <FaSearch />
                </div>
              </div>
            </Link>
          ) : (
            <Link to="/searchrecipes">
              <div className="flex items-center gap-2 hover:text-white">
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
            {route === "createrecipe" ? (
              <Link to="/createrecipe">
                <span className="font-semibold text-white border-b-2 py-1 border-mainC2">
                  ADD RECIPE
                </span>
              </Link>
            ) : (
              <Link to="/createrecipe">
                <p className="font-semibold hover:text-white">ADD RECIPE</p>
              </Link>
            )}
          </div>
        )}

        {cookie && (
          <>
            <div className="">
              {route === "blog" ? (
                <Link to="/blog">
                  <span className="font-semibold text-white border-b-2 py-1 border-mainC2">
                    BLOG
                  </span>
                </Link>
              ) : (
                <Link to="/blog">
                  <p className="font-semibold hover:text-white">BLOG</p>
                </Link>
              )}
            </div>

            <div className="">
              {route === "myrecipes" ? (
                <Link to="/myrecipes">
                  <span className="font-semibold text-white border-b-2 py-1 border-mainC2">
                    MY RECIPES
                  </span>
                </Link>
              ) : (
                <Link to="/myrecipes">
                  <p className="font-semibold hover:text-white">MY RECIPES</p>
                </Link>
              )}
            </div>
          </>
        )}

        <div className={`${route === "createblog" ? "my-1" : "my-0"}`}>
          {route === "createblog" ? (
            <Link to="/createblog">
              <span className="font-semibold  border-b-2 border-mainC2">
                ADD ARTICLE
              </span>
            </Link>
          ) : (
            <Link to="/createblog">
              <p className="font-semibold hover:text-white">ADD ARTICLE</p>
            </Link>
          )}
        </div>

        <div
          className={`${
            route === `/userprofile/${username}` ? "my-2" : "mb-0"
          }`}
        >
          {route === `/userprofile/${username}` ? (
            <Link to={`/userprofile/${username}`}>
              <span className="font-semibold  border-b-2 border-mainC2">
                MY PROFILE
              </span>
            </Link>
          ) : (
            <Link to={`/userprofile/${username}`}>
              <p className="font-semibold hover:text-white">MY PROFILE</p>
            </Link>
          )}
        </div>
      </div>

      <div className="space-y-1">
        {cookie ? (
          <div className="">
            <p
              onClick={logOut}
              className=" cursor-pointer font-semibold hover:text-white"
            >
              Log Out
            </p>
          </div>
        ) : (
          <>
            <div className="">
              <Link to="/login">
                <p className="cursor-pointer font-semibold hover:text-white">
                  Log In
                </p>
              </Link>
            </div>
            <div>
              <Link to="/register">
                <p className="cursor-pointer font-semibold hover:text-white">
                  Register
                </p>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
