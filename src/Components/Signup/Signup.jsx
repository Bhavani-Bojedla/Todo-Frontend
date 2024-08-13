import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../Footer/Footer';
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';
import { HiOutlineMail } from "react-icons/hi";
import { FaUserCircle } from "react-icons/fa";
import { FaLock } from "react-icons/fa";

export default function Signup() {
  const [Username, setUsername] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); 
  const history = useNavigate();

  function handler(event) {
    event.preventDefault();
    if (Username && Email && Password) {
      setLoading(true); 
      let inputObj = { Username, Email, Password };
      console.log(inputObj);
      
      let url = "https://todo-backend-3g62.onrender.com/users/createuser";
      axios.post(url, inputObj)
        .then((res) => {
          if (res.status === 200) {
            toast.success("User created successfully");
            history("/signin");
          } else {
            Promise.reject();
          }
        })
        .catch((e) => {
          if (e.response && e.response.status === 400) {
            toast.error(e.response.data.message);
          } else {
            console.log(e);
          }
        })
        .finally(() => {
          setLoading(false); 
        });
    } else {
      toast.error("Please fill all the details");
    }
  }

  return (
    <>
      <div className="h-screen mt-10 bg-gray-900 place-content-center">
        <ToastContainer />
        <div className="flex justify-center w-full text-center">
          <div className="rounded-lg shadow-md lg:p-8 phone:p-4 sm:p-6 md:p-8 bg-slate-200 wrapper lg:w-98 md:w-98 sm:w-90 phone:w-73">
            <form onSubmit={handler} className="">
              <h1 className="font-bold lg:text-3xl phone:text-2xl md:text-3xl sm:text-3xl">
                Sign Up
              </h1>
              <div className="flex justify-between lg:my-5 md:my-5 sm:my-3 phone:my-3 input-box">
                <input
                  type="text"
                  placeholder="Username"
                  required
                  value={Username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full p-3 rounded-lg outline-orange-200"
                />
                <FaUserCircle className="absolute mt-3 lg:ml-85 md:ml-85 sm:ml-75 phone:ml-56 size-5" />
              </div>
              <div className="flex justify-between my-5 input-box">
                <input
                  type="email"
                  placeholder="Email"
                  required
                  value={Email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 rounded-lg outline-orange-200"
                />
                <HiOutlineMail className="absolute mt-3 lg:ml-85 md:ml-85 sm:ml-75 phone:ml-56 size-5" />
              </div>
              <div className="flex justify-between my-5 input-box">
                <input
                  type="password"
                  placeholder="Password"
                  required
                  value={Password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 rounded-lg outline-orange-200"
                />
                <FaLock className="absolute mt-3 lg:ml-85 md:ml-85 sm:ml-75 phone:ml-56 size-5" />
              </div>
              <button
                type="submit"
                className="w-full py-3 my-2 font-bold text-white bg-orange-500 rounded-lg hover:bg-orange-600"
                disabled={loading} 
              >
                {loading ? "Loading..." : "Sign Up"}
              </button>
              <div className="register-link">
                <p style={{ color: "black" }} className="text-sm">
                  Already have an account?{' '}
                  <Link to="/signin" className="text-orange-700 hover:text-orange-600">
                    Sign in
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
