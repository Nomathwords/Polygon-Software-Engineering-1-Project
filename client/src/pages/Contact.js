import React from "react";
import Overlay from "../components/Overlay";

/* 
This page is not currently hooked up to do anything yet.
It is just a static page, needs some backend calls to 
make the page work.
*/

const Contact = () => {
  return (
    <main>
      {/* Overlay Component */}
      <Overlay />

      <div className="p-5 flex flex-col items-center justify-center h-screen text-white z-[2] absolute top-0 left-0 right-0 bottom-0">
        <h2 className="text-5xl font-bold">Contact</h2>
        <p className="py-5 text-xl">Submit the form below for questions</p>
      </div>

      {/* Contact Form */}
      <div className="max-w-[1240px] m-auto p-4 h-screen">
        <h1 className="text-2xl font-bold text-center p-4">
          Let's work together
        </h1>
        <form className="max-w-[600px] m-auto">
          <div className="grid grid-cols-2 gap-2">
            <input
              className="border shadow-lg p-3"
              type="text"
              placeholder="Name"
            ></input>
            <input
              className="border shadow-lg p-3"
              type="email"
              placeholder="email"
            ></input>
          </div>
          <input
            className="border shadow-lg p-3 w-full my-4"
            type="text"
            placeholder="Subject"
          />
          <textarea
            className="border shadow-lg p-3 w-full"
            cols="30"
            rows="10"
            placeholder="Message"
          ></textarea>
          <button className="border shadow-lg p-3 w-full mt-2">Submit</button>
        </form>
      </div>
    </main>
  );
};

export default Contact;
