import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

interface FormInputs {
  username: string;
  password: string;
}

const schema = yup.object().shape({
  username: yup.string().required().min(2).max(25),
  password: yup.string().required().min(8).max(120),
});

export const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({ resolver: yupResolver(schema) });

  console.log('ERRORS:', errors);

  const [json, setJson] = useState<string>();

  console.log(json);

  const onSubmit = (data: FormInputs) => {
    setJson(JSON.stringify(data));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <p>Login</p>
      <input
        {...register("username")}
        type="text"
        placeholder="username"
        required
      />
      <span >
        {errors && errors.username?.message}
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
