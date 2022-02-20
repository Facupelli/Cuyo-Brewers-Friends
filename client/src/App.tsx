import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import {
  getBlogs,
  getProducts,
  getRecipes,
  getTopProducts,
  getTopRecipes,
  getUserData,
  setCookie,
  totalNumRecipes,
} from "./redux/action-creators";
import { RootState } from "./redux/reducers/RootReducer";
//Components
import { Blog } from "./components/BrowseBlog/Blog";
import { CreateRecipe } from "./components/CreateRecipe/CreateRecipe";
import Home from "./components/Home";
import { Login } from "./components/Login";
import { MyRecipes } from "./components/MyRecipes";
import { RecipeCardDetail } from "./components/RecipeCardDetail/RecipeCardDetail";
import { Register } from "./components/Register";
import { SearchRecipes } from "./components/SearchRecipes/SearchRecipes";
import { BlogDetail } from "./components/BlogDetail/BlogDetail";
import { CreateBlog } from "./components/CreateBlog/CreateBlog";
import { UserProfile } from "./components/UserProfile";
import { Shop } from "./components/Shop/Shop";
import { PostProduct } from "./components/Shop/PostProduct";

function App() {
  const dispatch = useDispatch();

  const cookie = useSelector((state: RootState) => state.storeUser.cookie);

   // ------------------------GET PRODUCTS -------------------------------------
   useEffect(() => {
    dispatch(getProducts());
    dispatch(getTopProducts());
  }, [dispatch]);

  // ------------------------GET RECIPES -------------------------------------
  useEffect(() => {
    dispatch(getRecipes());
    dispatch(totalNumRecipes());
    dispatch(getTopRecipes());
    dispatch(getBlogs());
  }, [dispatch]);

  // ------------------------GET USER IF TOKEN -------------------------------------
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (token && userId) {
      dispatch(setCookie(userId));
    }
    // eslint-disable-next-line
  }, []);

  // -------------------- IF COOKIE --------------------------------
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (cookie) {
      dispatch(getUserData(userId));
    }
  }, [dispatch, cookie]);

  return (
    <div>
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="/createrecipe" element={<CreateRecipe />} />
        <Route path="/recipe/:id" element={<RecipeCardDetail />} />
        <Route path="/myrecipes" element={<MyRecipes />} />
        <Route path="/searchrecipes" element={<SearchRecipes />} />
        <Route path="/blogdetail/:id" element={<BlogDetail />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/createblog" element={<CreateBlog />} />
        <Route path='/userprofile/:username' element={<UserProfile />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/postproduct" element={<PostProduct />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
