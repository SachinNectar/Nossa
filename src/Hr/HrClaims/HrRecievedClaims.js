import React, { useState, useEffect } from "react";
import { Tabs, Button, Input, Breadcrumb, Dropdown, Menu, Table } from "antd";
import { CSVLink } from "react-csv";
import { FilterOutlined } from "@ant-design/icons";
import {
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import { getClaimsList } from "../../services/authentication";
import HrClaimDetails from "./HrClaimDetails";
import moment from "moment"

const { Search } = Input;

const HrRecievedClaims = () => {
  const [allHrRecievedListArray, setAllHrRecievedListArray] = useState("");
  const [ClaimsData, setClaimsData] = useState("");
  const [claimAPIupdateStatus, setClaimAPIupdateStatus] = useState("");
  const [selectedRecord, setSelectedRecord] = useState("");
  const [HrClaimDetailsPage, setHrClaimDetailsPage] = useState("");
  const [HrClaimsTablePage, setHrClaimsTablePage] = useState(true);

  const handleClaimIdClick = (text, record) => {
    setHrClaimDetailsPage(true);
    setHrClaimsTablePage(false);
    setSelectedRecord(record);
  };
  const handleBack = () => {
    setHrClaimDetailsPage(false);
    setHrClaimsTablePage(true);
  };

  const menu = (
    <Menu>
      <Menu.Item key="1">Re-assign</Menu.Item>
      <Menu.Item key="2">Accept</Menu.Item>
      <Menu.Item key="3">Reject</Menu.Item>
    </Menu>
  );

  const content = (
    <Menu>
      <Menu.Item>
        <a
          target="_blank"
          rel="noopener norefer"
          onClick={() => handleClick("Recieved for Approval")}
        >
         Pending
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

  const columns = [
   
    {
      title: "Claim ID",
      dataIndex: "id",
      key: "id",
      align:"center",
     
      render: (text, record) => (
        <a
          style={{ color: "#4cbb17" }}
          onClick={() => handleClaimIdClick(text, record)}
        >
          {text}
        </a>
      ),
    },
    {
      title: "Policy Holder",
      dataIndex: "name",
      key: "name",
      align:"center",
    
    },

    {
      title: "Policy Name",
      dataIndex: "policyname",
      key: "name",
      align:"center",
    
    },
    {
      title: "Policy code",
      dataIndex: "code",
      key: "code",
      align:"center",
    
    },
    {
      title: "Request Date",
      dataIndex: "date",
      key: "date",
      align:"center",
     
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      align:"center",
     
    },

    // {
    //   title: "Description",
    //   dataIndex: "description",
    //   key: "description",
     
    // },
    // {
    //   title: "Actions",
    //   key: "action",
     
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
    //   responsive: ["sm", "xs", "md"],
    // },
  ];
  //csv download Link
  const HrRecievedCSVData = () => {
    let HrRecievedClaimsData = [];
    const allHrRecievedListArrayData =
      allHrRecievedListArray && allHrRecievedListArray;
    if (allHrRecievedListArrayData) {
      HrRecievedClaimsData.push(
        "ID,Policy Holder,Policy Name,Policy Code, Request Date,Status\n"
      );
      allHrRecievedListArrayData.map((excelData) => {
        //console.log("ugugvcgvc",excelData)
        HrRecievedClaimsData.push(
          `${excelData.id},${excelData.userPolicy.user.firstName}, ${excelData.userPolicy.policy.policyName}, ${excelData.userPolicy.policy.policyCode},${excelData.date},${excelData.verifyStatus}\n`
        );
      });
    }
    return HrRecievedClaimsData.join("");
  };
  const HrRecievedCSV = HrRecievedCSVData();

  //Claims table service call started here

  const handleGetClaimsListServiceCall = async () => {
    const data = {
      verifyStatus:"Not Submited"
    }
    try {
      let claimsDataArr = [];
      const resp = await getClaimsList(data);
      console.log("re",resp)
      setAllHrRecievedListArray(resp && resp.data);
      resp &&
        resp.data.map((data) => {
          const value = {
            id: data.claimCode,
            name: `${data.userPolicy.user.firstName} ${data.userPolicy.user.lastName}`,
            policyname: data.userPolicy.policy.policyName,
            code: data.userPolicy.policy.policyCode,
            date: moment((data.claim_details.createdAt).format("YYYY_MM_DD")),
            status: data.verifyStatus,
            description: data.userPolicy.policy.description,
            key:data.id
          };
          console.log(value);
          claimsDataArr.push(value);
        });

      setClaimsData(claimsDataArr);
      console.log("Arr", claimsDataArr);
      console.log("resp", resp);
    } catch (error) {
      console.log("error", error);
      // showAlert('In valide data', "error");
    }
  };

  useEffect(() => {
    handleGetClaimsListServiceCall();
  }, [claimAPIupdateStatus]);

  //Filter & serach
  const handleFilterData = (filterData) => {
    const tableDataArr = [];
    // console.log("filterData", filterData);
    if (filterData.length > 0) {
      filterData.map((data, i) => {
        const value = {
          id: data.claimCode,
          name: `${data.userPolicy.user.firstName} ${data.userPolicy.user.lastName}`,
          policyname: data.userPolicy.policy.policyName,
          code: data.userPolicy.policy.policyCode,
          date: moment(data.claim_details && data.claim_details.createdAt).format("YYYY-MM-DD"),
          status: data.verifyStatus,
          description: data.userPolicy.policy.description,
        };
        tableDataArr.push(value);
      });
    }
    return tableDataArr;
  };
  const handleClick = (status) => {
    const claimsfilterData = allHrRecievedListArray.filter(
      (data) => data.verifyStatus === status
    );
    console.log("Array", allHrRecievedListArray);
    console.log("data", claimsfilterData);
    const filterData = handleFilterData(claimsfilterData);
    setClaimsData(filterData);
  };

  const onSearch = (value) => {
    const claimsfilterData = allHrRecievedListArray.filter((data) => {
      const itemData = data.claimCode.toUpperCase();
      const textData = value.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    const searchFilter = handleFilterData(claimsfilterData);
    setClaimsData(searchFilter);
  };
  return (
    <>
      <div className="container-fluid">
        {HrClaimsTablePage && (
          <div>
              <Breadcrumb style={{ marginTop: "20px" }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>claims</Breadcrumb.Item>
            {/* <Breadcrumb.Item>claim Details</Breadcrumb.Item> */}
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
                <h3>Recieved Claims</h3>
              </div>
              <div className="nav justify-content-center">
              <div
                className="col-12 col-sm-5 col-md-5"
                style={{ display: "flex", flexDirection: "row" }}
              >
                <Search
                  placeholder="search Claim Code"
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
                style={{ display: "flex", flexDirection: "row",justifyContent:"center" }}
              >
                <Dropdown placement="bottomCenter" overlay={content} arrow>
                  <Button
                    style={{
                      borderRadius: "5px",
                      backgroundColor: "#8ec131",
                      color: "white",
                      marginRight:"15px"
                    }}
                  >
                    <FilterOutlined /> Add Filters
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
                      borderRadius:"5px"
                    }}
                  >
                    {/* Download PDF/CSV */}
                    <CSVLink data={HrRecievedCSV} target="_blank">
                      Download PDF/CSV
                    </CSVLink>
                  </Button>
                </div>
              </div>
            </div>
            <div className="DataTable">
              {console.log("cd",ClaimsData)}
            <Table
              columns={columns}
              dataSource={ClaimsData}
              //onChange={this.handleChange}
              pagination={true}
              total={10}
            />
            </div>
            Shown Results{allHrRecievedListArray.length}
          </div>
        )}
      </div>
      {HrClaimDetailsPage && (
        <HrClaimDetails
          selectedRecord={selectedRecord}
          data={allHrRecievedListArray}
          handleBack={handleBack}
        />
      )}
    </>
  );
};
export default HrRecievedClaims;
