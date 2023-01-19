import React, { useState, useEffect } from "react";
import { Select, Form, Button,Breadcrumb } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import {
  AddServiceList,
  getAllUserPolicyList,
} from "../../services/authentication";
import SerSucessModal from "./SerSucessModal";
// import "../UserStyle.css";
import TextArea from "antd/lib/input/TextArea";

const { Option } = Select;

const Newservice = (props) => {
  const [PolicyCode, setPolicyCode] = useState("");
  const [NewSerevicePage, setNewSerevicePage] = useState(true);
  const [SucessModalPage, setSucessModalPage] = useState("");
  const [policyName, setpolicyName] = useState("");
  const [getAllUsersList, setgetAllUsersList] = useState("");

  const Token = window.localStorage.getItem("token");
  const loginDetailsUserId = window.localStorage.getItem("loginDetailsUserId");
  console.log("lug", loginDetailsUserId);

  //Need to change the UserpolicyId to add Newservices
  const [AddService, setAddService] = useState("");
  console.log("token is", Token);

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
      setgetAllUsersList(resp.data);
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

  const handleAddServiceListAPI = async (addServiceList) => {
    const policyNum =
      getAllUsersList &&
      getAllUsersList.filter(
        (data) => data.policy.policyCode === addServiceList.policy_No
      )[0];
    console.log("policy", policyNum);
    console.log("addddd", addServiceList);
    console.log("ads", getAllUsersList);

    const payload = {
      userPolicy_id: policyNum.id,
      description: addServiceList.description,
      serviceName: addServiceList.Statement_Type,
      token: Token,
    };
    try {
      const resp = await AddServiceList(payload);
      console.log("sucess", resp);
      handleGetPolicyListServiceCall();
      handleSucess();
      // handleCancel()
    } catch (error) {
      console.log("error", error);
    }
  };
  const onFinish = (values) => {
    setAddService(values);
    handleAddServiceListAPI(values);
  };
  const OnFinishFailed = (errorInfo) => {
    console.log("failed", errorInfo);
  };

  const handleSucess = () => {
    setNewSerevicePage(false);
    setSucessModalPage(true);
  };

  return (
    <>
      {NewSerevicePage && (
        <div className="container-fluid" style={{paddingTop:"20px"}}>
          <Breadcrumb style={{ marginTop: "20px" }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>Services</Breadcrumb.Item>
            <Breadcrumb.Item>New Services</Breadcrumb.Item>
          </Breadcrumb>
          <div>
            <a
              style={{
                marginTop: "30px",
                marginBottom: "30px",
                fontSize: "20px",
              }}
              onClick={() => props.handleBack()}
            >
              <ArrowLeftOutlined style={{ paddingTop: "10px" }} /> BACK
            </a>
          </div>
          <div className="row d-flex align-items-center justify-content-between" style={{paddingTop:"10px"}}>
            <div className="col-12">
              <div className="heading-with-box mb-2">
                <div className="row">
                  <div className="col-lg-6 col-md-6 text-left">
                    <h3>Request Statement</h3>
                  </div>
                  <div className="col-lg-6 col-md-6 text-right">
                <a className="btn" data-toggle="modal" data-target="#addPolicyList">Status : Not Submited</a>
            </div>
                </div>
              </div>
            </div>
          </div>
          <Form onFinish={onFinish}>
            <div className="faq-custom">
              <div className="detail-box">
                <div className="card-body form-custom">
                  <div className="row">
                    <div className="col-12 col-sm-6 col-md-6 col-lg-4">
                      <div className="form-group">
                        <label htmlFor="exampleInputtext" className="mb-1">
                          Policy No.<em>*</em>
                        </label>
                        <Form.Item
                          name="policy_No"
                          
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
                            {console.log("pppp",PolicyCode)}
                            {PolicyCode ?
                              PolicyCode.map((data) => (
                                <Option value={data.
                                  policyCode}>{data.
                                    policyCode}</Option>
                              )):''}
                          </Select>
                        </Form.Item>
                      </div>
                    </div>
                    <div className="col-12 col-sm-6 col-md-6 col-lg-4">
                      <div className="form-group">
                        <label htmlFor="exampleInputtext" className="mb-1">
                          Policy<em>*</em>
                        </label>
                        <Form.Item
                          name="policyName"
                          // style={{ width: "300px" }}
                          rules={[
                            {
                              required: true,
                              message: "PolicyName is required",
                            },
                          ]}
                        >
                          <Select
                            placeholder="Select a option"
                            // onChange={onGenderChange}
                            allowClear
                          >
                            {console.log("pppp",policyName)}
                            {policyName ?
                              policyName.map((data) => (
                                <Option value={data.policyName}>{data.policyName}</Option>
                              )):''}
                          </Select>
                        </Form.Item>
                      </div>
                    </div>
                    <div className="col-12 col-sm-6 col-md-6 col-lg-4">
                      <div className="form-group">
                        <label htmlFor="exampleInputHolderName" className="mb-1">
                          Statement <em>*</em>
                        </label>

                        <Form.Item
                          name="Statement_Type"
                          // style={{ width: "300px" }}
                          rules={[
                            {
                              required: true,
                              message: "Statement is required",
                            },
                          ]}
                        >
                          <Select
                            placeholder="Select a option"
                            // onChange={onGenderChange}
                            allowClear
                          >
                            <Option value="Yearly statement">
                              Yearly Statement
                            </Option>
                            <Option value="Monthly statement">
                              Monthly Statement
                            </Option>
                          </Select>
                        </Form.Item>
                      </div>
                    </div>
                    <div className="col-12 col-sm-6 col-md-6 col-lg-4">
                      <div className="form-group">
                        <label htmlFor="exampleInputHolderName" className="mb-1">
                          Description<em>*</em>
                        </label>
                        <Form.Item
                          name="description"
                          // style={{ width: "630px" }}
                          rules={[
                            {
                              required: true,
                              message: "description is Required",
                            },
                          ]}
                        >
                          <TextArea
                            // style={{ width: "350px" }}
                            className="form-control"
                            rows="4"
                          ></TextArea>
                        </Form.Item>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4" style={{paddingLeft:"30px"}}>
                    <Button
                      type="submit"
                      htmlType="submit"
                      className="btn btn-primary"
                      style={{paddingTop:"5px"}}
                    >
                      Submit Complaint
                    </Button>
                  </div>
                </div>
              </div>

              <footer className="py-4 bg-light mt-auto">
                <div className="container-fluid">
                  <div className="d-flex align-items-center justify-content-between small">
                    <div className="text-muted">
                      Copyright &copy; Nossa 2020
                    </div>
                    <div>
                      <a>Privacy Policy</a>
                      &middot;
                      <a>Terms &amp; Conditions</a>
                    </div>
                  </div>
                </div>
              </footer>
            </div>
          </Form>
        </div>
      )}

      {SucessModalPage && <SerSucessModal />}
    </>
  );
};
export default Newservice;
