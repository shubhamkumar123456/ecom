
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Navabar from './components/Navabar'
import Cart from './pages/Cart'
import { ToastContainer } from 'react-toastify';
import ViewProduct from './pages/ViewProduct'
import Signup from './pages/Signup'
import Login from './pages/Login'

function App() {
  
  
  return (
    <>
     <BrowserRouter>
    <div className='mb-[70px]'>
    <Navabar/>
    </div>
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/cart' element={<Cart/>}/>
            <Route path='/view' element={<ViewProduct/>}/>
            <Route path='/register' element={<Signup/>}/>
            <Route path='/login' element={<Login/>}/>
        </Routes>
        <ToastContainer />
     </BrowserRouter>
    </>
  )
}

export default App
