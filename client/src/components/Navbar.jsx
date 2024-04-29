import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useJwt } from "react-jwt";

const Navbar = () => {
  const token = localStorage.getItem("token");
  const { decodedToken } = useJwt(token);
  const navigate = useNavigate();
  const [nav, setNav] = useState(false);

  const [color, setColor] = useState("transparent");
  const [textColor, setTextColor] = useState("white");

  const handleNav = () => {
    setNav(!nav);
  };

  useEffect(() => {
    const changeColor = () => {
      if (window.scrollY >= 90) {
        setColor("#ffffff");
        setTextColor("#000000");
      } else {
        setColor("transparent");
        setTextColor("white");
      }
    };
    window.addEventListener("scroll", changeColor);
  }, []);

  const handleLogout = async (event) => {
    event.preventDefault();
    const user = decodedToken;
    console.log(localStorage.getItem("token"));

    localStorage.clear("token");

    await fetch("http://localhost:3001/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user,
      }),
    });

    navigate("/");
  };

  return (
    <div
      style={{ backgroundColor: `${color}` }}
      className="fixed left-0 top-0 w-full z-10 ease-in duration-300"
    >
      <div className="max-w-[1240px] m-auto flex justify-between items-center p-4 text-white">
        <Link to="/">
          <h1 style={{ color: `${textColor}` }} className="font-bold text-4xl">
            Polygon
          </h1>
        </Link>
        <ul style={{ color: `${textColor}` }} className="hidden sm:flex">
          <li className="p-4">
            <Link to="/">Home</Link>
          </li>
          <li className="p-4">
            <Link to="/register">Register</Link>
          </li>
          <li className="p-4">
            <Link to="/login">Login</Link>
          </li>
          <li className="p-4">
            <Link to="/contact">Contact</Link>
          </li>
          <li className="p-4">
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li className="p-4" onClick={handleLogout}>
            <button>Logout</button>
          </li>
        </ul>

        {/* Mobile Button */}
        <div onClick={handleNav} className="block sm:hidden z-10">
          {nav ? (
            <AiOutlineClose size={20} style={{ color: `${textColor}` }} />
          ) : (
            <AiOutlineMenu size={20} style={{ color: `${textColor}` }} />
          )}
        </div>
        {/* Mobile Menu */}
        <div
          className={
            nav
              ? "sm:hidden absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center w-full h-screen bg-black text-center ease-in duration-300"
              : "sm:hidden absolute top-0 left-[-100%] right-0 bottom-0 flex justify-center items-center w-full h-screen bg-black text-center ease-in duration-300"
          }
        >
          <ul>
            <li
              onClick={handleNav}
              className="p-4 text-4xl hover:text-gray-500"
            >
              <Link to="/">Home</Link>
            </li>
            <li
              onClick={handleNav}
              className="p-4 text-4xl hover:text-gray-500"
            >
              <Link to="/register">Register</Link>
            </li>
            <li
              onClick={handleNav}
              className="p-4 text-4xl hover:text-gray-500"
            >
              <Link to="/login">Login</Link>
            </li>
            <li
              onClick={handleNav}
              className="p-4 text-4xl hover:text-gray-500"
            >
              <Link to="/contact">Contact</Link>
            </li>
            <li
              onClick={handleNav}
              className="p-4 text-4xl hover:text-gray-500"
            >
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li
              onClick={handleLogout}
              className="p-4 text-4xl hover:text-gray-500"
            >
              <button>Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
