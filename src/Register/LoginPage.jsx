import logo from "../assets/jobholicLogo.png";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";

// import toast, { Toaster } from "react-hot-toast";

import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import { setUserDetail } from "../../redux/UserSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function LoginPage() {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  function handleSubmit(e) {
    e.preventDefault();
    axios
      .post("https://jobholic.onrender.com/api/login", {
        email: e.target.email.value,
        password: e.target.password.value,
      })
      .then((res) => {
        console.log(res.data.user);
        // console.log(res.data.token);

        toast.success("login Successful", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });

        dispatch(setUserDetail(res.data.user));
        localStorage.setItem("token", res.data.token);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        console.log("hello error");
        //Err.response.data.errors[0].msg)
        // if (err.response.data) {
        // }

        if (err.response.data.msg) {
          console.log("yo error khoi");
          toast.error(err.response.data.msg);
        } else {
          const errorArray = err.response?.data;
          let temp = {};
          errorArray.forEach((error) => {
            temp[error.params] = error.msg;
          });
          setError(temp);
        }

        // setError(err.response.data.msg);
      });
    setError({});
  }

  return (
    <div>
      <ToastContainer />

      {/* here this taoscontainer is useless I would suggest to render the ToastContainer at the root of your app. Outside of react-router if possible coz yesko main vaneko tw header ho so teta trigger hunxa toastcontainer */}
      {/* <Toaster /> */}
      <section className="   bg-gray-100 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="bg-gray-100 rounded-lg shadow-lg p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign in to your account
              </h1>
              <form
                onSubmit={(e) => handleSubmit(e)}
                className="space-y-4 md:space-y-6"
                action="#"
              >
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                  />
                  <small className="text-red-800">{error.email}</small>
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                  <small className="text-red-800">{error.password}</small>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="remember"
                        aria-describedby="remember"
                        type="checkbox"
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                        required=""
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="remember"
                        className="text-gray-500 dark:text-gray-300"
                      >
                        Remember me
                      </label>
                    </div>
                  </div>
                  <a
                    href="#"
                    className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Forgot password?
                  </a>
                </div>
                <button
                  type="submit"
                  className="w-full text-green-700 hover:border-2 hover:border-green-700 bg-primary-600  focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600  dark:focus:ring-primary-800"
                >
                  Sign in
                </button>
                <p
                  className="text-sm  hover:text-green-500 cursor-pointer
                 font-light text-gray-500 dark:text-gray-400"
                >
                  Don’t have an account yet?{" "}
                  <Link to="/register">
                    {/* <a
                      href="#"
                      className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                    > */}
                    Sign up
                    {/* </a> */}
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default LoginPage;
