import { useAuth } from '@/hooks/auth';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Card, Flex, Form, Input, Typography } from 'antd';
import { camelCase, upperFirst } from 'lodash';
import { FC, useCallback, useState } from 'react';
import { useNavigate } from 'react-router';
import styles from './index.module.less';

const LoginPage: FC = () => {
  const navigate = useNavigate();
  const { userLogin } = useAuth();
  const [pending, setPending] = useState(false);

  const handleFormFinish = useCallback(
    async (values: PetStore.LoginUser.QueryParameters) => {
      try {
        setPending(true);
        await userLogin(values);
        navigate('/');
      } catch (error) {
      } finally {
        setPending(false);
      }
    },
    [navigate, userLogin],
  );

  return (
    <div className={styles.container}>
      <Card>
        <Flex vertical className={styles.content} gap={16}>
          <Flex vertical align="center" gap={16}>
            <Typography.Title level={3} style={{ marginTop: 0 }}>
              {upperFirst(camelCase(process.env.APP_NAME))}
            </Typography.Title>
            <Typography.Title level={4} style={{ margin: 0 }}>
              登录
            </Typography.Title>
          </Flex>
          <Form onFinish={handleFormFinish}>
            <Form.Item name="username" rules={[{ required: true, message: '请输入用户名' }]}>
              <Input prefix={<UserOutlined />} placeholder="用户名" />
            </Form.Item>
            <Form.Item name="password" rules={[{ required: true, message: '请输入密码' }]}>
              <Input.Password prefix={<LockOutlined />} placeholder="密码" />
            </Form.Item>
            <Button block loading={pending} type="primary" htmlType="submit">
              登录
            </Button>
          </Form>
        </Flex>
      </Card>
    </div>
  );
};

export default LoginPage;
