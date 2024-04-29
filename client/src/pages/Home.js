import React from "react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { BsArrowDownCircle } from "react-icons/bs";
import Overlay from "../components/Overlay";

const Home = () => {
  // Reference for the learn more section for the page scroll
  const learn = useRef(null);

  return (
    <main>
      {/* Overlay Component */}
      <Overlay />

      {/* Page Start */}
      <div className="flex flex-col items-center justify-center h-screen p-5 text-white z-[2] absolute top-0 left-0 right-0 bottom-0">
        <h2 className="text-5xl font-bold">Polygon</h2>
        <p className="py-5 text-xl"></p>
        <div className="flex">
          <Link to="../login">
            <button className="px-8 py-2 border items-center justify-center text-center m-2">
              Login
            </button>
          </Link>
          <Link to="../register">
            <button className="px-8 py-2 border items-center justify-center text-center m-2">
              Register
            </button>
          </Link>
        </div>
        <div className="flex flex-col items-center justify-center">
          <button
            onClick={() => {
              learn.current.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Learn More
          </button>

          <button
            onClick={() => {
              learn.current.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <BsArrowDownCircle />
          </button>
        </div>
      </div>

      {/* Learn more section */}

      <div ref={learn} className="max-w-[1240px] mx-auto">
        <h1 className="text-2xl font-bold text-center p-4">Learn More</h1>
        <div className="relative flex justify-center p-4">
          FOR small to midsize businesses WHO need a way to efficiently generate
          invoices, send these invoices, and charge clients. THE Polygon
          application is a Web-based service THAT will give businesses an easy
          way to officially invoice clients who were rendered services to and
          provide the clients with a way to pay the invoice directly. UNLIKE
          other services, OUR product provides effective solutions that give
          companies a way to give their clients invoices in a quick and direct
          manner.
        </div>
      </div>
    </main>
  );
};

export default Home;
