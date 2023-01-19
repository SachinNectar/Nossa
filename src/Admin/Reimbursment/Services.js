import React, { useEffect, useState } from "react";
import { FormOutlined } from "@ant-design/icons";
import { Menu, Dropdown, message, Breadcrumb } from "antd";
import { Button, Modal, Form, Table } from "react-bootstrap";
import moment from "moment";
import { UploadOutlined } from "@ant-design/icons";
// import {showAlert} from "../../utils/showAlert"
import ReactPaginate from "react-paginate";
import {
  getEditServicesList,
  getDeleteServicesList,
  getAddServicesList,
  getReimServicesList,
} from "../../services/authentication";
import { CSVLink } from "react-csv";

const onUpload = () => {};

const Services = () => {
  const [TableData, setTableData] = useState("");
  const [ShowModal, setShowModal] = useState(false);
  const [ServicesListArray, setServicesListArray] = useState("");
  const [ServicesData, setServicesData] = useState("");
  const [TestFile, setTestfile] = useState({
    selectedFile: null,
    selectedFileList: [],
  });
  const [bloodTest, setBloodTestfile] = useState("");
  const [show, setShow] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCancel = () => setShowModal(false);
  const [errorMsg, seterrorMsg] = useState("");

  const [file, setFile] = useState(null);
  const [Data, setData] = useState({
    id: "",
    serviceName: "",
    specialization: "",
    description: "",
    date: "",
  });

  const { id, serviceName, specialization, description, date } = Data;

  const handleChange = (e) => {
    setData({ ...Data, [e.target.name]: e.target.value });
  };


  //List Service API call

  const handleServicesList = async () => {
    try {
      let tableDataArr = [];
      const resp = await getReimServicesList();
      setServicesListArray(resp && resp.data);
      resp &&
        resp.data.map((data, i) => {
          const value = {
            id: data.id,
            serviceName: data.service,
            description: data.description,
            createdAt: data.createdAt,
          };
          tableDataArr.push(value);
          setServicesData(value);
          setTableData(tableDataArr);
          console.log("tdr", tableDataArr);
        });
    } catch (error) {
      console.log("error", error);
      // showAlert('In valide data', "error");
    }
  };

  useEffect(() => {
    handleServicesList();
  }, []);

  //Edit API

  const handleShowModal = (item) => {
    console.log("selectedRec", item);
    console.log("table", ServicesData);
    const Date = moment(item.date).format("YYYY-MM-DD");
    setData({
      id: item.id,
      serviceName: item.service,
      date: Date,
    });
    setShowModal(true);
  };

  const handleEditServicesList = async () => {
    const payload = {
      id:id,
      service:serviceName
    };
    try {
      const resp = await getEditServicesList(payload);
      console.log("success", resp);
      alert("Edited Successfully!");
      resp && handleServicesList();
      // handelEditCancel()
      setShowModal(false);
    } catch (error) {
      console.log("error", error);
      alert("Something Went Wrong");
    }
  };

  //Delete Record

  //Delete API

  const handleDeleteInfo = async (item) => {
    console.log("dd", ServicesData)
    const payload = {
      id: item.id,
    };
    try {
      const resp = await getDeleteServicesList(payload);
      console.log("success", resp);
      alert("Deleted Successfully!");
      resp && handleServicesList();
      // handelEditCancel()
    } catch (error) {
      console.log("error", error);
      alert("Something Went Wrong");
    }
  };
 
 

  const handleFileChange = (event) => {
    setFile(event.target.files);
    console.log(file);
  };
  const handleSubmit = async (event) => {
    console.log("ffff", file);
    event.preventDefault();
    const data = new FormData();
    for (var x = 0; x < file.length; x++) {
      data.append("file", file[x]);
      data.append("service",serviceName)
    }
    console.log("data", data);
  

    if (description === "" || serviceName === "" || data === "") {
      seterrorMsg("Please Fill all fileds.");
    } else {
      try {
        const resp = await getAddServicesList(data);
        console.log("record added successfuly");
        alert("Record Added Successfully!");
        seterrorMsg("");
        setShow(false);
        handleServicesList();
      } catch (error) {
        console.log("error", error);
        alert("Something Went Wrong");
        // showAlert('In valide data', "error");
      }
    }
  };

  //CSV Download

  const ServicesCSVdata = () => {
    let ServicesData = [];
    // console.log("hla", ServicesListArray);
    const ServicesListArrayData = ServicesListArray && ServicesListArray;
    if (ServicesListArrayData) {
      ServicesData.push("Id,ServiceName,Date,Description\n");
      ServicesListArrayData.map((excelData) => {
        // console.log("excel", excelData);
        ServicesData.push(
          `${excelData.id},${excelData.serviceName}, ${excelData.createdAt}, ${excelData.description}\n`
        );
      });
    }

    return ServicesData.join("");
  };
  const ServicesCSV = ServicesCSVdata();

  const [pageNumber, setPageNumber] = useState(0);
  const usersPerPage = 10;
  const pagesVisited = pageNumber * usersPerPage;
  const pageCount = Math.ceil(ServicesListArray.length / usersPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const menu = (item) => {
    return (
      <Menu>
        {/* <Menu.Item key="1">Assign to</Menu.Item> */}
        <Menu.Item
          key="2"
          onClick={() => {
            handleShowModal(item);
          }}
        >
          Edit Info
        </Menu.Item>
        <Menu.Item
          key="3"
          onClick={() => {
            handleDeleteInfo(item);
          }}
        >
          Delete
        </Menu.Item>
      </Menu>
    );
  };

  return (
    <>
      <Breadcrumb style={{ marginTop: "20px" }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>Services</Breadcrumb.Item>
        {/* <Breadcrumb.Item>claim Details</Breadcrumb.Item> */}
      </Breadcrumb>
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-3 col-lg-3 col-md-3 col-sm-3">
            <h4 id="head" className="my-3 mx-5">
              services List
            </h4>
          </div>
          <div className="col-xl-9 col-lg-9 col-md-9 col-sm-9">
            <div className="header justify-content-end">
              <button
                type="button"
                className="btn btn-success btn-sm my-3"
                style={{ width: "150px", marginRight:"15px" }}
                onClick={handleShow}
              >
                <i className="fas fa-plus-circle"></i> Add services List
              </button>
              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title
                    style={{ color: "#8ec131", marginLeft: "25px" }}
                  >
                    Add Services List
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div className="container">
                    <Form.Group>
                      {/* <Form.Label>Id</Form.Label>
                      <Form.Control type="id" value={id} name="id" onChange={handleChange}></Form.Control>  */}
                      <Form.Label>Services Name</Form.Label>
                      <Form.Control
                        type="text"
                        value={serviceName}
                        name="serviceName"
                        onChange={handleChange}
                      ></Form.Control>

                      <Form.Label>Description</Form.Label>
                      <Form.Control
                        type="textarea"
                        value={description}
                        name="description"
                        onChange={handleChange}
                      ></Form.Control>
                    <Form.Label>Upload</Form.Label>{" "}
                     <Form.Control
                      type="file"
                      id="file"
                      // className={classes.fileInput}
                      onChange={handleFileChange}
                    ></Form.Control>
                  </Form.Group>
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={handleSubmit}
                    style={{ width: "200%" }}
                  >
                    submit
                  </Button>
                 
                  <label style={{ color: "red", justifyContent: "center" }}>
                    {errorMsg}
                  </label>
                </Modal.Footer>
              </Modal>
              <div className="btn-group hover_drop_down">
                {/* <button
                    type="button"
                    className="btn btn-success btn-sm my-3"
                    data-toggle="dropdown"
                    style={{ width: "130px" }}
                  >
                    <i className="fas fa-filter"></i> Add Filters
                  </button>
                  <ul className="dropdown-menu" role="menu" onClick={HandleClick}>
                    <li>
                      <a onClick={() =>{handleclick("Public Holiday")}}>Public Holiday </a>
                    </li>
                    <li>
                      <a onClick={() =>{handleclick("National Holiday")}}>National Holiday</a>
                    </li>
                    <li>
                      <a onClick={() =>{handleclick("seasonal Holiday")}}>seasonal Holiday</a>
                    </li>
                  </ul> */}
                <button type="button" className="btn btn-primary btn-sm my-3">
                  <CSVLink data={ServicesCSV} target="_blank" style={{color:"white"}}>
                    Download PDF/CSV
                  </CSVLink>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
            <Table responsive>
              <thead>
                <tr>
                  <th>Sr.No.</th>
                  <th> Service Name</th>
                  <th>createdAt</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {ServicesListArray &&
                  ServicesListArray.slice(pagesVisited, pagesVisited + usersPerPage).map((item, i) => (
                    <tr>
                      {console.log("sla",ServicesListArray)}
                      <td>{i+1}</td>
                      <td>{item.service}</td>
                      <td>{moment(item.createdAt).format('YYYY-MM-DD')}</td>
                      <td>
                        <Dropdown overlay={menu(item)}>
                          <a className="ant-dropdown-link">
                            <FormOutlined style={{ paddingLeft: "30px" }} />
                          </a>
                        </Dropdown>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </div>
        </div>
        <div className="row">
        <div className="col-xl-8  col-lg-8 col-md-8 col-sm-2 col-xs-12">
          Shown Results {ServicesListArray && ServicesListArray.length}
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
        <div className="col-xl-5  col-lg-4 col-md-3 col-sm-2">
          <div className="header">
            <Modal show={ShowModal} onHide={handleCancel}>
              <Modal.Header closeButton>
                <Modal.Title style={{ color: "#8ec131", marginLeft: "25px"  }}>
                  Edit Services List
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="container">
                  <Form.Group>
                    {/* <Form.Label>Id</Form.Label>
                    <Form.Control
                      type="id"
                      value={id}
                      name="id"
                    ></Form.Control> */}
                    <Form.Label>Service Name</Form.Label>
                    <Form.Control
                      type="text"
                      value={serviceName}
                      name="serviceName"
                      onChange={handleChange}
                    ></Form.Control>
                    <Form.Label>Created At</Form.Label>
                    <Form.Control
                      type="date"
                      value={date}
                      name="date"
                      onChange={handleChange}
                    ></Form.Control>
                  </Form.Group>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleEditServicesList}
                  style={{ width: "200%" }}
                >
                  Submit
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
      </div>
    </>
  );
};
export default Services;
