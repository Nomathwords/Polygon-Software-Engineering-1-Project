import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Overlay from "../components/Overlay";

const Statement = () => {
  // Where the years data will be stored
  const [income, setIncome] = useState(0);

  // Navigate Pages
  const navigate = useNavigate();

  // Labels for mapping monthly data
  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Where the years data will be mapped
  const mapData = {
    January: 0,
    February: 0,
    March: 0,
    April: 0,
    May: 0,
    June: 0,
    July: 0,
    August: 0,
    September: 0,
    October: 0,
    November: 0,
    December: 0,
  };

  // useState for setting monthly data
  const [monthly, setMonthy] = useState({
    monthlyData: [
      mapData[labels[0]],
      mapData[labels[1]],
      mapData[labels[2]],
      mapData[labels[3]],
      mapData[labels[4]],
      mapData[labels[5]],
      mapData[labels[6]],
      mapData[labels[7]],
      mapData[labels[8]],
      mapData[labels[9]],
      mapData[labels[10]],
      mapData[labels[11]],
    ],
  });

  // Return to the dashboard
  const handleDashboard = () => {
    navigate("/dashboard");
  };

  //Fetch the invoices
  const fetchCharges = async (token) => {
    // Get user token to identify user
    const user = token;

    // Fetch Data
    const response = await fetch("http://localhost:3001/api/getInvoices", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user,
      }),
    });
    // Wait for the response
    const data = await response.json();

    const currentYear = new Date().getFullYear();

    // Check if invoices are there
    if (data.invoiceList) {
      let tempIncome = 0;
      // Loop through the data and map it to its appropriate month in mapData
      data.invoiceList.forEach((element) => {
        // Get month and year correctly
        let year = element.date.substr(0, 4);
        let month = element.date.substr(5, 2);

        // So we can keep months correct in the array - arrays cannot be 01, for example
        if (month[0] == 0) {
          month = month.substr(1);
        }

        //map data to object
        if (year == currentYear) {
          const temp = Number(tempIncome);
          tempIncome = temp + Number(element.totalcharge);
          mapData[labels[month - 1]] = (
            Number(mapData[labels[month - 1]]) + Number(element.totalcharge)
          ).toFixed(2);
        }
      });

      // Set total income
      setIncome(Number(tempIncome).toFixed(2));

      // Set monthly totals
      setMonthy({
        monthlyData: [
          mapData[labels[0]],
          mapData[labels[1]],
          mapData[labels[2]],
          mapData[labels[3]],
          mapData[labels[4]],
          mapData[labels[5]],
          mapData[labels[6]],
          mapData[labels[7]],
          mapData[labels[8]],
          mapData[labels[9]],
          mapData[labels[10]],
          mapData[labels[11]],
        ],
      });
    } else {
      console.log("Failed to fetch");
    }
  };

  // Load the page fully before fetching data
  useEffect(() => {
    const onPageLoad = () => {
      console.log("page loaded");
      // Get the jwt token for the local storage
      const token = localStorage.getItem("token");

      // call function to fetch the data
      fetchCharges(token);
    };

    // If the page is fully loaded then proceed by calling onPageLoad()
    if (document.readyState === "complete") {
      onPageLoad();
    } else {
      window.addEventListener("load", onPageLoad, false);
      return () => window.removeEventListener("load", onPageLoad);
    }
  }, []);

  return (
    <div>
      {/* Overlay Component */}
      <Overlay />

      {/* Page Start */}
      <div>
        <main className="flex flex-col items-center text-center justify-evenly text-black text-4xl z-[2] absolute top-0 left-0 right-0 bottom-0">
          <h1 className="font-[800] mb-[20px] mt-12 tracking-[.12em] text-[40px] text-white">
            Annual Statement
          </h1>
          <div className="rounded-2xl shadow-2xl border-4 py-8 px-12 bg-black/[.3] p-[12px] border-indigo-400">
            <ul className="grid grid-cols-2 grid-rows-6 justify-center place-items-start gap-4 gap-x-20">
              <li className="text-white">January: ${monthly.monthlyData[0]}</li>
              <li className="text-white">July: ${monthly.monthlyData[6]}</li>
              <li className="text-white">
                February: ${monthly.monthlyData[1]}
              </li>
              <li className="text-white">August: ${monthly.monthlyData[7]}</li>
              <li className="text-white">March: ${monthly.monthlyData[2]}</li>
              <li className="text-white">
                September: ${monthly.monthlyData[8]}
              </li>
              <li className="text-white">April: ${monthly.monthlyData[3]}</li>
              <li className="text-white">October: ${monthly.monthlyData[9]}</li>
              <li className="text-white">May: ${monthly.monthlyData[4]}</li>
              <li className="text-white">
                November: ${monthly.monthlyData[10]}
              </li>
              <li className="text-white">June: ${monthly.monthlyData[5]}</li>
              <li className="text-white">
                December: ${monthly.monthlyData[11]}
              </li>
            </ul>
            <div className="flex justify-center text-white mt-8">
              Total Annual: ${income}
            </div>
          </div>
          <button
            className="flex border-2 bg-indigo-800/60 border-white text-white rounded-full px-6 py-2  font-semibold hover:bg-violet-900"
            onClick={handleDashboard}
          >
            Dashboard
          </button>
        </main>
      </div>
    </div>
  );
};

export default Statement;
