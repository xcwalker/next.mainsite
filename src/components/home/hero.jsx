'use client'

// css
import heroCSS from "@/styles/pages/home/hero.module.css";

export function Hero(props) {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  let interval = null;

  const handleMouseOver = () => {
    clearInterval(interval);

    const h1 = document.querySelector("section#" + heroCSS.hero + " ." + heroCSS.logo + " h1");

    interval = setInterval(() => {
      h1.innerText = h1.innerText
        .split("")
        .map(() => {
          return letters[Math.floor(Math.random() * 26)];
        })
        .join("");
    }, 30);
  };

  const handleMouseLeave = () => {
    let modifier = 5;
    let iterator = 1;
    let value = 0;
    var shown = [];

    clearInterval(interval);

    const h1 = document.querySelector("section#" + heroCSS.hero + " ." + heroCSS.logo + " h1");

    interval = setInterval(() => {
      newValue();

      h1.innerText = h1.innerText
        .split("")
        .map((letter, index) => {
          if (shown.includes(index)) {
            return h1.dataset.text[index];
          }

          if (index === value) {
            shown.push(index);
            return h1.dataset.text[index];
          }

          return letters[Math.floor(Math.random() * 26)];
        })
        .join("");

      if (shown.length >= h1.dataset.text.length) {
        clearInterval(interval);
      }

      iterator += 1;

      function newValue() {
        let a = randomIntFromInterval(0, Math.max(h1.dataset.text.length - 1, ((h1.dataset.text.length - 1) * modifier) / Math.max(1, iterator / 25)));
        if (!shown.includes(a)) {
          value = a;
        } else {
          newValue();
        }
      }
    }, 30);
  };

  return (
    <>
      <section id={heroCSS.hero}>
        <div className={heroCSS.container}>
          <div className={heroCSS.logo} onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave}>
            <div className={heroCSS.logo_side} />
            <h1 className={heroCSS.logo_text} data-text="xcwalker">
              xcwalker
            </h1>
            <div className={heroCSS.logo_side} />
          </div>
          <a href={"#" + props.arrowID} className={"material-symbols-outlined " + heroCSS.expand} tabIndex={-1}>
            expand_more
          </a>
        </div>
      </section>
    </>
  );
}

function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}
