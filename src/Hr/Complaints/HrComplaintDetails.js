import React, { useState } from "react";
import { Button, Modal,Breadcrumb } from "antd";
import { verifyComplaintList } from "../../services/authentication";
import ApproveModal from "./ApproveModal";
import ModalHeader from "react-bootstrap/esm/ModalHeader";

const HrComplaintDetails = (props) => {
  const selectedRecord = props && props.selectedRecord;
  const alldata = props && props.data;
  console.log("data", alldata);
  console.log("selecet", selectedRecord);
  const ComplaintList =
    alldata &&
    alldata.filter((data) => data.complaintCode === selectedRecord.Id)[0];

  console.log("list", ComplaintList);
  console.log(
    "policuy",
    ComplaintList && ComplaintList.userPolicy.policy.policyName
  );
  const [complaintsDetailspage, setcomplaintsDetailspage] = useState(true);
  const [policyName, setPolicyName] = useState("");
  const [complaintId, setComplaintId] = useState("");
  const [complaintDescription, setComplaintDescription] = useState("");
  const [IsResubmitModalVisible, setIsResubmitModalVisible] = useState("");
  const [policyHolder, setPolicyHolder] = useState("");
  const [Submit, setSubmit] = useState("");
  const[ApproveModalPage,setApproveModalPage] = useState('')

  const handleApprovalShowModal = (Submit) => {
    setSubmit(Submit);
    console.log("array", ComplaintList);
    const value = ComplaintList;
    console.log("value", value);
    if (value) {
      setComplaintId(value.complaintCode);
      setPolicyName(value.userPolicy.policy.policyName);
      setComplaintDescription(value.description);
      setPolicyHolder(value.policyHolder);
    }
    setIsResubmitModalVisible(true);
  };
  const handlesubmit = () => {
    setIsResubmitModalVisible(false);
    setApproveModalPage(true)
  };
  const handleCancel = () => {
    setIsResubmitModalVisible(false);
  };

  const handleVerifyAPI = async () => {
    console.log("cl", ComplaintList);
    const data = {
      id: ComplaintList.id,
      verifyStatus: Submit,
      VerifiedDate: ComplaintList.VerifiedDate,
    };
    try {
      const resp = await verifyComplaintList(data);
      console.log(resp);
      // handlesubmit();
      setIsResubmitModalVisible(false);
      setApproveModalPage(true)
      handleCancel();
    } catch (error) {
      console.log("error", error);
      // showAlert('In valide data', "error");
    }
  };

  return (
    <>
    <div>
      {complaintsDetailspage && (
        <div>
           <Breadcrumb style={{ marginTop: "20px" }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>Complaint</Breadcrumb.Item>
            <Breadcrumb.Item>Complaint Details</Breadcrumb.Item>
          </Breadcrumb>
          <div className="row d-flex align-items-center justify-content-between">
            <div className="col-12">
              <div className="heading-with-box mb-2">
                <div className="row">
                  <div className="col-lg-6 col-md-6 text-left">
                    <h4>
                      Complaint ID :
                      <span
                        className="color-green"
                        style={{ color: "darkgreen" }}
                      ></span>
                      {ComplaintList && ComplaintList.complaintCode}
                    </h4>
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
                      <span style={{ color: "#000089" }}>Policy</span>

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
                          width: "180px",
                          color: "white",
                          backgroundColor: "red",
                        }}
                        onClick={() => handleApprovalShowModal("reject")}
                      >
                        reject Complaint
                      </Button>
                      <Button
                        type="submit"
                        className="btn btn-reject-claim mb-4 mr-2"
                        style={{
                          width: "180px",
                          color: "white",
                          backgroundColor: "Green",
                        }}
                        onClick={() => handleApprovalShowModal("Resolve")}
                      >
                        Resolve Complaint
                      </Button>
                      <Button
                        type="submit"
                        className="btn btn btn-resubmit mb-4"
                        style={{
                          width: "180px",
                          color: "white",
                          backgroundColor: "#000089",
                        }}
                        onClick={() => handleApprovalShowModal("Approved")}
                      >
                        send for Approval
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
                  <Modal
                    visible={IsResubmitModalVisible}
                    onCancel={handleCancel}
                    footer={null}
                  >
                    <ModalHeader
                      style={{
                        justifyContent: "center",
                        fontSize: "22px",
                        fontWeight: "bolder",
                        color: "#000089",
                      }}
                    >
                      Approval
                    </ModalHeader>
                    <form className="col-12" style={{ paddingTop: "10px" }}>
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
                          type="PolicyHolder"
                          placeholder="policyHolder"
                          value={policyHolder}
                          onChange={(e) => setPolicyHolder(e.target.value)}
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
                      {/* <button type="primary" >Submit</button> */}

                      <div className="form-group mb-4">
                        <select
                          className="col-xs-12 w-100"
                          placeholder="Select Admin"
                          // style={{
                          //   width: "230px",
                          //   height: "50px",
                          //   marginLeft: "80px",
                          // }}
                        >
                          <option>Admin</option>
                          <option>Super Admin</option>
                        </select>
                      </div>
                      <div className="form-group mb-4">
                        <button
                          className="col-xs-12 w-100 ,btn btn-primary"
                          type="button"
                          // className=
                          onClick={handleVerifyAPI}
                        >
                          Approve
                        </button>
                      </div>
                    </form>
                  </Modal>
                </div>
                <div className="modal-footer">
                  {/* <button type="button" className="btn btn-primary">
                    Submit
                  </button> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      </div>
      {ApproveModalPage && <ApproveModal/>}
    </>
  );
};
export default HrComplaintDetails;
