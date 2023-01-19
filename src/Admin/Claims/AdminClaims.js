import React, { useState, useEffect } from "react";
import { Tabs, Table, Button, Input, Breadcrumb, Dropdown, Menu } from "antd";
import { CSVLink } from "react-csv";
import {
  FilterOutlined,
  EllipsisOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { getClaimsList } from "../../services/authentication";
import HrClaimDetails from "../../Hr/HrClaims/HrClaimDetails";
import moment from "moment";

const AdminClaims = () => {
  const [recievedTableData, setRecievedTableData] = useState("");
  const [recievedData, setRecievedData] = useState(" ");
  const [settledTableData, setSettledTableData] = useState("");
  const [settledData, setSettledData] = useState(" ");
  const [tabStatus, setTabStatus] = useState("Recieved");
  const [selectedRecord, setSelectedRecord] = useState("");
  const [HrClaimDetailsPage, setHrClaimDetailsPage] = useState("");
  const [AdminClaims, setAdminClaims] = useState(true);

  const handleComplaintClick = (text, record) => {
    setHrClaimDetailsPage(true);
    setAdminClaims(false);
    setSelectedRecord(record);
  };
  const handleBack = () => {
    setHrClaimDetailsPage(false);
    setAdminClaims(true);
  };

  const handleTabStatus = (key) => {
    setTabStatus(key);
  };

  const onSearch = (value) => {
    if (tabStatus === "Recieved") {
      const recievedfilterData = recievedData.filter((data) => {
        const itemData = data.userPolicy.policy.policyName.toUpperCase();
        const textData = value.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      const searchFilter = handleFilterData(recievedfilterData);
      setRecievedTableData(searchFilter);
    } else {
      const SettledfilterData = settledData.filter((data) => {
        const itemData = data.userPolicy.policy.policyName.toUpperCase();
        const textData = value.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      const searchFilter = handleFilterData(SettledfilterData);
      setSettledTableData(searchFilter);
    }
  };

  const { TabPane } = Tabs;

  const { Search } = Input;

  const menu = (
    <Menu>
      <Menu.Item key="1">Assigned to</Menu.Item>
      <Menu.Item key="2">Accept</Menu.Item>
      <Menu.Item key="3">Reject</Menu.Item>
    </Menu>
  );

  const handleRecievedTab = async () => {
    try {
      let tableDataArr = [];
      const data = {
        policy_id: "",
        user_id: "",
        agent_id: "",
        premiumPlan: "",
        verifyStatus: "Not Submited",
      };
      const resp = await getClaimsList(data);
      console.log("resp", resp);
      setRecievedData(resp && resp.data);
      resp &&
        resp.data.map((data) => {
          const value = {
            id: data.claimCode,
            policyHolder: `${data.userPolicy.user.firstName} ${data.userPolicy.user.lastName}`,
            policyName: data.userPolicy.policy.policyName,
            amount: data.sumInsured,
            code: data.userPolicy.policy.policyCode,
            date: moment(data.claim_details && data.claim_details.createdAt).format("YYYY-MM-DD"),
            status: data.verifyStatus,
            agent: `${data.userPolicy.agent.firstName} ${data.userPolicy.agent.lastName}`,
            key: data.id,
            //description:data.userPolicy.policy.description
          };
          tableDataArr.push(value);
        });
      console.log("arr", tableDataArr);
      setRecievedTableData(tableDataArr);
    } catch (error) {
      console.log("error", error);
      // showAlert('In valide data', "error");
    }
  };
  console.log("reta", recievedTableData);

  const handleSettledTab = async () => {
    try {
      let tableDataArr = [];
      const data = {
        policy_id: "",
        user_id: "",
        agent_id: "",
        premiumPlan: "",
        verifyStatus: "Approved",
      };
      const resp = await getClaimsList(data);
      setSettledData(resp && resp.data);
      console.log("resp", resp);
      resp &&
        resp.data.map((data, i) => {
          const value = {
            id: data.claimCode,
            policyHolder: `${data.userPolicy.user.firstName} ${data.userPolicy.user.lastName}`,
            policyName: data.userPolicy.policy.policyName,
            amount: data.sumInsured,
            code: data.userPolicy.policy.policyCode,
            date: moment(data.claim_details && data.claim_details.createdAt).format("YYYY-MM-DD"),
            status: data.verifyStatus,
            agent: `${data.userPolicy.agent.firstName} ${data.userPolicy.agent.lastName}`,
            key: data.id,
          };
          tableDataArr.push(value);
        });

      setSettledTableData(tableDataArr);
      console.log("settledarray", tableDataArr);
    } catch (error) {
      console.log("error", error);
      // showAlert('In valide data', "error");
    }
  };

  useEffect(() => {
    handleRecievedTab();
    handleSettledTab();
  }, []);

  const handleFilterData = (filterData) => {
    const tableDataArr = [];
    console.log("filterData", filterData);
    if (filterData.length > 0) {
      filterData.map((data, i) => {
        const value = {
          id: data.claim_details && data.claim_details.claim_id,
          policyHolder: `${data.userPolicy.user.firstName} ${data.userPolicy.user.lastName}`,
          policyName: data.userPolicy.policy.policyName,
          amount: data.sumInsured,
          code: data.userPolicy.policy.policyCode,
          date: moment(data.claim_details && data.claim_details.createdAt).format('YYYY-MM-DD'),
          status: data.verifyStatus,
          amount: data.sumInsured,
        };
        tableDataArr.push(value);
      });
    }
    return tableDataArr;
  };

  const handleClick = (status) => {
    if (tabStatus === "Recieved") {
      const recievedfilterData = recievedData.filter(
        (data) => data.verifyStatus === status
      );
      const recieved = handleFilterData(recievedfilterData);
      console.log("recievedfilterData", recievedfilterData);
      setRecievedTableData(recieved);
    } else {
      const settledfilterData = settledData.filter(
        (data) => data.verifyStatus === status
      );
      const settled = handleFilterData(settledfilterData);
      console.log("settledfilterData", settledfilterData);
      setSettledTableData(settled);
    }
  };
  //csv link
  const ClaimCSVData = () => {
    let RecievedClaimsData = [];
    const recievedtableDataArray = recievedTableData && recievedTableData;
    console.log("receiv", recievedtableDataArray);

    const settledTableDataArray = settledTableData && settledTableData;
    console.log("sett", settledTableData);
    if (tabStatus === "Recieved") {
      if (recievedtableDataArray) {
        RecievedClaimsData.push(
          "id,policy Holder,Policy Name,Policy Code,Request Date,Claim Amount,Assigned By\n"
        );
        recievedtableDataArray.map((excelData) => {
          // console.log("EXCEL",excelData)
          RecievedClaimsData.push(
            `${excelData.id},${excelData.policyHolder},${excelData.policyName},${excelData.code}, ${excelData.date}, ${excelData.amount},${excelData.agent}\n`
          );
        });
      }
    } else {
      if (settledTableDataArray) {
        RecievedClaimsData.push(
          "Claim_ID,policy Holder,Policy Name,Policy Code,Request Date,Claim Amount,Approved Amount\n"
        );
        settledTableDataArray.map((excelData) => {
          // console.log("xl",excelData)
          RecievedClaimsData.push(
            `${excelData.id},${excelData.policyHolder},${excelData.policyName},${excelData.code}, ${excelData.date}, ${excelData.amount},${excelData.agent}\n`
          );
        });
      }
    }
    return RecievedClaimsData.join("");
  };

  const ClaimCSV = ClaimCSVData();

  const content = (
    <Menu>
      <Menu.Item>
        <a
          target="_blank"
          rel="noopener norefer"
          onClick={() => handleClick("Recieved for Approval")}
        >
          {" "}
          Recieved for Approval
        </a>
      </Menu.Item>
      <Menu.Item>
        <a
          target="_blank"
          rel="noopener norefer"
          onClick={() => handleClick("Approved")}
        >
          Approved
        </a>
      </Menu.Item>
      <Menu.Item>
        <a
          target="_blank"
          rel="noopener norefer"
          onClick={() => handleClick("Rejected")}
        >
          Rejected
        </a>
      </Menu.Item>
      <Menu.Item>
        <a
          target="_blank"
          rel="noopener norefer"
          onClick={() => handleClick("Not Submited")}
        >
          Not Submited
        </a>
      </Menu.Item>
    </Menu>
  );
  const RecievedColumns = [
    // This section is written to make the table responsive

    // Actual Columns of tables starts from here
    {
      title: "Claim ID",
      dataIndex: "id",
      key: "id",
      align: "center",

      render: (text, record) => (
        <a
          style={{ color: "#4cbb17" }}
          onClick={() => handleComplaintClick(text, record)}
        >
          {text}
        </a>
      ),
    },
    {
      title: "Policy Holder",
      dataIndex: "policyHolder",
      key: "policyHolder",
      align: "center",
    },

    {
      title: "Policy Name",
      dataIndex: "policyName",
      key: "policyName",
      align: "center",
    },
    {
      title: "Claim Amt",
      dataIndex: "amount",
      key: "amount",
      align: "center",
    },
    {
      title: "Request Date",
      dataIndex: "date",
      key: "date",
      align: "center",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      align: "center",
    },
    {
      title: "Assigned By",
      dataIndex: "agent",
      key: "agent",
      align: "center",
    },
    // {
    //   title: "Action",
    //   key: "action",
    //   align:"center",

    //   render: (text, record) => {
    //     return (
    //       <>
    //         <EyeOutlined style={{ color: "#000089", paddingLeft: "10px" }} />
    //         <Dropdown overlay={menu}>
    //           <a className="ant-dropdown-link">
    //             <EllipsisOutlined style={{ paddingLeft: "30px" }} />
    //           </a>
    //         </Dropdown>
    //       </>
    //     );
    //   },
    // },
  ];

  const SettledColumns = [
    // This section is written to make the table responsive

    // Actual Columns of tables starts from here
    {
      title: "Claim ID",
      dataIndex: "id",
      key: "id",
      align: "center",

      render: (text, record) => (
        <p
          style={{ color: "#4cbb17" }}
          //onClick={() => handlePolicyNameClick(text,record)}
        >
          {text}
        </p>
      ),
    },
    {
      title: "Policy Holder",
      dataIndex: "policyHolder",
      key: "policyHolder",
      align: "center",
    },

    {
      title: "Policy Name",
      dataIndex: "policyName",
      key: "policyName",
      align: "center",
    },

    {
      title: "Policy code",
      dataIndex: "code",
      key: "code ",
      align: "center",
    },

    {
      title: "Request Date",
      dataIndex: "date",
      key: "date",
      align: "center",
    },
    {
      title: "Claim Amt",
      dataIndex: "amount",
      key: "amount",
      align: "center",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      align: "center",
    },

    {
      title: "Approved",
      dataIndex: "amount",
      key: "amount",
      align: "center",
    },
    // {
    //   title: "Actions",
    //   key: "action",
    //   align:"center",

    //   render: (text, record) => {
    //     return (
    //       <>
    //         <EyeOutlined style={{ color: "#000089", paddingLeft: "10px" }} />
    //         <Dropdown overlay={menu}>
    //           <a className="ant-dropdown-link">
    //             <EllipsisOutlined style={{ paddingLeft: "30px" }} />
    //           </a>
    //         </Dropdown>
    //       </>
    //     );
    //   },
    // },
  ];

  return (
    <div>
      {AdminClaims && (
        <div className="container-fluid">
          <Breadcrumb style={{ marginTop: "20px" }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>claims</Breadcrumb.Item>
            {/* <Breadcrumb.Item>claim Details</Breadcrumb.Item> */}
          </Breadcrumb>
          <div
            className="row"
            style={{
              padding: "15px",
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "row",
            }}
          >
            <div className="col-12 col-sm-3 col-md-3">
              <h3>Received Claims</h3>
            </div>
            <div className="nav justify-content-center">
              <div
                className="col-12 col-sm-5 col-md-5"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                <Search
                  placeholder="search PolicyName"
                  onSearch={onSearch}
                  style={{
                    borderRadius: "25px",
                  }}
                />
              </div>
              <div
                className="col-12 col-sm-3 col-md-3"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                <Dropdown placement="bottomCenter" overlay={content} arrow>
                  <Button
                    style={{
                      borderRadius: "5px",
                      backgroundColor: "#8ec131",
                      color: "white",
                    }}
                  >
                    <FilterOutlined /> Add Filters
                  </Button>
                </Dropdown>
              </div>
              <div
                className="col-12 col-sm-3 col-md-3"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                <Button
                  style={{
                    color: "#ffffff",
                    backgroundColor: "#002E5E",
                    borderRadius: "5px",
                    marginLeft:"15px"
                  }}
                >
                  <CSVLink data={ClaimCSV} target="_blank">
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
              onChange={handleTabStatus}
            >
              <TabPane tab="Recieved Claims" key="Recieved">
                <div className="container-fluid">
                  <div
                    className="DataTable"
                    style={{ justifyContent: "center" }}
                  >
                    <Table
                      columns={RecievedColumns}
                      dataSource={recievedTableData}
                      pagination={true}
                      total={10}
                    ></Table>
                  </div>
                  <div style={{fontSize:"15px"}}>
                    <span>shown Results {recievedTableData.length}</span>
                  </div>
                </div>
              </TabPane>
              <TabPane tab="Settled Claims" key="Settled">
                <div className="container-fluid">
                  <div
                    className="DataTable"
                    style={{ justifyContent: "center" }}
                  >
                    <Table
                      columns={SettledColumns}
                      dataSource={settledTableData}
                      pagination={true}
                      total={10}
                    ></Table>
                  </div>
                  <div style={{fontSize:"15px"}}>
                    <span>shown Results {settledTableData.length}</span>
                  </div>
                </div>
              </TabPane>
            </Tabs>
          </div>
        </div>
      )}

      {HrClaimDetailsPage && (
        <HrClaimDetails
          selectedRecord={selectedRecord}
          data={recievedData}
          handleBack={handleBack}
        />
      )}
    </div>
  );
};

export default AdminClaims;
