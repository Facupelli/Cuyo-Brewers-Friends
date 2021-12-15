import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

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
  email: yup.string().required().email(),
  username: yup.string().required().min(2).max(25),
  password: yup.string().required().min(8).max(120),
});

export const Register: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({ resolver: yupResolver(schema) });

  console.log("ERRORS:", errors);

  const [json, setJson] = useState<string>();

  console.log(json);

  const onSubmit = (data: FormInputs) => {
    setJson(JSON.stringify(data));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <p>Register</p>
      <input type="text" placeholder="name" {...register("name")} required />
      <span>{errors && errors.name?.message}</span>
      <input
        type="text"
        placeholder="lastname"
        {...register("lastname")}
        required
      />
      <span>{errors && errors.lastname?.message}</span>
      <input type="text" placeholder="email" {...register("email")} required />
      <span>{errors && errors.email?.message}</span>
      <input
        type="text"
        placeholder="username"
        {...register("username")}
        required
      />
      <span>{errors && errors.username?.message}</span>
      <input
        type="password"
        placeholder="password"
        {...register("password")}
        required
      />
      <span>{errors && errors.password?.message}</span>
      <button type="submit">LOGIN</button>
    </form>
  );
};
