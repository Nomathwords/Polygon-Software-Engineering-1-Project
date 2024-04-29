import React from "react";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { uid } from "uid";
import { useJwt } from "react-jwt";
import Overlay from "../components/Overlay";

const Invoice = () => {
  // User token to identify user
  const token = localStorage.getItem("token");
  // decodedToken to get user Data
  const { decodedToken } = useJwt(token);

  // References for the invoice fillable form
  const poRef = useRef(null);
  const dateRef = useRef(null);
  const toRef = useRef(null);
  const serviceRef = useRef(null);
  const chargeRef = useRef(null);
  const totalRef = useRef(null);
  const noteRef = useRef(null);
  const custEmailRef = useRef(null);
  const navigate = useNavigate();
  const [po] = useState(uid());
  const taxes = 0.045;
  const [total, setTotal] = useState(0);

  // function to send invoice information to the backend
  const handleInvoice = async (event) => {
    event.preventDefault();

    // decoded user
    const user = decodedToken;
    // Random invoice number
    const ponumber = poRef.current.value;

    //Check if data was entered if it was set the date else set current date
    let date;
    if (dateRef.current.value !== "") {
      date = dateRef.current.value;
    } else {
      const tempDate = new Date();
      var month = tempDate.getUTCMonth() + 1;
      var day = tempDate.getUTCDate();
      var year = tempDate.getUTCFullYear();
      date = `${year}-${month}-${day}`;
      console.log(date);
    }

    // The rest of the form references
    const billto = toRef.current.value;
    const service = serviceRef.current.value;
    const charges = Number(chargeRef.current.value).toFixed(2);
    const totalcharge = totalRef.current.value;
    const customerEmail = custEmailRef.current.value;
    const notes = noteRef.current.value;

    // Call the backend with the above information
    const response = await fetch("http://localhost:3001/api/invoice", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user,
        ponumber,
        date,
        billto,
        service,
        charges,
        taxes,
        totalcharge,
        customerEmail,
        notes,
      }),
    });

    // Navigate back to the dashboard after the invoice is processed
    const data = await response.json();
    if (data.status === "ok") {
      console.log(data);
      navigate("/dashboard");
    }
  };

  // Dynamically updates the total charge section by looking at the input charges and
  // multiplying with the taxrate
  const handleCharges = () => {
    let charge = chargeRef.current.value;
    const taxed = Number(charge) * Number(taxes);

    setTotal((Number(charge) + Number(taxed)).toFixed(2));
  };

  return (
    <main>
      {/* Overlay Component */}
      <Overlay />

      {/* Page Start */}
      <div className="p-5 flex flex-col items-center justify-center h-screen text-white z-[2] absolute top-0 left-0 right-0 bottom-0">
        <h2 className="text-5xl font-bold">Create Invoice</h2>
        <p className="py-5 text-xl">
          Submit the form below to generate a new invoice
        </p>
      </div>

      {/* Invoice Form */}
      <div className="max-w-[1240px] m-auto p-4 h-screen">
        <h1 className="text-2xl font-bold text-center p-4">Invoice</h1>
        <form className="max-w-[600px] m-auto">
          <div className="grid grid-cols-2 gap-2">
            <input
              className="border shadow-lg p-3"
              type="text"
              name="PO"
              placeholder="PO Number"
              value={po}
              readOnly
              ref={poRef}
            />
            <input
              className="border shadow-lg p-3"
              type="date"
              placeholder="Date"
              ref={dateRef}
            ></input>
            <input
              className="border shadow-lg p-3"
              type="text"
              placeholder="Customer Name"
              ref={toRef}
            ></input>
            <input
              className="border shadow-lg p-3"
              type="email"
              placeholder="Customer Email"
              ref={custEmailRef}
            ></input>

            <input
              className="border shadow-lg p-3"
              type="Number"
              name="Charges"
              placeholder="Charges"
              ref={chargeRef}
              onChange={handleCharges}
            ></input>
            <input
              className="border shadow-lg p-3"
              type="Number"
              name="total"
              placeholder="Total Charge"
              value={total}
              readOnly
              ref={totalRef}
            />
          </div>
          <input
            className="border shadow-lg p-3 w-full my-4"
            type="text"
            placeholder="Services"
            ref={serviceRef}
          />

          <textarea
            className="border shadow-lg p-3 w-full"
            cols="30"
            rows="10"
            placeholder="Notes"
            ref={noteRef}
          ></textarea>
          <button
            className="border shadow-lg p-3 w-full mt-2"
            onClick={handleInvoice}
          >
            Submit
          </button>
        </form>
      </div>
    </main>
  );
};

export default Invoice;
