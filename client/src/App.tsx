import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { CreateRecipe } from "./components/CreateRecipe/CreateRecipe";
import Home from "./components/Home";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { getRecipes, setCookie } from "./redux/action-creators";

function App() {
  const dispatch = useDispatch();


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


  return (
    <div>
      <Routes>
        <Route path="/home" element={<Home/>} />
        <Route path='/createrecipe' element={<CreateRecipe />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
