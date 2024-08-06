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
  const dispatch=useDispatch();
  const [Email, setEmail] = useState("");
  const [Password,setPassword]=useState("");
  const history=useNavigate();
  // const { setIsLoggedin } = useContext(AuthContext);
  
  function handler(event){
    event.preventDefault();
    let inputObj={Email,Password};
    console.log(inputObj);
    let url="https://todo-backend-3g62.onrender.com/users/checkuser";
    axios.post(url,inputObj).then((res)=>{
      if(res.status===200){
        toast.success("sign in successfully");
        // console.log(res.data.others._id);
        localStorage.setItem("id",res.data.others._id);
        dispatch(authActions.login());
        // setIsLoggedin(true);
        history("/todo");
      }
      else{
      Promise.reject();
      }}).catch((e)=>{
        if (e.response && e.response.status === 400) {
            // alert(e.response.data.message); 
            toast.error(e.response.data.message)
          } else {
            console.log(e);
          }
      });
  }
  return (
    <div className='mt-10'>
       <div className="bg-gray-900 h-110 place-content-center">
       <ToastContainer/>
      <div className="flex justify-center w-full text-center">
        <div className="p-8 rounded-lg shadow-md bg-slate-200 wrapper w-98">
          <form action="" className="">
            <h1 className="text-3xl font-bold">
              Sign in
            </h1>
            <div className="flex justify-between my-5 input-box">
              <input
                type="email"
                placeholder="Email"
                required
                value={Email} onChange={(e)=>setEmail(e.target.value)}
                className="w-full p-2 rounded-lg outline-orange-200"
              />
              <HiOutlineMail className="absolute mt-3 ml-85 size-5" />
            </div>
            <div className="flex justify-between my-5 input-box">
              <input
                type="password"
                placeholder="Password"
                required
                value={Password} onChange={(e)=>setPassword(e.target.value)}
                className="w-full p-2 rounded-lg outline-orange-200"
              />
              <FaLock className="absolute mt-3 ml-85 size-5" />
            </div>
            <button
              type="submit"
              onClick={handler}
              className="w-full py-2 my-2 font-bold text-white bg-orange-500 rounded-lg hover:bg-orange-600"
            >
              Sign in
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
    <Footer/>
    </div>
  )
}
