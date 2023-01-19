import React, { useState, useEffect } from "react";
import { getAllClientList } from "../../services/authentication";
import NewClient from "./NewClient";
import ClientDetails from "./ClientDetails";
import { CSVLink } from "react-csv";
import { Breadcrumb } from "antd";
import moment from "moment";

const Client = () => {
  const [ClientListArray, setClientListArray] = useState("");
  const [TableData, setTableData] = useState("");
  const [ClientPage, setClientPage] = useState(true);
  const [NewClientPage, setNewClientPage] = useState(false);
  const [ClientDetalsPage, setClientDetalsPage] = useState(false);
  const [SelectedRecord, setSelectedRecord] = useState("");
  const [policyTypeSearch, setpolicyTypeSearch] = useState("");
  const loginDetailsUserId = window.localStorage.getItem("loginDetailsUserId");
  console.log("lgu", loginDetailsUserId);

  const handleClientList = async () => {
    try {
      let tableDataArr = [];
      const data = {
        agent_id: loginDetailsUserId,
      };
      const resp = await getAllClientList(data);
      setClientListArray(resp && resp.data);
      console.log("cld", resp);
      resp &&
        resp.data.map((data, i) => {
          const value = {
            policyNo: data.policy.policyCode,
            policyHolder:`${data.user.firstName} ${data.user.lastName}`,
            Category: data.policy.policyType,
            policyType: data.policy.policyName,
            startDate: moment(data.policyStartDate).format("YYYY-MM-DD"),
            endDate: moment(data.policyMaturityDate).format("YYYY-MM-DD"),
            id: data.id,
          };
          tableDataArr.push(value);
          console.log("tdr", tableDataArr);
        });
      setTableData(tableDataArr);
    } catch (error) {
      console.log("error", error);
      // showAlert('In valide data', "error");
    }
  };

  useEffect(() => {
    handleClientList();
  }, []);

  const handleNewClientBack = () => {
    setNewClientPage(false);
    setClientPage(true);
  };
  const handleNewClient = () => {
    setNewClientPage(true);
    setClientPage(false);
  };

  const handleChange = (item) => {
    setClientDetalsPage(true);
    setClientPage(false);
    setSelectedRecord(item);
  };

  const handleBackPage = () => {
    setClientDetalsPage(false);
    setClientPage(true);
  };
  //Filter
  //Filter
  const handleFilterData = (filterData) => {
    const tableDataArr = [];
    console.log("filterData", filterData);
    if (filterData.length > 0) {
      filterData.map((data, i) => {
        const value = {
          policyNo: data.policy.policyCode,
          policyHolder: data.user.firstName,
          Category: data.policy.policyType,
          policyType: data.policy.policyName,
          startDate: data.policyStartDate,
          endDate: data.policyMaturityDate,
        };
        tableDataArr.push(value);
      });
    }
    return tableDataArr;
  };
  const handleClick = (policyType) => {
    console.log("CLA", ClientListArray);
    const ClientfilterData = ClientListArray.filter(
      (data) => data.policy.policyType === policyType
    );
    const filterData = handleFilterData(ClientfilterData);
    setTableData(filterData);
  };
  const onSearch = () => {
    const ClientfilterData = ClientListArray.filter((data) => {
      console.log("filter", ClientListArray);
      const itemData =  data.policy.policyName.toUpperCase();
      const textData = policyTypeSearch && policyTypeSearch.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    const searchFilter = handleFilterData(ClientfilterData);
    setTableData(searchFilter);
  };

  const handlesearch = (e) => {
    setpolicyTypeSearch(e.target.value);
  };

  //csv Link
  //CSV Download

  const ClientCSVdata = () => {
    let ClientData = [];
    console.log("hla", ClientListArray);
    const ClientListArrayData = ClientListArray && ClientListArray;
    if (ClientListArrayData) {
      ClientData.push(
        "Policy No,Policy Holder,Policy Type,Start Date,End Date\n"
      );
      ClientListArrayData.map((excelData) => {
        console.log("excel", excelData);
        ClientData.push(
          `${excelData.policy.policyCode},${excelData.user.firstName}, ${excelData.policy.policyName}, ${excelData.policyStartDate},${excelData.policyMaturityDate}\n`
        );
      });
    }

    return ClientData.join("");
  };
  const ClientCSV = ClientCSVdata();

  return (
    <>
      {ClientPage && (
        <div>
            <Breadcrumb style={{ marginTop: "20px" }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>Client</Breadcrumb.Item>
          </Breadcrumb>
          <div className="row d-flex align-items-center justify-content-between" style={{paddingTop:"10px"}}>
            <div className="col-12 col-lg-3 col-md-3 text-left">
              <h3 className="mt-0 mb-4">Clients</h3>
            </div>
            <div className="nav justify-content-center">
              <div className="col-12 col-lg-3 col-md-3 col-sm-4">
              <div className="search-btn">
                <div className="input-group my-3" style={{ width:"100%", height:"35px"}}>
                  <input
                    value={policyTypeSearch}
                    onChange={handlesearch}
                    type="text"
                    className="form-control"
                    placeholder="Search Policy Name"
                  />
                  <div className="input-group-append">
                    <button
                      className="btn btn-secondary"
                      type="button"
                      onClick={() => onSearch()}
                    >
                      <i className="fa fa-search"></i>
                    </button>
                  </div>
                </div>
              </div>
              </div>
              <div className="col-12 col-lg-3 col-md-3 col-sm-4">
                <a
                  onClick={() => handleNewClient()}
                  className="print-card-btn green-btn float-left my-3 mx-1" style={{ width:"160px", height:"38px"}}
                >
                  <button className="fas fa-plus-circle"></button> Add New
                  Client
                </a>
              </div>
              <div className="col-12 col-lg-3 col-md-3 col-sm-4">
              <button
                  type="button"
                  className="btn btn-success btn-sm my-3"
                  data-toggle="dropdown"
                  style={{ width: "160px", height:"35px"}}
                >
                  <i className="fas fa-filter"></i> Add Filters
                </button>
                <ul
                  className="dropdown-menu"
                  role="menu"
                  // onClick={HandleClick}
                >
                  <li>
                    <a
                      onClick={() => {
                        handleClick("General");
                      }}
                    >
                      General{" "}
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={() => {
                        handleClick("Health");
                      }}
                    >
                      Health
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={() => {
                        handleClick("General && Health");
                      }}
                    >
                      General&&Health
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={() => {
                        handleClick("vehicle");
                      }}
                    >
                      vehicle
                    </a>
                  </li>
                </ul>
              </div>
              
              <div className="col-12 col-lg-3 col-md-3 col-sm-4">
              <button style={{width:"160px", height:"35px"}} type="button" className="btn btn-primary btn-sm my-3">
                <CSVLink data={ClientCSV} target="_blank" style={{color:"white"}}>
                  Download PDF/CSV
                </CSVLink>
              </button>
              </div>
            </div>
          </div>

          <div className="row d-flex align-items-center justify-content-between">
            <div className="col-12 table-custome mt-3">
              <div className="table-responsive">
                <table className="table">
                  <thead className="green-bg">
                    <tr>
                      <th>Policy No.</th>
                      <th>Policy Holder</th>
                      <th>Policy Type</th>
                      <th>Category</th>
                      <th>Start Date</th>
                      <th>End Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {TableData &&
                      TableData.map((item) => (
                        <tr>
                          <td>
                            {" "}
                            {console.log("item in table data in client", item)}
                            <a onClick={() => handleChange(item)}>
                              {item.policyNo}
                            </a>
                          </td>
                          <td>{item.policyHolder}</td>
                          <td>{item.policyType}</td>
                          <td>{item.Category}</td>
                          {/* <td>{item.id}</td> */}
                          <td>{item.startDate}</td>
                          <td>{item.endDate}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              <div className="row">
                <div className="col-md-6 col-sm-6 col-12">
                  <small>Showing Results {TableData.length}</small>
                </div>
               
              </div>
            </div>
          </div>
        </div>
      )}
      {ClientDetalsPage && (
        <ClientDetails
          selectedRecord={SelectedRecord}
          data={ClientListArray}
          handleBackPage={handleBackPage}
        />
      )}
      {NewClientPage && <NewClient handleNewClientBack={handleNewClientBack} />}
    </>
  );
};
export default Client;
