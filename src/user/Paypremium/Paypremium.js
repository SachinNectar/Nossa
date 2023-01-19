import React, { useEffect, useState } from "react";
import { Tabs, Button, Table, Breadcrumb } from "antd";
import {
  VerticalAlignBottomOutlined,
  UserOutlined,
  SaveFilled,
  MailFilled,
} from "@ant-design/icons";
import { getAllUserPolicyList } from "../../services/authentication";
import UserPolicy from "./UserPolicy";
import SucessModal from "./SucessModal";
import { CSVLink } from "react-csv";
import moment from "moment"

export const UserContext = React.createContext();

const { TabPane } = Tabs;

const Paypremium = () => {
  const [activetableData, setActiveTableData] = useState("");
  const [InactiveTableData, setInactiveTableData] = useState("");
  const [activeData, setActiveData] = useState("");
  const [inactiveData, setInActiveData] = useState("");
  const [selectedRecord, setSelectedRecord] = useState("");
  const [status, setStatus] = useState("");
  const [policyDetailsPage, setPolicyDetailsPage] = useState(false);
  const [paypremium, setPaypremium] = useState(true);
  const loginDetailsUserId = window.localStorage.getItem("loginDetailsUserId");
  const [successPage, setSucessPage] = useState(false);
  const [tab, settab] = useState("Active");

  const handleActivepolicyNoClick = (text, record) => {
    setSelectedRecord(record);
    setStatus(true);
    setPaypremium(false);
    setPolicyDetailsPage(true);
  };
  const handleInActivepolicyNoClick = (text, record) => {
    setSelectedRecord(record);
    setStatus(false);
    setPaypremium(false);
    setPolicyDetailsPage(true);
  };
  const handleSucessBack = () => {
    setSucessPage(false);
    setPaypremium(true);
  };
  const values = { successPage, handleSucessBack };

  const Inactivecolumns = [
    {
      title: "S.No",
      dataIndex: "key",
      key: "key",
      align: "center",
    },
    {
      title: "Policy Number",
      dataIndex: "code",
      key: "code",
      align: "center",

      render: (text, record) => (
        <div>
          {record.status === "Paid" ? (
            <a
              style={{ color: "#4cbb17" }}
              onClick={() => handleInActivepolicyNoClick(text, record)}
            >
              {text}
            </a>
          ) : (
            <label>
              {text}
              {/* {console.log("rec", record)} */}
            </label>
          )}
        </div>
      ),
    },
    {
      title: "Policy Name",
      dataIndex: "name",
      key: "name",
      align: "center",

      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: "Last Premium Date",
      dataIndex: "date",
      key: "date",
      align: "center",
    },
    {
      title: "Premium plan",
      dataIndex: "type",
      key: "type",
      align: "center",
    },
    {
      title: "Premium",
      dataIndex: "Amount",
      key: "Amount",
      align: "center",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      align: "center",

      render: (PremiumPaid) => (
        <p style={{ color: "#4cbb17" }}>{PremiumPaid}</p>
      ),
    },
  ];
  const Activecolumns = [
    {
      title: "S.No",
      dataIndex: "key",
      key: "key",
      align: "center",
    },
    {
      title: "Policy Number",
      dataIndex: "code",
      key: "code",
      align: "center",

      render: (text, record) => (
        <div>
          {record.status === "Paid" ? (
            <label>
              {text}
              {/* {console.log("rec", record)} */}
            </label>
          ) : (
            <a
              style={{ color: "#4cbb17" }}
              onClick={() => handleActivepolicyNoClick(text, record)}
            >
              {text}
            </a>
          )}
        </div>
      ),
    },
    {
      title: "Policy Name",
      dataIndex: "name",
      key: "name",
      align: "center",

      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: "Last Premium Paid",
      dataIndex: "date",
      key: "date",
      align: "center",
    },
    {
      title: "Premium plan",
      dataIndex: "type",
      key: "type",
      align: "center",
    },
    {
      title: "Premium",
      dataIndex: "Amount",
      key: "Amount",
      align: "center",
    },
    {
      title: "status",
      dataIndex: "status",
      key: "status",
      align: "center",
    },
  ];

  const handleActiveTab = async () => {
    try {
      let tableDataArr = [];
      const data = {
        policy_id: "",
        user_id: loginDetailsUserId,
        agent_id: "",
        premiumPlan: "",
        activeStatus: "1",
      };
      const resp = await getAllUserPolicyList(data);
      // console.log('active',resp)
      setActiveData(resp && resp);
      resp &&
        resp.data.map((data) => {
          const value = {
            key: data.id,
            name: data.policy.policyName,
            code: data.policy.policyCode,
            type: data.premiumPlan,
            status: data.premiumStatus ? data.premiumStatus:'',
            Amount: data.premiumAmount,
            date: moment(data.updatedAt).format('YYYY-MM-DD'),
          };
          tableDataArr.push(value);
        });
      setActiveTableData(tableDataArr);
    } catch (error) {
      console.log("error", error);
      // showAlert('In valide data', "error");
    }
  };
  const handleInActiveTab = async () => {
    try {
      let tableDataArr = [];
      const data = {
        policy_id: "",
        user_id: loginDetailsUserId,
        agent_id: "",
        premiumPlan: "",
        activeStatus: "0",
      };
      const resp = await getAllUserPolicyList(data);
      // console.log('inactive',resp)
      setInActiveData(resp && resp);
      resp &&
        resp.data.map((data) => {
          const value = {
            key: data.id,
            name: data.policy.policyName,
            code: data.policy.policyCode,
            type: data.premiumPlan,
            status: data.premiumStatus ? data.premiumStatus :'',
            Amount: data.premiumAmount,
            date: moment(data.updatedAt).format('YYYY-MM-DD'),
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
    handleActiveTab();
    handleInActiveTab();
  }, []);

  const handleBacktoActivePage = () => {
    setPaypremium(true);
    setPolicyDetailsPage(false);
  };

  //CSV Data

  const policyCSVData = () => {
    let ActivePoliciesData = [];
    const activetableDataArray = activetableData && activetableData;
    const InactiveTableDataArray = InactiveTableData && InactiveTableData;
    if (tab === "Active") {
      if (activetableDataArray) {
        ActivePoliciesData.push(
          " Sr.No ,Policy Number,Policy Name,Last Premium Date,Premium Plan,Premium,status\n"
        );
        activetableDataArray.map((excelData) => {
          // {console.log("ExcelDAta",excelData)}
          ActivePoliciesData.push(
            `${excelData.key},${excelData.code}, ${excelData.name}, ${excelData.date},${excelData.type},${excelData.Amount},${excelData.status},
          \n`
          );
        });
      }
    } else {
      if (InactiveTableDataArray) {
        InactiveTableDataArray.map((excelData) => {
          ActivePoliciesData.push(
            `${excelData.key},${excelData.code}, ${excelData.name}, ${excelData.date},${excelData.type},${excelData.Amount},${excelData.status},
          \n`
          );
        });
      }
    }
    return ActivePoliciesData.join("");
  };
  const policyCSV = policyCSVData();
  // CSV END

  return (
    <div>
      {paypremium && (
        <div>
          <Breadcrumb style={{ marginTop: "20px" }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>My Policy</Breadcrumb.Item>
          </Breadcrumb>
          <div className="container-fluid">
            <div className="row" style={{ marginTop: "20px" }}>
              <div className="col-12 col-sm-6 col-md-6">
                <h3>My Policy</h3>
              </div>
              <div
                className="col-12 col-sm-6 col-md-6"
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  flexDirection: "row",
                }}
              >
                <Button
                  style={{
                    borderRadius: "5px",
                    backgroundColor: "#002E5E",
                    color: "white",
                  }}
                >
                  <CSVLink data={policyCSV} target="_blank">
                    Download PDF/CSV
                  </CSVLink>
                </Button>
              </div>
            </div>
            <div>
            <Tabs defaultActiveKey="1" size="Large">
              <TabPane tab="Active" key="Active">
                <div className="activepolicydata">
                  <div
                    className="DataTable"
                    style={{ justifyContent: "center" }}
                  >
                    <Table
                      columns={Activecolumns}
                      dataSource={activetableData}
                      //onChange={this.handleChange}
                      pagination={true}
                      total={10}
                    />
                  </div>
                  <div style={{ fontSize: "15px" }}>
                    <span>shown Results {activetableData.length}</span>
                  </div>
                </div>
                <div
                  style={{
                    padding: "30px",
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  {/* <div>
                    <UserOutlined />
                    <p>Customer Service</p>
                  </div>
                  <div style={{ paddingLeft: "30px" }}>
                    <MailFilled />
                    <p>Raise A Complaint</p>
                  </div>
                  <div style={{ paddingLeft: "30px" }}>
                    <SaveFilled />
                    <p>Download statement</p>
                  </div> */}
                </div>
              </TabPane>

              <TabPane tab="InActive" key="InActive">
                <div className="inactivepolicydata">
                  <div
                    className="DataTable"
                    style={{ justifyContent: "center" }}
                  >
                    <Table
                      columns={Inactivecolumns}
                      dataSource={InactiveTableData}
                      //onChange={this.handleChange}
                      pagination={true}
                      total={10}
                    />
                  </div>
                  <div style={{ fontSize: "15px" }}>
                    <span>shown Results {InactiveTableData.length}</span>
                  </div>
                </div>
                <div
                  style={{
                    padding: "30px",
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <div>
                    <UserOutlined />
                    <p>Customer Service</p>
                  </div>
                  <div style={{ paddingLeft: "30px" }}>
                    <MailFilled />
                    <p>Raise A Complaint</p>
                  </div>
                  <div style={{ paddingLeft: "30px" }}>
                    <SaveFilled />
                    <p>Download statement</p>
                  </div>
                </div>

                {/* <Inactive tableData={InactiveTableData} inactiveData={inactiveData} /> */}
              </TabPane>
            </Tabs>
          </div>

          </div>

          
        </div>
      )}
      {policyDetailsPage && (
        <UserPolicy
          selectedRecord={selectedRecord}
          data={status ? activeData : inactiveData}
          status={status}
          handleBacktoActivePage={handleBacktoActivePage}
        />
      )}
      {/* <UserContext.Provider value={values}>
       <SucessModal/>
      </UserContext.Provider> */}

      {/* {policyDetailsPage && <UserPolicy selectedRecord={selectedRecord} data={props.activeData} status={true} handleBacktoActivePage={handleBacktoActivePage} />} */}
    </div>
  );
};
export default Paypremium;
