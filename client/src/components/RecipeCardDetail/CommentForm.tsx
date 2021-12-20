import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/reducers/RootReducer";
import axios from "axios";
import { getReviewsByRecipeId } from "../../utils/reviewsUtils";
import { Review } from "./RecipeCardDetail";

interface FormInputs {
  score: number;
  comment: string;
}

type Props = {
  recipe_id: unknown;
  setComment: React.Dispatch<React.SetStateAction<Review[]>>;
};

const schema = yup.object().shape({
  comment: yup.string().required().min(1).max(2000),
});

export const CommentForm: React.FC<Props> = ({
  recipe_id,
  setComment = () => {},
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormInputs>({ resolver: yupResolver(schema) });

  const cookie = useSelector((state: RootState) => state.storeUser.cookie);
  const userData = useSelector((state: RootState) => state.storeUser.userData);

  const onSubmit = async (data: FormInputs) => {
    try {
      const review = {
        review: {
          comment: data.comment,
          score: data.score,
          recipe_id: recipe_id,
        },
        user_id: userData._id,
        username: userData.username,
      };
      const response = await axios.post("/review", review);
      console.log("RESPONSE:", response);
      reset();
      //get reviews post comment
      getReviewsByRecipeId(recipe_id)
        .then((res) => setComment(res))
        .catch((e) => console.log(e));
    } catch (e) {
      console.log({ onSubmitError: e });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-16">
      <p className="text-2xl font-semibold pb-8"> Recipe discussion</p>
      <div className="grid grid-cols-5 ">
        <div className="col-span-1 justify-center mb-auto flex gap-6 ">
          <label className="flex flex-col-reverse">
            <input type="radio" value="5" {...register("score")} name="score" />
            5
          </label>

          <label className="flex flex-col-reverse">
            <input type="radio" value="4" {...register("score")} name="score" />
            4
          </label>

          <label className="flex flex-col-reverse">
            <input type="radio" value="3" {...register("score")} name="score" />
            3
          </label>

          <label className="flex flex-col-reverse">
            <input type="radio" value="2" {...register("score")} name="score" />
            2
          </label>

          <label className="flex flex-col-reverse">
            <input type="radio" value="1" {...register("score")} name="score" />
            1
          </label>
        </div>

        <div className="col-span-4">
          {!cookie ? (
            <div className="">
              <p className="text-gray-600 text-xl font-semibold">
                You need to be loged to post a comment!
              </p>
            </div>
          ) : (
            <>
              <textarea
                placeholder="What you love and what you don't like about this recipe"
                {...register("comment")}
                required
                className="form-control
        block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-orange-600 focus:outline-none"
              />
              <button
                type="submit"
                className="my-4 bg-white border border-orange-200 text-gray-700 p-2  rounded leading-tight focus:outline-none focus:bg-white focus:border-orange-500 hover:bg-orange-500 hover:text-white"
              >
                Share Comment
              </button>
            </>
          )}
        </div>
      </div>
    </form>
  );
};
