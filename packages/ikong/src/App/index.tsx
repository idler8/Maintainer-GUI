import { Route } from "components/Router";
import Dashboard from "./Dashboard";
import { Locale } from "locales";
import "antd/dist/reset.css";
import { Button, Space, Divider } from "antd";
import { AppstoreAddOutlined } from "@ant-design/icons";
import { history } from "components/Router";
import Consumers from "./Consumers";
import Upstreams from "./Upstreams";
import Certificates from "./Certificates";

export default function App() {
  return (
    <Locale lang={process.env.REACT_APP_LANGUAGES || "zhCN"}>
      <div style={{ height: 1 }}></div>
      <div style={{ margin: 20, position: "relative" }}>
        <div
          style={{
            position: "absolute",
            right: 120,
            top: 0,
            zIndex: 1,
          }}
        >
          <Space>
            <Button
              icon={<AppstoreAddOutlined rev="nofollow" />}
              onClick={() => history.push("/")}
            >
              路由管理
            </Button>
            <Button
              icon={<AppstoreAddOutlined rev="nofollow" />}
              onClick={() => history.push("/consumers")}
            >
              用户管理
            </Button>
            <Button
              icon={<AppstoreAddOutlined rev="nofollow" />}
              onClick={() => history.push("/upstreams")}
            >
              上游管理
            </Button>
            <Button
              icon={<AppstoreAddOutlined rev="nofollow" />}
              onClick={() => history.push("/certificates")}
            >
              证书管理
            </Button>
          </Space>
        </div>
        <Divider orientation="left">IKong</Divider>
        <Route path="/">
          <Dashboard />
        </Route>
        <Route path="/consumers">
          <Consumers />
        </Route>
        <Route path="/upstreams">
          <Upstreams />
        </Route>
        <Route path="/certificates">
          <Certificates />
        </Route>
      </div>
    </Locale>
  );
}
