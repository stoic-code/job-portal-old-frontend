import { useEffect, useState } from "react";
import axios from "axios";
import Singlejob from "../listedJob/Singlejob";
import { useLocation } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Pagination from "rc-pagination";
import Aos from "aos";
import "aos/dist/aos.css";
import { toast } from "react-toastify";

function Jobs() {
  const initialState = {
    search: "",
    job_type: "",
  };
  const [jobs, setjobs] = useState([]);
  const [input, setInput] = useState(initialState);
  const [isEmpty, setIsEmpty] = useState(false);
  const [currentSearchParams, setSearchParams] = useSearchParams();
  const [paginationData, setPaginationData] = useState({
    total: 10,
    page: 1,
    perPage: 5,
  });
  const params = useLocation();
  const userDetail = useSelector((state) => state.user.value);
  console.log(userDetail);

  useEffect(() => {
    setIsEmpty(false);
    // Aos.init({ duration: 1000 });
    axios
      .get(`https://jobholic.onrender.com/api/jobs${params.search}`)
      .then((res) => {
        console.log(res.data[0].data);
        console.log(res.data[0].metadata[0]);
        setjobs(res.data[0].data);
        if (res.data[0].metadata[0]) {
          setPaginationData(res.data[0].metadata[0]);
        }
        console.log("yeta pugyo?");
        res.data[0].data.length === 0 ? setIsEmpty(true) : setIsEmpty(false);
      })
      .catch((err) => console.log(err));

    // sdds
  }, [params.search]);
  console.log(params.search);

  function handleChange(e) {
    setInput({ ...input, [e.target.name]: e.target.value });
    setSearchParams(currentSearchParams);
    console.log(currentSearchParams.get("search"));
  }

  function handleDelete(id) {
    console.log("this is hadnle delete");
    axios
      .delete(`https://jobholic.onrender.com/api/jobs/delete/${id}`, {
        headers: {
          authorization: `bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setjobs((jobs) => jobs.filter((job) => job._id !== id));
        toast.success("Deleted Successfully");
        console.log(res.data);
      })
      .catch((Err) => console.log(Err));
  }
  function handleEdit(id) {
    axios
      .put(`https://jobholic.onrender.com/api/jobs/edit/${id}`)
      .then((res) => {
        console.log(res.data);
      });
  }

  console.log(isEmpty);

  return (
    <div className="  mx-auto">
      <h2 className=" text-black bg-[#F6F7FA] font-bold text-center py-6">
        All the Jobs You're Seeking Available Here
      </h2>
      <div className=" container mx-auto">
        <div className="my-4">
          <div className="  flex flex-col sm:flex-row gap-4 sm:justify-between items-center">
            <div className=" w-full">
              <input
                name="search"
                onChange={(e) => {
                  e.preventDefault();
                  handleChange(e);
                  currentSearchParams.set("search", e.target.value);
                  setSearchParams(currentSearchParams);
                }}
                value={currentSearchParams.get("search")}
                className=" w-full    text-sm border-2  bg-white rounded-md p-2 outline-none"
                placeholder="search by job title"
              />
            </div>
            <div className="flex gap-1  justify-between sm:justify-normal">
              <div className="flex flex-col gap-1 text-center">
                <label className=" text-sm font-thin ">Job Type</label>
                <select
                  name="job_type"
                  onChange={(e) => {
                    currentSearchParams.set("job_type", e.target.value);
                    setSearchParams(currentSearchParams);
                  }}
                  className=" text-sm font-light border-2 rounded-lg"
                >
                  {/* <option defaultValue value={""}></option> */}
                  <option defaultChecked value={""}></option>
                  <option defaultChecked value={"part-time"}>
                    part-time
                  </option>
                  <option value={"full-time"}>full-time</option>
                </select>
              </div>
              <div className="flex flex-col gap-1 text-center">
                <label className=" text-sm font-thin ">Job Level</label>
                <select
                  name="job_level"
                  onChange={(e) => {
                    currentSearchParams.set("job_level", e.target.value);
                    setSearchParams(currentSearchParams);
                  }}
                  className=" text-sm font-light border-2 rounded-lg"
                >
                  {/* <option defaultValue value={""}></option> */}
                  <option defaultChecked value=""></option>
                  <option defaultChecked value={"fresher"}>
                    fresher
                  </option>
                  <option value={"junior"}>junior</option>
                  <option value={"mid"}>mid</option>
                  <option value={"senior"}>senior</option>
                </select>
              </div>
              <div className="flex flex-col gap-1 text-center">
                <label className=" text-sm font-thin ">Job Category</label>
                <select
                  name="job_type"
                  onChange={(e) => {
                    currentSearchParams.set("category", e.target.value);
                    setSearchParams(currentSearchParams);
                  }}
                  className="  text-sm font-light border-2 rounded-lg"
                >
                  {/* <option defaultValue value={""}></option> */}

                  <option defaultChecked value={""}></option>
                  <option value={"bank-finance"}>Bank/Finance</option>
                  <option value={"ngo-ingo"}>NGO/INGO</option>
                  <option value={"sales-marketing"}>Sales/Marketing</option>
                  <option value={"government"}>Government</option>
                  <option value={"army-police"}>Army/Police</option>
                  <option value={"cooperative"}>Co-operative</option>
                  <option value={"school-college"}>School/College</option>
                  <option value={"healthcare"}>Healthcare</option>
                  <option value={"hotel-restaurant"}>Hotel/Restaurant</option>
                  <option value={"customer_care"}>Customer-Care</option>
                  <option value={"it-computer"}>IT/Computer</option>
                  <option value={"logistics-supply_chain"}>
                    Logistics/Supply Chain
                  </option>
                </select>
              </div>
            </div>
            {/* <button
            type="submit"
            className=" text-gray-300 bg-green-700 px-4 rounded-lg"
          >
            {" "}
            Search
          </button> */}
          </div>
        </div>
        <div className="flex justify-between">
          <Pagination
            total={paginationData.total}
            pageSize={paginationData.perPage}
            prevIcon="<"
            nextIcon=">"
            current={paginationData.page}
            onChange={(pgNumber) => {
              console.log(pgNumber);
              currentSearchParams.set("page", pgNumber);
              setSearchParams(currentSearchParams);
            }}
            showTotal={(total, range) =>
              `${range[0]}-${range[1]} of ${total} items`
            }
          />
          <div className="flex gap-4  ">
            <label htmlFor="sort">Per Page</label>
            <select
              className="border-2  border-green-600 rounded-md "
              onChange={(e) => {
                e.preventDefault();
                currentSearchParams.set("perPage", e.target.value);
                setSearchParams(currentSearchParams);
              }}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
            </select>
          </div>
        </div>
        {isEmpty && (
          <div className=" mx-auto text-center mt-20">
            <h3 className=" text-red-500 font-bold text-4xl">Sorry!!!</h3>
            <h2 className=" text-red-300 mt-2 font-bold text-2xl">
              No Such Job Found
            </h2>
          </div>
        )}
        <div className="mb-2  -z-10">
          {jobs.map((job) => (
            <div
              data-aos="slide-up"
              key={job._id}
              className="flex    flex-col  "
            >
              <Singlejob
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                userDetail={userDetail}
                key={job._id}
                job={job}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Jobs;
