import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import {
  IdcardOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SolutionOutlined,
  HeartOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme } from 'antd';
import type { MenuProps } from 'antd';
import Experience from './features/experience/experience';
import Account from './features/account/Account';
import Role from './features/role/Role';
import { useAppDispatch } from './app/hooks';
import {
  accountListItem,
  setData,
  setPagination,
} from './features/account/accountListSlice';
import { roleListItem, setRoleData } from './features/role/roleListSlice';
import AccountInfo from './features/account/AccountInfo';
import RoleInfo from './features/role/RoleInfo';

const { Header, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];
const App: React.FC = () => {
  const dispatch = useAppDispatch();
  // 侧边栏坍塌
  const [collapsed, setCollapsed] = useState(false);
  // 侧边栏元素
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  // 创建一个侧边栏元素
  function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
    } as MenuItem;
  }
  // 初始化数据
  useEffect(() => {
    fetch('/api/accounts?pageIndex=0&pageSize=10', {
      method: 'GET',
    })
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((data) => {
        dispatch(setData(data.data.result as accountListItem[]));
        dispatch(
          setPagination({
            total: data.data.pageRow,
            pageSize: data.data.pageSize,
            current: data.data.pageIndex + 1,
          }),
        );
      });
    fetch('/api/role', {
      method: 'GET',
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        dispatch(setRoleData(data.data.result as roleListItem[]));
      });
  }, []);

  return (
    <Layout style={{ minHeight: 900 }}>
      {/* 侧边栏 */}
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div
          style={{
            color: 'white',
            margin: 16,
            alignItems: 'center',
            textAlign: 'center',
            fontSize: 'large',
          }}
        >
          后台管理系统
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[
            window.location.hash.slice(2) === ''
              ? 'experience'
              : window.location.hash.slice(2),
          ]}
          items={[
            getItem('学习心得', 'experience', <HeartOutlined />),
            getItem('账户管理', 'manage', <SolutionOutlined />, [
              getItem('账户列表', 'account', <TeamOutlined />),
              getItem('角色管理', 'role', <IdcardOutlined />),
            ]),
          ]}
          onClick={(e) => {
            if (e.key === 'experience') {
              window.location.hash = '';
            } else window.location.hash = '/' + e.key;
          }}
          defaultOpenKeys={['manage']}
        />
      </Sider>
      {/* 右侧内容 */}
      <Layout style={{}}>
        {/* 表头 */}
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
        {/* 内容 */}
        <div
          style={{
            margin: '24px 16px',
            minWidth: 900,
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <Routes>
            <Route path="/" element={<Experience />}></Route>
            <Route path="/account" element={<Account />}></Route>
            <Route path="/role" element={<Role />}></Route>
            <Route path="/account/:id" element={<AccountInfo />}></Route>
            <Route path="/role/:id" element={<RoleInfo />}></Route>
          </Routes>
        </div>
      </Layout>
    </Layout>
  );
};

export default App;
