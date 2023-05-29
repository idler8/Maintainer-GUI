import { Form, Input, Drawer, Button, Select, InputNumber, Space } from "antd";
import apiServer from "apiServer";
import { useEffect, useState } from "react";

export default function Service({
  modify,
  onClose,
}: {
  modify: string;
  onClose: Function;
}) {
  const [form] = Form.useForm();
  useEffect(() => {
    if (modify) {
      apiServer.Restful.Services.find(modify).then((service) => {
        form.setFieldsValue(service);
      });
    } else {
      form.setFieldsValue({
        protocol: "http",
        port: 80,
        retries: 5,
        connect_timeout: 60000,
        write_timeout: 60000,
        read_timeout: 60000,
        enabled: true,
      });
    }
  }, [modify]);
  const [loading, setLoading] = useState(false);
  const handleSubmit = async () => {
    setLoading(true);
    try {
      const values = await form.validateFields();
      if (modify) {
        await apiServer.Restful.Services.cover(modify, values);
      } else {
        await apiServer.Restful.Services.create(values);
      }
      onClose(true);
    } catch (e) {
      setLoading(false);
    }
  };
  return (
    <Drawer
      open
      width={750}
      title={modify ? "修改服务" : "新增服务"}
      onClose={() => onClose(false)}
      footer={
        <Button loading={loading} type="primary" onClick={handleSubmit}>
          确认提交
        </Button>
      }
    >
      <Form form={form} layout="vertical" autoComplete="off">
        <Form.Item label="名称" name="name">
          <Input />
        </Form.Item>
        <Form.Item label="描述" name="description">
          <Input.TextArea />
        </Form.Item>
        <Form.Item label="标签" name="tags">
          <Select
            mode="tags"
            open={false}
            style={{ width: "100%" }}
            tokenSeparators={[","]}
          />
        </Form.Item>
        <Space.Compact>
          <Form.Item label="协议" name="protocol">
            <Select style={{ width: 100 }}>
              <Select.Option value="http">http://</Select.Option>
              <Select.Option value="https">https://</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="主机"
            name="host"
            rules={[{ required: true, message: "主机地址必须输入" }]}
          >
            <Input style={{ width: 300 }} />
          </Form.Item>
          <Form.Item label="端口" name="port">
            <InputNumber max={65536} />
          </Form.Item>
          <Form.Item label="路径" name="path">
            <Input style={{ width: 200 }} />
          </Form.Item>
        </Space.Compact>
        <Space.Compact>
          <Form.Item label="重试" name="retries">
            <InputNumber style={{ width: 80 }} max={20} />
          </Form.Item>
          <Form.Item label="连接超时" name="connect_timeout">
            <InputNumber style={{ width: 144 }} />
          </Form.Item>
          <Form.Item label="写入超时" name="write_timeout">
            <InputNumber style={{ width: 144 }} />
          </Form.Item>
          <Form.Item label="读取超时" name="read_timeout">
            <InputNumber style={{ width: 144 }} />
          </Form.Item>
        </Space.Compact>
      </Form>
    </Drawer>
  );
}
