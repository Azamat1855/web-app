import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Outlet } from "react-router-dom";

function App() {

  return (
    <>
      <div className="flex flex-col">
        <Navbar />
        <div className="flex ">
          <Sidebar />
          <div className="p-5 w-full">
          <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
