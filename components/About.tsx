import React from "react";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import { BiLogoTypescript } from "react-icons/bi";
import { IoLogoReact } from "react-icons/io5";
import { FaNode } from "react-icons/fa";
import { TbBrandNextjs } from "react-icons/tb";
import { FaGithub } from "react-icons/fa";
import { BiLogoPostgresql } from "react-icons/bi";
import { RiSupabaseFill } from "react-icons/ri";
import { SiMongodb } from "react-icons/si";
import { SiWeb3Dotjs } from "react-icons/si";
import { SiRedux } from "react-icons/si";
import { IoLogoCss3 } from "react-icons/io";
import { FaRust } from "react-icons/fa6";

import Reveal from "./Reveal";

const aboutMe = [
  {
    technology: "TypeScript",
    description:
      "Experienced in TypeScript, a statically typed superset of JavaScript, enhancing code quality and maintainability.",
    icon: <BiLogoTypescript size={35} />,
  },
  {
    technology: "React.js",
    description:
      "Skilled in building user interfaces using React.js library, creating reusable and modular components.",
    icon: <IoLogoReact size={35} />,
  },
  {
    technology: "Node.js",
    description:
      "Experienced in using Node.js for server-side and backend development, capable of building RESTful APIs and handling asynchronous operations.",
    icon: <FaNode size={35} />,
  },
  {
    technology: "Next.js",
    description:
      "Proficient in Next.js framework for building server-rendered and statically-generated web applications, utilizing features like SSR and automatic code splitting.",
    icon: <TbBrandNextjs size={35} />,
  },
  {
    technology: "Rust",
    description:
      "Experienced in Rust, enhancing code quality and maintainability.",
    icon: <FaRust size={35} />,
  },
  {
    technology: "CSS & Tailwind CSS",
    description:
      "Proficient in styling web pages using CSS and Tailwind CSS for rapid development and easy customization of UI components, leveraging utility-first approach.",
    icon: <IoLogoCss3 size={35} />,
  },
  {
    technology: "PostgreSQL",
    description:
      "Skilled in working with PostgreSQL, a powerful relational database management system, capable of designing schemas and optimizing database performance.",
    icon: <BiLogoPostgresql size={35} />,
  },
  {
    technology: "Supabase",
    description:
      "Experienced in utilizing Supabase for building scalable web applications with real-time database functionality and authentication mechanisms.",
    icon: <RiSupabaseFill size={35} />,
  },
  {
    technology: "MongoDB",
    description:
      "Skilled in MongoDB, a NoSQL database for storing and managing unstructured data, capable of designing schema-less databases and performing CRUD operations.",
    icon: <SiMongodb size={35} />,
  },
  {
    technology: "Web3",
    description:
      "Experienced in building decentralized applications (dApps) using Web3 standards and protocols, capable of interacting with blockchain networks like Ethereum.",
    icon: <SiWeb3Dotjs size={35} />,
  },
  {
    technology: "Redux",
    description:
      "Skilled in using Redux for managing application state in complex React.js applications, ensuring data consistency and scalability.",
    icon: <SiRedux size={35} />,
  },
  {
    technology: "Git",
    description:
      "Proficient in using Git for version control and collaborative software development, capable of managing codebase efficiently and resolving merge conflicts.",
    icon: <FaGithub size={35} />,
  },
];
const About = () => {
  return (
    <Reveal>
      <div className="font-black py-10 lg:text-[50px] sm:text-[30px] text-lightPurple2">
        ● Skills
      </div>
      <div
        className="grid lg:grid-cols-3 sm:grid-cols-2 gap-4 items-center lg:p-5 sm:p-2"
        id="about"
      >
        {aboutMe.map((item) => (
          <BackgroundGradient className="rounded-[22px] bg-darkPurple lg:p-5 sm:p-2 lg:h-[260px] sm:h-[180px] flex-col flex items-center text-center gap-2">
            {item.icon}
            <span className="font-black lg:text-md sm:text-sm">
              {item.technology}
            </span>
            <span className="lg:text-sm sm:text-xxsm">{item.description}</span>
          </BackgroundGradient>
        ))}
      </div>
    </Reveal>
  );
};

export default About;
