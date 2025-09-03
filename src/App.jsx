
import './App.css'
import Dashboard from './page/Dashbord'
import Login from "./page/Login.jsx"
import Forgot from "./page/ForgotPasswored.jsx";
import Reset from "./page/ResetPasssword.jsx"
import Profile from "./page/Profile.jsx"
import { Routes, Route } from "react-router-dom";

function App() {

  return (
    <>

     <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/forgot-password" element={<Forgot />} />
      <Route path="/reset-password" element={<Reset />} />
      <Route path='/dashboard' element={<Dashboard/>} />
      <Route path='/profile' element={<Profile/>}/>
    </Routes>
    </>
  )
}

export default App
