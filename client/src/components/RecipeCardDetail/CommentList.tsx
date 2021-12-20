import React, { useEffect, useState } from "react";
import { getReviewsByRecipeId } from "../../utils/reviewsUtils";
import { Review } from "./RecipeCardDetail";

type Props = {
  comment: Review[];
};



export const CommentList: React.FC<Props> = ({ comment }) => {
  

  return (
    <div>
      {comment &&
        comment.map((el) => (
          <div key={el._id} className="grid grid-cols-5 my-6">
            <div className="col-span-1 ">
              <p>{el.username}</p>
              <p>{el.score}</p>
            </div>
            <div className="col-span-4">
              <p>{el.comment}</p>
            </div>
          </div>
        ))}
    </div>
  );
};
