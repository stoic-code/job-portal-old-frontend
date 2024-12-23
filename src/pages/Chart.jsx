import axios from "axios";
import { useEffect, useState } from "react";
import PieChart from "../../components/PieChart";
import BarChart from "../../components/BarChart";
import { useSelector } from "react-redux";

function Chart() {
  const [chartData, setChartData] = useState([]);
  const userDetail = useSelector((state) => state.user.value);

  console.log("hera user mpk", userDetail);
  useEffect(() => {
    axios
      .get(`https://jobholic.onrender.com/api/chart/${userDetail?.role}`, {
        headers: {
          authorization: `bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setChartData(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      {userDetail?.role === "company" ? (
        <PieChart chartData={chartData} />
      ) : (
        <BarChart chartData={chartData} />
      )}
    </>
  );
}

export default Chart;
