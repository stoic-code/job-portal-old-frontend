import { Bar } from "react-chartjs-2";
import { Chart, registerables, scales } from "chart.js";
import { useState } from "react";
Chart.register(...registerables);

function BarChart({ chartData }) {
  console.log(chartData);
  let pData = chartData.map((data) => data.number);
  const piedata = {
    labels: ["Accepted", "Rejected", "Pending"],
    datasets: [
      {
        label: "No of applied job",
        data: pData,
        backgroundColor: ["#50AF95", "#dd5546", "#89d0fb"],
        borderColor: ["#50AF95", "#dd5546", "#89d0fb"],
        barThickness: 40,
      },
    ],
  };
  console.log(piedata);

  return (
    <>
      <div className=" bg-[#F6F7FA] text-black text-center text-2xl underline-offset-4 underline">
        Chart Below
      </div>

      <h2 className=" underline mt-4 text-2xl font-thin text-center   decoration-green-300 mb-4">
        Bar-Diagram showing status of your jobs application
      </h2>
      <div className="  h-full mb-8 pb-8">
        <div className="mx-auto w-2/3">
          <Bar data={piedata} />
        </div>
      </div>
    </>
  );
}

export default BarChart;
