import React, { useState, useEffect } from "react";
import { Table, Input, Button, Menu, Breadcrumb, Dropdown } from "antd";
import { useHistory } from "react-router-dom";
import {
  FilterOutlined,
  FormOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { getServiceList } from "../../services/authentication";
import { CSVLink } from "react-csv";
import "./Service.style.css";
import ServiceDetails from "./ServiceDetails";
import moment from "moment"

// Search box icon property starts
const { Search } = Input;

const suffix = (
  <SearchOutlined
    style={{
      fontSize: 16,
      color: "#61B33B",
    }}
  />
);
// Search box icon property ends

function AdServices() {
  const [ServiceListArray, setServiceListArray] = useState("");
  const [TableData, setTableData] = useState("");
  const [serviceListStatus, setserviceListStatus] = useState(true);
  const [ServiceDetailPage, setServiceDetailPage] = useState("");
  const [serviceRequestPage, setserviceRequestPage] = useState(true);
  const [selectedRecord, setselectedRecord] = useState("");
  let navigate = useNavigate();

  ///LIST API SERVICE CALL AND FUNCTIONALITY STARTED

  const handleGetServiceRequestCall = async (data) => {
    try {
      let tableDataArr = [];
      const resp = await getServiceList(data);
      //console.log("resp", resp);
      setServiceListArray(resp && resp.data);
      resp &&
        resp.data.map((data, i) => {
          const value = {
            serviceid: data.serviceCode,
            servicename: data.serviceName,
            requestedby: `${data.userPolicy.user.firstName} ${data.userPolicy.user.lastName}`,
            reqesteddate: moment(data.date).format('YYYY-MM-DD'),
            priority: data.priorityStatus,
            status: data.verifyStatus,
            owner: `${data.userPolicy.agent.firstName} ${data.userPolicy.agent.lastName}`,
            key:data.serviceCode,
          };
          //console.log(value);
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

  ///LIST API SERVICE CALL AND FUNCTIONALITY ENDED
  const handleFilterData = (filterData) => {
    const tableDataArr = [];
    //console.log("filterData", filterData);
    if (filterData.length > 0) {
      filterData.map((data, i) => {
        const value = {
          serviceid: data.serviceCode,
          servicename: data.serviceName,
          requestedby: `${data.userPolicy.user.firstName} ${data.userPolicy.user.lastName}`,
          reqesteddate: moment(data.date).format('YYYY-MM-DD'),
          tags: data.priorityStatus,
          status: data.verifyStatus,
          owner: `${data.userPolicy.agent.firstName} ${data.userPolicy.agent.lastName}`,
          
        };
        tableDataArr.push(value);
      });
    }
    return tableDataArr;
  };

  const onSearch = (value) => {
    const servicefilterData = ServiceListArray.filter((data) => {
      const itemData = data.serviceCode.toUpperCase();
      const textData = value.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    const searchFilter = handleFilterData(servicefilterData);
    setTableData(searchFilter);
  };

  const handleClick = (status) => {
    const servicefilterData = ServiceListArray.filter(
      (data) => data.verifyStatus === status
    );
    //console.log("sf", ServiceListArray);
    //console.log("status", status);
    const filterData = handleFilterData(servicefilterData);
    setTableData(filterData);
  };
  const handleServiceIdClick = (text, record) => {
    setServiceDetailPage(true);
    setserviceRequestPage(false);
    setselectedRecord(record);
  };

  const handleBack = () => {
    setServiceDetailPage(false);
    setserviceRequestPage(true);
  };

  const handlesubmit = () => {
    setServiceDetailPage(false);
    setserviceRequestPage(true);
  };

  const content = (
    <Menu>
      <Menu.Item>
        <a
          target="_blank"
          rel="noopener norefer"
          onClick={() => handleClick("Recieved for Approval")}
        >
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
          onClick={() => handleClick("Denied")}
        >
          Denied
        </a>
      </Menu.Item>
      <Menu.Item>
        <a
          target="_blank"
          rel="noopener norefer"
          onClick={() => handleClick("Pending")}
        >
          Pending
        </a>
      </Menu.Item>
    </Menu>
  );

  // Action functionality
  const operation = (
    <Menu>
      <Menu.Item>
        <a
          target="_blank"
          rel="noopener norefer"
          onClick={() => handleClick("Approve")}
        >
          Approve Request
        </a>
      </Menu.Item>
      <Menu.Item>
        <a
          target="_blank"
          rel="noopener norefer"
          onClick={() => handleClick("Resolve")}
        >
          Resolve Request
        </a>
      </Menu.Item>
      <Menu.Item>
        <a
          target="_blank"
          rel="noopener norefer"
          onClick={() => handleClick("Reject")}
        >
          Reject Request
        </a>
      </Menu.Item>
    </Menu>
  );
  // Action functionality ends

  //CSV data file starts from here
  const serviceRequestCSVData = () => {
    let serviceData = [];
    const serviceRequestData = ServiceListArray && ServiceListArray;
    if (serviceRequestData) {
      serviceData.push(
        "Service ID, Service Name, Requested By,Requested Date, Priority, Status, Owned by\n"
      );
      serviceRequestData.map((excelData) => {
        //console.log("exceldata", excelData);
        serviceData.push(
          `${excelData.serviceCode}, ${excelData.serviceName},${excelData.userPolicy.user.firstName}${excelData.userPolicy.user.lastName},${excelData.date}, ${excelData.priorityStatus},${excelData.verifyStatus},${excelData.userPolicy.agent.firstName}\n`
        );
      });
    }
    return serviceData.join("");
  };
  const serviceCSV = serviceRequestCSVData();
  // CSV END

  // Service request details

  // Table for Service Requested ( Columns )

  const columns = [
    {
      title: "Service ID.",
      dataIndex: "serviceid",
      key: "serviceid",
      render: (text, record) => {
        return <a onClick={() => handleServiceIdClick(text, record)}>{text}</a>;
      },
    },
    {
      title: "Service Name",
      dataIndex: "servicename",
      key: "servicename",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "Requested By",
      dataIndex: "requestedby",
      key: "requestedby",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "Requested Date",
      dataIndex: "reqesteddate",
      key: "requesteddate",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "Priority",
      key: "priority",
      dataIndex: "priority",

      // render: (tags) => (
      //   <>
      //     {tags.map((tag) => {
      //       let color = tag.length > 5 ? "#39A405" : "#39A405";
      //       if (tag === "urgent") {
      //         color = "#FF0000";
      //       }
      //       if (tag === "Low") {
      //         color = "#E5C110";
      //       }
      //       return (
      //         <Tag color={color} key={tag}>
      //           {tag.toUpperCase()}
      //         </Tag>
      //       );
      //     })}
      //   </>
      // ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "Owned By",
      dataIndex: "owner",
      key: "owner",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Dropdown placement="bottomCenter" overlay={operation} arrow>
          <a>
            <FormOutlined />
          </a>
        </Dropdown>
      ),
    },
  ];

  // END

  // Setting up the value of the table

  // END

  // UI part started

  return (
    <>
      {serviceRequestPage && (
        <div className="container-fluid">
          <Breadcrumb style={{ marginTop: "20px" }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>Services</Breadcrumb.Item>
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
              <h3>Requested Services</h3>
            </div>
            <div className="nav justify-content-center">
              <div
                className="col-12 col-sm-4 col-md-4"
                style={{ display: "flex", flexDirection: "row" }}
              >
                <Search
                  placeholder="search Service Code"
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
                  <CSVLink data={serviceCSV} target="_blank">
                    Download PDF/CSV
                  </CSVLink>
                </Button>
              </div>
            </div>
          </div>
          <div className="DataTable">
            <Table
              // rowClassName={() => "rowClassName1"}
              columns={columns}
              dataSource={TableData}
              pagination={true}
            />
            <span>
              shown Total Results {TableData.length}{" "}
            </span>
          </div>
        </div>
      )}
      {ServiceDetailPage && (
        <ServiceDetails
          selectedRecord={selectedRecord}
          data={ServiceListArray}
          handleBack={handleBack}
          handlesubmit={handlesubmit}
        />
      )}
    </>
  );
}

export default AdServices;
