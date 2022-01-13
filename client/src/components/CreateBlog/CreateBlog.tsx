import React from "react";
import { NavBar } from "../NavBar";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/reducers/RootReducer";
import { getBlogs } from "../../redux/action-creators";

interface FormInputs {
  blog_author: string;
  blog_username: string;
  blog_title: string;
  blog_body: string;
}

const schema = yup.object().shape({
  blog_author: yup.string(),
  blog_username: yup.string(),
  blog_title: yup.string().required().min(2).max(225),
  blog_body: yup.string().required().min(20).max(25000),
});

export const CreateBlog: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormInputs>({ resolver: yupResolver(schema) });

  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.storeUser.userData)

  console.log("ERRORS:", errors);

  const onSubmit = async (data: FormInputs) => {
    try {
      console.log(data);
      const blog = {
        blog_author: user._id,
        blog_username: user.username,
        blog_title: data.blog_title,
        blog_body: data.blog_body,
      }
      const response = await axios.post("/blog", blog);
      console.log("RESPONSE:", response);
      dispatch(getBlogs())
      reset();
    } catch (e) {
      console.log({ onSubmitError: e });
    }
  };
  return (
    <div>
      <NavBar route="createblog" />
      <div className="max-w-6xl mx-4 md:mx-auto mt-8">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex items-baseline mb-8">
            <label className="mr-4">Title:</label>
            <input
              className="appearance-none p-3 text-gray-700 border border-gray-500 rounded leading-tight focus:outline-none focus:bg-white focus:border-blueLight"
              type="text"
              placeholder="Title..."
              {...register("blog_title")}
              required
            />
            <span className="text-red-500">
              {errors && errors.blog_title?.message}
            </span>
            <button
              type="submit"
              className=" border border-blue1 rounded p-2 mt-4 ml-auto hover:bg-blue1 hover:text-white"
            >
              POST ARTICLE
            </button>
          </div>
          <div>
            <label className="block mb-2">Article:</label>
            <textarea
              className="appearance-none  w-full text-gray-700 border border-gray-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blueLight"
              placeholder="article description..."
              {...register("blog_body")}
              required
            />
            <span className="text-red-500">
              {errors && errors.blog_body?.message}
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};
