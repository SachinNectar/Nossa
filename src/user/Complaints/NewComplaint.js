import { Form, Input, Select, Button,Breadcrumb } from "antd";
import TextArea from "antd/lib/input/TextArea";
import React, { useState, useEffect } from "react";
// import './Complaint.style.css';
import {
  getAllUserPolicyList,
  addComplaintList,
} from "../../services/authentication";

const NewComplaint = (props) => {
  const { Option } = Select;
  const [policyCode, setpolicyCode] = useState("");
  const [policyName, setpolicyName] = useState("");
  const [addComplaint, setAddComplaint] = useState("");
  const [getAllUsersList, setgetAllUsersList] = useState("");
  const [listAPIUpdateStatus, setListAPIUpdateStatus] = useState("");
  const [newComplaintspage, setNewComplaintspage] = useState(true);
  const Token = window.localStorage.getItem("token");
  console.log("Token in list", Token);
  const loginDetailsUserId = window.localStorage.getItem("loginDetailsUserId");
  console.log("lug", loginDetailsUserId);

  const getPolicyload = {
    policy_id: "",
    user_id: loginDetailsUserId,
    agent_id: "",
    premiumPlan: "",
    activeStatus:''
  };

  const handleGetPolicyListServiceCall = async (data) => {
    try {
      let tableDataArr = [];

      const resp = await getAllUserPolicyList(data);
      console.log("resssss", resp);
      setgetAllUsersList(resp.data);
      resp &&
        resp.data.map((data, i) => {
          const obj = {
            policyCode: data.policy.policyCode,
            id: data.id,
            policyName: data.policy.policyName,
          };
          tableDataArr.push(obj);
          console.log("data", tableDataArr);
        });
      setpolicyCode(tableDataArr);
      setpolicyName(tableDataArr);
      console.log("gwhbhjb", tableDataArr);
      console.log("12334", resp);
    } catch (error) {
      console.log("err", error);
    }
  };
  useEffect(() => {
    handleGetPolicyListServiceCall(getPolicyload);
  }, []);

  //Add api for complaint

  const handleAddComplaintListAPI = async (addComplaint) => {
    const policyNum =
      getAllUsersList &&
      getAllUsersList.filter(
        (data) => data.policy.policyCode === addComplaint.policy_No
      )[0];
    console.log("policyNum", policyNum);
    console.log("resp in new com", getAllUsersList);
    console.log("addcomp", addComplaint);
    const payload = {
      userPolicy_id: policyNum.id,
      subject: addComplaint.subject,
      description: addComplaint.description,
      complaintDate: addComplaint.complaintDate,
      token: Token,
    };
    try {
      const resp = await addComplaintList(payload);
      console.log("sucess", resp);
      alert("Complain Added Successfully!");
      handleGetPolicyListServiceCall();
      setListAPIUpdateStatus(true);
      handlereturn();
    } catch (error) {
      console.log("error", error);
      alert("Something Went Wrong");
    }
  };

  const onFinish = (values) => {
    setAddComplaint(values);
    handleAddComplaintListAPI(values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("failed", errorInfo);
  };

  const handlereturn = () => {
    props.handlereturn();
  };

  return (
    <>
      {newComplaintspage && (
        <div>
            <Breadcrumb style={{ marginTop: "20px" }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>Complaints</Breadcrumb.Item>
            <Breadcrumb.Item>New Complaints</Breadcrumb.Item>
          </Breadcrumb>
          <Form onFinish={onFinish} style={{paddingTop:"10px"}}>
            <div className="row d-flex align-items-center justify-content-between">
              <div className="col-12">
                <div className="heading-with-box mb-2">
                  <div className="row">
                    <div className="col-lg-6 col-md-6 text-left">
                      <h3>New Complaint</h3>
                    </div>
                    <div className="col-lg-6 col-md-6 text-right">
                      <a
                        href=""
                        className="btn"
                        data-toggle="modal"
                        data-target="#addPolicyList"
                      >
                        Status : Not Submited
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
                    <div className="col-12 col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-4">
                      <div className="form-group">
                        <label htmlFor="exampleInputtext" className="mb-1">
                          Policy No.<em>*</em>
                        </label>
                        <Form.Item
                          name="policy_No"
                          style={{ width: "300px" }}
                          rules={[
                            {
                              required: true,
                              message: "policy is Required",
                            },
                          ]}
                        >
                          <Select placeholder="select a option" allowclear>
                            {policyCode &&
                              policyCode.map((data) => (
                                <Option value={data.policyCode}>
                                  {data.policyCode}
                                </Option>
                              ))}
                          </Select>
                        </Form.Item>
                      </div>
                    </div>
                    <div className="col-12 col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-4">
                      <div className="form-group">
                        <label htmlFor="exampleInputtext" className="mb-1">
                          Policy<em>*</em>
                        </label>
                        <Form.Item
                          name="policyName"
                          style={{ width: "300px" }}
                          rules={[
                            {
                              required: true,
                              message: "policyName is Required",
                            },
                          ]}
                        >
                          <Select placeholder="select a option" allowclear>
                            {policyName &&
                              policyName.map((data) => (
                                <Option value={data.policyName}>
                                  {data.policyName}
                                </Option>
                              ))}
                          </Select>
                        </Form.Item>
                      </div>
                    </div>
                    <div className="col-12 col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-4">
                      <div className="form-group">
                        <label htmlFor="exampleInputtext" className="mb-1">
                          Policy type<em>*</em>
                        </label>
                        <Form.Item
                          name="policyType"
                          style={{ width: "300px" }}
                          rules={[
                            {
                              required: true,
                              message: "policy is Required",
                            },
                          ]}
                        >
                          <Select placeholder="select a option" allowclear>
                            <Option value="General">General</Option>
                            <Option value="Health">Health</Option>
                            <Option value="General && Health">
                              General && Health
                            </Option>
                            <Option value="vehicle">vehicle</Option>
                          </Select>
                        </Form.Item>
                      </div>
                    </div>
                    <div className="col-12 col-xs-12 col-sm-12 col-md-12 col-lg-12">
                      <div className="form-group">
                        <label htmlFor="exampleInputHolderName" className="mb-1">
                          Subject<em>*</em>
                        </label>
                        <Form.Item
                          name="subject"
                          style={{ width: "300px" }}
                          rules={[
                            {
                              required: true,
                              message: "subject is Required",
                            },
                          ]}
                        >
                          <Input
                            type="text"
                            className="form-control"
                            id="exampleInputHolderName"
                            aria-describedby="HolderName"
                            placeholder=""
                          />
                        </Form.Item>
                      </div>
                    </div>
                    <div className="col-12 col-xs-12 col-sm-12 col-md-12 col-lg-12">
                      <div className="form-group">
                        <label htmlFor="exampleInputHolderName" className="mb-1">
                          Complaint Description<em>*</em>
                        </label>
                        <Form.Item
                          name="description"
                          style={{ width: "300px" }}
                          rules={[
                            {
                              required: true,
                              message: "description is Required",
                            },
                          ]}
                        >
                          <TextArea
                            // style={{ width: "630px" }}
                            type="text"
                            className="form-control"
                            id="exampleInputHolderName"
                            aria-describedby="HolderName"
                            placeholder=""
                          />
                        </Form.Item>
                      </div>
                    </div>
                    <Button
                    style={{height:"45px", fontSize:"medium"}}
                      type="submit"
                      htmlType="submit"
                      className="btn btn-primary"
                    >
                      Submit Complaint
                    </Button>
                    <Button
                    style={{height:"45px", fontSize:"medium",backgroundColor:"black",color:"white",borderRadius:"10px",marginTop:"15px"}}
                      type="button"
                      className="btn btn-dark"
                      onClick={()=>props.handlereturn()}
                    >
                      Back
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Form>
        </div>
      )}
    </>
  );
};
export default NewComplaint;
