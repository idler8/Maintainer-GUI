import { match } from "path-to-regexp";
import type { MatchFunction } from "path-to-regexp";
export default function createMatch<K extends string = string>(
  pathname: string,
  employ: string | true,
  release: string
): MatchFunction<{ [key in K]: string }> {
  const regexp = employ === true ? "(.*)?" : employ;
  if (!release) return match<{ [key in K]: string }>(pathname + regexp);
  const employMatch = match<{ [key in K]: string }>(
    pathname + (regexp || "(.*)?")
  );
  const releaseMatch = match(pathname + release);
  return (str: string) => {
    const matched = employMatch(str);
    if (!matched) return false;
    if (releaseMatch(str)) return false;
    return matched;
  };
}
