import React, { useState, useEffect } from "react";
import { Table, Modal, Input, Form } from "antd";

const Hractive = (props) => {
  const [tableData, setTableData] = useState("");
  const [editPolicyData, setEditPolicyData] = useState(" ");
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [count, setCount] = useState(0);
  const table = props.tableData;
  const data = {
    search: "",
    type: "",
    id: "",
  };

  const handleEditShowModal = () => {
    setIsEditModalVisible(true);
  };
  const handelEditCancel = () => {
    setIsEditModalVisible(false);
  };

  const onFinish = (values) => {
    setEditPolicyData(values);
  };

  const columns = [
    {
      title: "Policy Name",
      dataIndex: "name",
      key: "name",

      sorter: (a, b) => a.name.length - b.name.length,
      render: (text) => <a style={{ color: "#4cbb17" }}>{text}</a>,
    },

    {
      title: "Policy Code",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Registration",
      dataIndex: "number",
      key: "number",
    },
    {
      title: "Policy Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Active Policies",
      dataIndex: "count",
      key: "count",
    },
    {
      title: "Actions",
      key: "action",

      render: (text, record) => {
        return (
          <>
            {/* <EditOutlined style={{ color: "#000089", paddingLeft: "10px" }} onClick={handleEditShowModal}
/>
            <DeleteOutlined style={{paddingLeft:"30px"}}  onClick={()=>handleDeletePolicy(text,record)}/> */}
          </>
        );
      },
    },
  ];

  return (
    <>
    <div className="container-fluid">
            <div className="row DataTable" style={{justifyContent:"center"}}>
          <Table
            columns={columns}
            dataSource={table}
            //onChange={this.handleChange}
            pagination={true}
          />
        </div>
      </div>
      <Modal
        title="Edit Policy"
        visible={isEditModalVisible}
        onOk={null}
        onCancel={handelEditCancel}
      >
        <Form
          onFinish={onFinish}
          //  onFinishFailed={onFinishFailed}
        >
          <Form.Item
            name={"policyName"}
            label="Policy Name"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
         
          <Form.Item
            name={"policyRegistration"}
            label="Registration"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={"policyType"}
            label="Policy Type"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={"policyDuration"}
            label="Policy Duration"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={"policyDescription"}
            label="Description"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default Hractive;
