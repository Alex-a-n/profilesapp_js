import React from 'react';
import { Form, Input, Button, Card } from 'antd';  // 引入 Form, Input, Button, Card 组件
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();

    const onFinish = ({ username }) => {
        if (username === 'admin') navigate('/admin');
        else if (username === 'user') navigate('/user');
    };

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            width: '100vw',
            backgroundColor: '#f0f2f5'
        }}>
            <Card
                title="📚 CozyRead 登录"
                style={{
                    width: 400,
                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                    padding: '20px'
                }}
            >
                <Form onFinish={onFinish}>
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: '请输入用户名!' }]}
                    >
                        <Input prefix={<UserOutlined />} placeholder="用户名 (user/admin)" />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: '请输入密码!' }]}
                    >
                        <Input.Password prefix={<LockOutlined />} placeholder="密码 (随意填写)" />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                            登录
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default Login;