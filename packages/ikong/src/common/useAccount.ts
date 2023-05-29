// import loginAccount from "apiServer/loginAccount";
import { useEffect, useState } from "react";
import createHashStorage from "./createHashStorage";
import createStorage from "./createStorage";

export type Userinfo = {
  type: string;
  name: string; //名称
  isUpgrade: boolean; // 是否实名
  expired: number; // 过期时间
};
export type Personal = Userinfo & {
  type: "personal";
  telephone: string; //手机号码
};
export type Enterprise = Userinfo & {
  type: "company"; //手机号码
};
export type Account = {
  token: string;
  createdAt: string;
  userinfos: [Personal, ...(Personal | Enterprise)[]]; // 第一个账户必然是个人
  loginUser: number;
};

async function getAccount(): Promise<Account | null> {
  //Account 三分钟过期
  return null;
}
const storage = createStorage("account", createHashStorage("theAccountKey"));
getAccount().then((res) => storage.calls(res));
//TODO 页面跳转需要将Userinfo过期
export default function useAccount() {
  const [account, setAccount] = useState<Account | null>(storage.get());
  useEffect(() => storage.addCallback(setAccount), [setAccount]);
  return account;
}
