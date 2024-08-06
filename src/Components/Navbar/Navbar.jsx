import React, { useState } from 'react'
import { GiNotebook } from "react-icons/gi";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const dispatch=useDispatch();
  const isloggedIn=useSelector((state)=>state.isloggedIn);
  const history=useNavigate();
  
  function logout(){
      dispatch(authActions.logout());
      localStorage.clear("id");
      history("/");
  }
  
  return (  
    <div className='fixed top-0 left-0 flex items-center justify-between w-full h-16 px-20 bg-gray-900 shadow-md shadow-gray-800 navbar'>
      <div className='flex items-center justify-around w-32 text-orange-600 cursor-pointer nav-left hover:text-orange-700'>
      <GiNotebook className='w-8 h-8 ' />
        <Link to="/" className='text-2xl font-bold nav-title'>Todoist</Link>
      </div>
     
      <div className='flex items-center justify-between w-1/3 nav-right'>
        <Link to="/"  className='font-medium text-orange-600  cursor-pointer py-2.5 w-16 rounded-md flex justify-center text-xss nav-text hover:text-orange-500 hover:bg-slate-600 '>Home</Link>
        <Link  className='font-medium text-orange-600  cursor-pointer py-2.5 w-16 rounded-md flex justify-center text-xss nav-text hover:text-orange-500 hover:bg-slate-600' to="/about">About</Link>
        <Link  className='font-medium text-orange-600  cursor-pointer py-2.5 w-16 rounded-md flex justify-center text-xss nav-text hover:text-orange-500 hover:bg-slate-600' to="/todo">Todo</Link>
   
        {!isloggedIn && 
        <>
           <Link className='items-center justify-center w-20 py-2.5 text-center text-white bg-orange-600 rounded-md hover:bg-orange-700 text-xss' to="/signup"> Sign up</Link>
        <Link className='items-center justify-center w-20 py-2.5 text-white border-2 border-orange-600 hover:bg-orange-600 rounded-md text-xss text-center transition duration-300 ease-in-out' to="/signin"> Sign in</Link>
        </>}
        {isloggedIn && <button onClick={logout} className='items-center justify-center w-20 py-2.5 text-white bg-orange-600 hover:bg-orange-700 rounded-md text-xss text-center'>Log Out</button> }
        
      
      </div>
    </div>
  ) 
}