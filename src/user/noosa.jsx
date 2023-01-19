import React, { useState } from "react";
// import { Tabs, Layout } from 'antd';
import "antd/dist/antd.min.css";
import AppHeader from "./Header/AppHeader";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Tab } from "@material-ui/core";
import Dashboard from "./Dashboard";

// const { TabPane } = Tabs;
const Tabs = Object.freeze([
  { label: "Dashboard", link: "user/" },
  { label: "Pay Premium", link: "user/paypremium" },
  { label: "Claims", link: "user/newClaim" },
  { label: "Complaint", link: "user/complaint" },
  // { label: "Complaint" , link: "user/Demo"},
  { label: "Nossacard", link: "user/noosacard" },
  // { label: "NossaCard" , link: "user/Demo"},
  { label: "Service Request", link: "user/servicerequest" },
  // { label: "Service Request" , link: "user/Demo"},
  { label: "Reimbursement", link: "user/reimbursement" },
  // { label: "Reimbursment" , link: "user/Demo"},
  { label: "Holidays", link: "user/holidays" },
  // { label: "Holidays" , link: "user/Demo"},
  { label: "Settings", link: "user/setting" },
  // { label: "Settings" , link: "user/Demo"},
  { label: "Help & Support", link: "user/helpandsupport" },
  // { label: "Help&Support" , link: "user/Demo"},
]);

// const { Header } = Layout;

export default function Noosa() {
  let navigate = useNavigate();
  const [toggle, setToggle] = useState("");
  const location = useLocation();
  const handleClick = (value) => {
    setToggle(value);
  };
  return (
    <div
      className={
        toggle
          ? "sb-nav-fixed bg-light sb-sidenav-toggled"
          : "sb-nav-fixed bg-light"
      }
    >
      <AppHeader handleClick={handleClick} />
      <div id="layoutSidenav">
        <div id="layoutSidenav_nav">
          <nav
            className="sb-sidenav accordion sb-sidenav-dark"
            id="sidenavAccordion"
          >
            <div className="sb-sidenav-menu" id="sb-sidenav-menu">
              <div className="nav mt-4">
                {Tabs.map(({ label, link }) => {
                  // console.log("naga sai fasdkjfaskjfkjasbfkasd");
                  const isActive = location.pathname.split("/")[1] === link;
                  return (
                    <a
                      className={`nav-link ${isActive ? "active" : ""}`}
                      key={link}
                      onClick={() => navigate(`/${link}`)}
                    >
                      {label}
                    </a>
                  );
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
          {/* <div>
                            <Dashboard/>
                        </div> */}
        </div>
      </div>
    </div>
  );
}
