import {
  Form,
  Input,
  Drawer,
  Button,
  Select,
  InputNumber,
  Space,
  Switch,
} from "antd";
import apiServer from "apiServer";
import { useEffect, useState } from "react";

export default function Route({
  action,
  modify,
  onClose,
}: {
  action: string;
  modify: string;
  onClose: Function;
}) {
  const [form] = Form.useForm();
  useEffect(() => {
    if (action === "modify") {
      apiServer.Restful.Routes.find(modify).then((route: any) => {
        Object.keys(route).forEach((key) => {
          if (route[key] === null) {
            delete route[key];
          }
        });
        form.setFieldsValue(route);
      });
    } else {
      form.setFieldsValue({
        service: { id: modify },
        protocols: ["http", "https"],
        https_redirect_status_code: 426,
        regex_priority: 0,
        strip_path: true,
        path_handling: "v1",
        preserve_host: false,
      });
    }
  }, [action, modify]);
  const [loading, setLoading] = useState(false);
  const handleSubmit = async () => {
    setLoading(true);
    try {
      const values = await form.validateFields();
      if (action === "modify") {
        await apiServer.Restful.Routes.cover(modify, values);
      } else {
        await apiServer.Restful.Routes.create(values);
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
      title={action === "modify" ? "修改路由" : "新增路由"}
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
        <Form.Item label="标签" name="tags">
          <Select mode="tags" open={false} style={{ width: "100%" }} />
        </Form.Item>
        <Space align="start">
          <Form.Item label="协议" name="service" hidden />
          <Form.Item
            label="协议"
            name="protocols"
            rules={[{ required: true, message: "协议必须选择" }]}
          >
            <Select mode="multiple" style={{ width: 120 }}>
              <Select.Option value="http">http://</Select.Option>
              <Select.Option value="https">https://</Select.Option>
              <Select.Option value="grpc">grpc://</Select.Option>
              <Select.Option value="grpcs">grpcs://</Select.Option>
              <Select.Option value="tcp">tcp://</Select.Option>
              <Select.Option value="tls">tls://</Select.Option>
              <Select.Option value="tls_passthrough">
                tls_passthrough://
              </Select.Option>
              <Select.Option value="udp">udp://</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="主机"
            name="hosts"
            rules={[{ required: true, message: "主机地址必须输入" }]}
          >
            <Select
              mode="tags"
              open={false}
              suffixIcon={null}
              style={{ width: 380 }}
            />
          </Form.Item>
          <Form.Item label="路径" name="paths">
            <Select
              mode="tags"
              open={false}
              suffixIcon={null}
              style={{ width: 160 }}
            />
          </Form.Item>
        </Space>
        <Form.Item label="请求方式" name="methods">
          <Select mode="tags" style={{ width: "100%" }} allowClear>
            <Select.Option value="POST">POST</Select.Option>
            <Select.Option value="GET">GET</Select.Option>
            <Select.Option value="PATCH">PATCH</Select.Option>
            <Select.Option value="PUT">PUT</Select.Option>
            <Select.Option value="DELETE">DELETE</Select.Option>
            <Select.Option value="HEAD">HEAD</Select.Option>
            <Select.Option value="OPTIONS">OPTIONS</Select.Option>
            <Select.Option value="TRACE">TRACE</Select.Option>
            <Select.Option value="CONNECT">CONNECT</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="请求头" name="headers">
          <Select mode="tags" open={false} style={{ width: "100%" }} />
        </Form.Item>
        <Space align="start">
          <Form.Item label="路径规则版本" name="path_handling">
            <Select style={{ width: 100 }}>
              <Select.Option value="v0">v0</Select.Option>
              <Select.Option value="v1">v1</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="加密重定向状态码" name="https_redirect_status_code">
            <InputNumber style={{ width: 144 }} />
          </Form.Item>
          <Form.Item label="正则优先级" name="regex_priority">
            <InputNumber style={{ width: 80 }} />
          </Form.Item>
          <Form.Item label="剥夺路径" name="strip_path" valuePropName="checked">
            <Switch />
          </Form.Item>
          <Form.Item
            label="主机名传递"
            name="preserve_host"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>
        </Space>
        <Form.Item label="SNIs" name="snis">
          <Select mode="tags" open={false} suffixIcon={null} />
        </Form.Item>
        <Form.Item label="Sources" name="sources">
          <Select mode="tags" open={false} suffixIcon={null} />
        </Form.Item>
        <Form.Item label="Destinations" name="destinations">
          <Select mode="tags" open={false} suffixIcon={null} />
        </Form.Item>
      </Form>
    </Drawer>
  );
}
