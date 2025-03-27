import React from 'react';
import { Table } from 'antd';

const data = [
    { key: '1', title: '三体', author: '刘慈欣', year: '2006' },
    { key: '2', title: '红楼梦', author: '曹雪芹', year: '1791' },
];

const columns = [
    { title: '书名', dataIndex: 'title', key: 'title' },
    { title: '作者', dataIndex: 'author', key: 'author' },
    { title: '年份', dataIndex: 'year', key: 'year' },
];

function BookManage() {
    return (
        <>
            <h3>图书管理</h3>
            <Table columns={columns} dataSource={data} />
        </>
    );
}

export default BookManage;
