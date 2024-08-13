import React from 'react';
import { GiNotebook } from "react-icons/gi";
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../../store';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const dispatch = useDispatch();
  const isloggedIn = useSelector((state) => state.isloggedIn);
  const history = useNavigate();

  function logout() {
    dispatch(authActions.logout());
    localStorage.clear("id");
    history("/");
  }

  return (
    <div className='fixed top-0 left-0 flex items-center justify-between w-full bg-gray-900 shadow-md lg:px-20 md:px-16 sm:px-12 phone:px-4 lg:h-14 md:h-12 sm:h-12 phone:h-12 shadow-gray-800 navbar'>
      <Link to="/" className='flex items-center justify-around text-orange-600 cursor-pointer lg:w-32 md:w-28 sm:w-24 phone:w-20 hover:text-orange-700'>
        <GiNotebook className='lg:h-8 md:h-8 sm:h-7 phone:h-6 lg:w-8 md:w-8 sm:w-7 phone:w-6' />
        <div className='font-bold lg:text-2xl md:text-xl sm:text-lg phone:text-lg'>Todoist</div>
      </Link>

      <div className='flex items-center justify-between lg:w-1/3 md:w-1/2 nav-right'>
        <Link to="/" className='font-medium text-orange-600 cursor-pointer py-2.5 lg:w-16 md:w-16 sm:w-20 phone:w-10 rounded-md flex justify-center lg:text-base md:text-sm sm:text-sm phone:text-xs hover:text-orange-500 hover:bg-slate-600'>
          Home
        </Link>
        <Link to="/about" className='font-medium text-orange-600 cursor-pointer py-2.5 lg:w-16 md:w-16 sm:w-20 phone:w-10 rounded-md flex justify-center lg:text-base md:text-sm sm:text-sm phone:text-xs hover:text-orange-500 hover:bg-slate-600'>
          About
        </Link>
        <Link to="/todo" className='font-medium text-orange-600 cursor-pointer py-2.5 lg:w-16 md:w-16 sm:w-20 phone:w-10 rounded-md flex justify-center lg:text-base md:text-sm sm:text-sm phone:text-xs hover:text-orange-500 hover:bg-slate-600'>
          Todo
        </Link>

        {!isloggedIn && (
          <Link className='flex items-center justify-center lg:w-20 sm:w-16 phone:w-14 py-2.5 sm:py-1.5 phone:py-1 text-white bg-orange-600 hover:bg-orange-700 rounded-md lg:text-base md:text-sm sm:text-xs phone:text-xs' to="/signin">
            Sign in
          </Link>
        )}

        {isloggedIn && (
          <button onClick={logout} className='flex items-center justify-center lg:w-20 sm:w-16 phone:w-14 py-2.5 sm:py-1.5 phone:py-1 text-white bg-orange-600 hover:bg-orange-700 rounded-md lg:text-base md:text-sm sm:text-xs phone:text-xs'>
            Log Out
          </button>
        )}
      </div>
    </div>
  );
}
