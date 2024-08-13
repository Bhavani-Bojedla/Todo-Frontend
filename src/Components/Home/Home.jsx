import React from 'react'
import Footer from '../Footer/Footer'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Home() {
  const history=useNavigate();
  const isloggedIn=useSelector((state)=>state.isloggedIn);
  
  function change(){
    if (isloggedIn) {
      history("/todo");
    } else {
      history("/signin");
    }
  }
  return (
    <div>
    <div className='grid h-screen mt-3 text-center place-content-center'>
      <div className='mx-auto my-5 mt-10 font-bold text-center text-white lg:text-6xl md:text-5xl sm:text-4xl phone:text-4xl phone:w-64 sm:w-90 md:w-100 lg:w-110'>Organize your work and life, finally.</div>
      <div className='mx-auto my-5 font-medium text-gray-600 lg:text-xl md:text-xl sm:text-xl phone:text-lg phone:w-64 sm:w-98 md:w-100 lg:w-100 '>Simplify life for both you and your team. The world's #1 task manager and to-do list app.</div>
      <button onClick={change} className='mx-auto my-5 font-semibold text-white bg-orange-600 rounded-md shadow-md lg:text-xl md:text-xl phone:text-lg lg:p-3 md:p-2 sm:p-2 phone:p-2 lg:w-32 md:w-28 sm:w-24 phone:w-28 shadow-slate-600 hover:shadow-slate-500 hover:bg-orange-700'> Start here</button>
      
    </div>
    <Footer/>
    </div>
  )
}
