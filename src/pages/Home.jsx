import { useEffect, useState } from "react";
import Category from "../category/Category";
import ListJob from "../listedJob/FeaturedJob";
import Singlejob from "../listedJob/Singlejob";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import FeaturedJob from "../listedJob/FeaturedJob";
import PopularCategories from "../category/PopularCategories";
import "react-toastify/dist/ReactToastify.css";
import Aos from "aos";
import "aos/dist/aos.css";

import { ToastContainer } from "react-toastify";
function Home() {
  const [jobs, setjobs] = useState([]);
  const [input, setInput] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    Aos.init({ duration: 2000 });
    axios
      .get("https://jobholic.onrender.com/api/hotJob")
      .then((res) => {
        // console.log(res.data);
        setjobs(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  function handleSearch(e) {
    setInput(e.target.value);
    navigate("/job");
  }
  // console.log(jobs);
  return (
    <>
      <ToastContainer />
      <div
        className={`bg-saleBanner  bg-center  sm:bg-cover sm:bg-top    h-[100vh] flex  items-center justify-start `}
      >
        <div className=" container mx-auto">
          <div className="sm:w-1/3 pl-4  w-2/3">
            <h2 className=" text-5xl font-bold text-black">
              Find A <span className=" text-my-green">Job</span> That{" "}
              <span className=" text-my-green">Matches</span> Your Passion
            </h2>
            <p className=" mt-6 text-sm font-thin text-[#616161] sm:text-[#616161] ">
              Hand-picked opportunities to work from home remotely, freelance,
              full-time, part-time, contract and internship
            </p>

            <div className="mt-4 flex justify-start flex-col">
              <input
                onChange={(e) => handleSearch(e)}
                value={input}
                className=" px-8  py-4  mt-8 text-sm border-none bg-white rounded-md p-2 outline-none"
                placeholder="search by job title..."
              />
            </div>
          </div>
        </div>
      </div>
      <PopularCategories />

      <div className="container mx-auto">
        <h2
          data-aos="zoom-in"
          className=" mb-6 text-center text-xl sm:text-2xl drop-shadow-xl font-bold mt-4 text-black"
        >
          All Latest Listed Jobs
        </h2>
        <div className="flex flex-col gap-4 sm:grid sm:grid-cols-2  mb-8">
          {jobs.map((job) =>
            job.type == "hot" ? (
              <div data-aos="fade-up" key={job._id} className="flex flex-col ">
                <FeaturedJob key={job._id} job={job} />
              </div>
            ) : null
          )}
        </div>
      </div>
    </>
  );
}

export default Home;
