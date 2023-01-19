import React, { useState, useEffect } from "react";
import ClinicData from "../../../user/Reimbursment/ClinicData";
import AdClinicData from "../../../Admin/Reimbursment/AdClinicDetails";
import {
  getReimbursmentList,
  getReimbursmentListSearch,
} from "../../../services/authentication";
import { CSVLink } from "react-csv";
import { Breadcrumb } from "antd";
import ReactPaginate from "react-paginate";

const HrReimbursment = () => {
  const [ReimbursmentPage, setReimbursmentPage] = useState(true);
  const [ClinicDataPage, setClinicDataPage] = useState("");
  const [step, setStep] = useState(0);
  const [searchValue, setSearchValue] = useState("");

  const [ClinicalData, setClinicalData] = useState("");
  const [PharmacyData, setPharmacyData] = useState("");
  const [ClinicTableData, setClinicTableData] = useState("");
  const [PharmacyTableData, setPharmacyTableData] = useState("");
  const [selectedrecord, setSelectedrecord] = useState("");

  //Get Api Start

  const handleClinicTab = async () => {
    try {
      let tableDataArr = [];
      const data = {
        type: "clinical",
      };
      const resp = await getReimbursmentList(data);
      setClinicalData(resp && resp.data);
      //console.log("clinical", resp);
      resp &&
        resp.data.map((data, i) => {
          const value = {
            SrNo: i,
            RefNo: data.referenceNumber,
            ClinicName: data.name,
            Adress: data.address,
            Area: data.area,
            Contact: data.contact,
            HospitalType: data.hospitalType,
          };
          tableDataArr.push(value);
        });
      setClinicTableData(tableDataArr);
    } catch (error) {
      console.log("error", error);
      // showAlert('In valide data', "error");
    }
  };

  useEffect(() => {
    handleClinicTab();
  }, []);

  const handlePharmacyTab = async () => {
    try {
      let tableDataArr = [];
      const data = {
        type: "pharmacy",
      };
      const resp = await getReimbursmentList(data);
      //console.log("pharm", resp);
      setPharmacyData(resp && resp.data);
      //console.log("pc", resp);
      resp &&
        resp.data.map((data, i) => {
          const value = {
            SrNo: i,
            RefNo: data.referenceNumber,
            pharmacyName: data.name,
            Adress: data.address,
            Area: data.area,
            Contact: data.contact,
            servicesOffered: data.serviceOffered,
          };
          tableDataArr.push(value);
        });
      setPharmacyTableData(tableDataArr);
    } catch (error) {
      console.log("error", error);
      // showAlert('In valide data', "error");
    }
  };
  useEffect(() => {
    handlePharmacyTab();
  }, []);

  const handleChange = (item) => {
    setReimbursmentPage(false);
    setClinicDataPage(true);
    setSelectedrecord(item);
  };

  const handleBack = () => {
    setReimbursmentPage(true);
    setClinicDataPage(false);
  };

  //search
  const handleOnSearch = async () => {
    // console.log("ClinicalDta",ClinicalData)

    if (step === 0) {
      try {
        let tableDataArr = [];
        const data = {
          type: "clinical",
          name: searchValue,
        };
        const resp = await getReimbursmentListSearch(data);
        //console.log("clinical", resp);
        resp &&
          resp.data.map((data, i) => {
            const value = {
              SrNo: data.i,
              referenceNumber: data.referenceNumber,
              name: data.name,
              address: data.address,
              area: data.area,
              contact: data.contact,
              hospitalType: data.hospitalType,
            };
            tableDataArr.push(value);
          });
        setClinicTableData(tableDataArr);
        setClinicalData(tableDataArr);
      } catch (error) {
        console.log("error", error);
        // showAlert('In valide data', "error");
      }
    } else {
      try {
        let tableDataArr = [];
        const data = {
          type: "pharmacy",
          name: searchValue,
        };
        const resp = await getReimbursmentListSearch(data);
        resp &&
          resp.data.map((data, i) => {
            const value = {
              SrNo: i + 1,
              referenceNumber: data.referenceNumber,
              name: data.name,
              address: data.address,
              area: data.area,
              contact: data.contact,
              serviceOffered: data.serviceOffered,
            }; //console.log("pharm", value);

            tableDataArr.push(value);
          });
        setPharmacyTableData(tableDataArr);
        setPharmacyData(tableDataArr);
      } catch (error) {
        console.log("error", error);
        // showAlert('In valide data', "error");
      }
    }
  };

  const handleFilterData = (filterData) => {
    const tableDataArr = [];
    if (filterData.length > 0) {
      if (step === 0) {
        filterData.map((data, i) => {
          const value = {
            SrNo: i,
            referenceNumber: data.referenceNumber,
            name: data.name,
            address: data.adress,
            area: data.area,
            contact: data.contact,
            hospitalType: data.hospitalType,
          };
          tableDataArr.push(value);

          //console.log("tableDataArr", tableDataArr);
        });
      } else {
        filterData.map((data, i) => {
          const value = {
            SrNo: data,
            referenceNumber: data.referenceNumber,
            name: data.name,
            address: data.adress,
            area: data.area,
            contact: data.contact,
            serviceOffered: data.serviceOffered,
          };
          tableDataArr.push(value);
          //console.log("tableDataArr", tableDataArr);
        });
      }
    }

    return tableDataArr;
  };

  const handleclick = (type) => {
    if (step === 0) {
      const ClinicalfilterData =
        ClinicalData &&
        ClinicalData.filter((data) => data.hospitalType === type);
      const Clinic = handleFilterData(ClinicalfilterData);
      //console.log("ClinicalfilterData", ClinicalfilterData, Clinic);
      setClinicTableData(Clinic);
      setClinicalData(Clinic);
    } else {
      const PharmacyfilterData =
        PharmacyData &&
        PharmacyData.filter((data) => data.hospitalType === type);
      const Pharmacy = handleFilterData(PharmacyfilterData);
      //console.log("PharmacyfilterData", Pharmacy);
      setPharmacyTableData(Pharmacy);
      setPharmacyData(Pharmacy);
    }
  };

  const ReimbursmentCSVData = () => {
    let ClinicalData = [];
    const ClinicaltableDataArray = ClinicTableData && ClinicTableData;
    const PharmacyTableDataArray = PharmacyTableData && PharmacyTableData;
    if (step === 0) {
      if (ClinicaltableDataArray) {
        ClinicalData.push(
          "Sr.No,Ref No,Clinic,Adress,Area,Contact,Hospital Type\n"
        );
        ClinicaltableDataArray.map((excelData, i) => {
          ClinicalData.push(
            `${excelData.i},${excelData.RefNo}, ${excelData.ClinicName}, ${excelData.Adress},${excelData.Area},${excelData.Contact},${excelData.hospitalType}\n`
          );
        });
      }
    } else {
      if (PharmacyTableDataArray) {
        ClinicalData.push(
          "Sr.No,Ref_N0,Pharmacy,Adress,Area,Contact,Service_offered\n"
        );
        PharmacyTableDataArray.map((excelData, i) => {
          //console.log("xl", excelData);
          ClinicalData.push(
            `${excelData.i},${excelData.RefNo}, ${excelData.pharmacyName}, ${excelData.Adress},${excelData.Area},${excelData.Contact},${excelData.servicesOffered}\n`
          );
        });
      }
    }
    return ClinicalData.join("");
  };
  const ReimbursmentCSV = ReimbursmentCSVData();
  // // CSV END

  // This section is for pagination

  const [pageNumber, setPageNumber] = useState(0);
  const usersPerPage = 10;
  const pagesVisited = pageNumber * usersPerPage;
  const pageCount = Math.ceil(PharmacyData.length / usersPerPage);
  const pageCount2 = Math.ceil(ClinicalData.length / usersPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <>
      {ReimbursmentPage && (
        <div>
          <Breadcrumb style={{ marginTop: "20px" }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>Reimbursment</Breadcrumb.Item>
          </Breadcrumb>
          <div className="row d-flex align-items-center justify-content-between">
            <div className="col-12 col-lg-3 col-md-3 col-sm-3">
              <h3>Reimbursement</h3>
            </div>

            <div className="nav justify-content-center" style={{ display: "flex", flexDirection: "row" }}>
              <div className="col-12 col-lg-5 col-md-5 col-sm-5">
                
                  <div className="input-group">
                    <input
                      style={{ height: "35px"}}
                      type="text"
                      className="form-control my-3"
                      placeholder="Search Hospital"
                      value={searchValue}
                      onChange={(e) => setSearchValue(e.target.value)}
                    />
                    <div className="input-group-append">
                      <button
                      style={{ height: "35px"}}
                        className="btn btn-secondary my-3"
                        type="button"
                        onClick={() => handleOnSearch()}
                      >
                        <i className="fa fa-search"></i>
                      </button>
                    </div>
                  </div>
              </div>
              <div className="col-12 col-lg-3 col-md-3 col-sm-3">
                <button
                  type="button"
                  className="btn btn-success btn-sm my-3"
                  data-toggle="dropdown"
                  style={{
                    width: "150px",
                    borderRadius: "5px",
                    backgroundColor: "#8EC131",
                    border: "1px solid #8EC131",
                  }}
                >
                  <i className="fas fa-filter"></i> Add Filters
                </button>
                <ul className="dropdown-menu" role="menu" style={{textAlign:"center"}}>
                  <li>
                    <a
                      onClick={() => {
                        handleclick("provincial");
                      }}
                    >
                      provincial{" "}
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={() => {
                        handleclick("public");
                      }}
                    >
                      public
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={() => {
                        handleclick("municipal");
                      }}
                    >
                      Municipal
                    </a>
                  </li>
                </ul>
              </div>
              <div className="col-12 col-lg-4 col-md-4 col-sm-4">
                <button
                  type="button"
                  className="btn btn-primary btn-sm my-3 mx-2"
                >
                  <CSVLink
                    data={ReimbursmentCSV}
                    target="_blank"
                    style={{ color: "white" }}
                  >
                    Download PDF/CSV
                  </CSVLink>
                </button>
              </div>
            </div>
          </div>

          <div className="row d-flex align-items-center justify-content-between border-bottom pb-2">
            <div className="col-12 col-lg-6 col-md-6 text-left">
              <ul className="nav nav-tabs table-nav" id="myTab" role="tablist">
                <li className="nav-item" role="presentation">
                  <a
                    className={`nav-link ${!step ? "active" : ""}`}
                    id="clinic-list-tab"
                    data-toggle="tab"
                    onClick={() => {
                      setStep(0);
                    }}
                    role="tab"
                    aria-controls="clinic-list"
                    aria-selected="true"
                  >
                    Clinic List
                  </a>
                </li>
                <li className="nav-item" role="presentation">
                  <a
                    className={`nav-link ${step ? "active" : ""}`}
                    // className="nav-link"
                    id="pharmacies-list-tab"
                    data-toggle="tab"
                    onClick={() => {
                      setStep(1);
                    }}
                    role="tab"
                    aria-controls="pharmacies-list"
                    aria-selected="false"
                  >
                    Pharmacies List
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="tab-content table-custome mt-3" id="myTabContent">
            <div
              //   className="tab-pane fade show active"
              className={`tab-pane fade show ${!step ? "active" : ""}`}
              id="clinic-list"
              role="tabpanel"
              aria-labelledby="clinic-list-tab"
            >
              <div className="table-responsive">
                <table className="table">
                  <thead className="green-bg">
                    <tr>
                      <th>Sr.No</th>
                      <th>Ref No</th>
                      <th>Clinic Name</th>
                      <th>Address</th>
                      <th>Area</th>
                      <th>Contact No</th>
                      <th>Hospital Type</th>
                    </tr>
                  </thead>
                  {ClinicalData &&
                    ClinicalData.slice(
                      pagesVisited,
                      pagesVisited + usersPerPage
                    ).map((item, i) => (
                      <tbody>
                        <tr>
                          {/* {console.log("item",item)} */}
                          <td>{i + 1}</td>
                          <td>{item.referenceNumber}</td>
                          <td>
                            <a onClick={() => handleChange(item)}>
                              {item.name}
                            </a>
                          </td>
                          <td>{item.address}</td>
                          <td>{item.area}</td>
                          <td>{item.contact}</td>
                          <td>{item.hospitalType}</td>
                        </tr>
                      </tbody>
                    ))}
                </table>
              </div>
              <div className="row">
                <div className="col-xl-8  col-lg-8 col-md-8 col-sm-2 col-xs-12">
                  <small>
                    Shown Total Results {ClinicalData && ClinicalData.length}
                  </small>
                </div>
                <div
                  className="col-xl-4  col-lg-4 col-md-4 col-sm-4 col-xs-12"
                  style={{ padding: "20px" }}
                >
                  <ReactPaginate
                    previousLabel={"Previous"}
                    nextLabel={"Next"}
                    pageCount={pageCount2}
                    onPageChange={changePage}
                    containerClassName={"paginationBttns"}
                    previousLinkClassName={"previousBttn"}
                    nextLinkClassName={"nextBttn"}
                    disabledClassName={"paginationDisabled"}
                    activeClassName={"paginationActive"}
                  />
                </div>
              </div>
            </div>
            <div
              //   className="tab-pane fade"
              className={`tab-pane fade show ${step ? "active" : ""}`}
              id="pharmacies-list"
              role="tabpanel"
              aria-labelledby="pharmacies-list-tab"
            >
              <div className="table-responsive">
                <table className="table">
                  <thead className="green-bg">
                    <tr>
                      <th>Sr.No</th>
                      <th>Ref No</th>
                      <th>Pharmacy Name</th>
                      <th>Address</th>
                      <th>Area</th>
                      <th>Contact No</th>
                      <th>Service's Offered</th>
                    </tr>
                  </thead>

                  {PharmacyData &&
                    PharmacyData.slice(
                      pagesVisited,
                      pagesVisited + usersPerPage
                    ).map((item, i) => (
                      <tbody>
                        <tr>
                          {/* {console.log("item",PharmacyData)} */}
                          <td>{i + 1}</td>
                          <td>{item.referenceNumber}</td>
                          <td>
                            <a>{item.name}</a>
                          </td>
                          <td>{item.address}</td>
                          <td>{item.area}</td>
                          <td>{item.contact}</td>
                          <td>{item.serviceOffered}</td>
                        </tr>
                      </tbody>
                    ))}
                </table>

                <div className="row">
                  <div className="col-xl-8  col-lg-8 col-md-8 col-sm-2 col-xs-12">
                    <small>
                      Shown Total Results {PharmacyData && PharmacyData.length}
                    </small>
                  </div>
                  <div
                    className="col-xl-4  col-lg-4 col-md-4 col-sm-4 col-xs-12"
                    style={{ padding: "20px" }}
                  >
                    <ReactPaginate
                      previousLabel={"Previous"}
                      nextLabel={"Next"}
                      pageCount={pageCount}
                      onPageChange={changePage}
                      containerClassName={"paginationBttns"}
                      previousLinkClassName={"previousBttn"}
                      nextLinkClassName={"nextBttn"}
                      disabledClassName={"paginationDisabled"}
                      activeClassName={"paginationActive"}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {ClinicDataPage && (
        <AdClinicData
          selectedrecord={selectedrecord}
          data={ClinicalData}
          handleback={handleBack}
        />
      )}
    </>
  );
};
export default HrReimbursment;
