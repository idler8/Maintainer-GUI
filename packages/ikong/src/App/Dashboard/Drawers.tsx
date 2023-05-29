import { DrawerProps } from "antd";
import Service from "./Service";
import Route from "./Route";

export default function Drawers({
  mode,
  onClose,
}: {
  mode: string;
  onClose: Function;
}) {
  if (!mode) return null;
  const [type, action, id] = mode.split("/");
  if (type === "service") {
    return <Service modify={id} onClose={onClose} />;
  }
  if (type === "route") {
    return <Route action={action} modify={id} onClose={onClose} />;
  }
  return null;
}
