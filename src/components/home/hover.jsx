"use client";

// css
import indexCSS from "@/styles/pages/home/index.module.css";
import { useEffect } from "react";

export default function Hover() {
  useEffect(() => {
    const isReduced = window.matchMedia(`(prefers-reduced-motion: reduce)`) === true || window.matchMedia(`(prefers-reduced-motion: reduce)`).matches === true;

    if (!!isReduced) {
      return
    }

    window.addEventListener("pointermove", onMove);

    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  const onMove = (e) => {
    if (e.pointerType !== "mouse" || document.getElementById("blob") === undefined || document.getElementById("blob") === null) return;

    const { clientX, clientY } = e;

    document.getElementById("blob").animate(
      {
        left: `${clientX}px`,
        top: `${clientY}px`,
      },
      { duration: 2000, fill: "forwards" }
    );
  };

  return (
    <>
      <div className={indexCSS.background}>
        <div className={indexCSS.background_blob} id="blob" />
        <div className={indexCSS.background_blur} />
      </div>
    </>
  );
}
