import React from 'react'
import Footer from '../Footer/Footer'
import { useNavigate } from 'react-router-dom';
export default function Home() {
  const history=useNavigate();
  function change(){
    history("/signin");
  }
  return (
    <>
    <div className='grid items-center mt-10 text-center bg-gray-900 place-content-center h-110'>
      <div className='my-5 mt-10 text-6xl font-bold text-center text-white w-110'>Organize your work and life, finally.</div>
      <div className='mx-auto my-5 text-xl font-medium text-gray-600 w-100'>Simplify life for both you and your team. The world's #1 task manager and to-do list app.</div>
      <button onClick={change} className='w-32 p-3 mx-auto my-5 text-xl font-semibold text-white bg-orange-600 rounded-md shadow-md shadow-slate-800 hover:bg-orange-700'> Start here</button>
      
    </div>
    <Footer/>
    </>
  )
}
