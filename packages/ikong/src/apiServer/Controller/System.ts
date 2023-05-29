import instance from "apiServer/common/instance";

export const Endpoints = {
  //获取接口列表
  async get(): Promise<string[]> {
    //TODO 改造
    return instance.get("/endpoints");
  },
  //判断接口是否可以调用
  async exist(endpoint: string): Promise<boolean> {
    //TODO 改造
    return instance.head("/" + endpoint);
  },
  //获取可用的接口methods
  async methods(endpoint: string): Promise<string[]> {
    //TODO 改造以输出methods
    return instance.options("/" + endpoint);
  },
};
export const Entitys = {
  //获取实体
  async get(entity: string): Promise<any> {
    //TODO 研究下这是干嘛的
    return instance.get(`/schemas/${entity}`);
  },
  async validate(entity: string): Promise<string> {
    //TODO 研究下这是干嘛的
    return instance.post(`/schemas/${entity}/validate`);
  },
};
export const Plugins = {
  async get(plugin: string): Promise<any> {
    //TODO 研究下这是干嘛的
    return instance.get(`/schemas/plugins/${plugin}`);
  },
  async validate(plugin: string): Promise<any> {
    //TODO 研究下这是干嘛的
    return instance.post(`/schemas/plugins/validate`);
  },
};
//获取定时器运行情况
export async function timers(): Promise<{
  stats: {
    flamegraph: {
      elapsed_time: string;
      pending: string;
      running: string;
    };
    sys: {
      pending: number;
      running: number;
      runs: number;
      total: number;
      waiting: number;
    };
    timers: object;
  };
  worker: {
    id: number;
    count: number;
  };
}> {
  return instance.get(`/timers`);
}

//获取系统状态
export async function status(): Promise<{
  database: {
    reachable: boolean;
  };
  memory: {
    workers_lua_vms: {
      http_allocated_gc: string;
      pid: number;
    }[];
    lua_shared_dicts: {
      kong: {
        allocated_slabs: string;
        capacity: string;
      };
      kong_db_cache: {
        allocated_slabs: string;
        capacity: string;
      };
    };
  };
  server: {
    total_requests: number; //请求总数
    connections_active: number; //活动的链接
    connections_accepted: number; //接入的链接
    connections_handled: number; //刮起的链接
    connections_reading: number; //读取中的链接
    connections_writing: number; //写入中的链接
    connections_waiting: number; //等待中的链接
  };
  configuration_hash: string;
}> {
  //TODO 研究下这是干嘛的
  return instance.get(`/status`);
}

//获取所有标签标记的实体
export async function tags(tags: string = ""): Promise<{
  data: { entity_name: string; entity_id: string; tag: string }[];
  offset: string;
  next: string;
}> {
  //TODO 研究下这是干嘛的
  return instance.get(`/tags/${tags}`);
}

//TODO GET /plugins/enabled
//TODO Certificate/CA/SNI/Upstream/Vaults/Keys/
