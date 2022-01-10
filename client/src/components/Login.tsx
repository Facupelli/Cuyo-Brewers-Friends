import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setCookie } from "../redux/action-creators";
import { useNavigate } from "react-router-dom";
import { FaArrowCircleLeft } from "react-icons/fa";


interface FormInputs {
  email: string;
  password: string;
}

const schema = yup.object().shape({
  email: yup.string().required().min(6).max(255).email(),
  password: yup.string().required().min(8).max(120),
});

export const Login: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [serverResponse, setServerResponse] = useState<any>();

  const handleGoBack = () => {
    navigate(-1);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormInputs>({ resolver: yupResolver(schema) });

  console.log("ERRORS:", errors);

  const onSubmit = async (data: FormInputs) => {
    try {
      const response: any = await axios.post("/login", data);
      console.log(response.data);
      const { token, id } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("userId", id);

      dispatch(setCookie(id));
      reset();
      navigate("/home");
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        console.log("SERVER RESPONSE", e.response?.data);
        setServerResponse(e.response?.data);
      }
    }
  };

  return (
    <div className="">
      <div
        className="text-3xl text-gray-300 cursor-pointer m-8"
        onClick={handleGoBack}
      >
        <FaArrowCircleLeft />
      </div>
      <div className="fixed w-full flex items-center justify-center ">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-md bg-white border border-blueLight hover:border-brown1 shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-4 text-center">
            <p className="text-3xl text-brown1 font-semibold ">Login</p>
          </div>

          <div className="flex flex-col gap-2">
            <input
              className="appearance-none block shadow shadow-blue-600 w-full bg-blue-50 text-gray-700 border border-blue-50 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              {...register("email")}
              type="text"
              placeholder="email"
              required
            />
            <span className="text-red-500">
              {errors && errors.email?.message}
            </span>
            <input
              className="appearance-none block shadow shadow-blue-600 w-full bg-blue-50 text-gray-700 border border-blue-50 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              {...register("password")}
              type="password"
              placeholder="password"
              required
            />
            <span className="text-red-500">
              {errors && errors.password?.message}
              {serverResponse && serverResponse.error}
            </span>
          </div>

          <div>
            <button
              type="submit"
              className="p-2 mt-4 w-full text-white font-semibold  rounded bg-blue1 hover:bg-brown1"
            >
              LOGIN
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
