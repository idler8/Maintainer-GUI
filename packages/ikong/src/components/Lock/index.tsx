import { ReactNode, useEffect, useRef } from "react";
import styled from "styled-components";

const FocusController = styled.div.attrs({ tabIndex: 0 })`
  width: 0px;
  height: 0px;
  overflow: hidden;
  outline: none;
`;
export default function Lock({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const focus = () => {
    ref.current?.focus();
  };
  useEffect(focus, []);
  return (
    <>
      <FocusController ref={ref} />
      {children}
      <FocusController onFocus={focus} />
    </>
  );
}
