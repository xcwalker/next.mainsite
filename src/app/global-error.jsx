"use client";

import { useEffect } from "react";

export default function GlobalError({ error, reset }) {
  useEffect(() => {
    console.error("Error: " + error);
  }, [error]);

  return (
    <section id="error">
      <div className="container">
        {error.message}
        <button onClick={() => reset()}></button>
      </div>
    </section>
  );
}
