// import React from "react";
import React, { useEffect, useState } from "react";
import { FormOutlined} from "@ant-design/icons";
import { Menu, Dropdown,Breadcrumb } from 'antd';
import {Button,Modal, Form, Table} from "react-bootstrap";
import { getDoctorsList } from "../../services/authentication";
import moment from 'moment';
import { getEditDoctorsList,getDeleteDoctorsList,getAddDoctorsList } from "../../services/authentication";
import {CSVLink} from "react-csv";
import AdReimbusrment from "./AdReimbursment"
import ReactPaginate from "react-paginate";


  

const Doctors = () =>{
    const[DoctorsListArray,setDoctorsListArray]=useState('');
    const[DoctorsData,setDoctorsData]=useState('')
    const[TableData,setTableData]=useState('')
    const[ShowModal,setShowModal]=useState(false)
    const[show,setShow]=useState('')
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleCancel = () =>setShowModal(false)
    const[errorMsg,seterrorMsg]=useState('')
    const[ReimbursmentPage,setReimbusrmentPage]=useState('')

    const [Data,setData] = useState({
        id:"",
        Name:"",
        specialization:"",
        description:"",
        date:"",
      })
    
      const{id,Name,specialization,description,date}=Data;
    
      const handleChange = (e) => {
        setData({ ...Data, [e.target.name]: e.target.value });
      };
    






    const handleDoctorsList = async () => {
        try {
          let tableDataArr = [];
          const resp = await getDoctorsList();
        
          setDoctorsListArray(resp&&resp.data)
          resp &&
            resp.data.map((data, i) => {
              const value = {
  
                id:data.id,
                Name:data.doctorName,
                specialization:data.specialization,
                description:data.description,
                createdAt:data.createdAt
 
              };
              tableDataArr.push(value);
              setDoctorsData(value)
              setTableData(tableDataArr);
              console.log("tdr", tableDataArr);
            });
        } catch (error) {
          console.log("error", error);
          // showAlert('In valide data', "error");
        }
      };
    
      useEffect(() => {
        handleDoctorsList();
      }, []);
      

       //Edit API

  const handleShowModal = (item) =>{
     console.log('item',item)
     console.log("table",DoctorsData)
    const Date = moment(item.date).format('YYYY-MM-DD');
    setData({ 
    id:item.id,
    Name:item.doctorName,
    specialization:item.specialization,
    date:Date,
    description:item.description})
    setShowModal(true)
  }
  
  
  const handleEditDoctorsList = async() =>{
    console.log("id",id)
   const payload ={
     "id":id,
    "doctorName":Name,
    "date": date,
    "specialization":specialization,
    "description":description
  }
  try {
    const resp = await getEditDoctorsList(payload);
    console.log('success',resp)
    alert("Edited Successfully");
    resp && handleDoctorsList()
    // handelEditCancel()
    setShowModal(false)
  } catch (error) {
      console.log('error',error);
      alert("Something Went Wrong");
  }
  
  }

  //Delete Record

  //Delete API

  const handleDeleteInfo = async(item) =>{
    // console.log("dd",DoctorsData)
    const payload ={
         "id": item.id, 
      }
      try {
        const resp = await getDeleteDoctorsList(payload);
        console.log('success',resp)
        alert("Deleted Successfully!");
        resp && handleDoctorsList()
        // handelEditCancel()
      } catch (error) {
          console.log('error',error);
          alert("Something Went Wrong");
      }
 

  }

      const menu =(item)=> {
        return(
        <Menu>
          {/* <Menu.Item key="1">Assign to</Menu.Item> */}
          <Menu.Item key="2" onClick={() =>{handleShowModal(item)}}>Edit Info</Menu.Item>
          <Menu.Item key="3" onClick={() =>{handleDeleteInfo(item)}}>Delete</Menu.Item>
        </Menu>
        )
      }  
      //ADD API started
    const handleSubmit = async () => {
        const Payload = {
            doctorName: Name,
            specialization:specialization,
            description: description
          };
 
        if (
            specialization === "" ||
            description === "" ||
            Name === "" 
           ) 
            {
          seterrorMsg("Please Fill all fileds.");
           } 
         else {
          try {
            const resp = await getAddDoctorsList(Payload);
            console.log("record added successfuly");
            alert("Record Added Successfully!");
            seterrorMsg("");
            setShow(false);
            handleDoctorsList()
          } catch (error) {
            console.log("error", error);
            alert("Something Went Wrong");
            // showAlert('In valide data', "error");
          }
        
      };
    }

    const DoctorsCSVdata = () =>{
        let DoctorsData =[]
        // console.log("hla",HolidayListArray)
        const DoctorsListArrayData = DoctorsListArray && DoctorsListArray
        if(DoctorsListArrayData){
            DoctorsData.push('Id,Name,specialization,Description,CreatedAt\n')
          DoctorsListArrayData.map((excelData)=>{
            console.log("excel",excelData)
            DoctorsData.push(
              `${excelData.id},${excelData.doctorName}, ${excelData.specialization}, ${excelData.description},${excelData.createdAt}\n`
     
              )
    
          })
        }
        
        return DoctorsData.join('')
      }
      const DoctorsCSV = DoctorsCSVdata()

      const [pageNumber, setPageNumber] = useState(0);
      const usersPerPage = 10;
      const pagesVisited = pageNumber * usersPerPage;
      const pageCount = Math.ceil(DoctorsListArray.length / usersPerPage);
      const changePage = ({ selected }) => {
        setPageNumber(selected);
      };



    return(
        <>
         <Breadcrumb style={{ marginTop: "20px" }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>Doctors</Breadcrumb.Item>
            {/* <Breadcrumb.Item>claim Details</Breadcrumb.Item> */}
          </Breadcrumb>
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-3 col-lg-3 col-md-3 col-sm-3">
            <h4 id="head" className="my-3 mx-5">
              Doctors List
            </h4>
          </div>
          <div className="col-xl-9 col-lg-9 col-md-9 col-sm-9">
            <div className="header justify-content-end">
              <button
                type="button"
                className="btn btn-success btn-sm my-3"
                style={{ width: "160px", marginRight:"15px" }}
                onClick={handleShow}
              >
                <i className="fas fa-plus-circle"></i> Add Doctors List
              </button>
              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title
                    style={{ color: "#61B33B", marginLeft: "25px" }}
                  >
                    Add Doctors List
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <div className="container">
                    <Form.Group>
                     <Form.Label>Doctors Name</Form.Label>
                    <Form.Control type="text" value={Name} name="Name" onChange={handleChange}></Form.Control>
                    <Form.Label>specialization</Form.Label>
                    <Form.Control type="text" value={specialization} name="specialization" onChange={handleChange}></Form.Control>
                    <Form.Label>Description</Form.Label>
                    <Form.Control type="textarea" value={description} name="description" onChange={handleChange}></Form.Control>
                    <Form.Label>Created At</Form.Label>
                    <Form.Control type="date" value={date} name="date" onChange={handleChange}></Form.Control>
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

              <button type="button" className="btn btn-primary btn-sm my-3">
              <CSVLink data={DoctorsCSV} target="_blank" style={{color:"white"}}>
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
                  <th>Name</th>
                  <th>specialization</th>
                  <th>Description</th>
                  <th>createdAt</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {DoctorsListArray &&
                  DoctorsListArray.slice(pagesVisited, pagesVisited + usersPerPage).map((item, i) => (
                    <tr>
                      {console.log("DLA",DoctorsListArray)}
                      <td>{i+1}</td>
                      <td>{item.doctorName}</td>
                      <td>{item.specialization}</td>
                      <td>{item.description}</td>
                      <td>{moment(item.createdAt).format('YYYY-MM-DD')}</td>
                      <td>
                        <Dropdown overlay={menu(item)}>
                          <a className="ant-dropdown-link">
                            <FormOutlined  style={{ paddingLeft: "30px" }} />
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
            Shown Results{DoctorsListArray && DoctorsListArray.length}
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
                  <Modal.Title
                    style={{ color: "#61B33B", marginLeft: "25px" }}
                  >
                    Edit Doctors List
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div className="container">
                    <Form.Group>
                    {/* <Form.Label>Id</Form.Label>
                    <Form.Control type="id" value={id} name="id"></Form.Control>  */}
                     <Form.Label>Doctors Name</Form.Label>
                    <Form.Control type="text" value={Name} name="Name" onChange={handleChange}></Form.Control>
                    <Form.Label>specialization</Form.Label>
                    <Form.Control type="text" value={specialization} name="specilization" onChange={handleChange}></Form.Control>
                    <Form.Label>Description</Form.Label>
                    <Form.Control type="textarea" value={description} name="description" onChange={handleChange}></Form.Control>
                    <Form.Label>Created At</Form.Label>
                    <Form.Control type="date" value={date} name="date" onChange={handleChange}></Form.Control>
                    </Form.Group>
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={handleEditDoctorsList}
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
    )
}
export default Doctors