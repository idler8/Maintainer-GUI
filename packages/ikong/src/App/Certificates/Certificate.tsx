import { Button, Drawer, Form, Input, Select } from "antd";
import apiServer from "apiServer";
import { useState } from "react";

export default function Certificate({ onClose }: { onClose: Function }) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const handleSubmit = async () => {
    setLoading(true);
    try {
      const values = await form.validateFields();
      await apiServer.Restful.Certificates.create(values);
      onClose(true);
    } catch (e) {
      setLoading(false);
    }
  };
  return (
    <Drawer
      open
      title="新增证书"
      width={500}
      onClose={() => onClose(false)}
      footer={
        <Button loading={loading} type="primary" onClick={handleSubmit}>
          确认提交
        </Button>
      }
    >
      <Form form={form} layout="vertical" autoComplete="off">
        <Form.Item label="证书Cert" name="cert">
          <Input.TextArea />
        </Form.Item>
        <Form.Item label="证书Key" name="key">
          <Input.TextArea />
        </Form.Item>
        <Form.Item label="服务器名称指示" name="snis">
          <Select mode="tags" open={false} suffixIcon={null} />
        </Form.Item>
        <Form.Item label="标签" name="tags">
          <Select mode="tags" open={false} suffixIcon={null} />
        </Form.Item>
      </Form>
    </Drawer>
  );
}
