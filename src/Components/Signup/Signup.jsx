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
  const [Password,setPassword]=useState("");
  const history=useNavigate();
  
  function handler(event){
    if(Username && Email && Password){
    event.preventDefault();
    let inputObj={Username,Email,Password};
    console.log(inputObj);
    let url="https://todo-backend-3g62.onrender.com/users/createuser";
    axios.post(url,inputObj).then((res)=>{
      if(res.status===200){
        toast.success("user created successfully");
        history("/signin");
      }
      else{
      Promise.reject();
      }}).catch((e)=>{
        if (e.response && e.response.status === 400) {
          toast.error(e.response.data.message) 
          } else {
            console.log(e);
          }
      });
    }
    else{
      toast.error("Please fill all the details")
    }
  }
  return (
    <>
    <div className="mt-10 bg-gray-900 h-110 place-content-center">
      <ToastContainer/>
      <div className="flex justify-center w-full text-center">
        <div className="p-8 rounded-lg shadow-md bg-slate-200 wrapper w-98">
          <form action="" className="">
            <h1 className="text-3xl font-bold">
              Sign Up
            </h1>
            <div className="flex justify-between my-5 input-box">
              <input
                type="text"
                placeholder="Username"
                required
                value={Username} onChange={(e)=>setUsername(e.target.value)}
                className="w-full p-3 rounded-lg outline-orange-200"
              />
               <FaUserCircle className="absolute mt-3 ml-85 size-5" />
            </div>
            <div className="flex justify-between my-5 input-box">
              <input
                type="email"
                placeholder="Email"
                required
                value={Email} onChange={(e)=>setEmail(e.target.value)}
                className="w-full p-3 rounded-lg outline-orange-200"                
              />
              <HiOutlineMail className="absolute mt-3 ml-85 size-5" />
            </div>
            <div className="flex justify-between my-5 input-box">
              <input
                type="password"
                placeholder="Password"
                required
                value={Password} onChange={(e)=>setPassword(e.target.value)}
                className="w-full p-3 rounded-lg outline-orange-200"
              />
               <FaLock className="absolute mt-3 ml-85 size-5" />
            </div>
            <button
              type="submit"
              onClick={handler}
              className="w-full py-3 my-2 font-bold text-white bg-orange-500 rounded-lg hover:bg-orange-600"
            >
              Sign Up
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
    <Footer/>
    </>
  );
}

