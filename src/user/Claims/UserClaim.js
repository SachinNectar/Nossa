import React, { useState } from "react";
//import './UserClaim.style.css'
import { useNavigate } from "react-router-dom";
import { Button, Modal, Form, DatePicker, Breadcrumb } from "antd";
import { getEditClaim, getDeleteClaim } from "../../services/authentication";
import vrmllewr from "../../assets/img/vrmllewr.png";

//   HrData.profileImg ? `http://159.65.145.21:3001/images/${HrData.profileImg}` : ''

const UserClaim = (props) => {
  const selectedRecord = props && props.SelectedRecord;
  const alldata = props && props.data;
  console.log("data", alldata);
  const status = props && props.status;
  const ClaimList =
    alldata && alldata.filter((data) => data.claimCode === selectedRecord.id)[0];
  const ClaimListDetails = ClaimList && ClaimList;
  console.log("ClaimListDetails", ClaimList);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [ClaimName, setClaimName] = useState(
    ClaimListDetails.name ? ClaimListDetails.name : ""
  );
  const [claimEmailId, setClaimEmailId] = useState(
    ClaimListDetails.email ? ClaimListDetails.email : ""
  );
  const [claimPhone, setClaimPhone] = useState(
    ClaimListDetails.phone ? ClaimListDetails.phone : ""
  );
  const [claimAddress, setClaimAdress] = useState(
    ClaimListDetails.address ? ClaimListDetails.address : ""
  );
  const [diagnosis, setdiagnosis] = useState(
    ClaimListDetails.diagnosis ? ClaimListDetails.diagnosis : ""
  );
  const [relationOccupation, setrelationOccupation] = useState(
    ClaimListDetails.relationOccupation
      ? ClaimListDetails.relationOccupation
      : ""
  );
  const [coveredByOtherInsurance, setcoveredByOtherInsurance] = useState(
    ClaimListDetails.coveredByOtherInsurance
      ? ClaimListDetails.coveredByOtherInsurance
      : ""
  );
  const [companyName, setcompanyName] = useState(
    ClaimListDetails.companyName ? ClaimListDetails.companyName : ""
  );
  const [sumInsured, setsumInsured] = useState(
    ClaimListDetails.sumInsured ? ClaimListDetails.sumInsured : ""
  );
  const [relationWithInsured, setrelationWithInsured] = useState(
    ClaimListDetails.relationWithInsured
      ? ClaimListDetails.relationWithInsured
      : ""
  );
  const [relationName, setrelationName] = useState(
    ClaimListDetails.relationName ? ClaimListDetails.relationName : ""
  );
  const [relationGender, setrelationGender] = useState(
    ClaimListDetails.relationGender ? ClaimListDetails.relationGender : ""
  );
  const [relationAge, setrelationAge] = useState(
    ClaimListDetails.relationAge ? ClaimListDetails.relationAge : ""
  );
  const [relationEmail, setrelationEmail] = useState(
    ClaimListDetails.relationEmail ? ClaimListDetails.relationEmail : ""
  );
  const [relationPhone, setRelationPhone] = useState(
    ClaimListDetails.relationPhone ? ClaimListDetails.relationPhone : ""
  );
  const [relationAddress, setRelationAdress] = useState(
    ClaimListDetails.relationAddress ? ClaimListDetails.relationAddress : ""
  );
  const [claimhospitalName, setclaimhospitalName] = useState(
    ClaimListDetails.claim_details.hospitalName
      ? ClaimListDetails.claim_details.hospitalName
      : ""
  );
  const [roomCategory, setroomCategory] = useState(
    ClaimListDetails.claim_details.roomCategory
      ? ClaimListDetails.claim_details.roomCategory
      : ""
  );
  const [claimreason, setclaimreason] = useState(
    ClaimListDetails.claim_details.reason
      ? ClaimListDetails.claim_details.reason
      : ""
  );
  const [injuryCause, setinjuryCause] = useState(
    ClaimListDetails.claim_details.injuryCause
      ? ClaimListDetails.claim_details.injuryCause
      : ""
  );
  const [preHospitalExpense, setpreHospitalExpense] = useState(
    ClaimListDetails.claim_details.preHospitalExpense
      ? ClaimListDetails.claim_details.preHospitalExpense
      : ""
  );
  const [postHospitalExpense, setpostHospitalExpense] = useState(
    ClaimListDetails.claim_details.postHospitalExpense
      ? ClaimListDetails.claim_details.postHospitalExpense
      : ""
  );
  const [hospitalExpense, sethospitalExpense] = useState(
    ClaimListDetails.claim_details.hospitalExpense
      ? ClaimListDetails.claim_details.hospitalExpense
      : ""
  );
  const [ambulanceExpense, setambulanceExpense] = useState(
    ClaimListDetails.claim_details.ambulanceExpense
      ? ClaimListDetails.claim_details.ambulanceExpense
      : ""
  );
  const [otherExpense, setotherExpense] = useState(
    ClaimListDetails.claim_details.otherExpense
      ? ClaimListDetails.claim_details.otherExpense
      : ""
  );
  const [preHospitalDuration, setpreHospitalDuration] = useState(
    ClaimListDetails.claim_details.preHospitalDuration
      ? ClaimListDetails.claim_details.preHospitalDuration
      : ""
  );
  const [postHospitalDuration, setpostHospitalDuration] = useState(
    ClaimListDetails.claim_details.postHospitalDuration
      ? ClaimListDetails.claim_details.postHospitalDuration
      : ""
  );
  const [healthCheckupExpense, sethealthCheckupExpense] = useState(
    ClaimListDetails.claim_details.healthCheckupExpense
      ? ClaimListDetails.claim_details.healthCheckupExpense
      : ""
  );
  const [hospitalDailyCash, sethospitalDailyCash] = useState(
    ClaimListDetails.claim_details.hospitalDailyCash
      ? ClaimListDetails.claim_details.hospitalDailyCash
      : ""
  );
  const [surgicalCash, setsurgicalCash] = useState(
    ClaimListDetails.claim_details.surgicalCash
      ? ClaimListDetails.claim_details.surgicalCash
      : ""
  );
  const [criticalIllnessbenefit, setcriticalIllnessbenefit] = useState(
    ClaimListDetails.claim_details.criticalIllnessbenefit
      ? ClaimListDetails.claim_details.criticalIllnessbenefit
      : ""
  );
  const [convalescence, setconvalescence] = useState(
    ClaimListDetails.claim_details.convalescence
      ? ClaimListDetails.claim_details.convalescence
      : ""
  );
  const [lumpSumBenefit, setlumpSumBenefit] = useState(
    ClaimListDetails.claim_details.lumpSumBenefit
      ? ClaimListDetails.claim_details.lumpSumBenefit
      : ""
  );
  const [otherCharges, setotherCharges] = useState(
    ClaimListDetails.claim_details.otherCharges
      ? ClaimListDetails.claim_details.otherCharges
      : ""
  );
  const [lumpSumBenefitDetail, setlumpSumBenefitDetail] = useState(
    ClaimListDetails.claim_details.lumpSumBenefitDetail
      ? ClaimListDetails.claim_details.lumpSumBenefitDetail
      : ""
  );
  const [dateAdmission, setdateAdmission] = useState(
    ClaimListDetails.claim_details.dateAdmission
      ? ClaimListDetails.claim_details.dateAdmission
      : ""
  );
  const [dateDischarge, setdateDischarge] = useState(
    ClaimListDetails.claim_details.dateDischarge
      ? ClaimListDetails.claim_details.dateDischarge
      : ""
  );
  const [dateInjury, setdateInjury] = useState(
    ClaimListDetails.claim_details.dateInjury
      ? ClaimListDetails.claim_details.dateInjury
      : ""
  );
  const [realtionDOB, setrealtionDOB] = useState(
    ClaimListDetails.relationDOB ? ClaimListDetails.relationDOB : ""
  );
  const [errorMsg, seterrorMsg] = useState("");

  const handelEditCancel = () => {
    setIsEditModalVisible(false);
  };
  const handleEditAgentListAPI = () => {
    setIsEditModalVisible(false);
  };
  const handleShowModal = () => {
    setIsEditModalVisible(true);
  };
  const onFinish = async (values) => {
    console.log(values);
    const payload = {
      name: ClaimName,
      phone: claimPhone,
      email: claimEmailId,
      address: claimAddress,

      coveredByOtherInsurance: coveredByOtherInsurance,
      diagnosis: diagnosis,
      companyName: companyName,
      sumInsured: sumInsured,
      relationWithInsured: relationWithInsured,
      relationName: relationName,
      relationGender: relationGender,
      relationDOB: realtionDOB,
      relationAge: relationAge,
      relationOccupation: relationOccupation,
      relationAddress: relationAddress,
      relationPhone: relationPhone,
      relationEmail: relationEmail,
      hospitalName: claimhospitalName,
      roomCategory: roomCategory,
      reason: claimreason,
      injuryCause: injuryCause,
      dateInjury: dateInjury,
      dateAdmission: dateAdmission,
      dateDischarge: dateDischarge,
      preHospitalExpense: preHospitalExpense,
      hospitalExpense: hospitalExpense,
      postHospitalExpense: postHospitalExpense,
      healthCheckupExpense: healthCheckupExpense,
      ambulanceExpense: ambulanceExpense,
      otherExpense: otherExpense,
      preHospitalDuration: preHospitalDuration,
      postHospitaDuration: postHospitalExpense,
      hospitalDailyCash: hospitalDailyCash,
      surgicalCash: surgicalCash,
      criticalIllnessbenefit: criticalIllnessbenefit,
      convalescence: convalescence,
      lumpSumBenefit: lumpSumBenefit,
      otherCharges: otherCharges,
      lumpSumBenefitDetail: lumpSumBenefitDetail,
    };
    if (
      claimPhone === "" ||
      claimEmailId === "" ||
      claimAddress === "" ||
      ClaimName === ""
    ) {
      seterrorMsg("Please Fill all fileds.");
    } else if (
      values.dateAdmission === undefined ||
      values.dateDischarge === undefined ||
      values.dateInjury === undefined ||
      values.realtionDOB === undefined
    ) {
      seterrorMsg("Please Fill all fileds.");
    } else {
      try {
        const resp = await getEditClaim(payload);
        console.log("record Edited successfuly");
        handelEditCancel();
        seterrorMsg("");
      } catch (error) {
        console.log("error", error);
        // showAlert('In valide data', "error");
      }
    }
  };

  const handleDeleteClaim = async () => {
    const value = ClaimList && ClaimList;
    const payload = { id: value.id };
    try {
      const resp = await getDeleteClaim(payload);
      console.log("record deleted successfuly");
    } catch (error) {
      console.log("error", error);
      // showAlert('In valide data', "error");
    }
  };


  // let url = 'http://159.65.145.21:3001/images/lrqOHNossaPdf%20(2).pdf'

  function downloadMedia(url) {
    try {
        if (!url) return;
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/pdf',
            },
        })
            .then((response) => response.blob())
            .then((blob) => {
                // Create blob link to download
                const url = window.URL.createObjectURL(
                    new Blob([blob]),
                );
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute(
                    'download',
                    `FileName.pdf`,
                );

                // Append to html link element page
                document.body.appendChild(link);

                // Start download
                link.click();

                // Clean up and remove the link
                link.parentNode.removeChild(link);
            });
    }
    catch (ex) {
        console.error('Something went wrong. Please try after sometime.');
    }
}


  return (
    <>
      <div>
        <Breadcrumb style={{ marginTop: "20px" }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>claims</Breadcrumb.Item>
          <Breadcrumb.Item>Claim Details</Breadcrumb.Item>
        </Breadcrumb>
        <div className="row d-flex align-items-center justify-content-between">
          <div className="col-12">
            <div className="heading-with-box">
              <div className="row">
                <div className="col-lg-6 col-md-6 text-left">
                  <h3>
                    Claim ID :{" "}
                    <span className="color-green">
                      {ClaimList ? ClaimList.claimCode: null}
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
                    <span>{ClaimList ? ClaimList.verifyStatus : ""}</span>
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
                <p>{ClaimList ? ClaimList.userPolicy.policy.policyCode : ""}</p>
              </div>
              <div className="col-md-2 col-sm-2 col-12">
                <b>User Name</b>
                <p>
                  {ClaimList ? ClaimList.userPolicy.user.firstName : ""}{" "}
                  {ClaimList ? ClaimList.userPolicy.user.lastName : ""}
                </p>
              </div>
              <div className="col-md-2 col-sm-2 col-12">
                <b>Policy Name</b>
                <p>{ClaimList ? ClaimList.userPolicy.user.policyName : ""}</p>
              </div>
              <div className="col-md-2 col-sm-2 col-12">
                <b>Phone No</b>
                <p>{ClaimList ? ClaimList.userPolicy.user.phone : ""}</p>
              </div>
            </div>
            <div className="row">
              <div className="col-md-3 col-sm-3 col-12">
                <b>Email Address</b>
                <p>{ClaimList ? ClaimList.userPolicy.user.email : ""}</p>
              </div>
              <div className="col-md-9 col-sm-9 col-12">
                <b>Address</b>
                <p>{ClaimList ? ClaimList.address : ""} </p>
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
                <p>{ClaimList ? ClaimList.coveredByOtherInsurance : ""}</p>
              </div>
              <div className="col-md-2 col-sm-2 col-12">
                <b>Diagnosis</b>
                <p>{ClaimList ? ClaimList.diagnosis : ""}</p>
              </div>
              <div className="col-md-2 col-sm-2 col-12">
                <b>Company Name</b>
                <p>{ClaimList ? ClaimList.companyName : ""}</p>
              </div>
              <div className="col-md-2 col-sm-2 col-12">
                <b>Policy No</b>
                <p>{ClaimList ? ClaimList.policyNo : ""}</p>
              </div>
              <div className="col-md-2 col-sm-2 col-12">
                <b>Sum Insured</b>
                <p>{ClaimList ? ClaimList.sumInsured : ""}</p>
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
                <p>{ClaimList ? ClaimList.relationWithInsured : ""}</p>
              </div>
              <div className="col-md-2 col-sm-2 col-12">
                <b>Name</b>
                <p> {ClaimList ? ClaimList.relationName : ""}</p>
              </div>
              <div className="col-md-2 col-sm-2 col-12">
                <b>Gender</b>
                <p>{ClaimList ? ClaimList.relationGender : ""}</p>
              </div>
              <div className="col-md-2 col-sm-2 col-12">
                <b>Date of Birth</b>
                <p>{ClaimList ? ClaimList.relationDOB : ""}</p>
              </div>
              <div className="col-md-1 col-sm-1 col-12">
                <b>Age</b>
                <p>{ClaimList ? ClaimList.relationAge : ""}</p>
              </div>
              <div className="col-md-2 col-sm-2 col-12">
                <b>Email Address</b>
                <p>{ClaimList ? ClaimList.relationEmail : ""}</p>
              </div>
            </div>
            <div className="row">
              <div className="col-md-3 col-sm-3 col-12">
                <b>Occupation</b>
                <p>{ClaimList ? ClaimList.relationOccupation : ""}</p>
              </div>
              <div className="col-md-9 col-sm-9 col-12">
                <b>Phone No</b>
                <p>{ClaimList ? ClaimList.relationPhone : ""}</p>
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
                <p>{ClaimList ? ClaimList.claim_details.hospitalName : ""}</p>
              </div>
              <div className="col-md-3 col-sm-3 col-12">
                <b>Room Category occupied</b>
                <p>{ClaimList ? ClaimList.claim_details.roomCategory : ""} </p>
              </div>
              <div className="col-md-2 col-sm-2 col-12">
                <b>Hospitalization due to</b>
                <p>{ClaimList ? ClaimList.claim_details.reason : ""}</p>
              </div>
              <div className="col-md-2 col-sm-2 col-12">
                <b>If injury give cause</b>
                <p>{ClaimList ? ClaimList.claim_details.injuryCause : ""}</p>
              </div>
              <div className="col-md-2 col-sm-2 col-12">
                <b>Date of Injury</b>
                <p>{ClaimList ? ClaimList.claim_details.dateInjury : ""}</p>
              </div>
            </div>
            <div className="row">
              <div className="col-md-3 col-sm-3 col-12">
                <b>Date of Admission</b>
                <p>{ClaimList ? ClaimList.claim_details.dateAdmission : ""}</p>
              </div>
              <div className="col-md-9 col-sm-9 col-12">
                <b>Date of Discharge</b>
                <p>{ClaimList ? ClaimList.claim_details.dateDischarge : ""}</p>
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
              {ClaimList ? ClaimList.claim_details.dateDischarge : ""}
            </h4>
            <div className="row">
              <div className="col-md-3 col-sm-3 col-12">
                <b>Pre -hospitalization expenses</b>
                <p>
                  {ClaimList ? ClaimList.claim_details.preHospitalExpense : ""}
                </p>
              </div>
              <div className="col-md-3 col-sm-3 col-12">
                <b>Hospitalization expenses</b>
                <p>
                  {ClaimList ? ClaimList.claim_details.hospitalExpense : ""}
                </p>
              </div>
              <div className="col-md-3 col-sm-3 col-12">
                <b>Post-hospitalization expenses</b>
                <p>
                  {ClaimList ? ClaimList.claim_details.postHospitalExpense : ""}
                </p>
              </div>
              <div className="col-md-3 col-sm-3 col-12">
                <b>Health-Check up cost</b>
                <p>
                  {ClaimList
                    ? ClaimList.claim_details.healthCheckupExpense
                    : ""}
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col-md-3 col-sm-3 col-12">
                <b>Ambulance Charges</b>
                <p>
                  {ClaimList ? ClaimList.claim_details.ambulanceExpense : ""}
                </p>
              </div>
              <div className="col-md-9 col-sm-9 col-12">
                <b>Others Charges</b>
                <p>{ClaimList ? ClaimList.claim_details.otherCharges : ""}</p>
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
                  {ClaimList ? ClaimList.claim_details.preHospitalDuration : ""}
                </p>
              </div>
              <div className="col-md-3 col-sm-3 col-12">
                <b>Post -hospitalization period</b>
                <p>
                  {ClaimList ? ClaimList.claim_details.postHospitaDuration : ""}
                </p>
              </div>
              <div className="col-md-3 col-sm-3 col-12">
                <b>Post-hospitalization expenses</b>
                <p>
                  Tabl
                  {ClaimList ? ClaimList.claim_details.postHospitalExpense : ""}
                  ets
                </p>
              </div>
              <div className="col-md-3 col-sm-3 col-12">
                <b>Hospital Daily cash</b>
                <p>
                  {ClaimList ? ClaimList.claim_details.hospitalDailyCash : ""}
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col-md-3 col-sm-3 col-12">
                <b>Surgical Cash</b>
                <p>{ClaimList ? ClaimList.claim_details.surgicalCash : ""}</p>
              </div>
              <div className="col-md-3 col-sm-3 col-12">
                <b>Critical Illness benefit</b>
                <p>
                  {ClaimList
                    ? ClaimList.claim_details.criticalIllnessbenefit
                    : ""}
                </p>
              </div>
              <div className="col-md-3 col-sm-3 col-12">
                <b>Convalescence</b>
                <p>{ClaimList ? ClaimList.claim_details.convalescence : ""}</p>
              </div>
              <div className="col-md-3 col-sm-3 col-12">
                <b>Pre/Post hospitalization Lump sum benefit</b>
                <p>{ClaimList ? ClaimList.claim_details.lumpSumBenefit : ""}</p>
              </div>
            </div>
            <div className="row">
              <div className="col-md-3 col-sm-3 col-12">
                <b>Others Charges</b>
                <p>{ClaimList ? ClaimList.claim_details.otherCharges : ""}</p>
              </div>
              <div className="col-md-9 col-sm-9 col-12">
                <b>Details of Lump sum / cash benefit claimed</b>
                <p>
                  {ClaimList
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
                  {ClaimList ? ClaimList.claim_details.dateDischarge : ""}
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
                Claim Documents Submitted - Check List{" "}
                {ClaimList.claim_documents.length > 0 ? (
                ClaimList.claim_documents.map((data) => {
                  // const url = `http://159.65.145.21:3001/images/${data.documentFile}`
                  let url = 'http://159.65.145.21:3001/images/lrqOHNossaPdf%20(2).pdf'
                  
                //   return(
                // <a
                //   className="float-right"
                // onClick={()=>downloadMedia(url)}
                // >
                //   Download All
                // </a>
                //   )
                })
                ):''}
              </h1>
            </div>
          </div>
          <div className="detail-box-inner pl-4 pr-4">
            <div className="row">
              {ClaimList.claim_documents.length > 0 ? (
                ClaimList.claim_documents.map((data) => {
                  // console.log("dtadaa", data);
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
                      </div>
                      <h6 className="text-center mt-2">{data.documentName}</h6>
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
              onClick={() => props.handleback()}
            >
              Back
            </Button>
          </div>
          <div className="col-12 col-md-2 col-sm-2">
            <Button
              className="btn btn-approve-claim mb-2"
              type="submit"
              style={{ width: "180px", color: "white", backgroundColor: "red" }}
              onClick={() => handleDeleteClaim()}
            >
              Delete Claim
            </Button>
          </div>
          <div className="col-12 col-md-2 col-sm-2">
            <Button
              className="btn btn-reject-claim mb-2"
              type="submit"
              onClick={() => handleShowModal()}
              style={{
                width: "180px",
                color: "white",
                backgroundColor: "#000089",
              }}
            >
              Edit Claim
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
        <Modal
          title="Edit Claim"
          visible={isEditModalVisible}
          footer={null}
          onCancel={handelEditCancel}
          okText="Create"
        >
          <Form onFinish={onFinish}>
            <div className="form-group mb-4">
              <input
                className="form-control"
                // style={{height:"30px",width:"300px",marginTop:"10px",marginLeft:"80px",marginBottom:'25px'}}
                type="name"
                placeholder="Name"
                value={ClaimName}
                onChange={(e) => setClaimName(e.target.value)}
              />
            </div>
            <div className="form-group mb-4">
              <input
                className="form-control"
                // style={{height:"30px",width:"300px",marginTop:"10px",marginLeft:"80px",marginBottom:'25px'}}
                type="email"
                placeholder="Claim Email"
                value={claimEmailId}
                onChange={(e) => setClaimEmailId(e.target.value)}
              />
            </div>
            <div className="form-group mb-4">
              <input
                className="form-control"
                //   style={{height:"30px",width:"300px",marginTop:"10px",marginLeft:"80px",marginBottom:'25px'}}
                type="number"
                maxlength="10"
                placeholder="Phone"
                value={claimPhone}
                onChange={(e) => setClaimPhone(e.target.value)}
              />
            </div>
            <Form.Item name={"realtionDOB"}>
              <DatePicker
                onChange={(dateString) => setrealtionDOB(dateString)}
              />
            </Form.Item>
            <div className="form-group mb-4">
              <input
                className="form-control"
                //   style={{height:"30px",width:"300px",marginTop:"10px",marginLeft:"80px",marginBottom:'25px'}}
                type="Address"
                placeholder="Address"
                value={claimAddress}
                onChange={(e) => setClaimAdress(e.target.value)}
              />
            </div>
            <div className="form-group mb-4">
              <select
                className="form-control"
                //  style={{height:"30px",width:"300px",marginTop:"10px",marginLeft:"80px",marginBottom:'25px'}}
                label={"coveredByOtherInsurance"}
                value={coveredByOtherInsurance}
                onChange={(e) => setcoveredByOtherInsurance(e.target.value)}
              >
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
              <br />
              <select
                label={"diagnosis"}
                value={diagnosis}
                onChange={(e) => setdiagnosis(e.target.value)}
              >
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
            <div className="form-group mb-4">
              <input
                className="form-control"
                // style={{height:"30px",width:"300px",marginTop:"10px",marginLeft:"80px",marginBottom:'25px'}}
                type="name"
                placeholder="Company Name"
                value={companyName}
                onChange={(e) => setcompanyName(e.target.value)}
              />
            </div>
            <div className="form-group mb-4">
              <input
                className="form-control"
                // style={{height:"30px",width:"300px",marginTop:"10px",marginLeft:"80px",marginBottom:'25px'}}
                type="name"
                placeholder="Sum Insured"
                value={sumInsured}
                onChange={(e) => setsumInsured(e.target.value)}
              />
            </div>
            <div className="form-group mb-4">
              <select
                className="form-control"
                //    style={{height:"30px",width:"300px",marginTop:"10px",marginLeft:"80px",marginBottom:'25px'}}
                label={"Relation With Insured"}
                value={relationWithInsured}
                onChange={(e) => setrelationWithInsured(e.target.value)}
              >
                <option value="self">Self</option>
                <option value="father">Father</option>
                <option value="mother">Mother</option>
                <option value="wife">Wife</option>
              </select>
            </div>
            <div className="form-group mb-4">
              <input
                className="form-control"
                // style={{height:"30px",width:"300px",marginTop:"10px",marginLeft:"80px",marginBottom:'25px'}}
                type="name"
                placeholder="Relation Name"
                value={relationName}
                onChange={(e) => setrelationName(e.target.value)}
              />
            </div>
            <div className="form-group mb-4">
              <select
                className="form-control"
                // style={{height:"30px",width:"300px",marginTop:"10px",marginLeft:"80px",marginBottom:'25px'}}
                label={"Relation Gender"}
                value={relationGender}
                onChange={(e) => setrelationGender(e.target.value)}
              >
                <option value="self">Male</option>
                <option value="father">Female</option>
              </select>
            </div>
            <div className="form-group mb-4">
              <input
                className="form-control"
                // style={{height:"30px",width:"300px",marginTop:"10px",marginLeft:"80px",marginBottom:'25px'}}
                type="number"
                placeholder="Relation Gender"
                value={relationAge}
                onChange={(e) => setrelationAge(e.target.value)}
              />
            </div>
            <div className="form-group mb-4">
              <select
                className="form-control"
                // style={{height:"30px",width:"300px",marginTop:"10px",marginLeft:"80px",marginBottom:'25px'}}
                label={"Relation Occupation"}
                value={relationOccupation}
                onChange={(e) => setrelationOccupation(e.target.value)}
              >
                <option value="self">Job</option>
                <option value="father">Business</option>
              </select>
            </div>
            <div className="form-group mb-4">
              <input
                className="form-control"
                // style={{height:"30px",width:"300px",marginTop:"10px",marginLeft:"80px",marginBottom:'25px'}}
                type="email"
                placeholder="Claim Email"
                value={relationEmail}
                onChange={(e) => setrelationEmail(e.target.value)}
              />
            </div>
            <div className="form-group mb-4">
              <input
                className="form-control"
                //   style={{height:"30px",width:"300px",marginTop:"10px",marginLeft:"80px",marginBottom:'25px'}}
                type="number"
                maxlength="10"
                placeholder="Phone"
                value={relationPhone}
                onChange={(e) => setRelationPhone(e.target.value)}
              />
            </div>
            <div className="form-group mb-4">
              <input
                className="form-control"
                //   style={{height:"30px",width:"300px",marginTop:"10px",marginLeft:"80px",marginBottom:'25px'}}
                type="Address"
                placeholder="Relation Address"
                value={relationAddress}
                onChange={(e) => setRelationAdress(e.target.value)}
              />
            </div>
            <div className="form-group mb-4">
              <input
                className="form-control"
                // style={{height:"30px",width:"300px",marginTop:"10px",marginLeft:"80px",marginBottom:'25px'}}
                type="name"
                placeholder="Hospital Name"
                value={claimhospitalName}
                onChange={(e) => setclaimhospitalName(e.target.value)}
              />
            </div>
            <div className="form-group mb-4">
              <select
                className="form-control"
                //    style={{height:"30px",width:"300px",marginTop:"10px",marginLeft:"80px",marginBottom:'25px'}}
                label={"Room Category"}
                value={roomCategory}
                onChange={(e) => setroomCategory(e.target.value)}
              >
                <option value="self">Single</option>
                <option value="father">Multi</option>
              </select>
            </div>
            <div className="form-group mb-4">
              <input
                className="form-control"
                // style={{height:"30px",width:"300px",marginTop:"10px",marginLeft:"80px",marginBottom:'25px'}}
                type="name"
                placeholder="Reason"
                value={claimreason}
                onChange={(e) => setclaimreason(e.target.value)}
              />
            </div>
            <div className="form-group mb-4">
              <select
                className="form-control"
                // style={{height:"30px",width:"300px",marginTop:"10px",marginLeft:"80px",marginBottom:'25px'}}
                label={"InjuryCause"}
                value={injuryCause}
                onChange={(e) => setinjuryCause(e.target.value)}
              >
                <option value="traffic">Road Traffic Accident</option>
                <option value="accident">Accident</option>
                <option value="killing">Killing</option>
              </select>
            </div>

            <div className="form-group mb-4">
              <input
                className="form-control"
                // style={{height:"30px",width:"300px",marginTop:"10px",marginLeft:"80px",marginBottom:'25px'}}
                type="name"
                placeholder="PreHospital Expense"
                value={preHospitalExpense}
                onChange={(e) => setpreHospitalExpense(e.target.value)}
              />
            </div>
            <div className="form-group mb-4">
              <input
                className="form-control"
                // style={{height:"30px",width:"300px",marginTop:"10px",marginLeft:"80px",marginBottom:'25px'}}
                type="name"
                placeholder="Hospital Expense"
                value={hospitalExpense}
                onChange={(e) => sethospitalExpense(e.target.value)}
              />
            </div>
            <div className="form-group mb-4">
              <input
                className="form-control"
                //   style={{height:"30px",width:"300px",marginTop:"10px",marginLeft:"80px",marginBottom:'25px'}}
                type="name"
                placeholder="PostHospital Expense"
                value={postHospitalExpense}
                onChange={(e) => setpostHospitalExpense(e.target.value)}
              />
            </div>
            <div className="form-group mb-4">
              <input
                className="form-control"
                // style={{height:"30px",width:"300px",marginTop:"10px",marginLeft:"80px",marginBottom:'25px'}}
                type="name"
                placeholder="Health Checkup"
                value={healthCheckupExpense}
                onChange={(e) => sethealthCheckupExpense(e.target.value)}
              />
            </div>
            <div className="form-group mb-4">
              <input
                className="form-control"
                //   style={{height:"30px",width:"300px",marginTop:"10px",marginLeft:"80px",marginBottom:'25px'}}
                type="name"
                placeholder="Ambulance Expense"
                value={ambulanceExpense}
                onChange={(e) => setambulanceExpense(e.target.value)}
              />
            </div>
            <div className="form-group mb-4">
              <input
                className="form-control"
                // style={{height:"30px",width:"300px",marginTop:"10px",marginLeft:"80px",marginBottom:'25px'}}
                type="name"
                placeholder="Other Expense"
                value={otherExpense}
                onChange={(e) => setotherExpense(e.target.value)}
              />
            </div>
            <div className="form-group mb-4">
              <input
                className="form-control"
                //   style={{height:"30px",width:"300px",marginTop:"10px",marginLeft:"80px",marginBottom:'25px'}}
                type="name"
                placeholder="PreHospital Duration"
                value={preHospitalDuration}
                onChange={(e) => setpreHospitalDuration(e.target.value)}
              />
            </div>
            <div className="form-group mb-4">
              <input
                className="form-control"
                // style={{height:"30px",width:"300px",marginTop:"10px",marginLeft:"80px",marginBottom:'25px'}}
                type="name"
                placeholder="PostHospital Duration"
                value={postHospitalDuration}
                onChange={(e) => setpostHospitalDuration(e.target.value)}
              />
            </div>
            <div className="form-group mb-4">
              <input
                className="form-control"
                //   style={{height:"30px",width:"300px",marginTop:"10px",marginLeft:"80px",marginBottom:'25px'}}
                type="name"
                placeholder="hospital DailyCash"
                value={hospitalDailyCash}
                onChange={(e) => sethospitalDailyCash(e.target.value)}
              />
            </div>
            <div className="form-group mb-4">
              <input
                className="form-control"
                // style={{height:"30px",width:"300px",marginTop:"10px",marginLeft:"80px",marginBottom:'25px'}}
                type="name"
                placeholder="Surgical Cash"
                value={surgicalCash}
                onChange={(e) => setsurgicalCash(e.target.value)}
              />
            </div>
            <Form.Item name={"dateInjury"}>
              <DatePicker
                onChange={(dateString) => setdateInjury(dateString)}
              />
            </Form.Item>
            <Form.Item name={"dateAdmission"}>
              <DatePicker
                onChange={(dateString) => setdateAdmission(dateString)}
              />
            </Form.Item>
            <Form.Item name={"dateDischarge"}>
              <DatePicker
                onChange={(dateString) => setdateDischarge(dateString)}
              />
            </Form.Item>
            <div className="form-group mb-4">
              <input
                className="form-control"
                //   style={{height:"30px",width:"300px",marginTop:"10px",marginLeft:"80px",marginBottom:'25px'}}
                type="name"
                placeholder="CriticalIllnessbenefit"
                value={criticalIllnessbenefit}
                onChange={(e) => setcriticalIllnessbenefit(e.target.value)}
              />
            </div>
            <div className="form-group mb-4">
              <input
                className="form-control"
                //  style={{height:"30px",width:"300px",marginTop:"10px",marginLeft:"80px",marginBottom:'25px'}}
                type="name"
                placeholder="Convalescence"
                value={convalescence}
                onChange={(e) => setconvalescence(e.target.value)}
              />
            </div>
            <div className="form-group mb-4">
              <input
                className="form-control"
                //  style={{height:"30px",width:"300px",marginTop:"10px",marginLeft:"80px",marginBottom:'25px'}}
                type="name"
                placeholder="LumpSumBenefit"
                value={lumpSumBenefit}
                onChange={(e) => setlumpSumBenefit(e.target.value)}
              />
            </div>
            <div className="form-group mb-4">
              <input
                className="form-control"
                //  style={{height:"30px",width:"300px",marginTop:"10px",marginLeft:"80px",marginBottom:'25px'}}
                type="name"
                placeholder="OtherCharges"
                value={otherCharges}
                onChange={(e) => setotherCharges(e.target.value)}
              />
            </div>
            <div className="form-group mb-4">
              <input
                className="form-control"
                //  style={{height:"30px",width:"300px",marginTop:"10px",marginLeft:"80px",marginBottom:'25px'}}
                type="name"
                placeholder="lumpSumBenefitDetail"
                value={lumpSumBenefitDetail}
                onChange={(e) => setlumpSumBenefitDetail(e.target.value)}
              />
            </div>
            <label style={{ color: "red" }}>{errorMsg}</label>
            <br />
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form>
        </Modal>
      </div>
    </>
  );
};
export default UserClaim;
