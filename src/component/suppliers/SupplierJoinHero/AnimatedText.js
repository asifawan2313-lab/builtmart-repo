"use client";

import { useEffect, useState } from "react";

export default function AnimatedText({
  text,
  delay = 0,
  speed = 40,
  cycle = 0,
  instant = false, // true = animation band, poora text foran
  className = "",
}) {
  const [count, setCount] = useState(0); // kitne letters nazar aa chuke hain
  const total = text.replace(/ /g, "").length;

  useEffect(() => {
    // Reduce motion: sab letters foran dikhao, koi timer nahi
    if (instant) {
      setCount(total);
      return;
    }

    let typing;
    let start;

    // Letters chhupao, delay ke baad ek ek karke dikhao
    const play = () => {
      clearTimeout(start);
      clearInterval(typing);
      setCount(0);
      start = setTimeout(() => {
        let n = 0;
        typing = setInterval(() => {
          setCount(++n);
          if (n >= total) clearInterval(typing);
        }, speed);
      }, delay);
    };

    play();
    const loop = cycle && setInterval(play, cycle); // cycle ke baad dobara

    return () => {
      clearTimeout(start);
      clearInterval(typing);
      clearInterval(loop);
    };
  }, [text, delay, speed, cycle, instant, total]);

  let index = -1;

  return (
    <span aria-label={text} className={className}>
      {text.split(" ").map((word, w) => (
        <span key={w} aria-hidden="true" className="mr-[0.3em] inline-block whitespace-nowrap">
          {word.split("").map((letter, l) => (
            <span
              key={l}
              className={`inline-block transition-all duration-500 ease-out ${
                ++index < count ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
              }`}
            >
              {letter}
            </span>
          ))}
        </span>
      ))}
    </span>
  );
}