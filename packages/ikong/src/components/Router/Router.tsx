import { createContext, useContext } from "react";
import createRouter, { Router } from "./common/createRouter";
import createMatch from "./common/createMatch";
import history from "./history";

const match = createMatch("/", "(.*)", "");
const theRouter = createRouter(null, "/", match, () => {});
history.listen(function () {
  theRouter.match();
});

export const RouteContext = createContext<[Router<any>]>([theRouter]);
export function useRouter<K extends string = string>(): Router<K> {
  return useContext(RouteContext)[0];
}
