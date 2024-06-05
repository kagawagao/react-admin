import { LayoutProps } from '@/interfaces/layout';
import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import styles from './index.module.less';

const FullLayout: FC<LayoutProps> = () => {
  return (
    <div className={styles.fullLayout}>
      <Outlet />
    </div>
  );
};

export default FullLayout;
