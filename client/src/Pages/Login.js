import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const onSubmit = async (data) => {
    console.log(data);
    const res = await fetch("/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const datares = await res.json();
    console.log(datares.userDetails[0]);
    if (res.ok) {
      navigate(`/${datares.userDetails[0].mode}`, {
        state: { userData: datares.userDetails[0] },
      });
    }
  };

  return (
    <div className="signUp">
      <h1>LOGIN</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="form-group">
        <input
          {...register("email")}
          className="form-control"
          placeholder="Enter email"
          type={"email"}
          required
        />
        <input
          {...register("passWord")}
          className="form-control"
          placeholder="Enter Password"
          type={"password"}
          required
        />

        <input type="submit" className="btn btn-primary" />
      </form>
    </div>
  );
}
