import instance from "apiServer/common/instance";

//获取服务节点状态
export async function get(): Promise<{
  hostname: string;
  node_id: string;
  lua_version: string;
  plugins: {
    available_on_server: any[];
    enabled_in_cluster: any[];
  };
  configuration: object;
  tagline: string;
  version: string;
}> {
  return instance.get("/");
}
//更新DB-less配置
export async function update(config: object): Promise<{
  services: any[];
  routes: any[];
}> {
  // check_hash如果设置为 1，Kong 会将输入配置数据的哈希值与前一个配置数据的哈希值进行比较。如果配置相同，则不会重新加载并返回 HTTP 304。
  return instance.post("/config", { config }, { params: { check_hash: 1 } });
}
