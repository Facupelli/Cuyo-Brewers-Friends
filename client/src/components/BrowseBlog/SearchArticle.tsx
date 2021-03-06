import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import { getBlogs } from "../../redux/action-creators";

interface FormInputs {
  article_name: string;
  username: string;
}

const schema = yup.object().shape({
  article_name: yup.string(),
  username: yup.string(),
});

export const SearchArticle: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormInputs>({ resolver: yupResolver(schema) });

  console.log("ERRORS:", errors);

  const dispatch = useDispatch();

  const handleClean = () => {
    dispatch(getBlogs());
  };

  const onSubmit = async (data: FormInputs) => {
    try {
      console.log(data);
      dispatch(getBlogs(data.username, data.article_name));
      reset();
    } catch (e) {
      console.log({ onSubmitError: e });
    }
  };

  return (
    <div className="w-2/3">
      <form onSubmit={handleSubmit(onSubmit)}>
        <p className="mb-4">Search article by</p>
        <div className="flex flex-wrap justify-between gap-y-4 mx-4 md:mx-0">
          <div>
            <label className="text-lg ">Article Name:</label>
            <input
              className="p-2 appearance-none shadow shadow-blue-600  text-gray-700 border border-blue-50 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="text"
              placeholder=""
              {...register("article_name")}
            />
            <span className="text-red-500">
              {errors && errors.article_name?.message}
            </span>
          </div>

          <div>
            <label className="text-lg ">Article Username:</label>
            <input
              className=" p-2 appearance-none shadow shadow-blue-600  text-gray-700 border border-blue-50 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="text"
              placeholder=""
              {...register("username")}
            />
            <span className="text-red-500">
              {errors && errors.username?.message}
            </span>
          </div>

          <div className="flex gap-x-3">
            <button
              type="submit"
              className="transition ease-in-out duration-150 p-2 border shadow hover:shadow-none border-mainC2 rounded hover:bg-mainC2 hover:text-white"
            >
              SEARCH
            </button>
            <p
              onClick={handleClean}
              className="transition ease-in-out duration-150 cursor-pointer p-2 border shadow hover:shadow-none border-mainC2 rounded hover:bg-mainC2 hover:text-white"
            >
              CLEAN
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};
