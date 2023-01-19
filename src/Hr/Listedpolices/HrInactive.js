import React from 'react';
import { Table,Button} from 'antd';
import { useNavigate } from "react-router-dom";
import {VerticalAlignBottomOutlined} from '@ant-design/icons';



const data = [
    {
        key: '1',
        name: 'Accidents at work',
        code: 'NS00011122',
        type: 'yearly',
        status: 'Premium Paid',
        Amount:'$2500',
        date:"05-01-2022 5:00pm"
    },  
    { 
        key: '2',
        name: 'seguro automotive',
        code: 'NS00011122',
        type: 'Monthly',
        status: 'Premium Due',
        Amount:'$300',
        date:"05-01-2022 5:00pm"


    },
    // { 
    //     key: '3',
    //     name: 'seguro automotive',
    //     code: 'NS00011122',
    //     type: 'Monthly',
    //     status: 'Premium Due',
    //     Amount:'$300',
    //     date:"05-01-2022 5:00pm"


    // },
];

const Inactive = (props)=>{
    console.log('props in active',props)
    const table = props.tableData
    let navigate = useNavigate();
    const columns = [
        {
          title: "Policy Name",
          dataIndex: "name",
          key: "name",
          ellipsis: true,
          sorter: (a, b) => a.name.length - b.name.length,
          render: (text) => (
            <a
              style={{ color: "#4cbb17" }}
            >
              {text}
            </a>
          ),
        },
    
        {
          title: "Policy Code",
          dataIndex: "code",
          key: "code",
          ellipsis: true,
        },
        {
          title: "Registration",
          dataIndex: "number",
          key: "number",
          ellipsis: true,
        },
        {
          title: "Policy Type",
          dataIndex: "type",
          key: "type",
          ellipsis: true,
        },
        {
          title: "Active Policies",
          dataIndex: "count",
          key: "count",
          ellipsis: true,
        },
        {
          title: "Actions",
          key: "action",
          ellipsis: true,
          render: (text,record) => {
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
    
    
    return(
        <>
       
        <Table
            columns={columns }
            dataSource={table}
            //onChange={this.handleChange}
            pagination={true}
        />
    </>
    )
}
export default Inactive
