import React,{useState} from "react";
import { Accordion } from "react-bootstrap";
import { Breadcrumb } from "antd";
import Supporttable from "./Supporttable";


function AdHelpAndSupport() {
  const[Homepage,setHomepage]=useState(true)
  const[tableDatapage,settableDatapage]=useState('')
  const[type,setType]=useState('')
 
const handleAddSupport = (type)=>{
  setHomepage(false)
  settableDatapage(true)
  setType(type)
  // console.log("ti",type)
}
const handleBack = () =>{
  setHomepage(true)
  settableDatapage(false)
}
  
    
  return (
    <>
    {Homepage &&
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12  col-lg-9 col-md-6 col-sm-4 my-3">
            <div className="bredc">
            <Breadcrumb style={{ marginTop: "20px" }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>Help && Support</Breadcrumb.Item>
            </Breadcrumb>
            </div>
            <div className="accord">
              <Accordion defaultActiveKey="0" flush>
                <Accordion.Item eventKey="0">
                  <Accordion.Header>Help & Support</Accordion.Header>
                  <Accordion.Body>
                    <a style={{color:"gray",fontSize:"18px"}} onClick={() =>handleAddSupport("Help")}>Get Help</a><br/>
                    <a style={{color:"gray",fontSize:"18px"}} onClick={()=>handleAddSupport("Contact")}>Contact Customer Care</a>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                  <Accordion.Header>Feed Back</Accordion.Header>
                  <Accordion.Body>
                    <a style={{color:"gray",fontSize:"22px"}} onClick={()=>handleAddSupport('Feedback')}>Give Feedback</a><br/>
                    <a style={{color:"gray",fontSize:"22px"}} onClick={()=>handleAddSupport('problem')}>Report a Problem/Greviences</a><br/>
                    <a style={{color:"gray",fontSize:"22px"}} onClick={()=>handleAddSupport('suggest')}>Suggest a Feature</a>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                  <Accordion.Header>About</Accordion.Header>
                  <Accordion.Body>
                    <a style={{color:"gray",fontSize:"22px"}} >Third Party Notice</a><br/>
                  <a style={{color:"gray",fontSize:"22px"}} >Privacy and Cookies</a>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </div>
          </div>
        </div>
      </div>
      }


{tableDatapage && <Supporttable Type={type} handleBack={handleBack}/>}

    </>
  );
}

export default AdHelpAndSupport;
