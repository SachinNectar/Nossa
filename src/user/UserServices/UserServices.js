import React, { useState, useEffect } from "react";
import {Table, Button,Breadcrumb } from "antd";
import "antd/dist/antd.min.css";
import { getServiceList } from "../../services/authentication";
import { CSVLink } from "react-csv";
import NewServices from "./Newservices";
import SerSucessModal from "./SerSucessModal";
import moment from "moment"
import { TurnedInNotRounded } from "@material-ui/icons";

const UserServices = () => {
  const [show, setShow] = useState(false);
  const mouseHover = () => setShow((prev) => !prev);
  const [serviceListArray, setServiceListArray] = useState("");
  const [TableData, setTableData] = useState("");
  const [SucessModalPage, setSucessModalPage] = useState("");
  const [UserServicesPage, setUserServicesPage] = useState(true);
  const [NewservicePage, setNewservicePage] = useState(false);

  const handleGetServiceRequestCall = async (data) => {
    try {
      let tableDataArr = [];
      const resp = await getServiceList(data);
      console.log("resp", resp);
      setServiceListArray(resp && resp.data);
      resp &&
        resp.data.map((data, i) => {
          const value = {
            serviceid: data.serviceCode,
            servicename: data.serviceName,
            requestedby: data.userPolicy.user.firstName,
            reqesteddate: moment(data.date).format('YYYY-MM-DD'),
            priority: data.priorityStatus,
            status: data.verifyStatus,
            owner: data.userPolicy.agent.firstName,
            key:data.serviceCode
          };
          console.log(value);
          tableDataArr.push(value);
        });
      console.log("tableDataArr in premium", tableDataArr);
      setTableData(tableDataArr);
      console.log("resp", resp);
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    handleGetServiceRequestCall();
  }, []);

  //CSV data file starts from here
  const serviceRequestCSVData = () => {
    let serviceData = [];
    const serviceRequestData = serviceListArray && serviceListArray;
    if (serviceRequestData) {
      serviceData.push(
        "Service ID, Service Name, Requested By,Requested Date, Priority, Status, Owned by\n"
      );
      serviceRequestData.map((excelData) => {
        console.log("exceldata", excelData);
        serviceData.push(
          `${excelData.serviceCode}, ${excelData.serviceName},${excelData.userPolicy.user.firstName}${excelData.userPolicy.user.lastName},${excelData.date}, ${excelData.priorityStatus},${excelData.verifyStatus},${excelData.userPolicy.agent.firstName}\n`
        );
      });
    }
    return serviceData.join("");
  };
  const serviceCSV = serviceRequestCSVData();

  const handleback = () => {
    setSucessModalPage(false);
    setUserServicesPage(true);
  };

  const handleNewBack = () =>{
    setUserServicesPage(true);
    setNewservicePage(false)

  }

  const columns = [
    {
      title: "Service ID.",
      dataIndex: "serviceid",
      align:"center"
    },
    {
      title: "Service Name",
      dataIndex: "servicename",
      align:"center",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "Requested By",
      dataIndex: "requestedby",
      align:"center",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "Requested Date",
      dataIndex: "reqesteddate",
      align:"center",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "Priority",
     
      dataIndex: "priority",
      align:"center",
    },
    {
      title: "Status",
      dataIndex: "status",
      align:"center",
      render: (text,record) => <p>{text}</p>,
    },
    {
      title: "Owned By",
      dataIndex: "owner",
      align:"center",
      render: (text) => <p>{text}</p>,
    },
  ];
  const handleNewServices = () => {
    setUserServicesPage(false);
    setNewservicePage(true);
  };

  return (
    <>
      {UserServicesPage && (
        <div>
          <Breadcrumb style={{ marginTop: "20px" }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>Services</Breadcrumb.Item>
          </Breadcrumb>
           <div className="container-fluid" style={{paddingTop:"50px"}}>
        <div className="row">
          <div className="col-12 col-md-6 col-sm-6 col-lg-3 mb-2">
            <div className="card card-custom" style={{background: "#FFACAC"}}>
              <div className="row">
                <div className="col-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 text-left"> 
                  <p className="pl-4 pt-4">
                    <strong>Policy  Statement</strong>
                  </p>
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-9 col-md-9 col-sm-9 text-left">
                  <small className="pl-4 pt-0 pb-3 d-block">Requested Documents</small>
                </div>
                <div className="col-3 col-md-3 col-sm-3 text-right">
                  <a className="pr-4 pt-0 pb-3 d-block">
                    <i className="fas fa-arrow-right"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 col-sm-6 col-lg-3 mb-2">
            <div className="card card-custom" style={{background:"#000",color:"whitesmoke"}} >
              <div className="row">
                <div className="col-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 text-left">
                  <p className="pl-4 pt-4">
                   <strong>Statement</strong>
                    <br />
                    <small className="pl-2 pt-0 pb-4 d-block">Requested Statements</small>
                  </p>
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-9 col-md-9 col-sm-9 text-left">
                  <small className="pl-4 pt-0 pb-3 d-block">Yearly statements</small>
                  <small className="pl-4 pt-0 pb-3 d-block"> Policy Statements</small>
                </div>
                <div className="col-3 col-md-3 col-sm-3 text-right">
                  <a className="pr-4 pt-0 pb-3 d-block" onClick={() => handleNewServices()}>
                    <i className="fas fa-arrow-right"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 col-sm-6 col-lg-3 mb-2">
            <div className="card card-custom" style={{background:"#8EC131"}}>
              <div className="row">
                <div className="col-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 text-left">
                  <p className="pl-4 pt-4">
                   <strong>Invoices</strong> 
                   <br/><br/>
                  </p>
                </div>
                <div className="col-6 col-md-6 col-sm-6 text-right">
                  <h3 className="pr-4 pt-4">
                    {/* {dashBoardListArray && dashBoardListArray.data.totalClaims} */}
                  </h3>
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-9 col-md-9 col-sm-9 text-left">
                  <small className="pl-4 pt-0 pb-3 d-block">View all Invoices</small>
                </div>
                <div className="col-3 col-md-3 col-sm-3 text-right">
                  <a className="pr-4 pt-0 pb-3 d-block">
                    <i className="fas fa-arrow-right"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
          </div>
          </div>

      
          <div>
            <div style={{ display: "flex",
                  displayContent: "flex-End"}}>
              <Button
                style={{
                  color: "#ffffff",
                  backgroundColor: "#002E5E",
                  borderRadius: "5px",
                  margin: "10px",
                 
                }}
              >
                {/* Download PDF/CSV */}
                <CSVLink data={serviceCSV} target="_blank">
                  Download PDF/CSV
                </CSVLink>
              </Button>
            </div>

            <div className="DataTable">
              <Table
                rowClassName={() => "rowClassName1"}
                columns={columns}
                dataSource={TableData}
                pagination = {true}
              />
            </div>
            <span>Shown Total Results {TableData.length}</span>
          </div>
        </div>
      )}
      {NewservicePage && <NewServices handleBack={handleNewBack}/>}
      {SucessModalPage && <SerSucessModal  handleBack={handleback} />}
     
    </>
  );
};
export default UserServices;
