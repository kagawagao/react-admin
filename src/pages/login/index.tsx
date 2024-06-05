import { Button } from 'antd';
import { FC } from 'react';
import { useNavigate } from 'react-router';

const LoginPage: FC = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Button type="primary" onClick={() => navigate('/')}>
        登录
      </Button>
    </div>
  );
};

export default LoginPage;
