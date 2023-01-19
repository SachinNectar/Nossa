import React, { useState, useEffect } from "react";
import { Table, Button, Breadcrumb } from "antd";
import { CSVLink } from "react-csv";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
import NewClaim2 from "./NewClaim2";
import UserClaim from "./UserClaim";
import moment from "moment";
import { getClaimsList2 } from "../../services/authentication";

const Claims = () => {
  const [addClaim, setAddClaim] = useState(false);
  const [claimTablePage, setclaimTablePage] = useState(true);
  const [SelectedRecord, setSelectedRecord] = useState("");
  const [ClaimDetailsPage, setClaimDetailsPage] = useState("");
  const [ClaimsListArray, setClaimsListArray] = useState("");
  const [TableData, setTableData] = useState("");

  let navigate = useNavigate();

  const handleClaimIdClick = (text, record) => {
    setclaimTablePage(false);
    setSelectedRecord(record);
    setClaimDetailsPage(true);
  };

  const handleback = () => {
    setclaimTablePage(true);
    setClaimDetailsPage(false);
  };
  const handleAddBack = () => {
    setAddClaim(false);
    setclaimTablePage(true);
  };
  const handleGetServiceRequestCall = async () => {
    try {
      let tableDataArr = [];
      const resp = await getClaimsList2();
      //console.log("resp", resp);
      setClaimsListArray(resp && resp.data);
      resp &&
        resp.data.map((data, i) => {
          const value = {
            //   id: data.claim_details ? data.claim_details.id : "",
            //   policyName: data.userPolicy.policy.policyName
            //     ? data.userPolicy.policy.policyName
            //     : "",
            //   code: data.userPolicy.policy.policyCode
            //     ? data.userPolicy.policy.policyCode
            //     : "",
            //   date: data
            //     ? ((data.updatedAt)? moment(data.updatedAt).format("MMM DD YY"):'')
            //     : "",
            //   status: data.verifyStatus ? data.verifyStatus : "",
            id: data.claimCode,
            policyName: data.userPolicy.policy.policyName,
            code: data.userPolicy.policy.policyCode,
            date: data.claim_details
              ? data.claim_details.updatedAt
                ? moment(data.claim_details.updatedAt).format("YYYY-MM-DD")
                : ""
              : "",
            status:data.verifyStatus,
            key:data.id
          };
          // console.log("sasas", value, resp);
          tableDataArr.push(value);
        });
      //console.log("tableDataArr in premium", tableDataArr);
      setTableData(tableDataArr);
      //console.log("resp", resp);
    } catch (error) {
      //console.log("error", error);
    }
  };
  useEffect(() => {
    handleGetServiceRequestCall();
  }, []);

  const columns = [
    {
      title: "Claim Id",
      dataIndex: "id",
      key: "id",
      align:"center",
      sorter: (a, b) => a.id - b.id,
      // ellipsis: true,
      // responsive: ["sm"],
      render: (text, record) => (
        <div>
          {record.status === "Approved" ? (
            <a
              style={{ color: "#4cbb17" }}
              onClick={() => handleClaimIdClick(text, record)}
            >
              {text}
            </a>
          ) : (
            <label>{text}</label>
          )}
        </div>
      ),
    },

    {
      title: "Policy Name",
      dataIndex: "policyName",
      key: "policyName",
      align:"center",
      // ellipsis: true,
      // responsive: ["sm"],
    },

    {
      title: "Policy Code",
      dataIndex: "code",
      key: "code",
      align:"center",
      // ellipsis: true,
      // responsive: ["sm"],
    },
    {
      title: "Request Date",
      dataIndex: "date",
      key: "date",
      align:"center",
      // ellipsis: true,
      // responsive: ["sm"],
    },

    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      align:"center",
      // ellipsis: true,
      // responsive: ["sm"],
    },
  ];

  const handleAddClaims = () => {
    setAddClaim(true);
    setclaimTablePage(false);
  };

  return (
    <div>
      {claimTablePage && (
        <div>
          <Breadcrumb style={{ marginTop: "20px" }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>claims</Breadcrumb.Item>
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
              <div className="col-12 col-sm-3 col-md-3">
                <h3>Claim Requests</h3>
              </div>
              <div className="nav justify-content-center">
              <div className="col-12 col-sm-6 col-md-6">
                <Button
                  style={{
                    borderRadius: "5px",
                    // marginRight: "30px",
                    backgroundColor: "#8ec131",
                    color: "white",
                  }}
                  onClick={() => handleAddClaims()}
                >
                  <PlusOutlined style={{ paddingTop: "5px" }} /> New Claim
                  Request
                </Button>
              </div>

              <div className="col-12 col-sm-4 col-md-4">
                <Button
                  style={{
                    color: "#ffffff",
                    backgroundColor: "#002E5E",
                    borderRadius: "5px"
                    
                  }}
                >
                  {/* Download PDF/CSV */}
                  <CSVLink data={""} target="_blank">
                    Download PDF/CSV
                  </CSVLink>
                </Button>
              </div>
              </div>
            </div>
          </div>

          <div className="DataTable">
            <Table
              columns={columns}
              dataSource={TableData}
              pagination={true}
              // total={10}
            />
            <div style={{marginLeft:"30px", fontSize:"15px"}}>
              <span>shown Results {TableData.length}</span>
            </div>
            <br />
          </div>
        </div>
      )}
      {addClaim && (
        <NewClaim2
          data={ClaimsListArray}
          SelectedRecord={SelectedRecord}
          handleBack={handleAddBack}
        />
      )}
      {ClaimDetailsPage && (
        <UserClaim
          SelectedRecord={SelectedRecord}
          data={ClaimsListArray}
          handleback={handleback}
        />
      )}
    </div>
  );
};
export default Claims;
