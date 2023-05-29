import * as Model from "./Model/index";
import * as Restful from "./Controller/Restful";
import * as Config from "./Controller/Config";
import * as Debug from "./Controller/Restful";
import * as System from "./Controller/System";
export type { Model };
export const Controller = { Restful, Config, Debug, System };
const apiServer = Controller;
export default apiServer;
