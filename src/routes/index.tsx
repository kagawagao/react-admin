import { RouteRecord } from '@/interfaces/route';
import { UserOutlined } from '@ant-design/icons';
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
        name: 'Users Manage',
        icon: <UserOutlined />,
        Component: lazy(() => import('@/pages/users')),
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
