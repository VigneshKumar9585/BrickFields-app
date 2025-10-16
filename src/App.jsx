
import './App.css'
import Dashboard from './Manger/Dashborad/Dashbord.jsx'
import Login from "./Manger/Login.jsx"
import Forgot from "./Manger/ForgotPasswored.jsx";
import Reset from "./Manger/ResetPasssword.jsx"
import Profile from "./Manger/Profile.jsx"
import NewEnqiry from "./Manger/Enquiry/NewEnqiry.jsx"
import ManageEnqiry from "./Manger/Enquiry/ManageEnquiry.jsx"
import NewTask from "./Manger/Enquiry/NewTaskDetails.jsx"
import EditProfile from "./Manger/ProfileEdit.jsx"
import ChangePasswored from "./Manger/ChangePasswored.jsx"
import AssignEdit from "./Manger/Enquiry/EditAssign.jsx";
import AddLSP from "./Manger/AddUser/AddLSP.jsx"
import ManageLSP from "./Manger/AddUser/ManageLSP.jsx"
import Report from './Manger/Report/Report.jsx'
import Inspection from './Manger/Inspection/Inspection.jsx'
import InspectionDetails from './Manger/Inspection/InspectionDetails.jsx'

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
      <Route path='/report' element={<Report/>}/>
      <Route path='/inspection' element={<Inspection/>}/>
      <Route path='/inspection-Details' element={<InspectionDetails/>}/>
    </Routes>
    </>
  )
}

export default App
