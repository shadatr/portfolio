import React from "react";
import Reveal from "./Reveal";
import { TypewriterEffect } from "./ui/typewriter-effect";

const words = [
  { text: "An" },
  { text: "experienced" },
  { text: "blockchain" },
  { text: "and" },
  { text: "web" },
  { text: "developer.", className: "bg-lightPurple1" },
];

const Home = () => {
  return (
    <div id="home">
      <Reveal className="flex flex-col pt-10 justify-center gap-5 h-[100vh] sm:pl-10">
        <span className="font-bold lg:text-md sm:text-xsm">
          Welcome to my portfolio website! I'm
        </span>
        <div className="lg:text-[80px]  sm:text-[40px] lg:w-[450px] sm:w-full text-secondary font-black items-center justify-center flex flex-row">
          <div className="flex">
            <p>Shada Daab </p>
            <p className="text-lightPurple1"> ,</p>
          </div>
        </div>
        <div className="">
          <TypewriterEffect
            words={words}
            className="items-start flex lg:text-[30px] sm:text-sm"
          />
        </div>
        <div className="lg:text-[18px] sm:text-[12px] pt-5 text-lightPurple2">
          With years of experience, I specialize in JavaScript, TypeScript, Rust, Solana,
          React.js, Node.js, Next.js , CSS, Tailwind CSS, PostgreSQL,
          Supabase,MongoDB, web3, Redux, and Git.
        </div>
      </Reveal>
    </div>
  );
};

export default Home;
