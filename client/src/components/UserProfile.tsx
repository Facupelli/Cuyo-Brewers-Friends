import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RootState } from "../redux/reducers/RootReducer";
import { UserData } from "../redux/reducers/types";
import { getUserByUsername } from "../utils/blogUtils";
import { NavBar } from "./NavBar";
import { RecipeCard } from "./RecipeCard";
import { BecomeSellerModal } from "./Shop/BecomeSellerModal";
import axios from "axios";
import { ProductCard } from "./Shop/ProductCard";

type ParamsType = {
  username: string;
};

type UserProfileState = {
  userProfile: UserData;
};

export const UserProfile: React.FC = () => {
  const navigate = useNavigate();

  const username = useParams<ParamsType>();

  const [userProfile, setUserProfile] = useState<UserProfileState>();
  const [showProducts, setShowProducts] = useState<Boolean>(false);

  console.log(userProfile);

  const logedUsername = useSelector(
    (state: RootState) => state.storeUser.userData.username
  );

  const isMyProfile = () => {
    if (logedUsername === username.username) return true;
    else return false;
  };

  const handleSeller = async () => {
    const userId = userProfile?.userProfile._id;
    await axios.post(`/user`, { id: userId });
    getUserByUsername(username.username)
      .then((data) => setUserProfile({ userProfile: data }))
      .catch((e) => console.log(e));
    setModal(false);
  };

  useEffect(() => {
    getUserByUsername(username.username)
      .then((data) => setUserProfile({ userProfile: data }))
      .catch((e) => console.log(e));
  }, [username]);

  const [modal, setModal] = useState<Boolean>(false);

  const handleViewProducts = () => {
    setShowProducts(!showProducts);
  };

  const handlePostProducts = () => {
    navigate("/postproduct");
  };

  const handleBecomeSeller = () => {
    setModal(true);
  };

  return (
    <>
      {modal && (
        <BecomeSellerModal
          message={"You want to offer beer products?"}
          setModal={setModal}
          pathTo=""
          handleSeller={handleSeller}
        />
      )}

      <div>
        <NavBar route="userprofile" />
        <div className="max-w-7xl md:mx-auto mx-4 mt-8">
          <div>
            <div className="flex">
              <div className="flex gap-4 items-baseline">
                <span className="text-4xl pb-3 border-b-2 border-mainC2">
                  {userProfile?.userProfile.username}
                </span>
                <p className="text-gray-500 text-lg">homebrewer</p>
              </div>
              <div className="ml-auto">
                {userProfile?.userProfile.seller ? (
                  <div>
                    <button
                      onClick={handlePostProducts}
                      className="mr-2 transition ease-in-out delay-50 font-semibold border border-mainC2 text-main p-2 text-sm rounded hover:bg-mainC2 hover:text-white"
                    >
                      POST PRODUCT
                    </button>
                    <button
                      onClick={handleViewProducts}
                      className="transition ease-in-out delay-50 font-semibold border border-mainC2 text-main p-2 text-sm rounded hover:bg-mainC2 hover:text-white"
                    >
                      {showProducts ? "<-" : "VIEW PRODUCTS"}
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={handleBecomeSeller}
                    className="transition ease-in-out delay-50 font-semibold border border-mainC2 text-main p-2 text-sm rounded hover:bg-mainC2 hover:text-white"
                  >
                    BECOME A SELLER
                  </button>
                )}
              </div>
            </div>
            {!showProducts ? (
              <div className="grid grid-cols-2 gap-y-8 md:gap-x-8 mt-12">
                <div className="col-span-2 md:col-span-1">
                  <p className="font-semibold text-xl md:ml-2">MY RECIPES:</p>
                  {userProfile &&
                    userProfile.userProfile.ownRecipes.map((recipe, i) => (
                      <RecipeCard
                        key={i}
                        recipe={recipe.recipe}
                        id={recipe._id}
                      />
                    ))}
                </div>

                <div className="col-span-2 md:col-span-1">
                  <p className="font-semibold text-xl">MY ARTICLES:</p>
                  {userProfile?.userProfile.ownBlogs.map((el, i) => (
                    <div
                      key={i}
                      className="flex md:gap-x-3 bg-bgMain rounded shadow hover:shadow-none p-4 my-3"
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

                {isMyProfile() && (
                  <div className="col-span-2 md:col-span-1">
                    <p className="font-semibold text-xl md:ml-2">MY FAVS:</p>
                    {userProfile &&
                      userProfile.userProfile.favs.map((recipe, i) => (
                        <RecipeCard
                          key={i}
                          recipe={recipe.recipe}
                          id={recipe._id}
                        />
                      ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="mx-10 mt-16 grid grid-cols-4 gap-y-12 mb-10">
                {userProfile?.userProfile.ownProducts.map((el) => (
                  <div className="col-span-1" key={el._id}>
                    <ProductCard own={true} product={el} id={el._id} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
