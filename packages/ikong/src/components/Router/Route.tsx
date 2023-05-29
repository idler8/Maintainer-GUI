import { useEffect, useMemo, useState, ReactNode } from "react";
import createMatch from "./common/createMatch";
import createRouter, { Router } from "./common/createRouter";
import relative from "./common/relative";
import { RouteContext, useRouter } from "./Router";

export default function Route({
  path = "",
  employ = "",
  release = "",
  children,
}: {
  path?: string;
  employ?: string | true;
  release?: string;
  children: ReactNode;
}) {
  const [visible, setVisible] = useState(false);
  const prevRouter = useRouter();
  const router = useMemo<Router>(() => {
    const pathname = relative(prevRouter?.pathname || "", path);
    const urlMatch = createMatch(pathname, employ, release);
    return createRouter(prevRouter, pathname, urlMatch, setVisible);
  }, [prevRouter, path, employ, release]);
  useEffect(() => prevRouter.addChildren(router), [prevRouter, router]);
  const inRouter = useMemo<[Router]>(() => [router], [router.matched]);
  if (!visible) return null;
  return (
    <RouteContext.Provider value={inRouter}>{children}</RouteContext.Provider>
  );
}
