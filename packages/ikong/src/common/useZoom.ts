import { useEffect } from "react";

export default function useZoom(width: number) {
  // 手机适配
  useEffect(() => {
    function resize() {
      const pageWidth = Math.min(window.innerWidth, window.outerWidth);
      console.log(pageWidth, width, pageWidth < width);
      const style: any = document.body.style;
      if (pageWidth < width) {
        style.zoom = pageWidth / width;
      } else {
        style.zoom = 1;
      }
    }
    window.addEventListener("resize", resize);
    resize();
    return () => {
      const style: any = document.body.style;
      style.zoom = 1;
      window.removeEventListener("resize", resize);
    };
  }, [width]);
}
