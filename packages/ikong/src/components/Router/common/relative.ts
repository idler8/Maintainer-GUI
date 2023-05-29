export default function relative(basename: string, path?: string) {
  if (!path) return basename;
  if (path[0] === "/") return path;
  return basename.replace(/\/?$/, "/" + path);
}