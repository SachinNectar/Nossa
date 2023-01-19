import React, { useState, useEffect } from "react";
import { Table, Button, Input, Modal, Form, Breadcrumb, Select } from "antd";
import { useNavigate } from "react-router-dom";
import {
  getAgentList,
  addAgentList,
  deleteAgentList,
  editAgentList,
  getAllUserPolicyList,
} from "../../services/authentication";
import { CSVLink } from "react-csv";
import AgentDataPage from "./Hrdata";

import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";


const { Search } = Input;

const HrList = () => {
  let navigate = useNavigate();
  const [AgentListArray, setAgentListArray] = useState("");
  const [TableAgentData, setTableAgentData] = useState("");
  const [AgentListStatus, setAgentListStatus] = useState(true);
  const [AgentDataListStatus, setAgentDataListStatus] = useState(false);
  const [addAgentData, setAddAgentData] = useState("");
  const [SelectedAgentData, setSelectedAgentData] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [AgentName, setAgentName] = useState("");
  const [EmailId, setEmailId] = useState("");
  const [Phone, setPhone] = useState("");
  const [CurrentAdress, setCurrentAdress] = useState("");
  const [PermenantAdress, setPermenantAdress] = useState("");
  const [tableData, setTableData] = useState("");
  const [AllHrPolicyListArray, setAllHrPolicyListArray] = useState("");
  const { Option } = Select;
  const[ErrorMsg,setErrorMsg]=useState('')

  const data = {
    search: "",
    type: "",
    id: "",
  };

  //csv
  const AgentCSVData = () => {
    let AgentData = [];
    const AgentListArrayData = AgentListArray && AgentListArray;
    if (AgentListArrayData) {
      AgentData.push(
        "Agent Name,AgentCode,Clients,Complaints Assigned,Complaints Resolved\n"
      );
      AgentData.map((excelData) => {
        AgentData.push(
          `${excelData.AgentName},${excelData.AgentCode}, ${excelData.Clients}, ${excelData.ComplaintsAssigned},${excelData.ComplaintsResolved}\n`
        );
      });
    }
    return AgentData.join("");
  };
  const AgentCSV = AgentCSVData();
  // CSV END

  //List Api for agent start
  const handleGetAgentListServiceCall = async (data) => {
    try {
      let tableAgentDataArr = [];
      const resp = await getAgentList(data);
      console.log("re",resp)
      setAgentListArray(resp && resp.data);
      resp &&
        resp.data.map((data) => {
          const value = {
            key: data.id,
            name: `${data.firstName} ${data.firstName}`,
            code: data.userName,
            members: data.totalClient,
            Assigned: data.totalComplaint,
            Resolved: data.totalResolvedComplaint,
          };
          tableAgentDataArr.push(value);
        });
      setTableAgentData(tableAgentDataArr);
    } catch (error) {
      console.log("error in the ", error);
      // showAlert('In valide data', "error");
    }
  };
  useEffect(() => {
    handleGetAgentListServiceCall(data);
  }, []);

  ///LIST API SERVICE CALL AND FUNCTIONALITY ENDED

  //Filter Table

  const handleFilterData = (HrFilterData) => {
    const tableAgentDataArr = [];
    console.log("filterData", HrFilterData);
    if (HrFilterData.length > 0) {
      HrFilterData.map((data, i) => {
        const value = {
          key: data.id,
          name: data.name,
          code: data.code,
          members: data.members,
          Assigned: data.Assigned,
          Resolved: data.Resolved,
        };
        tableAgentDataArr.push(value);
      });
    }
    return tableAgentDataArr;
  };

  const onSearch = (value) => 
{
  const HrFilterData = TableAgentData.filter((data) => {
    // console.log("upper",data)
    const itemData = data.code.toUpperCase();
    const textData = value.toUpperCase();
    return itemData.indexOf(textData) > -1;
  });
  const searchFilter = handleFilterData(HrFilterData);
  console.log("fft",searchFilter)
  setTableAgentData(searchFilter);
}

  const handleShowModal = () => {
    setIsModalVisible(true);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const handleEditShowModal = (text, record) => {
    const value = AgentListArray.find((data) => data.id === record.key);
    if (value) {
      // setPolicyId(value.id)
      // setPolicyName(value.policyName)
      // setRegistration(value.registration)
      // setPolicyDuration(value.policyDuration)
      // setPolicyType(value.policyType)
      // setPolicyDescription(value.description)
    }
    setIsEditModalVisible(true);
  };
  const handelEditCancel = () => {
    setIsEditModalVisible(false);
  };

  useEffect(() => {
    return () => {
      setAgentListStatus(true);
      setAgentDataListStatus(false);
    };
  }, []);

  ///ADD API SERVICE CALL AND FUNCTIONALITY STARTED

  const handleAddAgnetListAPI = async (addAgentData) => {
    console.log("addAgentData", addAgentData);
    const data = {
      firstName: addAgentData.firstName,
      lastName: addAgentData.lastName,
      permanentAddress: addAgentData.permanentAddress,
      phone: addAgentData.phone.toString(),
      gendar: addAgentData.gender,
      email: addAgentData.Email,
      currentAddress: addAgentData.currentAddress,
      city: addAgentData.city,
    };
    try {
      const resp = await addAgentList(data);
      alert("Manager Added Successfully!");
      handleGetAgentListServiceCall();
      handleCancel();
    } catch (error) {
      console.log("error", error.response.data.message);
      setErrorMsg( error.response.data.message)
      alert("Something Went Wrong");
      // showAlert('In valide data', "error");
    }
  };

  const onFinish = (values) => {
    setAddAgentData(values);
    handleAddAgnetListAPI(values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed", errorInfo);
  };

  ///ADD API SERVICE CALL AND FUNCTIONALITY ENDED

  //Edit API SERVICE CALL AND FUNCTIONALITY STARTED

  const handleEditAgentListAPI = async () => {
    const data = {
      // 'id':policyId,
      // 'policyName': policyName,
      // 'registration': registration,
      // 'policyType':policyType,
      // 'policyDuration':policyDuration,
      // 'description': policyDescription
    };
    try {
      const resp = await editAgentList(data);
      handleGetAgentListServiceCall();
    } catch (error) {
      console.log("error", error);
      // showAlert('In valide data', "error");
    }
  };

  ///Edit API SERVICE CALL AND FUNCTIONALITY ENDED

  ///DELETE API SERVICE CALL AND FUNCTIONALITY STARTED

  const handleAgentDelete = async (text, record) => {
    const data = {
      id: record.key,
    };
    try {
      const resp = await deleteAgentList(data);
      alert("Manager Deleted Successfully!");
      handleGetAgentListServiceCall();
    } catch (error) {
      console.log("error", error);
      alert("Something Went Wrong");
    }
  };
  ///DELETE API SERVICE CALL AND FUNCTIONALITY ENDED

  const handleAllPolicyList = async (AgentList) => {
    try {
      let tableDataArr = [];
      const data = {
        policy_id: "",
        user_id: "",
        agent_id: AgentList.id,
        premiumPlan: "",
        activeStatus: "",
      };
      const resp = await getAllUserPolicyList(data);
      setAllHrPolicyListArray(resp && resp.data);
      resp &&
        resp.data.map((data, i) => {
          const value = {
            key: data.id,
            name: data.policy.policyName,
            code: data.policy.policyCode,
            type: data.premiumPlan,
            status: data.premiumStatus,
            count: data.numberOfClaims,
            Amount: data.premiumAmount,
            date: data.createdAt,
          };
          console.log(value);
          tableDataArr.push(value);
        });
      setTableData(tableDataArr);
      setAgentDataListStatus(true);
    } catch (error) {
      console.log("error", error);
      // showAlert('In valide data', "error");
    }
  };

  const handleAgentNameClick = (text, record) => {
    setAgentListStatus(false);
    const AgentList = AgentListArray.filter(
      (data) => data.id === record.key
    )[0];
    setSelectedAgentData(AgentList);
    handleAllPolicyList(AgentList);
  };

  //Responsive

  const columns = [
   

    {
      title: "Agent Name",
      dataIndex: "name",
      key: "name",
      align:"center",
     

      sorter: (a, b) => a.name.length - b.name.length,
      render: (text, record) => (
        <a
          style={{ color: "#4cbb17" }}
          onClick={() => handleAgentNameClick(text, record)}
        >
          {text}
        </a>
      ),
      
    },

    {
      title: "Code",
      dataIndex: "code",
      key: "code",
      align:"center",
    
    },
    {
      title: "Clients",
      dataIndex: "members",
      key: "members",
      align:"center",
    
    },
    {
      title: "Complaint Assigned",
      dataIndex: "Assigned",
      key: "Assigned",
      align:"center",
    
    },
    {
      title: "Complaint Resolved",
      dataIndex: "Resolved",
      key: "Resolved",
      align:"center",
    
      render: (text) => <span style={{ color: "#4cbb17" }}>{text}</span>,
     
    },
    {
      title: "Actions",
      key: "action",
      align:"center",
     
      render: (text, record) => {
        return (
          <>
            {/* <EditOutlined
              style={{ color: "#000089", paddingLeft: "10px" }}
              onClick={() => handleEditShowModal(text, record)}
            /> */}
            <DeleteOutlined
              style={{ paddingLeft: "30px" }}
              onClick={() => handleAgentDelete(text, record)}
            />
          </>
        );
      },
      
    },
  ];

  const handeleBackButton = () => {
    setAgentListStatus(true);
    setAgentDataListStatus(false);
  };

  return (
    <>
      {AgentListStatus && (
        <div className="container-fluid">
           <Breadcrumb style={{ marginTop: "20px" }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>Manager List</Breadcrumb.Item>
            {/* <Breadcrumb.Item>claim Details</Breadcrumb.Item> */}
          </Breadcrumb>
          <div
            className="ant-row"
            style={{
              marginTop: "20px",
              marginBottom: "25px",
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "row",
            }}
          >
            <div className="col-12 col-sm-3 col-md-3">
              <h3>Account Manager List</h3>
            </div>
            <div className="nav justify-content-center">
              <div
                className="col-12 col-sm-5 col-md-5"
                style={{ display: "flex", flexDirection: "row",justifyContent:"center" }}
              >
                <Search
                  placeholder="search Policy code"
                  onSearch={onSearch}
                  style={{
                    width: 300,
                    borderRadius: "25px",
                    marginRight: "10px",
                  }}
                />
              </div>
              <div
                className="col-12 col-sm-3 col-md-3"
                style={{ display: "flex", flexDirection: "row" ,justifyContent:"center" }}
              >
                <Button
                  style={{
                    borderRadius: "5px",
                    marginRight: "10px",
                    backgroundColor: "#8ec131",
                    color: "white",
                  }}
                  onClick={() => handleShowModal()}
                >
                  <PlusOutlined style={{ paddingTop: "5px" }} /> Add New HR
                </Button>
              </div>
              <div
                className="col-12 col-sm-3 col-md-3"
                style={{ display: "flex", flexDirection: "row" ,justifyContent:"center" }}
              >
                <Button
                  style={{
                    color: "#ffffff",
                    backgroundColor: "#002E5E",
                    borderRadius:"5px",
                    
                  }}
                >
                  {/* Download PDF/CSV */}
                  <CSVLink data={AgentCSV} target="_blank">
                    Download PDF/CSV
                  </CSVLink>
                </Button>
              </div>
            </div>
          </div>
          <div className="container-fluid">
            <div className=" DataTable" style={{justifyContent:"center"}}>
              <Table
                // style={{  }}
                columns={columns}
                dataSource={TableAgentData}
                pagination={{
                  pageSize: 10,
                  total: totalPages,
                }}
              />
               </div>
          </div>

              <div>
                <span>shown Results {AgentListArray.length}</span>
              </div>
           
          <Modal
            title="Add Agent"
            visible={isModalVisible}
            footer={null}
            onCancel={handleCancel}
            width={500}
          >
            {/* onOk={handleAddAgnetListAPI} */}
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
                name={"firstName"}
                label="First Name"
      
                rules={[
                  {
                    required: true,
                    message: "Please Enter the First name",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name={"lastName"}
                label="Last Name"
               
                rules={[
                  {
                    required: true,
                    message: "Please Enter the Last name",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name={"Email"}
                label="Email id"
               
                rules={[
                  {
                    required: true,
                    message: "Please Enter the email",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="gender"
                label="Gender"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Select
                  placeholder="select the Gender"
                  //onChange={onGenderChange}
                  // allowClear
                >
                  <Option value="male">male</Option>
                  <Option value="female">female</Option>
                  <Option value="other">other</Option>
                </Select>
              </Form.Item>
              <Form.Item
                name={"permanentAddress"}
                label="permanent Address"
                rules={[
                  {
                    required: true,
                    message: "Please Enter the adress",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name={"currentAddress"}
                label="Current Address"
                rules={[
                  {
                    required: true,
                    message: "Please Enter the current adress",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name={"city"}
                label="City"
                rules={[
                  {
                    required: true,
                    message: "Please Enter the city",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name={"phone"}
                label="phone"
                rules={[
                  {
                 required: true, message: 'Please input your phone number!'
                },
                  {
                    required: true,
                    pattern: /^(?:\d*)$/,
                    message: "Please enter numbers only",
                  },
                ]}
              >
                <Input
                />
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
              <div style={{display:'flex',justifyContent:'center'}}>
                  <h6 style={{color:'red'}}>
                    {ErrorMsg}
                  </h6>
                </div>
            </Form>
          </Modal>

          <Modal
            title="Edit Agent"
            visible={isEditModalVisible}
            onOk={handleEditAgentListAPI}
            onCancel={handelEditCancel}
            okText="Create"
            style={{ width: "100%" }}
          >
            <form className="col-12 col-xl-4 col-12">
              <div className="form-group mb-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Agent Name"
                  value={AgentName}
                  onChange={(e) => setAgentName(e.target.value)}
                />
              </div>
              <br />
              <div className="form-group mb-4">
                <input
                 
                  className="form-control" 
                  type="email"
                  placeholder="Email"
                  value={EmailId}
                  onChange={(e) => setEmailId(e.target.value)}
                />
              </div>
              <br />
              <div className="form-group mb-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Phone"
                  value={Phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <br />
              <div className="form-group mb-4">
                <textarea
                  className="form-control"
                  type="Adress"
                  placeholder="Current Adress"
                  value={CurrentAdress}
                  onChange={(e) => setCurrentAdress(e.target.value)}
                />
              </div>
              <br />
              <div className="form-group mb-4">
                <textarea
                  type="textArea"
                  className="form-control"
                  placeholder="Permenant Adress"
                  value={PermenantAdress}
                  onChange={(e) => setPermenantAdress(e.target.value)}
                />
              </div>
            </form>
          </Modal>
        </div>
      )}
      {AgentDataListStatus && (
        <AgentDataPage
          data={SelectedAgentData}
          tableData={tableData}
          AllHrPolicyListArray={AllHrPolicyListArray}
          handeleBackButton={handeleBackButton}
        />
      )}
    </>
  );
};
export default HrList;
