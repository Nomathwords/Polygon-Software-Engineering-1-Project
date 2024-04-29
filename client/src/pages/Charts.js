import React from "react";
import { useState, useEffect } from "react";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";

// Chart labels for each month
const Charts = () => {
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

  // Where the years data will be mapped to
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

  //Fetch the invoices
  const fetchData = async (token) => {
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
      // Loop through the data and map it to its appropriate month in mapData
      data.invoiceList.forEach((element) => {
        // Get month and year correctly
        let year = element.date.substr(0, 4);
        let month = element.date.substr(5, 2);

        // So we can keep months correct in the array - arrays cannot be 01, for example
        if (month[0] == 0) {
          month = month.substr(1);
        }

        // Map the data to the mapData object
        if (year == currentYear) {
          mapData[labels[month - 1]] = (
            Number(mapData[labels[month - 1]]) + Number(element.totalcharge)
          ).toFixed(2);
        }
      });

      // set the data for the chart, useState for this is defined below
      setData({
        labels: labels,
        datasets: [
          {
            label: "Earnings ($USD)",
            backgroundColor: "rgb(116, 143, 252)",
            borderColor: "rgb(116, 143, 252)",
            data: [
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
            pointRadius: 0,
            fill: false,
            lineTension: 0.1,
          },
        ],
      });
    } else {
      console.log("Failed to fetch");
    }
  };

  // useState to hold the data for the chart
  const [data, setData] = useState({
    labels: labels,
    datasets: [
      {
        label: "Earnings ($USD)",
        backgroundColor: "rgb(116, 143, 252)",
        borderColor: "rgb(116, 143, 252)",
        data: [
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
        pointRadius: 2,
        fill: false,
        lineTension: 0.1,
      },
    ],
  });

  Chart.defaults.plugins.tooltip.backgroundColor = "rgba(55 ,48 ,163 , 0.8)";
  Chart.defaults.plugins.tooltip.padding = 12;
  Chart.defaults.plugins.tooltip.caretPadding = 6;
  Chart.defaults.elements.point.pointStyle = "cross";
  Chart.defaults.color = "#d0bfff";

  //Chart options
  const options = {
    interaction: {
      mode: "x",
    },
    scales: {
      x: {
        grid: {
          display: false,
          drawBorder: false,
        },
        ticks: {
          color: "#d0bfff",
        },
      },
      y: {
        ticks: {
          color: "#d0bfff",
          fontSize: 10,
          callback: (value, index, values) => {
            if (parseInt(value) >= 1000) {
              return (
                "$" + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              );
            } else {
              return "$" + value;
            }
          },
        },
        grid: {
          display: false,
          drawBorder: false,
        },
      },
    },
  };

  // Fetch data for charts
  useEffect(() => {
    const token = localStorage.getItem("token");
    fetchData(token);
  }, []);

  return (
    <div>
      <div className="flex flex-col justify-center align-middle items-center">
        <h1 className="font-[800] mb-[20px] tracking-[.12em] text-[30px] text-white">
          {" "}
          Monthly Statement Summary{" "}
        </h1>
        <main className="w-[750px] h-[385px] bg-black/[.3] p-[12px] rounded-[6px] border-4 border-indigo-400">
          <Line id="MyChart" data={data} options={options} />
        </main>
      </div>
    </div>
  );
};

export default Charts;
