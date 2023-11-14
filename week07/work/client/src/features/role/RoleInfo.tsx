import { Button, Descriptions } from 'antd';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function RoleInfo() {
  const { id } = useParams();
  const [infoData, setInfoData] = useState({ name: '', description: '' });
  useEffect(() => {
    fetch(`/api/role/${id}`, {
      method: 'GET',
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setInfoData({ name: data.name, description: data.description });
      });
  }, []);

  return (
    <React.Fragment>
      <Descriptions
        title="角色信息"
        bordered
        column={1}
        labelStyle={{ fontSize: 16 }}
      >
        <Descriptions.Item label="角色名称">{infoData.name}</Descriptions.Item>
        <Descriptions.Item label="角色描述">
          {infoData.description}
        </Descriptions.Item>
      </Descriptions>
      <Button
        style={{ float: 'right', marginTop: 20 }}
        type="primary"
        size="large"
        onClick={() => {
          window.location.hash = '/role';
        }}
      >
        返回
      </Button>
    </React.Fragment>
  );
}
