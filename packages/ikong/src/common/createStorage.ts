import { createCallbacks } from "@idler8/observer";
export type SimpleStorage = {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
};
function parseForce(values: string | null) {
  if (!values) return null;
  try {
    return JSON.parse(values);
  } catch (e) {
    return null;
  }
}
export default function createStorage<V = any>(
  key: string,
  storage: SimpleStorage = window.localStorage
) {
  const { addCallback, removeCallback, calls } = createCallbacks<V>();
  window.addEventListener("storage", (e) => {
    if (e.key === key) calls(parseForce(e.newValue));
  });
  return {
    addCallback,
    removeCallback,
    calls(value: V) {
      storage.setItem(key, JSON.stringify(value));
      return calls(value);
    },
    get() {
      return parseForce(storage.getItem(key));
    },
  };
}
