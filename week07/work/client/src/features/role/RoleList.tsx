import { Button, Space, Table, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { TableRowSelection } from 'antd/es/table/interface';
import {
  roleListData,
  roleListItem,
  roleListSelectedRowKeys,
  setRoleData,
  setSelectedRowKeys,
} from './roleListSlice';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import EditButton from './RoleEditButton';
import { useEffect, useState } from 'react';
import React from 'react';

function RoleList() {
  const [showMessage, setShowMessage] = useState(false);
  const roleData = useAppSelector(roleListData);
  const selectedRowKeys = useAppSelector(roleListSelectedRowKeys);
  const dispatch = useAppDispatch();
  const rowSelection: TableRowSelection<roleListItem> = {
    selectedRowKeys,
    onChange: (selectedRowKeys, selectedRows) => {
      dispatch(setSelectedRowKeys(selectedRowKeys));
    },
  };
  // 删除失败提示
  useEffect(() => {
    if (showMessage) {
      message.error(`存在角色成员，删除失败`, 0.5, () => {
        setShowMessage(false);
      });
    }
  }, [showMessage]);

  // 列设置
  const columns: ColumnsType<roleListItem> = [
    {
      title: '职位名称',
      dataIndex: 'name',
    },
    {
      title: '描述',
      dataIndex: 'description',
    },
    {
      title: '操作',
      dataIndex: 'id',
      render: (item, record) => {
        return (
          <>
            <Space size={'large'}>
              <EditButton item={record} title="编辑" method="PUT"></EditButton>
              <Button danger onClick={() => dlt(record.id)}>
                删除
              </Button>
            </Space>
          </>
        );
      },
    },
  ];

  // 批量删除
  function dltBatch() {
    for (const i in selectedRowKeys) {
      fetch(` /api/role/${selectedRowKeys[i]}`, {
        method: 'DELETE',
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          if (data.is_deleted !== '成功删除') setShowMessage(true);
        });
    }
    fetch('/api/role', {
      method: 'GET',
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        dispatch(setRoleData(data.data.result));
      });
  }

  // 删除单个数据
  function dlt(role: string) {
    fetch(` /api/role/${role}`, {
      method: 'DELETE',
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.is_deleted !== '成功删除') setShowMessage(true);
      });
    fetch('/api/role', {
      method: 'GET',
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        dispatch(setRoleData(data.data.result));
      });
  }

  // 行双击
  function handleRowDoubleClick(
    event: React.MouseEvent<HTMLTableRowElement, MouseEvent>,
    record: roleListItem,
  ): void {
    // 做一个拦截，防止双击编辑栏弹出信息框
    const row = (event.target as Element).closest('td');
    if (row) {
      window.location.hash = `/role/${record.id}`;
    }
  }

  return (
    <React.Fragment>
      <Space size={'large'}>
        <EditButton
          item={{ id: '', name: '', description: '' }}
          title="+ 新建角色"
          method="POST"
        ></EditButton>
        <Button type="primary" danger onClick={dltBatch}>
          删除
        </Button>
      </Space>
      <Table
        style={{ marginTop: 20 }}
        rowKey={'id'}
        pagination={false}
        rowSelection={rowSelection}
        columns={columns}
        dataSource={roleData.map((item) => {
          return { ...item, key: item.id };
        })}
        onRow={(record) => ({
          onDoubleClick: (event) => handleRowDoubleClick(event, record),
        })}
      />
    </React.Fragment>
  );
}

export default RoleList;
