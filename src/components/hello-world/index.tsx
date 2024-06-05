import { FC } from 'react';
import styles from './index.module.less';

const HelloWorld: FC = () => {
  return (
    <div>
      <h1>
        <span className={styles.hello}>Hello</span>, <span className={styles.world}>world</span>!
      </h1>
    </div>
  );
};

export default HelloWorld;
