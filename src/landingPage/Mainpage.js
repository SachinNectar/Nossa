import React from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
//import Header from "../components/atoms/Header"
//import Sidenav from "../components/atoms/contracts/Sidenav";
 import { useSelector}  from "react-redux";
 import { deleteCookie } from "../utils/cookie"
 import { AUTH_TOKEN } from "../utils/cookie";
 //import Table from "../components/atoms/table"
 import LineGraph from "../components/atoms/LineGraph"
 

const Mainpage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  //   const userDetails = useSelector((state) => state.forms.userDetails);

  const link = [
    { title: "Dashboard", iconClass: "fas fa-tachometer-alt", path: "" },
    { title: "Pay Premium", iconClass: "fa fa-users", path: "contracts" },
    { title: "Claims", iconClass: "fa fa-user-plus", path: "bids" },
    { title: "Complaint", iconClass: "fa fa-indent", path: "freelancer", },   
    {title: "Nossa Crad", iconClass: "fa fa-universal-access",path: "transactions",},
    { title: "Service Request", iconClass: "fa fa-bullhorn", path: "profile" },
    { title: "Reimbursment", iconClass: "fa fa-cog", path: "setting" },
    {title: "Holiday's", iconClass: "fa fa-cog", path: "setting" },
    {title: "Help & Support",iconClass: "fa fa-cog",path: "hep-support",}
      
  ];  

  return (
        <><body class="sb-nav-fixed" style={{margin:"0",height:"100%",overFlow:"hidden" , scroll:"no"}}>
      <nav class="sb-topnav navbar navbar-expand " style={{backgroundColor:'#81B622'}}>
        <a class="navbar-brand admin-logo" href="index.php">
          <br></br>
          <h2>Nossa</h2><h3 style={{ fontFamily: 'monospace', marginBottom: '25px' }}> Serguos</h3>
        </a>
       
        
     
        
        <form class="d-none d-md-inline-block form-inline ml-auto mr-0 mr-md-3 my-2 my-md-0">
          <div class="input-group mr-3">
            <div class="input-group-append">
              <button
                class="btn btn-transparent text-white  border-right-0"
                type="button"
                style={{
                  borderColor: "#CFCFCF",
                  borderRadius: "5px 0px 0px 5px",
                }}
              >
                <i class="fas fa-search" style={{ color: "#CFCFCF" }}></i>
              </button>
            </div>
            <input
              class="form-control bg-transparent border-left-0"
              type="text"
              placeholder="Search"
              aria-label="Search"
              aria-describedby="basic-addon2"
              style={{ borderColor: "#CFCFCF", color: "#CFCFCF" }} />
          </div>
        </form>

        <ul class="navbar-nav ml-auto ml-md-0">
          <li class="nav-item dropdown mr-3">
            <a
              class="nav-link "
              id="userDropdown"
              href="#"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i class="fa fa-bell text-primary"></i>
            </a>
            <span class="nav-indicator">2</span>
            <div
              class="dropdown-menu dropdown-menu-right"
              aria-labelledby="userDropdown"
            >
              <a class="dropdown-item small" href="#">
                Jhon submited new request for visit
              </a>
              <a class="dropdown-item small" href="#">
                MacMohn on leave today
              </a>
            </div>
          </li>
        </ul>

        {/* <!-- Navbar--> */}
        <ul class="navbar-nav ml-auto ml-md-0">
          <li class="nav-item dropdown">
            <a
              class="nav-link"
              id="userDropdown"
              href="#"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <small class="text-primary">
                Hello,
                {/* {userDetails.firstName}{" "} */}
              </small>
              <img
                src="/assets/images/profile.png"
                class="rounded-circle ml-1"
                width="35px"
                height="35px "
                alt="" />
              <i class="fas fa-angle-down text-primary"></i>
            </a>
            <div
              class="dropdown-menu dropdown-menu-right"
              aria-labelledby="userDropdown"
            >
              <a class="dropdown-item small" href="#">
                Inbox
              </a>
              <a class="dropdown-item small" href="#">
                Settings
              </a>
              <div class="dropdown-divider"></div>
              <a
                onClick={() => {
                  //   deleteCookie(AUTH_TOKEN);
                  navigate("/auth/login");
                } }
                class="dropdown-item small log-tab"
              >
                Logout
              </a>
            </div>
          </li>
        </ul>
      </nav>
  
    {/* <div style={{marginTop:"100px",marginLeft:"500px"}}> <Table/></div> */}
    
      

      <div id="layoutSidenav">
        <div id="layoutSidenav_nav">
          <nav
            class="sb-sidenav accordion sb-sidenav-dark"
            id="sidenavAccordion"
          >
            <div class="sb-sidenav-menu">
              <div class="nav">
                {link.map(({ title, path, iconClass }) => {
                  const isActive = location.pathname.split("/")[2] === path;
                  return (
                    <a
                      class={`nav-link ${isActive ? "active" : ""}`}
                      onClick={() => navigate(`/client/${path}`)}
                      key={title}
                    >
                      <div class="sb-nav-link-icon">
                        <i class={iconClass}></i>
                      </div>
                      {title}
                    </a>
                  );
                })}
              </div>
            </div>
          </nav>
        </div>
      </div>
      <div style={bodyStyle}>
        <Outlet />
       
      </div>

    </body><div>
         
      </div></>
   );
};

const bodyStyle = {
  width: "calc(100vw - 225px)",
  height: "calc(100vh - 70px)",
  marginLeft: "225px",
  marginTop: "80px",
  

 
};

export default Mainpage;
