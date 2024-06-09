"use client";
import React from "react";
import { HeroParallax } from "./ui/hero-parallax";
import { PinContainer } from "./ui/3d-pin";
import Image from "next/image";
import Link from "next/link";
import Reveal from "./Reveal";

function Work() {
  return (
    <div id="work">
      <div className="font-black py-10 lg:text-[50px] sm:text-[30px] text-lightPurple2">● Work</div>
      <Reveal>
        <HeroParallax products={products} />
      </Reveal>
      <div>
      <div className="font-black py-10 sm:mb-40 lg:mb-1 lg:text-[50px] sm:text-[30px] text-lightPurple2">● projects</div>
        <div className=" w-full flex flex-col lg:gap-20 sm:gap-80 items-center justify-center ">
          <Reveal>
            <Link
              href="https://github.com/shadatr/bookitnow"
              className="font-bold text-lightPurple2 underline sm:hidden lg:flex"
            >
              Github repositpries for BookItNow
            </Link>

            <PinContainer
              title="bookitnow-ten.vercel.app"
              href="https://bookitnow-ten.vercel.app/"
            >
              <div className="flex lg:flex-row sm:flex-col gap-10  basis-full p-4 tracking-tight text-slate-100/50 sm:basis-1/2 lg:w-[50rem]  sm:w-[300px]">
                <div className=" lg:w-[50%]">
                  <h3 className="max-w-xs !pb-2 !m-0 font-bold text-md text-base text-slate-100">
                    BookItNow
                  </h3>
                  <Image
                    height="100"
                    width="1000"
                    className="w-full h-auto"
                    src="/bookItNow1.png"
                    alt="image"
                  />
                </div>
                <div className="text-secondary lg:w-[50%] lg:text-sm sm:text-[14px]">
                  BookItNow is a Next.js web app I built, offering a seamless
                  booking experience inspired by Airbnb. It allows users to
                  list, reserve, and manage accommodations. BookItNow showcases
                  my skills in frontend development, authentication, and
                  database integration.
                  <p className="text-lightPurple2 font-bold">Technologies:</p>
                  <span className="grid  grid-cols-2 gap-2">
                    <p className="bg-lightPurple1 p-1 rounded-lg font-bold flex justify-center">
                      React
                    </p>
                    <p className="bg-lightPurple1 p-1 rounded-lg font-bold flex justify-center">
                      TypeScript
                    </p>
                    <p className="bg-lightPurple1 p-1 rounded-lg font-bold flex justify-center">
                      Tailwind CSS
                    </p>
                    <p className="bg-lightPurple1 p-1 rounded-lg font-bold flex justify-center lg:text-sm sm:text-[12px]">
                      Supabase || PostgreSQL
                    </p>
                    <p className="bg-lightPurple1 p-1 rounded-lg font-bold flex justify-center">
                      Next.js{" "}
                    </p>
                  </span>
                </div>
              </div>
            </PinContainer>
          </Reveal>
          <Reveal>
            <Link
              href="https://github.com/shadatr/phoenix-tech"
              className="font-bold text-lightPurple2 underline sm:hidden lg:flex"
            >
              Github repositpries for PhoenixTech
            </Link>
            <PinContainer
              title="phoenix-tech-swart.vercel.app"
              href="https://phoenix-tech-swart.vercel.app/"
            >
              <div className="flex lg:flex-row sm:flex-col gap-10  basis-full p-4 tracking-tight text-slate-100/50 sm:basis-1/2 lg:w-[50rem]  sm:w-[300px]">
                <div className=" lg:w-[50%]">
                  <h3 className="max-w-xs !pb-2 !m-0 font-bold text-md text-base text-slate-100">
                    PhoenixTech
                  </h3>
                  <Image
                    height="100"
                    width="1000"
                    className="w-full h-auto"
                    src="/tech1.png"
                    alt="image"
                  />
                </div>
                <div className="text-secondary lg:w-[50%] lg:text-sm sm:text-[14px]">
                  PhoenixTech is a demonstrating my frontend skills. It's a
                  sleek website offering software services and engaging blog
                  content. With interactive animations and efficient state
                  management, PhoenixTech showcases my ability to create
                  dynamic, responsive and user-friendly web experiences.
                  <p className="text-lightPurple2 font-bold">Technologies:</p>
                  <span className="grid  grid-cols-2 gap-2">
                    <p className="bg-lightPurple1 p-1 rounded-lg font-bold flex justify-center">
                      React
                    </p>
                    <p className="bg-lightPurple1 p-1 rounded-lg font-bold flex justify-center">
                      TypeScript
                    </p>
                    <p className="bg-lightPurple1 p-1 rounded-lg font-bold flex justify-center">
                      Redux
                    </p>
                    <p className="bg-lightPurple1 p-1 rounded-lg font-bold flex justify-center">
                      Framer Motion
                    </p>
                  </span>
                </div>
              </div>
            </PinContainer>
          </Reveal>
          <Reveal>
            <Link
              href="https://github.com/shadatr/media-mingle"
              className="font-bold text-lightPurple2 underline sm:hidden lg:flex"
            >
              Github repositpries for MediaMingle
            </Link>
            <PinContainer
              title="media-mingle-eight.vercel.app"
              href="https://media-mingle-eight.vercel.app/"
            >
             <div className="flex lg:flex-row sm:flex-col gap-10  basis-full p-4 tracking-tight text-slate-100/50 sm:basis-1/2 lg:w-[50rem]  sm:w-[300px]">
                <div className=" lg:w-[50%]">
                  <h3 className="max-w-xs !pb-2 !m-0 font-bold text-md text-base text-slate-100">
                    MediaMingle
                  </h3>
                  <Image
                    height="100"
                    width="1000"
                    className="w-full h-auto"
                    src="/media1.png"
                    alt="image"
                  />
                </div>
                <div className="text-secondary lg:w-[50%] lg:text-sm sm:text-[14px]">
                  MediaMingle is my Twitter-inspired project. It features
                  posting, commenting, liking, following, messaging, and
                  authentication functionalities. MediaMingle highlights my
                  skills in frontend development, user interaction, and
                  real-time updates using Supabase.
                  <p className="text-lightPurple2 font-bold">Technologies:</p>
                  <span className="grid  grid-cols-2 gap-2">
                    <p className="bg-lightPurple1 p-1 rounded-lg font-bold flex justify-center">
                      React
                    </p>
                    <p className="bg-lightPurple1 p-1 rounded-lg font-bold flex justify-center">
                      TypeScript
                    </p>
                    <p className="bg-lightPurple1 p-1 rounded-lg font-bold flex justify-center">
                      Tailwind CSS
                    </p>
                    <p className="bg-lightPurple1 p-1 rounded-lg font-bold flex justify-center">
                      Real-time Supabase
                    </p>
                    <p className="bg-lightPurple1 p-1 rounded-lg font-bold flex justify-center">
                      Next.js
                    </p>
                  </span>
                </div>
              </div>
            </PinContainer>
          </Reveal>
          <Reveal>
            <Link
              href="https://github.com/shadatr/solana-twitter"
              className="font-bold text-lightPurple2 underline sm:hidden lg:flex"
            >
              Github repositpries for PhoenixTech
            </Link>
            <PinContainer
              title="solana-twitter-five.vercel.app"
              href="https://solana-twitter-five.vercel.app/"
            >
              <div className="flex lg:flex-row sm:flex-col gap-10  basis-full p-4 tracking-tight text-slate-100/50 sm:basis-1/2 lg:w-[50rem]  sm:w-[300px]">
                <div className=" lg:w-[50%]">
                  <h3 className="max-w-xs !pb-2 !m-0 font-bold text-md text-base text-slate-100">
                    Solana twitter
                  </h3>
                  <Image
                    height="100"
                    width="1000"
                    className="w-full h-auto"
                    src="/solana.png"
                    alt="image"
                  />
                </div>
                <div className="text-secondary lg:w-[50%] lg:text-sm sm:text-[14px]">
                  Solana Twitter is my project utilizing the Solana blockchain.
                  It allows users to tweet, search for users, tags, and topics
                  securely through Solana wallet authentication. Solana Twitter
                  demonstrates my skills in decentralized application
                  development and blockchain integration..
                  <p className="text-lightPurple2 font-bold">Technologies:</p>
                  <span className="grid  grid-cols-2 gap-2">
                  <p className="bg-lightPurple1 p-1 rounded-lg font-bold flex justify-center">
                      Rust
                    </p>
                    <p className="bg-lightPurple1 p-1 rounded-lg font-bold flex justify-center">
                      React
                    </p>
                    <p className="bg-lightPurple1 p-1 rounded-lg font-bold flex justify-center">
                      TypeScript
                    </p>
                    <p className="bg-lightPurple1 p-1 rounded-lg font-bold flex justify-center">
                      Tailwind CSS
                    </p>
                  </span>
                </div>
              </div>
            </PinContainer>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
export default Work;

export const products = [
  {
    title: "bookItNow",
    thumbnail: "/bookItNow2.png",
  },
  {
    title: "bookItNow",
    thumbnail: "/bookItNow1.png",
  },
  {
    title: "bookItNow",
    thumbnail: "/bookItNow3.png",
  },

  {
    title: "MediaMingle",
    thumbnail: "/media1.png",
  },
  {
    title: "MediaMingle",
    thumbnail: "/media2.png",
  },
  {
    title: "MediaMingle",
    thumbnail: "/media3.png",
  },

  {
    title: "MediaMingle",
    thumbnail: "/media4.png",
  },
  {
    title: "PheoenixTech",
    thumbnail: "/tech1.png",
  },
  {
    title: "PheoenixTech",
    thumbnail: "/tech2.png",
  },
  {
    title: "PheoenixTech",
    thumbnail: "/tech3.png",
  },
  {
    title: "PheoenixTech",
    thumbnail: "/tech3.png",
  },
];
