import React, { useEffect, useState } from "react";
// import "./styles.css";
import { EditOutlined } from "@ant-design/icons";
import { Menu, Dropdown } from "antd";
import { Button, Modal, Form, Table } from "react-bootstrap";
import moment from "moment";
import {
  getEditHoliday,
  getDeleteHoliday,
  getHolidaysList,
  getAddHoliday,
} from ".././services/authentication";
import { CSVLink } from "react-csv";
import ReactPaginate from "react-paginate";

function HrHolidays() {
  const [show, setShow] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [ShowModal, setShowModal] = useState(false);
  const [HolidaysData, setHolidaysData] = useState("");
  const [HolidayListArray, setHolidayListArray] = useState("");
  const [TableData, setTableData] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCancel = () => setShowModal(false);
  const [Data, setData] = useState({
    id: "",
    Name: "",
    Day: "",
    date: "",
    Type: "",
  });

  const { Name, Day, date, Type, id } = Data;

  const handleChange = (e) => {
    setData({ ...Data, [e.target.name]: e.target.value });
  };

  const HandleClick = () => {};

  //List API

  const handleHolidaysList = async () => {
    try {
      let tableDataArr = [];
      const resp = await getHolidaysList();
      setHolidayListArray(resp && resp.data);
      resp &&
        resp.data.map((data, i) => {
          const value = {
            id: data.id,
            Name: data.name,
            Date: moment(data.date).format('YYYY-MM-DD'),
            Day: data.day,
            Type: data.type,
          };
          tableDataArr.push(value);
          setHolidaysData(value);
          setTableData(tableDataArr);
          //console.log("tdr", tableDataArr);
        });
    } catch (error) {
      console.log("error", error);
      // showAlert('In valide data', "error");
    }
  };

  useEffect(() => {
    handleHolidaysList();
  }, []);

  //Ended

  //Delete API

  const handleDeleteInfo = async () => {
    const payload = {
      id: HolidaysData.id,
    };
    try {
      const resp = await getDeleteHoliday(payload);
      //console.log('success',resp)
      alert("Deleted Sucessfully");
      resp && handleHolidaysList();
      // handelEditCancel()
    } catch (error) {
      console.log("error", error);
      alert("Something Went Wrong");
    }
  };

  //Ended

  //Edit API

  const handleShowModal = (selectedRec) => {
    //console.log("table",HolidaysData)
    //console.log('selectedRec',selectedRec)
    const Date = moment(selectedRec.date).format("YYYY-MM-DD");
    setData({
      id: selectedRec.id,
      Name: selectedRec.Name,
      Day: selectedRec.Day,
      date: Date,
      Type: selectedRec.Type,
    });
    setShowModal(true);
  };

  const handleEditInfo = async () => {
    const payload = {
      id: HolidaysData.id,
      name: Name,
      date: date,
      day: Day,
      type: Type,
    };
    try {
      const resp = await getEditHoliday(payload);
      //console.log('success',resp)
      alert("Record Added Successfully!");
      resp && handleHolidaysList();
      // handelEditCancel()
      setShowModal(false);
    } catch (error) {
      console.log("error", error);
      alert("Something Went Wrong");
    }
  };

  //ADD List API
  const handleAddHlidayAPI = () => {
    const Payload = {
      name: Name,
      date: date,
      day: Day,
      type: Type,
    };

    if (Name === "" || date === "" || Day === "" || Type === "") {
      setErrorMsg("Please Fill all fileds.");
    } else {
      try {
        const resp = getAddHoliday(Payload);
        console.log("sucess", resp);
        alert("Holiday Added Sucessfully");
        setShow(false);
        handleHolidaysList();
        setData(" ");
        setErrorMsg(null);
      } catch (error) {
        console.log("error", error);
        alert("Something Went Wrong");
      }
    }
  };

  const menu = (selectedRec) => {
    return (
      <Menu>
        {/* <Menu.Item key="1">Assign to</Menu.Item> */}
        <Menu.Item
          key="2"
          onClick={() => {
            handleShowModal(selectedRec);
          }}
        >
          Edit Info
        </Menu.Item>
        <Menu.Item
          key="3"
          onClick={() => {
            handleDeleteInfo(selectedRec);
          }}
        >
          Delete
        </Menu.Item>
      </Menu>
    );
  };

  //CSV Download

  const HolidayCSVdata = () => {
    let HolidayData = [];
    //console.log("hla",HolidayListArray)
    const HolidayListArrayData = HolidayListArray && HolidayListArray;
    if (HolidayListArrayData) {
      HolidayData.push("Id,Name,Date,Day,Type\n");
      HolidayListArrayData.map((excelData) => {
        //console.log("excel",excelData)
        HolidayData.push(
          `${excelData.id},${excelData.name}, ${excelData.date}, ${excelData.day},${excelData.type}\n`
        );
      });
    }

    return HolidayData.join("");
  };
  const HolidayCSV = HolidayCSVdata();

  //Filter
  const handleFilterData = (filterData) => {
    const tableDataArr = [];
    //console.log('filterData',filterData)
    if (filterData.length > 0) {
      filterData.map((data, i) => {
        const value = {
          id: data.id,
          Name: data.name,
          Day: data.day,
          Date: data.date,
          Type: data.type,
        };
        tableDataArr.push(value);
      });
    }
    return tableDataArr;
  };

  const handleclick = (Type) => {
    const HolidayfilterData =
      HolidayListArray && HolidayListArray.filter((data) => data.type === Type);
    const filterData = handleFilterData(HolidayfilterData);
    setTableData(filterData);
  };

  // This section is for pagination

  const [pageNumber, setPageNumber] = useState(0);
  const usersPerPage = 10;
  const pagesVisited = pageNumber * usersPerPage;
  const pageCount = Math.ceil(TableData.length / usersPerPage);
  // const pageCount2 = Math.ceil(ClinicalData.length / usersPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <>
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
          <div className="col-12  col-lg-3 col-md-3 col-sm-3">
            <h4 id="head" className="my-3 mx-5">
              Holiday List 2022
            </h4>
          </div>
          <div className="col-12  col-lg-9 col-md-9 col-sm-9">
            <div className="header justify-content-end">
              {/* <button
                type="button"
                className="btn btn-success btn-sm my-3"
                style={{ width: "150px", marginRight:"15px" }}
                onClick={handleShow}
              >
                <i className="fas fa-plus-circle"></i> Add Holiday List
              </button>
              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title
                    style={{ color: "#8ec131",}}
                  >
                    Add Holiday List
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div className="container">
                    <Form.Group>
                    <Form.Label>Holiday Name</Form.Label>
                      <Form.Control
                        type="text"
                        value={Name}
                        name="Name"
                        onChange={handleChange}
                      ></Form.Control>
                      <Form.Label>Date</Form.Label>
                      <Form.Control
                        type="date"
                        value={date}
                        name="date"
                        onChange={handleChange}
                      ></Form.Control>
                      <Form.Label>Day</Form.Label>
                      <Form.Control
                        type="text"
                        value={Day}
                        name="Day"
                        onChange={handleChange}
                      ></Form.Control>
                      <Form.Label>Holiday Type</Form.Label>
                      <Form.Select size="lg" value={Type} name="Type" onChange={handleChange}>
                        <option>Open this select menu</option>
                        <option>public</option>
                        <option>National</option>
                        <option>seasonal</option>
                      </Form.Select>
                    </Form.Group>
                  </div>
                  <div>
                    <h6 style={{color:"red"}}>{errorMsg}</h6>
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={handleAddHlidayAPI}
                    style={{ width: "200%" }}
                  >
                    Add
                  </Button>
                </Modal.Footer>
              </Modal> */}
              <button
                type="button"
                className="btn btn-success btn-sm my-3"
                data-toggle="dropdown"
                style={{ width: "130px", marginRight: "15px" }}
              >
                <i className="fas fa-filter"></i> Add Filters
              </button>
              <ul className="dropdown-menu" style={{textAlign:"center"}} role="menu" onClick={HandleClick}>
                <li>
                  <a
                    onClick={() => {
                      handleclick("Public Holiday");
                    }}
                  >
                    Public Holiday{" "}
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => {
                      handleclick("National Holiday");
                    }}
                  >
                    National Holiday
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => {
                      handleclick("seasonal Holiday");
                    }}
                  >
                    seasonal Holiday
                  </a>
                </li>
              </ul>
              <button type="button" className="btn btn-primary btn-sm my-3">
                <CSVLink
                  data={HolidayCSV}
                  style={{ color: "white" }}
                  target="_blank"
                >
                  Download PDF/CSV
                </CSVLink>
              </button>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-12  col-lg-12 col-md-12 col-sm-12">
            <Table responsive>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Date</th>
                  <th>Day</th>
                  <th>Type</th>
                  {/* <th>Action</th> */}
                </tr>
              </thead>
              <tbody>
                {TableData &&
                  TableData.slice(
                    pagesVisited,
                    pagesVisited + usersPerPage
                  ).map((item) => (
                    <tr>
                      <td>{item.id}</td>
                      <td>{item.Name}</td>
                      <td>{item.Date}</td>
                      <td>{item.Day}</td>
                      <td>{item.Type}</td>
                      {/* <td>
                        <Dropdown overlay={menu(item)}>
                          <a className="ant-dropdown-link">
                            <EditOutlined style={{ paddingLeft: "30px" }} />
                          </a>
                        </Dropdown>
                      </td> */}
                    </tr>
                  ))}
              </tbody>
            </Table>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-8  col-lg-8 col-md-8 col-sm-2 col-xs-12">
            <small>Shown Total Results {TableData && TableData.length}</small>
          </div>
          <div
            className="col-xl-4  col-lg-4 col-md-4 col-sm-4 col-xs-12"
            style={{ padding: "20px" }}
          >
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
                <Modal.Title style={{ color: "#8ec131", marginLeft: "130px" }}>
                  Edit Holiday List
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="container">
                  <Form.Group>
                    <Form.Label>Id</Form.Label>
                    <Form.Control
                      type="id"
                      value={id}
                      name="id"
                      onChange={handleChange}
                    ></Form.Control>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      value={Name}
                      name="Name"
                      onChange={handleChange}
                    ></Form.Control>
                    <Form.Label>Day</Form.Label>
                    <Form.Control
                      type="text"
                      value={Day}
                      name="Day"
                      onChange={handleChange}
                    ></Form.Control>
                    <Form.Label>Date</Form.Label>
                    <Form.Control
                      type="date"
                      value={date}
                      name="date"
                      onChange={handleChange}
                    ></Form.Control>
                    <Form.Label>Type</Form.Label>
                    <Form.Control
                      type="text"
                      value={Type}
                      name="Type"
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
              </Modal.Footer>
            </Modal>
          </div>
        </div>
      </div>
    </>
  );
}

export default HrHolidays;
