
import './App.css'


// Manager
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



// Tachnician
import TechnicianDashbored from "./Tachnician/Dashborad/Dasborad.jsx"
import TechnicianNewtask from "./Tachnician/Task/NewTask.jsx"
import TechnicianCurrenttask from "./Tachnician/Task/CurrentTask.jsx"
import TechnicianNewEnquiry from "./Tachnician/Enquiry/NewEnquiry.jsx"
// import TechnicianCurrentEnquiry from "./Tachnician/Enquiry/CurrentEnquiry.jsx"
import TechnicianLiveUpdate from "./Tachnician/LiveUpdate/Liveupadate.jsx"
import TechnicianInspectionGeneral from "./Tachnician/Inaspection/General.jsx"



import { Routes, Route } from "react-router-dom";

function App() {

  return (
    <>

     <Routes>

      {/* Admin */}


      {/* Manager */}
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




{/* Tachnician */}


      <Route path='/technician-new-task' element={<TechnicianNewtask/>}/>
      <Route path='/technician-current-task' element={<TechnicianCurrenttask/>}/>
      <Route path='/technician-new-enquiry' element={<TechnicianNewEnquiry/>}/>
      {/* <Route path='/technician-current-enquiry' element={<TechnicianCurrentEnquiry/>}/> */}
      <Route path='/technician-Dashboard' element={<TechnicianDashbored/>}/>
      <Route path='/technician-live-update' element={<TechnicianLiveUpdate/>}/>
      <Route path='/technician-inspection-general' element={<TechnicianInspectionGeneral/>}/>


      


    </Routes>
    </>
  )
}

export default App
