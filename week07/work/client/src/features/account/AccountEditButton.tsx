import { useState } from 'react';
import { Button, Form, Input, Modal, Select } from 'antd';
import { accountListItem, addData, updateData } from './accountListSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { roleListData } from '../role/roleListSlice';
import React from 'react';

// 返回一个用户编辑（新建用户）按钮
function AccountEditButton(props: {
  item: accountListItem;
  title: string;
  method: string;
}) {
  const dispatch = useAppDispatch();
  const roleData = useAppSelector(roleListData);
  const selectoptions = roleData.map((item) => {
    return { value: item.id, label: item.name };
  });
  // 更新或者添加数据
  const handleOk = () => {
    form
      .validateFields()
      .then((data) => {
        const pro = {
          username: data.username,
          password: data.password,
          role: data.role,
          email: data.email,
          phone: data.phone,
        };
        if (props.method === 'PUT') {
          fetch(`/api/accounts/${item.id}`, {
            method: props.method,
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(pro),
          })
            .then((res) => {
              if (res.status === 200) {
                return res.json();
              } else throw new Error('PUT请求错误');
            })
            .then((data) => {
              dispatch(updateData(data));
            })
            .catch((error) => {
              throw new Error(`请求数据失败：${error.message}`);
            });
          setOpen(false);
        } else {
          fetch(`/api/accounts`, {
            method: props.method,
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(pro),
          })
            .then((res) => {
              if (res.status === 200) {
                return res.json();
              } else throw new Error('POST请求错误');
            })
            .then((data) => {
              dispatch(addData(data));
            })
            .catch((error) => {
              throw new Error(`请求数据失败：${error.message}`);
            });
          setOpen(false);
        }
        form.setFieldValue('password_', '');
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // 取消按钮
  const handleCancel = () => {
    form.resetFields();
    setOpen(false);
  };

  const item = props.item;
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const initInfo = {
    username: item.username,
    password: item.password,
    email: item.email,
    phone: item.phone,
    role: item.role,
  };

  return (
    <React.Fragment>
      <Button type="primary" onClick={() => setOpen(true)}>
        {props.title}
      </Button>
      <Modal
        destroyOnClose={true}
        title="用户信息"
        centered
        open={open}
        onOk={handleOk}
        okText="提交"
        cancelText="取消"
        width={800}
        onCancel={handleCancel}
      >
        <Form
          form={form}
          {...layout}
          name="control-hooks"
          style={{ maxWidth: 600 }}
          initialValues={initInfo}
        >
          {/* 名称 */}
          <Form.Item
            name="username"
            label="名称："
            rules={[
              { required: true, message: '请输入名称' },
              { max: 20, message: '名称不得超过20个字符' },
              { min: 4, message: '名称不得小于4个字符' },
              {
                pattern: new RegExp('^[a-zA-Z0-9]+$', 'g'),
                message: '只允许包含数字和英文',
              },
            ]}
          >
            <Input />
          </Form.Item>
          {/* 密码 */}
          <Form.Item
            label="用户密码："
            name="password"
            rules={[
              { required: true, message: '请输入密码' },
              { max: 20, message: '密码不得超过20个字符' },
              { min: 6, message: '密码不得小于6个字符' },
              {
                pattern: new RegExp('^(?=.*d)(?=.*[A-Z])(?=.*[a-z]).+$', 'g'),
                message: '数字、小写英文、大写英文都需要包括',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="确认密码："
            name="password_"
            rules={[
              { required: true, message: '请输入密码' },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject('两次密码输入不一致');
                },
              }),
            ]}
          >
            <Input />
          </Form.Item>
          {/* 职位 */}
          <Form.Item name="role" label="Role" rules={[{ required: true }]}>
            <Select
              options={selectoptions}
              placeholder="选择职位"
              allowClear
            ></Select>
          </Form.Item>
          {/* 邮件 */}
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                pattern: new RegExp(
                  '^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,6})*$',
                  'g',
                ),
                message: '邮箱地址不正确',
              },
            ]}
          >
            <Input />
          </Form.Item>
          {/* 电话号码 */}
          <Form.Item
            name="phone"
            label="Phone"
            rules={[
              {
                pattern: new RegExp('^1[3-9]\\d{9}$'),
                message: '电话不正确',
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </React.Fragment>
  );
}

export default AccountEditButton;
