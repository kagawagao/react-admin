import AuthProvider from '@/components/auth-provider';
import { RouteRecord } from '@/interfaces/route';
import routes from '@/routes';
import history from '@/utils/history';
import { PageLoading, ProConfigProvider } from '@ant-design/pro-components';
import { App as AntdApp, ConfigProvider } from 'antd';
import { FC, Suspense, useLayoutEffect, useState } from 'react';
import { Route, Router, Routes } from 'react-router-dom';

function generateRoutes(routes: RouteRecord[]) {
  return routes.map(({ children, Component, ...route }, index) => {
    if (!Component) return null;
    const element = (
      <Suspense fallback={<PageLoading />}>
        <Component />
      </Suspense>
    );
    return (
      <Route
        key={route.path ?? index}
        path={route.index ? undefined : route.path}
        element={element}
        {...(route as any)}
      >
        {children && generateRoutes(children)}
      </Route>
    );
  });
}

const App: FC = () => {
  const [state, setState] = useState({
    action: history.action,
    location: history.location,
  });

  useLayoutEffect(() => history.listen(setState), []);
  return (
    <ProConfigProvider hashed={false}>
      <ConfigProvider theme={{ cssVar: true, hashed: false }}>
        <AntdApp>
          <AuthProvider>
            <Router
              basename={process.env.PUBLIC_PATH}
              navigator={history}
              location={state.location}
              navigationType={state.action}
            >
              <Routes>{generateRoutes(routes)}</Routes>
            </Router>
          </AuthProvider>
        </AntdApp>
      </ConfigProvider>
    </ProConfigProvider>
  );
};

export default App;
