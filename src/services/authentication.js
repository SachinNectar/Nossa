import { doGet, doPost, doPut,doDelete } from "../utils/request";
import { FormModel } from "../model/FormModel";
import { baseurl } from "../utils/request";
import axios from "axios"
//import { updateUserAccessInRedux } from "./../utils/index";

export const registerUser = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.post(`${baseurl}/account/userRegistration`, data, {
        headers:null,
      });
      if ([200, 201].includes(response.status)) {
        return resolve(response);
      }
      return reject(response);
    } catch (error) {
      return reject(error);
    }
  });
};

export const resetpassword = async(data) =>{
  return await doPost("account/ResetPassword",data)
}
// policy api statred
export const getPolicyList2 = async(data) =>{
  return await doGet(`policy?activeStatus=${data.activeStatus}`);
}
export const getPolicyList = async(data) =>{
  return await doGet(`policy?search=${data.search}&policyType=${data.type}&id=${data.id}&activeStatus=${data.activeStatus}`);
}
export const getAllUserPolicyList = async(data) =>{
  return await doGet(`policy/getAllUserPolicy?policy_id=${data.policy_id}&user_id=${data.user_id}&agent_id=${data.agent_id}&premiumPlan=${data.premiumPlan}&activeStatus=${data.activeStatus}`);
}
// doGet('/userPolicy', {params: objParam});
export const addPolicyList = async(data) =>{
  return await doPost("policy/add",data)
}
export const deletePolicyList = async(id) =>{
  return await doDelete(`policy/delete`,id)
}

export const editPolicyList = async(data) =>{
  return await doPut('policy/edit',data)
}

// policy api ended

//Agent api started
export const getAgentList = async(data) =>{
  return await doGet('agent');
}
export const addAgentList = async(data) =>{
  return await doPost("agent/add",data)
}
export const deleteAgentList = async(id) =>{
  return await doDelete(`agent/delete`,id)
}

export const editAgentList = async(data) =>{
  return await doPut('agent/edit',data)
}


//premium api started
export const getPremiumList = async(data) =>{
  return await doGet('premium');
}

export const Creditcardinfo = async(data) =>{
  return await doPost("premium/payPremium",data)
}

//complaint Api

export const getComplaintList = async(data) =>{
  return await doGet('complaint');
}

export const addComplaintList = async(data) =>{
  return await doPost("complaint/add",data)
}

export const deleteComplaintList = async(id) =>{
  return await doDelete(`complaint/delete`,id)
}

export const editComplaintList = async(data) =>{
  return await doPut('complaint/edit',data)
}
export const verifyComplaintList = async(data) =>{
  return await doPost("complaint/verifyRequest",data)
}

//NossaCard
export const getCardDetails = async(data) =>{
  return await doGet(`account/getUserById?user_id=${data.user_id}`);
}



//Services Api 
export const getServiceList = async() =>{
  return await doGet('servicerequest');
}

export const AddServiceList = async(data) =>{
  return await doPost("servicerequest/add",data)
}

export const verifyServiceList = async(data) =>{
  return await doPost('servicerequest/verifyRequest',data);
}


//claims
export const getAddClaim = async(data) =>{
  return await doPost('claim/add',data);
}
export const getEditClaim = async(data) =>{
  return await doPut('claim/edit',data);
}
export const getDeleteClaim = async(data) =>{
  return await doDelete('claim/delete',data);
}
//claim api
export const getClaimsList = async(data) =>{
  return await doGet(`claim?verifyStatus=${data.verifyStatus}`);
}
export const getClaimsList2 = async() =>{
  return await doGet("claim");
}



export const verifyClaimList = async(data) =>{
  return await doPost('claim/verifyRequest',data);

}

//Client API

export const getAllClientList = async(data) =>{
  return await doGet(`policy/getAllUserPolicy?agent_id=${data.agent_id}`);
}

export const getAddClient = async(data) =>{
  return await doPost('client/add',data);
}

//Holidays data

export const getHolidaysList = async(data) =>{
  return await doGet('holiday',data);
}
export const getEditHoliday= async(data) =>{
  return await doPut('holiday/edit',data);
}
export const getDeleteHoliday = async(data) =>{
  return await doDelete('holiday/delete',data);
}
export const getAddHoliday = async(data) =>{
  return await doPost('holiday/add',data);
}

export const getAddHolidays = async(data) =>{
  return await doPost('holiday/import',data);
}


//Reimbursment Api 
export const getReimbursmentList = async(data) =>{
  // return await doGet(`reimbursement?type=${data.type}&search=${data.hospitaltype}`);
  return await doGet(`reimbursement?type=${data.type}`);
}
export const getReimbursmentListSearch = async(data) =>{
  return await doGet(`reimbursement?type=${data.type}&search=${data.name}`);
}

export const getreimbursementAPI = async(data) =>{
  return await doPost('reimbursement/add',data);
}
export const getEditReimbursment= async(data) =>{
  return await doPut('reimbursement/edit',data);
}
export const getDeleteReimbursment = async(data) =>{
  return await doDelete('reimbursement/delete',data);
}

export const getDoctorsList = async(data) =>{
  return await doGet(`reimbursement/getDoctor`,data);
}
export const getEditDoctorsList= async(data) =>{
  return await doPut('reimbursement/editDoctor',data);
}
export const getDeleteDoctorsList = async(data) =>{
  return await doDelete('reimbursement/deleteDoctor',data);
}
export const getAddDoctorsList = async(data) =>{
  return await doPost('reimbursement/addDoctor',data);
}

export const getReimServicesList = async(data) =>{
  return await doGet(`reimbursement/getService`,data);
}
export const getEditServicesList= async(data) =>{
  return await doPut('reimbursement/editService',data);
}
export const getDeleteServicesList = async(data) =>{
  return await doDelete('reimbursement/deleteService',data);
}
export const getAddServicesList = async(data) =>{
  return await doPost('reimbursement/addService',data);
}

//notification
export const getNotificationService = async() =>{
  return await doGet(`notification`);
}
export const getUserNotificationService = async() =>{
  return await doGet(`notification/getUserNotification`);
}
export const getAddNotificationService = async(data) =>{
  return await doPost('notification/add',data);
}
export const getAddUserNotificationService = async(data) =>{
  return await doPost('notification/addUserNotification',data);
}

export const getEditNotificationList= async(data) =>{
  return await doPut('notification/edit',data);
}
export const getDeleteNotificationList = async(data) =>{
  return await doDelete('notification/delete',data);
}

//support
export const getSupportAPI = async(data) =>{
  return await doGet(`supports?type=${data.type}`);
}
export const getAddSupport = async(data) =>{
  return await doPost('supports/add',data);
}








export const loginUser = async (email, password,role) => {
  const data={
    userName:email,
    password,
    'role':role
  }
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.post(`${baseurl}/account/userLogin`, data, {
        headers:null,
      });
      
      if ([200, 201].includes(response.status)) {
        return resolve(response);
        
      }
      return reject(response);
    } catch (error) {
      // console.log('aut',error.response.data.message)
      return reject(error.response);
    }
  });
};

export const forgotPassword = async (email) => {
  const response = await doPost("account/forgotPassword", { email });

  return response;
};

//DashBoard API


export const getDashboardAPI = async (data) => {
  return await doGet('dashboard',data);
};

export const getDashboardChartAPI = async (data) => {
  return await doGet('dashboard/getDashboardChartData',data);
};


//  export const resetPasswordService = async (payload) => {
//    return await doPost("api/v1/auth/resetPassword", payload);
//  };

export const getChangePassword = async(data) =>{
  return await doPost('account/changePassword',data);
}

 export const resetPasswordVerification = async (verficationToken) => {
  return await doGet(`account/resetPasswordVerification/${verficationToken}`);
};

// export const getUserDetailsByToken = async () => {
//   const response = await doGet("api/v1/auth/userDetails");
//   new FormModel("userDetails")._createForm(response?.result);

//   return response;
// };
