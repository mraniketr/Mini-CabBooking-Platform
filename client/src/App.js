import logo from "./logo.svg";
import "./App.css";
import { useEffect } from "react";
import { Router, Routes, Route } from "react-router-dom";
import SignUp from "./Pages/SignUp";
import Login from "./Pages/Login";
import Rider from "./Pages/Rider";
import Driver from "./Pages/Driver";

function App() {
  // useEffect(async () => {
  //   const res = await fetch("/SERVERTESTAPI");
  //   const body = await res.json();
  //   console.log(body);
  // }, []);
  return (
    <div className="App">
      <Routes>
        <Route exact path="/signUp" element={<SignUp />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/driver" element={<Driver />} />
        <Route exact path="/rider" element={<Rider />} />
      </Routes>
    </div>
  );
}

export default App;
