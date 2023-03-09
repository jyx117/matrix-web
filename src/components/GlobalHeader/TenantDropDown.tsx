import {useState} from 'react';
import { EnvironmentOutlined } from '@ant-design/icons';
import { Dropdown, Space, Button } from 'antd';
import { getTenants, getTenant, updateCurrentTenant } from '../../utils/storage';

const TenantDropdown = () => {

  const [currentTenant, setCurrentTenant] = useState<any>(getTenant());

  const buildItems = () => {
    const tenants = getTenants();
    // console.log('buildItems:', tenants);
    if (!tenants || tenants?.length < 1) {
      return [];
    }

    return tenants.map(tenant => {
      return {
        key: tenant,
        label: tenant,
      };
    });
  }

  const changeTenant = (value) => {
    console.log('changeTenant:', value);
    const {key} = value || {};
    updateCurrentTenant(key);
    setCurrentTenant(key);
  }

  const items = buildItems();
  return (
    <span style={{ marginRight: 10 }}>
      <Dropdown menu={{
        items,
        selectable: true,
        defaultSelectedKeys: [!currentTenant ? '' : currentTenant],
        onClick: changeTenant,
      }}>
        <Button type="text" onClick={(e) => e.preventDefault()}>
          <Space>
            <EnvironmentOutlined />
            {currentTenant}
          </Space>
        </Button>
      </Dropdown>
    </span>
  );
}

export default TenantDropdown;