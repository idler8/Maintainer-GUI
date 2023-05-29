import { Button, Card, Space, Select, Tag, Divider } from "antd";
import apiServer from "apiServer";
import { useReRequest } from "common/useRequest";
import { useState } from "react";
import useHostGroupFromRoutes from "./useHostGroupFromRoutes";
import useServiceGroup from "./useServiceGroup";
import {
  ToolOutlined,
  SearchOutlined,
  SettingOutlined,
  AppstoreAddOutlined,
} from "@ant-design/icons";
import Drawers from "./Drawers";

export default function Dashboard() {
  const [services, onUpdateServices] = useReRequest(
    apiServer.Restful.Services.get
  );
  const [routes, onUpdateRoutes] = useReRequest(apiServer.Restful.Routes.get);
  const hosts = useHostGroupFromRoutes(routes?.data);
  const serviceGroups = useServiceGroup(services?.data, routes?.data);
  const [mode, setMode] = useState<string>("");

  const [selected, setSelected] = useState<string[]>([]);
  return (
    <>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        <Space.Compact>
          <Button
            disabled
            icon={<SearchOutlined rev="nofollow" />}
            style={{ cursor: "default" }}
          />
          <Select
            style={{ minWidth: 260 }}
            mode="multiple"
            placeholder="选择匹配域名"
            popupMatchSelectWidth={false}
            value={selected}
            onChange={setSelected}
            options={hosts}
            allowClear
          />
        </Space.Compact>
        <div style={{ flex: 1 }}></div>
        <Space>
          <Button
            icon={<AppstoreAddOutlined rev="nofollow" />}
            onClick={() => setMode("service/create")}
          >
            新增服务
          </Button>
        </Space>
      </div>
      <Space size={[8, 16]} align="start" wrap>
        {serviceGroups.map((service) => (
          <Card
            size="small"
            key={service.id}
            title={
              <Space>
                <Button
                  size="small"
                  icon={<ToolOutlined rev="nofollow" />}
                  onClick={() => {
                    console.log("插件");
                  }}
                />
                {service.id && (
                  <Button
                    size="small"
                    icon={<SettingOutlined rev="nofollow" />}
                    onClick={() => setMode("service/modify/" + service.id)}
                  />
                )}
                {service.title}
              </Space>
            }
            extra={
              <Button
                size="small"
                icon={<AppstoreAddOutlined rev="nofollow" />}
                onClick={() => setMode("route/create/" + service.id)}
              >
                新增路由
              </Button>
            }
          >
            <Space size={[8, 16]} align="start" wrap>
              {service.routes.map((route) => {
                if (
                  selected.length > 0 &&
                  route.hosts &&
                  selected.every((host) => !route.hosts.includes(host))
                ) {
                  return null;
                }
                return (
                  <Card
                    size="small"
                    key={route.id}
                    title={
                      <Space size="small">
                        <Button
                          size="small"
                          icon={<ToolOutlined rev="nofollow" />}
                          onClick={() => {
                            console.log("插件");
                          }}
                        />
                        <Button
                          size="small"
                          icon={<SettingOutlined rev="nofollow" />}
                          onClick={() => setMode("route/modify/" + route.id)}
                        />
                        {route.methods.map((method) => {
                          return <Tag key={method}>{method}</Tag>;
                        })}
                        <span>{route.name || ""}</span>
                      </Space>
                    }
                  >
                    {route.entrances.map((protocal) => (
                      <div key={protocal}>{protocal}</div>
                    ))}
                  </Card>
                );
              })}
            </Space>
          </Card>
        ))}
      </Space>
      <Drawers
        mode={mode}
        onClose={(needUpdate: boolean) => {
          setMode("");
          if (needUpdate) {
            onUpdateServices();
            onUpdateRoutes();
          }
        }}
      />
    </>
  );
}
