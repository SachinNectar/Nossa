import React, { useState, useEffect } from "react";
import {
  Table,
  Input,
  Button,
  Breadcrumb,
  Dropdown,
  Modal,
  Menu,
  Form,
  InputNumber,
  Select
} from "antd";
import { useNavigate } from "react-router-dom";
import { CSVLink } from "react-csv";
import {
  DeleteOutlined,
  PlusOutlined,
  FilterOutlined,
  EditOutlined,
} from "@ant-design/icons";
import AccidentList from "./Accidentlist";
import {
  getPolicyList,
  addPolicyList,
  deletePolicyList,
  editPolicyList,
} from "../../services/authentication";
import ModalHeader from "react-bootstrap/esm/ModalHeader";

const { Search } = Input;
const{Option} = Select;

const AdListedPolocies = () => {
  let navigate = useNavigate();
  const [accidentListStatus, setAccidentListStatus] = useState(false);
  const [policyListStatus, setPolicyListStatus] = useState(true);
  const [selectedPolicyData, setSelectedPolicyData] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [addPolicyData, setAddPolicyData] = useState("");
  // const[editPolicyData,setEditPolicyData]=useState(" ")
  const [tableData, setTableData] = useState("");
  const [policyListArray, setPolicyListArray] = useState("");
  const [policyId, setPolicyId] = useState("");
  const [policyName, setPolicyName] = useState("");
  const [registration, setRegistration] = useState("");
  const [policyDuration, setPolicyDuration] = useState("");
  const [policyType, setPolicyType] = useState("");
  const [policyDescription, setPolicyDescription] = useState("");
  const[status,setStatus]=useState('')
  const [listAPIupdateStatus, setListAPIupdateStatus] = useState(false);
  const Token = window.localStorage.getItem("token");
  console.log("Token in list", Token);
  const data = {
    search: "",
    type: "",
    id: "",
    activeStatus:''
  };
  const [form] = Form.useForm();
  const onSearch = (value) => {
    const searchData = {
      search: value,
      type: "",
      id: "",
      activeStatus:''
    };
    handleGetPolicyListServiceCall(searchData);
    setListAPIupdateStatus(true);
  };

  const handleClick = (type) => {
    const searchData = {
      search: "",
      type: type,
      id: "",
      activeStatus:''
    };
    handleGetPolicyListServiceCall(searchData);
    setListAPIupdateStatus(true);
  };

  const content = (
    <Menu>
      <Menu.Item>
        <a
          target="_blank"
          rel="noopener norefer"
          onClick={() => handleClick("General")}
        >
          General
        </a>
      </Menu.Item>
      <Menu.Item>
        <a
          target="_blank"
          rel="noopener norefer"
          onClick={() => handleClick("Health")}
        >
          Health
        </a>
      </Menu.Item>
      <Menu.Item>
        <a
          target="_blank"
          rel="noopener norefer"
          onClick={() => handleClick("Health & General")}
        >
          Health & General
        </a>
      </Menu.Item>
      <Menu.Item>
        <a
          target="_blank"
          rel="noopener norefer"
          onClick={() => handleClick("Vehicle")}
        >
          Vehicle
        </a>
      </Menu.Item>
    </Menu>
  );
  //csv
  const policyCSVData = () => {
    let PoliciesData = [];
    const policyListArrayData = policyListArray && policyListArray;
    if (policyListArrayData) {
      PoliciesData.push(
        "Policy Name,Policy Code,Registration Number,Policy Type,Policy Duration,Policy Description\n"
      );
      policyListArrayData.map((excelData) => {
        // console.log("exceldata", excelData);
        PoliciesData.push(
          `${excelData.policyName},${excelData.policyCode}, ${excelData.registration}, ${excelData.policyType},${excelData.policyDuration},${excelData.description}\n`
        );
      });
    }
    return PoliciesData.join("");
  };
  const policyCSV = policyCSVData();
  // CSV END

  ///LIST API SERVICE CALL AND FUNCTIONALITY STARTED

  const handleGetPolicyListServiceCall = async (data) => {
    try {
      let tableDataArr = [];
      const resp = await getPolicyList(data);
      setPolicyListArray(resp && resp.data);
      resp &&
        resp.data.map((data, i) => {
          const value = {
            key: data.id,
            name: data.policyName,
            code: data.policyCode,
            type: data.policyType,
            count: data.policyCount,
            number: data.registration,
          };
          console.log(value);
          tableDataArr.push(value);
        });
      setTableData(tableDataArr);
      console.log("resp", resp);
      // console.log("policyList",policyListArray)
      // console.log(listAPIupdateStatus,"li")
    } catch (error) {
      console.log("error", error);
      
      // showAlert('In valide data', "error");
    }
  };
  useEffect(() => {
    handleGetPolicyListServiceCall(data);
  }, [listAPIupdateStatus]);

  ///LIST API SERVICE CALL AND FUNCTIONALITY ENDED
  const handlePolicyNameClick = (text, record) => {
    setPolicyListStatus(false);
    setAccidentListStatus(true);
    setSelectedPolicyData(record);
  };
  const handleShowModal = () => {
    setIsModalVisible(true);
  };
  const handleCancel = () => {
    form.resetFields();
    setIsModalVisible(false);
  };
  const handleEditShowModal = (text, record) => {
    console.log(record, text);
    const value = policyListArray.find((data) => data.id === record.key);
    console.log("value", value);
    if (value) {
      setPolicyId(value.id);
      setPolicyName(value.policyName);
      setRegistration(value.registration);
      setPolicyDuration(value.policyDuration);
      setPolicyType(value.policyType);
      setStatus(value.activeStatus)
      setPolicyDescription(value.description);
    }
    setIsEditModalVisible(true);
  };
  const handelEditCancel = () => {
    setIsEditModalVisible(false);
  };

  useEffect(() => {
    return () => {
      setPolicyListStatus(true);
      setAccidentListStatus(false);
    };
  }, []);

  ///ADD API SERVICE CALL AND FUNCTIONALITY STARTED

  const handleAddPolicyListAPI = async (addPolicyData) => {
    const payload = {
      policyName: addPolicyData.policyName,
      registration: addPolicyData.policyRegistration,
      policyType: addPolicyData.policyType,
      policyDuration: addPolicyData.policyDuration,
      activeStatus:addPolicyData.status,
      description: addPolicyData.policyDescription,
      token: Token,
    };
    try {
      const resp = await addPolicyList(payload);
      console.log("success");
      alert("Policy Added Succesfully!");
      handleGetPolicyListServiceCall(data);
      setListAPIupdateStatus(true);
      handleCancel();
    } catch (error) {
      console.log("error", error);
      alert("Something Went Wrong");
      // showAlert('In valide data', "error");
    }
  };

  const onFinish = (values) => {
    setAddPolicyData(values);
    handleAddPolicyListAPI(values);
    form.resetFields(values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed", errorInfo);
  };

  ///ADD API SERVICE CALL AND FUNCTIONALITY ENDED

  //Edit API SERVICE CALL AND FUNCTIONALITY STARTED

  const handleEditPolicyListAPI = async () => {
    const payload = {
      id: policyId,
      policyName: policyName,
      registration: registration,
      policyType: policyType,
      policyDuration: policyDuration,
      description: policyDescription,
      activeStatus:status
    };
    try {
      const resp = await editPolicyList(payload);
      console.log("success");
      alert("Policy Edited Successfully!");
      resp && handleGetPolicyListServiceCall(data);
      setListAPIupdateStatus(true);
      setIsEditModalVisible(false);
    } catch (error) {
      console.log("error", error);
      alert("Something Went Wrong");
      // showAlert('In valide data', "error");
    }
  };

  // const onFinish = (values) =>{
  //   setEditPolicyData(values)
  // }

  ///Edit API SERVICE CALL AND FUNCTIONALITY ENDED

  ///DELETE API SERVICE CALL AND FUNCTIONALITY STARTED

  const handleDeletePolicy = async (text, record) => {
    console.log("nnagvsvgv", text, record);
    const payload = {
      id: record.key,
    };
    try {
      const resp = await deletePolicyList(payload);
      console.log("success");
      alert("Policy Deleted Successfully!")
      handleGetPolicyListServiceCall(data);
      setListAPIupdateStatus(true);
    } catch (error) {
      console.log("error", error);
      // showAlert('In valide data', "error");
      alert("Something Went Wrong");
    }
  };
  ///DELETE API SERVICE CALL AND FUNCTIONALITY ENDED

  const columns = [
    // This section is made for responsiveness

    // Actual columns starts from here
    {
      title: "Policy Name",
      dataIndex: "name",
      key: "name",
      align: "center",

      sorter: (a, b) => a.name.length - b.name.length,
      render: (text, record) => (
        <a
          style={{ color: "#4cbb17" }}
          onClick={() => handlePolicyNameClick(text, record)}
        >
          {text}
        </a>
      ),
    },

    {
      title: "Policy Code",
      dataIndex: "code",
      key: "code",
      align: "center",
    },
    {
      title: "Registration",
      dataIndex: "number",
      key: "number",
      align: "center",
    },
    {
      title: "Policy Type",
      dataIndex: "type",
      key: "type",
      align: "center",
    },
    {
      title: "Active Count",
      dataIndex: "count",
      key: "count",
      align: "center",
    },
    {
      title: "Actions",
      key: "action",
      align: "center",

      render: (text, record) => {
        return (
          <>
            <EditOutlined
              style={{ color: "#000089", paddingLeft: "10px" }}
              onClick={() => handleEditShowModal(text, record)}
            />
            <DeleteOutlined
              style={{ paddingLeft: "30px" }}
              onClick={() => handleDeletePolicy(text, record)}
            />
          </>
        );
      },
    },
  ];

  const handeleBackButton = () => {
    setPolicyListStatus(true);
    setAccidentListStatus(false);
  };

  return (
    <>
      {policyListStatus && (
        <div>
          <Breadcrumb style={{ marginTop: "20px" }}>
            <Breadcrumb.Item onClick={handeleBackButton}>Home</Breadcrumb.Item>
            <Breadcrumb.Item>ListedPolicy</Breadcrumb.Item>
          </Breadcrumb>
          <div className="container-fluid">
            <div
              className="row"
              style={{
                marginTop: "20px",
                marginBottom: "25px",
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "row",
              }}
            >
              <div className="col-12 col-sm-2 col-md-2 ">
                <h3>Listed Policy</h3>
              </div>



               <div className="nav justify-content-center">
               <div
                className="col-12 col-sm-3 col-md-3"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                <Search placeholder="search Policy Type" onSearch={onSearch}  style={{
                  borderRadius: "25px",
                }}/>
              </div>
              <div
                className="col-12 col-sm-3 col-md-3"
                style={{ display: "flex", justifyContent: "center" }}
              >
                <Button
                  style={{
                    borderRadius: "5px",
                    backgroundColor: "#8ec131",
                    color: "white",
                  }}
                  onClick={handleShowModal}
                >
                  <PlusOutlined style={{ paddingTop: "5px" }} /> Add New Policy
                </Button>
              </div>
              <div
                className="col-12 col-sm-3 col-md-3 "
                style={{ display: "flex", justifyContent: "center" }}
              >
                <Dropdown placement="bottomCenter" overlay={content} arrow>
                  <Button
                    style={{
                      borderRadius: "5px",
                      backgroundColor: "#8ec131",
                      color: "white",
                      width: "180px",
                    }}
                  >
                    <FilterOutlined /> Add Filters
                  </Button>
                </Dropdown>
              </div>
              <div
                className="col-12 col-sm-3 col-md-3 "
                style={{ display: "flex", justifyContent: "center" }}
              >
                <Button
                  style={{
                    color: "#ffffff",
                    backgroundColor: "#000089",
                    borderRadius: "5px",

                  }}
                >
                  {/* Download PDF/CSV */}
                  <CSVLink data={policyCSV} target="_blank">
                    Download PDF/CSV
                  </CSVLink>
                </Button>
              </div>
               </div>
               </div>
          </div>
          <div className="container-fluid">
            <div className="DataTable" style={{ justifyContent: "center" }}>
              <Table
                style={{ marginTop: "10px" }}
                columns={columns}
                dataSource={tableData}
                //onChange={this.handleChange}
                pagination={true}
                total={10}
              />
            </div>
          </div>
          <div>
            <span>shown Results {tableData.length}</span>
          </div>
          <Modal
            title="Add Policy"
            visible={isModalVisible}
            footer={null}
            onCancel={handleCancel}
            okText="Create"
          >
            <Form
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              labelCol={{
                span: 8,
              }}
              wrapperCol={{
                span: 16,
              }}
            >
              <Form.Item
                name={"policyName"}
                label="Policy Name"
                //  style={{marginLeft:"20px"}}

                rules={[
                  {
                    required: true,
                    message: "Please Enter the Policy name",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name={"policyRegistration"}
                label="Registration"
                rules={[
                  {
                    required: true,
                    message: "Please Enter the registration",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name={"policyType"}
                label="Policy Type"
                rules={[
                  {
                    required: true,
                    message: "Please Enter the policy Type",
                  },
                ]}
              >
                <Select
                  placeholder="Select the Policy Type"
                  allowClear
                >
                  <Option value="General">General</Option>
                  <Option value="Health">Health</Option>
                  <Option value="Health&General">Health&General</Option>
                  <Option value="Vehicle">Vehicle</Option>
                </Select>
              </Form.Item>
              <Form.Item
                name={"status"}
                label="Active Status"
                rules={[
                  {
                    required: true,
                    message: "Please Enter the policy Type",
                  },
                ]}
              >
                <Select
                  placeholder="Select the status"
                  allowClear
                >
                  <Option value="true">true</Option>
                  <Option value="false">false</Option>
                </Select>
              </Form.Item>
              <Form.Item
                name={"policyDuration"}
                label="Policy Duration"
                rules={[
                  {
                    required: true,
                    message: "Please Enter the policy Duration",
                  },
                  {
                    pattern: /^(?:\d*)$/,
                    message: "Please enter numbers only",
                  },
                ]}
              >
                <InputNumber />
              </Form.Item>
              <Form.Item
                name={"policyDescription"}
                label="Description"
                rules={[
                  {
                    required: true,
                    message: "Please Enter the Description",
                  },
                ]}
              >
                <Input.TextArea />
              </Form.Item>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-mailnd",
                }}
              >
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                </Form.Item>
                <Form.Item>
                  <Button
                    type="primary"
                    style={{ marginLeft: "30px" }}
                    onClick={handleCancel}
                  >
                    Cancel
                  </Button>
                </Form.Item>
              </div>
            </Form>
          </Modal>
          <Modal
            visible={isEditModalVisible}
            onOk={handleEditPolicyListAPI}
            onCancel={handelEditCancel}
          >
            <ModalHeader
              style={{
                justifyContent: "center",
                fontSize: "18px",
                fontWeight: "bolder",
                color: "#000089",
                paddingBottom: "10px",
              }}
            >
              Edit Policy
            </ModalHeader>

            <form className="col-12">
              <div className="form-group mb-4">
                <input
                  className="col-xs-12 w-100"
                  type="name"
                  placeholder="Policy Name"
                  value={policyName}
                  onChange={(e) => setPolicyName(e.target.value)}
                />
              </div>
              <div className="form-group mb-4">
                <input
                  className="col-xs-12 w-100"
                  type="number"
                  placeholder="Registration Number"
                  value={registration}
                  onChange={(e) => setRegistration(e.target.value)}
                />
              </div>
              <div className="form-group mb-4">
                <input
                  className="col-xs-12 w-100"
                  type="type"
                  placeholder="Policy Type"
                  value={policyType}
                  onChange={(e) => setPolicyType(e.target.value)}
                />
              </div>
              <div className="form-group mb-4">
                <input
                  className="col-xs-12 w-100"
                  type="Duration"
                  placeholder="Policy Duration"
                  value={policyDuration}
                  onChange={(e) => setPolicyDuration(e.target.value)}
                />
              </div>
              <div className="form-group mb-4">
                <input
                  className="col-xs-12 w-100"
                  type="Duration"
                  placeholder="Policy status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                />
              </div>
              <div className="form-group mb-4">
                <textarea
                  className="col-xs-12 w-100"
                  type="Textarea"
                  placeholder="Policy Description"
                  value={policyDescription}
                  onChange={(e) => setPolicyDescription(e.target.value)}
                />
              </div>
            </form>
          </Modal>
        </div>
      )}
      {accidentListStatus && (
        <AccidentList
          data={selectedPolicyData}
          handeleBackButton={handeleBackButton}
        />
      )}
    </>
  );
};
export default AdListedPolocies;
