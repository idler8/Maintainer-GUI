import type { SimpleStorage } from "./createStorage";

import AES from "crypto-js/aes";
import UTF8 from "crypto-js/enc-utf8";
export default function createHashStorage(
  AESKey = "",
  storage: SimpleStorage = window.localStorage
): SimpleStorage {
  return {
    getItem(key: string) {
      const value = storage.getItem(key);
      if (!value) return null;
      return AES.decrypt(value, AESKey).toString(UTF8);
    },
    setItem(key, value) {
      storage.setItem(key, AES.encrypt(value, AESKey).toString());
    },
  };
}
