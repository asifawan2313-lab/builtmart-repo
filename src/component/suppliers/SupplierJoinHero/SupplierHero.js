"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import AnimatedText from "./AnimatedText";

import heroBg from "../../../assests/images/supplier-hero.jpg";

// Content: text badalna ho to sirf yahan badlein
const hero = {
  title: "Start your business with BuildMart in 3 easy steps!",
  subtitle: "Become a part of Pakistan's growing construction marketplace",
  buttonText: "Start Selling",
  loginQuestion: "Already a Seller?",
  loginText: "Login here",
};

const SPEED = 35; // ms per letter
const HOLD = 3000; // ms: poora text nazar aata rahe, phir dobara shuru

const buttonStyle =
  "mt-2 rounded-md bg-[#ffc61a] px-10 py-3 text-base font-bold uppercase text-neutral-900 transition-all duration-700 ease-out hover:-translate-y-0.5 hover:bg-yellow-300 hover:shadow-lg hover:shadow-black/30 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white";

export default function SupplierHero({ content = hero }) {
  const [ready, setReady] = useState(false); // button aur login line dikhane ke liye
  const [reduce, setReduce] = useState(false); // user ne animation kam karne ki setting on ki ho

  // Device ki "reduce motion" setting check karein
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduce(mq.matches);
    const onChange = (e) => setReduce(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Timing: title -> subtitle -> button, phir poora round dobara
  const subtitleDelay = content.title.length * SPEED + 300;
  const showTime = subtitleDelay + content.subtitle.length * SPEED + 200;
  const cycle = showTime + HOLD;

  useEffect(() => {
    if (reduce) {
      setReady(true); // animation band: sab kuch foran dikhao
      return;
    }
    const timer = setTimeout(() => setReady(true), showTime);
    return () => clearTimeout(timer);
  }, [showTime, reduce]);

  const handleStartSelling = () => console.log("Start selling clicked");

  const fade = `transition-all duration-700 ease-out ${
    ready ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
  }`;

  return (
    <section className="relative flex min-h-[420px] items-center justify-center overflow-hidden py-16 text-white">
      {/* Background animation: slow zoom + halka pan */}
      <style>{`
        @keyframes bmHeroBg {
          0%   { transform: scale(1) translateX(0); }
          100% { transform: scale(1.15) translateX(-2%); }
        }
      `}</style>

      {/* Background image (animated) */}
      <div className="absolute inset-0 animate-[bmHeroBg_14s_ease-in-out_infinite_alternate] will-change-transform motion-reduce:animate-none">
        <Image src={heroBg} alt="" fill priority sizes="100vw" className="object-cover" />
      </div>
      <div className="absolute inset-0 bg-[#26272b]/60" />

      {/* Content */}
      <div className="relative mx-auto flex max-w-4xl flex-col items-center gap-5 px-4 text-center">
        <h1 className="text-2xl font-extrabold uppercase sm:text-3xl md:text-4xl lg:text-5xl">
          <AnimatedText text={content.title} delay={200} speed={SPEED} cycle={cycle} instant={reduce} />
        </h1>

        <p className="text-base text-neutral-200 sm:text-lg md:text-xl">
          <AnimatedText text={content.subtitle} delay={subtitleDelay} speed={SPEED} cycle={cycle} instant={reduce} />
        </p>

        <button
          type="button"
          onClick={handleStartSelling}
          className={`${buttonStyle} ${ready ? "opacity-100" : "translate-y-4 opacity-0"}`}
        >
          {content.buttonText}
        </button>

        <p className={`${fade} delay-200 text-sm text-neutral-300`}>
          {content.loginQuestion}{" "}
          <Link
            href="/login"
            className="font-semibold text-[#ffc61a] underline underline-offset-4 transition-colors hover:text-yellow-200"
          >
            {content.loginText}
          </Link>
        </p>
      </div>
    </section>
  );
}