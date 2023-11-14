import { Button, Descriptions } from 'antd';
import { roleListData } from '../role/roleListSlice';
import { useAppSelector } from '../../app/hooks';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function AccountInfo() {
  const { id } = useParams();
  const [infoData, setInfoData] = useState({
    id: '',
    username: '',
    password: '',
    email: '',
    role: '',
    phone: '',
    createtime: 0,
    updatetime: 0,
  });
  useEffect(() => {
    fetch(`/api/accounts/${id}`, {
      method: 'GET',
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setInfoData(data);
      });
  }, []);
  return (
    <React.Fragment>
      <Descriptions
        title="用户信息"
        bordered
        column={2}
        labelStyle={{ fontSize: 16 }}
      >
        <Descriptions.Item label="用户ID:" span={2}>
          {infoData.id}
        </Descriptions.Item>
        <Descriptions.Item label="用户名" span={2}>
          {infoData.username}
        </Descriptions.Item>
        <Descriptions.Item label="用户密码">
          {infoData.password}
        </Descriptions.Item>
        <Descriptions.Item label="邮箱">{infoData.email}</Descriptions.Item>
        <Descriptions.Item label="联系电话">{infoData.phone}</Descriptions.Item>
        <Descriptions.Item label="角色">
          {
            useAppSelector(roleListData).find(
              (item) => item.id === infoData.role,
            )?.name
          }
        </Descriptions.Item>
        <Descriptions.Item label="创建时间">
          {dayjs(infoData.createtime).locale('zh-cn').format('M月D日HH:mm:ss')}
        </Descriptions.Item>
        <Descriptions.Item label="更新时间">
          {dayjs(infoData.updatetime).locale('zh-cn').format('M月D日HH:mm:ss')}
        </Descriptions.Item>
      </Descriptions>
      <Button
        style={{ float: 'right', marginTop: 20 }}
        type="primary"
        size="large"
        onClick={() => {
          window.location.hash = '/account';
        }}
      >
        返回
      </Button>
    </React.Fragment>
  );
}
