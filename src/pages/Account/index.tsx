import React from 'react';
import ProTable from '@ant-design/pro-table';
import { listMyAdminAccounts } from '@/services/account';


const Account = () => {

  const queryAccounts = async (params) => {
    console.log('queryAccounts:', params);
    const result = await listMyAdminAccounts(params);
    console.log('queryAccounts:', result);
    const { data } = result || {};
    return result;
  }

  const columns = [
    {
      title: 'name',
      dataIndex: 'name',
    },
    {
      title: 'uid',
      dataIndex: 'uid',
    }
  ];

  const pagination = {current: 1, pageSize: 10};

  return (
    <ProTable
      pagination={pagination}
      columns={columns}
      rowKey="uid"
      dateFormatter="string"
      toolBarRender={false}
      search={false}
      request={async (params, sort, filter) => {
        return queryAccounts(params);
      }}
      defaultSize={'small'}
    />
  );
}

export default Account;