import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Overlay from "../components/Overlay";
import { decodeToken, isExpired } from "react-jwt";
import Chart from "./Charts.js";

const Dashboard = () => {
  //used to navigate the pages
  const navigate = useNavigate();

  // useState to set the users name on dashboard page
  const [name, setName] = useState("");

  // Go to invoice page
  const handleCreateInvoice = () => {
    navigate("/invoice");
  };

  // Go to statement page
  const handleCreateStatement = () => {
    navigate("/statement");
  };

  // Load the page fully before fetching data
  useEffect(() => {
    // Called once page is fully loaded
    const onPageLoad = () => {
      console.log("page loaded");

      // Get the jwt token for the user
      const token = localStorage.getItem("token");

      // Check if jwt is still valid
      checkJWTExpired(token);
    };

    // If the page is fully loaded then proceed by calling onPageLoad()
    if (document.readyState === "complete") {
      onPageLoad();
    } else {
      window.addEventListener("load", onPageLoad, false);
      return () => window.removeEventListener("load", onPageLoad);
    }
  }, []);

  // Check if token is still valid
  const checkJWTExpired = (token) => {
    // if token expired remove it, logout, and force user to login page
    if (isExpired(token)) {
      localStorage.removeItem("token");
      console.log("expired");
      navigate("/login");
    } else {
      //decode token to get username and set the name to the userName
      let userName = decodeToken(token).firstName;
      setName(userName);
      console.log("Still good");
    }
  };

  return (
    <div>
      {/* Overlay Component */}
      <Overlay />

      {/* Page Start */}
      <div className="flex flex-col items-center text-center justify-evenly text-black text-4xl z-[2] absolute top-0 left-0 right-0 bottom-0">
        <main className="flex flex-col items-center justify-center w-screen flex-1 text-center">
          <h1 className="font-[800] mb-[20px] tracking-[.12em] text-[40px] text-white">
            {name}'s Dashboard
          </h1>

          {/* Chart Component */}
          <Chart />

          <div className="flex w-1/2 justify-between align-middle">
            <button
              className="border-2 bg-indigo-800/60 border-white text-white rounded-full px-6 py-2 inline-block font-semibold hover:bg-violet-900 mt-12"
              onClick={handleCreateInvoice}
            >
              Create Invoice
            </button>
            <button
              className="border-2 bg-indigo-800/60 border-white text-white rounded-full px-6 py-2 inline-block font-semibold hover:bg-violet-900 mt-12"
              onClick={handleCreateStatement}
            >
              Get Statement
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
