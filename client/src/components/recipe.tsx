import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/reducers/RootReducer";

export default function Recipe() {

  const dispatch = useDispatch();

  return (
    <div>
      Recipe
    </div>
  );
}
