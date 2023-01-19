import React,{useState,useEffect} from "react";
import { Input, Layout, Dropdown, Menu,Popover } from "antd";
import { CaretDownOutlined, BellFilled, DownOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/img/logo.png";
import thumb from "../../assets/img/thumb.png";
import GoogleTranslate from "../../components/atoms/Google";

const { Header } = Layout;
const { Search } = Input;
const onSearch = (value) => console.log(value);

export default function AppHeader(props) {
  const navigate = useNavigate();
  const [navState,setNavState] = useState(false)

  const handleLogout = () => {
    navigate("/");
     localStorage.removeItem('loginDetailsUserId');
  };
    useEffect(() => {
      const loggging = localStorage.getItem('loginDetailsUserId');
        //alert(loggging);
      if (localStorage.getItem('loginDetailsUserId') === null) {
        //console.log('localstorage is empty');
        navigate("/");
      }
    });
    

    const content = (
      <div>
        <a>Claims</a><br/>
        <a>Holidays</a><br/>
        <a>Premium</a><br/>
      </div>
    )


  const menu = (
    <Menu>
      {/* <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="">
          
        </a>
      </Menu.Item>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="">
          My Inbox
        </a>
      </Menu.Item> */}
      <Menu.Item>
        <a
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => navigate("/user/setting")}
        >
          Settings
        </a>
      </Menu.Item>
      <Menu.Item>
        {" "}
        <a
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => {
            handleLogout();
          }}
        >
          Logout
      
        </a>
      </Menu.Item>
    </Menu>
  );
  const handleSideNav = () =>{
    setNavState(!navState)
    props.handleClick(navState)
  }

  return (
    <div className="sb-nav-fixed bg-light">
    <nav className="sb-topnav navbar navbar-expand ">
      <a className="navbar-brand">
        <img className="img-fluid" src={logo} alt="" width="80%" />
      </a>
      <button 
      // id ="sidebarCollapse"
       className="btn btn-link btn-lg order-1 order-lg-0"
       id="sidebarToggle" 
        onClick={()=>{handleSideNav()}}
        
      >
        <i className="fas fa-bars" ></i>
      </button>

      <form className="d-none d-md-inline-block form-inline ml-auto mr-0 mr-md-4 my-2 my-md-0">
        {/* <div className="input-group custome-search">
          <input
            className="form-control"
            type="text"
            placeholder="Search for..."
            aria-label="Search"
            aria-describedby="basic-addon2"
          />
          <div className="input-group-append">
            <button className="btn btn-primary" type="button">
              <i className="fas fa-search"></i>
            </button>
          </div>
        </div> */}
      </form>
      <GoogleTranslate />
      {/* <div id="google_translate_element"></div> */}
      {/* <ul className="navbar-nav ml-auto ml-md-0">
        <li className="nav-item dropdown">
          {/* <Popover title="Notification" placement="leftBottom" content={content}> */}
            {/* <a
              className="ant-dropdown-link"
              onClick={(e) =>navigate("")}
            >
              <BellFilled style={{ paddingLeft: "10px" }} />
              <CaretDownOutlined />
            </a> */}
          {/* </Popover> */}
        {/* </li>
      </ul> */} 

      <ul
        className="navbar-nav ml-auto ml-md-0"
        style={{ paddingLeft: "10px" }}
      >
        <li className="nav-item dropdown">
          <Dropdown overlay={menu}>
            <a
              className="ant-dropdown-link"
              onClick={(e) => e.preventDefault()}
            >
              <img
                src={thumb}
                className="circle"
                width="35px"
                height="35px "
                alt=""
              />
              <CaretDownOutlined />
            </a>
          </Dropdown>
        </li>
      </ul>
    </nav>
    </div>
  );
}
