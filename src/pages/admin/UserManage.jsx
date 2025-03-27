import React from 'react';
import { Table, Typography, Space, Button, Tag } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const UserManage = () => {
    const columns = [
        {
            title: '用户名',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: '邮箱',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: '角色',
            dataIndex: 'role',
            key: 'role',
            render: role => (
                <Tag color={role === '管理员' ? 'green' : 'blue'}>
                    {role.toUpperCase()}
                </Tag>
            ),
        },
        {
            title: '操作',
            key: 'action',
            render: () => (
                <Space>
                    <Button icon={<EditOutlined />} type="primary">编辑</Button>
                    <Button icon={<DeleteOutlined />} danger>删除</Button>
                </Space>
            ),
        },
    ];

    const data = [
        { key: '1', username: 'user01', email: 'user01@gmail.com', role: '普通用户' },
        { key: '2', username: 'admin', email: 'admin@gmail.com', role: '管理员' },
        { key: '3', username: 'user02', email: 'user02@gmail.com', role: '普通用户' },
    ];

    return (
        <>
            <Typography.Title level={3}>👥 用户管理</Typography.Title>
            <Table
                columns={columns}
                dataSource={data}
                pagination={{ pageSize: 5 }}
            />
        </>
    );
};

export default UserManage;