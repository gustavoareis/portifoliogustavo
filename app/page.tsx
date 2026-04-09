"use client";

import { useEffect, useState } from "react";

const FULL_TEXT = "Hi there! I'm Gustavo,";

export default function Home() {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let i = 0;
    function type() {
      if (i < FULL_TEXT.length) {
        setDisplayed(FULL_TEXT.slice(0, ++i));
        setTimeout(type, 80);
      }
    }
    type();
  }, []);

  return (
    <>
      <video
        autoPlay
        loop
        playsInline
        className="fixed inset-0 w-full h-full object-cover -z-10"
        aria-hidden="true"
      />

      <section
        id="home"
        className="flex items-center justify-center h-screen bg-black/20"
      >
        <div className="max-w-4xl px-4 pb-4 text-2xl leading-tight">
          <span className="text-[#2dd4bf] tracking-wide">&lt;h1&gt;</span>
          <h1 className="pl-8 text-4xl sm:text-5xl lg:text-6xl tracking-tighter font-medium">
            {displayed}
            <span className="cursor">|</span>
          </h1>
          <span className="text-[#2dd4bf] tracking-wide">&lt;/h1&gt;</span>
          <br />
          <span className="text-[#2dd4bf] tracking-wide">&lt;p&gt;</span>
          <p className="pl-8 text-3xl sm:text-4xl lg:text-5xl tracking-tighter font-medium">
            Full&#8209;stack web developer and digital wizard, crafting code and
            automating the future.
          </p>
          <span className="text-[#2dd4bf] tracking-wide">&lt;/p&gt;</span>
        </div>
      </section>
    </>
  );
}
