import { useEffect, useState } from "react";
import jobholicpic from "../assets/jobholicLogo.png";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { useSelector } from "react-redux";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Prohibitted from "../pages/Prohibited";
function JobEdit() {
  const userDetail = useSelector((state) => state.user.value);
  const navigate = useNavigate();
  const initialState = {
    title: "",
    company_link: "",
    job_type: "",
    job_level: "",
    deadline_date: "",
    type: "",
    description: "",
    experience: "",
    tags: [""],
    category: "",
    image: userDetail.image,
  };
  const { id } = useParams();
  const [jobData, setJobData] = useState(initialState);
  const [errorDaata, setErrorData] = useState({});

  useEffect(() => {
    axios
      .get(`https://jobholic.onrender.com/api/jobs/${id}`)
      .then((res) => {
        setJobData(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  console.log(jobData);
  function handleChange(e) {
    setJobData({ ...jobData, [e.target.name]: e.target.value });
  }
  function handleAddCategory() {
    setJobData({ ...jobData, tags: [...jobData.tags, ""] });
  }
  function handleCreateJob(e) {
    console.log(jobData);
    const { deadline_date } = jobData;
    deadline_date.toString();
    deadline_date.split(0, 10);
    console.log(deadline_date);
    const updatedJob = { ...jobData, deadline_date };
    e.preventDefault();
    axios
      .put(`http://localhost:8008/api/jobs/edit/${id}`, updatedJob, {
        headers: {
          Authorization: `bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        toast.success("Updated Successfully");
        console.log(res.data);
        setJobData(initialState);
        navigate("/job");
      })
      .catch((err) => {
        console.log(err.response?.data);
        if (err.response) {
          const errorArray = err.response.data;
          let temp = {};
          errorArray.forEach((err) => {
            temp[err.path] = `*${err.path} is required`;
          });

          setErrorData(temp);
        }
      });
  }
  return (
    <>
      {userDetail._id !== jobData.createdBy ? (
        navigate("/prohibited")
      ) : (
        <>
          <ToastContainer />
          <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <img
                className="mx-auto h-10 w-auto rounded-full p-0.5"
                src={jobholicpic}
                alt="Your Company"
              />
              <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Create a Job
              </h2>
            </div>

            <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-xl">
              <form
                className="space-y-1"
                action="#"
                onSubmit={(e) => handleCreateJob(e)}
                method="POST"
              >
                <div className="flex gap-2">
                  <div className=" w-1/2">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Job Title
                    </label>
                    <div className="mt-1">
                      <input
                        onChange={(e) => handleChange(e)}
                        name="title"
                        value={jobData.title}
                        type="text"
                        className=" pl-2 block w-full rounded-md border-0 py-1.5 focus:outline-none text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400  placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                    <small className="text-red-800">{errorDaata.title}</small>
                  </div>
                  <div className=" w-1/2">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Company Website
                    </label>
                    <div className="mt-1">
                      <input
                        onChange={(e) => handleChange(e)}
                        name="website_link"
                        value={jobData.website_link}
                        type="text"
                        placeholder="Website Link"
                        className=" pl-2 block w-full rounded-md border-0 py-1.5 focus:outline-none text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400  placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                    <small className="text-red-800">
                      {errorDaata.website_link}
                    </small>
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="w-1/2">
                    <label
                      htmlFor="experience"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Experience
                    </label>
                    <div className="mt-1">
                      <input
                        onChange={(e) => handleChange(e)}
                        value={jobData.experience}
                        name="experience"
                        type="number"
                        className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset focus:outline-none ring-gray-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                    <small className="text-red-900 ">
                      {errorDaata.experience}
                    </small>
                  </div>
                  <div className="w-1/2">
                    <label
                      htmlFor="job_type"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Job Type
                    </label>
                    <select
                      value={jobData.job_type}
                      onChange={(e) => handleChange(e)}
                      type="job_type"
                      name="job_type"
                      className="block py-2 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200  cursor-pointer dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                      placeholder="Select a role"
                    >
                      <option>Choose a job type</option>
                      <option value="full-time">full-time</option>
                      <option value="part-time">part-time</option>
                    </select>
                    <small className="text-red-900 ">
                      {errorDaata.job_type}
                    </small>
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className=" w-1/2">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Category{" "}
                      <button
                        onClick={() => handleAddCategory()}
                        type="button"
                        className=" px-1  rounded-md bg-orange-300  shadow-orange-700 shadow-md"
                      >
                        {" "}
                        Add
                      </button>
                    </label>
                    <div className="mt-2 ">
                      {jobData.tags.map((tag, index) => (
                        <>
                          <div
                            key={index}
                            className="flex gap-2 items-center mt-1"
                          >
                            <input
                              key={index}
                              onChange={(e) => {
                                let temp = [...jobData.tags];
                                temp[index] = e.target.value;
                                setJobData({ ...jobData, tags: temp });
                              }}
                              name="tag"
                              type="text"
                              value={tag}
                              className="  px-2  block w-full rounded-md border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            <button
                              onClick={(e) => {
                                let temp = [...jobData.tags];
                                temp.splice(index, 1);
                                setJobData({ ...jobData, tags: temp });
                              }}
                              className="px-1  text-sm text-white  bg-red-600 rounded-md "
                            >
                              Delete
                            </button>
                          </div>
                        </>
                      ))}
                    </div>
                    <small className="text-red-800">{errorDaata.tags}</small>
                  </div>
                  <div className="w-1/2">
                    <label
                      htmlFor="experience"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Job Level
                    </label>
                    <select
                      value={jobData.job_level}
                      onChange={(e) => handleChange(e)}
                      type="job_level"
                      name="job_level"
                      className="block py-2 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200  cursor-pointer dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                      placeholder="Select a role"
                    >
                      <option defaultValue>Choose a level</option>
                      <option value="fresher">fresher</option>
                      <option value="junior">junior</option>
                      <option value="mid">mid</option>
                      <option value="senior">senior</option>
                    </select>
                    <small className="text-red-900 ">
                      {errorDaata.job_level}
                    </small>
                  </div>
                  <div className="w-1/2">
                    <label
                      htmlFor="experience"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Job Category
                    </label>
                    <select
                      value={jobData.category}
                      onChange={(e) => handleChange(e)}
                      type="job_category"
                      name="category"
                      className="block py-2 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200  cursor-pointer dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                      placeholder="Select a category"
                    >
                      <option value={"bank-finance"}>Bank/Finance</option>
                      <option value={"ngo-ingo"}>NGO/INGO</option>
                      <option value={"sales-marketing"}>Sales/Marketing</option>
                      <option value={"government"}>Government</option>
                      <option value={"army-police"}>Army/Police</option>
                      <option value={"cooperative"}>Co-operative</option>
                      <option value={"school-college"}>School/College</option>
                      <option value={"healthcare"}>Healthcare</option>
                      <option value={"hotel-restaurant"}>
                        Hotel/Restaurant
                      </option>
                      <option value={"customer_care"}>Customer-Care</option>
                      <option defaultChecked value={"it-computer"}>
                        IT/Computer
                      </option>
                      <option value={"logistics/supply_chain"}>
                        Logistics/Supply Chain
                      </option>
                    </select>
                    <small className="text-red-900 ">
                      {errorDaata.category}
                    </small>
                  </div>
                </div>

                <div className="flex gap-2">
                  <div className=" w-1/2">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Application Deadline
                    </label>
                    <div className="mt-1">
                      <input
                        onChange={(e) => handleChange(e)}
                        name="deadline_date"
                        value={jobData.deadline_date}
                        type="date"
                        className=" pl-2 block w-full rounded-md border-0 py-1.5 focus:outline-none text-gray-900 shadow-sm ring-1 ring-inset ring-gray-400  placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                    <small className="text-red-800">
                      {errorDaata.deadline_date}
                    </small>
                  </div>

                  <div className=" w-1/2">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Type
                    </label>
                    <select
                      value={jobData.type}
                      onChange={(e) => handleChange(e)}
                      type="type"
                      name="type"
                      className="block py-2 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200  cursor-pointer dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                      placeholder="Select a type"
                    >
                      <option defaultValue>Choose a type</option>
                      <option value="top">top</option>
                      <option value="hot">hot</option>
                      <option value="featured">featured</option>
                      <option value="normal">normal</option>
                    </select>
                    <small className="text-red-800">{errorDaata.type}</small>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Description
                    </label>
                    <div className="text-sm"></div>
                  </div>
                  <div className="mt-2">
                    {/* <textarea
                  onChange={(e) =>
                    setJobData({ ...jobData, description: e.target.value })
                }
                value={jobData.description}
                name="description"
                type="text"
                className=" pl-2 block w-full rounded-md border-0 py-1.5 ring-gray-400 text-gray-900 shadow-sm ring-1 ring-inset  placeholder:text-gray-400 focus:ring-1 focus:outline-none  focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
            /> */}
                    <ReactQuill
                      className=" h-40 mb-10"
                      placeholder="enter your description...."
                      theme="snow"
                      onChange={(value) => {
                        setJobData({ ...jobData, description: value });
                      }}
                      value={jobData.description}
                    />
                  </div>
                  <small className="text-red-800">
                    {errorDaata.description}
                  </small>
                </div>

                {/* <div>
              <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
              >
              Role
              </label>
              <div className="mt-2">
              <input
              id="role"
              name="role"
              type="text"
              
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              </div>
            </div> */}

                <div>
                  <button
                    type="submit"
                    className="flex shadow-orange-700 shadow-md w-full justify-center rounded-md bg-orange-200 px-3 py-1.5 text-sm font-semibold leading-6 text-greeb-400  hover:bg-orange-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400"
                  >
                    Create
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default JobEdit;
