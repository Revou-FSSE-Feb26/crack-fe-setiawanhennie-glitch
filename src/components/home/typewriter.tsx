"use client";

import { useEffect, useState } from "react";

const WORDS = ["petualangan seru!", "kompetisi sehat!", "permainan seru!", "kebiasaan harian!"];

export default function Typewriter() {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = WORDS[wordIndex];
    let delay = deleting ? 45 : 90;
    if (!deleting && text === word) delay = 1400;
    if (deleting && text === "") delay = 300;

    const t = setTimeout(() => {
      if (!deleting) {
        if (text === word) setDeleting(true);
        else setText(word.slice(0, text.length + 1));
      } else {
        if (text === "") {
          setDeleting(false);
          setWordIndex((i) => (i + 1) % WORDS.length);
        } else {
          setText(word.slice(0, text.length - 1));
        }
      }
    }, delay);
    return () => clearTimeout(t);
  }, [text, deleting, wordIndex]);

  return (
    <span className="text-primary">
      {text}
      <span className="animate-pulse">|</span>
    </span>
  );
}