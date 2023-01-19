import React, { useState, useEffect } from "react";
import AdClinicData from "./AdClinicDetails";
import {
  getReimbursmentList,
  getreimbursementAPI,
  getDeleteReimbursment,
  getEditReimbursment,
  getDoctorsList,
  getReimServicesList,
  getReimbursmentListSearch,
} from "../../services/authentication";
import { FormOutlined } from "@ant-design/icons";
import { CSVLink } from "react-csv";
import { Button, Modal, Form } from "react-bootstrap";
import { Menu, Dropdown,Breadcrumb,} from "antd";
import ReactPaginate from "react-paginate";

const Reimbusrment = () => {
  const [ClinicDataPage, setClinicDataPage] = useState("");
  const [selectedrecord, setSelectedrecord] = useState("");
  const [step, setStep] = useState(0);
  const [ClinicalData, setClinicalData] = useState("");
  const [PharmacyData, setPharmacyData] = useState("");
  const [ClinicTableData, setClinicTableData] = useState("");
  const [PharmacyTableData, setPharmacyTableData] = useState("");
  const [ReimbursmentPage, setReimbursmentPage] = useState(true);
  const [ShowModal, setShowModal] = useState(false);
  const [errorMsg, seterrorMsg] = useState("");
  const [ShowEditModal, setShowEditModal] = useState("");
  const [DoctorsName, setDoctorsName] = useState("");
  const [TableData, setTableData] = useState("");
  const [DoctorsListArray, setDoctorsListArray] = useState("");
  const [ServiceName, setServiceName] = useState("");
  const [ID, setID] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [doctors, setDoctors] = useState([]);
  const[totalpage,setTotalPage]=useState()

  const [Data, setData] = useState({
    id: "",
    type: "",
    name: "",
    address: "",
    area: "",
    contact: "",
    serviceOffered: "",
    description: "",
    // doctors:"",
    services: "",
  });

  const {
    id,
    type,
    name,
    address,
    area,
    contact,
    serviceOffered,
    description,
    // doctors,
    services,
  } = Data;

  const handleChange = (e) => {
    setData({ ...Data, [e.target.name]: e.target.value });
  };

  const handleChangePage = (item) => {
    setReimbursmentPage(false);
    setClinicDataPage(true);
    setSelectedrecord(item);
  };

  const handleBack = () => {
    setReimbursmentPage(true);
    setClinicDataPage(false);
  };

  const handleShow = () => {
    setShowModal(true);
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  const handleEditCancel = () =>{
    setShowEditModal(false)
  }

  //Get Api Start

  const handleClinicTab = async () => {
    try {
      let tableDataArr = [];
      const data = {
        type: "clinical",
      };
      const resp = await getReimbursmentList(data);
      setClinicalData(resp && resp.data);
      console.log("clinical", resp);
      resp &&
        resp.data.map((data, i) => {
          const value = {
            SrNo: i,
            RefNo: data.referenceNumber,
            ClinicName: data.name,
            Adress: data.address,
            Area: data.area,
            Contact: data.contact,
            HospitalType: data.hospitalType,
            key:data.id
          };
          tableDataArr.push(value);
        });
      setClinicTableData(tableDataArr);
    } catch (error) {
      console.log("error", error);
      // showAlert('In valide data', "error");
    }
  };

  useEffect(() => {
    handleClinicTab();
  }, []);

  const handlePharmacyTab = async () => {
    try {
      let tableDataArr = [];
      const data = {
        type: "pharmacy",
      };
      const resp = await getReimbursmentList(data);
      console.log("pharm", resp);
      setPharmacyData(resp && resp.data);
      setTotalPage(resp &&resp.length)
      console.log("pc", resp);
      resp &&
        resp.data.map((data, i) => {
          const value = {
            SrNo: i,
            RefNo: data.referenceNumber,
            pharmacyName: data.name,
            Adress: data.address,
            Area: data.area,
            Contact: data.contact,
            servicesOffered: data.serviceOffered,
          };
          tableDataArr.push(value);
        });
      setPharmacyTableData(tableDataArr);
    } catch (error) {
      console.log("error", error);
      // showAlert('In valide data', "error");
    }
  };

  // useEffect(() => {
  //   handlePharmacyTab();
  // }, []);
  //Doctors API
  const handleDoctorsList = async () => {
    try {
      let tableDataArr = [];
      const resp = await getDoctorsList();

      setDoctorsListArray(resp && resp.data);
      resp &&
        resp.data.map((data, i) => {
          const obj = {
            DoctorsName: data.doctorName,
          };
          tableDataArr.push(obj);
          setTableData(tableDataArr);
          console.log("tdr", tableDataArr);
        });
      setDoctorsName(tableDataArr);
    } catch (error) {
      console.log("error", error);
      // showAlert('In valide data', "error");
    }
  };

  useEffect(() => {
    handleDoctorsList();
  }, []);
  //Ended

  //Services API

  const handleServicesList = async () => {
    try {
      let tableDataArr = [];
      const resp = await getReimServicesList();
      // setServicesListArray(resp&&resp.data)
      resp &&
        resp.data.map((data, i) => {
          const obj = {
            ServiceName: data.service,
          };
          tableDataArr.push(obj);
          console.log("tdr", tableDataArr);
        });
      setServiceName(tableDataArr);
    } catch (error) {
      console.log("error", error);
      // showAlert('In valide data', "error");
    }
  };

  useEffect(() => {
    handleServicesList();
  }, []);

  //Ended

  useEffect(() => {
    handleClinicTab();
    handlePharmacyTab();
  }, []);

  const handleOnSearch = async () => {
    // console.log("ClinicalDta",ClinicalData)

    if (step === 0) {
      try {
        let tableDataArr = [];
        const data = {
          type: "clinical",
          hospitaltype: searchValue,
        };
        const resp = await getReimbursmentListSearch(data);
        console.log("clinical", resp);
        resp &&
          resp.data.map((data, i) => {
            const value = {
              SrNo: data.i,
              RefNo: data.referenceNumber,
              ClinicName: data.name,
              Adress: data.address,
              Area: data.area,
              Contact: data.contact,
              HospitalType: data.hospitalType,
            };
            tableDataArr.push(value);
          });
        setClinicTableData(tableDataArr);
        setClinicalData(tableDataArr);
      } catch (error) {
        console.log("error", error);
        // showAlert('In valide data', "error");
      }
    } else {
      try {
        let tableDataArr = [];
        const data = {
          type: "pharmacy",
          hospitaltype: searchValue,
        };
        const resp = await getReimbursmentListSearch(data);
        console.log("pharm", resp);
        resp &&
          resp.data.map((data, i) => {
            const value = {
              SrNo: i,
              RefNo: data.referenceNumber,
              pharmacyName: data.name,
              Adress: data.address,
              Area: data.area,
              Contact: data.contact,
              servicesOffered: data.serviceOffered,
            };
            tableDataArr.push(value);
          });
        setPharmacyTableData(tableDataArr);
        setPharmacyData(tableDataArr);
      } catch (error) {
        console.log("error", error);
        // showAlert('In valide data', "error");
      }
    }
  };

  const handleFilterData = (filterData) => {
    const tableDataArr = [];
    console.log("tr", tableDataArr);
    console.log("filterData", filterData);
    if (filterData.length > 0) {
      if (step === 0) {
        filterData.map((data, i) => {
          const value = {
            SrNo: i,
            referenceNumber: data.referenceNumber,
            name: data.name,
            address: data.adress,
            area: data.area,
            contact: data.contact,
            hospitalType: data.hospitalType,
          };
          tableDataArr.push(value);
          console.log("tableDataArr", tableDataArr);
        });
      } else {
        filterData.map((data, i) => {
          const value = {
            SrNo: data,
            referenceNumber: data.referenceNumber,
            name: data.name,
            address: data.adress,
            area: data.area,
            contact: data.contact,
            serviceOffered: data.serviceOffered,
          };
          tableDataArr.push(value);
          console.log("tableDataArr", tableDataArr);
        });
      }
    }

    return tableDataArr;
  };

  const handleclick = (type) => {
    if (step === 0) {
      const ClinicalfilterData =
        ClinicalData &&
        ClinicalData.filter((data) => data.hospitalType === type);
      const Clinic = handleFilterData(ClinicalfilterData);
      console.log("ClinicalfilterData", ClinicalfilterData, Clinic);
      setClinicTableData(Clinic);
      setClinicalData(Clinic);
    } else {
      const PharmacyfilterData =
        PharmacyData &&
        PharmacyData.filter((data) => data.hospitalType === type);
      const Pharmacy = handleFilterData(PharmacyfilterData);
      console.log("PharmacyfilterData", Pharmacy);
      setPharmacyTableData(Pharmacy);
      setPharmacyData(Pharmacy);
    }
  };

  const ReimbursmentCSVData = () => {
    let ClinicalData = [];
    const ClinicaltableDataArray = ClinicTableData && ClinicTableData;
    const PharmacyTableDataArray = PharmacyTableData && PharmacyTableData;
    if (step === 0) {
      if (ClinicaltableDataArray) {
        ClinicalData.push(
          "Sr.No,Ref No,Clinic,Adress,Area,Contact,Hospital Type\n"
        );
        ClinicaltableDataArray.map((excelData, i) => {
          ClinicalData.push(
            `${excelData.i},${excelData.RefNo}, ${excelData.ClinicName}, ${excelData.Adress},${excelData.Area},${excelData.Contact},${excelData.hospitalType}\n`
          );
        });
      }
    } else {
      if (PharmacyTableDataArray) {
        ClinicalData.push(
          "Sr.No,Ref_N0,Pharmacy,Adress,Area,Contact,Service_offered\n"
        );
        PharmacyTableDataArray.map((excelData, i) => {
          console.log("xl", excelData);
          ClinicalData.push(
            `${excelData.i},${excelData.RefNo}, ${excelData.pharmacyName}, ${excelData.Adress},${excelData.Area},${excelData.Contact},${excelData.servicesOffered}\n`
          );
        });
      }
    }
    return ClinicalData.join("");
  };
  const ReimbursmentCSV = ReimbursmentCSVData();
  // // CSV END

  const handleAddRemList = async () => {
    const Payload = {
      name: name,
      type: type,
      address: address,
      area: area,
      contact: contact,
      description: description,
      serviceOffered: serviceOffered,
      doctors: doctors,
    };

    if (
      name === "" ||
      type === "" ||
      address === "" ||
      area === "" ||
      contact === "" ||
      description === "" ||
      serviceOffered === "" ||
      // services ===""||
      doctors === ""
    ) {
      seterrorMsg("Please Fill all fileds.");
    } else {
      try {
        const resp = await getreimbursementAPI(Payload);
        console.log("record added successfuly");
        alert("Record Added Successfully!");
        setShowModal(false);
        seterrorMsg("");
        handleClinicTab();
        handlePharmacyTab();
      } catch (error) {
        console.log("error", error);
        alert("Something Went Wrong");
        // showAlert('In valide data', "error");
      }
    }
  };

  const handleShowEditModal = (item) => {
    console.log("table");
    setID(item.id);
    console.log("selectedRec", item);
    setData({
      type: item.type,
      name: item.name,
      address: item.address,
      area: item.area,
      contact: item.contact,
      serviceOffered: item.serviceOffered,
      description: item.description,
    });

    setShowEditModal(true);
  };

  const handleEditInfo = async (item) => {
    console.log("itemid", ID);
    const payload = {
      id: ID,
      type: type,
      name: name,
      address: address,
      area: area,
      contact: contact,
      serviceOffered: serviceOffered,
      description: description,
    };
    try {
      const resp = await getEditReimbursment(payload);
      console.log("success", resp);
      alert("Edited Successfully!");
      setShowEditModal(false);
      // resp && handleHolidaysList()
      handleClinicTab();
      handlePharmacyTab();

      // handelEditCancel()
    } catch (error) {
      console.log("error", error);
      alert("Something Went Wrong");
    }
  };
  //Edit Ended

  //Delete Info
  const handleDeleteInfo = async (item) => {
    console.log("item", item);
    const payload = {
      id: item.id,
    };
    try {
      const resp = await getDeleteReimbursment(payload);
      console.log("success", resp);
      alert("Deleted Successfully!");
      handleClinicTab();
      handlePharmacyTab();
    } catch (error) {
      console.log("error", error);
      alert("Something Went Wrong");
    }
  };

  const menu = (item) => {
    return (
      <Menu>
        <Menu.Item
          key="1"
          onClick={() => {
            handleShowEditModal(item);
          }}
        >
          Edit Info
        </Menu.Item>
        <Menu.Item
          key="2"
          onClick={() => {
            handleDeleteInfo(item);
          }}
        >
          Delete
        </Menu.Item>
      </Menu>
    );
  };

    // This section is for pagination

    const [pageNumber, setPageNumber] = useState(0);
    const usersPerPage = 10;
    const pagesVisited = pageNumber * usersPerPage;
    const pageCount = Math.ceil(PharmacyData.length / usersPerPage);
    const pageCount2 = Math.ceil(ClinicalData.length / usersPerPage);
    const changePage = ({ selected }) => {
      setPageNumber(selected);
    };

  return (
    <>
     <Breadcrumb style={{ marginTop: "20px" }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>Reimbursment</Breadcrumb.Item>
            {/* <Breadcrumb.Item>claim Details</Breadcrumb.Item> */}
          </Breadcrumb>
      {ReimbursmentPage && (
        <div>
          <div className="row d-flex align-items-center justify-content-between">
            <div className="col-12 col-lg-3 col-md-3 col-sm-3">
              <h3>Reimbursement</h3>
            </div>
            <div className="nav justify-content-center">
            <div className="col-12 col-lg-3 col-md-3 col-sm-12 col-xs-12">
                  <div className="input-group">
                    <input
                    style={{height:"35px", width: "115px",}}
                      type="text"
                      className="form-control my-3"
                      placeholder="Search Hospital"
                      value={searchValue}
                      onChange={(e) => setSearchValue(e.target.value)}
                    />
                    <div className="input-group-append">
                      <button
                        style={{height:"35px"}}
                        className="btn btn-secondary my-3"
                        type="button"
                        onClick={() => handleOnSearch()}
                      >
                       <i className="fa fa-search"></i>
                      </button>
                    </div>
                  </div>
            </div>
            <div className="col-12 col-lg-3 col-md-3 col-sm-12 col-xs-12">
            <div className="btn-group">
                    <button
                      type="button"
                      className="btn btn-success btn-sm my-3"
                      style={{ width: "160px", borderRadius:"5px", height:"35px", border: "1px solid #8EC131", backgroundColor: "#8EC131"}}
                      onClick={handleShow}
                    >
                      <i className="fas fa-plus-circle"></i> Add Reimbursment
                    </button>
                    <div className="header">
                      <Modal show={ShowModal} onHide={handleCancel} size="md">
                        <Modal.Header closeButton>
                          <Modal.Title
                            style={{ color: "#8ec131", marginLeft: "25px" }}
                          >
                            Add Reimbursment List
                          </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <div className="container">
                            <Form.Group>
                              <Form.Label>Name</Form.Label>
                              <Form.Control
                                type="text"
                                value={name}
                                name="name"
                                onChange={handleChange}
                              ></Form.Control>
                              <Form.Label>Type</Form.Label>
                              <Form.Control
                                type="text"
                                value={type}
                                name="type"
                                onChange={handleChange}
                              ></Form.Control>
                              <Form.Label>Adress</Form.Label>
                              <Form.Control
                                type="textArea"
                                value={address}
                                name="address"
                                onChange={handleChange}
                              ></Form.Control>
                              <Form.Label>Area</Form.Label>
                              <Form.Control
                                type="text"
                                value={area}
                                name="area"
                                onChange={handleChange}
                              ></Form.Control>
                              <Form.Label>Contact</Form.Label>
                              <Form.Control
                                type="number"
                                value={contact}
                                name="contact"
                                onChange={handleChange}
                              ></Form.Control>
                              <Form.Label>Service_offered</Form.Label>
                              <Form.Control
                                type="text"
                                value={serviceOffered}
                                name="serviceOffered"
                                onChange={handleChange}
                              ></Form.Control>
                              <Form.Label>Doctors Selected</Form.Label>
                              <Form.Control
                                as="select"
                                multiple
                                value={doctors}
                                onChange={(e) =>
                                  setDoctors(
                                    [].slice
                                      .call(e.target.selectedOptions)
                                      .map((item) => item.value)
                                  )
                                }
                              >
                                {/* <Form.Control as="select" multiple value={doctors}> */}
                                {DoctorsName &&
                                  DoctorsName.map((data) => (
                                    <option value={data.DoctorsName}>
                                      {data.DoctorsName}
                                    </option>
                                  ))}
                              </Form.Control>
                              <Form.Label>Services Selected</Form.Label>
                              <Form.Control
                                as="select"
                                multiple
                                value={services}
                              >
                                {ServiceName &&
                                  ServiceName.map((data) => (
                                    <option value={data.ServiceName}>
                                      {data.ServiceName}
                                    </option>
                                  ))}
                              </Form.Control>
                              <Form.Label>description</Form.Label>
                              <Form.Control
                                type="textArea"
                                value={description}
                                name="description"
                                onChange={handleChange}
                              ></Form.Control>
                            </Form.Group>
                          </div>
                        </Modal.Body>
                        <Modal.Footer>
                          <Button
                            variant="primary"
                            size="md"
                            onClick={handleAddRemList}
                            style={{ width: "200%" }}
                          >
                            Submit
                          </Button>
                          <label
                            style={{ color: "red", justifyContent: "center" }}
                          >
                            {errorMsg}
                          </label>
                        </Modal.Footer>
                      </Modal>
                    </div>
                  </div>
            </div>
            <div className="col-12 col-lg-3 col-md-3 col-sm-12 col-xs-12">
            <div className="btn-group hover_drop_down">
                    <button
                      type="button"
                      className="btn btn-success btn-sm my-3"
                      data-toggle="dropdown"
                      style={{
                        width: "160px",
                        borderRadius: "5px",
                        backgroundColor: "#8EC131",
                        border: "1px solid #8EC131",
                        height:"35px"
                      }}
                    >
                      <i className="fas fa-filter"></i> Add Filters
                    </button>
                    <ul className="dropdown-menu" role="menu">
                      <li>
                        <a
                          onClick={() => {
                            handleclick("provincial");
                          }}
                        >
                          provincial{" "}
                        </a>
                      </li>
                      <li>
                        <a
                          onClick={() => {
                            handleclick("public");
                          }}
                        >
                          public
                        </a>
                      </li>
                      <li>
                        <a
                          onClick={() => {
                            handleclick("municipal");
                          }}
                        >
                          Municipal
                        </a>
                      </li>
                    </ul>
                  </div>
            </div>
            <div className="col-12 col-lg-3 col-md-3 col-sm-12 col-xs-12">
            <div className="btn-group">
                    <button
                      type="button"
                      className="btn btn-primary btn-sm my-3"
                      style={{height:"35px", width: "160px",}}
                    >
                      <CSVLink
                        data={ReimbursmentCSV}
                        target="_blank"
                        style={{ color: "white"}}
                      >
                       Download PDF/CSV
                      </CSVLink>
                    </button>
                  </div>
            </div>
            </div>
          </div>

          <div className="row d-flex align-items-center justify-content-between border-bottom pb-2">
            <div className="col-12 col-lg-6 col-md-6 text-left">
              <ul className="nav nav-tabs table-nav" id="myTab" role="tablist">
                <li className="nav-item" role="presentation">
                  <a
                    className={`nav-link ${!step ? "active" : ""}`}
                    id="clinic-list-tab"
                    data-toggle="tab"
                    onClick={() => {
                      setStep(0);
                    }}
                    role="tab"
                    aria-controls="clinic-list"
                    aria-selected="true"
                  >
                    Clinic List
                  </a>
                </li>
                <li className="nav-item" role="presentation">
                  <a
                    className={`nav-link ${step ? "active" : ""}`}
                    // className="nav-link"
                    id="pharmacies-list-tab"
                    data-toggle="tab"
                    onClick={() => {
                      setStep(1);
                    }}
                    role="tab"
                    aria-controls="pharmacies-list"
                    aria-selected="false"
                  >
                    Pharmacies List
                  </a>
                </li>
              </ul>
            </div>
            
          </div>
          <div className="tab-content table-custome mt-3" id="myTabContent">
            <div
              //   className="tab-pane fade show active"
              className={`tab-pane fade show ${!step ? "active" : ""}`}
              id="clinic-list"
              role="tabpanel"
              aria-labelledby="clinic-list-tab"
            >
              <div className="table-responsive">
                <table className="table"  
                 data-pagination="true"
                 data-side-pagination="server"
                 data-page-list="[10, 25, 50, 100, 200, All]"
                >
                  <thead className="green-bg">
                    <tr>
                      <th>Sr.No</th>
                      <th>Ref No</th>
                      <th>Clinic Name</th>
                      <th>Address</th>
                      <th>Area</th>
                      <th>Contact No</th>
                      <th>Hospital Type</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  {ClinicalData &&
                    ClinicalData.slice(pagesVisited, pagesVisited + usersPerPage).map((item,i) => (
                      <tbody>
                        <tr>
                          {/* {console.log("item",item)} */}
                          <td>{(i+1)}</td>
                          <td>{item.referenceNumber}</td>
                          <td>
                            <a onClick={() => handleChangePage(item)}>
                              {item.name}
                            </a>
                          </td>
                          <td>{item.address}</td>
                          <td>{item.area}</td>
                          <td>{item.contact}</td>
                          <td>{item.hospitalType}</td>
                          <td>
                            <Dropdown overlay={menu(item)}>
                              <a className="ant-dropdown-link">
                                <FormOutlined style={{ paddingLeft: "30px" }} />
                              </a>
                            </Dropdown>
                          </td>
                        </tr>
                      </tbody>
                    ))}
                </table>
              </div>
              <div className="row">
          <div className="col-xl-8  col-lg-8 col-md-8 col-sm-2 col-xs-12">
            Shown Total Results {ClinicalData && ClinicalData.length}
          </div>
          <div className="col-xl-4  col-lg-4 col-md-4 col-sm-4 col-xs-12" style={{padding:"20px"}}>
            <ReactPaginate 
              previousLabel={"Previous"}
              nextLabel={"Next"}
              pageCount={pageCount2}
              onPageChange={changePage}
              containerClassName={"paginationBttns"}
              previousLinkClassName={"previousBttn"}
              nextLinkClassName={"nextBttn"}
              disabledClassName={"paginationDisabled"}
              activeClassName={"paginationActive"}
            />
          </div>
        </div>
            </div>
            <div
              //   className="tab-pane fade"
              className={`tab-pane fade show ${step ? "active" : ""}`}
              id="pharmacies-list"
              role="tabpanel"
              aria-labelledby="pharmacies-list-tab"
            >
              <div className="table-responsive">
                <table className="table">
                  <thead className="green-bg">
                    <tr>
                      <th>Sr.No</th>
                      <th>Ref No</th>
                      <th>Pharmacy Name</th>
                      <th>Address</th>
                      <th>Area</th>
                      <th>Contact No</th>
                      <th>Service's Offered</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  {PharmacyData &&
                    PharmacyData.slice(pagesVisited, pagesVisited + usersPerPage).map((item,i) => (
                      <tbody>
                        <tr>
                          {/* {console.log("item",item)} */}
                          <td>{(i+1)}</td>
                          <td>{item.referenceNumber}</td>
                          <td>
                            <a>{item.name}</a>
                          </td>
                          <td>{item.address}</td>
                          <td>{item.area}</td>
                          <td>{item.contact}</td>
                          <td>{item.serviceOffered}</td>
                          <td>
                            <Dropdown overlay={menu(item)}>
                              <a className="ant-dropdown-link">
                                <FormOutlined style={{ paddingLeft: "30px" }} />
                              </a>
                            </Dropdown>
                          </td>
                        </tr>
                      </tbody>
                    ))}

                  <tbody>
                  </tbody>
                </table>
              </div>
              <div className="row">
          <div className="col-xl-8  col-lg-8 col-md-8 col-sm-2 col-xs-12">
            Shown Total Results {PharmacyData && PharmacyData.length}
          </div>
          <div className="col-xl-4  col-lg-4 col-md-4 col-sm-4 col-xs-12" style={{padding:"20px"}}>
            <ReactPaginate 
              previousLabel={"Previous"}
              nextLabel={"Next"}
              pageCount={pageCount}
              onPageChange={changePage}
              containerClassName={"paginationBttns"}
              previousLinkClassName={"previousBttn"}
              nextLinkClassName={"nextBttn"}
              disabledClassName={"paginationDisabled"}
              activeClassName={"paginationActive"}
            />
          </div>
        </div>
            </div>
          </div>
          <div className="header">
            <Modal show={ShowEditModal} onHide={handleEditCancel}>
              <Modal.Header closeButton>
                <Modal.Title style={{ color: "#8ec131", marginLeft: "130px" }}>
                  Edit Reimbursment List
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="container">
                  <Form.Group>
                    {/* <Form.Label>ID</Form.Label>
                    <Form.Control
                      type="id"
                      value={id}
                      name="id"
                      onChange={handleChange}
                    ></Form.Control> */}
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      value={name}
                      name="name"
                      onChange={handleChange}
                    ></Form.Control>
                    <Form.Label>Type</Form.Label>
                    <Form.Control
                      type="text"
                      value={type}
                      name="type"
                      onChange={handleChange}
                    ></Form.Control>
                    <Form.Label>Adress</Form.Label>
                    <Form.Control
                      type="textArea"
                      value={address}
                      name="address"
                      onChange={handleChange}
                    ></Form.Control>
                    <Form.Label>Area</Form.Label>
                    <Form.Control
                      type="text"
                      value={area}
                      name="area"
                      onChange={handleChange}
                    ></Form.Control>
                    <Form.Label>Contact</Form.Label>
                    <Form.Control
                      type="number"
                      value={contact}
                      name="contact"
                      onChange={handleChange}
                    ></Form.Control>
                    <Form.Label>Service_offered</Form.Label>
                    <Form.Control
                      type="text"
                      value={serviceOffered}
                      name="serviceOffered"
                      onChange={handleChange}
                    ></Form.Control>
                    <Form.Label>description</Form.Label>
                    <Form.Control
                      type="textArea"
                      value={description}
                      name="description"
                      onChange={handleChange}
                    ></Form.Control>
                  </Form.Group>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleEditInfo}
                  style={{ width: "200%" }}
                >
                  Submit
                </Button>
                <label style={{ color: "red", justifyContent: "center" }}>
                  {errorMsg}
                </label>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
      )}
      {ClinicDataPage && (
        <AdClinicData
          selectedrecord={selectedrecord}
          data={ClinicalData}
          handleback={handleBack}
        />
      )}
    </>
  );
};
export default Reimbusrment;
