import React, { useState, useEffect } from "react";
import { Tabs, Button, Input, Breadcrumb, Dropdown, Menu, Table,Form } from "antd";
import { CSVLink } from "react-csv";
import { PlusOutlined, FilterOutlined } from "@ant-design/icons";
import Hractive from "./Hractive";
import HrInactive from "./HrInactive";

import { getPolicyList } from "../../services/authentication";

const { Search } = Input;

const Hrlisted = () => {
  const [activetableData, setActiveTableData] = useState("");
  const [InactiveTableData, setInactiveTableData] = useState("");
  const [activeData, setActiveData] = useState("");
  const [inactiveData, setinactiveData] = useState("");
  const [tabStatus, setTabStatus] = useState("Active");
  const [listAPIupdateStatus, setListAPIupdateStatus] = useState(false);
  const loginDetailsUserId = window.localStorage.getItem("loginDetailsUserId");
  const { TabPane } = Tabs;

 
  const activeDatapayload = {
    id:'',
     search:"",
     type:'',
     activeStatus:"1"
   };
   const InActiveDataPayload = {
    id:'',
    activeStatus: "0",
    search:"",
    type:'',
    
  };
  // const [form] = Form.useForm();
  const onSearch = (value) => {
    const searchData = {
      search: value,
      type: "",
      id: "",
      activeStatus:'',
    };
    if(tabStatus==="Active"){
      handleActiveTab(searchData);
      setListAPIupdateStatus(true);
    }
    else{
      handleInActiveTab(searchData);
      setListAPIupdateStatus(true);
    }
  }

  
  const handleClick = (type) => {
    const searchData = {
      search: "",
      type: type,
      id: "",
      activeStatus:''
    };
    if( tabStatus ==="Active"){
    handleActiveTab(searchData);
    setListAPIupdateStatus(true);
  }
  else {
    handleInActiveTab(searchData);
    setListAPIupdateStatus(true);
 }
}
  
  const handleActiveTab = async (data) => {
    try {
      let tableDataArr = [];
      const resp = await getPolicyList(data);
      console.log("ac",resp)
      setActiveData(resp && resp.data);
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
          tableDataArr.push(value);
        });
      setActiveTableData(tableDataArr);
    } catch (error) {
      console.log("error", error);
      // showAlert('In valide data', "error");
    }
  };
  const handleInActiveTab = async (data) => {
    try {
      let tableDataArr = [];
      const resp = await getPolicyList(data);
      console.log("Inac",resp)
      setinactiveData(resp && resp.data);
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
          tableDataArr.push(value);
        });
      setInactiveTableData(tableDataArr);
    } catch (error) {
      console.log("error", error);
      // showAlert('In valide data', "error");
    }
  };

  useEffect(() => {
    handleActiveTab(activeDatapayload);
    handleInActiveTab(InActiveDataPayload);
  }, []);

 



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
    let ActivePoliciesData = [];
    const activetableDataArray = activetableData && activetableData;
    const InactiveTableDataArray = InactiveTableData && InactiveTableData;
    if (activetableDataArray) {
      ActivePoliciesData.push(
        "Policy Name,Policy Code,registration,Policy Type,Active Count\n"
      );
      activetableDataArray.map((excelData) => {
        ActivePoliciesData.push(
          `${excelData.name},${excelData.code}, ${excelData.number}, ${
            excelData.type
          },${null}\n`
        );
      });
    }
    if (InactiveTableDataArray) {
      InactiveTableDataArray.map((excelData) => {
        ActivePoliciesData.push(
          `${excelData.name},${excelData.code}, ${excelData.number}, ${
            excelData.type
          },${null}\n`
        );
      });
    }
    return ActivePoliciesData.join("");
  };
  const policyCSV = policyCSVData();
  // CSV END

  const handleCallBack = (key) => {
    setTabStatus(key);
  };

  const Activecolumns = [
    {
      title: "Policy Name",
      dataIndex: "name",
      align:"center",

      sorter: (a, b) => a.name.length - b.name.length,
      render: (text) => <a style={{ color: "#4cbb17" }}>{text}</a>,
    },

    {
      title: "Policy Code",
      dataIndex: "code",
      key: "code",
      align:"center",
    },
    {
      title: "Registration",
      dataIndex: "number",
      key: "number",
      align:"center",
    },
    {
      title: "Policy Type",
      dataIndex: "type",
      key: "type",
      align:"center",
    },
    {
      title: "Active Policies",
      dataIndex: "count",
      key: "count",
      align:"center",
    },
//     {
//       title: "Actions",
//       key: "action",

//       render: (text, record) => {
//         return (
//           <>
//             {/* <EditOutlined style={{ color: "#000089", paddingLeft: "10px" }} onClick={handleEditShowModal}
// />
//             <DeleteOutlined style={{paddingLeft:"30px"}}  onClick={()=>handleDeletePolicy(text,record)}/> */}
//           </>
//         );
//       },
//     },
  ];

  const InActiveColumns = [
    {
      title: "Policy Name",
      dataIndex: "name",
      key: "name",
      align:"center",
     
      sorter: (a, b) => a.name.length - b.name.length,
      render: (text) => <a style={{ color: "#4cbb17" }}>{text}</a>,
    },

    {
      title: "Policy Code",
      dataIndex: "code",
      key: "code",
      align:"center",
     
    },
    {
      title: "Registration",
      dataIndex: "number",
      key: "number",
      align:"center",
     
    },
    {
      title: "Policy Type",
      dataIndex: "type",
      key: "type",
      align:"center",
     
    },
    {
      title: "InActive Policies",
      dataIndex: "count",
      key: "count",
      align:"center",
     
    },
//     {
//       title: "Actions",
//       key: "action",
     
//       render: (text, record) => {
//         return (
//           <>
//             {/* <EditOutlined style={{ color: "#000089", paddingLeft: "10px" }} onClick={handleEditShowModal}
// />
//             <DeleteOutlined style={{paddingLeft:"30px"}}  onClick={()=>handleDeletePolicy(text,record)}/> */}
//           </>
//         );
//       },
//     },
  ];

  return (
    <div>
      <div className="container-fluid">
        <Breadcrumb style={{ marginTop: "20px" }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>ListedPolicy</Breadcrumb.Item>
        </Breadcrumb>
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
          <div className="col-12 col-sm-3 col-md-3">
            <h3>Listed Policy</h3>
          </div>
          <div className="nav justify-content-center">
            <div
              className="col-12 col-sm-5 col-md-5"
              style={{ display: "flex", flexDirection: "row" }}
            >
              <Search
                placeholder="search Policy Name"
                onSearch={onSearch}
                style={{
                  borderRadius: "25px",
                }}
              />
            </div>
            <div
              className="col-12 col-sm-4 col-md-4"
              style={{ display: "flex", flexDirection: "row",justifyContent:"center" }}
            >
              <Dropdown placement="bottomCenter" overlay={content} arrow>
                <Button
                  style={{
                    borderRadius: "5px",
                    backgroundColor: "#8ec131",
                    color: "white",
                  
                  }}
                >
                  <FilterOutlined/> Add Filters
                </Button>
              </Dropdown>
            </div>
            <div
              className="col-12 col-sm-3 col-md-3"
              style={{ display: "flex", flexDirection: "row",justifyContent:"center" }}
            >
              <Button
                style={{
                  color: "#ffffff",
                  backgroundColor: "#002E5E",
                  borderRadius: "5px",
                }}
              >
                <CSVLink data={policyCSV} target="_blank">
                  Download PDF/CSV
                </CSVLink>
              </Button>
            </div>
          </div>
        </div>

       
          <div>
            <Tabs
              defaultActiveKey="1"
              style={{ fontSize: "30px" }}
              size="Large"
              onChange={handleCallBack}
            >
              <TabPane tab="Active" key="Active">
                <div className="container-fluid">
                  <div
                    className="DataTable"
                    style={{ justifyContent: "center" }}
                  >
                    <Table
                      columns={Activecolumns}
                      dataSource={activetableData}
                      //onChange={this.handleChange}
                      pagination={true}
                    />
                  </div>
                </div>
              </TabPane>
              <TabPane tab="InActive" key="InActive">
                <div className="container-fluid">
                  <div
                    className="DataTable"
                    style={{ justifyContent: "center" }}
                  >
                    <Table
                      columns={InActiveColumns}
                      dataSource={InactiveTableData}
                      //onChange={this.handleChange}
                      pagination={true}
                    />
                  </div>
                </div>
              </TabPane>
            </Tabs>
          </div>
     
      </div>
      {/* <Modal
        title="Edit Policy"
        visible={isEditModalVisible}
        onOk={null}
        onCancel={handelEditCancel}
      >
        <Form
          onFinish={onFinish}
          //  onFinishFailed={onFinishFailed}
        >
          <Form.Item
            name={"policyName"}
            label="Policy Name"
            rules={[
              {
                required: true,
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
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={"policyDuration"}
            label="Policy Duration"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={"policyDescription"}
            label="Description"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal> */}
    </div>
  );
};
export default Hrlisted;
