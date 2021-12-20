import React from "react";
import { Review } from "./RecipeCardDetail";
import { FaStar } from "react-icons/fa";

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
              <p className="text-orange-500 font-semibold text-2xl mb-2">
                {el.username}
              </p>

              {el.score ? (
                <div className="flex gap-2 text-yellow-400">
                  {[...Array(el.score)].map((el, i) => (
                    <FaStar key={i} />
                  ))}
                </div>
              ) : null}
            </div>

            <div className="col-span-4 ">
              <p className="text-xs text-gray-500 mb-2">{el.date}</p>
              <p>{el.comment}</p>
            </div>
          </div>
        ))}
    </div>
  );
};
