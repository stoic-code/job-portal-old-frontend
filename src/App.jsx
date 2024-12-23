import Myheader from "./navbar/Myheader";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import LoginPage from "./Register/LoginPage";
import RegisterPage from "./Register/RegisterPage";
import ProtectedRoute from "../protectedRoute/ProtectedRoute";
import Createjob from "./pages/Createjob";
import Jobs from "./pages/Jobs";
import Chart from "./pages/Chart";
import JobDetail from "./listedJob/JobDetail";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setUserDetail } from "../redux/UserSlice";
import JobEdit from "./listedJob/JobEdit";
import Prohibited from "./pages/Prohibited";

function App() {
  const dispatch = useDispatch();

  let token = localStorage.getItem("token");
  if (token) {
    axios
      .get("https://jobholic.onrender.com/api/user", {
        headers: {
          authorization: `bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        dispatch(setUserDetail(res.data));
      })
      .catch((err) => console.log(err));
  }

  return (
    <>
      <div className="bg-white  ">
        <Myheader />
      </div>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/job">
          <Route path="" element={<Jobs />} />
          <Route path=":id" element={<JobDetail />} />
          <Route path="edit/:id" element={<JobEdit />} />

          <Route path="create" element={<ProtectedRoute role={"company"} />}>
            <Route path="" element={<Createjob />} />
          </Route>
        </Route>
        <Route path="/prohibited" element={<Prohibited />}></Route>
        <Route path="/chart" element={<Chart />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/register" element={<RegisterPage />}></Route>
      </Routes>
    </>
  );
}

export default App;
