import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { verifyServiceList } from "../../services/authentication";
import { Breadcrumb } from "antd";

const ServiceDetails = (props) => {
  const SelectedRecord = props && props.selectedRecord;
  const alldata = props && props.data;
  const status = props && props.status;
  console.log("data", alldata);
  console.log("selected", SelectedRecord);
  const ServiceData =
    alldata &&
    alldata.filter((data) => data.serviceCode === SelectedRecord.serviceid)[0];
  console.log("record", ServiceData);
  //   const [policyDetailsPage, setpolicyDetailsPage] = useState(true);
  //   const [paymentPage, setpaymentPage] = useState(false);
  const[color,setcolor] = useState()
  let navigate = useNavigate();

  
    // if(ServiceData && ServiceData.priorityStatus === "Low")
    // {
    //   setcolor("yellow")
    // }
    // else if(ServiceData && ServiceData.priorityStatus === "Medium")
    // {
    //   setcolor('#8ec131')
    // }
    // else(ServiceData && ServiceData.priorityStatus === "High")
    // {
    //   setcolor("red")
    // }
  

  const handleverifyAPI = async (verifyStatus) => {
    const data = {
      id: ServiceData.id,
      verifyStatus: verifyStatus,
      priorityStatus: ServiceData.priorityStatus,
    };
    try {
      const resp = await verifyServiceList(data);
      console.log("respppp", resp);
      handlesubmit();
      // handleCancel();
    } catch (error) {
      console.log("error", error);
    }
  };

  const handlesubmit = () => {
    props.handlesubmit();
  };

  
  return (
    <>
      <div className="container-fluid">
        <Breadcrumb style={{ marginTop: "20px" }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Service</Breadcrumb.Item>
          <Breadcrumb.Item>Service Details</Breadcrumb.Item>
        </Breadcrumb>

        <div>
          <div>
            <a
              style={{
                marginTop: "30px",
                marginBottom: "30px",
                fontSize: "20px",
              }}
              onClick={() => props.handleBack()}
            >
              <ArrowLeftOutlined style={{ marginBottom: "10px" }} /> BACK
            </a>
          </div>

          <div className="row d-flex align-items-center justify-content-between">
            <div className="col-12">
              <div className="heading-with-box">
                <div className="row">
                  <div className="col-lg-6 col-md-6 text-left">
                    <h4>
                      service Request ID. :{" "}
                      <span className="color-green">
                        {ServiceData && ServiceData.serviceCode}
                      </span>
                    </h4>
                  </div>

                  <div className="col-lg-6 col-md-6 text-right">    
                     <button style={{backgroundColor:(ServiceData && ServiceData.priorityStatus === "High") ? "red"
                     :(ServiceData && ServiceData.priorityStatus === "Low") ? "yellow" :"#8ec131",borderRadius:"5px"}}>
                        <b>{ServiceData && ServiceData.priorityStatus}</b>
                      </button>
                  
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="policy-box">
            <div className="row">
              <div className="col-12 col-md-3 col-sm-3">
                <div className="table-data">
                  <span>Requested BY</span>
                  <b>
                    {ServiceData && ServiceData.userPolicy.user.firstName}
                    {/* {ServiceData && ServiceData.userPolicy.user.lastName} */}
                  </b>
                </div>
              </div>
              <div className="clearfix"></div>
              <div className="col-12 col-md-3 col-sm-3">
                <div className="table-data">
                  <span>Assigned to</span>
                  <b>{ServiceData && ServiceData.userPolicy.agent.firstName}</b>
                </div>
              </div>
              <div className="col-12 col-md-3 col-sm-3">
                <div className="table-data">
                  <span>Requested Date</span>
                  <b>{ServiceData && ServiceData.date}</b>
                </div>
              </div>
              {/* <div atyle={{ display: "flex", flexDirection: "row" }}> */}
                <div className="col-12 col-md-3 col-sm-3">
                  <div className="table-data">
                    <span>policy</span>
                    <b>
                      {ServiceData && ServiceData.userPolicy.policy.policyName}
                    </b>
                  </div>
                </div>
                <div className="col-12 col-md-3 col-sm-3">
                  <div className="table-data">
                    <span>Policy Type</span>
                    <b>
                      {ServiceData && ServiceData.userPolicy.policy.policyType}
                    </b>
                  </div>
                </div>
                <div className="clearfix"></div>
                <div className="col-12 col-md-3 col-sm-3">
                  <div className="table-data">
                    <span>Policy No</span>
                    <b>
                      {ServiceData && ServiceData.userPolicy.policy.policyCode}
                    </b>
                  </div>
                </div>
              {/* </div> */}
              {/* <div className="col-12 col-md-3 col-sm-3">
                          <div className="table-data">
                            <span>Premium</span>
                            <b>{policyList && policyList.premiumAmount}</b>
                          </div>
                        </div> */}
              <div className="col-12 col-md-3 col-sm-3">
                <div className="table-data">
                  <span>Requested For</span>
                  <b>{ServiceData && ServiceData.requested}</b>
                </div>
              </div>
              <div className="col-12 col-md-3 col-sm-3">
                <div className="table-data">&nbsp;</div>
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-md-10">
                <div className="table-data">
                  <span>Description</span>
                  <p>{ServiceData && ServiceData.description}</p>
                  <a
                    data-toggle="collapse"
                    href="file:///D:/ReactNasso/nasso/src/user/Paypremium/User-Policy-details.js.html#collapseExample"
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
              {/* {status && ( */}
              <div
                className="row"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  padding: "50px",
                  justifyContent: "space-between",
                }}
              >
                {" "}
                <div className="col-12 col-md-3">
                  <a
                    
                    className="btn-close"
                    onClick={() => handleverifyAPI("Denied")}
                  >
                    Denied Request
                  </a>
                </div>
                {/* <div className="col-12 col-md-2">
                                //     <a href="file:///D:/ReactNasso/nasso/src/user/Paypremium/User-Policy-details.js.html#" className="btn-close renew-btn">Renew Policy</a>
                                // </div> */}
                <div className="col-12 col-md-3">
                  <a
                    className="btn-close premium-btn"
                    onClick={() => handleverifyAPI("Approved")}
                  >
                    Approve
                  </a>
                </div>
                {/* <div className="col-12 col-md-3">
                              <a
                                href="file:///D:/ReactNasso/nasso/src/user/Paypremium/User-Policy-details.js.html#"
                                className="btn-close claim-btn"
                                // onClick={() => handleClaimRequest()}
                              >
                                Assign Request
                              </a>
                            </div> */}
              </div>
              {/* )} */}
              {/* {!status && ( */}
              {/* <div className="col-12 col-md-3">
                            <a
                              href="file:///D:/ReactNasso/nasso/src/user/Paypremium/User-Policy-details.js.html#"
                              className="btn-close renew-btn"
                            >
                              Renew Policy
                            </a>
                          </div> */}
              {/* )} */}
            </div>
          </div>
        </div>

        <footer className="py-4 bg-light mt-auto">
          <div className="container-fluid">
            <div className="d-flex align-items-center justify-content-between small">
              <div className="text-muted">Copyright © Nossa 2020</div>
              <div>
                <a href="file:///D:/ReactNasso/nasso/src/user/Paypremium/User-Policy-details.js.html#">
                  Privacy Policy
                </a>
                ·
                <a href="file:///D:/ReactNasso/nasso/src/user/Paypremium/User-Policy-details.js.html#">
                  Terms &amp; Conditions
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
      </>
      
    
  );
};
export default ServiceDetails;
