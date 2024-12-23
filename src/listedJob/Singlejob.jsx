import microsoftImg from "../assets/microsoft.png";
import { FaLocationDot } from "react-icons/fa6";
import { FaHandHoldingDollar } from "react-icons/fa6";
import { BsHourglassSplit } from "react-icons/bs";
import { FaUserTie } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import { AiOutlineEdit } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { Link } from "react-router-dom";

const url = "https://jobholic.onrender.com/";
function Singlejob({ job, userDetail, handleDelete, handleEdit }) {
  console.log(job);
  console.log(userDetail);
  const navigate = useNavigate();

  const { tags } = job;
  return (
    <div className="  relative mt-2 group flex py-4 px-4 bg-gray-200 cursor-pointer hover:shadow-lg">
      <img
        className=" w-14 h-14 sm:w-20 sm:h-20 rounded-md self-center"
        src={url + job.creatorPic}
        alt="mic"
      />
      <div className="flex flex-col pl-2 gap-1">
        <p className=" text-lg  font-bold">{job.title}</p>
        <hr className=" bg-my-green"></hr>
        <div className=" flex items-center gap-2">
          <h2 className=" font-semibold text-[10px] sm:text-md  text-my-green">
            Priority : {job.job_level}
          </h2>
          <div className="flex flex-wrap gap-0.5 ">
            {tags?.map((data) => {
              return (
                <div
                  className="  mt-1 bg-my-green px-1 sm:px-2 sm:py-0.5 text-[10px] font-thin rounded-lg text-gray-200 "
                  key={data}
                >
                  <span>{data}</span>
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex gap-2">
          <BsHourglassSplit className="  text-my-green" />
          <span className="text-sm font-thin  ">{job.job_type}</span>
          <FaUserTie className=" text-my-green ml-2" />
          <span className="text-sm font-thin  ">{job.experience}-year Exp</span>
        </div>
        <Link
          to={`/job/${job._id}`}
          className=" hidden group-hover:inline-block right-4 bottom-2 py-1 px-2 text-sm font-thin absolute  text-white bg-my-green rounded-md"
        >
          Read more
        </Link>
        {userDetail?.role === "company" ? (
          <div className="flex gap-2 absolute top-2 right-2">
            <RiDeleteBin5Line
              onClick={() => {
                if (job.createdBy._id !== userDetail._id) {
                  navigate("/prohibited");
                } else {
                  handleDelete(job._id);
                }
              }}
              className=" hidden group-hover:inline-block  text-xl   text-my-green"
            />
            {/* Delete */}
            {/* </button> */}
            <Link
              to={`/job/edit/${job._id}`}
              className=" hidden group-hover:inline-block    text-white"
            >
              <AiOutlineEdit className=" text-xl text-my-green" />
            </Link>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Singlejob;
