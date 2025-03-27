import React from 'react';
import { Table, Typography, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const columns = [
    { title: '书名', dataIndex: 'title', key: 'title' },
    { title: '作者', dataIndex: 'author', key: 'author' },
    { title: '出版年份', dataIndex: 'year', key: 'year' },
];

const data = [
    { key: '1', title: '三体', author: '刘慈欣', year: '2006' },
    { key: '2', title: '围城', author: '钱钟书', year: '1947' },
    { key: '3', title: '平凡的世界', author: '路遥', year: '1986' },
];

const BookList = () => {
    return (
        <>
            <Typography.Title level={2}>📚 图书列表</Typography.Title>
            <Input
                style={{ width: 300, marginBottom: 20 }}
                placeholder="搜索书籍"
                prefix={<SearchOutlined />}
            />
            <Table columns={columns} dataSource={data} pagination={{ pageSize: 5 }} />
        </>
    );
};

export default BookList;