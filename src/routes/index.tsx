import { RouteRecord } from '@/interfaces/route';
import menuPermissions from '@/permissions/menu';
import { DatabaseOutlined, UserOutlined } from '@ant-design/icons';
import { lazy } from 'react';

const routes: RouteRecord[] = [
  {
    path: '/',
    Component: lazy(() => import('@/layouts/basic-layout')),
    name: 'Home',
    children: [
      {
        index: true,
        hideInMenu: true,
        Component: lazy(() => import('@/pages/home')),
      },
      {
        path: '/users',
        name: '用户管理',
        icon: <UserOutlined />,
        Component: lazy(() => import('@/pages/users')),
        permission: menuPermissions.userManage,
      },
      {
        path: '/permissions',
        name: '权限管理',
        icon: <DatabaseOutlined />,
        Component: lazy(() => import('@/pages/permissions')),
        permission: menuPermissions.userManage,
      },
    ],
  },
  {
    path: '/login',
    Component: lazy(() => import('@/layouts/full-layout')),
    name: 'Login',
    hideInMenu: true,
    children: [
      {
        index: true,
        Component: lazy(() => import('@/pages/login')),
      },
    ],
  },
];

export default routes;
