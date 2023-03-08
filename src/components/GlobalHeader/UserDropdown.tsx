import { Avatar, Space } from 'antd';
import { getCurrentUser } from '../../utils/storage';
import styles from './index.less';

const DEFAULT_AVATAR = 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png';
const UserDropdown = () => {

  const currentUser = getCurrentUser();
  return currentUser && currentUser.name ? (
    <Space>
      {
        currentUser.avatar ? <Avatar size="small" className={styles.avatar} src={currentUser.avatar} alt="avatar" /> :
          <Avatar size="small" className={styles.avatar} src={DEFAULT_AVATAR} alt="avatar" />
      }
      <span style={{ color: 'black' }}>{currentUser.name}</span>
    </Space>
  ) : (
    <span className={`${styles.action} ${styles.account}`}>
      未登录
    </span>
  );
}

export default UserDropdown;