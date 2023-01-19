import React, { Component } from 'react';
import { Table } from 'antd';

const data = [
    {
        key: '1',
        name: 'Acidentes de Trabalho',
        code: 'NS00011122',
        type: 'General',
        totalsales: 786,
    },
    {
        key: '2',
        name: 'Multi-risk Housing',
        code: 'NS00011122',
        type: 'General',
        totalsales: 518,
    },
];

class BestSellingTable extends Component {
    state = {
        filteredInfo: null,
        sortedInfo: null,
    };

    handleChange = (pagination, filters, sorter) => {
        console.log('Various parameters', pagination, filters, sorter);
        this.setState({
            filteredInfo: filters,
            sortedInfo: sorter,
        });
    };

    render() {
        let { sortedInfo } = this.state;
        sortedInfo = sortedInfo || {};

        const columns = [
            {
                title: 'Policy Name',
                dataIndex: 'name',
                key: 'name',
                sorter: (a, b) => a.name.length - b.name.length,
                sortOrder: sortedInfo.columnKey === 'name' && sortedInfo.order,
                ellipsis: true,
            },
            {
                title: 'Policy Code',
                dataIndex: 'code',
                key: 'code',
                sorter: (a, b) => a.code - b.code,
                sortOrder: sortedInfo.columnKey === 'code' && sortedInfo.order,
                ellipsis: true,
            },
            {
                title: 'Policy Type',
                dataIndex: 'type',
                key: 'type',
                ellipsis: true,
            },
            {
                title: 'Total Sales',
                dataIndex: 'totalsales',
                key: 'totalsales',
                sorter: (a, b) => a.totalsales - b.totalsales,
                sortOrder:
                    sortedInfo.columnKey === 'totalsales' && sortedInfo.order,
                ellipsis: true,
            },
        ];
        return (
            <>
                <h3>Best Selling policy - Month Jan 2021</h3>
                <Table
                    columns={columns}
                    dataSource={data}
                    onChange={this.handleChange}
                    pagination={false}
                />
            </>
        );
    }
}

export default BestSellingTable;
