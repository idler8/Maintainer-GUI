import { Route } from "apiServer/Model";
import { Require } from "apiServer/common/restful";
import { useMemo } from "react";
import { getDomain } from "tldts";

export default function useHostGroupFromRoutes(routes?: Require<Route>[]) {
  return useMemo(() => {
    if (!routes?.length) return [];
    const simpleKeys: { label: string; value: string }[] = [];
    const groupkeys: { label: string; options: typeof simpleKeys }[] = [];
    routes.forEach((e) => {
      e.hosts?.forEach((host) => {
        const domain = getDomain(host);
        if (domain) {
          const group = groupkeys.find((e) => e.label === domain);
          if (group) {
            if (group.options.every((e) => e.value !== host)) {
              group.options.push({ label: host, value: host });
            }
          } else {
            groupkeys.push({
              label: domain,
              options: [{ label: host, value: host }],
            });
          }
        } else {
          simpleKeys.push({ label: host, value: host });
        }
      });
    });
    if (routes.some((e) => !e.hosts)) {
      simpleKeys.unshift({ value: "", label: "无域名路由（全匹配）" });
    }
    return [...simpleKeys, ...groupkeys];
  }, [routes]);
}
