type Base = {
  readonly id: string;
};
type Model = Base & {
  readonly created_at: number;
  tags?: string[];
};
type Entity = Model & {
  name?: string;
};
type Protocal =
  | "grpc"
  | "grpcs"
  | "http"
  | "https"
  | "tcp"
  | "tls"
  | "tls_passthrough"
  | "udp";
type Method =
  | "POST"
  | "GET"
  | "PATCH"
  | "PUT"
  | "DELETE"
  | "HEAD"
  | "OPTIONS"
  | "TRACE"
  | "CONNECT";
type Headers = { [key: string]: string[] };

export type Service = Entity & {
  host: string;
  retries?: number;
  protocol?: Protocal;
  port?: number;
  path?: string;
  connect_timeout?: number;
  write_timeout?: number;
  read_timeout?: number;
  enabled?: boolean;
  readonly client_certificate?: Base;
  readonly tls_verify: boolean;
  readonly tls_verify_depth: null;
  readonly ca_certificates: string[];
  readonly updated_at: number;
};

/**
 * 复杂要求
 * 对于http，至少有一个methods、hosts、headers或paths；
 * 对于https，至少有一个methods、hosts、headers、paths或snis；
 * 对于tcp，至少有一个sources或destinations；
 * 对于tls，至少有一个sources、destinations或snis；
 * 对于tls_passthrough，设置snis；
 * 对于grpc，至少有一个hosts、headers或paths；
 * 对于grpcs，至少有一个hosts、headers、paths或snis；
 */
export type Route = Entity & {
  readonly updated_at: number;
  protocols?: Protocal[];
  methods?: Method[];
  hosts?: string[];
  paths?: string[];
  headers?: Headers;
  https_redirect_status_code?: number;
  regex_priority?: number;
  strip_path?: boolean;
  path_handling?: "v0" | "v1";
  preserve_host?: boolean;
  request_buffering?: boolean;
  response_buffering?: boolean;
  snis?: string[];
  sources?: any;
  destinations?: any;
  service?: Base;
};
export type Consumer = Model & {
  username: string;
  custom_id: string;
};
export type Plugin = Entity & {
  route?: Base; //Base
  service?: Base; //Base
  consumer?: Base; //Base
  instance_name: unknown;
  config: {};
  protocol: Protocal[];
  enabled: boolean;
  ordering: unknown;
};
export type Certificate = Model & {
  key: string;
  cert: string;
  cert_alt: string;
  key_alt: string;
  snis?: string[];
};
export type CaCertificate = Model & {
  cert: string;
  cert_digest: string;
};

export type SNI = Entity & {
  certificate: Base;
};

export type Upstream = Entity & {
  algorithm: unknown; //"round-robin",
  hash_on: unknown; //"none",
  hash_fallback: unknown; //"none",
  hash_on_cookie_path: unknown; //"/",
  slots: unknown; //10000;
  healthchecks: {
    passive: {
      type: Protocal;
      healthy: {
        http_statuses: number[];
        successes: number;
      };
      unhealthy: {
        http_statuses: number[];
        timeouts: number;
        http_failures: number;
        tcp_failures: number;
      };
    };
    active: {
      https_verify_certificate: boolean;
      healthy: {
        http_statuses: number[];
        successes: number;
        interval: number;
      };
      unhealthy: {
        http_failures: number;
        http_statuses: number[];
        timeouts: number;
        tcp_failures: number;
        interval: number;
      };
      type: Protocal;
      concurrency: number;
      headers: Headers[];
      timeout: number;
      http_path: unknown; //"/";
      https_sni: unknown; //"example.com";
    };
    threshold: number;
  };
  host_header: unknown; //"example.com";
  client_certificate: Base;
  use_srv_name: unknown; //false;
};

export type Target = Model & {
  upstream: Base;
  target: "example.com:8000";
  weight: 100;
};

export type Vault = Model & {
  prefix: string;
  name: string;
  description: string;
  config: { prefix: string };
  readonly updated_at: number;
};
