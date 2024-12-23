import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const url = "http://localhost:8008/";
function JobDetail({ job }) {
  const userDetail = useSelector((state) => state.user.value);

  const params = useParams();
  const JobId = params.id;
  console.log(params);
  const navigate = useNavigate();

  const initialState = {
    appliedJob: [],
  };
  const [jobDetail, setJobDetail] = useState({});
  const [appliedJobs, setAppliedJobs] = useState(initialState);

  useEffect(() => {
    axios
      .get(`https://jobholic.onrender.com/api/jobs/${JobId}`)
      .then((res) => {
        console.log(res.data);
        setJobDetail(res.data);
      })
      .catch((Err) => console.log(Err));
  }, []);
  console.log(jobDetail);
  const {
    title,
    job_type,
    job_level,
    deadline_date,
    creatorPic,
    description,
    website_link,
    experience,
    location,
  } = jobDetail;

  console.log(deadline_date);

  function handleApply() {
    setAppliedJobs({
      ...appliedJobs,
      ...appliedJobs.appliedJob.push({ job_id: JobId }),
    });
    console.log("applyting");
    axios
      .post("https://jobholic.onrender.com/api/apply", appliedJobs, {
        headers: {
          authorization: `bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        toast.success("Applied Successfully");
        navigate("/");
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }
  console.log(appliedJobs);

  return (
    <>
      <ToastContainer />
      <div className="flex flex-col container mx-auto ">
        <div className="flex  py-12  bg-gray-100 w-full">
          <h2 className=" font-bold text-4xl mx-auto text-center ">{title}</h2>
        </div>
        <div className="mx-auto mt-4">
          {userDetail?.role === "job-seeker" ? (
            <button
              onClick={() => handleApply()}
              className=" py-1 shadow-xl  shadow-green-200 border-2 border-green-300 text-xl bg-green-700 text-gray-200 px-4 rounded-lg mx-auto"
            >
              Apply This Job
            </button>
          ) : null}
        </div>{" "}
        <hr className=" h-1 bg-red-800 my-6 w-full"></hr>
        <div className="container mx-auto">
          <img
            className=" mb-8 w-52  h-52 rounded-full  drop-shadow-2xl shadow-2xl"
            src={url + creatorPic}
          />
          <p className=" text-lg font-bold mt-1">
            Experience Level:{" "}
            <span className=" text-lg ml-2 font-thin text-gray-500">
              {job_level}
            </span>
          </p>
          <p className=" text-lg font-bold mt-1">
            Experience Length:{" "}
            <span className=" text-lg ml-2 font-thin text-gray-500">
              {experience} years
            </span>
          </p>

          <p className=" text-lg font-bold mt-1">
            Application Deadline:{" "}
            <span className=" text-lg ml-2 font-thin text-gray-500">
              {deadline_date}
            </span>
          </p>
          <p className=" text-lg font-bold mt-1">
            Salary Range:{" "}
            <span className=" text-lg ml-2 font-thin text-gray-500">
              Negotiable
            </span>
          </p>
          <p className=" text-lg font-bold mt-1">
            Website:{" "}
            <span className=" text-lg ml-2 font-thin text-gray-500">
              {website_link}
            </span>
          </p>
          <p className=" text-lg font-bold mt-1">
            Job Type:{" "}
            <span className=" text-lg ml-2 font-thin text-gray-500">
              {job_type}
            </span>
          </p>
          <p className=" text-lg font-bold mt-1">
            Location:{" "}
            <span className=" text-lg ml-2 font-thin text-gray-500">
              {location}
            </span>
          </p>
        </div>
        <div className="container mt-8 mx-auto">
          <h2 className=" font-bold text-2xl mb-4">Job Description</h2>
          <p dangerouslySetInnerHTML={{ __html: description }}></p>
        </div>
      </div>
      ;
    </>
  );
}

export default JobDetail;
