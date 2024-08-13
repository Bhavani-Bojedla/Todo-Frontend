import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../Footer/Footer';
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store';
import { HiOutlineMail } from "react-icons/hi";
import { FaLock } from "react-icons/fa";

export default function Signin() {
  const dispatch = useDispatch();
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const history = useNavigate();
  const [loading, setLoading] = useState(false);
  function handler(event) {
    event.preventDefault();
    if (!Email || !Password) {
      
      toast.error("Please fill in all details");
      return;
    }
    setLoading(true);
    let inputObj = { Email, Password };
    console.log(inputObj);

    let url = "https://todo-backend-3g62.onrender.com/users/checkuser";
    axios.post(url, inputObj)
      .then((res) => {
        if (res.status === 200) {
          toast.success("Sign in successfully");
          localStorage.setItem("id", res.data.others._id);
          dispatch(authActions.login());
          history("/todo");
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
      }).finally(() => {
        setLoading(false); // Stop loading once the request is done
      });
  }

  return (
    <div >
      <div className="h-screen bg-gray-900 lg:mt-10 md:mt-10 place-content-center">
        <ToastContainer />
        <div className="flex justify-center w-full text-center">
          <div className="rounded-lg shadow-md lg:p-8 phone:p-4 sm:p-6 md:p-8 bg-slate-200 wrapper lg:w-98 md:w-98 sm:w-90 phone:w-73">
            <form onSubmit={handler} className="">
              <h1 className="font-bold lg:text-3xl phone:text-2xl md:text-3xl sm:text-3xl">
                Sign in
              </h1>
              <div className="flex justify-between lg:my-5 md:my-5 sm:my-3 phone:my-3 input-box">
                <input
                  type="email"
                  placeholder="Email"
                  required
                  value={Email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 rounded-lg outline-orange-200"
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
                  className="w-full p-2 rounded-lg outline-orange-200"
                />
                <FaLock className="absolute mt-3 lg:ml-85 md:ml-85 sm:ml-75 phone:ml-56 size-5" />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2 my-2 font-bold text-white bg-orange-500 rounded-lg hover:bg-orange-600"
              >
                {loading ? "Loading..." : "Sign in"} 
              </button>
              
              <div className="register-link">
                <p style={{ color: "black" }} className="text-sm">
                  Don't have an account?{' '}
                  <Link to="/signup" className="text-orange-500 hover:text-orange-600">
                    Sign up
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
