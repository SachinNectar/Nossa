import React, { useState, useEffect } from "react";
import { getAddClient, getPolicyList } from "../../services/authentication";
import { Breadcrumb } from "antd";
const NewClient = (props) => {
  const [data, setData] = useState({
    policyHolder: "",
    policyType: "",
    category: "",
    firstName: "",
    lastName: "",
    phone: "",
    age: "",
    dob: "",
    gender: "",
    email: "",
    adress: "",
    permanant: "",
    policyStartDate: "",
    policyEndDate: "",
    plan:'',
    Amount:''
  });
  const [errorMsg, seterrorMsg] = useState("");
  const [policyName, setPolicyName] = useState("");
  const [TableData, setTableData] = useState("");
  const [policyListArray, setPolicyListArray] = useState("");

  const {
    
    policyType,
    category,
    firstName,
    lastName,
    phone,
    age,
    dob,
    gender,
    email,
    adress,
    permanant,
    policyStartDate,
    policyEndDate,
    plan,
    Amount
  } = data;

  const Payload ={
    search:'',
    type:'',
    id:''
  }

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    console.log("policyListArray",policyListArray)
    const policyNum =
    policyListArray &&
    policyListArray.filter(
      (list) => list.policyName === data.policyType
    )[0];
    console.log("list",data)
    const Payload = {
      policy_id:policyNum.id,
      email: email,
      policyType: policyType,
      gendar: gender,
      firstName: firstName,
      lastName: lastName,
      phone: phone,
      currentAddress: adress,
      permanentAddress: permanant,
      policyMaturityDate: policyEndDate,
      policyStartDate: policyStartDate,
      premiumPlan:plan,
      premiumAmount:Amount
    };

    if (
      firstName === "" ||
      lastName === "" ||
      policyType === "" ||
      category === "" ||
      phone === "" ||
      age === "" ||
      gender === "" ||
      email === "" ||
      adress === "" ||
      plan === "" ||
      Amount === "" ||
      permanant === ""
    ) {
      seterrorMsg("Please Fill all fileds.");
    } else if (
      dob === undefined ||
      policyStartDate === undefined ||
      policyEndDate === undefined
    ) {
      seterrorMsg("Please Fill correct date.");
    } else {
      try {
        const resp = await getAddClient(Payload);
        console.log("record added successfuly");
        alert("Record Added Successfully");
        seterrorMsg("");
        alert("User Added Sucessfully")
        props.handleNewClientBack();
      } catch (error) {
        console.log("policyName",policyName)
        console.log("error", error);
        alert("Something Went Wrong");
        // showAlert('In valide data', "error");
      }
    }
  };

  //Get AllPolicyList Api

  const handleGetPolicyListServiceCall = async () => {
    const data = {
      search: "",
      type: "",
      id: "",
      activeStatus:''
    };
    try {
      let tableDataArr = [];
      const resp = await getPolicyList(data);
      console.log("resssss", resp);
      setPolicyListArray(resp.data);
      resp &&
        resp.data.map((data, i) => {
          const obj = {
            policyName: data.policyName,
          };
          tableDataArr.push(obj);
          console.log("data", tableDataArr);
        });
      setPolicyName(tableDataArr);
    } catch (error) {
      console.log("err", error);
    }
  };
  useEffect(() => {
    handleGetPolicyListServiceCall(data);
  }, []);


  //API ended

  return (
    <div>
       <Breadcrumb style={{ marginTop: "20px" }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>Client</Breadcrumb.Item>
            <Breadcrumb.Item>New Client</Breadcrumb.Item>
          </Breadcrumb>
      <div className="row d-flex align-items-center justify-content-between" style={{paddingTop:"10px"}}>
        <div className="col-12 text-left">
          <h3 className="mt-0 mb-4">
            <a  className="text-black" onClick={props.handleNewClientBack}>
              <i className="fas fa-long-arrow-alt-left"></i>
            </a>{" "}
            Add New Client
          </h3>
        </div>
      </div>

      {/* <div className="row d-flex align-items-center justify-content-between">
        <div className="col-12">
          <div className="heading-with-box m-0">
            <div className="row">
              <div className="col-lg-12 text-left">
                <span className="h1-new">Request Statement</span>
                <br />
                529698664235
              </div>
            </div>
          </div>
        </div>
      </div> */}

      <div className="detail-box">
        <div className="card-body form-custom">
          <div className="row">
            <div className="col-12 col-sm-6 col-md-6 col-lg-4">
              <div className="form-group">
                <label htmlFor="exampleInputtext" className="mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id=""
                  name="firstName"
                  value={firstName}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-12 col-sm-6 col-md-6 col-lg-4">
              <div className="form-group">
                <label htmlFor="exampleInputtext" className="mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id=""
                  name="lastName"
                  value={lastName}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-12 col-sm-6 col-md-6 col-lg-4">
              <div className="form-group">
                <label htmlFor="exampleInputtext" className="mb-1">
                  Policy Type
                </label>
                <select
                  className="form-control"
                  id="exampleFormControlSelect1"
                  name="policyType"
                  value={policyType}
                  onChange={handleChange}
                >
                  {console.log(policyName,"ooo")}
                  <option>select the policyType</option>
                  {policyName &&
                    policyName.map((data) => (
                      
                      <option value={data.policyName}>{data.policyName}</option>
                      
                    ))}

                </select>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-md-6 col-lg-4">
              <div className="form-group">
                <label htmlFor="exampleInputtext" className="mb-1">
                  Policy Category
                </label>
                <select
                  className="form-control"
                  id="exampleFormControlSelect1"
                  name="category"
                  value={category}
                  onChange={handleChange}
                >
                  <option>General</option>
                  <option>Health</option>
                  <option>General && Health</option>
                  <option>Vehicle</option>
                </select>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-md-6 col-lg-4">
              <div className="form-group">
                <label htmlFor="exampleInputtext" className="mb-1">
                  phone
                </label>
                <input
                  type="number"
                  className="form-control"
                  id=""
                  name="phone"
                  value={phone}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-12 col-sm-6 col-md-6 col-lg-4">
              <div className="form-group">
                <label htmlFor="exampleInputtext" className="mb-1">
                  Policy Holder's Age
                </label>
                <input
                  type="number"
                  className="form-control"
                  id=""
                  name="age"
                  value={age}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-12 col-sm-6 col-md-6 col-lg-4">
              <div className="form-group">
                <label htmlFor="exampleInputtext">Date of Birth</label>
                <input
                  className="form-control"
                  type="date"
                  value={dob}
                  name="dob"
                  id="example-input"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-12 col-sm-6 col-md-6 col-lg-4">
              <div className="form-group">
                <label htmlFor="exampleInputtext" className="mb-1">
                  Gender
                </label>
                <select
                  className="form-control"
                  id="exampleFormControlSelect1"
                  value={gender}
                  name="gender"
                  onChange={handleChange}
                >
                  <option>Select the Gender</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-md-6 col-lg-4">
              <div className="form-group">
                <label htmlFor="exampleInputtext" className="mb-1">
                  Email Address
                </label>
                <input
                  className="form-control"
                  type="email"
                  id=""
                  name="email"
                  value={email}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-12 col-sm-6 col-md-6 col-lg-4">
              <div className="form-group">
                <label htmlFor="exampleInputtext" className="mb-1">
                  Premium Plan
                </label>
                <select
                  className="form-control"
                  id="exampleFormControlSelect1"
                  value={plan}
                  name="plan"
                  onChange={handleChange}
                >
                  <option>select Option</option>
                  <option>Monthly</option>
                  <option>Quarterly</option>
                  <option>Yearly</option>
                </select>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-md-6 col-lg-4">
              <div className="form-group">
                <label htmlFor="exampleInputtext" className="mb-1">
                  Premium Amount
                </label>
                <input
                  type="number"
                  className="form-control"
                  id=""
                  name="Amount"
                  value={Amount}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-12 col-sm-6 col-md-6 col-lg-4">
              <div className="form-group">
                <label htmlFor="exampleInputtext" className="mb-1">
                  Current Address
                </label>
                <textarea
                  type="text"
                  className="form-control"
                  id=""
                  name="adress"
                  value={adress}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-12 col-sm-6 col-md-6 col-lg-4">
              <div className="form-group">
                <label htmlFor="exampleInputtext" className="mb-1">
                  Permanent Address
                </label>
                <textarea
                  type="text"
                  className="form-control"
                  id=""
                  name="permanant"
                  value={permanant}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-12 col-sm-6 col-md-6 col-lg-4">
              <div className="form-group">
                <label htmlFor="exampleInputtext">Policy Start Date</label>
                <input
                  className="form-control"
                  type="date"
                  value={policyStartDate}
                  name="policyStartDate"
                  id="example-input"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-12 col-sm-6 col-md-6 col-lg-4">
              <div className="form-group">
                <label htmlFor="exampleInputtext">Policy End Date</label>
                <input
                  className="form-control"
                  type="date"
                  value={policyEndDate}
                  name="policyEndDate"
                  id="example-input"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="col-12 col-sm-6 col-md-6 col-lg-4">
              <button
                className="btn btn-primary w-100 mt-4 ml-0"
                name="submit"
                type="submit"
                data-toggle="modal"
                data-target="#exampleModalCenter"
                onClick={handleSubmit}
              >
                submit
              </button>
            </div>
            <label style={{ color: "red", justifyContent: "center" }}>
              {errorMsg}
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};
export default NewClient;
