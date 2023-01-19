import React, { useEffect, useState } from "react";
import { getDashboardAPI } from ".././services/authentication";
import LineGraph from "../components/atoms/LineGraph";
import { useNavigate } from "react-router-dom";

const AdDashboard = () => {
  const [dashBoardListArray, setDashBoardListArray] = useState("");
  let navigate = useNavigate();

  const handleDashboardApI = async () => {
    const resp = await getDashboardAPI();
    setDashBoardListArray(resp);
    console.log("resp", resp);
  };
  useEffect(() => {
    console.log("cdb", dashBoardListArray);
    handleDashboardApI();
  }, []);

  return (
    <div className="sb-nav-fixed bg-light">
    <div id="layoutSidenavContent">
      <div className="container-fluid">
        <h3 className="mt-4 mb-4">Dashboard</h3>
        <div className="row">
          <div className="col-12 col-md-6 col-sm-6 col-lg-3 mb-2">
            <div className="card card-custom">
              <div className="row">
                <div className="col-6 col-md-6 col-sm-6 text-left">
                  <p className="pl-4 pt-4">
                    <strong>Policies</strong>
                    <br />
                    <strong>Sales</strong>{" "}
                  </p>
                </div>
                <div className="col-6 col-md-6 col-sm-6 text-right">
                  <h5 className="pr-4 pt-4">
                    {dashBoardListArray && dashBoardListArray.data.totalPolicy}
                  </h5>
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-9 col-md-9 col-sm-9 text-left">
                  <small className="pl-4 pt-0 pb-3 d-block">
                  Month:  {dashBoardListArray && dashBoardListArray.data.month}
                  </small>
                </div>
                <div className="col-3 col-md-3 col-sm-3 text-right">
                  <a onClick={() =>navigate("listedPolices")} className="pr-4 pt-0 pb-3 d-block" style={{color:"#8ec131"}}>
                    <i className="fas fa-arrow-right"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 col-sm-6 col-lg-3 mb-2">
            <div className="card card-custom">
              <div className="row">
                <div className="col-6 col-md-6 col-sm-6 text-left">
                  <p className="pl-4 pt-4">
                    <strong>Claims</strong>
                    <br />
                    <strong>Received</strong>
                  </p>
                </div>
                <div className="col-6 col-md-6 col-sm-6 text-right">
                  <h5 className="pr-4 pt-4">
                    {dashBoardListArray && dashBoardListArray.data.totalClaims}
                  </h5>
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-9 col-md-9 col-sm-9 text-left">
                  <small className="pl-4 pt-0 pb-3 d-block">
                    Month:{dashBoardListArray && dashBoardListArray.data.createdAt}
                  </small>
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
                <div className="col-6 col-md-6 col-sm-6 text-left">
                  <p className="pl-4 pt-4">
                    <strong>Claim</strong>
                    <br />
                    <strong>Settled</strong>{" "}
                  </p>
                </div>
                <div className="col-6 col-md-6 col-sm-6 text-right">
                  <h5 className="pr-4 pt-4">
                    {dashBoardListArray &&
                      dashBoardListArray.data.totalClaimSettled}
                  </h5>
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-9 col-md-9 col-sm-9 text-left">
                  <small className="pl-4 pt-0 pb-3 d-block">
                    Month:{dashBoardListArray && dashBoardListArray.data.createdAt}
                  </small>
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
                <div className="col-6 col-md-6 col-sm-6 text-left">
                  <p className="pl-4 pt-4">
                    <strong>Service</strong>
                    <br />
                    <strong>Requests</strong>{" "}
                  </p>
                </div>
                <div className="col-6 col-md-6 col-sm-6 text-right">
                  <h5 className="pr-4 pt-4">
                    {dashBoardListArray &&
                      dashBoardListArray.data.totalServiceRequest}
                  </h5>
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-9 col-md-9 col-sm-9 text-left">
                  <small className="pl-4 pt-0 pb-3 d-block">
                   Month: {dashBoardListArray && dashBoardListArray.data.createdAt}
                  </small>
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

        <div className="home-faq-custom">
          <div className="accordion" id="faq">
            <div className="row" style={{paddingTop:"10px"}}>
              <div className="col-12 col-md-6 col-sm-6 col-lg-3 mb-4">
                <div
                  className="card card-custom"
                  style={{ background: "#FFACAC" }}
                >
                  <div className="row">
                    <div className="col-6 col-md-6 col-sm-6 text-left">
                      <p className="pl-4 pt-4">
                        <strong>Complaint</strong>
                        <br />
                        <strong>Received</strong>{" "}
                      </p>
                    </div>
                    <div className="col-6 col-md-6 col-sm-6 text-right">
                      <h5 className="pr-4 pt-4" style={{ color: "#3D3D3D" }}>
                        {dashBoardListArray &&
                          dashBoardListArray.data.totalComplaints}
                      </h5>
                      <div
                        className="col-3 col-md-3 col-sm-3 text-right"
                        style={{ margin: "auto", paddingLeft: "30px" }}
                      >
                        <a onClick={() =>navigate("complaint")} className="pr-4 pt-0 pb-3 d-block" style={{color:"white"}}>
                          <i className="fas fa-arrow-right"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="card">
                    <div
                      className="card-header"
                      id="faqhead1"
                      style={{ background: "#FFACAC" }}
                    >
                      <a
                        href=""
                        className="btn btn-header-link"
                        data-toggle="collapse"
                        data-target="#faq1"
                        aria-expanded="true"
                        aria-controls="faq1"
                        
                      >
                        <i className="fas fa-arrow-down"></i>
                        {/* {dashBoardListArray &&
                          dashBoardListArray.data.totalPolicy} */}
                      </a>
                    </div>

                    <div
                      id="faq1"
                      className="collapse show"
                      aria-labelledby="faqhead1"
                      data-parent="#faq"
                    >
                      <div className="card-body form-custom pt-2 pb-0">
                        <div className="row mb-3">
                          <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                            <small className="w-100 d-block mb-2">
                              Resolved Complaints{" "}
                              <span className="green-text float-right font-weight-bold">
                                {dashBoardListArray &&
                                  dashBoardListArray.data
                                    .totalResolvedComplaints}
                              </span>
                            </small>
                            <small className="w-100 d-block">
                              Open Complaints{" "}
                              <span className="text-black float-right font-weight-bold">
                                {dashBoardListArray &&
                                  dashBoardListArray.data.totalOpenComplaints}
                              </span>
                            </small>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-6 col-sm-6 col-lg-3 mb-4">
                <div
                  className="card card-custom"
                  style={{ background: "#8EC131" }}
                >
                  <div className="row">
                    <div className="col-6 col-md-6 col-sm-6 text-left">
                      <p className="pl-4 pt-4 ">
                        <strong>Premium</strong>
                        <br />
                        <strong>Received</strong>{" "}
                      </p>
                    </div>
                    <div className="col-6 col-md-6 col-sm-6 text-right">
                      <h5 className="pr-4 pt-4 ">
                        {dashBoardListArray &&
                          dashBoardListArray.data.totalAmount}
                      </h5>
                      <div
                        className="col-3 col-md-3 col-sm-3 text-right"
                        style={{ margin: "auto", paddingLeft: "30px" }}
                      >
                        <a onClick={() =>navigate("paypremium")} className="pr-4 pt-0 pb-3 d-block" style={{color:"white"}}>
                          <i className="fas fa-arrow-right"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="card">
                    <div
                      className="card-header"
                      id="faqhead2"
                      style={{ background: "#8EC131" }}
                    >
                      <a
                        href="#"
                        className="btn btn-header-link collapsed"
                        data-toggle="collapse"
                        data-target="#faq2"
                        aria-expanded="true"
                        aria-controls="faq2"
                      >
                        <small>Month</small> :{" "}
                        {dashBoardListArray &&
                          dashBoardListArray.data.Month}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-6 col-sm-6 col-lg-3 mb-4">
                <div
                  className="card card-custom"
                  style={{ background: "#808080" }}
                >
                  <div className="row">
                    <div className="col-6 col-md-6 col-sm-6 text-left">
                      <p className="pl-4 pt-4">
                        <strong>Client</strong>
                        <br />
                        <strong>List</strong>
                      </p>
                    </div>
                    <div className="col-6 col-md-6 col-sm-6 text-right">
                      <h5 className="pr-4 pt-4">
                        {dashBoardListArray &&
                          dashBoardListArray.data.totalAgents}
                      </h5>
                      <div
                        className="col-3 col-md-3 col-sm-3 text-right"
                        style={{ margin: "auto", paddingLeft: "30px" }}
                      >
                        <a onClick={() =>navigate("client")} className="pr-4 pt-0 pb-3 d-block" style={{color:"white"}}>
                          <i className="fas fa-arrow-right"></i>
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="card">
                    <div
                      className="card-header"
                      id="faqhead3"
                      style={{ background: "#808080" }}
                    >
                      <a
                        href="#"
                        className="btn btn-header-link collapsed"
                        data-toggle="collapse"
                        data-target="#faq3"
                        aria-expanded="true"
                        aria-controls="faq3"
                      >
                        <small>Month</small> :{" "}
                        {dashBoardListArray &&
                          dashBoardListArray.data.month}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-6 col-sm-6 col-lg-3 mb-4">
                <div
                  className="card card-custom"
                  style={{ background: "#C8C8C8" }}
                >
                  <div className="row">
                    <div className="col-6 col-md-6 col-sm-6 text-left">
                      <p className="pl-4 pt-4">
                        <strong>Invoices</strong>
                        <br />
                        <strong>Generated</strong>
                      </p>
                    </div>
                    <div className="col-6 col-md-6 col-sm-6 text-right">
                      <h5 className="pr-4 pt-4">
                        {dashBoardListArray &&
                          dashBoardListArray.data.totalAgents}
                      </h5>
                      <div
                        className="col-3 col-md-3 col-sm-3 text-right"
                        style={{ margin: "auto", paddingLeft: "30px" }}
                      >
                        <a href="" className="pr-4 pt-0 pb-3 d-block" style={{color:"white"}}>
                          <i className="fas fa-arrow-right"></i>
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="card">
                    <div
                      className="card-header"
                      id="faqhead3"
                      style={{ background: "#C8C8C8" }}
                    >
                      <a
                        href="#"
                        className="btn btn-header-link collapsed"
                        data-toggle="collapse"
                        data-target="#faq3"
                        aria-expanded="true"
                        aria-controls="faq3"
                      >
                        <small>Month</small> :{" "}
                        {dashBoardListArray &&
                          dashBoardListArray.data.month}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div>
            <LineGraph />
          </div>
        </div>

        <div className="row">
          <div className="col-12 col-lg-8 mb-4">
            <h3 className="mt-4 mb-4">Best Selling policy - <small>Month</small> Jan 2021</h3>
            <div className="table-responsive">
              <table className="table table-bordered">
                <thead className="white-bg">
                  <tr>
                    <th key={1}>Policy Name</th>
                    <th key={2}>Policy code</th>
                    <th key={3}>Policy Type</th>
                    <th key={4}>Total Sales</th>
                  </tr>
                </thead>
                <tbody>
                  {dashBoardListArray &&
                    dashBoardListArray.bestPolicy.map((item) => (
                      <tr className="grey-box">
                        <td className="green-text">{item.policyName}</td>
                        <td>{item.policyCode}</td>
                        <td>{item.policyType}</td>
                        <td className="green-text">{item.totalSales}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <footer className="py-4 bg-light mt-auto">
        <div className="container-fluid">
          <div className="d-flex align-items-center justify-content-between small">
            <div className="text-muted">Copyright &copy; Nossa 2020</div>
            <div>
              <a href="#">Privacy Policy</a>
              &middot;
              <a href="#">Terms &amp; Conditions</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
    </div>
  );
};
export default AdDashboard;
