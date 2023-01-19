import React from "react";
import { Breadcrumb } from "antd";

const ClientDetails = (props) => {
  const selectedRecord = props && props.selectedRecord;
  console.log("sr", selectedRecord);
  const alldata = props && props.data;
  console.log("alldata", alldata);
  const policyList =
    alldata && alldata.filter((data) => data.id === selectedRecord.id)[0];
  console.log("pl", policyList);

  return (
    <div className="container-fluid">
        <Breadcrumb style={{ marginTop: "20px" }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>claims</Breadcrumb.Item>
            <Breadcrumb.Item>claim Details</Breadcrumb.Item>
          </Breadcrumb>
      <div className="row d-flex align-items-center justify-content-between" style={{paddingTop:"10px"}}>
        <div className="col-12 text-left">
          <h3 className="mt-0 mb-4">
            <a className="text-black" onClick={props.handleBackPage}>
              <i className="fas fa-long-arrow-alt-left"></i>
            </a>
          </h3>
        </div>
      </div>

      <div className="row d-flex align-items-center justify-content-between">
        <div className="col-12">
          <div className="heading-with-box m-0">
            <div className="row">
              <div className="col-lg-12 text-left">
                <h3>
                  Policy No :{" "}
                  <span className="color-green">
                    {policyList && policyList.policy.policyCode}
                  </span>
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="faq-custom">
        <div className="detail-box">
          <div className="card-body form-custom">
            <div className="row">
              <div className="col-12 col-sm-6 col-md-6 col-lg-3">
                <div className="table-data">
                  <span className="text-blue">Policy Holder</span>
                  <b>
                    {" "}
                    {policyList && policyList.user.firstName}{" "}
                    {policyList && policyList.user.lastName}
                  </b>
                </div>
              </div>
              <div className="col-12 col-sm-6 col-md-6 col-lg-3">
                <div className="table-data">
                  <span className="text-blue">Policy</span>
                  <b>{policyList && policyList.policy.policyName}</b>
                </div>
              </div>
              <div className="col-12 col-sm-6 col-md-6 col-lg-4">
                <div className="table-data">
                  <span className="text-blue">Location</span>
                  <b>{policyList && policyList.policy.location}</b>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-sm-6 col-md-6 col-lg-3">
                <div className="table-data">
                  <span className="text-blue">Policy type</span>
                  <b>{policyList && policyList.policy.policyType}</b>
                </div>
              </div>
              <div className="col-12 col-sm-6 col-md-6 col-lg-3">
                <div className="table-data">
                  <span className="text-blue">Start Date & Time</span>
                  <b>{policyList && policyList.createdAt}</b>
                </div>
              </div>
              <div className="col-12 col-sm-6 col-md-6 col-lg-4">
                <div className="table-data">
                  <span className="text-blue">End Date & Time</span>
                  <b>{policyList && policyList.updatedAt}</b>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <div className="table-data">
                  <span className="text-blue">Policy Description</span>
                  <p>{policyList && policyList.policy.description}</p>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <div className="table-data mt-4">
                  <span className="text-blue">Terms & Conditions</span>
                  <p>{policyList && policyList.terms}</p>
                  {/* <ul className="ml-4 p-0">
                                                    <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod libero natus vero, maxime dolores numquam.</li>
                                                    <li>Dolor fuga autem nemo beatae earum delectus, cum neque tenetur fugit, at quibusdam quae pariatur.</li>
                                                    <li>Quod libero natus vero, maxime dolores numquam dolor fuga autem nemo beatae earum delectus.</li>
                                                </ul> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ClientDetails;
