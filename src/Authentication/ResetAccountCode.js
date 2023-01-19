import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Form, Input, Button, Radio,Space, Checkbox, Row } from "antd";
import Logo from '../images/Userdashboard/logo.png';
import { useSelector } from "react-redux";
import { resetpassword, resetPasswordVerification } from "../services/authentication"


//import { showAlert } from "./../../utils/showAlert";



export default function ResetAccountCode() {

  let navigate = useNavigate();
  const [Password,setPassword] =useState('')
  const [enableResetScreen, setEnableResetScreen] = useState(false)
  const [ConfirmPassword,setConfirmPassword]=useState("")

 

  let url = window.location.pathname
  let token = url && url.split('/')[2]
  console.log('token',token)

useEffect(()=>{
  async function handleverficationCall(){
    const resp = await resetPasswordVerification(token);
    console.log('resfasdfas',resp)
    if(resp){
      setEnableResetScreen(true)
    }else{
      setEnableResetScreen(false)
    }
  }
 handleverficationCall()
},[])

const reset = async(values) =>{
  console.warn(values)
  try {
    const response = await resetpassword({
         password: values.confirm_password,
         token
    });
    console.log(response);
    alert("Password Updated Sucessfully")
    navigate("/")

} catch (error) {
    /**
     * Error logic here
     * we need to do based on the error
     */
    alert(JSON.stringify(error.message));
}
}

const onFinish = (values) =>{
    reset(values)
}


  return (
    <div>
  {enableResetScreen === false ? <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
    <h3> Please reset once again... </h3>
  </div>
    :
    <body style={{ width: "100%" }}>
    <div
      className="container"
      style={{
        display: "flex",
        borderRadius: "10px",
        alignItems: "center",
        flexDirection: "column",
        marginTop: "150px",
        height: "600px",
        width: "530px",
        backgroundColor: "#4cbb17",
      }}
    >
      <div>
        <img
          src={Logo}
          style={{
            width: "175px",
            height: "45px",
            marginTop: "50px",
            marginBottom: "50px",
          }}
        />
      </div>
      <Form 
      onFinish={onFinish} 
      // onFinishFailed={onFinishFailed}
      >
       <h3 className="text-center mb-3" style={{fontWeight:"bolder",fontSize:"34px",fontFamily:"sans-serif",color:"#000080"}}>Reset Password</h3>
       <br></br>
     
        <Form.Item
          name="confirm"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required:true,
              message:'Please input your Password'
            }
          ]}
        >
          <Input.Password
            size="large"
            placeholder="Enter Password"
            style={{ height: "60px", width: "350px", borderRadius: "5px" }}
            value={Password}
            onChange={(e)=>setPassword(e.target.value)}
          />
        </Form.Item>
     <Form.Item
          name="confirm_password"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required:true,
              message:'Please input your confirm Password'
            },
            ({getFieldValue})=>({
              validator(_,value){
                if(!value || getFieldValue('confirm')===value){
                  return Promise.resolve();
                }
                return Promise.reject(new Error('the password are not matched.'))
              }
            })
          ]}
        >
          <Input.Password
            size="large"
            placeholder="Enter confirm Password"
            style={{ height: "60px", width: "350px", borderRadius: "5px" }}
            value={Password}
            onChange={(e)=>setConfirmPassword(e.target.value)}
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            style={{background:'#000080', height: "60px", width: "350px", borderRadius: "5px",borderColor:'#000080' }}
            // onClick={reset}
          >
            <div style={{color:'white',fontSize:'25px',marginTop:'5px'}}>SUBMIT</div>
          </Button>
        </Form.Item>
      </Form>
    </div>
  </body>
  }
  </div>
  );
}