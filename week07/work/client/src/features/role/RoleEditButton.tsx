import React, { useState } from 'react';
import { Button, Form, Input, Modal } from 'antd';
import { addRoleData, roleListItem, updateRoleData } from './roleListSlice';
import { useAppDispatch } from '../../app/hooks';
import TextArea from 'antd/es/input/TextArea';

function RoleEditButton(props: {
  item: roleListItem;
  title: string;
  method: string;
}) {
  const dispatch = useAppDispatch();
  // 更新或者新建角色
  const handleOk = () => {
    form
      .validateFields()
      .then((data) => {
        console.log(data);
        if (props.method === 'POST') {
          fetch('/api/role', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name: data.name,
              description: data.description,
            }),
          })
            .then((res) => {
              if (res.status === 200) {
                return res.json();
              } else throw Error('POST请求失败');
            })
            .then((data) => {
              dispatch(addRoleData(data));
            })
            .catch((error) => {
              console.error(error);
            });
          setOpen(false);
        } else {
          fetch(`/api/role/${item.id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name: data.name,
              description: data.description,
            }),
          })
            .then((res) => {
              if (res.status === 200) {
                return res.json();
              } else throw Error('PUT请求失败');
            })
            .then((data) => {
              dispatch(updateRoleData(data));
            })
            .catch((error) => {
              console.error(error);
            });
          setOpen(false);
        }
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
    name: item.name,
    description: item.description,
  };

  return (
    <React.Fragment>
      <Button type="primary" onClick={() => setOpen(true)}>
        {props.title}
      </Button>
      <Modal
        destroyOnClose={true}
        title="角色信息"
        centered
        okText="提交"
        cancelText="取消"
        open={open}
        width={600}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          form={form}
          {...layout}
          name="control-hooks"
          style={{ maxWidth: 600 }}
          initialValues={initInfo}
        >
          {/* 角色名称 */}
          <Form.Item
            name="name"
            label="角色名称："
            rules={[
              { required: true, message: '请输入名称' },
              { max: 6, message: '名称不得超过6个字符' },
              { min: 2, message: '名称不得小于2个字符' },
              {
                pattern: new RegExp('^[\u4e00-\u9fa5a-zA-Z]{2,6}$', 'g'),
                message: '只允许中文和英文',
              },
            ]}
          >
            <Input />
          </Form.Item>
          {/* 描述 */}
          <Form.Item
            label="角色描述："
            name="description"
            rules={[
              { required: true, message: '请输入描述' },
              { max: 40, message: '描述不得超过40个字符' },
              { min: 4, message: '描述不得小于4个字符' },
              {
                pattern: new RegExp(
                  '^[\u4e00-\u9fa5a-zA-Z0-9，。；、]{4,40}$',
                  'g',
                ),
                message: '只能中文、英文、数字、逗号句号分号',
              },
            ]}
          >
            <TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>
    </React.Fragment>
  );
}

export default RoleEditButton;
