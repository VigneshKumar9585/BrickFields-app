
import './App.css'
// Admin

import AdminDashboared from "./Admin/Dashbored/Dashbored.jsx"
import MasterSetting from "./Admin/Masters/Setting.jsx"
import MasterCountry from "./Admin/Masters/Country.jsx"
import MasterState from "./Admin/Masters/State.jsx"
import MasterRegion from './Admin/Masters/Region.jsx'
import MasterDistrict from './Admin/Masters/District.jsx'
import MasterChecklist from './Admin/Masters/Checklist.jsx'
import MasterCategory from './Admin/Masters/Category.jsx'
import AdminInspection from "./Admin/Inspection/inspection.jsx"
import AdminInspectionDetails from "./Admin/Inspection/inspectionDetails.jsx"
import AdminPrfile from "./Admin/Dashbored/profile.jsx"
import AdminReport from "./Admin/Report/Report.jsx"


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
import TechnicianLiveUpdate from "./Tachnician/LiveUpdate/Liveupadate.jsx"
import TechnicianInspectionGeneral from "./Tachnician/Inaspection/General.jsx"
import TechnicianInspectionCheacklist from "./Tachnician/Inaspection/CheakList.jsx"
// import TechnicianCurrentEnquiry from "./Tachnician/Enquiry/CurrentEnquiry.jsx"



// LSP
import LspDashboard from "./LSP/Dashborad/Dashboard.jsx"
import LspReport from "./LSP/Report/Report.jsx"
import LspAddLsp from "./LSP/AddUser/AddLsp.jsx"
import LspManageLsp from "./LSP/AddUser/ManageLSP.jsx"
import LspNewEnquiry from "./LSP/Enquiry/NewEnquiry.jsx"
import LspManageEnquiry from "./LSP/Enquiry/MangeEnquiry.jsx"
import LspNewEditAssgin from "./LSP/Enquiry/NewTaskDetails.jsx"
// import LspEditAssign from "./LSP/Enquiry/EditAssign.jsx";


import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <><Routes>





      {/* Admin */}
      <Route path="/admin-Dashboard" element={<AdminDashboared />} />
      <Route path="/master/setting" element={<MasterSetting />} />
      <Route path="/master/country" element={<MasterCountry />} />
      <Route path="/master/state" element={<MasterState />} />
      <Route path='/master/region' element={<MasterRegion/>} />
      <Route path='/master/district' element={<MasterDistrict/>} />
      <Route path='/master/checklist' element={<MasterChecklist/>} />
      <Route path='/master/category' element={<MasterCategory/>} />
      <Route path='/admin-inspection' element={<AdminInspection/>} />
      <Route path="/admin-inspection-Details" element={<AdminInspectionDetails/>} />
      <Route path='/admin-profile' element={<AdminPrfile/>} />
      <Route path='/admin-report' element={<AdminReport/>} />
      

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
      <Route path='/technician-Dashboard' element={<TechnicianDashbored/>}/>
      <Route path='/technician-live-update' element={<TechnicianLiveUpdate/>}/>
      <Route path='/technician-inspection-general' element={<TechnicianInspectionGeneral/>}/>
      <Route path='/technician-inspection-cheaklist' element={<TechnicianInspectionCheacklist/>}/>
      {/* <Route path='/technician-current-enquiry' element={<TechnicianCurrentEnquiry/>}/> */}


    {/* LSP */}
      <Route path='/lsp-Dashboard' element={<LspDashboard/>}/>
      <Route path='/lsp-report' element={<LspReport/>}/>
      <Route path='/lsp-addLSP' element={<LspAddLsp/>}/>
      <Route path='/lsp-manageLSP' element={<LspManageLsp/>}/>
      <Route path='/lsp-new-enquiry' element={<LspNewEnquiry/>}/>
      <Route path='/lsp-manage-enquiry' element={<LspManageEnquiry/>}/>
      <Route path='/lsp-new-edit-assgin' element={<LspNewEditAssgin/>}></Route>
      {/* <Route path='/lsp-edit' element={<AddLsp />} /> */}


     


      


    </Routes>
    </>
  )
}

export default App
