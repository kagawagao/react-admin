import UserPermissionAuthorize from '@/components/user-permission-authorize';
import { PageContainer } from '@ant-design/pro-components';
import { Button } from 'antd';
import { FC } from 'react';

const PermissionManage: FC = () => {
  return (
    <PageContainer>
      <UserPermissionAuthorize code="add-permission" name="add-permission" parent="permission-manage">
        <Button type="primary">Add</Button>
      </UserPermissionAuthorize>
    </PageContainer>
  );
};

export default PermissionManage;
