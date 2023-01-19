import React, { useState, useEffect } from "react";
import { getDashboardAPI,getAllUserPolicyList } from ".././services/authentication";
import ic_file_download from "../assets/img/ic_file_download.png";
import ic_notifications from "../assets/img/ic_notifications.png";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [dashBoardListArray, setDashBoardListArray] = useState("");
  const [getAllUsersList,setgetAllUsersList]=useState('')
 const loginDetailsUserId = window.localStorage.getItem("loginDetailsUserId");
 let navigate = useNavigate();
 
  const handleDashboardApI = async () => {
    try{
    const resp = await getDashboardAPI();
    setDashBoardListArray(resp);
    //console.log("resp", resp);
    }
    
      catch (error) {
        console.log("error", error);
    }
  };
  useEffect(() => {
    handleDashboardApI();
  }, []);


  const handleGetPolicyListServiceCall = async () => {
    const data ={
      user_id:loginDetailsUserId
    }
    try {
      const resp = await getAllUserPolicyList(data);
      //console.log("resssss", resp);
      setgetAllUsersList(resp.data);
    } catch (error) {
      console.log("err", error);
    }
  };
  useEffect(() => {
    handleGetPolicyListServiceCall();
  }, []);

  return (
    <div
      id="layoutSidenav_content" className="collapse-right-pane"
      style={{ paddingLeft: "80px", marginLeft: "-75px" }}
    >
      <div className="container-fluid" id="container-fluid">
        <h3 className="mt-4 mb-4">Dashboard</h3>
        <div className="row">
          <div className="col-12 col-md-6 col-sm-6 col-lg-3 mb-2">
            <div className="card card-custom">
              <div className="row">
                <div className="col-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 text-left">
                  <p className="pl-4 pt-4">
                    Active
                    <br />
                    Policies{" "}
                  </p>
                </div>
                <div className="col-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 text-right">
                  <h3 className="pr-4 pt-4">
                    {dashBoardListArray && dashBoardListArray.data.totalPolicyCount}
                  </h3>
                  {/* {//console.log("dashBoardListArray", dashBoardListArray)} */}
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-9 col-md-9 col-sm-9 text-left">
                  <small className="pl-4 pt-0 pb-3 d-block">&nbsp;</small>
                </div>
                <div className="col-3 col-md-3 col-sm-3 text-right">
                  <a onClick={() =>navigate("paypremium")} className="pr-4 pt-0 pb-3 d-block" style={{color:"#8ec131"}}>
                    <i className="fas fa-arrow-right" ></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 col-sm-6 col-lg-3 mb-2">
            <div className="card card-custom">
              <div className="row">
                <div className="col-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 text-left">
                  <p className="pl-4 pt-4">
                    Payment
                    <br />
                    History{" "}
                  </p>
                </div>
                <div className="col-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 text-right">
                  <h3 className="pr-4 pt-4">
                    {dashBoardListArray && dashBoardListArray.data.payment}
                  </h3>
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-9 col-md-9 col-sm-9 text-left">
                  <small className="pl-4 pt-0 pb-3 d-block">&nbsp;</small>
                </div>
                <div className="col-3 col-md-3 col-sm-3 text-right">
                  <a onClick={() =>navigate("paymentHistory")} className="pr-4 pt-0 pb-3 d-block" style={{color:"#8ec131"}}>
                    <i className="fas fa-arrow-right"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 col-sm-6 col-lg-3 mb-2">
            <div className="card card-custom">
              <div className="row">
                <div className="col-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 text-left">
                  <p className="pl-4 pt-4">
                    Your
                    <br />
                    Claims{" "}
                  </p>
                </div>
                <div className="col-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 text-right">
                  <h3 className="pr-4 pt-4">
                    {dashBoardListArray && dashBoardListArray.data.numberOfClaims}
                  </h3>
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-9 col-md-9 col-sm-9 text-left">
                  <small className="pl-4 pt-0 pb-3 d-block">&nbsp;</small>
                </div>
                <div className="col-3 col-md-3 col-sm-3 text-right">
                <a onClick={() =>navigate("newClaim")} className="pr-4 pt-0 pb-3 d-block" style={{color:"#8ec131"}}>
                    <i className="fas fa-arrow-right"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 col-sm-6 col-lg-3 mb-2">
            <div className="card card-custom">
              <div className="row">
                <div className="col-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 text-left">
                  <p className="pl-4 pt-4">
                    Service
                    <br />
                    Requests{" "}
                  </p>
                </div>
                <div className="col-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 text-right">
                  <h3 className="pr-4 pt-4">
                    {dashBoardListArray &&
                      dashBoardListArray.data.totalServiceRequestCount}
                  </h3>
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-9 col-md-9 col-sm-9 text-left">
                  <small className="pl-4 pt-0 pb-3 d-block"></small>
                </div>
                <div className="col-3 col-md-3 col-sm-3 text-right">
                <a onClick={() =>navigate("servicerequest")} className="pr-4 pt-0 pb-3 d-block" style={{color:"#8ec131"}}>
                    <i className="fas fa-arrow-right"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-12 col-lg-7 mb-4">
            <div className="heading-with-box white-bg mb-1">
              <div className="row">
                <div className="col-lg-6 col-md-6 text-left">
                  <h3>My Policies </h3>
                </div>
                <div className="col-lg-6 col-md-6 text-right">
                  <a onClick={() =>navigate("paypremium")} data-toggle="modal" data-target="#addPolicyList">
                    View All
                  </a>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-lg-12 mb-4">
                <div className="table-responsive" style={{width:"100%"}}>
                  <table className="table table-bordered">
                    <thead
                      className="white-bg"
                      style={{ backgroundColor: "#8ec131" }}>
                      <tr>
                        <th>Policy Name</th>
                        <th>Policy code</th>
                        <th>Policy Type</th>
                        <th>Total Sales</th>
                      </tr>
                    </thead>
                    <tbody>
                      {getAllUsersList ? getAllUsersList.map((item) => (
                          <tr className="grey-box">
                            <td className="green-text">{item.policyName}</td>
                            <td>{item.policyCode}</td>
                            <td>{item.policyType}</td>
                            <td className="green-text">{item.totalSales}</td>
                          </tr>
                        )):null}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-5 mb-4">
            {/* <div className="green-box">
              <div className="row d-flex align-items-center justify-content-between">
                <div className="col-12 col-lg-9">
                  <label style={{ marginTop: "10px" }}>
                    {" "}
                    <img src={ic_notifications} alt="" />
                  </label>
                  <p className="bell-text">
                    Your premium payment of $ 2500 is pending for policy number
                    of <b>NS00011122</b>{" "}
                  </p>
                </div>
                <div className="col-12 col-lg-3">
                  <a href="#" className="btn btn-primary pay-now">
                    Pay Now
                  </a>
                </div>
              </div>
            </div> */}
            {/* <a onClick={() =>navigate("paypremium")} className="text-right w-100 d-block mt-2">
              View All
            </a> */}

            <div className="row d-flex align-items-center justify-content-between">
              <div className="col-12">
                <h3 className="mt-2 mb-0">Recommended for you</h3>
              </div>
            </div>
            <div className="row d-flex align-items-center justify-content-between">
              <div className="col-12 text-left">
                <ul
                  className="nav nav-tabs table-nav mt-3"
                  id="myTab"
                  role="tablist"
                >
                  <li className="nav-item" role="presentation">
                    <a
                      className="nav-link active"
                      id="recommended-policies-tab"
                      data-toggle="tab"
                      href="#recommended-policies"
                      role="tab"
                      aria-controls="recommended-policies"
                      aria-selected="true"
                    >
                      Recommended Policies
                    </a>
                  </li>
                  <li className="nav-item" role="presentation">
                    <a
                      className="nav-link"
                      id="all-policies-tab"
                      data-toggle="tab"
                      href="#all-policies"
                      role="tab"
                      aria-controls="all-policies"
                      aria-selected="false"
                    >
                      All Policies
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="tab-content table-bordered" id="myTabContent">
              <div
                className="tab-pane fade show active"
                id="recommended-policies"
                role="tabpanel"
                aria-labelledby="recommended-policies-tab"
              >
                <div className="row d-flex align-items-center justify-content-between recommended-policies-box">
                  <div className="col-12 col-lg-6">
                    <span>
                      <small>Type : Vehicle</small>
                      <br />
                      Nossa Seguros Auto-insurance
                    </span>
                  </div>
                  <div className="col-12 col-lg-6" style={{display:'flex',justifyContent:'space-evenly'}}>
                    <a href="#" className="btn btn-primary">
                      View
                    </a>
                    <a href="#" className="btn btn-secondary">
                      <img src={ic_file_download} alt="" />
                    </a>
                  </div>
                </div>
                <div className="row d-flex align-items-center justify-content-between recommended-policies-box">
                  <div className="col-12 col-lg-6">
                    <span>
                      <small>Type : Personal</small>
                      <br />
                      Nossa Seguros Acidenttes de Trabalho
                    </span>
                  </div>
                  <div className="col-12 col-lg-6"  style={{display:'flex',justifyContent:'space-evenly'}}>
                    <a href="#" className="btn btn-primary">
                      View
                    </a><br/>
                    <a href="#" className="btn btn-secondary" >
                      <img src={ic_file_download} alt="" />
                    </a>
                  </div>
                </div>
              </div>
              <div
                className="tab-pane fade"
                id="all-policies"
                role="tabpanel"
                aria-labelledby="all-policies-tab"
              >
                <div className="row d-flex align-items-center justify-content-between recommended-policies-box">
                  <div className="col-12 col-lg-6">
                    <span>
                      <small>Type : Personal</small>
                      <br />
                      Nossa Seguros Acidenttes de Trabalho
                    </span>
                  </div>
                  <div className="col-12 col-lg-6" style={{display:'flex',justifyContent:'space-evenly'}}>
                    <a href="#" className="btn btn-primary">
                      View
                    </a><br/>
                    <a href="#" className="btn btn-secondary">
                      <img src={ic_file_download} alt="" />
                    </a>
                  </div>
                </div>
                <div className="row d-flex align-items-center justify-content-between recommended-policies-box">
                  <div className="col-12 col-lg-6">
                    <span>
                      <small>Type : Vehicle</small>
                      <br />
                      Nossa Seguros Auto-insurance
                    </span>
                  </div>
                  <div className="col-12 col-lg-6" style={{display:'flex',justifyContent:'space-evenly'}}>
                    <a href="#" className="btn btn-primary">
                      View
                    </a>
                    <a href="#" className="btn btn-secondary">
                      <img src={ic_file_download} alt="" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
