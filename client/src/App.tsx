import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import { getRecipes } from "./redux/action-creators";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRecipes());
  }, [dispatch]);

  return (
    <div>
      <Routes>
        <Route path="/home" element={<Home/>}>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
