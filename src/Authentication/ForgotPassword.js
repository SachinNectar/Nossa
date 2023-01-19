import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { isValidEmail } from "../utils/validators";
import { Form, Input, Button, Radio,Space, Checkbox, Row } from "antd";
import VerticalMenu from "../components/atoms/VerticalMenu";
import Logo from "../images/Userdashboard/logo.png";
import { forgotPassword } from "../services/authentication";
import "./Login.css";

export default function ResetAccount() {
  let navigate = useNavigate();
  const [email, setEmailId] = useState();
  const [btnLoading, setBtnLoading] = useState();
  const [emailError, setEmailError] = useState();
  const[errorMsg,setErrormsg] = useState('')


  const resetPassword = async () => {
    if (!isValidEmail(email)) {
      setEmailError("Please enter valid email.");
      return;
    }
    try {
      // console.log('try emailId', email)
      await forgotPassword(email);
      setErrormsg(null)
      alert("Verification Email sent successfully.")
      navigate("/")


     

    } catch (error) {
      // console.log('error.', error.response.data.message)
      setErrormsg(error.response.data.message);
      // showAlert("Your email is not register!! Please Try again.", "error");
    } finally {
      console.log('final')
      setBtnLoading(false);
    }
  };

  return (
    <div>
      <div className="container">
      <div className="row justify-content-center" style={{padding:"20px"}}>
        <div className="col-12 col-sm-6 col-md-6" style={{paddingLeft:"0px"}}>
        <div className="form-container">
        <div className="logo justify-content-center">
          <img
            src={Logo}
            style={{
              width: "175px",
              height: "45px",
            }}
          />
        </div>
        <h3 className="text-center mb-3 my-4">Forget Password</h3>

        {/* <p className="text-center font-weight-light">
          Please enter your registered mail id
        </p> */}
        <Form>
        <Form.Item
            name="user id"
            rules={[
              { required: true, message: "please Input your Email Id," },
            ]}
          >
            <Input
              size="large"
              placeholder="Please enter your registered mail id"
              style={{ height: "60px", borderRadius: "5px" }}
              value={email}
              onChange={(e)=>setEmailId(e.target.value)}
            />
          </Form.Item>
          {/* <div className="form-group">
            <input
              className="form-control"
              type="email"
              placeholder="Registered email id"
              onChange={(e) => setEmail(e.target.value)}
            />
            {emailError && <p className="errorText">{emailError}</p>}
          </div> */}
          <Form.Item>
            <Button
              type="primary" block
              size="large"
              htmlType="submit"
              style={{background:'#000080', height: "60px", borderRadius: "5px",borderColor:'#000080' }}
              onClick={(e)=> { 
                e.preventDefault();
                resetPassword(); }}
            >
              <div style={{color:'white',fontSize:'25px',marginTop:'5px'}}>Send</div>
            </Button>
          </Form.Item>
          {/* <div className="form-group d-flex align-items-center justify-content-between mb-3">
            <button
              className="btn btn-info btn-block btn-lg"
              onClick={(e) => {
                e.preventDefault();
                sendOTP();
              }}
              disabled={!email || btnLoading}
            >
              Next
            </button>
          </div> */}
             <div style={{display:'flex',justifyContent:'center'}}>
                <b><p style={{ color: "red",fontSize:'18px'}}>{errorMsg}</p></b>
                </div>
          </Form>
        </div>
        </div>
      </div>
      </div>
    </div>
  );
}
