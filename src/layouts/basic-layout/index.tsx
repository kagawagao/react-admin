import { LayoutProps } from '@/interfaces/layout';
import routes from '@/routes';
import history from '@/utils/history';
import { ProLayout } from '@ant-design/pro-components';
import { camelCase, upperFirst } from 'lodash';
import { FC } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

const BasicLayout: FC<LayoutProps> = () => {
  const location = useLocation();
  return (
    <ProLayout
      title={upperFirst(camelCase(process.env.APP_NAME))}
      location={location}
      layout="mix"
      route={routes[0]}
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
