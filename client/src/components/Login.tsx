import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setCookie } from "../redux/action-creators";


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

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormInputs>({ resolver: yupResolver(schema) });

  console.log('ERRORS:', errors);

  const onSubmit = async (data: FormInputs) => {
    try{
      const response: any = await axios.post('/recipes/login', data);
      console.log(response.data)
      const {token, id} = response.data
      localStorage.setItem('token', token)
      localStorage.setItem('userId', id)

      dispatch(setCookie(id))

      reset();
      
    }catch(e: unknown){
      if(axios.isAxiosError(e)){
        console.log('SERVER RESPONSE',e.response?.data)
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <p>Login</p>
      <input
        {...register("email")}
        type="text"
        placeholder="email"
        required
      />
      <span >
        {errors && errors.email?.message}
      </span>
      <input
        {...register("password")}
        type="password"
        placeholder="password"
        required
      />
      <span >
        {errors && errors.password?.message}
      </span>
      <button type="submit">LOGIN</button>
    </form>
  );
};
