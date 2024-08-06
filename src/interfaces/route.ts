import { MenuDataItem } from '@ant-design/pro-components';
import { ComponentType, ReactNode } from 'react';
import { UserPermission } from './permission';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface RouteMeta extends Record<string, any> {}

export interface RouteRecord extends MenuDataItem {
  path?: string;
  index?: boolean;
  element?: ReactNode | null;
  Component?: ComponentType | null;
  /**
   * 子路由
   */
  children?: RouteRecord[];
  /**
   * 是否需要登录
   * @default true
   */
  auth?: boolean;
  /**
   * 菜单权限
   */
  permission?: UserPermission;
  meta?: RouteMeta;
}
