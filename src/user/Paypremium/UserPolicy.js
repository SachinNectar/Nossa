import React, { useState } from "react";
import "./UserPolicy.style.css";
import CreditCard from "./Creditcard";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";
import CloseModal from "./CloseModal"

const UserPolicy = (props) => {
  const selectedRecord = props && props.selectedRecord;
  const alldata = props && props.data;
  const status = props && props.status;
  const policyList =
    alldata && alldata.data.filter((data) => data.id === selectedRecord.key)[0];
  const [policyDetailsPage, setpolicyDetailsPage] = useState(true);
  const [paymentPage, setpaymentPage] = useState(false);
  const[CloseModalpage,setCloseModalpage]=useState(false)
  let navigate = useNavigate();

  const handleBack = () => {
    props.handleBacktoActivePage();
  };
  const handlePayment = () => {
    setpolicyDetailsPage(false);
    setpaymentPage(true);
  };
const handleClosePolicy = ()=>{
     setCloseModalpage(true);
     setpolicyDetailsPage(false)
  }

  const handleCloseBack = () =>{
    setCloseModalpage(false);
    setpolicyDetailsPage(true)
  }
  const handleClaimRequest = () => {
    window.location.href ="NewClaim"
  };
  const handleBackToUserPolicy = () => {
    setpolicyDetailsPage(true);
    setpaymentPage(false);
  };
  return (
    <>
      {policyDetailsPage && (
       <div className="container">
            <div className="ant-col ant-col-xs-24 ant-col-lg-8" style={{marginTop:"20px"}} >
            <a
              style={{
                marginTop: "30px",
                marginBottom: "30px",
                fontSize: "20px",
              }}
              onClick={() => handleBack()}
            >
              <ArrowLeftOutlined style={{ paddingTop: "10px",paddingBottom:"20px" }} /> BACK
            </a>
          </div>

          <div className="row d-flex align-items-center justify-content-between">
            <div className="col-12">
              <div className="heading-with-box">
                <div className="row">
                  <div className="col-lg-6 col-md-6 text-left">
                    <h3>
                      Policies No. :{" "}
                      <span className="color-green">
                        {policyList && policyList.policy.policyCode}
                      </span>
                    </h3>
                  </div>

                  <div className="col-lg-6 col-md-6 text-right">
                    <a
                      href=""
                      className="danger-color"
                      data-toggle="modal"
                      data-target="#addPolicyList"
                    >
                      Status: Premium Due
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="policy-box">
            <div className="row">
              <div className="col-12">
                <div className="table-data">
                  <span>Policy Holder Name</span>
                  <b>
                    {policyList && policyList.user.firstName}{" "}
                    {policyList && policyList.user.lastName}
                  </b>
                </div>
              </div>
              <div className="clearfix"></div>
              <div className="col-12 col-md-3 col-sm-3">
                <div className="table-data">
                  <span>Policy</span>
                  <b>{policyList && policyList.policy.policyName}</b>
                </div>
              </div>
              <div className="col-12 col-md-3 col-sm-3">
                <div className="table-data">
                  <span>Policy Type</span>
                  <b>{policyList && policyList.policy.policyType}</b>
                </div>
              </div>
              <div className="col-12 col-md-3 col-sm-3">
                <div className="table-data">
                  <span>Policy Start date</span>
                  <b>{policyList && policyList.createdAt}</b>
                </div>
              </div>
              <div className="col-12 col-md-3 col-sm-3">
                <div className="table-data">
                  <span>Maturity date</span>
                  <b>{policyList && policyList.policyMaturityDate}</b>
                </div>
              </div>
              <div className="clearfix"></div>
              <div className="col-12 col-md-3 col-sm-3">
                <div className="table-data">
                  <span>Premium plan</span>
                  <b>{policyList && policyList.premiumPlan}</b>
                </div>
              </div>
              <div className="col-12 col-md-3 col-sm-3">
                <div className="table-data">
                  <span>Premium</span>
                  <b>{policyList && policyList.premiumAmount}</b>
                </div>
              </div>
              <div className="col-12 col-md-3 col-sm-3">
                <div className="table-data">
                  <span>Premium Due date</span>
                  <b>{policyList && policyList.updatedAt}</b>
                </div>
              </div>
              <div className="col-12 col-md-3 col-sm-3">
                <div className="table-data">&nbsp;</div>
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-md-10">
                <div className="table-data">
                  <span>Details</span>
                  <p>{policyList && policyList.policy.description}</p>
                  <a
                    data-toggle="collapse"
                    href=""
                    role="button"
                    aria-expanded="false"
                    aria-controls="collapseExample"
                  >
                    see more
                  </a>
                  {/* <div className="collapse" id="collapseExample">
                                            <p className="mt-2">
                                            {policyList && policyList.policy.policyCode}
                                            </p>
                                        </div> */}
                </div>
              </div>
            </div>
            <div>
              {status && (
                <div
                  className="row"
                  style={{ display: "flex", flexDirection: "row" }}
                >
                  {" "}
                  {/* <div className="col-12 col-md-2">
                    <a
                      onClick={() =>handleClosePolicy()}
                      className="btn-close"
                    >
                      Close Policy
                    </a>
                  </div> */}
               
                  <div className="col-12 col-md-2">
                    <a
                    
                      className="btn-close premium-btn"
                      onClick={() => handlePayment()}
                    >
                      Pay Premium
                    </a>
                  </div>
                  <div className="col-12 col-md-2">
                    <a
                      
                      className="btn-close claim-btn"
                      onClick={() => handleClaimRequest()}
                    >
                      ClaimRequest
                    </a>
                  </div>
                </div>
              )}
              {/* {!status && (
                <div className="col-12 col-md-2">
                  <a
                    
                    className="btn-close renew-btn"
                  >
                    Renew Policy
                  </a>
                </div>
              )} */}
            </div>
          </div>

          <footer className="py-4 bg-light mt-auto">
            <div className="container-fluid">
              <div className="d-flex align-items-center justify-content-between small">
                <div className="text-muted">Copyright © Nossa 2020</div>
                <div>
                  <a href="#">
                    Privacy Policy
                  </a>
                  ·
                  <a href="#">
                    Terms &amp; Conditions
                  </a>
                </div>
              </div>
            </div>
          </footer>

  
        </div>
      )}
      {paymentPage && (
        <CreditCard
          selectedRecord={selectedRecord}
          handleBackToUserPolicy={handleBackToUserPolicy}
        />
      )}

      {CloseModalpage && <CloseModal handleBack={()=>handleCloseBack()}/>}
    </>
  );
};
export default UserPolicy;
