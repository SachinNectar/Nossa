import React, { useState, useEffect } from "react";
import { Breadcrumb } from "antd";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { Form, Button } from "react-bootstrap";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import { EyeOutlined } from "@ant-design/icons";
import {
  resetpassword,
  getChangePassword,
  getUserNotificationService,
  getNotificationService,
  getAddUserNotificationService,
} from "../../services/authentication";
import SetSucess from "./setSucess";

const eye = <EyeOutlined />;

export default function Setting() {
  const [data, setData] = useState({
    confirmPassword: "",
    oldPassword: "",
    newPassword: "",
  });
  const [userNotification, setUserNotification] = useState([]);
  const [notification, setnotification] = useState([]);
  const [errorMsg, seterrorMsg] = useState("");
  const [SucessPage, setsucessPage] = useState(false);
  const [settingsPage, setSettingsPage] = useState(true);
  const [emailvalue, setEmailvalue] = useState(false);
  const Token = window.localStorage.getItem("token");
  const email = window.localStorage.getItem("email");
  const loginDetailsUserId = window.localStorage.getItem("loginDetailsUserId");
  console.log(
    "Token in list",
    window.localStorage.getItem("loginDetailsUserId")
  );

  const [OldPasswordShown, setOldPasswordShown] = useState(false);
  const toggleOldPasswordVisiblity = () => {
    setOldPasswordShown(OldPasswordShown ? false : true);
  };
  // New Password Field
  const [NewPasswordShown, setNewPasswordShown] = useState(false);
  const toggleNewPasswordVisiblity = () => {
    setNewPasswordShown(NewPasswordShown ? false : true);
  };
  // Confirm New Password Field
  const [ConfNewPasswordShown, setConfNewPasswordShown] = useState(false);
  const toggleConfNewPasswordVisiblity = () => {
    setConfNewPasswordShown(ConfNewPasswordShown ? false : true);
  };

  const { confirmPassword, oldPassword, newPassword } = data;

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const reset = async () => {
    // console.warn();
    const payload = {
      email: email,
      oldPassword: oldPassword,
      confirmPassword: confirmPassword,
      password: newPassword,
      token: Token,
    };
    if (confirmPassword !== newPassword) {
      seterrorMsg("Password doesn't match");
    } else {
      try {
        const response = await getChangePassword(payload);
        // console.log(response);
        setData(" ");
        seterrorMsg("");
        setSettingsPage(false);
        setsucessPage(true);
      } catch (error) {
        alert(JSON.stringify(error.message));
      }
    }
  };

  //Notification API
  const handleNotification = async () => {
    try {
      const userNotificationResp = await getUserNotificationService();
      const notificationResp = await getNotificationService();
      // console.log('userNotificationResp',notificationResp , userNotificationResp);
      setUserNotification(userNotificationResp.data);
      setnotification(notificationResp.data);
    } catch (error) {
      alert("Error", JSON.stringify(error.message));
    }
  };
  useEffect(() => {
    handleNotification();
  }, []);

  const handleGetAddNotification = async (payload, type) => {
    console.log("payload", payload);
    try {
      const userAddNotiResp = await getAddUserNotificationService(payload);

      const respData = userAddNotiResp.data.data;
      let isExist = false;
      let updatedData = [];
      updatedData = userNotification.map((item) => {
        if (item.id === respData.id) {
          isExist = true;
          return respData;
        } else {
          return item;
        }
      });

      if (!isExist) {
        updatedData = [...updatedData, respData];
      }

      setUserNotification(updatedData);
    } catch (error) {
      /**
       * Error logic here
       * we need to do based on the error
       */
      alert(JSON.stringify(error.message));
    }
  };

  const handleback = () => {
    setsucessPage(false);
    setSettingsPage(true);
  };

  const handleUserNotification = (updateObj, email) => {
    // const updatedData = userNotification.map((item, index) => {
    //   if (item.id === j) {
    //     console.log("handleUserNotification", item, updateObj);
    //     return { ...item, ...updateObj };
    //   } else {
    //     return item;
    //   }
    // });
    // console.log("handleUserNotification updatedData", updatedData);
    // setUserNotification(updatedData);
    handleGetAddNotification(updateObj, email);
  };

  const handleTextNotification = (i, updateObj, mobile) => {
    const updatedData = userNotification.map((item, index) => {
      if (index == i) {
        return { ...item, ...updateObj };
      } else {
        return item;
      }
    });
    setUserNotification(updatedData);
    handleGetAddNotification(i, updatedData, mobile);
  };

  return (
    <>
      {settingsPage && (
        <div className="container-fluid">
          <div className="row">
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <div classpolicy="comppage">
                <Breadcrumb style={{ marginTop: "20px" }}>
                  <Breadcrumb.Item>Home</Breadcrumb.Item>
                  <Breadcrumb.Item>Settings</Breadcrumb.Item>
                </Breadcrumb>
                <div
                  style={{
                    marginTop: "20px",
                    marginBottom: "25px",
                    display: "flex",
                    justifyContent: "space-between",
                    flexDirection: "row",
                  }}
                >
                  <div>
                    <h3>Profile Setting</h3>
                  </div>
                  <div style={{ display: "flex", flexDirection: "row" }}></div>
                </div>
                <Tabs>
                  <TabList style={{ justifyContent: "space-between" }}>
                    <Tab>Change Password</Tab>
                    <Tab>Manage Notification</Tab>
                  </TabList>

                  <TabPanel>
                    <div
                      style={{
                        width: "330px",
                        marginTop: "40px",
                        marginLeft: "20px",
                      }}
                    >
                      <div className="pass-wrapper">
                        <label className="required" htmlFor="oldpass">
                          Old Password
                        </label>
                        <input
                          id="pass"
                          placeholder="Enter Old Password"
                          name="oldPassword"
                          value={oldPassword}
                          type={OldPasswordShown ? "text" : "password"}
                          onChange={handleChange}
                          required="required"
                        />
                        <i onClick={toggleOldPasswordVisiblity}>{eye}</i>
                      </div>
                      <div className="pass-wrapper">
                        <label className="required" htmlFor="newpass">
                          New Password
                        </label>
                        <input
                          id="pass"
                          placeholder="Enter New Password"
                          name="newPassword"
                          value={newPassword}
                          type={NewPasswordShown ? "text" : "password"}
                          onChange={handleChange}
                        />
                        <i onClick={toggleNewPasswordVisiblity}>{eye}</i>
                      </div>
                      <div className="pass-wrapper">
                        <label className="required" htmlFor="confpass">
                          Confirm New Password
                        </label>
                        <input
                          id="pass"
                          placeholder="Confirm New Password"
                          name="confirmPassword"
                          value={confirmPassword}
                          type={ConfNewPasswordShown ? "text" : "password"}
                          onChange={handleChange}
                        />
                        <i onClick={toggleConfNewPasswordVisiblity}>{eye}</i>
                      </div>

                      <div
                        className="bttn"
                        style={{ marginTop: "50px", borderRadius: "10px" }}
                      >
                        <button
                          type="button"
                          className="btn btn-primary btn-lg"
                          onClick={() => {
                            reset();
                          }}
                        >
                          Update Password
                        </button>
                        <button
                          type="button"
                          className="btn btn-secondary btn-lg mx-4"
                        >
                          Cancel
                        </button>
                        <label
                          style={{ color: "red", justifyContent: "center" }}
                        >
                          {errorMsg}
                        </label>
                      </div>
                    </div>
                  </TabPanel>
                  <TabPanel>
                    {/* <div className="container-fluid"> */}
                    <div className="accord mx-3">
                      {notification &&
                        notification.map((data, index) => {
                          const notificationdata = userNotification.find(
                            (userNoti, i) =>
                              userNoti.notification_id === data.id &&
                              userNoti.user_id == loginDetailsUserId
                          ) || {
                            notification_id: data.id,
                            textStatus: true,
                            emailStatus: true,
                            user_id: loginDetailsUserId,
                          };

                          data = { ...data, notificationdata };

                          return (
                            <Accordion key={data.id}>
                              <div
                                className="accordhead"
                                style={{
                                  backgroundColor: "#8EC131",
                                  color: "white",
                                }}
                              >
                                <AccordionSummary
                                  expandIcon={<ExpandMoreIcon />}
                                  aria-controls="panel1a-content"
                                >
                                  <Typography
                                    style={{
                                      fontWeight: 15,
                                      color: "white",
                                      fontSize: "large",
                                    }}
                                  >
                                    {data.name}
                                  </Typography>
                                </AccordionSummary>
                              </div>

                              <AccordionDetails>
                                <Typography key={data?.id}>
                                  <p>
                                    Premium received notification on your email
                                    <input
                                      className="react-switch-checkbox"
                                      id={`react-switch-new-${data.id}-1`}
                                      type="checkbox"
                                      checked={
                                        data.notificationdata?.emailStatus
                                      }
                                      onChange={() => {
                                        handleUserNotification(
                                          {
                                            ...data.notificationdata,
                                            emailStatus:
                                              !data.notificationdata
                                                ?.emailStatus,
                                          },
                                          "email"
                                        );
                                      }}
                                    />
                                    <label
                                      className="react-switch-label"
                                      htmlFor={`react-switch-new-${data.id}-1`}
                                    >
                                      <span className={`react-switch-button`} />
                                      {/* <span className="inner" /> */}
                                      {/* <span className="switch" /> */}
                                    </label>
                                  </p>
                                  <p>
                                    Premium received notification text message
                                    on mobile
                                    <input
                                      className="react-switch-checkbox"
                                      id={`react-switch-new-${data.id}-2`}
                                      type="checkbox"
                                      checked={
                                        data.notificationdata?.textStatus
                                      }
                                      onChange={() => {
                                        handleUserNotification(
                                          {
                                            ...data.notificationdata,
                                            textStatus:
                                              !data.notificationdata
                                                ?.textStatus,
                                          },

                                          "text"
                                        );
                                      }}
                                    />
                                    <label
                                      className="react-switch-label"
                                      htmlFor={`react-switch-new-${data.id}-2`}
                                    >
                                      <span className={`react-switch-button`} />
                                    </label>
                                  </p>
                                </Typography>
                              </AccordionDetails>
                            </Accordion>
                          );
                        })}
                    </div>
                  </TabPanel>
                </Tabs>
              </div>
            </div>
            {/* </div> */}
          </div>
        </div>
      )}
      {SucessPage && <SetSucess handleback={handleback} />}
    </>
  );
}
