import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";

export default function Driver() {
  const { register, handleSubmit } = useForm();
  const { state } = useLocation();
  const [available, setAvail] = useState();
  useEffect(() => {
    setAvail(state.userData.available);
  }, []);
  const onSubmit = async () => {
    const res = await fetch("/toggleAvailability", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        _id: state.userData._id,
        newStatus: !available,
      }),
    });
    setAvail(!available);
  };
  return (
    <div className="Driver">
      <h1>Driver Details</h1>
      <div className="card">
        <ul className="list-group list-group-flush">
          <li className="list-group-item">Name - {state.userData.name}</li>
          <li className="list-group-item">Phone - {state.userData.phone}</li>
          <li className="list-group-item">Email - {state.userData.email}</li>
          <li className="list-group-item">
            <b>Availability - {available?.toString()}</b>
          </li>
        </ul>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="form-group">
        <input
          type="submit"
          className={`btn btn-${!available ? "success" : "danger"}`}
          value="Toggle Availability"
        />
      </form>
    </div>
  );
}
