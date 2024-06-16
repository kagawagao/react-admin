import { UserPermission } from '../interfaces/permission';

/**
 * 权限定义帮助函数
 * @param permission 权限信息
 */
export const definePermission = (permission: UserPermission): UserPermission => {
  const createdPermission: UserPermission = {
    ...permission,
  };

  if (!createdPermission.type) {
    createdPermission.type = 'OPERATE';
  }

  return createdPermission;
};

/**
 * 权限批量定义帮助函数
 * @param permissions 权限集
 */
export const definePermissions = <T extends Record<string, UserPermission>>(definePermissions: T): T => {
  const temp: Record<string, UserPermission> = {};
  Object.keys(definePermissions).forEach((key) => {
    temp[key] = definePermission(definePermissions[key]);
  });

  return temp as T;
};
