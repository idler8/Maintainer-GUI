import { useCallback, useEffect, useState } from "react";

export default function useRequest<R, P extends Array<any> = any[]>(
  Request: (...params: P) => Promise<R>,
  ...params: P
): R | null {
  const [response, setResponse] = useState<R | null>(null);
  useEffect(() => {
    Request(...params).then(setResponse);
  }, [Request, ...params]);
  return response;
}

export function useReRequest<R, P extends Array<any> = any[]>(
  Request: (...params: P) => Promise<R>,
  ...params: P
): [R | null, Function] {
  const [response, setResponse] = useState<R | null>(null);
  const onRequest = useCallback(() => {
    Request(...params).then(setResponse);
  }, [Request, ...params]);
  useEffect(() => {
    onRequest();
  }, [onRequest]);
  return [response, onRequest];
}
