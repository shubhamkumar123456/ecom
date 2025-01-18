
import './App.css'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Navabar from './components/Navabar'
import Cart from './pages/Cart'
import { ToastContainer } from 'react-toastify';
import ViewProduct from './pages/ViewProduct'
import Signup from './pages/Signup'
import Login from './pages/Login'
import { useSelector } from 'react-redux'

function App() {
    let authStore = useSelector((state)=>state.Auth)
    console.log(authStore)
  
    let login = authStore.login
  return (
    <>
     <BrowserRouter>
    <div className='mb-[70px]'>
    <Navabar/>
    </div>
        <Routes>
            <Route path='/' element={login===true? <Home/> : <Navigate to="/login"/>}/>
            <Route path='/cart' element={login===true? <Cart/> :<Navigate to="/login"/>}/>
            <Route path='/view' element={login===true?  <ViewProduct/> : <Navigate to="/login"/>}/>
            <Route path='/register' element={ login===false?<Signup/>:<Navigate to="/"/>}/>
            <Route path='/login' element={login===false? <Login/> :<Navigate to="/"/>}/>
        </Routes>
        <ToastContainer />
     </BrowserRouter>
    </>
  )
}

export default App
