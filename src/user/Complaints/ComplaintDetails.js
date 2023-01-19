import React, { useState } from "react";
import { Button, Modal,Breadcrumb} from "antd";
import DeleteSucess from './DeleteSucess'
import { getPolicyList, addComplaintList,deleteComplaintList } from "../../services/authentication";

const ComplaintDetails = (props) => {
  const selectedRecord = props && props.selectedRecord;
  const alldata = props && props.data;
  console.log("data", alldata);
  console.log("selecet", selectedRecord);
  const ComplaintList =
    alldata &&
    alldata.filter((data) => data.complaintCode === selectedRecord.id)[0];
  const Token = window.localStorage.getItem("token");
  console.log("Token in list", Token);
  const loginDetailsUserId = window.localStorage.getItem("loginDetailsUserId");
  console.log("lug", loginDetailsUserId);

  console.log("list",ComplaintList);
  console.log(
    "policuy",
    ComplaintList && ComplaintList.userPolicy.policy.policyName
  );
  const [complaintsDetailspage, setcomplaintsDetailspage] = useState(true);
  const [policyName, setPolicyName] = useState("");
  const [complaintId, setComplaintId] = useState("");
  const [complaintDescription, setComplaintDescription] = useState("");
  const [subject, setsubject] = useState("");
  const [IsResubmitModalVisible, setIsResubmitModalVisible] = useState("");
  const [disableButton, setDisableButton] = useState('')
 const[DelSucessModal,setDelSucessModal] =useState('')
  const handleresubmitShowModal = () => {
    console.log("array", ComplaintList);
    const value = ComplaintList;
    console.log("value", value);
    if (value) {
      setComplaintId(value.id);
      setPolicyName(value.userPolicy.policy.policyName);
      setComplaintDescription(value.description);
      setsubject(value.subject);
    }
    setIsResubmitModalVisible(true);
  };
  const handlesubmit = () => {
    setIsResubmitModalVisible(false);
  };
  const handelCancel = () => {
    setIsResubmitModalVisible(false);
  };

  const handleAddComplaintListAPI = async () => {
    console.log("addcomp");
    const payload = {
      userPolicy_id: loginDetailsUserId,
      subject: subject,
      description: complaintDescription,
      token: Token,
    };
    try {
      const resp = await addComplaintList(payload);
      console.log("sucess", resp);
      handelCancel();
      setDisableButton(true)
    //   setListAPIUpdateStatus(true)
    } catch (error) {
      console.log("error", error);
    }
  };

  //Delete API START

  const handleDeleteComplaint = async() =>{
    const value = alldata.find((data)=>data.id ===selectedRecord.user_id)
    console.log("valuuuue",value)
    const payload = {
      'id':value.id 
    }
    try {
     const resp = await deleteComplaintList(payload);
     console.log('success')
    //  handleGetComplaintsListServiceCall()
    //  setcomplaintApiUpdateStatus(true)
    handlebackDeleteModal()
   } catch (error) {
       console.log('error',error)
   }
}
//Ended

 const handlebackDeleteModal = () =>{
  setcomplaintsDetailspage(false)
  setDelSucessModal(true)
 }

  return (
    <>
      {complaintsDetailspage && (
        <div>
            <Breadcrumb style={{ marginTop: "20px" }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>Complaints</Breadcrumb.Item>
            <Breadcrumb.Item>Complaint Details</Breadcrumb.Item>
          </Breadcrumb>
          <div className="row d-flex align-items-center justify-content-between" style={{paddingTop:"10px"}}>
            <div className="col-12">
              <div className="heading-with-box mb-2">
                <div className="row">
                  <div className="col-lg-6 col-md-6 text-left">
                    <h3>
                      Complaint ID :<span className="color-green"></span>
                      {ComplaintList && ComplaintList.complaintCode}
                    </h3>
                  </div>
                  <div className="col-lg-6 col-md-6 text-right">
                    <a
                      href="#"
                      className="btn resolve-color"
                      data-toggle="modal"
                      data-target="#addPolicyList"
                    >
                      {ComplaintList && ComplaintList.verifyStatus}
                    </a>
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
                      <span>Policy</span>

                      <b>
                        {ComplaintList &&
                          ComplaintList.userPolicy.policy.policyName}
                      </b>
                    </div>
                  </div>
                  <div className="col-12 col-sm-6 col-md-6 col-lg-3">
                    <div className="table-data">
                      <span>Policy type</span>
                      <b>
                        {ComplaintList &&
                          ComplaintList.userPolicy.policy.policyCode}
                      </b>
                    </div>
                  </div>
                  <div className="col-12 col-sm-6 col-md-6 col-lg-4">
                    <div className="table-data">
                      <span>Submitted Date</span>
                      <b>{ComplaintList && ComplaintList.complaintDate}</b>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 col-sm-12 col-md-12 col-lg-10">
                    <div className="table-data">
                      <span>Subject</span>
                      <b>{ComplaintList && ComplaintList.subject}</b>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 col-sm-12 col-md-12 col-lg-10">
                    <div className="table-data">
                      <span>Remark</span>
                      <b>{ComplaintList && ComplaintList.description}</b>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="btn-box">
                      <Button
                        type="submit"
                        className="btn btn-back mb-4 mr-2"
                        style={{
                          width: "90px",
                          color: "white",
                          backgroundColor: "black",
                        }}
                        onClick={props.handleBack}
                      >
                        Back
                      </Button>
                      <Button
                        type="submit"
                        className="btn btn-reject-claim mb-4 mr-2"
                        style={{
                          width: "180px",
                          color: "white",
                          backgroundColor: "red",
                        }}
                        onClick={()=>handleDeleteComplaint()}
                      >
                        Delete Complaint
                      </Button>
                      <Button
                        type="submit"
                        disabled={disableButton}
                        className="btn btn btn-resubmit mb-4"
                        style={{
                          width: "180px",
                          color: "white",
                          backgroundColor: "#000089",
                        }}
                        onClick={() => handleresubmitShowModal()}
                      >
                        Resubmit Complaint
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className="modal fade"
            id="exampleModal"
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content popup-form">
                <div className="modal-body">
        <Modal onOk={() =>{handleAddComplaintListAPI()}} title="Resubmit Complaint"  visible={IsResubmitModalVisible}  onCancel={handelCancel}>
        <form className="col-12">
              <div className="form-group mb-4">
                <input
                  className="col-xs-12 w-100"
                      type="Id"
                      placeholder="Complaint Id"
                      value={complaintId}
                      onChange={(e) => setComplaintId(e.target.value)}
                    />
                    </div>

                    <div className="form-group mb-4">
                <input
                  className="col-xs-12 w-100"
                      type="subject"
                      placeholder="subject"
                      value={subject}
                      onChange={(e) => setsubject(e.target.value)}
                    />
                    </div>
                    <div className="form-group mb-4">
                <input
                  className="col-xs-12 w-100"
                      type="name"
                      placeholder="policy Name"
                      value={policyName}
                      onChange={(e) => setPolicyName(e.target.value)}
                    />
                    </div>

                    <div className="form-group mb-4">
                <textarea
                  className="col-xs-12 w-100"
                      type="Textarea"
                      placeholder="complaint Description"
                      value={complaintDescription}
                      onChange={(e) => setComplaintDescription(e.target.value)}
                    />
                    </div>
                    </form>
                  </Modal>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {DelSucessModal && <DeleteSucess/>}
    </>
  );
};
export default ComplaintDetails;
