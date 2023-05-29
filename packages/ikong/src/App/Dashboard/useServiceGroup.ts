import { Route, Service } from "apiServer/Model";
import { Require } from "apiServer/common/restful";
import { useMemo } from "react";

function tranformRoute(e: Require<Route>) {
  const service = e.service?.id;
  const hosts = e.hosts ? [...e.hosts] : ["-"];
  const paths = e.paths ? [...e.paths] : [""];
  const methods = e.methods ? [...e.methods] : ["ALL"];
  const protocols: string[] = [];
  const entrances: string[] = [];
  const _protocols = e.protocols ? [...e.protocols] : ["-"];
  _protocols.sort((a, b) => a.length - b.length);
  _protocols.forEach((protocol) => {
    if (!protocol.endsWith("s")) {
      return protocols.push(protocol);
    }
    const no = protocol.slice(0, -1);
    const index = protocols.indexOf(no);
    if (index !== -1) {
      protocols[index] += "[s]";
    } else {
      protocols.push(protocol);
    }
  });
  hosts.forEach((host) => {
    paths.forEach((path) => {
      protocols.forEach((protocol) => {
        entrances.push(protocol + "://" + host + path);
      });
    });
  });
  return {
    id: e.id,
    name: e.name,
    hosts: e.hosts,
    service,
    methods,
    entrances,
  };
}
export default function useServiceGroup(
  services?: Require<Service>[],
  routes?: Require<Route>[]
) {
  return useMemo(() => {
    if (!services?.length) return [];
    const transformRoutes =
      routes?.sort((a, b) => b.created_at - a.created_at).map(tranformRoute) ||
      [];
    const groupRoutes =
      services.map((service) => {
        const port = service.port === 80 ? "" : ":" + service.port;
        const url = service.host + port + (service.path || "");
        return {
          id: service.id,
          title: service.name ? `${service.name}(${url})` : url,
          routes: transformRoutes.filter((e) => e.service === service.id) || [],
        };
      }) || [];
    groupRoutes.push({
      id: "",
      title: "全局控制",
      routes: transformRoutes?.filter((e) => !e.service) || [],
    });
    return groupRoutes.sort((a, b) => b.routes.length - a.routes.length) || [];
  }, [services, routes]);
}
