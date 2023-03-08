import { LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Menu, Spin } from 'antd';
import React from 'react';
import type { ConnectProps } from 'umi';
import { history, connect } from 'umi';
import type { ConnectState } from '@/models/connect';
import type { CurrentUser } from '@/models/user';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';

const AvatarDropdown2 = ({currentUser}) => {

  const onMenuClick = (event: { key: React.Key; keyPath: React.Key[]; item: React.ReactInstance }) => {
    const { key } = event;
    history.push(`/account/${key}`);
  };

  return currentUser && currentUser.name ? (
    <span className={`${styles.action} ${styles.account}`}>
      {/**<Avatar size="small" className={styles.avatar} src={currentUser.avatar} alt="avatar" />*/}
      <span style={{color: 'black'}}>{currentUser.name}</span>
    </span>
  ) : (
    <span className={`${styles.action} ${styles.account}`}>
      no user
    </span>
  );
}

export default AvatarDropdown2;