import { definePermissions } from '@/utils/permission';

const menuPermissions = definePermissions({
  userManage: {
    code: 'user-manage',
    name: '用户管理',
  },
  permissionManage: {
    code: 'permission-manage',
    name: '权限管理',
  },
});

export default menuPermissions;
