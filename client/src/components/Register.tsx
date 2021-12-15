import React from "react";

export const Register: React.FC = () => {
  return (
    <form>
        <p>Register</p>
        <input type='text' placeholder="name" name='name' required />
        <input type='text' placeholder="lastname" name='lastname' required />
        <input type='text' placeholder="email" name='email' required />
        <input type='text' placeholder="username" name='username' required />
        <input type='password' placeholder="password" required />
        <button type='submit'>LOGIN</button>
    </form>
  );
};