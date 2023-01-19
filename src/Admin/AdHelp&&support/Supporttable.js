import React, { useState, useEffect } from "react";
import { getSupportAPI } from "../../services/authentication";
import { Table } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import { Breadcrumb } from "antd";
import { ArrowLeftOutlined } from "@material-ui/icons";

const Supporttable = (props) => {
  const [SupportListArray, setSupportListArray] = useState("");
  const [TableData, setTableData] = useState("");

  const handleSupportList = async () => {
    const payload = {
      type: props.Type,
    };
    try {
      let tableDataArr = [];
      const resp = await getSupportAPI(payload);

      setSupportListArray(resp && resp.data);
      console.log("resp", resp);
      resp &&
        resp.data.map((data, i) => {
          const value = {
            Id: data.id,
            Name: data.name,
            type: data.type,
            phone: data.description,
            Description: data.description,
            email: data.email,
            subject: data.subject,
            key: data.id,
          };
          tableDataArr.push(value);
          setTableData(tableDataArr);
          console.log("tdr", tableDataArr);
        });
    } catch (error) {
      console.log("error", error);
      // showAlert('In valide data', "error");
    }
  };

  useEffect(() => {
    handleSupportList();
  }, []);

  // This section is for pagination

  const [pageNumber, setPageNumber] = useState(0);
  const usersPerPage = 10;
  const pagesVisited = pageNumber * usersPerPage;
  const pageCount = Math.ceil(SupportListArray.length / usersPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    
    <div className="container-fluid">
      <div className="row" style={{justifyContent:"space-between"}}>
       <div className="bredc">
            <Breadcrumb style={{ marginTop: "20px" }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>Help && Support</Breadcrumb.Item>
              <Breadcrumb.Item>{props.Type}</Breadcrumb.Item>
            </Breadcrumb>
            </div>
            <div style={{paddingTop:"20px"}}>
              <a onClick={() =>props.handleBack()}>
                <ArrowLeftOutlined/>
                <b>Back</b></a>
            </div>
            </div>


      <div
        className="col-xl-12  col-lg-9 col-md-6 col-sm-4"
        style={{ paddingTop: "20px" }}
      >
        <Table responsive>
          <thead style={{ backgroundColor: "#8ec131" }}>
            <tr>
              <th>Sr.No.</th>
              <th>Type</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Description</th>
              <th>Email</th>
              <th>Subject</th>
            </tr>
          </thead>
          <tbody>
            {SupportListArray &&
              SupportListArray.slice(
                pagesVisited,
                pagesVisited + usersPerPage
              ).map((item, i) => (
                <tr>
                  {/* {console.log("DLA",SupportListArray)} */}
                  <td>{i+1}</td>
                  <td>{item.type}</td>
                  <td>{item.name}</td>
                  <td>{item.phone}</td>
                  <td>{item.description}</td>
                  <td>{item.email}</td>
                  <td>{item.subject}</td>
                  {/* <td>createdAt</td> */}
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
      <div className="row">
        <div className="col-xl-8  col-lg-8 col-md-8 col-sm-2 col-xs-12">
          Shown Total Results {SupportListArray && SupportListArray.length}
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
  );
};
export default Supporttable;
