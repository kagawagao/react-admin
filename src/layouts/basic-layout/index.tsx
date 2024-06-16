import { useAuth } from '@/hooks/auth';
import { LayoutProps } from '@/interfaces/layout';
import routes from '@/routes';
import history from '@/utils/history';
import { ProLayout, ProLayoutProps } from '@ant-design/pro-components';
import { camelCase, upperFirst } from 'lodash';
import { FC, useEffect, useMemo } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

const BasicLayout: FC<LayoutProps> = () => {
  const location = useLocation();
  const { isLogin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogin) {
      navigate('/login');
    }
  }, [isLogin, navigate]);

  const route = useMemo<Required<ProLayoutProps>['route']>(() => {
    // TODO: permission filter
    return routes[0];
  }, []);

  return (
    <ProLayout
      title={upperFirst(camelCase(process.env.APP_NAME))}
      location={location}
      layout="mix"
      route={route}
      menuProps={{
        onClick: ({ key }) => {
          history.push(key);
        },
      }}
      onMenuHeaderClick={() => history.push('/')}
    >
      <Outlet />
    </ProLayout>
  );
};

export default BasicLayout;
