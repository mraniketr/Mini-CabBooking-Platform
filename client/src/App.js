import logo from "./logo.svg";
import "./App.css";
import { useEffect } from "react";
import { Router, Routes, Route } from "react-router-dom";
import SignUp from "./Pages/SignUp";

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
      </Routes>
    </div>
  );
}

export default App;
