
import './App.css'
import Login from "./page/Login.jsx"
import Forgot from "./page/ForgotPasswored.jsx";
import Reset from "./page/ResetPasssword.jsx"
import { Routes, Route } from "react-router-dom";

function App() {

  return (
    <>
     <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/forgot-password" element={<Forgot />} />
      <Route path="/reset-password" element={<Reset />} />
    </Routes>
    </>
  )
}

export default App
