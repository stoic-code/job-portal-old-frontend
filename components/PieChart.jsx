import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);

function PieChart({ chartData }) {
  console.log(chartData);
  let pData = chartData.map((data) => data.number);
  const piedata = {
    labels: ["inactive", "active"],
    datasets: [
      {
        label: "no of jobs",
        data: pData,
        backgroundColor: ["#dd5546", "#50AF95"],
        borderColor: ["#dd5546", "#50AF95"],
      },
    ],
  };
  console.log(piedata);

  return (
    <>
      <div className=" bg-[#F6F7FA] py-6 text-black text-center text-2xl ">
        Chart Below
      </div>

      <h2 className=" underline mt-4 text-2xl font-thin text-center   decoration-green-300 mb-4">
        Pie-Chart for Active & Inactive Jobs
      </h2>
      <div className=" h-56 mb-8 pb-8 flex">
        <div className=" mx-auto  md:w-56 md:h-56">
          <Pie data={piedata} />
        </div>
      </div>
    </>
  );
}

export default PieChart;
