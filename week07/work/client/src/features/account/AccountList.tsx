import { Button, Pagination, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { TableRowSelection } from 'antd/es/table/interface';
import {
  accountListData,
  accountListItem,
  accountListPagination,
  setPaginationCurrent,
  setData,
  setPagination,
  accountListSelectedRowKeys,
  setSelectedRowKeys,
} from './accountListSlice';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import dayjs from 'dayjs';
import {
  accountSearchData,
  accountSearchItem,
  setSearchData,
} from './accountSearchSlice';
import EditButton from './AccountEditButton';
import { roleListData } from '../role/roleListSlice';
import React from 'react';

function AccountList() {
  const paginationData = useAppSelector(accountListPagination);
  const data = useAppSelector(accountListData);
  const roleData = useAppSelector(roleListData);
  const searchData = useAppSelector(accountSearchData);
  const selectedRowKeys = useAppSelector(accountListSelectedRowKeys);
  const dispatch = useAppDispatch();
  // 多选按钮
  const rowSelection: TableRowSelection<accountListItem> = {
    selectedRowKeys,
    onChange: (selectedRowKeys, selectedRows) => {
      dispatch(setSelectedRowKeys(selectedRowKeys));
    },
  };
  const columns: ColumnsType<accountListItem> = [
    {
      title: '用户名',
      dataIndex: 'username',
      sorter: (a, b) => a.username.localeCompare(b.username),
    },
    {
      title: '手机号',
      dataIndex: 'phone',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
    },
    {
      title: '创建时间',
      dataIndex: 'createtime',
      render: (item) => {
        return (
          <div>{dayjs(item).locale('zh-cn').format('M月D日HH:mm:ss')}</div>
        );
      },
      sorter: (a, b) => a.createtime - b.createtime,
    },
    {
      title: '最近更新时间',
      dataIndex: 'updatetime',
      render: (item) => {
        return (
          <div>{dayjs(item).locale('zh-cn').format('M月D日HH:mm:ss')}</div>
        );
      },
      sorter: (a, b) => a.updatetime - b.updatetime,
    },
    {
      title: '角色',
      dataIndex: 'role',
      sorter: (a, b) => a.role.localeCompare(b.role),
      render: (item, record) => {
        return (
          <Tag>{roleData.find((item) => item.id === record.role)?.name}</Tag>
        );
      },
    },
    {
      title: '操作',
      dataIndex: 'id',
      render: (item, record) => {
        return (
          <>
            <EditButton item={record} title="编辑" method="PUT"></EditButton>
            <Button
              style={{ marginLeft: 20 }}
              danger
              onClick={() => dlt(record.id)}
            >
              删除
            </Button>
          </>
        );
      },
    },
  ];

  function getPath(size: number, cur: number) {
    return `/api/accounts?pageIndex=${cur}&pageSize=${size}${
      searchData.username === '' ? '' : '&username=' + searchData.username
    }${searchData.email === '' ? '' : '&email=' + searchData.email}${
      searchData.phone === '' ? '' : '&phone=' + searchData.phone
    }${searchData.role === '' ? '' : '&role=' + searchData.role}${
      searchData.createtimeS === 0
        ? ''
        : '&createBeginTime=' + searchData.createtimeS
    }${
      searchData.createtimeD === 0
        ? ''
        : '&createEndTime=' + searchData.createtimeD
    }${
      searchData.updatetimeS === 0
        ? ''
        : '&updateBeginTime=' + searchData.updatetimeS
    }${
      searchData.updatetimeD === 0
        ? ''
        : '&updateEndTime=' + searchData.updatetimeD
    }`;
  }

  // 删除单个元素
  function dlt(e: string) {
    fetch(` /api/accounts/${e}`, {
      method: 'DELETE',
    }).then((res) => {
      if (res.status === 200) {
        const path = getPath(
          paginationData.pageSize,
          paginationData.current - 1,
        );
        fetch(path, {
          method: 'GET',
        })
          .then((res) => {
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
      }
    });
  }

  // 双击行事件
  function handleRowDoubleClick(
    event: React.MouseEvent<HTMLTableRowElement, MouseEvent>,
    record: accountListItem,
  ): void {
    const row = (event.target as Element).closest('td');
    if (row) {
      window.location.hash = `/account/${record.id}`;
    }
  }

  return (
    <React.Fragment>
      <Table
        rowKey={'id'}
        pagination={false}
        rowSelection={rowSelection}
        columns={columns}
        dataSource={data.map((item) => {
          return { ...item, key: item.id };
        })}
        onRow={(record) => ({
          onDoubleClick: (event) => handleRowDoubleClick(event, record),
        })}
      />
      <Pagination
        style={{ marginTop: 20 }}
        current={paginationData.current}
        total={paginationData.total}
        showQuickJumper
        onChange={(page) => {
          dispatch(setPaginationCurrent(page));
          dispatch(
            setSearchData({
              username: searchData.username,
              email: searchData.email,
              phone: searchData.phone,
              role: searchData.role,
              createtimeS: searchData.createtimeS,
              createtimeD: searchData.createtimeD,
              updatetimeS: searchData.updatetimeS,
              updatetimeD: searchData.updatetimeD,
            } as accountSearchItem),
          );
          const path = getPath(paginationData.pageSize, page - 1);
          console.log(path);
          fetch(path, {
            method: 'GET',
          })
            .then((res) => {
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
        }}
      ></Pagination>
    </React.Fragment>
  );
}

export default AccountList;
