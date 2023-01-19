import React, { useState, useEffect } from "react";
import { Table, Button, Input, Menu, Dropdown } from "antd";
import { useNavigate } from "react-router-dom";
import {
  EyeOutlined,
  VerticalAlignBottomOutlined,
  PlusOutlined,
  FilterOutlined,
} from "@ant-design/icons";
import { CSVLink } from "react-csv";
import { getPremiumList } from "./services/authentication";

const { Search } = Input;

const data = [];

const Rp = () => {
  let navigate = useNavigate();
  const [PremiumListArray, setPremiumListArray] = useState("");
  const [TableData, setTableData] = useState("");
  const handleGetPremiumListServiceCall = async (data) => {
    try {
      let tableDataArr = [];
      const resp = await getPremiumList(data);
      setPremiumListArray(resp && resp.data);
      resp &&
        resp.data.map((data, i) => {
          const value = {
            policy: data.userPolicy.policy.policyName,
            name: data.userPolicy.user.firstName,
            code: data.invoiceNumber,
            type: data.userPolicy.premiumPlan,
            date: data.userPolicy.updatedAt,
            amount: data.premiumAmount,
          };
          console.log(value);
          tableDataArr.push(value);
        });
      console.log("tableDataArr in premium", tableDataArr);
      setTableData(tableDataArr);
      console.log("resp", resp);
    } catch (error) {
      console.log("error", error);
      // showAlert('In valide data', "error");
    }
  };
  useEffect(() => {
    handleGetPremiumListServiceCall(data);
  }, []);

  ///LIST API SERVICE CALL AND FUNCTIONALITY ENDED
  const handleFilterData = (filterData) => {
    const tableDataArr = [];
    console.log("filterData", filterData);
    if (filterData.length > 0) {
      filterData.map((data, i) => {
        const value = {
          key: data.id,
          policy: data.userPolicy.policy.policyName,
          name: data.userPolicy.user.firstName,
          code: data.invoiceNumber,
          type: data.userPolicy.premiumPlan,
          date: data.userPolicy.updatedAt,
          amount: data.premiumAmount,
        };
        tableDataArr.push(value);
      });
    }
    return tableDataArr;
  };
  const handleClick = (type) => {
    const premiumfilterData = PremiumListArray.filter(
      (data) => data.userPolicy.premiumPlan === type
    );
    const filterData = handleFilterData(premiumfilterData);
    setTableData(filterData);
  };
  const onSearch = (value) => {
    const premiumfilterData = PremiumListArray.filter((data) => {
      const itemData = data.userPolicy.policy.policyName.toUpperCase();
      const textData = value.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    const searchFilter = handleFilterData(premiumfilterData);
    setTableData(searchFilter);
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

  const premiumCSVData = () => {
    let premiumPoliciesData = [];
    const premiumtableDataArray = PremiumListArray && PremiumListArray;
    if (premiumtableDataArray) {
      premiumPoliciesData.push(
        "Invoice No,Policy Holder,Policy Name, Premium Plan, Payment Received Date, Amount\n"
      );
      premiumtableDataArray.map((excelData) => {
        premiumPoliciesData.push(
          `${excelData.invoiceNumber},${excelData.userPolicy.user.firstName}, ${excelData.userPolicy.policy.policyName}, ${excelData.userPolicy.premiumPlan},${excelData.userPolicy.updatedAt}${excelData.premiumAmount}\n`
        );
      });
    }
    return premiumPoliciesData.join("");
  };
  const premiumCSV = premiumCSVData();

  const columns = [
    // This section is written to make the table responsive
    {
      title: "InvoiceNo. PolicyHolder",
      render: (record) => (
        <React.Fragment>
          {record.code}
          <br />
          <hr />
          {record.name}
        </React.Fragment>
      ),
      responsive: ["xs"],
    },
    {
      title: "PolicyName PremiumPlan",
      render: (record) => (
        <React.Fragment>
          {record.policy}
          <br />
          <hr />
          {record.type}
        </React.Fragment>
      ),
      responsive: ["xs"],
    },
    {
      title: "RecievedDate Amount",
      render: (record) => (
        <React.Fragment>
          {record.date}
          <br />
          <hr />
          {record.amount}
        </React.Fragment>
      ),
      responsive: ["xs"],
    },

    // Actual Columns of tables starts from here
    {
      title: "Invoice Number",
      dataIndex: "code",
      key: "code",
      ellipsis: true,
      sorter: (a, b) => a.code.length - b.code.length,
      render: (text) => <a style={{ color: "#4cbb17" }}>{text}</a>,
      responsive: ["sm"],
    },

    {
      title: "Policy Holder",
      dataIndex: "name",
      key: "name",
      ellipsis: true,
      sorter: (a, b) => a.name.length - b.name.length,
      responsive: ["sm"],
    },

    {
      title: "Policy Name",
      dataIndex: "policy",
      key: "policy",
      ellipsis: true,
      sorter: (a, b) => a.name.length - b.name.length,
      responsive: ["sm"],
    },
    {
      title: "Premium plan",
      dataIndex: "type",
      key: "type",
      ellipsis: true,
      responsive: ["sm"],
    },
    {
      title: "Payment Received Date",
      dataIndex: "date",
      key: "date",
      ellipsis: true,
      responsive: ["sm"],
    },

    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      ellipsis: true,
      responsive: ["sm"],
    },

    {
      title: "Download Invoice",
      key: "option",
      ellipsis: true,
      render: (record) => {
        return (
          <>
            <VerticalAlignBottomOutlined />
            <EyeOutlined style={{ paddingLeft: "30px" }} />
          </>
        );
      },
      responsive: ["sm", "xs", "md"],
    },
  ];

  return (
    <>
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
            <h3>Received Premium</h3>
          </div>
          <div className="nav justify-content-center">
            <div
              className="col-12 col-sm-5 col-md-5"
              style={{ display: "flex", flexDirection: "row" }}
            >
              <Search
                placeholder="search Policy"
                onSearch={onSearch}
                style={{
                  borderRadius: "25px",
                }}
              />
            </div>
            <div
              className="col-12 col-sm-3 col-md-3"
              style={{ display: "flex", flexDirection: "row" }}
            >
              <Dropdown placement="bottomCenter" overlay={content} arrow>
                <Button
                  style={{
                    borderRadius: "5px",
                    backgroundColor: "#61b33b",
                    color: "white",
                  }}
                >
                  <FilterOutlined /> Add Filters
                </Button>
              </Dropdown>
            </div>
            <div
              className="col-12 col-sm-3 col-md-3"
              style={{ display: "flex", flexDirection: "row" }}
            >
              <Button
                style={{
                  color: "#ffffff",
                  backgroundColor: "#000089",
                  borderRadius: "5px",
                }}
              >
                <CSVLink data={premiumCSV} target="_blank">
                  Download PDF/CSV
                </CSVLink>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="row">
          <Table
            columns={columns}
            dataSource={TableData}
            //onChange={this.handleChange}
            pagination={true}
            total={10}
          />
        </div>
      </div>
    </>
  );
};
export default Rp;
