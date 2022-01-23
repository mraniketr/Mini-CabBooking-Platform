import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const onSubmit = async (data) => {
    const res = await fetch("/signUp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const datares = await res.json();
    if (res.ok) {
      navigate("/login");
    }
  };

  return (
    <div className="signUp">
      <h1>SIGNUP</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="form-group">
        <input
          {...register("name")}
          className="form-control"
          placeholder="Enter Name"
          type={"text"}
          required
        />
        <input
          {...register("email")}
          className="form-control"
          placeholder="Enter email"
          type={"email"}
          required
        />
        <input
          {...register("phone")}
          className="form-control"
          placeholder="Enter Phone Number"
          type={"tel"}
          required
        />
        <input
          {...register("passWord")}
          className="form-control"
          placeholder="Enter Password"
          type={"password"}
          required
        />
        <select {...register("mode")} className="form-control">
          <option value="rider">Rider</option>
          <option value="Driver">Driver</option>
        </select>
        <input type="submit" className="btn btn-primary" />
      </form>
    </div>
  );
}
