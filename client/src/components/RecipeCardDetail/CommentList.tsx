import React from "react";
import { FaStar } from "react-icons/fa";
import { Review } from "../../redux/reducers/types";

type Props = {
  reviews: Review[];
};

export const CommentList: React.FC<Props> = ({ reviews }) => {
  return (
    <div>
      {reviews &&
        reviews.map((el) => (
          <div key={el._id} className="grid grid-cols-5 my-6">
            <div className="col-span-2 md:col-span-1 ">
              <p className="text-mainC2 font-semibold text-xl mb-2">
                {el.username}
              </p>

              {el.score ? (
                <div className="flex gap-2 text-yellow-400 text-md">
                  {[...Array(el.score)].map((el, i) => (
                    <FaStar key={i} />
                  ))}
                </div>
              ) : null}
            </div>

            <div className="col-span-3 md:col-span-4 ">
              <p className="text-xs text-gray-500 mb-2">{el.date}</p>
              <p>{el.comment}</p>
            </div>
          </div>
        ))}
    </div>
  );
};
