import {BrowserRouter as  Router, Routes,Route} from 'react-router-dom'
import './App.css'
import About from './Components/About/About'
import Footer from './Components/Footer/Footer'
import Home from './Components/Home/Home'
import Navbar from './Components/Navbar/Navbar'
import Signup from './Components/Signup/Signup'
import Signin from './Components/Signup/Signin'
import Todo from './Components/Todo/Todo'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { authActions } from './store'

function App() {
  const dispatch=useDispatch();
  useEffect(()=>{
    const id=localStorage.getItem("id");
    if(id){
      dispatch(authActions.login());
    }
    
  },[]);
   
  
  return (
   
      <div className='w-full h-screen bg-gray-900'>
        <Router>
          <Navbar/>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/about' element={<About />} />
            <Route path='/signup' element={<Signup/>}/>
            <Route path='/signin' element={<Signin/>}/>
            <Route path='/todo' element={<Todo/>}/>
          </Routes>
          </Router>
        
      </div>
  )
}

export default App
