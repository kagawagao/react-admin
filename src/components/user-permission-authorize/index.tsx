import { UserPermission } from '@/interfaces/permission';
import { FC, ReactElement, cloneElement, useMemo } from 'react';

export enum UserPermissionBehavior {
  /**
   * @description disable the component
   */
  Disabled = 'disabled',
  /**
   * @description hide the component
   */
  Hide = 'hide',
}

// FIXME: mock permissions
const permissions: string[] = [];

export interface UserPermissionAuthorizeProps extends UserPermission {
  behavior?: UserPermissionBehavior;
  children: ReactElement;
}

const UserPermissionAuthorize: FC<UserPermissionAuthorizeProps> = ({
  children,
  code,
  behavior = UserPermissionBehavior.Hide,
}) => {
  const authorized = useMemo(() => permissions.includes(code), [code]);

  return authorized
    ? children
    : behavior === UserPermissionBehavior.Disabled
      ? cloneElement(children, {
          disabled: true,
        })
      : null;
};

export default UserPermissionAuthorize;
