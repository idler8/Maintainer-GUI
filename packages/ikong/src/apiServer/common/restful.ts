import instance from "apiServer/common/instance";
export type DKey = string | number;
export type CKey<Key extends string> = { [K in Key]: DKey };
export type UKey<Model, Key> = Model extends Key ? Model : Key;
export type Paginate<Model> = {
  data: Model[];
  next: string;
};
export type Modify<Model> = { [Key in keyof Model]+?: Model[Key] };
export type Require<Model> = { [Key in keyof Model]-?: Model[Key] };
export type IfEquals<X, Y, A = X, B = never> = (<T>() => T extends X
  ? 1
  : 2) extends <T>() => T extends Y ? 1 : 2
  ? A
  : B;
export type WritableKeys<T> = {
  [P in keyof T]-?: IfEquals<
    { [Q in P]: T[P] },
    { -readonly [Q in P]: T[P] },
    P
  >;
}[keyof T];
export type ReadonlyKeys<T> = {
  [P in keyof T]-?: IfEquals<
    { [Q in P]: T[P] },
    { -readonly [Q in P]: T[P] },
    never,
    P
  >;
}[keyof T];
//TODO Response 去掉可选
export type ApiFind<Model, Append, Key> = (key: Key) => Promise<Require<Model & Append>>;
export type ApiGet<Model, Append> = (
  offset?: string
) => Promise<Paginate<Require<Model & Append>>>;
export type ApiUpdate<Model, Append, Key> = (
  key: Key,
  values: Modify<Model>
) => Promise<Require<Model & Append>>;
export type ApiDelete<Key> = (key: Key) => Promise<void>;
export type ApiCreate<Model, Append> = (
  values: Model
) => Promise<Require<Model & Append>>;
export type RestfulApi<
  Create,
  Append extends CKey<Key> = any,
  Key extends string = "id"
> = {
  create: ApiCreate<Create, UKey<CKey<Key>, Append>>;
  destroy: ApiDelete<UKey<CKey<Key>, Append>[Key]>;
  update: ApiUpdate<
    Create,
    UKey<CKey<Key>, Append>,
    UKey<CKey<Key>, Append>[Key]
  >;
  find: ApiFind<Create, UKey<CKey<Key>, Append>, UKey<CKey<Key>, Append>[Key]>;
  cover: ApiUpdate<
    Create,
    UKey<CKey<Key>, Append>,
    UKey<CKey<Key>, Append>[Key]
  >;
  get: ApiGet<Create, UKey<CKey<Key>, Append>>;
};
// export default function getPagination(res) {
//   const { current, size: pageSize, total, records: data } = res;
//   const pagination = { current, pageSize, total, showSizeChanger: true, showQuickJumper: true };
//   data.reduce(withIndex, current * pageSize - pageSize);
//   return { pagination, data };
// }

export default function getRestful<
  Create extends object,
  Key extends string = "id"
>(
  base: string
): RestfulApi<
  Pick<Create, WritableKeys<Create>>,
  Pick<Create, ReadonlyKeys<Create>> & CKey<Key>,
  Key
> {
  return {
    async create(values) {
      return instance.post(base, values);
    },
    async destroy(key) {
      await instance.delete(base + "/" + key);
    },
    async update(key, values) {
      return instance.patch(base + "/" + key, values);
    },
    async find(key) {
      return instance.get(base + "/" + key);
    },
    async cover(key, values) {
      return instance.put(base + "/" + key, values);
    },
    async get(offset) {
      return instance.get(base, { params: { offset } });
    },
  };
}
