import { EnvironmentOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
import { getTenants, getTenant } from '../../utils/storage';

const TenantDropdown = () => {

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

  const items = buildItems();
  const tenant = getTenant();
  return (
    <span style={{ marginRight: 10 }}>
      <Dropdown menu={{ items }}>
        <a onClick={(e) => e.preventDefault()}>
          <Space>
            <EnvironmentOutlined />
            {tenant}
          </Space>
        </a>
      </Dropdown>
    </span>
  );
}

export default TenantDropdown;