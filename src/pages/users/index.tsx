import UserPermissionAuthorize from '@/components/user-permission-authorize';
import { PageContainer } from '@ant-design/pro-components';
import { Button } from 'antd';
import { FC } from 'react';

const UserList: FC = () => {
  return (
    <PageContainer>
      <UserPermissionAuthorize code="add-user" name="add-user" parent="user-manage">
        <Button type="primary">Add</Button>
      </UserPermissionAuthorize>
    </PageContainer>
  );
};

export default UserList;
