import {
  Button,
  Card,
  Space,
  Tag,
  Empty,
  Popconfirm,
  Typography,
  Modal,
  Input,
} from "antd";
import apiServer from "apiServer";
import { useReRequest } from "common/useRequest";
import { EyeOutlined, AppstoreAddOutlined } from "@ant-design/icons";
import { useState } from "react";
import Certificate from "./Certificate";
const { get, destroy } = apiServer.Restful.Certificates;

export default function Certificates() {
  const [certificates, onUpdate] = useReRequest(get);
  const [mode, setMode] = useState("");
  console.log("mode", mode);
  return (
    <Card
      title="证书管理"
      extra={
        <Button
          icon={<AppstoreAddOutlined rev="nofollow" />}
          onClick={() => setMode("certificate/create")}
        >
          新增证书
        </Button>
      }
    >
      <Space>
        {certificates?.data.map((certificate) => {
          return (
            <Card
              key={certificate.id}
              title={
                <Space>
                  <Button
                    icon={
                      <EyeOutlined
                        rev="nofollow"
                        onClick={() =>
                          Modal.info({
                            closable: true,
                            footer: null,
                            maskClosable: true,
                            title: "证书详情",
                            width: "80%",
                            content: (
                              <>
                                <Typography.Text strong>
                                  证书Cert
                                </Typography.Text>
                                <Input.TextArea
                                  readOnly
                                  value={certificate.cert}
                                  autoSize={{ minRows: 2, maxRows: 20 }}
                                />
                                <Typography.Text strong>
                                  证书Key
                                </Typography.Text>
                                <Input.TextArea
                                  readOnly
                                  value={certificate.key}
                                  autoSize
                                />
                              </>
                            ),
                          })
                        }
                      />
                    }
                    size="small"
                  />
                  {certificate.tags?.map((tag) => {
                    return <Tag key={tag}>{tag}</Tag>;
                  })}
                </Space>
              }
              extra={
                <Popconfirm
                  title="删除证书"
                  description="删除后将不可恢复，确认删除?"
                  onConfirm={() =>
                    destroy(certificate.id).then(() => onUpdate())
                  }
                  okText="确认删除"
                  cancelText="不，再想想"
                >
                  <Button size="small" danger>
                    删除
                  </Button>
                </Popconfirm>
              }
              size="small"
            >
              {certificate.snis?.map((sni) => {
                return <div key={sni}>{sni}</div>;
              })}
            </Card>
          );
        })}
      </Space>
      {!certificates?.data.length && <Empty></Empty>}
      {mode && (
        <Certificate
          onClose={(needUpdate: boolean) => {
            setMode("");
            if (needUpdate) {
              onUpdate();
            }
          }}
        />
      )}
    </Card>
  );
}
