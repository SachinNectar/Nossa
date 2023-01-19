import React, { useState } from "react";
import { Form, Input, Button, Radio, Space, Checkbox, Row } from "antd";
import VerticalMenu from "../components/atoms/VerticalMenu";
import Logo from "../images/Userdashboard/logo.png";
import { loginUser } from "../services/authentication";
import { useNavigate, useLocation } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [role, setRole] = React.useState("User");
  const [errorMsg, setErrormsg] = useState("");
  // const [userId,setUserId] =useState('')
  // const [password,setPassword] =useState('')

  let navigate = useNavigate();
  const { policy } = useLocation();

  const profile = () => {
    // var selectvalue = ("input[name=choice]:checked", "Form").val();
    if (role == "User") {
      navigate("/user");
    } else if (role == "Hr") {
      navigate("/am");
    } else if (role == "Admin") {
      navigate("/admin");
    }
  };

  const handleLoginButton = async (values) => {
    let roleVlaue = "";
    if (role === "User") {
      roleVlaue = 4;
    } else if (role === "Hr") {
      roleVlaue = 3;
    } else {
      roleVlaue = "";
    }
    // const roleValue =
    try {
      const resp = await loginUser(values.user_id, values.confirm, roleVlaue);
      const value = resp && resp.data.data.jwtToken;
      window.localStorage.setItem("token", value);
      window.localStorage.setItem("loginDetailsUserId", resp.data.data.userId);
      console.log(resp?.data?.data,'gfhgg')
      profile();
    } catch (error) {
      // console.log("error", error.data.message);
      setErrormsg(error.data.message);
      // alert(JSON.stringify(error.data.message));
    } finally {
      console.log("data");
    }
  };

  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    setRole(e.target.value);
  };
  const onFinish = (values) => {
    console.log("Success:", errorMsg);
    //  showAlert("Logged in.", "success");
    handleLoginButton(values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      {console.log("location", policy)}
      <div className="container">
        <div className="row justify-content-center" style={{ padding: "20px" }}>
          <div
            className="col-12 col-sm-6 col-md-5"
            style={{ paddingLeft: "0px" }}
          >
            <div className="form-container">
              <div className="logo justify-content-center">
                <img
                  src={Logo}
                  style={{
                    width: "175px",
                    height: "45px",
                    marginBottom: "40px",
                  }}
                />
              </div>
              <Form onFinish={onFinish} onFinishFailed={onFinishFailed}>
                <Form.Item
                  style={{ justifyContent: "center", display: "flex" }}
                >
                  <Radio.Group
                    onChange={onChange}
                    value={role}
                    style={{
                      justifyContent: "center",
                      display: "flex",
                      paddingRight: "30px",
                      alignSelf: "center",
                    }}
                  >
                    <Row style={{display:"grid"}}>
                      <Radio
                        name="value"
                        value="User"
                        style={{ marginRight: "20px" }}
                      >
                      User
                      </Radio>
                      <Radio
                        name="value"
                        value="Hr"
                        style={{ marginRight: "20px" }}
                      >
                        Account Manager
                      </Radio>
                      <Radio name="value" value="Admin">
                        Admin
                      </Radio>
                    </Row>
                  </Radio.Group>
                </Form.Item>
                <div>
                <p style={{ color: "red", textAlign:"center"}}>{errorMsg}</p>
                </div>
                <Form.Item
                  name="user_id"
                  rules={[
                    { required: true, message: "please Enter your userId," },
                  ]}
                >
                  <Input
                    size="large"
                    placeholder="User Id"
                    style={{ borderRadius: "5px", height: "50px" }}
                    // value={userId}
                    // onChange={(e)=>setUserId(e.target.value)}
                  />
                </Form.Item>
                <Form.Item
                  name="confirm"
                  dependencies={["password"]}
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: "Enter your Password",
                    },
                  ]}
                >
                  <Input.Password
                    size="large"
                    placeholder="Enter Password"
                    style={{ borderRadius: "5px", height: "50px" }}
                    // value={password}
                    // onChange={(e)=>setPassword(e.target.value)}
                  />
                </Form.Item>
                <Form.Item name="remember" valuePropName="checked">
                  <Checkbox style={{ color: "white" }}>Remember me</Checkbox>
                </Form.Item>
                <Form.Item>
                  <Button
                    type="primary"
                    block
                    size="large"
                    htmlType="submit"
                    style={{
                      background: "#000080",
                      borderRadius: "5px",
                      borderColor: "#000080",
                      height: "50px",
                    }}
                    // onClick={()=>handleLoginButton()}
                  >
                    <div style={{ color: "white", fontSize: "20px" }}>
                      LOGIN
                    </div>
                  </Button>
                </Form.Item>
                <Form.Item>
                  <a
                    href="#"
                    style={{
                      color: "white",
                      justifyContent: "center",
                      display: "flex",
                    }}
                    onClick={() => navigate("/forgetPassword")}
                  >
                    {" "}
                    Forget password?
                  </a>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
