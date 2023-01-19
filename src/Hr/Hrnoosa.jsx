import React,{useState} from 'react';
// import { Tabs, Layout } from 'antd';
import 'antd/dist/antd.min.css';
import AppHeader from '../user/Header/AppHeader';
import { Outlet, useNavigate,useLocation } from "react-router-dom";
import { Tab } from '@material-ui/core';


// const { TabPane } = Tabs;
const Tabs =Object.freeze([{label:"Dashboard", link:"am/"},
{label:"ListedPolicy", link:"am/listedPolices"},
{label:"Client", link:"am/client"},
// { label: "Client" , link: "am/Demo"},
{label:"Premium", link:"am/paypremium"},
{label:"Claims", link:"am/newClaim"},
{label:"Complaint Managment", link:"am/complaint"},
// { label: "Complaint Managment" , link: "am/Demo"},
{label:"Service Request", link:"am/servicerequest"},
// { label: "Service Request" , link: "am/Demo"},
{label:"Reimbursement", link:"am/reimbursement"},
// { label: "Reimbursement" , link: "am/Demo"},
{label:"Holidays", link:"am/holidays"},
// { label: "Holidays" , link: "am/Demo"},
{label:"Settings", link:"am/setting"},
// { label: "Settings" , link: "am/Demo"},
{label:"Help & Support", link:"am/helpandsupport"}
// { label: "Help & Support" , link: "am/Demo"},
])




// const { Header } = Layout;

export default function Hrnoosa() {
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

            <AppHeader handleClick={handleClick}/>
            <div id="layoutSidenav">
                <div id="layoutSidenav_nav">
                    <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                        <div className="sb-sidenav-menu">
                            <div className="nav mt-4">
                                {Tabs.map(({label,link})=>{
                                    const isActive = location.pathname.split("/")[1] === link;
                                    return(<a className= {`nav-link ${isActive ? 'active' : ''}`} key={link} onClick={()=>navigate(`/${link}`)}>

                                    {label}
                                </a>)
                                })}
                                
                               
                            </div>
                        </div>

                    </nav>
                </div>Complaint
                <div id="layoutSidenav_content">
                    <div className="container-fluid">
                        <Outlet/>
                        </div>
                        </div>
            </div>
        </div>
    );
}
