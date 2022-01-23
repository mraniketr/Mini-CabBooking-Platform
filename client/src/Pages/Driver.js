import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";

export default function Driver() {
  const [status, setStatus] = useState(null);

  const { register, handleSubmit, setValue } = useForm();
  const { state } = useLocation();
  const [available, setAvail] = useState();
  const getLocation = () => {
    if (!navigator.geolocation) {
      setStatus("Geolocation is not supported by your browser");
    } else {
      setStatus("Locating...");
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setStatus(null);
          setValue("latitude", position.coords.latitude);
          setValue("longitude", position.coords.longitude);
        },
        () => {
          setStatus("Unable to retrieve your location");
        }
      );
    }
  };
  useEffect(() => {
    setAvail(state.userData.available);
    getLocation();
  }, []);
  const onSubmit = async (data) => {
    const res = await fetch("/toggleAvailability", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        _id: state.userData._id,
        newStatus: !available,
        currentLocation: data,
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
        <h3>Current Location {status}</h3>
        <input
          {...register("latitude")}
          className="form-control"
          placeholder="Enter Latitude"
          required
        />
        <input
          {...register("longitude")}
          className="form-control"
          placeholder="Enter Longitude"
          required
        />
        <input
          type="submit"
          className={`btn btn-${!available ? "success" : "danger"}`}
          value="Toggle Availability"
        />
      </form>
    </div>
  );
}
