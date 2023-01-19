import React, { useState, useEffect } from "react";
import {
  getAllUserPolicyList,
  getAddClaim,
} from "../../services/authentication";
import { Button, Modal, Form, Table } from "react-bootstrap";
import { UploadOutlined } from "@ant-design/icons";
import "./NewClaim.style.css";

const NewClaim2 = (props) => {
  const Token = window.localStorage.getItem("token");
  const loginDetailsUserId = window.localStorage.getItem("loginDetailsUserId");
  console.log("lgu", loginDetailsUserId);
  const [getAllUserPolicyLI, setgetAllUserPolicyList] = useState("");
  const [policyCode, setPolicyCode] = useState("");
  const [claimForm, setclaimForm] = useState(false);
  const [copyOfClaim, setcopyOfClaim] = useState(false);
  const [hospitalMainBill, sethospitalMainBill] = useState(false);
  const [hospitalBreakup, sethospitalBreakup] = useState(false);
  const [hospitalBillPayment, sethospitalBillPayment] = useState(false);
  const [hospitalDischarge, sethospitalDischarge] = useState(false);
  const [pharmacyBill, setpharmacyBill] = useState(false);
  const [OperationTheater, setOperationTheater] = useState(false);
  const [ECG, setECG] = useState(false);
  const [DoctorRequest, setDoctorRequest] = useState(false);
  const [InvestgationReports, setInvestgationReports] = useState(false);
  const [Doctorprescriptions, setDoctorprescriptions] = useState(false);
  const [Others, setOthers] = useState(false);
  const [hospitalization_dateofInjury, sethospitalization_dateofInjury] =
    useState("");
  const [hospitalization_Addmission, sethospitalization_Addmission] =
    useState("");
  const [hospitalization_Discharge, sethospitalization_Discharge] =
    useState("");
  const [person_dateofBirth, setperson_dateofBirth] = useState("");

  const [claimFormFile, setClaimFormfile] = useState({});
  const [copyOfClaimFile, setcopyOfClaimfile] = useState({});
  const [hospitalMainBillFile, sethospitalMainBillfile] = useState({});
  const [hospitalBreakupFile, sethospitalBreakupfile] = useState({});
  const [hospitalBillPaymentFile, sethospitalBillPaymentfile] = useState({});
  const [hospitalDischargeFile, sethospitalDischargefile] = useState({});
  const [pharmacyBillFile, setpharmacyBillfile] = useState({});
  const [OperationTheaterFile, setOperationTheaterfile] = useState({});
  const [ECGFile, setECGfile] = useState({});
  const [DoctorRequestFile, setDoctorRequestfile] = useState({});
  const [InvestgationReportsFile, setInvestgationReportsfile] = useState({});
  const [DoctorprescriptionsFile, setDoctorprescriptionsfile] = useState({});
  const [OthersFile, setOthersfile] = useState({});
  const[ErrorMsg,seterrorMsg]=useState('')
  const [Data, setData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    policy: "",
    policyNo: "",
    coveredByOtherInsurance: "",
    diagnosis: "",
    companyname: "",
    policyNumber:'',
    sumInsured: "",
    relationWithInsured: "",
    relationName: "",
    relationGender: "",
    relationDOB: "",
    relationAge: "",
    relationOccupation: "",
    relationAddress: "",
    relationPhone: "",
    relationEmail: "",
    hospitalName: "",
    roomCategory: "",
    reason: "",
    injuryCause: "",
    dateInjury: "",
    dateAdmission: "",
    dateDischarge: "",
    preHospitalExpense: "",
    hospitalExpense: "",
    postHospitalExpense: "",
    postHospitaDuration: "",
    healthCheckupExpense: "",
    ambulanceExpense: "",
    otherExpense: "",
    preHospitalDuration: "",
    hospitalDailyCash: "",
    surgicalCash: "",
    criticalIllnessbenefit: "",
    convalescence: "",
    lumpSumBenefit: "",
    otherCharges: "",
    lumpSumBenefitDetail: "",
  });

  const {
    name,
    phone,
    email,
    address,
    policy,
    policyNo,
    coveredByOtherInsurance,
    diagnosis,
    companyname,
    sumInsured,
    policyNumber,
    relationWithInsured,
    relationName,
    relationGender,
    relationDOB,
    relationAge,
    relationOccupation,
    relationAddress,
    relationPhone,
    relationEmail,
    hospitalName,
    roomCategory,
    reason,
    injuryCause,
    dateInjury,
    dateAdmission,
    dateDischarge,
    preHospitalExpense,
    hospitalExpense,
    postHospitalExpense,
    postHospitaDuration,
    healthCheckupExpense,
    ambulanceExpense,
    otherExpense,
    preHospitalDuration,
    hospitalDailyCash,
    surgicalCash,
    criticalIllnessbenefit,
    convalescence,
    lumpSumBenefit,
    otherCharges,
    lumpSumBenefitDetail,
  } = Data;

  const handleChange = (e) => {
    setData({ ...Data, [e.target.name]: e.target.value });
  };
  const getPolicyPayload = {
    premiumPlan: "",
    policy_id: "",
    agent_id: "",
    activeStatus: "",
    user_id: loginDetailsUserId,
  };
  const setTime = (file, onSuccess) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

  const handleSubmit = async (value) => {
    const policyNum =
      getAllUserPolicyLI &&
      getAllUserPolicyLI.filter(
        (data) => data.policy.policyCode === policyNo
      )[0];
    console.log("policyNum", policyNo);
    console.log("La", getAllUserPolicyLI);
    const formData = new FormData();

    console.log("otfile", formData);
    formData.append("userPolicy_id", policyNum.id);
    formData.append("name", name);
    formData.append("phone", phone);
    formData.append("email", email);
    formData.append("address", address);
    formData.append("policy", policy);
    formData.append("policyNo", policyNo);
    formData.append("coveredByOtherInsurance", healthCheckupExpense);
    formData.append("diagnosis", diagnosis);
    formData.append("companyName", companyname);
    formData.append('policyNUmber',policyNumber)
    // formData.append ("sumInsured",sumInsured);
    formData.append("relationWithInsured", relationWithInsured);
    formData.append("relationName", relationName);
    formData.append("relationGender", relationGender);
    formData.append("relationDOB", relationDOB);
    formData.append("relationAge", relationAge);
    formData.append("relationOccupation", relationOccupation);
    formData.append("relationAddress", relationAddress);
    formData.append("relationPhone", relationPhone);
    formData.append("relationEmail", relationEmail);
    formData.append("hospitalName", hospitalName);
    formData.append("roomCategory", roomCategory);
    // formData.append ("reason",claimreason);
    formData.append("injuryCause", injuryCause);

    formData.append("dateInjury", dateInjury);
    formData.append("dateAdmission", dateAdmission);
    formData.append("dateDischarge", dateDischarge);
    formData.append("preHospitalExpense", preHospitalExpense);
    formData.append("hospitalExpense", hospitalExpense);
    // formData.append ("postHospitalExpense",  postHospitalExpense);
    formData.append("healthCheckupExpense", healthCheckupExpense);
    formData.append("ambulanceExpense", ambulanceExpense);
    formData.append("otherExpense", otherExpense);
    formData.append("preHospitalDuration", preHospitalDuration);
    // formData.append ("postHospitaDuration" , postHospitalExpense);
    formData.append("hospitalDailyCash", hospitalDailyCash);
    formData.append("surgicalCash", surgicalCash);
    formData.append("criticalIllnessbenefit", criticalIllnessbenefit);
    formData.append("convalescence", convalescence);
    // formData.append ("lumpSumBenefit",  lumpSumBenefit);
    formData.append("otherCharges", otherCharges);
    formData.append("lumpSumBenefitDetail", lumpSumBenefit);
    formData.append("token", Token);
    formData.append("claimFormFile", claimFormFile[0]);
    formData.append("claimCopyFormFile", copyOfClaimFile[0]);
    formData.append("hospitalMainBillFile", hospitalMainBillFile[0]);
    formData.append("hospitalBreakupFile", hospitalBreakupFile[0]);
    formData.append(
      "hospitalBillPaymentFile",
      JSON.stringify(hospitalBillPaymentFile[0])
    );
    // formData.append ("hospitalBillPaymentFile",  hospitalBillPaymentFile);
    formData.append("hospitalDischargeFile", hospitalDischargeFile[0]);
    formData.append("pharmacyBillFile", pharmacyBillFile[0]);
    formData.append("OperationTheaterFile", OperationTheaterFile[0]);
    formData.append("ECGFile", ECGFile[0]);
    formData.append("DoctorRequestFile", DoctorRequestFile[0]);
    formData.append("InvestgationReportsFile", InvestgationReportsFile[0]);
    formData.append("DoctorprescriptionsFile", DoctorprescriptionsFile[0]);
    formData.append("OthersFile", OthersFile);

    
    if (
      
      name === "" ||
      phone === "" ||
      email === "" ||
      relationName === "" ||
      relationPhone === "" ||
      relationDOB === "" ||
      relationPhone === "" ||
      relationEmail === "" ||
      injuryCause === "" ||
      dateInjury === "" ||
      dateAdmission === "" ||
      dateDischarge === "" 
    ) {
      alert("Please Fill all mandatory fileds.");
    } 
    // else if (phone !== "")   
    //   {
    //     var pattern = new RegExp(/^[0-9\b]+$/);
    //     phone.match(!pattern)
    //   alert('please Enter Valid Mobile Number')
    // }
     else {

    try {
      const resp = await getAddClaim(formData);
      console.log("record added successfuly");
      alert("Record Added Sucessfully");
      handleBack();
      seterrorMsg('')
    } catch (error) {
      console.log("error", error);
      // showAlert('In valide data', "error");
      alert("Something Went Wrong");
    }
  }
  };

  const handleBack = () => {
    props.handleBack();
  };

  const handleGetPolicyListServiceCall = async (data) => {
    try {
      let tableDataArr = [];
      const resp = await getAllUserPolicyList(data);
      console.log("ressssss", resp);
      setgetAllUserPolicyList(resp.data);
      resp &&
        resp.data.map((data, i) => {
          const obj = {
            policyCode: data.policy.policyCode,
            id: data.id,
            policyName: data.policy.policyName,
          };
          tableDataArr.push(obj);

          console.log("data", data);
        });
      setPolicyCode(tableDataArr);
    } catch (error) {
      console.log("error", error);
      // showAlert('In valide data', "error");
    }
  };
  useEffect(() => {
    handleGetPolicyListServiceCall(getPolicyPayload);
  }, []);

  const onClaimChange = (event) => {
    setClaimFormfile(event.target.files);
    setclaimForm(true);
  };
  const onCopyChange = (event) => {
    setcopyOfClaimfile(event.target.files);
    setcopyOfClaim(true);
  };
  const onMainChange = (event) => {
    sethospitalMainBillfile(event.target.files);
    sethospitalMainBill(true);
  };
  const onBreakChange = (event) => {
    sethospitalBreakupfile(event.target.files);
    sethospitalBreakup(true);
  };
  const onBillChange = (event) => {
    sethospitalBillPaymentfile(event.target.files);
    sethospitalBillPayment(true);
  };
  const onDischargeChange = (event) => {
    sethospitalDischargefile(event.target.files);
    sethospitalDischarge(true);
  };
  const onPharmacyChange = (event) => {
    setpharmacyBillfile(event.target.files);
    setpharmacyBill(true);
  };
  const onOperationChange = (event) => {
    setOperationTheaterfile(event.target.files);
    setOperationTheater(true);
  };
  const onECGChange = (event) => {
    setECGfile(event.target.files);
    setECG(true);
  };
  const onDoctosChange = (event) => {
    setDoctorRequestfile(event.target.files);
    setDoctorRequest(true);
  };
  const onInvesChange = (event) => {
    setInvestgationReportsfile(event.target.files);
    setInvestgationReports(true);
  };
  const onPrescriptionChange = (event) => {
    setDoctorprescriptionsfile(event.target.files);
    setDoctorprescriptions(true);
  };
  const handleotherFileChange = (event) => {
    setOthersfile(event.target.files);
    setOthers(true);
  };

  const onclaimFormDulyCheckboxChange = (e) => {
    setclaimForm(e.target.checked);
  };

  const oncopyOfClaimCheckboxChange = (e) => {
    setcopyOfClaim(e.target.checked);
  };
  const copyOfClaimRequest = ({ file, onSuccess }) => {
    setcopyOfClaimfile(file);
    setcopyOfClaim(true);
    setTime(onSuccess);
  };
  const onhospitalMainBillCheckboxChange = (e) => {
    sethospitalMainBill(e.target.checked);
  };
  const hospitalMainBillRequest = ({ file, onSuccess }) => {
    sethospitalMainBillfile(file);
    sethospitalMainBill(true);
    setTime(onSuccess);
  };
  const onhospitalBreakupCheckboxChange = (e) => {
    sethospitalBreakup(e.target.checked);
  };
  const hospitalBreakupRequest = ({ file, onSuccess }) => {
    sethospitalBreakupfile(file);
    sethospitalBreakup(true);
    setTime(onSuccess);
  };
  const onhospitalBillPaymentCheckboxChange = (e) => {
    sethospitalBillPayment(e.target.checked);
  };
  const hospitalBillPaymentRequest = ({ file, onSuccess }) => {
    sethospitalBillPaymentfile(file);
    sethospitalBillPayment(true);
    setTime(onSuccess);
  };
  const onhospitalDischargeCheckboxChange = (e) => {
    sethospitalDischarge(e.target.checked);
  };
  const hospitalDischargeRequest = ({ file, onSuccess }) => {
    sethospitalDischargefile(file);
    sethospitalDischarge(true);
    setTime(onSuccess);
  };
  const onpharmacyBillCheckboxChange = (e) => {
    setpharmacyBill(e.target.checked);
  };
  const pharmacyBillRequest = ({ file, onSuccess }) => {
    setpharmacyBillfile(file);
    setpharmacyBill(true);
    setTime(onSuccess);
  };
  const onOperationTheaterCheckboxChange = (e) => {
    setOperationTheater(e.target.checked);
  };
  const OperationTheaterRequest = ({ file, onSuccess }) => {
    setOperationTheaterfile(file);
    setOperationTheater(true);
    setTime(onSuccess);
  };
  const onECGCheckboxChange = (e) => {
    setECG(e.target.checked);
  };
  const ECGRequest = ({ file, onSuccess }) => {
    setECGfile(file);
    setECG(true);
    setTime(onSuccess);
  };
  const onDoctorRequestCheckboxChange = (e) => {
    setDoctorRequest(e.target.checked);
  };
  const DoctorRequestRequest = ({ file, onSuccess }) => {
    setDoctorRequestfile(file);
    setDoctorRequest(true);
    setTime(onSuccess);
  };
  const onInvestgationReportsCheckboxChange = (e) => {
    setInvestgationReports(e.target.checked);
  };
  const InvestgationReportsRequest = ({ file, onSuccess }) => {
    setInvestgationReportsfile(file);
    setInvestgationReports(true);
    setTime(onSuccess);
  };
  const onDoctorprescriptionsCheckboxChange = (e) => {
    setDoctorprescriptions(e.target.checked);
  };
  const DoctorprescriptionsRequest = ({ file, onSuccess }) => {
    setDoctorprescriptionsfile(file);
    setDoctorprescriptions(true);
    setTime(onSuccess);
  };
  const onOthersCheckboxChange = (e) => {
    setOthers(e.target.checked);
  };

  return (
    <div>
      <div className="row d-flex align-items-center justify-content-between">
        <div className="col-lg-12 text-left">
          <div className="breadcrumb-custom mt-4 mb-4">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="#">Home</a>
              </li>
              <li className="breadcrumb-item">
                <a href="#">Claims</a>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                New Claim Request
              </li>
            </ol>
          </div>
        </div>
      </div>

      <div className="row d-flex align-items-center justify-content-between">
        <div className="col-12">
          <div className="heading-with-box">
            <div className="row">
              <div className="col-lg-6 col-md-6 text-left">
                <h3>New Claim Request </h3>
              </div>
              <div className="col-lg-6 col-md-6 text-right">
                <a
                  href=""
                  className="btn"
                  data-toggle="modal"
                  data-target="#addPolicyList"
                >
                  Status : Not Summited
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="faq-custom">
        <div className="accordion" id="faq">
          <div className="card">
            <div className="card-header" id="faqhead1">
              <a
                href="#"
                className="btn btn-header-link"
                data-toggle="collapse"
                data-target="#faq1"
                aria-expanded="true"
                aria-controls="faq1"
              >
                Details of Primary Insured
              </a>
            </div>

            <div
              id="faq1"
              className="collapse show"
              aria-labelledby="faqhead1"
              data-parent="#faq"
            >
              <div className="card-body form-custom">
                <div className="row">
                  {/* <div className="col-12 col-sm-6 col-md-6 col-lg-4">
                                                    <div className="form-group">
                                                        <label htmlFor="exampleInputtext">NS Account No<em style={{color:'red'}}>*</em></label>
                                                        <input type="text" className="form-control" id="exampleInputtext" aria-describedby="textHelp" placeholder=""/>
                                                    </div>
                                                </div> */}
                  <div className="col-12 col-sm-6 col-md-6 col-lg-4">
                    <div className="form-group">
                      <label htmlFor="exampleInputtext">
                        Policy No.<em style={{color:'red'}}>*</em>
                      </label>
                      <select
                     
                        className="form-control"
                        value={policyNo}
                        name="policyNo"
                        onChange={handleChange}
                      >
                        <option>Select Policy Code</option>
                        {policyCode &&
                          policyCode.map((data) => (
                          
                            <option value={data.policyCode}>
                              {data.policyCode}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>
                  <div className="col-12 col-sm-6 col-md-6 col-lg-4">
                    <div className="form-group">
                      <label htmlFor="exampleInputtext">
                        Policy<em style={{color:'red'}}>*</em>
                      </label>
                      <select
                        className="form-control"
                        value={policy}
                        name="policy"
                        onChange={handleChange}
                      >
                          <option>Select Policy Name</option>
                        {policyCode &&
                          policyCode.map((data) => (
                            <option value={data.policyName}>
                              {data.policyName}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 col-sm-6 col-md-6 col-lg-4">
                    <div className="form-group">
                      <label htmlFor="exampleInputtext">
                        Name<em style={{color:'red'}}>*</em>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        value={name}
                        name="name"
                        onChange={handleChange}
                        id="exampleInputtext"
                        aria-describedby="textHelp"
                        placeholder=""
                        required
                      />
                    </div>
                  </div>
                  <div className="col-12 col-sm-6 col-md-6 col-lg-4">
                    <div className="form-group">
                      <label htmlFor="exampleInputtext">
                        Phone No<em style={{color:'red'}}>*</em>
                      </label>
                      <input
                        type="number"
                        min="0"
                        className="form-control"
                        id="exampleInputtext"
                        value={phone}
                        name="phone"
                        onChange={handleChange}
                        aria-describedby="textHelp"
                        placeholder="Enter Phone Number"
                        pattern="[0-9]{12}"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-12 col-sm-6 col-md-6 col-lg-4">
                    <div className="form-group">
                      <label htmlFor="exampleInputEmail1">
                        Email ID<em style={{color:'red'}}>*</em>
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        value={email}
                        name="email"
                        onChange={handleChange}
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder=""
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                    <div className="form-group mb-0">
                      <label htmlFor="exampleInputtext">
                        Address<em style={{color:'red'}}>*</em>
                      </label>
                      <textarea
                        type="text"
                        className="form-control"
                        value={address}
                        name="address"
                        onChange={handleChange}
                        id="exampleInputtext"
                        aria-describedby="textHelp"
                        placeholder=""
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-header" id="faqhead2">
              <a
                href="#"
                className="btn btn-header-link collapsed"
                data-toggle="collapse"
                data-target="#faq2"
                aria-expanded="true"
                aria-controls="faq2"
              >
                Details of Insurance History
              </a>
            </div>

            <div
              id="faq2"
              className="collapse"
              aria-labelledby="faqhead2"
              data-parent="#faq"
            >
              <div className="card-body form-custom">
                <div className="row">
                  <div className="col-12 col-sm-6 col-md-6 col-lg-4">
                    <div className="form-group">
                      <label htmlFor="exampleInputtext">
                        Currently covered by any other Mediclaim / Health
                        Insurance
                      </label>
                      <select
                        className="form-control"
                        value={coveredByOtherInsurance}
                        name="coveredByOtherInsurance"
                        onChange={handleChange}
                      >
                        <option>Yes</option>
                        <option>No</option>
                      </select>
                    </div>
                  </div>
                  {/* <div className="col-12 col-sm-6 col-md-6 col-lg-3">
                    &nbsp;
                  </div> */}
                  <div className="col-12 col-sm-6 col-md-6 col-lg-4" style={{paddingTop:'30px'}}>
                    <div className="form-group">
                      <label htmlFor="exampleInputtext">Diagnosis</label>
                      <input
                        type="text"
                        className="form-control"
                        value={diagnosis}
                        name="diagnosis"
                        onChange={handleChange}
                        id="exampleInputtext"
                        aria-describedby="textHelp"
                        placeholder=""
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 col-sm-6 col-md-6 col-lg-4">
                    <div className="form-group">
                      <label htmlFor="exampleInputtext">
                        If yes, company name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        value={companyname}
                        name="companyname"
                        onChange={handleChange}
                        id="exampleInputtext"
                        aria-describedby="textHelp"
                        placeholder=""
                      />
                    </div>
                  </div>
                  <div className="col-12 col-sm-6 col-md-6 col-lg-4">
                    <div className="form-group">
                      <label htmlFor="exampleInputtext">Policy Number</label>
                      <input
                        type="text"
                        className="form-control"
                        value={policyNumber}
                        name="policyNumber"
                        onChange={handleChange}
                        id="exampleInputtext"
                        aria-describedby="textHelp"
                        placeholder=""
                      />
                    </div>
                  </div>
                  <div className="col-12 col-sm-6 col-md-6 col-lg-4">
                    <div className="form-group">
                      <label htmlFor="exampleInputtext">Sum Insured</label>
                      <input
                        type="text"
                        className="form-control"
                        value={sumInsured}
                        name="sumInsured"
                        onChange={handleChange}
                        id="exampleInputtext"
                        aria-describedby="textHelp"
                        placeholder=""
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-header" id="faqhead3">
              <a
                href="#"
                className="btn btn-header-link collapsed"
                data-toggle="collapse"
                data-target="#faq3"
                aria-expanded="true"
                aria-controls="faq3"
              >
                Details of Insured Person Hospitalized
              </a>
            </div>

            <div
              id="faq3"
              className="collapse"
              aria-labelledby="faqhead3"
              data-parent="#faq"
            >
              <div className="card-body form-custom">
                <div className="row">
                  <div className="col-12 col-sm-6 col-md-6 col-lg-4">
                    <div className="form-group">
                      <label htmlFor="exampleInputtext">
                        Relationship to Primary Insured<em style={{color:'red'}}>*</em>
                      </label>
                      <select
                        className="form-control"
                        value={relationWithInsured}
                        name="relationWithInsured"
                        onChange={handleChange}
                      >
                        <option>Self</option>
                        <option>Mother</option>
                        <option>Father</option>
                        <option>Spouse/Husband</option>
                        <option>sibling</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-12 col-sm-6 col-md-6 col-lg-4">
                    <div className="form-group">
                      <label htmlFor="exampleInputtext">
                        Name<em style={{color:'red'}}>*</em>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        value={relationName}
                        name="relationName"
                        onChange={handleChange}
                        id="exampleInputtext"
                        aria-describedby="textHelp"
                        placeholder=""
                        required
                      />
                    </div>
                  </div>
                  <div className="col-12 col-sm-6 col-md-6 col-lg-4">
                    <div className="form-group">
                      <label htmlFor="exampleInputtext">
                        Gender<em style={{color:'red'}}>*</em>
                      </label>
                      <select
                        className="form-control"
                        value={relationGender}
                        name="relationGender"
                        onChange={handleChange}
                      >
                        <option>Male</option>
                        <option>Female</option>
                        <option>other</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 col-sm-6 col-md-6 col-lg-4">
                    <div className="form-group">
                      <label htmlFor="exampleInputtext">
                        Date of Birth<em style={{color:'red'}}>*</em>
                      </label>
                      <input
                        className="form-control"
                        type="date"
                        value={relationDOB}
                        name="relationDOB"
                        onChange={handleChange}
                        id="example-input"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-12 col-sm-6 col-md-6 col-lg-4">
                    <div className="form-group">
                      <label htmlFor="exampleInputtext">
                        Age<em style={{color:'red'}}>*</em>
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        value={relationAge}
                        name="relationAge"
                        onChange={handleChange}
                        id="exampleInputtext"
                        aria-describedby="textHelp"
                        placeholder=""
                        min="1" max="100"
                      />
                    </div>
                  </div>
                  <div className="col-12 col-sm-6 col-md-6 col-lg-4">
                    <div className="form-group">
                      <label htmlFor="exampleInputtext">
                        Occupation<em style={{color:'red'}}>*</em>
                      </label>
                      <select
                        className="form-control"
                        value={relationOccupation}
                        name="relationOccupation"
                        onChange={handleChange}
                      >
                        <option>Business</option>
                        <option>Job</option>
                        <option>Studying</option>
                        <option>Unemployed</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                    <div className="form-group">
                      <label htmlFor="exampleInputtext">
                        Address<em style={{color:'red'}}>*</em>
                      </label>
                      <textarea
                        type="text"
                        className="form-control"
                        value={relationAddress}
                        name="relationAddress"
                        onChange={handleChange}
                        id="exampleInputtext"
                        aria-describedby="textHelp"
                        placeholder=""
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 col-sm-6 col-md-6 col-lg-4">
                    <div className="form-group">
                      <label htmlFor="exampleInputtext">
                        Phone No<em style={{color:'red'}}>*</em>
                      </label>
                      <input
                        type="number"
                        min="0"
                        className="form-control"
                        value={relationPhone}
                        name="relationPhone"
                        onChange={handleChange}
                        id="exampleInputtext"
                        aria-describedby="textHelp"
                        placeholder=""
                        pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" required
                      
                      />
                    </div>
                  </div>
                  <div className="col-12 col-sm-6 col-md-6 col-lg-4">
                    <div className="form-group">
                      <label htmlFor="exampleInputEmail1">
                        Email ID<em style={{color:'red'}}>*</em>
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        value={relationEmail}
                        name="relationEmail"
                        onChange={handleChange}
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder=""
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-header" id="faqhead4">
              <a
                href="#"
                className="btn btn-header-link collapsed"
                data-toggle="collapse"
                data-target="#faq4"
                aria-expanded="true"
                aria-controls="faq4"
              >
                Details of Hospitalization
              </a>
            </div>

            <div
              id="faq4"
              className="collapse"
              aria-labelledby="faqhead4"
              data-parent="#faq"
            >
              <div className="card-body form-custom">
                <div className="row">
                  <div className="col-12 col-sm-6 col-md-6 col-lg-8">
                    <div className="form-group">
                      <label htmlFor="exampleInputtext">
                        Name of Hospital where Admited<em style={{color:'red'}}>*</em>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        value={hospitalName}
                        name="hospitalName"
                        onChange={handleChange}
                        id="exampleInputtext"
                        aria-describedby="textHelp"
                        placeholder=""
                      />
                    </div>
                  </div>
                  <div className="col-12 col-sm-6 col-md-6 col-lg-4">
                    <div className="form-group">
                      <label htmlFor="exampleInputtext">
                        Room Category occupied<em style={{color:'red'}}>*</em>
                      </label>
                      <select
                        className="form-control"
                        value={roomCategory}
                        name="roomCategory"
                        onChange={handleChange}
                      >
                        <option>Single occupancy</option>
                        <option>Multiple occupancy</option>

                      </select>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 col-sm-6 col-md-6 col-lg-4">
                    <div className="form-group">
                      <label htmlFor="exampleInputtext">
                        Hospitalization due to<em style={{color:'red'}}>*</em>
                      </label>
                      <select
                        className="form-control"
                        value={reason}
                        name="reason"
                        onChange={handleChange}
                      >
                        <option>Accident</option>
                        <option>Health Illness</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-12 col-sm-6 col-md-6 col-lg-4">
                    <div className="form-group">
                      <label htmlFor="exampleInputtext">
                        If injury give cause<em style={{color:'red'}}>*</em>
                      </label>
                      <select
                        className="form-control"
                        value={injuryCause}
                        name="injuryCause"
                        onChange={handleChange}
                        required
                      >
                        <option>Road Traffic Accident</option>
                        <option>Accident at Work</option>
                        <option>Sports Related Injuries</option>
                        <option>Accident Involving Animals</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-12 col-sm-6 col-md-6 col-lg-4">
                    <div className="form-group">
                      <label htmlFor="exampleInputtext">
                        Date of Injury<em style={{color:'red'}}>*</em>
                      </label>
                      <input
                        className="form-control"
                        type="Date"
                        value={dateInjury}
                        name="dateInjury"
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 col-sm-6 col-md-6 col-lg-4">
                    <div className="form-group">
                      <label htmlFor="exampleInputtext">
                        Date of Admission<em style={{color:'red'}}>*</em>
                      </label>
                      <input
                        className="form-control"
                        type="date"
                        value={dateAdmission}
                        name="dateAdmission"
                        onChange={handleChange}
                        id="example-input"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-12 col-sm-6 col-md-6 col-lg-4">
                    <div className="form-group">
                      <label htmlFor="exampleInputtext">
                        Date of Discharge<em style={{color:'red'}}>*</em>
                      </label>
                      <input
                        className="form-control"
                        type="date"
                        value={dateDischarge}
                        name="dateDischarge"
                        onChange={handleChange}
                        id="example-input"
                        required
                      />
                    </div>
                  </div>
                  {/* <div className="col-12 col-sm-6 col-md-6 col-lg-4">
                                                    <div className="form-group">
                                                        <label htmlFor="exampleInputtext">Date of Injury<em style={{color:'red'}}>*</em></label>
                                                        <select className="form-control"
                                                        value={relationWithInsured}
                                                        name="relationWithInsured"
                                                        onChange={handleChange}>
                                                            <option>Date of Injury</option>
                                                            <option>Date of Injury</option>
                                                        </select>
                                                    </div>
                                                </div> */}
                </div>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-header" id="faqhead5">
              <a
                href="#"
                className="btn btn-header-link collapsed"
                data-toggle="collapse"
                data-target="#faq5"
                aria-expanded="true"
                aria-controls="faq5"
              >
                Details of Claim
              </a>
            </div>

            <div
              id="faq5"
              className="collapse"
              aria-labelledby="faqhead5"
              data-parent="#faq"
            >
              <div className="card-body form-custom">
                <div className="row">
                  <div className="col-12">
                    <h6>Details of the Treatment expenses claimed</h6>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 col-sm-4 col-md-4 col-lg-4">
                    <div className="form-group">
                      <label htmlFor="exampleInputtext">
                        Pre -hospitalization expenses
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        value={preHospitalExpense}
                        name="preHospitalExpense"
                        onChange={handleChange}
                        id="exampleInputtext"
                        aria-describedby="textHelp"
                        placeholder=""
                        min='0'
                      />
                    </div>
                  </div>
                  <div className="col-12 col-sm-4 col-md-4 col-lg-4">
                    <div className="form-group">
                      <label htmlFor="exampleInputtext">
                        Hospitalization expenses
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        value={hospitalExpense}
                        name="hospitalExpense"
                        onChange={handleChange}
                        id="exampleInputtext"
                        aria-describedby="textHelp"
                        placeholder=""
                        min='0'
                      />
                    </div>
                  </div>
                  <div className="col-12 col-sm-4 col-md-4 col-lg-4">
                    <div className="form-group">
                      <label htmlFor="exampleInputtext">
                        Post-hospitalization expenses
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        value={postHospitalExpense}
                        name="postHospitalExpense"
                        onChange={handleChange}
                        id="exampleInputtext"
                        aria-describedby="textHelp"
                        placeholder=""
                        min='0'
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 col-sm-4 col-md-4 col-lg-4">
                    <div className="form-group">
                      <label htmlFor="exampleInputtext">
                        Health-Check up cost
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        value={healthCheckupExpense}
                        name="healthCheckupExpense"
                        onChange={handleChange}
                        id="exampleInputtext"
                        aria-describedby="textHelp"
                        placeholder=""
                        min='0'
                      />
                    </div>
                  </div>
                  <div className="col-12 col-sm-4 col-md-4 col-lg-4">
                    <div className="form-group">
                      <label htmlFor="exampleInputtext">
                        Ambulance Charges
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        value={ambulanceExpense}
                        name="ambulanceExpense"
                        onChange={handleChange}
                        id="exampleInputtext"
                        aria-describedby="textHelp"
                        placeholder=""
                        min='0'
                      />
                    </div>
                  </div>
                  <div className="col-12 col-sm-4 col-md-4 col-lg-4">
                    <div className="form-group">
                      <label htmlFor="exampleInputtext">Others Charges</label>
                      <input
                        type="number"
                        className="form-control"
                        value={otherExpense}
                        name="otherExpense"
                        onChange={handleChange}
                        id="exampleInputtext"
                        aria-describedby="textHelp"
                        placeholder=""
                        min='0'
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  {/* <div className="col-12 col-sm-4 col-md-4 col-lg-4">&nbsp;</div>
                    <div className="col-12 col-sm-4 col-md-4 col-lg-4">&nbsp;</div> */}
                  <div className="col-12 col-sm-4 col-md-4 col-lg-4">
                    <div className="form-group">
                      <label htmlFor="exampleInputtext">Total</label>
                      <input
                        type="number"
                        className="form-control"
                        value={otherExpense}
                        name="otherExpense"
                        onChange={handleChange}
                        id="exampleInputtext"
                        aria-describedby="textHelp"
                        placeholder=""
                        min='0'
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 col-sm-4 col-md-4 col-lg-4">
                    <div className="form-group">
                      <label htmlFor="exampleInputtext">
                        Pre -hospitalization period
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        value={preHospitalDuration}
                        name="preHospitalDuration"
                        onChange={handleChange}
                        id="exampleInputtext"
                        aria-describedby="textHelp"
                        placeholder=""
                      />
                    </div>
                  </div>
                  <div className="col-12 col-sm-4 col-md-4 col-lg-4">
                    <div className="form-group">
                      <label htmlFor="exampleInputtext">
                        Post -hospitalization period
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        value={postHospitaDuration}
                        name="postHospitaDuration"
                        onChange={handleChange}
                        id="exampleInputtext"
                        aria-describedby="textHelp"
                        placeholder=""
                      />
                    </div>
                  </div>
                  <div className="col-12 col-sm-4 col-md-4 col-lg-4">
                    <div className="form-group">
                      <label htmlFor="exampleInputtext">
                        Post-hospitalization expenses
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        value={postHospitalExpense}
                        name="postHospitalExpense"
                        onChange={handleChange}
                        id="exampleInputtext"
                        aria-describedby="textHelp"
                        placeholder=""
                        min='0'
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    <h6 className="mt-4">
                      Details of Lump sum / cash benefit claimed
                    </h6>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 col-sm-4 col-md-4 col-lg-4">
                    <div className="form-group">
                      <label htmlFor="exampleInputtext">
                        Hospital Daily cash
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        value={hospitalDailyCash}
                        name="hospitalDailyCash"
                        onChange={handleChange}
                        id="exampleInputtext"
                        aria-describedby="textHelp"
                        placeholder=""
                        min='0'
                      />
                    </div>
                  </div>
                  <div className="col-12 col-sm-4 col-md-4 col-lg-4">
                    <div className="form-group">
                      <label htmlFor="exampleInputtext">Surgical Cash</label>
                      <input
                        type="number"
                        className="form-control"
                        value={surgicalCash}
                        name="surgicalCash"
                        onChange={handleChange}
                        id="exampleInputtext"
                        aria-describedby="textHelp"
                        placeholder=""
                        min='0'
                      />
                    </div>
                  </div>
                  <div className="col-12 col-sm-4 col-md-4 col-lg-4">
                    <div className="form-group">
                      <label htmlFor="exampleInputtext">
                        Critical Illness benefit
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        value={criticalIllnessbenefit}
                        name="criticalIllnessbenefit"
                        onChange={handleChange}
                        id="exampleInputtext"
                        aria-describedby="textHelp"
                        placeholder=""
                        min='0'
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 col-sm-4 col-md-4 col-lg-4">
                    <div className="form-group">
                      <label htmlFor="exampleInputtext">Convalescence</label>
                      <input
                        type="number"
                        className="form-control"
                        value={convalescence}
                        name="convalescence"
                        onChange={handleChange}
                        id="exampleInputtext"
                        aria-describedby="textHelp"
                        placeholder=""
                        min='0'
                      />
                    </div>
                  </div>
                  <div className="col-12 col-sm-4 col-md-4 col-lg-4">
                    <div className="form-group">
                      <label htmlFor="exampleInputtext">Lump sum benefit</label>
                      <input
                        type="text"
                        className="form-control"
                        value={lumpSumBenefit}
                        name="lumpSumBenefit"
                        onChange={handleChange}
                        id="exampleInputtext"
                        aria-describedby="textHelp"
                        placeholder=""
                      />
                    </div>
                  </div>
                  <div className="col-12 col-sm-4 col-md-4 col-lg-4">
                    <div className="form-group">
                      <label htmlFor="exampleInputtext">Others Charges</label>
                      <input
                        type="number"
                        className="form-control"
                        value={otherCharges}
                        name="otherCharges"
                        onChange={handleChange}
                        id="exampleInputtext"
                        aria-describedby="textHelp"
                        placeholder=""
                        min='0'
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  {/* <div className="col-12 col-sm-4 col-md-4 col-lg-4">&nbsp;</div>
                    <div className="col-12 col-sm-4 col-md-4 col-lg-4">&nbsp;</div> */}
                  <div className="col-12 col-sm-4 col-md-4 col-lg-4">
                    <div className="form-group">
                      <label htmlFor="exampleInputtext">Total</label>
                      <input
                        type="number"
                        className="form-control"
                        value={lumpSumBenefitDetail}
                        name="lumpSumBenefitDetail"
                        onChange={handleChange}
                        id="exampleInputtext"
                        aria-describedby="textHelp"
                        placeholder=""
                        min='0'
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-header" id="faqhead6">
              <a
                href="#"
                className="btn btn-header-link collapsed"
                data-toggle="collapse"
                data-target="#faq6"
                aria-expanded="true"
                aria-controls="faq6"
              >
                Claim Documents Submitted - Check List
              </a>
            </div>
            <Form.Group>
              <div
                id="faq6"
                className="collapse"
                aria-labelledby="faqhead6"
                data-parent="#faq"
              >
                <div className="card-body form-custom">
                  <div className="row">
                    <div className="col-12 col-sm-6 col-md-6 col-lg-6">
                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input mt-2"
                          id="exampleCheck1"
                          onChange={onclaimFormDulyCheckboxChange}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="exampleCheck1"
                        >
                          Claim form duly signed
                        </label>
                      </div>
                    </div>
                    <div className="col-12 col-sm-6 col-md-6 col-lg-6">
                      {/* <div className="file btn btn-lg btn-primary float-right mb-3"> */}
                      <Form.Control
                        type="file"
                        id="file"
                        accept="image/png, image/jpeg,.pdf"
                        // className={classes.fileInput}
                        onChange={onClaimChange}
                      ></Form.Control>
                      {/* </div>   */}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 col-sm-6 col-md-6 col-lg-6">
                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input mt-2"
                          id="exampleCheck1"
                          onChange={oncopyOfClaimCheckboxChange}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="exampleCheck1"
                        >
                          Copy of the claim intimation, if any
                        </label>
                      </div>
                    </div>
                    <div className="col-12 col-sm-6 col-md-6 col-lg-6">
                      {/* <div className="file btn btn-lg btn-primary float-right mb-3"> */}
                      <Form.Control
                        type="file"
                        id="file"
                        accept="image/png, image/jpeg,.pdf,.doc,.docx,.xml,application/msword,
                        application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                        // className={classes.fileInput}
                        onChange={onCopyChange}
                      ></Form.Control>
                      {/* </div>   */}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 col-sm-6 col-md-6 col-lg-6">
                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input mt-2"
                          id="exampleCheck1"
                          onChange={onhospitalMainBillCheckboxChange}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="exampleCheck1"
                        >
                          Hospital Main Bill
                        </label>
                      </div>
                    </div>
                    <div className="col-12 col-sm-6 col-md-6 col-lg-6">
                      {/* <div className="file btn btn-lg btn-primary float-right mb-3"> */}
                      <Form.Control
                        type="file"
                        id="file"
                        accept="image/png, image/jpeg,.pdf,.doc,.docx,.xml,application/msword,
                        application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                        // className={classes.fileInput}
                        onChange={onMainChange}
                      ></Form.Control>
                      {/* </div>   */}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 col-sm-6 col-md-6 col-lg-6">
                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input mt-2"
                          id="exampleCheck1"
                          onChange={onhospitalBreakupCheckboxChange}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="exampleCheck1"
                        >
                          Hospital Break-up Bill
                        </label>
                      </div>
                    </div>
                    <div className="col-12 col-sm-6 col-md-6 col-lg-6">
                      {/* <div className="file btn btn-lg btn-primary float-right mb-3"> */}
                      <Form.Control
                        type="file"
                        id="file"
                        accept="image/png, image/jpeg,.pdf,.doc,.docx,.xml,application/msword,
                        application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                        // className={classes.fileInput}
                        onChange={onBreakChange}
                      ></Form.Control>
                      {/* </div>   */}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 col-sm-6 col-md-6 col-lg-6">
                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input mt-2"
                          id="exampleCheck1"
                          onChange={onhospitalBillPaymentCheckboxChange}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="exampleCheck1"
                        >
                          Hospital Bill Payment Receipt
                        </label>
                      </div>
                    </div>
                    <div className="col-12 col-sm-6 col-md-6 col-lg-6">
                      {/* <div className="file btn btn-lg btn-primary float-right mb-3"> */}
                      <Form.Control
                        type="file"
                        id="file"
                        accept="image/png, image/jpeg,.pdf,.doc,.docx,.xml,application/msword,
                        application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                        // className={classes.fileInput}
                        onChange={onBillChange}
                      ></Form.Control>
                      {/* </div>   */}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 col-sm-6 col-md-6 col-lg-6">
                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input mt-2"
                          id="exampleCheck1"
                          onChange={onhospitalDischargeCheckboxChange}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="exampleCheck1"
                        >
                          Hospital Discharge Summary
                        </label>
                      </div>
                    </div>
                    <div className="col-12 col-sm-6 col-md-6 col-lg-6">
                      {/* <div className="file btn btn-lg btn-primary float-right mb-3"> */}
                      <Form.Control
                        type="file"
                        id="file"
                        accept="image/png, image/jpeg,.pdf,.doc,.docx,.xml,application/msword,
                        application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                        // className={classes.fileInput}
                        onChange={onDischargeChange}
                      ></Form.Control>
                      {/* </div>   */}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 col-sm-6 col-md-6 col-lg-6">
                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input mt-2"
                          id="exampleCheck1"
                          onChange={onpharmacyBillCheckboxChange}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="exampleCheck1"
                        >
                          Pharmacy Bill
                        </label>
                      </div>
                    </div>
                    <div className="col-12 col-sm-6 col-md-6 col-lg-6">
                      {/* <div className="file btn btn-lg btn-primary float-right mb-3"> */}
                      <Form.Control
                        type="file"
                        id="file"
                        accept="image/png, image/jpeg,.pdf,.doc,.docx,.xml,application/msword,
                        application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                        // className={classes.fileInput}
                        onChange={onPharmacyChange}
                      ></Form.Control>
                      {/* </div>   */}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 col-sm-6 col-md-6 col-lg-6">
                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input mt-2"
                          id="exampleCheck1"
                          onChange={onOperationTheaterCheckboxChange}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="exampleCheck1"
                        >
                          Operation Theater Notes
                        </label>
                      </div>
                    </div>
                    <div className="col-12 col-sm-6 col-md-6 col-lg-6">
                      {/* <div className="file btn btn-lg btn-primary float-right mb-3"> */}
                      <Form.Control
                        type="file"
                        id="file"
                        accept="image/png, image/jpeg,.pdf,.doc,.docx,.xml,application/msword,
                        application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                        // className={classes.fileInput}
                        onChange={onOperationChange}
                      ></Form.Control>
                      {/* </div>   */}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 col-sm-6 col-md-6 col-lg-6">
                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input mt-2"
                          id="exampleCheck1"
                          onChange={onECGCheckboxChange}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="exampleCheck1"
                        >
                          ECG
                        </label>
                      </div>
                    </div>
                    <div className="col-12 col-sm-6 col-md-6 col-lg-6">
                      {/* <div className="file btn btn-lg btn-primary float-right mb-3"> */}
                      <Form.Control
                        type="file"
                        id="file"
                        accept="image/png, image/jpeg,.pdf,.doc,.docx,.xml,application/msword,
                        application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                        // className={classes.fileInput}
                        onChange={onECGChange}
                      ></Form.Control>
                      {/* </div>   */}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 col-sm-6 col-md-6 col-lg-6">
                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input mt-2"
                          id="exampleCheck1"
                          onChange={onDoctorRequestCheckboxChange}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="exampleCheck1"
                        >
                          Doctor's request for investigation
                        </label>
                      </div>
                    </div>
                    <div className="col-12 col-sm-6 col-md-6 col-lg-6">
                      {/* <div className="file btn btn-lg btn-primary float-right mb-3"> */}
                      <Form.Control
                        type="file"
                        id="file"
                        accept="image/png, image/jpeg,.pdf,.doc,.docx,.xml,application/msword,
                        application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                        // className={classes.fileInput}
                        onChange={onDoctosChange}
                      ></Form.Control>
                      {/* </div>   */}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 col-sm-6 col-md-6 col-lg-6">
                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input mt-2"
                          id="exampleCheck1"
                          onChange={onInvestgationReportsCheckboxChange}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="exampleCheck1"
                        >
                          Investigation Reports (Including CT/ MRI / USG / HPE)
                        </label>
                      </div>
                    </div>
                    <div className="col-12 col-sm-6 col-md-6 col-lg-6">
                      {/* <div className="file btn btn-lg btn-primary float-right mb-3"> */}
                      <Form.Control
                        type="file"
                        id="file"
                        accept="image/png, image/jpeg,.pdf,.doc,.docx,.xml,application/msword,
                        application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                        // className={classes.fileInput}
                        onChange={onInvesChange}
                      ></Form.Control>
                      {/* </div>   */}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 col-sm-6 col-md-6 col-lg-6">
                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input mt-2"
                          id="exampleCheck1"
                          onChange={onDoctorprescriptionsCheckboxChange}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="exampleCheck1"
                        >
                          Doctor's Prescriptions
                        </label>
                      </div>
                    </div>
                    <div className="col-12 col-sm-6 col-md-6 col-lg-6">
                      {/* <div className="file btn btn-lg btn-primary float-right mb-3"> */}
                      <Form.Control
                        type="file"
                        id="file"
                        accept="image/png, image/jpeg,.pdf,.doc,.docx,.xml,application/msword,
                        application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                        // className={classes.fileInput}
                        onChange={onPrescriptionChange}
                      ></Form.Control>
                      {/* </div>   */}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 col-sm-6 col-md-6 col-lg-6">
                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input mt-2"
                          id="exampleCheck1"
                          onChange={onOthersCheckboxChange}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="exampleCheck1"
                        >
                          Other
                        </label>
                      </div>
                    </div>
                    <div className="col-12 col-sm-6 col-md-6 col-lg-6">
                      {/* <div className="file btn btn-lg btn-primary float-right mb-3"> */}
                      <Form.Control
                        type="file"
                        id="file"
                        accept="image/png, image/jpeg,.pdf,.doc,.docx,.xml,application/msword,
                        application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                        // className={classes.fileInput}
                        onChange={handleotherFileChange}
                      ></Form.Control>
                      {/* </div>   */}
                    </div>
                  </div>
                </div>
              </div>
            </Form.Group><br/>
            <div style={{display:'flex',justifyContent:'center'}}>
            <h6 style={{ color: "red"}}>
              {ErrorMsg}
            </h6>
            </div>
          </div>

          <div>
            <div className="col-12 col-sm-6 col-md-6 col-lg-4" style={{display:'flex', marginBottom:"40px"}}>
              <button
                className="btn btn-primary w-100 mt-2 ml-0"
                name="submit"
                type="submit"
                data-toggle="modal"
                data-target="#exampleModalCenter"
                onClick={handleSubmit}
              >
                submit
              </button>

              <button
                className="btn btn-primary w-100 mt-2 ml-4"
                name="submit"
                type="submit"
                data-toggle="modal"
                data-target="#exampleModalCenter"
                onClick={() => props.handleBack()}
              >
                cancel
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}
      {/* </div> */}
    </div>
  );
};
export default NewClaim2;
