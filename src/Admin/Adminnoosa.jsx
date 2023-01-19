import React, { useState } from "react";
// import { Tabs, Layout } from 'antd';
import "antd/dist/antd.min.css";
import AppHeader from "../user/Header/AppHeader";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { CaretUpOutlined, CaretDownOutlined } from "@ant-design/icons";
import Doctors from "./Reimbursment/Doctors";
import Services from "./Reimbursment/Services";

// const { TabPane } = Tabs;
const Tabs = Object.freeze([
  { label: "Dashboard", link: "admin/" },
  { label: "ListedPolicy", link: "admin/listedPolices" },
  { label: "Manager List", link: "admin/HrList" },
  // { label: "Manager List" , link: "admin/AdDemo"},
  { label: "Premium", link: "admin/paypremium" },
  { label: "Claims", link: "admin/newClaim" },
  { label: "Complaint Management", link: "admin/complaint" },
  // { label: "Complaint Management" , link: "admin/AdDemo"},
  { label: "Service Request", link: "admin/servicerequest" },
  // { label: "Service Request" , link: "admin/AdDemo"},
  { label: "Reimbursement", link: "admin/reimbursement" },
  // { label: "Reimbursment" , link: "admin/AdDemo"},
  { label: "Holidays", link: "admin/holidays" },
  // { label: "Holidays" , link: "admin/AdDemo"},
  { label: "Settings", link: "admin/setting" },
  // { label: "Settings" , link: "admin/AdDemo"},
  { label: "Help & Support", link: "admin/helpandsupport" },
  // { label: "Help & Support" , link: "admin/AdDemo"},
]);

// const { Header } = Layout;

export default function Noosa() {
  const handleReimbursment = (link) => {
    setIsActive(!Active);
    navigate(`/${link}`);
  };
  let navigate = useNavigate();
  const location = useLocation();
  const [Active, setIsActive] = useState(false);
  const [toggle, setToggle] = useState("");

  const handleClick = (value) => {
    setToggle(value);
  };
  return (
    <div  className={
      toggle
        ? "sb-nav-fixed bg-light sb-sidenav-toggled"
        : "sb-nav-fixed bg-light"
    }
  >

          <AppHeader handleClick={handleClick}/>
      <div id="layoutSidenav">
        <div id="layoutSidenav_nav">
          <nav
            className="sb-sidenav accordion sb-sidenav-dark"
            id="sidenavAccordion"
          >
            <div className="sb-sidenav-menu">
              <div className="nav mt-4">
                {Tabs.map(({ label, link }) => {
                  const isActive = location.pathname.split("/")[1] === link;
                  console.log(label);
                  if (label === "Reimbursement") {
                    return (
                      <div style={{ flexDirection: "row" }}>
                        <a
                          className={`nav-link ${isActive ? "active" : ""}`}
                          key={link}
                          onClick={() => handleReimbursment(link)}
                        >
                          {label}
                          <label style={{ marginLeft: "10px" }}>
                            {Active ? (
                              <CaretUpOutlined />
                            ) : (
                              <CaretDownOutlined />
                            )}
                          </label>
                        </a>
                        {Active ? (
                          <div style={{ backgroundColor: "#898989" }}>
                            <a
                              className={`nav-link ${isActive ? "active" : ""}`}
                              key={link}
                              onClick={() =>
                                navigate(`/admin/reimbursement/service`)
                              }
                            >
                              {console.log("lk", link)}
                              <p style={{ color: "white" }}>Service list</p>
                            </a>
                            <a
                              className={`nav-link ${isActive ? "active" : ""}`}
                              key={link}
                              onClick={() =>
                                navigate(`/admin/reimbursement/doctors`)
                              }
                            >
                              {console.log("dk", link)}
                              <p style={{ color: "white" }}>Doctor list</p>
                            </a>
                          </div>
                        ) : null}
                      </div>
                    );
                  } else {
                    return (
                      <a
                        className={`nav-link ${isActive ? "active" : ""}`}
                        key={link}
                        onClick={() => navigate(`/${link}`)}
                      >
                        {label}
                      </a>
                    );
                  }
                })}
              </div>
            </div>
          </nav>
        </div>
        Complaint
        <div id="layoutSidenav_content">
          <div className="container-fluid">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
