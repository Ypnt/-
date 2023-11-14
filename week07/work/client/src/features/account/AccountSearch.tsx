import { Input, Select, DatePicker, Button, Space, Alert } from 'antd';
import './AccountSearch.css';
import dayjs from 'dayjs';
import {
  accountSearchData,
  accountSearchItem,
  setSearchData,
} from './accountSearchSlice';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  setData,
  setPagination,
  accountListPagination,
  accountListSelectedRowKeys,
} from './accountListSlice';
import React, { useState } from 'react';
import { accountListItem } from './accountListSlice';
import EditButton from './AccountEditButton';
import { roleListData } from '../role/roleListSlice';

export default function AccountSearch() {
  const { RangePicker } = DatePicker;
  const dispatch = useAppDispatch();
  const roleData = useAppSelector(roleListData);
  let selectoptions = roleData.map((item) => {
    return { value: item.id, label: item.name };
  });
  selectoptions = [
    {
      value: '',
      label: '全部',
    },
    ...selectoptions,
  ];
  // 查找信息
  const searchData = useAppSelector(accountSearchData);
  // 分页信息
  const paginationData = useAppSelector(accountListPagination);
  // 被多选的行
  const selectedRowKeys = useAppSelector(accountListSelectedRowKeys);
  // 错误信息框是否可见
  const [visible, setVisible] = useState(false);
  // 查找错误信息
  const [message, setMessage] = useState('');
  // 创建、更新时间区域
  const [date1State, setDate1State] = useState<any>([]);
  const [date2State, setDate2State] = useState<any>([]);
  // 搜索的变量：姓名、电话、邮件、职责、创建时间、更新时间
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [createtimeS, setCreatetimeS] = useState(0);
  const [createtimeD, setCreatetimeD] = useState(0);
  const [updatetimeS, setUpdateTimeS] = useState(0);
  const [updatetimeD, setUpdateTimeD] = useState(0);

  // 验证查找数据是否规范
  function verify() {
    let m = '';
    if (!/^[a-zA-Z0-9]{4,20}$/.test(username) && username !== '')
      m += '名字只能包含英文或数字，长度4-20以内\n';
    if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email) &&
      email !== ''
    )
      m += '邮箱格式错误\n';
    if (!/^1[3-9][0-9]{9}$/.test(phone) && phone !== '')
      m += '手机号码为13位数字，第一位为1，第二位大于2\n';
    if (m.length > 0) {
      setMessage(m);
      setVisible(true);
      return false;
    } else {
      setVisible(false);
      return true;
    }
  }

  // 查找按钮查找用户
  function searchClickedHandle() {
    if (verify()) {
      // 更新搜索信息
      dispatch(
        setSearchData({
          username: username,
          email: email,
          phone: phone,
          role: role,
          createtimeS: createtimeS,
          createtimeD: createtimeD,
          updatetimeS: updatetimeS,
          updatetimeD: updatetimeD,
        } as accountSearchItem),
      );
      // 设置路径
      const path = `/api/accounts?pageIndex=${0}&pageSize=${
        paginationData.pageSize
      }${username === '' ? '' : '&username=' + username}${
        email === '' ? '' : '&email=' + email
      }${phone === '' ? '' : '&phone=' + phone}${
        role === '' ? '' : '&role=' + role
      }${createtimeS === 0 ? '' : '&createBeginTime=' + createtimeS}${
        createtimeD === 0 ? '' : '&createEndTime=' + createtimeD
      }${updatetimeS === 0 ? '' : '&updateBeginTime=' + updatetimeS}${
        updatetimeD === 0 ? '' : '&updateEndTime=' + updatetimeD
      }`;
      fetch(path, {
        method: 'GET',
      })
        .then((res) => {
          if (res.status === 200) {
            return res.json();
          }
        })
        .then((data) => {
          // 更新数据
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
  }
  // 重置按钮
  function reset() {
    setUsername('');
    setPhone('');
    setEmail('');
    setRole('');
    setCreatetimeS(0);
    setCreatetimeD(0);
    setUpdateTimeS(0);
    setUpdateTimeD(0);
    setDate1State(new Date());
    setDate2State(new Date());
  }
  function dlt(e: string) {
    fetch(` /api/accounts/${e}`, {
      method: 'DELETE',
    });
  }
  // 批量删除
  function dltBatch() {
    for (const i in selectedRowKeys) {
      dlt(selectedRowKeys[i] as string);
    }
    // 设置路径，请求新数据
    const path = `/api/accounts?pageIndex=${
      paginationData.current - 1
    }&pageSize=${paginationData.pageSize}${
      searchData.username === '' ? '' : '&username=' + searchData.username
    }${searchData.email === '' ? '' : '&email=' + searchData.email}${
      searchData.phone === '' ? '' : '&phone=' + searchData.phone
    }${searchData.role === '' ? '' : '&role=' + searchData.username}${
      createtimeS === 0 ? '' : '&createBeginTime=' + createtimeS
    }${createtimeD === 0 ? '' : '&createEndTime=' + createtimeD}${
      updatetimeS === 0 ? '' : '&updateBeginTime=' + updatetimeS
    }${updatetimeD === 0 ? '' : '&updateEndTime=' + updatetimeD}`;
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

  return (
    <React.Fragment>
      {visible && (
        <Alert
          message={message}
          type={message === '' ? 'success' : 'warning'}
          closable
          afterClose={() => {
            setVisible(false);
          }}
        />
      )}
      <Space size="small">
        <span>用户名</span>
        <Input
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        ></Input>
        <span>手机号</span>
        <Input
          value={phone}
          onChange={(e) => {
            setPhone(e.target.value);
          }}
        ></Input>
        <span>邮箱</span>
        <Input
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        ></Input>
        <span>角色</span>
        <Select
          options={selectoptions}
          value={role}
          onChange={(value) => {
            setRole(value);
          }}
        ></Select>
        <span>创建时间：</span>
        <RangePicker
          value={date1State}
          onChange={(dates, dateStrings) => {
            setDate1State(dates);
            setCreatetimeS(dayjs(dateStrings[0]).valueOf());
            setCreatetimeD(dayjs(dateStrings[1]).valueOf());
          }}
        ></RangePicker>
        <span>更新时间：</span>
        <RangePicker
          value={date2State}
          onChange={(dates, dateStrings) => {
            setDate2State(dates);
            setUpdateTimeS(dayjs(dateStrings[0]).valueOf());
            setUpdateTimeD(dayjs(dateStrings[1]).valueOf());
          }}
        ></RangePicker>
        <Button type="primary" onClick={searchClickedHandle}>
          查询
        </Button>
        <Button onClick={reset}>重置</Button>
      </Space>
      <Space size="middle" style={{ marginTop: 10, marginBottom: 10 }}>
        <EditButton
          item={
            {
              id: '',
              username: '',
              password: '',
              email: '',
              phone: '',
              role: '',
              createtime: 0,
              updatetime: 0,
            } as accountListItem
          }
          title="+ 新建账户"
          method="POST"
        ></EditButton>
        <Button type="primary" danger onClick={dltBatch}>
          删除
        </Button>
      </Space>
    </React.Fragment>
  );
}
