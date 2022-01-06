import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface FormInputs {
  name: string;
  lastname: string;
  email: string;
  username: string;
  password: string;
}

const schema = yup.object().shape({
  name: yup.string().required().min(2).max(25),
  lastname: yup.string().required().min(2).max(25),
  email: yup.string().required().min(6).max(225).email(),
  username: yup.string().required().min(2).max(25),
  password: yup.string().required().min(8).max(120),
});

export const Register: React.FC = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormInputs>({ resolver: yupResolver(schema) });

  console.log("ERRORS:", errors);

  const onSubmit = async (data: FormInputs) => {
    try {
      console.log(data);
      const response = await axios.post("/register", data);
      console.log("RESPONSE:", response);
      reset();
      navigate("/home");
    } catch (e) {
      console.log({ onSubmitError: e });
    }
  };

  return (
    <div className="fixed h-full w-full flex items-center justify-center ">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md bg-white border border-blueLight hover:border-brown1 shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4 text-center">
          <p className="text-3xl text-brown1 font-semibold ">Register</p>
        </div>

        <div className="flex flex-col gap-2">
          <input
            className="appearance-none block shadow shadow-blue-600 w-full bg-blue-50 text-gray-700 border border-blue-50 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            type="text"
            placeholder="name"
            {...register("name")}
            required
          />
          <span>{errors && errors.name?.message}</span>

          <input
            className="appearance-none block shadow w-full bg-blue-50 text-gray-700 border border-blue-50 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            type="text"
            placeholder="lastname"
            {...register("lastname")}
            required
          />
          <span>{errors && errors.lastname?.message}</span>

          <input
            className="appearance-none block shadow w-full bg-blue-50 text-gray-700 border border-blue-50 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            type="text"
            placeholder="email"
            {...register("email")}
            required
          />
          <span>{errors && errors.email?.message}</span>

          <input
            className="appearance-none block shadow w-full bg-blue-50 text-gray-700 border border-blue-50 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            type="text"
            placeholder="username"
            {...register("username")}
            required
          />
          <span>{errors && errors.username?.message}</span>

          <input
            className="appearance-none block shadow w-full bg-blue-50 text-gray-700 border border-blue-50 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            type="password"
            placeholder="password"
            {...register("password")}
            required
          />
          <span>{errors && errors.password?.message}</span>
        </div>

        <div className="">
          <button
            type="submit"
            className="p-2 mt-4 w-full text-white font-semibold  rounded bg-blue1 hover:bg-brown1"
          >
            REGISTER
          </button>
        </div>
      </form>
    </div>
  );
};
