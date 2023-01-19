import React, { useEffect, useState } from "react";
import { Table, Button, Input, Menu, Dropdown } from "antd";
import { useNavigate } from "react-router-dom";
import moment from "moment" 
import {
  EyeOutlined,
  VerticalAlignBottomOutlined,
  FilterOutlined,
  SmallDashOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import { CSVLink } from "react-csv";
import { getAllUserPolicyList } from "../../services/authentication";
import { Popover } from "@material-ui/core";

const { Search } = Input;

// const Home = () =>{
// //   windows.location ="/listedPolices"
// }

const AccidentList = (props) => {
  let navigate = useNavigate();
  const [allPolicyListArray, setAllPolicyListArray] = useState("");
  const[policyName,setpolicyName]=useState('')
  const [tableData, setTableData] = useState("");
  const handleContent = () => (
    <div>
      <p>Send reminder to policy Holder for payment</p>
    </div>
  );
  const columns = [
    {
      title: "Policy Number",
      dataIndex: "code",
      key: "code",
      align:"center",

      sorter: (a, b) => a.code.length - b.code.length,
      render: (text) => <p style={{ color: "#4cbb17" }}>{text}</p>,
    },

    {
      title: "Policy holder",
      dataIndex: "name",
      key: "name",
      align:"center",

      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: "Policy start date",
      dataIndex: "date",
      key: "date",
      align:"center",
    },
    {
      title: "Premium plan",
      dataIndex: "type",
      key: "type",
      align:"center",
    },
    {
      title: "Premium",
      dataIndex: "Amount",
      key: "Amount",
      align:"center",
    },
    {
      title: "Premiumstatus",
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
    //   align:"center",

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

  const handleAllPolicyList = async () => {
    try {
      let tableDataArr = [];
      const Id = props && props.data.key;
      const data = {
        policy_id: Id,
        user_id: "",
        agent_id: "",
        premiumPlan: "",
        activeStatus: "",
      };
      const resp = await getAllUserPolicyList(data);
      setAllPolicyListArray(resp && resp.data);
      console.log("success", props, resp);
      resp &&
        resp.data.map((data, i) => {
          const value = {
            key: data.id,
            policyName:data.policy.policyName,
            name: `${data.user.firstName} ${data.user.lastName}`,
            code: data.policy.policyCode,
            type: data.premiumPlan,
            status: data.premiumStatus,
            count: data.numberOfClaims,
            Amount: data.premiumAmount,
            date: moment(data.createdAt).format('YYYY-MM-DD'),
          };
          console.log(value);
          tableDataArr.push(value);
        });
      setTableData(tableDataArr);
    } catch (error) {
      console.log("error", error);
      // showAlert('In valide data', "error");
    }
  };
  useEffect(() => {
    handleAllPolicyList();
  }, []);
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
          date: moment(data.createdAt).format("YYYY-MM-DD"),
        };
        tableDataArr.push(value);
        
      });
    }
    return tableDataArr;
  };

  const handleBack = () => {
    props.handeleBackButton();
  };
  const handleClick = (type) => {
    const premiumfilterData =
      allPolicyListArray &&
      allPolicyListArray.filter((data) => data.premiumPlan === type);
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
      allPolicyListArray &&
      allPolicyListArray.filter((data) => {
        const itemData = data.policy.policyCode.toUpperCase();
        const textData = value.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
    const searchFilter = handleFilterData(policyfilterData);
    setTableData(searchFilter);
  };

  const policyCSVData = () => {
    let PoliciesData = [];
    const allPoliciesListArray = allPolicyListArray && allPolicyListArray;
    if (allPoliciesListArray) {
      PoliciesData.push(
        "Policy No,Policy Holder,Policy start Date, Premium Plan, Premium, Premium Status,Claims\n"
      );
      allPoliciesListArray.map((excelData) => {
        PoliciesData.push(
          `${excelData.policy.policyCode},${excelData.policy.policyName}, ${excelData.createdAt}, ${excelData.premiumPlan},${excelData.premiumAmount},${excelData.premiumStatus}${excelData.numberOfClaims}\n`
        );
      });
    }
    return PoliciesData.join("");
  };
  const policyCSV = policyCSVData();

  return (
    <>
      <div>
        <a
          style={{
            marginTop: "50px",
          }}
          onClick={() => handleBack()}
        >
          <ArrowLeftOutlined style={{ paddingTop: "10px" }} /> BACK
        </a>
      </div>
      <div className="container-fluid">
        <div
          className="ant-row"
          style={{
            marginTop: "20px",
            marginBottom: "25px",
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",
          }}
        >
          <div className="col-12 col-sm-3 col-md-3 ">
        <h3> {tableData.length>0 && tableData[0].policyName}</h3> 
            
          </div>
          <div className="nav justify-content-center">
          <div
            className="col-12 col-sm-5 col-md-5"
            style={{ display: "flex", flexDirection: "row" }}
          >
            <Search
              placeholder="search Policy Number"
              onSearch={onSearch}
              style={{
                width: 300,
                borderRadius: "25px",
                marginRight: "10px",
              }}
            />
          </div>
          <div className="col-12 col-sm-3 col-md-3">
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
          <div className="col-12 col-sm-3 col-md-3">
            <Button
              style={{
                borderRadius: "5px",
                backgroundColor: "#000086",
                color: "white",
              }}
            >
              <CSVLink data={policyCSV} target="_blank">
                Download PDF/CSV
                <VerticalAlignBottomOutlined />
              </CSVLink>
            </Button>
          </div>
        </div>
      </div>
      </div>
      <div className="container-fluid">
        <div className="DataTable">
          <Table
            columns={columns}
            dataSource={tableData}
            //onChange={this.handleChange}
            pagination={true}
            total={10}
          />
        </div>
      </div>
      <div>
        <span>
          shown Results {tableData.length}
        </span>
      </div>
    </>
  );
};
export default AccidentList;
