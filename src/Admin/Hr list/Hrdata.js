import {
 
  Modal,
  Breadcrumb,
  Table,
  Button,
  Input,
  Menu,
  Dropdown,
  message,
} from "antd";
import React, { useEffect, useState } from "react";
import { editAgentList } from "../../services/authentication";

import { CSVLink } from "react-csv";
import {
 
  VerticalAlignBottomOutlined,
  FilterOutlined,
  
  EditOutlined,
  ArrowLeftOutlined,
  
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

// import AccidentList from "../Listed polices/Accidentlist";
// import { getAllUserPolicyList } from "../../services/authentication";
import { Popover } from "@material-ui/core";
import { render } from "@testing-library/react";
import { ModalBody } from "react-bootstrap";
import ModalHeader from "react-bootstrap/esm/ModalHeader";

const { Search } = Input;

const HrData = (props) => {
  let navigate = useNavigate();
  const HrData = props.data;
  console.log("Hrdata",HrData)
  const imageURL = HrData.profileImg ? `http://159.65.145.21:3001/images/${HrData.profileImg}` : ''
  const [tableData, setTableData] = useState(props.tableData);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [permanentAddress, setpermanentAddress] = useState(
    props.data.permanentAddress ? props.data.permanentAddress : ""
  );
  const [firstName, setFirstName] = useState(
    props.data.firstName ? props.data.firstName : ""
  );
  const [lastName, setLastName] = useState(
    props.data.lastName ? props.data.lastName : ""
  );
  const [email, setEmail] = useState(props.data.email ? props.data.email : "");
  const [phone, setPhone] = useState(props.data.phone ? props.data.phone : "");
  const [city, setCity] = useState(props.data.city ? props.data.city : "");
  const [gender, setGender] = useState(
    props.data.gendar ? props.data.gendar : ""
  );
  const [currentAddress, setcurrentAddress] = useState(
    props.data.currentAddress ? props.data.currentAddress : ""
  );
  const [errorMsg, seterrorMsg] = useState("");
  const [image, setImage] = useState(
    props.data.profileImg ? imageURL : ""
  );
  // const[AllHrPolicyListArray,setAllHrPolicyListArray]=useState();
  const [radioButtonValue, setradioButtonValue] = useState(
    HrData.status === true ? "Active" : "InActive"
  );
  let AllHrTabelData = props.AllHrPolicyListArray;
  console.log("AllHrTabelData", props, props.tableData);
  const RadioButtonOnChange = (e) => {
    setradioButtonValue(e.target.value);
  };
  const handleContent = () => (
    <div>
      <p>Send reminder to policy Holder for payment</p>
    </div>
  );
  const handleClearStates = () => {
    setpermanentAddress("");
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhone("");
    setCity("");
    setGender("");
    setcurrentAddress("");
  };

  const handleEditShowModal = () => {
    setIsEditModalVisible(true);
  };
  const handelEditCancel = () => {
    setIsEditModalVisible(false);
  };

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleEditAgentListAPI = async () => {
    if (
      (firstName === "" ||
        lastName === "" ||
        email === "" ||
        phone === "" ||
        gender === "" ||
        currentAddress === "" ||
        permanentAddress === "",
      city === "")
    ) {
      seterrorMsg("Please Enter above fileds");
    } else if (validateEmail(email)) {
      seterrorMsg("");
      const data = {
        id: props.data.id,
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
        gendar: gender,
        currentAddress: currentAddress,
        permanentAddress: permanentAddress,
        city: city,
        profileImg: image,
      };
      try {
        const resp = await editAgentList(data);
        console.log("success");
        handelEditCancel();
        handleClearStates();
        // handleGetAgentListServiceCall()
      } catch (error) {
        console.log("error", error);
        // showAlert('In valide data', "error");
      }
    } else {
      seterrorMsg("Please Enter valid email");
    }
  };

  const handleBack = () => {
    props.handeleBackButton();
  };

  const columns = [

    {
      title: "Policy Number",
      dataIndex: "code",
      key: "code",
      align:"center",
     
      render: (text) => <a style={{ color: "#4cbb17" }}>{text}</a>,
      
    },

    {
      title: "Policy holder",
      dataIndex: "name",
      key: "name",
      align:"center",
      
    },

    {
      title: "Premium plan",
      dataIndex: "type",
      key: "type",
      align:"center",
      
    },
    {
      title: "Amount",
      dataIndex: "Amount",
      key: "Amount",
      align:"center",
      
    },
    {
      title: "staus",
      dataIndex: "status",
      key: "status",
      align:"center",
      render: (PremiumPaid) => (
        <a style={{ color: "#4cbb17" }}>{PremiumPaid}</a>
      ),
      
    },
    {
      title: "claims",
      dataIndex: "count",
      key: "count",
      align:"center",
      
    },
    // {
    //   title: "options",
    //   key: "option",
    //   ellipsis: true,
    //   render: (record) => {
    //     return (
    //       <>
    //         <div>
    //           <Popover placement="bottom" content={handleContent()}>
    //             {" "}
    //             <SmallDashOutlined />
    //           </Popover>
    //         </div>
    //         <EyeOutlined style={{ paddingLeft: "30px" }} />
    //       </>
    //     );
    //   },
    // },
  ];
  const handleFilterData = (filterData) => {
    const tableDataArr = [];
    console.log("filterData", filterData);
    if (filterData.length > 0) {
      filterData.map((data, i) => {
        const value = {
          key: data.id,
          name: data.policy.policyName,
          code: data.policy.policyCode,
          type: data.premiumPlan,
          status: data.premiumStatus,
          count: data.numberOfClaims,
          Amount: data.premiumAmount,
          date: data.createdAt,
        };
        tableDataArr.push(value);
      });
    }
    return tableDataArr;
  };

  const handleClick = (type) => {
    const premiumfilterData =
      props && AllHrTabelData.filter((data) => data.premiumPlan === type);
    const filterData = handleFilterData(premiumfilterData);
    setTableData(filterData);
  };
  const content = (
    <Menu>
      <Menu.Item>
        <a
          target="_blank"
          rel="noopener norefer"
          onClick={() => handleClick("Yearly")}
        >
          Yearly
        </a>
      </Menu.Item>
      <Menu.Item>
        <a
          target="_blank"
          rel="noopener norefer"
          onClick={() => handleClick("Monthly")}
        >
          Monthly
        </a>
      </Menu.Item>
      <Menu.Item>
        <a
          target="_blank"
          rel="noopener norefer"
          onClick={() => handleClick("quarterly")}
        >
          Quarterly
        </a>
      </Menu.Item>
    </Menu>
  );
  const onSearch = (value) => {
    const policyfilterData =
      props &&
      AllHrTabelData.filter((data) => {
        const itemData = data.policy.policyCode.toUpperCase();
        const textData = value.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
    const searchFilter = handleFilterData(policyfilterData);
    setTableData(searchFilter);
  };

  const hrpolicyCSVData = () => {
    let PoliciesData = [];
    const AllHrTabelDataArray = AllHrTabelData && AllHrTabelData;
    if (AllHrTabelDataArray) {
      PoliciesData.push(
        "Policy No,Policy Holder,Policy start Date, Premium Plan, Premium, Premium Status,Claims\n"
      );
      AllHrTabelDataArray.map((excelData) => {
        PoliciesData.push(
          `${excelData.policy.policyCode},${excelData.policy.policyName}, ${excelData.createdAt}, ${excelData.premiumPlan},${excelData.premiumAmount},${excelData.premiumStatus}${excelData.numberOfClaims}\n`
        );
      });
    }
    return PoliciesData.join("");
  };
  const hrpolicyCSV = hrpolicyCSVData();

  const onGenderChange = (e) => {
    setGender(e.target.value);
  };

  // const getBase64 = (img,callback) =>{
  //   const reader = new FileReader();
  //   reader.addEventListener('load',()=>callback(reader.result))
  //   reader.readAsDataURL(img)
  // }
  // const beforeUpload = (file) => {
  //   const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  //   if (!isJpgOrPng) {
  //     message.error("You can only upload JPG/PNG file!");
  //   }
  //   const isLt2M = file.size / 1024 / 1024 < 2;
  //   if (!isLt2M) {
  //     message.error("Image must smaller than 2MB!");
  //   }
  //   return isJpgOrPng && isLt2M;
  // };

  const convert2base64 = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result.toString());
    };
    reader.readAsDataURL(file);
  };

  return (
    <div>
       <Breadcrumb style={{ marginTop: "20px" }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>ManagerList</Breadcrumb.Item>
            <Breadcrumb.Item>Manager Details</Breadcrumb.Item>
          </Breadcrumb>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: "10px",
        }}
      >
        <div>
          <a
            style={{
              marginTop: "50px",
              marginLeft: "10px",
            }}
            onClick={() => handleBack()}
          >
            <ArrowLeftOutlined style={{ paddingTop: "10px" }} /> BACK
          </a>
        </div>
        <div>
          <Button
            style={{
              display: "flex",
              justifyContent: "flexEnd",
              borderRadius: "5px",
              marginRight: "10px",
              marginBottom:"10px",
              backgroundColor: "#8ec131",
              color: "white",
              size: "large",
            }}
            onClick={() => handleEditShowModal()}
          >
            <EditOutlined /> Edit
          </Button>
        </div>
      </div>

      
      <div className="name-box mb-3">
                            <div className="row">
                                <div className="col-12 col-lg-3 col-md-3">
                                    <div className="name-box-img">
                                    {imageURL ? 
                                    <img src={imageURL}/>:
                                    <div style={{height:'250px',width:'150px',display:'flex',justifyContent:'center',alignItems:'center'}}>
                                    <strong style={{alignItems:'center'}}>No </strong>
                                    <strong style={{alignItems:'center'}}>Image</strong>
                                    </div>
                                      }
                                    </div>
                                </div>
                                <div className="col-12 col-lg-3 col-md-3">
                                    <div className="name-box-text">
                                        <small>Manager Name</small>
                                        <span>{HrData.firstName} {HrData.lastName}</span>
                                    </div>
                                    <div className="name-box-text">
                                        <small>Manager Code</small>
                                        <span>{HrData.userName}</span>
                                    </div>
                                    <div className="name-box-text">
                                        <small>Active Status</small>
                                        <span>{HrData.status}</span>
                                    </div>
                                    {/* <div className="name-box-text"
                                      onChange={RadioButtonOnChange}
                                       value={radioButtonValue}>
                                        <small>Status</small>
                                        {/* {HrData.status === "true" ? setradioButtonValue("Active"):setradioButtonValue("false")}
                                        {console.log("rggg",radioButtonValue)} */}
{/*                     
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value={radioButtonValue}/>
                                            <label className="form-check-label" for="inlineRadio1">Active</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value={radioButtonValue}/>
                                            <label className="form-check-label" for="inlineRadio2">Inactive</label>
                                        </div>
                                    </div>  */}
                                </div>
                                <div className="col-12 col-lg-3 col-md-3">
                                    <div className="name-box-text">
                                        <small>Manager Email</small>
                                        <span>{HrData.email}</span>
                                    </div>
                                    <div className="name-box-text">
                                        <small>Manager Phone No.</small>
                                        <span>{HrData.phone}</span>
                                    </div>
                                    <div className="name-box-text">
                                        <small>Manager Location</small>
                                        <span>{HrData.city}</span>
                                    </div>
                                </div>
                                <div className="col-12 col-lg-3 col-md-3" >
                                    <div className="name-box-text">
                                        <small>Manager Adress</small>
                                        <span>{HrData.currentAddress}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
{/* 
      <div
        className="container-fluid"
        style={{
          padding: "10px",
          backgroundColor: "#eeeeee",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
          marginTop: "30px",
        }}
      >
        {image && <img src={image} />}
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            display: "flex",
            flexDirection: "row",
            fontFamily: "sans-serif",
            fontSize: "18px",
          }}
        >
          <div className="container-fluid" style={{ marginLeft: "50px" }}>
            <label>Agent:</label>
            <h6>
              {HrData.firstName} {HrData.lastName}
            </h6>{" "}
            <br></br>
            <label>Agent Code:</label>
            <br />
            <h6>need code</h6> <br></br>
            <label>Status:</label>
            <br />
            <Radio.Group
              name="radiogroup"
              defaultValue={"Active"}
              onChange={RadioButtonOnChange}
              value={radioButtonValue}
            >
              <Radio value={"Active"}>Active</Radio>
              <Radio value={"Inactive"}>Inactive</Radio>
            </Radio.Group>
          </div>

          <div style={{ marginLeft: "100px" }}>
            <label>Agent Email:</label>
            <h6>{HrData.email}</h6> <br></br>
            <label>Agent Phone No:</label>
            <br />
            <h6>{HrData.phone}</h6> <br></br>
            <label>Agent Location:</label>
            <br />
            <h6>{HrData.city}</h6>
          </div>
          <div style={{ marginLeft: "100px" }}>
            <label>Agent Adress:</label>
            <h6>{HrData.currentAddress}</h6>
          </div>
        </div>
      </div> */}

      <div className="row" style={{ marginTop: "30px" }}>
        <div className="col-12 col-md-6 col-sm-6 col-lg-4 mb-2">
          <div className="card card-custom">
            <div className="row">
              <div className="col-6 col-md-6 col-sm-6 text-left">
                <p className="pl-4 pt-4">
                  No Of
                  <br />
                  Clients{" "}
                </p>
              </div>
              <div className="col-6 col-md-6 col-sm-6 text-right">
                <h3 className="pr-4 pt-4">{HrData.totalClient}</h3>
              </div>
            </div>
            <div style={{ backgroundColor: "#8ec131" }}>
              <hr />
              <div className="row">
                <div className="col-9 col-md-9 col-sm-9 text-left">
                  <p className="pl-4 pt-0 pb-3 d-block">View</p>
                </div>
                <div className="col-3 col-md-3 col-sm-3 text-right">
                  <a href="" className="pr-4 pt-0 pb-3 d-block">
                    <i className="fas fa-arrow-right"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-6 col-sm-6 col-lg-4 mb-2">
          <div className="card card-custom">
            <div className="row">
              <div className="col-6 col-md-6 col-sm-6 text-left">
                <p className="pl-4 pt-4">
                  Complaints
                  <br />
                  Resolved{" "}
                </p>
              </div>
              <div className="col-6 col-md-6 col-sm-6 text-right">
                <h3 className="pr-4 pt-4">{HrData.totalResolvedComplaint}</h3>
              </div>
            </div>
            <div style={{ backgroundColor: "#8ec131" }}>
              <hr />
              <div className="row">
                <div className="col-9 col-md-9 col-sm-9 text-left">
                  <p className="pl-4 pt-0 pb-3 d-block">View</p>
                </div>
                <div className="col-3 col-md-3 col-sm-3 text-right">
                  <a href="" className="pr-4 pt-0 pb-3 d-block">
                    <i className="fas fa-arrow-right"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-6 col-sm-6 col-lg-4 mb-2">
          <div className="card card-custom">
            <div className="row">
              <div className="col-6 col-md-6 col-sm-6 text-left">
                <p className="pl-4 pt-4">
                  Complaints
                  <br />
                  Assigned{" "}
                </p>
              </div>
              <div className="col-6 col-md-6 col-sm-6 text-right">
                <h3 className="pr-4 pt-4">{HrData.totalComplaint}</h3>
              </div>
            </div>
            <div style={{ backgroundColor: "#FFACAC" }}>
              <hr />
              <div className="row">
                <div className="col-9 col-md-9 col-sm-9 text-left">
                  <p className="pl-4 pt-0 pb-3 d-block">View</p>
                </div>
                <div className="col-3 col-md-3 col-sm-3 text-right">
                  <a href="" className="pr-4 pt-0 pb-3 d-block">
                    <i className="fas fa-arrow-right"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid">
        <div
          className="row"
          style={{
            marginTop: "20px",
            marginBottom: "25px",
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",
          }}
        >
          <div className="col-12 col-sm-3 col-md-3">
              <h3>Client List</h3>
            </div>
            <div className="nav justify-content-center">
          <div
            className="col-12 col-sm-5 col-md-5"
            style={{ display: "flex", flexDirection: "row" }}
          >
            <Search placeholder="search PolicyNumber" onSearch={onSearch}
             style={{
              width: 300,
              borderRadius: "25px",
              marginRight: "10px",
            }} />
            </div>
            <div className="col-12 col-sm-3 col-md-3"
             style={{ display: "flex", flexDirection: "row" }}>
              <Dropdown placement="bottomCenter" overlay={content} arrow>
                <Button
                  style={{
                    borderRadius: "5px",
                    marginRight: "10px",
                    backgroundColor: "#8ec131",
                    color: "white",
                  }}
                >
                  <FilterOutlined /> Add Filters
                </Button>
              </Dropdown>
            </div>
            <div className="col-12 col-sm-3 col-md-3"
             style={{ display: "flex", flexDirection: "row" }}>
              <Button
                style={{
                  borderRadius: "5px",
                  backgroundColor: "#000086",
                  color: "white",
                }}
              >
                <CSVLink data={hrpolicyCSV} target="_blank">
                  Download PDF/CSV
                  <VerticalAlignBottomOutlined />
                </CSVLink>
              </Button>
            </div>
          </div>
        </div>
        </div>
        <div className="container-fluid">
            <div className=" DataTable" style={{justifyContent:"center"}}>
            <Table
              columns={columns}
              dataSource={tableData}
              //onChange={this.handleChange}
              pagination={true}
              total={10}
            />
            <div>
              <span>shown Results {tableData && tableData.length}</span>
            </div>
          </div>
        </div>
      

      <Modal
        visible={isEditModalVisible}
        onOk={handleEditAgentListAPI}
        onCancel={handelEditCancel}
         width={380}
      >
        <ModalHeader style={{justifyContent:"center",
    fontSize:"22px", fontWeight:"bolder", color:"#000089"}}>Edit Manager</ModalHeader>
        <ModalBody>
        <form className="col-12">
          <div className="form-group mb-4">
            <input
              type="text"
              className="col-xs-12 w-100"
              
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          
          <div className="form-group mb-4">
            <input
              type="text"
              className="col-xs-12 w-100"
              
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          
          <div className="form-group mb-4">
            <input
             
              className="col-xs-12 w-100"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        

          <div className="form-group mb-4">
            <input
              
              className="col-xs-12 w-100"
              type="number"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          

          <div className="form-group mb-4">
            <input
              type="text"
              className="col-xs-12 w-100"
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
         

          <div className="form-group mb-4">
            <select
              type="text"
              className="col-xs-12 w-100"
              placeholder="select the Gender"
              onChange={onGenderChange}
            >
              <option value="male">male</option>
              <option value="female">female</option>
              <option value="other">other</option>
            </select>
          </div>
         
          <div className="form-group mb-4">
            <textarea
              type="text"
              className="col-xs-12 w-100"
             
              placeholder="Current Adress"
              value={currentAddress}
              onChange={(e) => setcurrentAddress(e.target.value)}
            />
          </div>
         
          <div className="form-group mb-4">
            <textarea
              type="text"
              className="col-xs-12 w-100"
              style={{}}
              
              placeholder="permanent Address"
              value={permanentAddress}
              onChange={(e) => setpermanentAddress(e.target.value)}
            />
          </div>
          {/* {image ? (
            
          ) : ( */}
        <img src={image}/> 
            <div>
              <input
                id="fileupload"
                type="file"
                onChange={(e) => convert2base64(e)}
              />
              <label htmlFor="fileupload">Upload File</label>
            </div>
          {/* )} */}
        

        <p style={{ color: "red", marginLeft: "45px" }}>{errorMsg}</p>
        </form>
        </ModalBody>
      </Modal>
    </div>
  );
};
export default HrData;
