import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
//import Mainpage from "./landingPage/Mainpage"
// import Help from './landingPage/Help&support';
// import Paypremium from "./landingPage/Paypremium"
import Login from "./Authentication/Login";
import CreateAccount from "./Authentication/CreateAccount";
import Dashboard from "../src/user/Dashboard";
import Noosa from "./user/noosa";
import Hrnoosa from "../src/Hr/Hrnoosa";
import Adminnoosa from "../src/Admin/Adminnoosa";
import ForgetPass from "./Authentication/ForgotPassword";
import ResetAccountCode from "./Authentication/ResetAccountCode";
import ListedPolocies from "./Admin/Listed polices/listedpolocies";
import PageNotFound from "./PageNotFound";
import Claims from "./user/Claims/claims";
import Paypremium from "./user/Paypremium/Paypremium";
import Complaint from "./user/Complaints/Complaint";
import NossaCard from "./user/NossaCard/NossaCard";
import UserServices from "./user/UserServices/UserServices";
import Reimbusrment from "./user/Reimbursment/Reimbursment";
import Hrlisted from "./Hr/Listedpolices/Hrlistedpolices";
import HrRecievedClaims from "./Hr/HrClaims/HrRecievedClaims";
import HrComplaint from "./Hr/Complaints/HrComplaint";
import HrServices from "./Hr/Services/Hrservice"
import Receivedpremium from "./Hr/HrRecievedPremium";
import Client from "./Hr/Client/Client";
import AdDashboard from "./Admin/AdminDashboard";
import AdminClaims from "./Admin/Claims/AdminClaims";
import AdReceivedpremium from "./Admin/Premium/Receivedpremium";
import AdServices from "./Admin/services/AdServiceReq";
import HrList from "./Admin/Hr list/Hrlist";
import AdListedPolocies from "./Admin/Listed polices/listedpolocies";
import AdminComplaint from  "./Admin/complaints/AdminComplaint"
import HrReimbursment from "./Hr/Client/Reimbursment/HrReimbursment";
import AdReimbursment from "./Admin/Reimbursment/AdReimbursment";
import AdHolidays from "./Admin/Holiday/Holidays";
import HrHolidays from "./Hr/HrHolidays";
import UserHolidays from "./user/UserHolidays";
import Setting from "./user/settings/Setting"
import HelpAndSupport from "./user/HelpAndSupport";
import AdSetting from "./Admin/settings/Adsettings";
import AdHelpAndSupport from "./Admin/AdHelp&&support/Help&support";
import HrSetting from "./Hr/settings/HrSettings";
import HrHelp from "./Hr/settings/HrHelp&support/HrHelp&Support";
import HrDashboard2 from "./Hr/HrDashBoard2";
import Payment from "./user/Paypremium/paymentHistory"
import Doctors from "./Admin/Reimbursment/Doctors";
import Services from "./Admin/Reimbursment/Services";
import Demo from "./user/demo";
import AdDemo from "./Admin/AdDemo";
import HrDemo from "./Hr/HrDemo";

function App() {
  return (
    <div>
      {/* <h1>data</h1> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}/>
          <Route path="/login" element={<Login />}/>
            <Route path="signup" element={<CreateAccount />} />
            <Route path="forgetPassword" element={<ForgetPass />} />
            <Route path="resetpassword/:token" element={<ResetAccountCode />} />
         
          <Route path="/user" element={<Noosa />}>
            <Route path="" element={<Dashboard />} />
            <Route path="newClaim" element={<Claims />} />
            <Route path="paypremium" element={<Paypremium />} />
            <Route path="paymentHistory" element={<Payment/>}/>
            <Route path="noosacard" element={<NossaCard />} />
            <Route path="complaint" element={<Complaint />} />
            <Route path="servicerequest" element={<UserServices />} />
            <Route path="holidays" element={<UserHolidays />} />
            <Route path="reimbursement" element={<Reimbusrment />} />
            <Route path="setting" element={<Setting />}/>
            <Route path="helpandsupport" element={<HelpAndSupport />} />
            <Route path="Demo" element={<Demo/>} />

          </Route>

          {/* HrNossa paths */}

          <Route path="/am" element={<Hrnoosa />}>
            {/* <Route path="hr" element={<Hrnoosa />} /> */}
            <Route path="" element={<HrDashboard2/>} />
            <Route path="listedPolices" element={<Hrlisted />} />
            <Route path="newClaim" element={<HrRecievedClaims />} />
            <Route path="paypremium" element={<Receivedpremium />} />
            <Route path="noosacard" element={<NossaCard />} />
            <Route path="complaint" element={<HrComplaint />} />
            <Route path="servicerequest" element={<HrServices />} />
            <Route path="client" element={<Client />} />
            <Route path="holidays" element={<HrHolidays />} />
            <Route path="reimbursement" element={<HrReimbursment />} />
            <Route path="setting"  element={<HrSetting />} />
            <Route path="helpandsupport" element={<HrHelp />} />
            <Route path="Demo" element={<HrDemo/>} />
          </Route>

          <Route path="/admin" element={<Adminnoosa />}>
            <Route path="" element={<AdDashboard />} />
            <Route path="listedPolices" element={<AdListedPolocies />} />
            <Route path="newClaim" element={<AdminClaims />} />
            <Route path="paypremium" element={<AdReceivedpremium />} />
            <Route path="HrList" element={<HrList />} />
            <Route path="complaint" element={<AdminComplaint />} />
            <Route path="servicerequest" element={<AdServices />} />
            <Route path="holidays" element={<AdHolidays />} /> 
            <Route path="reimbursement" element={<AdReimbursment />}/>
            <Route path="reimbursement/doctors" element={<Doctors/>}/>
            <Route path="reimbursement/service" element={<Services/>}/>
            <Route path="setting" element={<AdSetting/>} />
            <Route path="helpandsupport" element={<AdHelpAndSupport/>}/>
            <Route path="AdDemo" element={<AdDemo/>} />
            



            {/* passwordRoutes */}

            <Route path="listedpolocies" element={<ListedPolocies />} />
            <Route path=":/pagename" element={<PageNotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
