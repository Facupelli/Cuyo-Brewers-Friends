import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RootState } from "../redux/reducers/RootReducer";
import { UserData } from "../redux/reducers/types";
import { getUserByUsername } from "../utils/blogUtils";
import axios from "axios";
import { TiArrowLeftThick } from "react-icons/ti";
import { getUserData } from "../redux/action-creators";
import { VscLoading } from "react-icons/vsc";

//Components
import { NavBar } from "./NavBar";
import { RecipeCard } from "./RecipeCard";
import { ProductCard } from "./Shop/ProductCard";
import { BecomeSellerModal } from "./Shop/BecomeSellerModal";
import { addFollow, deleteFollow } from "../utils/userProfileUtils";

type ParamsType = {
  username: string;
};

export const UserProfile: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const username = useParams<ParamsType>();

  //PAGE USER
  const [userProfile, setUserProfile] = useState<UserData>();
  const [showProducts, setShowProducts] = useState<Boolean>(false);

  //LOGED USER INFO
  const userData = useSelector((state: RootState) => state.storeUser.userData);

  const isMyProfile = useCallback(() => {
    if (userData.username === username.username) return true;
    else return false;
  }, [userData, username]);

  useEffect(() => {
    getUserByUsername(username.username)
      .then((data) => setUserProfile(data))
      .catch((err) => console.log(err));
  }, []);

  //SHOP --------
  const handleSeller = async () => {
    const userId = userProfile?._id;
    await axios.post(`/user`, { id: userId });
    getUserData(userData._id);
    setSellerModal(false);
  };

  const [sellerModal, setSellerModal] = useState<Boolean>(false);

  const handleViewProducts = () => {
    setShowProducts(!showProducts);
  };

  const handlePostProducts = () => {
    navigate("/postproduct");
  };

  const handleBecomeSeller = () => {
    setSellerModal(true);
  };

  // FOLLOW ----------------------

  const isUserFollowed = () => {
    const userFollowed = userData.following.find(
      (user) => user._id === userProfile?._id
    );
    if (userFollowed) return true;
    return false;
  };

  const handleFollow = async () => {
    if (userProfile) {
      await addFollow(userData._id, userProfile._id);
      dispatch(getUserData(userData._id));
    }
  };

  const handleDeleteFollow = async () => {
    if (userProfile) {
      await deleteFollow(userData._id, userProfile._id);
      dispatch(getUserData(userData._id));
    }
  };

  return (
    <>
      {sellerModal && (
        <BecomeSellerModal
          message={"You want to offer beer products?"}
          setModal={setSellerModal}
          pathTo=""
          handleSeller={handleSeller}
        />
      )}

      <div>
        <NavBar route="userprofile" />
        {userProfile ? (
          <div className="max-w-7xl md:mx-auto mx-4 mt-8">
            <div>
              <div className="md:flex items-baseline">
                <div className="flex gap-4 items-baseline">
                  <span className="text-4xl pb-3 border-b-2 border-mainC2">
                    {userProfile?.username}
                  </span>
                  <p className="text-gray-500 text-lg">homebrewer</p>
                </div>

                {!isMyProfile() && !isUserFollowed() && (
                  <div>
                    <button
                      onClick={handleFollow}
                      className="transition ease-in-out delay-50 ml-12 font-semibold text-main border px-4 py-2 border-mainC2 hover:bg-mainC2 hover:text-white rounded "
                    >
                      follow
                    </button>
                  </div>
                )}

                {!isMyProfile() && isUserFollowed() && (
                  <div>
                    <button
                      onClick={handleDeleteFollow}
                      className="transition ease-in-out delay-50 ml-12 font-semibold text-main border px-4 py-2 border-mainC2 hover:bg-mainC2 hover:text-white rounded "
                    >
                      unfollow
                    </button>
                  </div>
                )}

                {isMyProfile() && (
                  <div className="md:ml-auto mt-4 md:mt-0">
                    {userProfile?.seller ? (
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
                          {showProducts ? (
                            <div className="flex items-center">
                              <TiArrowLeftThick />
                            </div>
                          ) : (
                            "VIEW MY PRODUCTS"
                          )}
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
                )}
              </div>

              {!showProducts ? (
                <div className="grid grid-cols-2 gap-y-8 md:gap-x-8 mt-12">
                  <div className="col-span-2 md:col-span-1">
                    <p className="font-semibold text-xl md:ml-2">MY RECIPES:</p>
                    {userProfile &&
                      userProfile.ownRecipes.map((recipe, i) => (
                        <RecipeCard
                          key={i}
                          recipe={recipe.recipe}
                          id={recipe._id}
                        />
                      ))}
                  </div>

                  <div className="col-span-2 md:col-span-1">
                    <p className="font-semibold text-xl">MY ARTICLES:</p>
                    {userProfile?.ownBlogs.map((el, i) => (
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
                        userProfile.favs.map((recipe, i) => (
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
                <div className="mx-10 mt-16 grid md:grid-cols-3 lg:grid-cols-4 gap-y-12 mb-10">
                  {userProfile?.ownProducts.map((el) => (
                    <div className="col-span-2 md:col-span-1" key={el._id}>
                      <ProductCard
                        own={true}
                        product={el}
                        id={el._id}
                        setUserProfile={setUserProfile}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center mt-24">
            <div className="font-bold text-4xl text-mainC2">
              <span>
                <VscLoading className="animate-spin-load" />
              </span>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
