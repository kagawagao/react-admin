import { AppConfig } from '@pixas/cli';

const config: AppConfig = {
  name: 'react-admin',
  bundler: 'mako', // default is 'webpack', you can use mako or vite as well
  description: 'admin dashboard with react and antd',
  dts: {
    modules: [
      {
        namespace: 'pet-store',
        url: 'https://petstore.swagger.io/v2/swagger.json',
      },
    ],
  },
};

export default config;
