import axios from "axios";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const LocaleContext = createContext<{ [key: string]: string }>({});
export function Locale({
  lang,
  children,
}: {
  lang: string;
  children: ReactNode;
}) {
  const [language, setLanguage] = useState({});
  useEffect(() => {
    axios.get("/languages/" + lang + ".json").then((res) => {
      setLanguage(res.data);
    });
  }, [lang]);
  return (
    <LocaleContext.Provider value={language}>{children}</LocaleContext.Provider>
  );
}
function Text({ children }: { children: string }) {
  const locales = useContext(LocaleContext);
  return <>{locales[children] || children}</>;
}
export default function locale(value: string) {
  return <Text>{value}</Text>;
}
