import React,{useState} from "react";
import { Accordion } from "react-bootstrap";
import { Breadcrumb } from "antd";
import { getAddSupport } from ".././services/authentication"
import {Button,Modal, Form, Table} from "react-bootstrap";
import "./UserStyle.css"

function HelpAndSupport() {

  
  const[show,setShow]=useState('')
  const[errorMsg,seterrorMsg]=useState('')
  const[Type,SetType]=useState("")


  const [Data,setData] = useState({
    name:"",
    subject:"",
    description:"",
    phone:"",
    email:"",
  })

  const{name,subject,description,phone,email}=Data;

  const handleChange = (e) => {
    setData({ ...Data, [e.target.name]: e.target.value });
  };
  const handleClose = () => setShow(false);
  const  handleShowModal =(type)=>{
    setShow(true)
    SetType(type)

  }




      //ADD API started
      const handleSubmit = async () => {
        const Payload = {
          type:Type,
          name:name,
          email:email,
          phone:phone,
          subject:subject,
          description:description
          };
 
        if (
          Type === "" ||
            description === "" ||
            email === "" ||
            phone === "" ||
            subject === "" ||
            name === "" 
           ) 
            {
          seterrorMsg("Please Fill all fileds.");
           } 
         else {
          try {
            const resp = await getAddSupport(Payload);
            console.log("record added successfuly");
            alert("Record added successfully!")
            seterrorMsg("");
            setShow(false);
            // handleDoctorsList()
          } catch (error) {
            console.log("error", error);
            // showAlert('In valide data', "error");
            alert("Something Went wrong");
          }
        
      };
    }
 
    
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12  col-lg-9 col-md-6 col-sm-4 my-3">
            <div className="bredc">
            <Breadcrumb style={{ marginTop: "20px" }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>Help&Support</Breadcrumb.Item>
            </Breadcrumb>
            </div>
              <Accordion  style={{width:"100%"}}defaultActiveKey="0" flush>
                <Accordion.Item eventKey="0">
                  <Accordion.Header>Help & Support</Accordion.Header>
                  <Accordion.Body>
                    <a style={{color:"gray",fontSize:"18px"}} onClick={()=>handleShowModal("Help")} >Get Help</a><br/>
                    <a style={{color:"gray",fontSize:"18px"}} onClick={()=>handleShowModal("Contact")}>Contact Customer Care</a>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                  <Accordion.Header>Feed Back</Accordion.Header>
                  <Accordion.Body>
                    <a style={{color:"gray",fontSize:"18px"}} onClick={()=>handleShowModal("Feedback")}>Give Feedback</a><br/>
                    <a style={{color:"gray",fontSize:"18px"}} onClick={()=>handleShowModal("Problem")}>Report a Problem/Greviences</a><br/>
                    <a style={{color:"gray",fontSize:"18px"}} onClick={()=>handleShowModal("Suggest")}>Suggest a Feature</a>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                  <Accordion.Header>About</Accordion.Header>
                  <Accordion.Body>
                    <a style={{color:"gray",color:"gray",fontSize:"18px"}}>Third Party Notice</a><br/>
                    <a style={{color:"gray",color:"gray",fontSize:"18px"}}>Privacy and Cookies</a>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
          </div>
        </div>
      </div>
       <div>
<Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title
                    style={{ color: "#8ec131", marginLeft: "25px" }}
                  >
                    Add {Type}
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <div className="container">
                    <Form.Group>
                    <Form.Label>Type</Form.Label>
                    <Form.Control type="text" value={Type} name="type"  onChange={handleChange}></Form.Control>
                     <Form.Label>User Name</Form.Label>
                    <Form.Control type="text" value={name} name="name"  onChange={handleChange}></Form.Control>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" value={email} name="email"  onChange={handleChange}></Form.Control>
                    <Form.Label>Description</Form.Label>
                    <Form.Control type="textarea" value={description} name="description"  onChange={handleChange}></Form.Control>
                    <Form.Label>Subject</Form.Label>
                    <Form.Control type="text" value={subject} name="subject"  onChange={handleChange}></Form.Control>
                    <Form.Label>phone</Form.Label>
                    <Form.Control type="tel" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" value={phone} name="phone"  onChange={handleChange}></Form.Control>
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
</div> 
    </>
  );
}

export default HelpAndSupport;
