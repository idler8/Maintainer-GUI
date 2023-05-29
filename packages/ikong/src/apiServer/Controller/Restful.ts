import restful from "apiServer/common/restful";
import * as Model from "apiServer/Model";

export const Services = restful<Model.Service>("/services");
// POST /services/{service name or id}/plugins
// GET /services/{service name or id}/plugins
// GET /services/{service name or id}/plugins/{plugin id}
// PATCH /services/{service name or id}/plugins/{plugin id}
// PUT /services/{service name or id}/plugins/{plugin id}
// DELETE /services/{service name or id}/plugins/{plugin id}

// POST /services/{service name or id}/routes
// GET /services/{service name or id}/routes
// GET /services/{service name or id}/routes/{route name or id}
// PATCH /services/{service name or id}/routes/{route name or id}
// PUT /services/{service name or id}/routes/{route name or id}
// DELETE /services/{service name or id}/routes/{route name or id}
export const Routes = restful<Model.Route>("/routes");
// POST /routes/{route name or id}/plugins
// GET /routes/{route name or id}/plugins
// GET /routes/{route name or id}/plugins/{plugin id}
// PATCH /routes/{route name or id}/plugins/{plugin id}
// PUT /routes/{route name or id}/plugins/{plugin id}
// DELETE /routes/{route name or id}/plugins/{plugin id}

// PATCH /routes/{route name or id}/service
// PUT /routes/{route name or id}/service
// DELETE /routes/{route name or id}/service
export const Consumers = restful<Model.Consumer>("/consumers");
// POST /consumers/{consumer name or id}/plugins
// GET /consumers/{consumer name or id}/plugins
// GET /consumers/{consumer name or id}/plugins/{plugin id}
// PATCH /consumers/{consumer name or id}/plugins/{plugin id}
// PUT /consumers/{consumer name or id}/plugins/{plugin id}
// DELETE /consumers/{consumer name or id}/plugins/{plugin id}
export const Plugins = restful<Model.Plugin>("/plugins");
// GET /plugins/{plugin id}/consumer
// PATCH /plugins/{plugin id}/consumer
// PUT /plugins/{plugin id}/consumer

// GET /plugins/{plugin id}/route
// PATCH /plugins/{plugin id}/route
// PUT /plugins/{plugin id}/route
// DELETE /plugins/{plugin id}/route

// GET /plugins/{plugin id}/service
// PATCH /plugins/{plugin id}/service
// PUT /plugins/{plugin id}/service
// DELETE /plugins/{plugin id}/service
export const Certificates = restful<Model.Certificate>("/certificates");
// POST /certificates/{certificate name or id}/services
// GET /certificates/{certificate name or id}/services
// GET /certificates/{certificate id}/services/{service name or id}
// PATCH /certificates/{certificate id}/services/{service name or id}
// PUT /certificates/{certificate id}/services/{service name or id}
// DELETE /certificates/{certificate id}/services/{service name or id}
export const CaCertificates = restful<Model.CaCertificate>("/ca_certificates");
export const SNIs = restful<Model.SNI>("/snis");
export const Upstreams = restful<Model.Upstream>("/upstream");
export const Targets = restful<Model.Target>("/upstreams/{id}/targets");
export const Vaults = restful<Model.Vault>("/vaults");
