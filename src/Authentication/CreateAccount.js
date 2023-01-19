import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import Logo from "../images/Userdashboard/logo.png";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/authentication";
import "./Login.css";

const CreateAccount = () => {
  let navigate = useNavigate();

  const signup = async (values) => {
    console.warn(values);
    try {
      const response = await registerUser({
        firstName: values.First_Name,
        lastName: values.LastName,
        email: values.email,
        password: values.password,
      });
      navigate("/login");
    } catch (error) {
      /**
       * Error logic here
       * we need to do based on the error
       */
      // alert(JSON.stringify(error));
    }
  };

  const onFinish = (values) => {
    signup(values);
  };

  return (
    <div>
      <div className="container">
        <div className="row justify-content-center" style={{padding:"20px"}}>
          <div className="col-12 col-sm-6 col-md-6 col-lg-6" style={{paddingLeft:"0px"}}>
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
              <Form onFinish={onFinish}>
                <Form.Item
                  name="First_Name"
                  rules={[
                    {
                      required: true,
                      message: "please Input your First Name,",
                    },
                  ]}
                >
                  <Input
                    size="large"
                    placeholder="First Name"
                    // value={'FirstName'}
                    // onChange={(e) => setFirstName(e.target.value)}
                    style={{
                      height: "40px",
                      borderRadius: "5px",
                    }}
                  />
                </Form.Item>
                <Form.Item
                  name="LastName"
                  rules={[
                    {
                      required: true,
                      message: "please Input your Last Name,",
                    },
                  ]}
                >
                  <Input
                    size="large"
                    placeholder="Last Name"
                    // value={'LastName'}
                    // onChange={(e) => setLastName(e.target.value)}
                    style={{
                      height: "40px",
                      borderRadius: "5px",
                    }}
                  />
                </Form.Item>
                <Form.Item
                  name="email"
                  rules={[
                    {
                      type: "email",
                      message: "The input is not valid E-mail!",
                    },
                    {
                      required: true,
                      message: "Please input your E-mail!",
                    },
                  ]}
                >
                  <Input
                    size="large"
                    placeholder="E-mail"
                    // value={'Email'}
                    // onChange={(e) => setEmail(e.target.value)}
                    style={{
                      height: "40px",
                      borderRadius: "5px",
                    }}
                  />
                </Form.Item>

                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your password!",
                    },
                  ]}
                  hasFeedback
                >
                  <Input.Password
                    size="large"
                    placeholder="Password"
                    // value={'Password'}
                    // onChange={(e) => setPassword(e.target.value)}
                    style={{
                      height: "40px",
                      borderRadius: "5px",
                    }}
                  />
                </Form.Item>

                <Form.Item
                  name="confirm"
                  dependencies={["password"]}
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: "Please confirm your password!",
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        }

                        return Promise.reject(
                          new Error(
                            "The two passwords that you entered do not match!"
                          )
                        );
                      },
                    }),
                  ]}
                >
                  <Input.Password
                    size="large"
                    placeholder="Confirm Password"
                    // value={'ConfirmPassword'}
                    // onChange={(e) => setConfirmPassword(e.target.value)}
                    style={{
                      height: "40px",
                      borderRadius: "5px",
                    }}
                  />
                </Form.Item>
                <Form.Item>
                  <Button
                    type="primary"
                    block
                    size="large"
                    htmlType="submit"
                    onClick={signup}
                    style={{
                      background: "#000080",
                      color: "white",
                      height: "40px",
                      borderRadius: "5px",
                    }}
                  >
                    REGISTER
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CreateAccount;
