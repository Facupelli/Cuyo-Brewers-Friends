import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { CreateRecipe } from "./components/CreateRecipe/CreateRecipe";
import Home from "./components/Home";
import { Login } from "./components/Login";
import { RecipeCardDetail } from "./components/RecipeCardDetail/RecipeCardDetail";
import { Register } from "./components/Register";
import { getRecipes, getUserData, setCookie } from "./redux/action-creators";
import { RootState } from "./redux/reducers/RootReducer";

function App() {
  const dispatch = useDispatch();

  const cookie = useSelector((state: RootState) => state.storeUser.cookie)

  // ------------------------GET RECIPES -------------------------------------
  useEffect(() => {
    dispatch(getRecipes());
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
    if(cookie){
      dispatch(getUserData(userId))
    }
  }, [cookie])

  return (
    <div>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/createrecipe" element={<CreateRecipe />} />
        <Route path="/home/recipe/:id" element={<RecipeCardDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
