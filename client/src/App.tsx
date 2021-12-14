import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Home from "./components/Home";
import { getRecipes } from "./redux/action-creators";

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRecipes());
  },[dispatch])

  return (
    <div>
      <h1>CUYO BREWERS FRIENDS</h1>
      <Home />
    </div>
  );
}

export default App;
