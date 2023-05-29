import type { MatchResult, MatchFunction } from "path-to-regexp";
import history from "../history";
export type Router<K extends string = string> = {
  prevRouter: Router | null;
  pathname: string;
  // employ: string;
  match: () => void;
  matched: MatchResult<{ [key in K]: string }> | null;
  children: Router[];
  addChildren: Function;
};

export default function createRouter<K extends string = string>(
  prevRouter: Router | null,
  pathname: string,
  urlMatch: MatchFunction<{ [Key in K]: string }>,
  setVisible: Function
): Router<K> {
  const children: Router[] = [];
  //TODO pathname 和 employ 中间的 / 处理
  const newRouter: Router<K> = {
    prevRouter,
    pathname,
    matched: null,
    children,
    addChildren(router: Router) {
      children.push(router);
      router.match();
      return () => children.splice(children.indexOf(router), 1);
    },
    match: () => {
      const matched = urlMatch(history.location.pathname) || null;
      if (matched === newRouter.matched) return;
      setVisible((newRouter.matched = matched));
      children.forEach((router) => router.match());
    },
  };
  return newRouter;
}
