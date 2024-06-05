import { MenuDataItem } from '@ant-design/pro-components';
import { ComponentType, ReactNode } from 'react';

export interface RouteRecord extends MenuDataItem {
  path?: string;
  index?: boolean;
  element?: ReactNode | null;
  Component?: ComponentType | null;
  /**
   * 子路由
   */
  children?: RouteRecord[];
  meta?: Record<string, any>;
}
