import React, { useState, useEffect } from "react";
import { Button, Table, Modal,Breadcrumb } from "antd";
import { CSVLink } from "react-csv";
import DeleteSucess from "./DeleteSucess";
import { EditOutlined, DeleteOutlined, EyeOutlined,PlusOutlined } from "@ant-design/icons";
import moment from "moment";
import {
  getComplaintList,
  editComplaintList,
  deleteComplaintList,
  addComplaintList,
} from "../../services/authentication";
import ComplaintDetails from "./ComplaintDetails";
import NewComplaint from "./NewComplaint";
import ModalHeader from "react-bootstrap/esm/ModalHeader";


const Complaint = () => {
  const [complaintsListArray, setComplaintsListArray] = useState("");
  const [complaintsData, setComplaintsData] = useState("");
  const [IsEditModalVisible, setIsEditModalVisible] = useState("");
  const [complaintApiUpdateStatus, setcomplaintApiUpdateStatus] = useState("");
  const [id, setID] = useState("");
  const [policyName, setPolicyName] = useState("");
  const [complaintDate, setComplaintDate] = useState("");
  const [status, setStatus] = useState("");
  const [complaintDescription, setComplaintDescription] = useState("");
  const [complaintTablepage, setComplaintTablepage] = useState(true);
  const [complaintsDetailspage, setComplaintsDetailspage] = useState("");
  const [selectedRecord, setSelectedRecord] = useState("");
  const [subject, setsubject] = useState("");
  const [newComplaintspage, setNewComplaintspage] = useState("");
  const [DelSucessModal, setDelSucessModal] = useState("");

  const handleEditShowModal = (text, record) => {
    console.log("recooo", record, text);
    console.log("array", complaintsListArray);
    const value = complaintsListArray.find(
      (data) => data.complaintCode === record.id
    );
    const date = moment(value.complaintDate).format("YYYY-MM-DD");
    if (value) {
      setID(value.id);
      setComplaintDate(date);
      setComplaintDescription(value.description);
      setsubject(value.subject);
    }
    setIsEditModalVisible(true);
  };
  const handelEditCancel = () => {
    setIsEditModalVisible(false);
  };

  //edit Api

  const handleEditComplaintListAPI = async () => {
    const payload = {
      id: id,
      subject: subject,
      description: complaintDescription,
      complaintDate: complaintDate,
    };
    try {
      const resp = await editComplaintList(payload);
      console.log("success", resp);
      alert("Complain Edited Successfully!");
      resp && handleGetComplaintsListServiceCall();
      setcomplaintApiUpdateStatus(true);
      handelEditCancel();
    } catch (error) {
      console.log("error", error);
      alert("Something Went Wrong");
    }
  };

  const handleGetComplaintsListServiceCall = async () => {
    try {
      let complaintsDataArr = [];
      const resp = await getComplaintList();
      console.log("gvgjv", resp);
      setComplaintsListArray(resp && resp.data);
      resp &&
        resp.data.map((data) => {
          const value = {
            user_id: data.id,
            id: data.complaintCode,
            PolicyName: data.userPolicy.policy.policyName,
            date: moment(data.complaintDate).format("YYYY-MM-DD"),
            status: data.verifyStatus,
            description: data.description,
            subject: data.subject,
            key:data.id
          };
          console.log(value);
          complaintsDataArr.push(value);
        });
      setComplaintsData(complaintsDataArr);
      console.log("Arr", complaintsDataArr);
      console.log("resp", resp);
    } catch (error) {
      console.log("error", error);
      // showAlert('In valide data', "error");
    }
  };

  useEffect(() => {
    handleGetComplaintsListServiceCall();
  }, [complaintApiUpdateStatus]);

  //delete Api
  const handleDeleteComplaint = async (text, record) => {
    const value = complaintsListArray.find(
      (data) => data.complaintCode === record.id
    );
    console.log("valuuuue", value);
    const payload = {
      id: value.id,
    };
    try {
      const resp = await deleteComplaintList(payload);
      console.log("success");
      alert("Deleted Successfully");
      handleGetComplaintsListServiceCall();
      setcomplaintApiUpdateStatus(true);
    } catch (error) {
      console.log("error", error);
      alert("Something Went Wrong");
    }
  };

  const handleComplaintIdClick = (text, record) => {
    setSelectedRecord(record);
    setComplaintTablepage(false);
    setComplaintsDetailspage(true);
  };

  const handleNewComplaintClick = () => {
    setComplaintTablepage(false);
    setNewComplaintspage(true);
  };

  const handleBack = () => {
    setComplaintTablepage(true);
    setComplaintsDetailspage(false);
  };

  const handlereturn = () => {
    setComplaintTablepage(true);
    setNewComplaintspage(false);
  };

  const handleModalreturn = () => {
    setComplaintTablepage(true);
    setDelSucessModal(false);
  };

  const columns = [
    // {
    //   title: "Id",
    //   dataIndex: "user_id",
    //   key: "user_id",
    //   align:"center",
    // },

    {
      title: "Complaint Id",
      dataIndex: "id",
      key: "id",
      align:"center",

      render: (text, record) => (
        <div>
          {record.status === "Resolved" ? (
            <a
              style={{ color: "#4cbb17" }}
              onClick={() => handleComplaintIdClick(text, record)}
            >
              {text}
            </a>
          ) : (
            <label> {text}</label>
          )}
        </div>
      ),
    },
    {
      title: "Policy Name",
      dataIndex: "PolicyName",
      key: "name",
      align:"center",
    },

    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      align:"center",
    },

    {
      title: "Complaint Date",
      dataIndex: "date",
      key: "date",
      align:"center",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      align:"center",
    },
    // {
    //   title: "Subject",
    //   dataIndex: "subject",
    //   key: "subject",
    //   align:"center",
    // },

    {
      title: "Options",
      key: "option",
      align:"center",

      render: (text, record) => {
        return (
          <>
            {record.status === "Approved" ? (
              <EyeOutlined style={{ color: "#000089", paddingLeft: "10px" }} />
            ) : (
              <div>
                {/* <EyeOutlined
                  style={{ color: "#000089", paddingLeft: "10px" }}
                /> */}
                <EditOutlined
                  style={{ color: "#000089", paddingLeft: "10px" }}
                  onClick={() => handleEditShowModal(text, record)}
                />
                <DeleteOutlined
                  style={{ color: "#000089", paddingLeft: "10px" }}
                  onClick={() => handleDeleteComplaint(text, record)}
                />
              </div>
            )}
          </>
        );
      },
    },
  ];
  //csv download Link
  const ComplaintCsvData = () => {
    let ComplaintsData = [];
    const complaintsListArrayData = complaintsListArray && complaintsListArray;
    if (complaintsListArrayData) {
      ComplaintsData.push(
        "Complaint ID,Policy Name,Description,Complaint Date,Status\n"
      );
      complaintsListArrayData.map((excelData) => {
        //console.log("ugugvcgvc",excelData)
        ComplaintsData.push(
          `${excelData.complaintCode}, ${excelData.userPolicy.policy.policyName}, ${excelData.userPolicy.policy.description},${excelData.complaintDate},${excelData.verifyStatus}\n`
        );
      });
    }
    return ComplaintsData.join("");
  };
  const ComplaintCsv = ComplaintCsvData();

  return (
    <>
      {complaintTablepage && (
        <div>
          <div className="container-fluid">
          <Breadcrumb style={{ marginTop: "20px" }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>Complaints</Breadcrumb.Item>
          </Breadcrumb>
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
                <h3>My Complaints</h3>
              </div>
              <div className="nav justify-content-center">
              <div className="col-12 col-sm-6 col-md-6">
                <Button
                  style={{
                    borderRadius: "5px",
                    backgroundColor: "#8ec131",
                    color: "white",
                  }}
                  onClick={() => handleNewComplaintClick()}
                >
                 <PlusOutlined style={{ paddingTop: "5px" }} /> New Complaint
                </Button>
              </div>
              <div className="col-12 col-sm-6 col-md-6">
                <Button
                  style={{
                    color: "#ffffff",
                    backgroundColor: "#002E5E",
                    borderRadius: "5px",
                  }}
                >
                  {/* Download PDF/CSV */}
                  <CSVLink data={ComplaintCsv} target="_blank">
                    Download PDF/CSV
                  </CSVLink>
                </Button>
              </div>
              </div>
            </div>
          </div>
          <div className="container-fluid">
            <div className="DataTable" style={{ justifyContent: "center" }}>
              <Table
                columns={columns}
                dataSource={complaintsData}
                //onChange={this.handleChange}
                pagination={true}
                total={10}
              />
            </div>
          </div>
          <div>
            <span>shown Results {complaintsListArray.length}</span>
          </div>

          <div>
            <Modal
              visible={IsEditModalVisible}
              onOk={handleEditComplaintListAPI}
              onCancel={handelEditCancel}
            >
                 <ModalHeader
              style={{
                justifyContent: "center",
                fontSize: "18px",
                fontWeight: "bolder",
                color: "#000089", 
                paddingBottom:"10px"
              }}
            >
              Edit Complaint
            </ModalHeader>

              <form className="col-12">
              <div className="form-group mb-4">
                <input
                key={id}
                  className="col-xs-12 w-100"
                type="Id"
                placeholder="Id"
                value={id}
                onChange={(e) => setID(e.target.value)}
              />
              </div>
              <div className="form-group mb-4">
                <input
                key={subject}
                  className="col-xs-12 w-100"
                type="subject"
                placeholder="subject"
                value={subject}
                onChange={(e) => setsubject(e.target.value)}
              />
            </div>
            <div className="form-group mb-4">
                <input
                key={complaintDate}
                className="col-xs-12 w-100"
                type="Date"
                placeholder="Complaint Date"
                value={complaintDate}
                onChange={(e) => setComplaintDate(e.target.value)}
              />
            </div>

            <div className="form-group mb-4">
                <textarea
                key={complaintDescription}
                  className="col-xs-12 w-100"
                type="Textarea"
                placeholder="complaint Description"
                value={complaintDescription}
                onChange={(e) => setComplaintDescription(e.target.value)}
              />
              </div>
              </form>
            </Modal>
          </div>
        </div>
      )}

      {complaintsDetailspage && (
        <ComplaintDetails
          selectedRecord={selectedRecord}
          data={complaintsListArray}
          handleBack={handleBack}
        />
      )}

      {newComplaintspage && <NewComplaint handlereturn={handlereturn} />}

      {DelSucessModal && <DeleteSucess handleModalreturn={handleModalreturn} />}
    </>
  );
};
export default Complaint;
