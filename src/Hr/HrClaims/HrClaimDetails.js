import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Breadcrumb } from "antd";
import { verifyClaimList } from "../../services/authentication";
import vrmllewr from "../../assets/img/vrmllewr.png";

const HrClaimDetails = (props) => {
  console.log("props", props);
  const selectedRecord = props && props.selectedRecord;
  const alldata = props && props.data;
  console.log("data", alldata);
  const status = props && props.status;
  console.log("selecet", selectedRecord);
  const ClaimList =
    alldata && alldata.filter((data) => data.claimCode === selectedRecord.id)[0];

  console.log("list", ClaimList);
  const [ClaimDetailsPage, setClaimDetailsPage] = useState(true);

  const handleverifyAPI = async (verifyStatus) => {
    const data = {
      id: ClaimList.id,
      verifyStatus: verifyStatus,
      //  "priorityStatus":ClaimList.priorityStatus
    };
    try {
      const resp = await verifyClaimList(data);
      console.log("respppp", resp);
      handleBack();
      //   handlesubmit()
    } catch (error) {
      console.log("error", error);
    }
  };

  //    const handlesubmit = ()=>{
  //       props.handlesubmit()
  //    }

  const handleBack = () => {
    props.handleBack();
  };
  let navigate = useNavigate();
  return (
    <>
      {ClaimDetailsPage && (
        <div>
          <Breadcrumb style={{ marginTop: "20px" }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>claims</Breadcrumb.Item>
            <Breadcrumb.Item>claim Details</Breadcrumb.Item>
          </Breadcrumb>
          <div
            className="row d-flex align-items-center justify-content-between"
            style={{ paddingTop: "10px" }}
          >
            <div className="col-12">
              <div className="heading-with-box">
                <div className="row">
                  <div className="col-lg-6 col-md-6 text-left">
                    <h3>
                      Claim ID :{" "}
                      <span className="color-green">
                        {ClaimList.claim_details
                          ? ClaimList.claimCode
                          : ""}
                      </span>
                    </h3>
                  </div>
                  <div className="col-lg-6 col-md-6 text-right">
                    <a
                      href=""
                      className="grey-color"
                      data-toggle="modal"
                      data-target="#addPolicyList"
                    >
                      Status :{" "}
                      <span>{ClaimList && ClaimList.verifyStatus}</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="detail-box">
            <div className="row">
              <div className="col-12">
                <h1 className="pl-4">Details of Primary Insured</h1>
              </div>
            </div>
            <div className="detail-box-inner pl-4 pr-4">
              <div className="row">
                <div className="col-md-3 col-sm-3 col-12">
                  <b>NS Account No*</b>
                  <p>{}</p>
                </div>
                <div className="col-md-3 col-sm-3 col-12">
                  <b>Policy No</b>
                  <p>{ClaimList && ClaimList.userPolicy.policy.policyCode}</p>
                </div>
                <div className="col-md-2 col-sm-2 col-12">
                  <b>User Name</b>
                  <p>
                    {ClaimList && ClaimList.userPolicy.user.firstName}{" "}
                    {ClaimList && ClaimList.userPolicy.user.lastName}
                  </p>
                </div>
                <div className="col-md-2 col-sm-2 col-12">
                  <b>Policy Name</b>
                  <p>{ClaimList && ClaimList.userPolicy.user.policyName}</p>
                </div>
                <div className="col-md-2 col-sm-2 col-12">
                  <b>Phone No</b>
                  <p>{ClaimList && ClaimList.userPolicy.user.phone}</p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-3 col-sm-3 col-12">
                  <b>Email Address</b>
                  <p>{ClaimList && ClaimList.userPolicy.user.email}</p>
                </div>
                <div className="col-md-9 col-sm-9 col-12">
                  <b>Address</b>
                  <p>{ClaimList && ClaimList.address} </p>
                </div>
              </div>
            </div>
          </div>
          <div className="detail-box">
            <div className="row">
              <div className="col-12">
                <h1 className="pl-4">Details of Insurance History</h1>
              </div>
            </div>
            <div className="detail-box-inner pl-4 pr-4">
              <div className="row">
                <div className="col-md-4 col-sm-4 col-12">
                  <b>
                    Currently covered by any other Mediclaim / Health Insurance
                  </b>
                  <p>{ClaimList && ClaimList.coveredByOtherInsurance}</p>
                </div>
                <div className="col-md-2 col-sm-2 col-12">
                  <b>Diagnosis</b>
                  <p>{ClaimList && ClaimList.diagnosis}</p>
                </div>
                <div className="col-md-2 col-sm-2 col-12">
                  <b>Company Name</b>
                  <p>{ClaimList && ClaimList.companyName}</p>
                </div>
                <div className="col-md-2 col-sm-2 col-12">
                  <b>Policy No</b>
                  <p>{ClaimList && ClaimList.policyNo}</p>
                </div>
                <div className="col-md-2 col-sm-2 col-12">
                  <b>Sum Insured</b>
                  <p>{ClaimList && ClaimList.sumInsured}</p>
                </div>
              </div>
            </div>
          </div>
          detail-box-End
          <div className="detail-box">
            <div className="row">
              <div className="col-12">
                <h1 className="pl-4">Details of Insured Person Hospitalized</h1>
              </div>
            </div>
            <div className="detail-box-inner pl-4 pr-4">
              <div className="row">
                <div className="col-md-3 col-sm-3 col-12">
                  <b>Relationship to Primary Insured</b>
                  <p>{ClaimList && ClaimList.relationWithInsured}</p>
                </div>
                <div className="col-md-2 col-sm-2 col-12">
                  <b>Name</b>
                  <p> {ClaimList && ClaimList.relationName}</p>
                </div>
                <div className="col-md-2 col-sm-2 col-12">
                  <b>Gender</b>
                  <p>{ClaimList && ClaimList.relationGender}</p>
                </div>
                <div className="col-md-2 col-sm-2 col-12">
                  <b>Date of Birth</b>
                  <p>{ClaimList && ClaimList.relationDOB}</p>
                </div>
                <div className="col-md-1 col-sm-1 col-12">
                  <b>Age</b>
                  <p>{ClaimList && ClaimList.relationAge}</p>
                </div>
                <div className="col-md-2 col-sm-2 col-12">
                  <b>Email Address</b>
                  <p>{ClaimList && ClaimList.relationEmail}</p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-3 col-sm-3 col-12">
                  <b>Occupation</b>
                  <p>{ClaimList && ClaimList.relationOccupation}</p>
                </div>
                <div className="col-md-9 col-sm-9 col-12">
                  <b>Phone No</b>
                  <p>{ClaimList && ClaimList.relationPhone}</p>
                </div>
              </div>
            </div>
          </div>
          detail-box-End
          <div className="detail-box">
            <div className="row">
              <div className="col-12">
                <h1 className="pl-4">Details of Hospitalization</h1>
              </div>
            </div>
            <div className="detail-box-inner pl-4 pr-4">
              <div className="row">
                <div className="col-md-3 col-sm-3 col-12">
                  <b>Name of Hospital where Admited</b>
                  <p>
                    {ClaimList.claim_details
                      ? ClaimList.claim_details.hospitalName
                      : ""}
                  </p>
                </div>
                <div className="col-md-3 col-sm-3 col-12">
                  <b>Room Category occupied</b>
                  <p>
                    {ClaimList.claim_details
                      ? ClaimList.claim_details.roomCategory
                      : ""}{" "}
                  </p>
                </div>
                <div className="col-md-2 col-sm-2 col-12">
                  <b>Hospitalization due to</b>
                  <p>
                    {ClaimList.claim_details
                      ? ClaimList.claim_details.reason
                      : ""}
                  </p>
                </div>
                <div className="col-md-2 col-sm-2 col-12">
                  <b>If injury give cause</b>
                  <p>
                    {ClaimList.claim_details
                      ? ClaimList.claim_details.injuryCause
                      : ""}
                  </p>
                </div>
                <div className="col-md-2 col-sm-2 col-12">
                  <b>Date of Injury</b>
                  <p>
                    {ClaimList.claim_details
                      ? ClaimList.claim_details.dateInjury
                      : ""}
                  </p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-3 col-sm-3 col-12">
                  <b>Date of Admission</b>
                  <p>
                    {ClaimList.claim_details
                      ? ClaimList.claim_details.dateAdmission
                      : ""}
                  </p>
                </div>
                <div className="col-md-9 col-sm-9 col-12">
                  <b>Date of Discharge</b>
                  <p>
                    {ClaimList.claim_details
                      ? ClaimList.claim_details.dateDischarge
                      : ""}
                  </p>
                </div>
              </div>
            </div>
          </div>
          detail-box-End
          <div className="detail-box">
            <div className="row">
              <div className="col-12">
                <h1 className="pl-4">Details of Claim</h1>
              </div>
            </div>
            <div className="detail-box-inner pl-4 pr-4">
              <h4 className="dt">
                {ClaimList.claim_details
                  ? ClaimList.claim_details.dateDischarge
                  : ""}
              </h4>
              <div className="row">
                <div className="col-md-3 col-sm-3 col-12">
                  <b>Pre -hospitalization expenses</b>
                  <p>
                    {ClaimList.claim_details
                      ? ClaimList.claim_details.preHospitalExpense
                      : ""}
                  </p>
                </div>
                <div className="col-md-3 col-sm-3 col-12">
                  <b>Hospitalization expenses</b>
                  <p>
                    {ClaimList.claim_details
                      ? ClaimList.claim_details.hospitalExpense
                      : ""}
                  </p>
                </div>
                <div className="col-md-3 col-sm-3 col-12">
                  <b>Post-hospitalization expenses</b>
                  <p>
                    {ClaimList.claim_details
                      ? ClaimList.claim_details.postHospitalExpense
                      : ""}
                  </p>
                </div>
                <div className="col-md-3 col-sm-3 col-12">
                  <b>Health-Check up cost</b>
                  <p>
                    {ClaimList.claim_details
                      ? ClaimList.claim_details.healthCheckupExpense
                      : ""}
                  </p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-3 col-sm-3 col-12">
                  <b>Ambulance Charges</b>
                  <p>
                    {ClaimList.claim_details
                      ? ClaimList.claim_details.ambulanceExpense
                      : ""}
                  </p>
                </div>
                <div className="col-md-9 col-sm-9 col-12">
                  <b>Others Charges</b>
                  <p>
                    {ClaimList.claim_details
                      ? ClaimList.claim_details.otherCharges
                      : ""}
                  </p>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <hr className="mt-0" />
                </div>
              </div>
              <div className="row">
                <div className="col-md-3 col-sm-3 col-12">
                  <b>Pre -hospitalization period</b>
                  <p>
                    {ClaimList.claim_details
                      ? ClaimList.claim_details.preHospitalDuration
                      : ""}
                  </p>
                </div>
                <div className="col-md-3 col-sm-3 col-12">
                  <b>Post -hospitalization period</b>
                  <p>
                    {ClaimList.claim_details
                      ? ClaimList.claim_details.postHospitaDuration
                      : ""}
                  </p>
                </div>
                <div className="col-md-3 col-sm-3 col-12">
                  <b>Post-hospitalization expenses</b>
                  <p>
                    Tabl
                    {ClaimList.claim_details
                      ? ClaimList.claim_details.postHospitalExpense
                      : ""}
                    ets
                  </p>
                </div>
                <div className="col-md-3 col-sm-3 col-12">
                  <b>Hospital Daily cash</b>
                  <p>
                    {ClaimList.claim_details
                      ? ClaimList.claim_details.hospitalDailyCash
                      : ""}
                  </p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-3 col-sm-3 col-12">
                  <b>Surgical Cash</b>
                  <p>
                    {ClaimList.claim_details
                      ? ClaimList.claim_details.surgicalCash
                      : ""}
                  </p>
                </div>
                <div className="col-md-3 col-sm-3 col-12">
                  <b>Critical Illness benefit</b>
                  <p>
                    {ClaimList.claim_details
                      ? ClaimList.claim_details.criticalIllnessbenefit
                      : ""}
                  </p>
                </div>
                <div className="col-md-3 col-sm-3 col-12">
                  <b>Convalescence</b>
                  <p>
                    {ClaimList.claim_details
                      ? ClaimList.claim_details.convalescence
                      : ""}
                  </p>
                </div>
                <div className="col-md-3 col-sm-3 col-12">
                  <b>Pre/Post hospitalization Lump sum benefit</b>
                  <p>
                    {ClaimList.claim_details
                      ? ClaimList.claim_details.lumpSumBenefit
                      : ""}
                  </p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-3 col-sm-3 col-12">
                  <b>Others Charges</b>
                  <p>
                    {ClaimList.claim_details
                      ? ClaimList.claim_details.otherCharges
                      : ""}
                  </p>
                </div>
                <div className="col-md-9 col-sm-9 col-12">
                  <b>Details of Lump sum / cash benefit claimed</b>
                  <p>
                    {ClaimList.claim_details
                      ? ClaimList.claim_details.lumpSumBenefitDetail
                      : ""}
                  </p>
                </div>
              </div>
              <hr className="mt-0" />
              <div className="row">
                <div className="col-md-6 col-sm-6 col-6">
                  <strong className="float-left mb-3">Grand TOTAL</strong>
                </div>
                <div className="col-md-6 col-sm-6 col-6">
                  <strong className="green-text float-right mb-3">
                    {ClaimList.claim_details
                      ? ClaimList.claim_details.dateDischarge
                      : ""}
                  </strong>
                </div>
              </div>
            </div>
          </div>
          <detail-box-End />
          <div className="detail-box">
            <div className="row">
              <div className="col-12">
                <h1 className="pl-4">
                  Claim Documents Submitted - Check Lis{" "}
                  <a href="#" className="float-right">
                    Download All{" "}
                    <img src="assets/img/ic_file_download.png" alt="" />{" "}
                  </a>
                </h1>
              </div>
            </div>
            <div className="detail-box-inner pl-4 pr-4">
              <div className="row">
                {console.log(
                  "ClaimList.claim_documents.lenght > 0",
                  ClaimList.claim_documents.length > 0
                )}
                {ClaimList.claim_documents.length > 0 ? (
                  ClaimList.claim_documents.map((data) => {
                    console.log("dtadaa", data);
                    return (
                      <div className="col-md-2 col-sm-2 col-12">
                        <div className="detail-pdf-box">
                          <div className="card">
                            <div
                              className="card-title"
                              onClick={() =>
                                window.open(
                                  `http://159.65.145.21:3001/images/${data.documentFile}`
                                )
                              }
                            >
                              <img src={vrmllewr} />
                            </div>
                          </div>
                          {/* const url = `http://159.65.145.21:3001/images/${data.documentFile}` alt="" className="img-responsive"  */}
                        </div>
                        <h6 className="text-center mt-2">
                          {data.documentName}
                        </h6>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-center mt-2">No Documents</p>
                )}
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">&nbsp;</div>
            <div className="col-12 col-md-2 col-sm-2">
              <Button
                className="btn btn-back mb-2"
                type="submit"
                style={{
                  width: "180px",
                  color: "white",
                  backgroundColor: "black",
                }}
                onClick={props.handleBack}
              >
                Back
              </Button>
            </div>
            <div className="col-12 col-md-2 col-sm-2">
              <Button
                className="btn btn-approve-claim mb-2"
                type="submit"
                style={{
                  width: "180px",
                  color: "white",
                  backgroundColor: "red",
                }}
                onClick={() => handleverifyAPI("Rejected")}
              >
                Reject Claim
              </Button>
            </div>
            <div className="col-12 col-md-2 col-sm-2">
              <Button
                className="btn btn-reject-claim mb-2"
                type="submit"
                style={{
                  width: "180px",
                  color: "white",
                  backgroundColor: "#000089",
                }}
                onClick={() => handleverifyAPI("Approved")}
              >
                Approve Claim
              </Button>
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
      )}
    </>
  );
};
export default HrClaimDetails;
