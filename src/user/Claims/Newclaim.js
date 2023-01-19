import React, { useState, useEffect } from "react";
import {
  Collapse,
  Button,
  Input,
  Select,
  Checkbox,
  Upload,
  message,
  Form,
  DatePicker,
} from "antd";

import {
  getAllUserPolicyList,
  getAddClaim,
} from "../../services/authentication";

import { UploadOutlined } from "@ant-design/icons";
import "./NewClaim.style.css";

const { Panel } = Collapse;
const { Option, OptGroup } = Select;
const layout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 12 },
    md: { span: 8 },
    lg: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 },
    md: { span: 12 },
    lg: { span: 12 },
  },
  breakpointwidth: {
    xs: "480px",
    sm: "576px",
    md: "768px",
    lg: "992px",
    xl: "1200px",
    xxl: "1600px",
  },
};
//response ness in button
const tailLayout = {
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12, offset: 12 },
    md: { span: 12, offset: 8 },
    lg: { span: 12, offset: 8 },
  },
};
/// end.

const values = {
  name: "file",
  action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  maxCount: 1,
  headers: {
    authorization: "authorization-text",
  },
  beforeUpload: (file) => {
    var fileTypes = [".png", ".jpg", ".jpeg", ".pdf"];
    const isPNG = fileTypes.includes(file.type);
    if (!isPNG) {
      message.error(`${file.name} is not a png file`);
    }
    return isPNG || Upload.LIST_IGNORE;
  },
  progress: {
    strokeColor: {
      "0%": "#108ee9",
      "100%": "#87d068",
    },
    strokeWidth: 3,
    format: (percent) => `${parseFloat(percent.toFixed(2))}%`,
  },
};




const Newclaim = (props) => {
  const [form] = Form.useForm();

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

  const [claimFormFile, setClaimFormfile] = useState({ selectedFile: null,selectedFileList: []});
  const [copyOfClaimFile, setcopyOfClaimfile] = useState({ selectedFile: null,selectedFileList: []});
  const [hospitalMainBillFile, sethospitalMainBillfile] = useState({ selectedFile: null,selectedFileList: []});
  const [hospitalBreakupFile, sethospitalBreakupfile] = useState({ selectedFile: null,selectedFileList: []});
  const [hospitalBillPaymentFile, sethospitalBillPaymentfile] = useState({ selectedFile: null,selectedFileList: []});
  const [hospitalDischargeFile, sethospitalDischargefile] = useState({ selectedFile: null,selectedFileList: []});
  const [pharmacyBillFile, setpharmacyBillfile] = useState({ selectedFile: null,selectedFileList: []});
  const [OperationTheaterFile, setOperationTheaterfile] = useState({ selectedFile: null,selectedFileList: []});
  const [ECGFile, setECGfile] = useState({ selectedFile: null,selectedFileList: []});
  const [DoctorRequestFile, setDoctorRequestfile] = useState({ selectedFile: null,selectedFileList: []});
  const [InvestgationReportsFile, setInvestgationReportsfile] = useState({ selectedFile: null,selectedFileList: []});
  const [DoctorprescriptionsFile, setDoctorprescriptionsfile] = useState({ selectedFile: null,selectedFileList: []});
  const [OthersFile, setOthersfile] = useState({ selectedFile: null,selectedFileList: []});
  const [file,setFile]=useState('')
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

  const handleFileChange = (event)=>{
      console.log("ff",event)
      setFile(event.target.files);
      console.log("ff",file)

  }
  const onFinish = async (values) => {
    const policyNum =
      getAllUserPolicyLI &&
      getAllUserPolicyLI.filter(
        (data) => data.policy.policyCode === values.policy_No
      )[0];
    console.log("policyNum", policyNum);
    const formData = new FormData();
    console.log("ot",file)
    console.log("otfile",formData)
      formData.append("userPolicy_id", policyNum.id);
     formData.append("name",values.name);
      formData.append("phone",values.phone);
      formData.append("email",values.email);
      formData.append("address",values.address);
      formData.append ("policy",values.PolicyName);
       formData.append ("policyNo",values.policy_No);
      formData.append ("coveredByOtherInsurance",values.healthINs);
      formData.append ("diagnosis",values.diagnosis);
      formData.append ("companyName",values.companyname)
      // formData.append ("sumInsured",sumInsured);
      formData.append ("relationWithInsured",values.person_relation);
      formData.append ("relationName" , values.person_Name);
      formData.append ("relationGender", values.person_Gender);
      formData.append ("relationDOB" , person_dateofBirth);
      formData.append ("relationAge",values.person_Age);
      formData.append ("relationOccupation" , values.person_Occupation);
      formData.append ("relationAddress",values.person_address);
      formData.append ("relationPhone" , values.person_Phone);
      formData.append ("relationEmail",values.person_Email);
      formData.append ("hospitalName",values.hospitalization_Addres);
      formData.append ("roomCategory",values.hospitalization_room);
      // formData.append ("reason",claimreason);
      formData.append ("injuryCause",  values.Injury_given_cause);
      formData.append ("dateInjury",  hospitalization_dateofInjury);
      formData.append ("dateAdmission",  hospitalization_Addmission);
      formData.append ("dateDischarge" , hospitalization_Discharge);
      formData.append ("preHospitalExpense",  values.Pre_hospitalization_exp);
      formData.append ("hospitalExpense" , values.hospitalization_exp);
      // formData.append ("postHospitalExpense",  postHospitalExpense);
      formData.append ("healthCheckupExpense" , values.Health_check);
      formData.append ("ambulanceExpense",  values.Ambulance);
      formData.append ("otherExpense" , values.clami_other_charges);
      formData.append ("preHospitalDuration",  values.Pre_hospitalization_period);
      // formData.append ("postHospitaDuration" , postHospitalExpense);
      formData.append ("hospitalDailyCash",  values.hospital_daily_cash);
      formData.append ("surgicalCash" , values.surgical_cash);
      formData.append ("criticalIllnessbenefit",  values.critical_Illness_benefit);
      formData.append ("convalescence"  ,values.convalescence);
      // formData.append ("lumpSumBenefit",  lumpSumBenefit);
      formData.append ("otherCharges" , values.other_charges);
      formData.append ("lumpSumBenefitDetail",  values.lumo_Sum_Total);
      formData.append ("token",Token);
      formData.append ("claimFormFile" , claimFormFile.selectedFile);
      formData.append ("claimCopyFormFile",  copyOfClaimFile.selectedFile);
      formData.append ("hospitalMainBillFile" , hospitalMainBillFile.selectedFile);
      formData.append ("hospitalBreakupFile",  hospitalBreakupFile.selectedFile);
      formData.append ("hospitalBillPaymentFile", JSON.stringify(hospitalBillPaymentFile.selectedFile));
      // formData.append ("hospitalBillPaymentFile",  hospitalBillPaymentFile.selectedFile);
      formData.append ("hospitalDischargeFile" , hospitalDischargeFile.selectedFile);
      formData.append ("pharmacyBillFile",  pharmacyBillFile.selectedFile);
      formData.append ("OperationTheaterFile",  OperationTheaterFile.selectedFile);
      formData.append ("ECGFile",  ECGFile.selectedFile);
      formData.append ("DoctorRequestFile" , DoctorRequestFile.selectedFile);
      formData.append ("InvestgationReportsFile",  InvestgationReportsFile.selectedFile);
      formData.append ("DoctorprescriptionsFile", DoctorprescriptionsFile.selectedFile);
      // formData.append ("OthersFile",OthersFile.selectedFile);
      formData.append("file",file)
    

    try {
      const resp = await getAddClaim(formData);
      console.log("record added successfuly");
      handleBack();
    } catch (error) {
      console.log("error", error);
      // showAlert('In valide data', "error");
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
  // useEffect(() => {
  //   form.validateFields(['nickname']);
  // }, [claimForm]);
  const onclaimFormDulyCheckboxChange = (e) => {
    setclaimForm(e.target.checked);
  };
  const claimFormDulyRequest = ({ file, onSuccess }) => {
    setClaimFormfile(file);
    console.log("file", file);
    setclaimForm(true);
    setTime(onSuccess);
  };
  //  useEffect(() => {
  //   form.validateFields(['nickname']);
  // }, [claimForm]);
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
  const OthersRequest = ({ file, onSuccess }) => {
    console.log('file',file,onSuccess)
   
    setTime(onSuccess);
  };
  const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };
  const handledUpload = (info,fileList) =>{
    const nextState = {};
    console.log('info',info,fileList)
    switch (info.file.status) {
      case "uploading":
        nextState.selectedFileList = [info.file];
        break;
      case "done":
        nextState.selectedFile = info.file;
        nextState.selectedFileList = [info.file];
        break;
      default:
        // error or removed
        nextState.selectedFile = null;
        nextState.selectedFileList = [];
    }
    return nextState
  }
  const onChange = info => {
    setOthersfile(handledUpload(info));
    setOthers(true);
  };
  const onClaimChange = info =>{
    setClaimFormfile(handledUpload(info));
    setclaimForm(true);
  }
const onCopyChange = info =>{
  setcopyOfClaimfile(handledUpload(info))
  setcopyOfClaim(true)
}
const onMainChange = info =>{
  sethospitalMainBillfile(handledUpload(info))
  sethospitalMainBill(true)
}
const onBreakChange = info =>{
  sethospitalBreakupfile(handledUpload(info))
  sethospitalBreakup(true)

} 
const onBillChange =info =>{
  sethospitalBillPaymentfile(handledUpload(info))
  sethospitalBillPayment(true)
} 
const onDischargeChange = info =>{
  sethospitalDischargefile(handledUpload(info))
  sethospitalDischarge(true)
}
const onPharmacyChange = info =>{
  setpharmacyBillfile(handledUpload(info))
  setpharmacyBill(true)
}
const onOperationChange = info =>{
  setOperationTheaterfile(handledUpload(info))
  setOperationTheater(true)
}
const onECGChange = info =>{
  setECGfile(handledUpload(info))
  setECG(true)
}
const onDoctosChange = info =>{
  setDoctorRequestfile(handledUpload(info))
  setDoctorRequest(true)
}
const onInvesChange = info =>{
  setInvestgationReportsfile(handledUpload(info))
  setInvestgationReports(true)
}
const onPrescriptionChange = info =>{
  setDoctorprescriptionsfile(handledUpload(info))
  setDoctorprescriptions(true)
}

  
  return (
    <div className="container-fluid" style={{ paddingTop: "30px" }}>
      <Form  col={{ span: 8 }}
          wrapperCol={{ span: 16 }}
        
        onFinish={onFinish}
        //  onFinishFailed={onFinishFailed}
        method="post" enctype="multipart/form-data">
        <Collapse
          col={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{
            border: "none",
            borderRadius: "3px",
            backgroundColor: "#8EC131",
            boxShadow: "none",
          }}
          expandIconPosition="right"
          defaultActiveKey={["1"]}
          onChange={null}
        >
          <Panel header="Details of Primary Insured" key="1"  col={{ span: 8 }}
          wrapperCol={{ span: 16 }}>
            <div className="ant-row">
              <div>
                <label>policy No *</label>
                <Form.Item
                  name="policy_No"
                  style={{ width: "250px" }}
                  rules={[
                    {
                      required: true,
                      message: "Policy is required",
                    },
                  ]}
                >
                  <Select
                    placeholder="Select a option"
                    // onChange={onGenderChange}
                    allowClear
                  >
                    {policyCode &&
                      policyCode.map((data) => (
                        <Option value={data.policyCode}>
                          {data.policyCode}
                        </Option>
                      ))}
                  </Select>
                </Form.Item>
              </div>
              <div>
                <label>Policy *</label>
                <Form.Item
                  name="PolicyName"
                  style={{ width: "250px" }}
                  rules={[
                    {
                      required: true,
                      message: "Policy is required",
                    },
                  ]}
                >
                  <Select
                    placeholder="Select a option"
                    // onChange={onGenderChange}
                    allowClear
                  >
                    {policyCode &&
                      policyCode.map((data) => (
                        <Option value={data.policyName}>
                          {data.policyName}
                        </Option>
                      ))}
                  </Select>
                </Form.Item>
              </div>
              <div>
                <label>Name *</label>
                <Form.Item
                  name={"name"}
                  style={{ width: "250px" }}
                  rules={[
                    {
                      required: true,
                      message: "Please Enter the name",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </div>
              <div>
                <label>Phone No *</label>
                <Form.Item
                  name={"phone"}
                  style={{ width: "250px" }}
                  rules={[
                    {
                      required: true,
                      message: "Please Enter the phone No",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </div>
              <div>
                <label>Email Id *</label>
                <Form.Item
                  name={"email"}
                  style={{ width: "250px" }}
                  rules={[
                    {
                      required: true,
                      message: "Please Enter the email id",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </div>
              {/* </Form> */}
              {/* </div> */}
              <div>
                <label>Address *</label>
                <Form.Item
                  name={"address"}
                  style={{ width: "250px" }}
                  rules={[
                    {
                      required: true,
                      message: "Please Enter the address",
                    },
                  ]}
                >
                  <Input.TextArea />
                </Form.Item>
              </div>
            </div>
          </Panel>

          <Panel header="Details of Insurance History" key="2">
            <div className="ant-row">
                <div style={{marginRight:"110px"}}> 
                  <label>
                    Currently covered by any other Mediclami / Health Insurance
                  </label>
                  <Form.Item name="healthINs" style={{ width: "250px" }}>
                    <Select
                      placeholder="Select a option"
                      // onChange={onGenderChange}
                      allowClear
                    >
                      <Option value="no">No</Option>
                      <Option value="yes">Yes</Option>
                    </Select>
                  </Form.Item>
                </div>
                <div>
                  <label>Diagnosis </label>
                  <Form.Item name={"diagnosis"} style={{ width: "250px" }}>
                    <Input />
                  </Form.Item>
                </div>
             
              <Form.Item
                noStyle
                shouldUpdate={(prevValues, currentValues) =>
                  prevValues.healthINs !== currentValues.healthINs
                }
              >
                {({ getFieldValue }) =>
                  getFieldValue("healthINs") === "yes" ? (
                    <div style={{ flexDirection: "row", display: "flex" }}>
                      <div>
                        <label>If yes, company name</label>
                        <Form.Item
                          name={"companyname"}
                          style={{ width: "260px" }}
                        >
                          <Input />
                        </Form.Item>
                      </div>
                      <div>
                        <label>Policy No </label>
                        <Form.Item
                          name={"healthPolicy"}
                          style={{ width: "260px" }}
                        >
                          <Input />
                        </Form.Item>
                      </div>
                      <div>
                        <label>Sum Insured</label>
                        <Form.Item
                          name={"healthsumins"}
                          style={{ width: "260px" }}
                        >
                          <Input />
                        </Form.Item>
                      </div>
                    </div>
                  ) : null
                }
              </Form.Item>
            </div>
          </Panel>
          <Panel header="Details of Insured Person Hospitalized" key="3">
            <div className="ant-row">
              <div>
                <label>Relationship to Primary Insured *</label>
                <Form.Item
                  name="person_relation"
                  style={{ width: "260px" }}
                  rules={[
                    {
                      required: true,
                      message: "Policy is required",
                    },
                  ]}
                >
                  <Select
                    placeholder="Select a option"
                    // onChange={onGenderChange}
                    allowClear
                  >
                    <Option value="self">Self</Option>
                    <Option value="mother">Mother</Option>
                    <Option value="father">Father</Option>
                    <Option value="wife">Wife</Option>
                  </Select>
                </Form.Item>
              </div>
              <div>
                <label>Name *</label>
                <Form.Item
                  name={"person_Name"}
                  style={{ width: "260px" }}
                  rules={[
                    {
                      required: true,
                      message: "Please Enter the Name",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </div>
              <div>
                <label>Gender *</label>
                <Form.Item
                  name="person_Gender"
                  style={{ width: "260px" }}
                  rules={[
                    {
                      required: true,
                      message: "Please Select a Gender",
                    },
                  ]}
                >
                  <Select
                    placeholder="Select a Gender"
                    // onChange={onGenderChange}
                    allowClear
                  >
                    <Option value="male">male</Option>
                    <Option value="female">female</Option>
                  </Select>
                </Form.Item>
              </div>
              <div>
                <label>Date of Birth *</label>
                <Form.Item name={"person_dateofBirth"}>
                  <DatePicker
                    onChange={(dateString) => setperson_dateofBirth(dateString)}
                    style={{ width: "150px",marginRight:"110px" }}
                  />
                </Form.Item>
              </div>
              <div>
                <label>Age *</label>
                <Form.Item
                  name={"person_Age"}
                  style={{ width: "260px" }}
                  rules={[
                    {
                      required: true,
                      message: "Please Enter the Age",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </div>
              <div>
                <label>Occupation *</label>
                <Form.Item
                  name="person_Occupation"
                  style={{ width: "260px" }}
                  rules={[
                    {
                      required: true,
                      message: "Please Select a Occupation",
                    },
                  ]}
                >
                  <Select
                    placeholder="Select a Occupation"
                    // onChange={onGenderChange}
                    allowClear
                  >
                    <Option value="business">business</Option>
                    <Option value="job">Job</Option>
                  </Select>
                </Form.Item>
              </div>
              <div>
                <label>Address *</label>
                <Form.Item
                  name={"person_address"}
                  style={{ width: "260px" }}
                  rules={[
                    {
                      required: true,
                      message: "Please Enter the address",
                    },
                  ]}
                >
                  <Input.TextArea />
                </Form.Item>
              </div>
              <div>
                <label>Phone No *</label>
                <Form.Item
                  name={"person_Phone"}
                  style={{ width: "260px" }}
                  rules={[
                    {
                      required: true,
                      message: "Please Enter the Phone Number",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </div>
              <div>
                <label>Email Id *</label>
                <Form.Item
                  name={"person_Email"}
                  style={{ width: "260px" }}
                  rules={[
                    {
                      required: true,
                      message: "Please Enter the Email",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </div>
            </div>
          </Panel>
          <Panel header="Details of Hospitalization" key="4">
            <div className="ant-row">
              {/* <div style={{ flexDirection: "row", display: "flex" }}> */}
              <div>
                <label>Name of Hospital where Amited </label>
                <Form.Item
                  name={"hospitalization_Addres"}
                  style={{ width: "260px" }}
                >
                  <Input />
                </Form.Item>
              </div>
              <div>
                <label>Room Category occupied*</label>
                <Form.Item
                  name="hospitalization_room"
                  style={{ width: "260px" }}
                >
                  <Select
                    placeholder="Select a option"
                    // onChange={onGenderChange}
                    allowClear
                  >
                    <Option value="single">Single occupancy</Option>
                    <Option value="multi">Multi occupancy</Option>
                  </Select>
                </Form.Item>
              </div>
              <div>
                <label>Hospitalization Due to *</label>
                <Form.Item
                  name="Hospitalization_dueto"
                  style={{ width: "260px" }}
                >
                  <Select
                    placeholder="Select a option"
                    // onChange={onGenderChange}
                    allowClear
                  >
                    <Option value="male">Injury</Option>
                  </Select>
                </Form.Item>
              </div>
              <div>
                <label>If Injury given cause *</label>
                <Form.Item name="Injury_given_cause" style={{ width: "260px" }}>
                  <Select
                    placeholder="Select a option"
                    // onChange={onGenderChange}
                    allowClear
                  >
                    <Option value="male">Road Traffic Accident</Option>
                    <Option value="female">Accident</Option>
                    <Option value="other">Killing</Option>
                  </Select>
                </Form.Item>
              </div>
              <div>
                <label>Date of Injury </label>
                <Form.Item name={"hospitalization_dateofInjury"}>
                  <DatePicker
                    onChange={(dateString) =>
                      sethospitalization_dateofInjury(dateString)
                    }
                    style={{ width: "150px", marginRight: "110px" }}
                  />
                </Form.Item>
              </div>
            <div>
              <label>Date of Addmission *</label>
              <Form.Item name={"hospitalization_Addmission"}>
                <DatePicker
                  onChange={(dateString) =>
                    sethospitalization_Addmission(dateString)
                  }
                  style={{ width: "150px", marginRight: "150px" }}
                />
              </Form.Item>
            </div>
            <div>
              <label>Date of Discharge *</label>
              <Form.Item name={"hospitalization_Discharge"}>
                <DatePicker
                  onChange={(dateString) =>
                    sethospitalization_Discharge(dateString)
                  }
                  style={{ width: "150px", marginRight: "150px" }}
                />
              </Form.Item>
            </div>
            </div>
          </Panel>
          <Panel header="Details of Claim" key="5">
            <p
              style={{
                marginTop: "10px",
                marginBottom: "10px",
                fontSize: "18px",
                fontWeight: "bolder",
              }}
            >
              Details of the Treatment expenses clamied :
            </p>
            <div className="ant-row">
              {/* <div> */}
              <div>
                <label>Pre-hospitalization expenses</label>
                <Form.Item
                  name={"Pre_hospitalization_exp"}
                  style={{ width: "260px" }}
                >
                  <Input />
                </Form.Item>
              </div>
              <div>
                <label>hospitalization expenses</label>
                <Form.Item
                  name={"hospitalization_exp"}
                  style={{ width: "260px" }}
                >
                  <Input />
                </Form.Item>
              </div>

              {/* </div> */}
              {/* <div style={{ flexDirection: "row", display: "flex" }}>
               */}
              {/* <div> */}
              <div>
                <label>Health-check up cost</label>
                <Form.Item name={"Health_check"} style={{ width: "260px" }}>
                  <Input />
                </Form.Item>
              </div>
              <div>
                <label>Ambulance Charges</label>
                <Form.Item name={"Ambulance"} style={{ width: "260px" }}>
                  <Input />
                </Form.Item>
              </div>
              <div>
                <label>Other changes</label>
                <Form.Item name={"other_charges"} style={{ width: "260px" }}>
                  <Input />
                </Form.Item>
              </div>
              {/* </div> */}
              <div>
                <label>Total</label>
                <Form.Item
                  name={"tretment_Sum_Total"}
                  style={{ width: "260px" }}
                >
                  <Input />
                </Form.Item>
              </div>
              {/* <div style={{ flexDirection: "row", display: "flex" }}> */}
              <div>
                <label>Pre-hospitalization period</label>
                <Form.Item
                  name={"Pre_hospitalization_period"}
                  style={{ width: "260px" }}
                >
                  <Input />
                </Form.Item>
              </div>
              <div>
                <label>pre-hospitalization expenses</label>
                <Form.Item
                  name={"hospitalization_exp2"}
                  style={{ width: "260px" }}
                >
                  <Input />
                </Form.Item>
              </div>
              {/* <div>
                  <label>Pre-hospitalization expenses</label>
                  <Form.Item
                    name={'Pre-hospitalization_exp'}
                    style={{ width: '260px' }}
                  >
                    <Input />
                  </Form.Item>
                </div> */}
              {/* </div> */}
            </div>

            <p
              style={{
                marginTop: "10px",
                marginBottom: "10px",
                fontSize: "18px",
                fontWeight: "bolder",
              }}
            >
              Details of Lump Sum / Cash benefit clamied :
            </p>
            <div className="ant-row">
              {/* <div style={{ flexDirection: "row", display: "flex" }}> */}
              <div>
                <label>Hospital Daily cash</label>
                <Form.Item
                  name={"hospital_daily_cash"}
                  style={{ width: "260px" }}
                >
                  <Input />
                </Form.Item>
              </div>
              <div>
                <label>Surgical Cash</label>
                <Form.Item name={"surgical_cash"} style={{ width: "260px" }}>
                  <Input />
                </Form.Item>
              </div>
              <div>
                <label>Critical Illness benefit</label>
                <Form.Item
                  name={"critical_Illness_benefit"}
                  style={{ width: "260px" }}
                >
                  <Input />
                </Form.Item>
              </div>
              <div>
                <label>Convalescence</label>
                <Form.Item name={"convalescence"} style={{ width: "260px" }}>
                  <Input />
                </Form.Item>
              </div>
              <div>
                <label>Hospitalization Lump Sum benefit</label>
                <Form.Item
                  name={"pre/post_hospitalization"}
                  style={{ width: "260px" }}
                >
                  <Input />
                </Form.Item>
              </div>
              <div>
                <label>Other charges</label>
                <Form.Item
                  name={"clami_other_charges"}
                  style={{ width: "260px" }}
                >
                  <Input />
                </Form.Item>
              </div>
              <div>
                <label>Total</label>
                <Form.Item name={"lumo_Sum_Total"} style={{ width: "260px" }}>
                  <Input />
                </Form.Item>
              </div>
            </div>
          </Panel>
          <Panel header="Claim Documents Submitted - Check Lis" key="6">
            <div
              style={{
                flexDirection: "row",
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "20px",
                marginTop: "20px",
              }}
            >
              <Checkbox
                style={{ width: "100%", display: "flex" }}
                checked={claimForm}
                onChange={onclaimFormDulyCheckboxChange}
              >
                Claim form duly signed
              </Checkbox>
              <Upload
                fileList={claimFormFile.selectedFileList}
                customRequest={dummyRequest}
                onChange={onClaimChange}
                itemRender ={(existingComp, file)=>{
                  return <p style={{width:'125px'}}>{file.name}</p>
                }}
              >
                <Button  icon={<UploadOutlined />}>Choose File</Button>
              </Upload>
            </div>
            <div
              style={{
                flexDirection: "row",
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "20px",
              }}
            >
              <Checkbox
                style={{ width: "100%", display: "flex" }}
                checked={copyOfClaim}
                onChange={oncopyOfClaimCheckboxChange}
              >
                Copy of Claim intimation, If any
              </Checkbox>
              <Upload
                fileList={copyOfClaimFile.selectedFileList}
                customRequest={dummyRequest}
                onChange={onCopyChange}
                itemRender ={(existingComp, file)=>{
                  return <p style={{width:'125px'}}>{file.name}</p>
                }}
              >
                <Button  icon={<UploadOutlined />}>Choose File</Button>
              </Upload>
            </div>
            <div
              style={{
                flexDirection: "row",
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "20px",
              }}
            >
              <Checkbox
                style={{ width: "100%", display: "flex" }}
                checked={hospitalMainBill}
                onChange={onhospitalMainBillCheckboxChange}
              >
                Hospital Main Bill
              </Checkbox>
              <Upload
                fileList={hospitalMainBillFile.selectedFileList}
                customRequest={dummyRequest}
                onChange={onMainChange}
                itemRender ={(existingComp, file)=>{
                  return <p style={{width:'125px'}}>{file.name}</p>
                }}
              >
                <Button  icon={<UploadOutlined />}>Choose File</Button>
              </Upload>
            </div>
            <div
              style={{
                flexDirection: "row",
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "20px",
              }}
            >
              <Checkbox
                style={{ width: "100%", display: "flex" }}
                checked={hospitalBreakup}
                onChange={onhospitalBreakupCheckboxChange}
              >
                Hospital Break-up Bill
              </Checkbox>
              <Upload
                fileList={hospitalBreakupFile.selectedFileList}
                customRequest={dummyRequest}
                onChange={onBreakChange}
                itemRender ={(existingComp, file)=>{
                  return <p style={{width:'125px'}}>{file.name}</p>
                }}
              >
                <Button  icon={<UploadOutlined />}>Choose File</Button>
              </Upload>
            </div>
            <div
              style={{
                flexDirection: "row",
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "20px",
              }}
            >
              <Checkbox
                style={{ width: "100%", display: "flex" }}
                checked={hospitalBillPayment}
                onChange={onhospitalBillPaymentCheckboxChange}
              >
                Hospital Bill Payment Receipt
              </Checkbox>
              <Upload
                fileList={hospitalBillPaymentFile.selectedFileList}
                customRequest={dummyRequest}
                onChange={onBillChange}
                itemRender ={(existingComp, file)=>{
                  return <p style={{width:'125px'}}>{file.name}</p>
                }}
              >
                <Button  icon={<UploadOutlined />}>Choose File</Button>
              </Upload>
            </div>
            <div
              style={{
                flexDirection: "row",
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "20px",
              }}
            >
              <Checkbox
                style={{ width: "100%", display: "flex" }}
                checked={hospitalDischarge}
                onChange={onhospitalDischargeCheckboxChange}
              >
                Hospital Discharge Summary
              </Checkbox>
              <Upload
                fileList={hospitalDischargeFile.selectedFileList}
                customRequest={dummyRequest}
                onChange={onDischargeChange}
                itemRender ={(existingComp, file)=>{
                  return <p style={{width:'125px'}}>{file.name}</p>
                }}
              >
                <Button  icon={<UploadOutlined />}>Choose File</Button>
              </Upload>
            </div>
            <div
              style={{
                flexDirection: "row",
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "20px",
              }}
            >
              <Checkbox
                style={{ width: "100%", display: "flex" }}
                checked={pharmacyBill}
                onChange={onpharmacyBillCheckboxChange}
              >
                Pharmacy Bill
              </Checkbox>
              <Upload
                fileList={pharmacyBill.selectedFileList}
                customRequest={dummyRequest}
                onChange={onPharmacyChange}
                itemRender ={(existingComp, file)=>{
                  return <p style={{width:'125px'}}>{file.name}</p>
                }}
              >
                <Button  icon={<UploadOutlined />}>Choose File</Button>
              </Upload>
            </div>
            <div
              style={{
                flexDirection: "row",
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "20px",
              }}
            >
              <Checkbox
                style={{ width: "100%", display: "flex" }}
                checked={OperationTheater}
                onChange={onOperationTheaterCheckboxChange}
              >
                Operation Theater Notes
              </Checkbox>
              <Upload
                fileList={OperationTheater.selectedFileList}
                customRequest={dummyRequest}
                onChange={onOperationChange}
                itemRender ={(existingComp, file)=>{
                  return <p style={{width:'125px'}}>{file.name}</p>
                }}
              >
                <Button  icon={<UploadOutlined />}>Choose File</Button>
              </Upload>
            </div>
            <div
              style={{
                flexDirection: "row",
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "20px",
              }}
            >
              <Checkbox
                style={{ width: "100%", display: "flex" }}
                checked={ECG}
                onChange={onECGCheckboxChange}
              >
                ECG
              </Checkbox>
              <Upload
                fileList={ECG.selectedFileList}
                customRequest={dummyRequest}
                onChange={onECGChange}
                itemRender ={(existingComp, file)=>{
                  return <p style={{width:'125px'}}>{file.name}</p>
                }}
              >
                <Button  icon={<UploadOutlined />}>Choose File</Button>
              </Upload>
            </div>
            <div
              style={{
                flexDirection: "row",
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "20px",
              }}
            >
              <Checkbox
                style={{ width: "100%", display: "flex" }}
                checked={DoctorRequest}
                onChange={onDoctorRequestCheckboxChange}
              >
                Doctor's request for investigation
              </Checkbox>
              <Upload
                fileList={DoctorRequestFile.selectedFileList}
                customRequest={dummyRequest}
                onChange={onDoctosChange}
                itemRender ={(existingComp, file)=>{
                  return <p style={{width:'125px'}}>{file.name}</p>
                }}
              >
                <Button  icon={<UploadOutlined />}>Choose File</Button>
              </Upload>
            </div>
            <div
              style={{
                flexDirection: "row",
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "20px",
              }}
            >
              <Checkbox
                style={{ width: "100%", display: "flex" }}
                checked={InvestgationReports}
                onChange={onInvestgationReportsCheckboxChange}
              >
                Investgation Reports(Including CT/MRI/USG/HPE)
              </Checkbox>
              <Upload
                fileList={InvestgationReportsFile.selectedFileList}
                customRequest={dummyRequest}
                onChange={onInvesChange}
                itemRender ={(existingComp, file)=>{
                  return <p style={{width:'125px'}}>{file.name}</p>
                }}
              >
                <Button  icon={<UploadOutlined />}>Choose File</Button>
              </Upload>
            </div>
            <div
              style={{
                flexDirection: "row",
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "20px",
              }}
            >
              <Checkbox
                style={{ width: "100%", display: "flex" }}
                checked={Doctorprescriptions}
                onChange={onDoctorprescriptionsCheckboxChange}
              >
                Doctor prescriptions
              </Checkbox>
              <Upload
                fileList={DoctorprescriptionsFile.selectedFileList}
                customRequest={dummyRequest}
                onChange={onPrescriptionChange}
                itemRender ={(existingComp, file)=>{
                  return <p style={{width:'125px'}}>{file.name}</p>
                }}
              >
                <Button  icon={<UploadOutlined />}>Choose File</Button>
              </Upload>
            </div>
            <div
              style={{
                flexDirection: "row",
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "20px",
              }}
            >
              <Checkbox
                style={{ width: "100%", display: "flex" }}
                checked={Others}
                onChange={onOthersCheckboxChange}
              >
                Others
              </Checkbox>
              <div style={{display:'flex'}}>
                {/* <Form.Item
                       type="file"
                      id="file"
                     > */}
           <Upload  onClick={handleFileChange} customRequest={dummyRequest}><Button>Choose File</Button></Upload>
                {/* </Form.Item> */}
              {/* <Form.Item 
                name="otherfile"
                 fileList={OthersFile.selectedFileList}>
              <Upload
              accept="Pdf,image/png,image/jpeg"
               
                
                onChange={onChange}
                itemRender ={(existingComp, file)=>{
                  return <p style={{width:'125px'}}>{file.name}</p>
                }}
              >
                <Button  icon={<UploadOutlined />}>Choose File</Button>
              </Upload>
              </Form.Item> */}
              </div>
            </div>
          </Panel>
        </Collapse>

        <div style={{ marginTop: "20px" }}>
          <Button
            style={{ marginRight: "20px" }}
            type="primary"
            htmlType="submit"
            onClick={() => props.handleBack()}
          >
            Cancel
          </Button>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          {/* <Button type="primary" htmlType="submit">
            Save In draft
          </Button> */}
        </div>
      </Form>
    </div>
  );
};
export default Newclaim;
