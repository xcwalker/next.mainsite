"use client";

import css from "@/styles/components/header.module.css";
import { AcronLogoVector, MainLogoVector, ReactRadioLogoVector, SearrsonLogoVector, SecureLogoVector } from "./logo";
import Link from "next/link";
import { useEffect, useRef } from "react";

export function Header() {
  const ref = useRef();

  useEffect(() => {
    const header = document.querySelector("header");

    const func = (e) => {
      console.log(document.body.getBoundingClientRect().top);
      if (document.body.getBoundingClientRect().top < 0) {
        ref.current.classList.add("scrolled");
      } else if (document.body.getBoundingClientRect().top >= 0) {
        header.classList.remove("scrolled");
      }
    };
    
    document.addEventListener("scroll", func);

    return () => {
      document.removeEventListener("scroll", func);
    };
  }, []);

  return (
    <header className={css.header} ref={ref}>
      <div className={css.container}>
        <MainLogoVector />
        <div className={css.right}>
          <ul>
            <a href="https://acron.dev/">
              <AcronLogoVector />
            </a>
            <a href="https://reactradio.dev/">
              <ReactRadioLogoVector />
            </a>
            <a href="https://searrson.dev/">
              <SearrsonLogoVector />
            </a>
            <a href="https://secure.xcw.one/">
              <SecureLogoVector />
            </a>
          </ul>
          <div className={css.separator} />
          <nav>
            <ul>
              <Link href="/">
                <span class="material-symbols-outlined">home</span>
              </Link>
              <Link href="/repo/">
                <span class="material-symbols-outlined">terminal</span>
              </Link>
              <Link href="/blog">
                <span class="material-symbols-outlined">rss_feed</span>
              </Link>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
