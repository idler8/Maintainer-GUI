import { useEffect } from "react";
import { useRouter } from "./Router";
import relative from "./common/relative";
import history from "./history";

export default function Redirect({ path }: { path: string }) {
  const router = useRouter();
  useEffect(() => {
    history.replace(relative(router.pathname, path));
  }, [router, path]);
  return null;
}
