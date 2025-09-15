
import './App.css'
import Dashboard from './page/Dashbord'
import Login from "./page/Login.jsx"
import Forgot from "./page/ForgotPasswored.jsx";
import Reset from "./page/ResetPasssword.jsx"
import Profile from "./page/Profile.jsx"
import NewEnqiry from "./page/NewEnqiry.jsx"
import ManageEnqiry from "./page/ManageEnquiry.jsx"
import NewTask from "./page/NewTaskDetails.jsx"
import EditProfile from "./page/ProfileEdit.jsx"
import ChangePasswored from "./page/ChangePasswored.jsx"
import AssignEdit from "./page/EditAssign.jsx";
import AddLSP from "./page/AddLSP.jsx"
import ManageLSP from "./page/ManageLSP.jsx"


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
      <Route path='/profile/edit' element={<EditProfile/>}/>
      <Route path='/enquiry/new' element={<NewEnqiry/>}/>
      <Route path='/enquiry/manage' element={<ManageEnqiry/>}/>
      <Route path='/enquiry/new/details' element={<NewTask/>}/>
      <Route path='/change/passwored' element={<ChangePasswored/>}/>
      <Route path="/edit/assign" element={<AssignEdit />} />
      <Route path='/user/addLSP' element={<AddLSP/>} />
      <Route path='/user/manageLSP' element={<ManageLSP/>} />

    </Routes>
    </>
  )
}

export default App
