import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/reducers/RootReducer";
import axios from "axios";
import { FaStar, FaRegStar } from "react-icons/fa";
import { getRecipeById } from "../../utils/recipesUtils";
import { State } from "./RecipeCardDetail";
import { getUserData } from "../../redux/action-creators";

interface FormInputs {
  score: number;
  comment: string;
}

type Props = {
  recipe_id: unknown;
  setRecipeState: React.Dispatch<React.SetStateAction<State>>;
};

const schema = yup.object().shape({
  comment: yup.string().required().min(1).max(2000),
});

export const CommentForm: React.FC<Props> = ({
  recipe_id,
  setRecipeState = () => {},
}) => {
  const {
    register,
    handleSubmit,
    // formState: { errors },
    reset,
    watch,
  } = useForm<FormInputs>({ resolver: yupResolver(schema) });

  const dispatch = useDispatch();

  const cookie = useSelector((state: RootState) => state.storeUser.cookie);
  const userData = useSelector((state: RootState) => state.storeUser.userData);

  const isRecipeRated = userData.ownReviews?.filter((el) => el === recipe_id);

  const scoreSelected = watch("score");

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
      getRecipeById(recipe_id)
        .then((data) => setRecipeState({ recipe: data }))
        .catch((e) => console.log(e));
      dispatch(getUserData(userData._id));
      reset();
    } catch (e) {
      console.log({ onSubmitError: e });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-16">
      <p className="text-2xl font-semibold pb-8"> Recipe discussion</p>
      <div className="grid grid-cols-5 gap-4">
        <div className="col-span-1 justify-center mb-auto flex gap-2 ">
          <label className="flex flex-col-reverse items-center ">
            <input type="radio" value="1" {...register("score")} name="score" />
            {scoreSelected && scoreSelected !== undefined ? (
              <div className="text-yellow-400 my-2 text-3xl">
                <FaStar />
              </div>
            ) : (
              <div className="text-yellow-400 my-2 text-3xl">
                <FaRegStar />
              </div>
            )}
          </label>

          <label className="flex items-center flex-col-reverse">
            <input type="radio" value="2" {...register("score")} name="score" />
            {scoreSelected && scoreSelected > 1 ? (
              <div className="text-yellow-400 my-2 text-3xl">
                <FaStar />
              </div>
            ) : (
              <div className="text-yellow-400 my-2 text-3xl">
                <FaRegStar />
              </div>
            )}
          </label>

          <label className="flex items-center flex-col-reverse">
            <input type="radio" value="3" {...register("score")} name="score" />
            {scoreSelected && scoreSelected > 2 ? (
              <div className="text-yellow-400 my-2 text-3xl">
                <FaStar />
              </div>
            ) : (
              <div className="text-yellow-400 my-2 text-3xl">
                <FaRegStar />
              </div>
            )}
          </label>

          <label className="flex items-center flex-col-reverse">
            <input type="radio" value="4" {...register("score")} name="score" />
            {scoreSelected && scoreSelected > 3 ? (
              <div className="text-yellow-400 my-2 text-3xl">
                <FaStar />
              </div>
            ) : (
              <div className="text-yellow-400 my-2 text-3xl">
                <FaRegStar />
              </div>
            )}
          </label>

          <label className="flex items-center flex-col-reverse">
            <input type="radio" value="5" {...register("score")} name="score" />
            {scoreSelected && scoreSelected > 4 ? (
              <div className="text-yellow-400 my-2 text-3xl">
                <FaStar />
              </div>
            ) : (
              <div className="text-yellow-400 my-2 text-3xl">
                <FaRegStar />
              </div>
            )}
          </label>
        </div>

        <div className="col-span-4">
          {!cookie && (
            <div className="">
              <p className="text-gray-600 text-xl font-semibold">
                You need to be loged to post a comment!
              </p>
            </div>
          )}

          {cookie && isRecipeRated.length > 0 ? (
            <div className="">
              <p className="text-gray-600 text-xl font-semibold">
                You already post a comment on this recipe!
              </p>
            </div>
          ) : null}

          {cookie && isRecipeRated.length === 0 ? (
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
          ) : null}
        </div>
      </div>
    </form>
  );
};
