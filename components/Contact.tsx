import React from "react";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import XIcon from "@mui/icons-material/X";
import GitHubIcon from "@mui/icons-material/GitHub";
import Link from "next/link";
import PlaceIcon from "@mui/icons-material/Place";
import Reveal from "./Reveal";

const Contact = () => {
  return (
    <Reveal>
      <div
        className="flex flex-col w-full justify-center items-center h-screen gap-3 lg:text-md sm:text-sm"
        id="contact"
      >
        <div className=" lg:text-[70px] sm:text-[40px] font-black flex">
          Contact<p className="text-lightPurple2">.</p>
        </div>
        <div className="font-bold text-center lg:text-lg sm:text-sm">
          Looking for a full-time, part-time or freelancer developer willing to
          work remotely?
        </div>
        <div className="text-lightPurple2 lg:text-sm sm:text-xsm">
          Contact me through Email or social media to discuss more!
        </div>
        <div className="lg:flex sm:hidden gap-10 pb-4">
          <Link href="https://github.com/shadatr">
            <GitHubIcon sx={{ fontSize: 52 }} />
          </Link>
          <Link href="https://www.linkedin.com/in/shada-tareq-990451266/">
            <LinkedInIcon sx={{ fontSize: 52 }} />
          </Link>
          <Link href="https://twitter.com/itsshdab">
            <XIcon sx={{ fontSize: 52 }} />
          </Link>
        </div>
        <div className="sm:flex lg:hidden gap-10 pb-4">
          <Link href="https://github.com/shadatr">
            <GitHubIcon sx={{ fontSize: 30 }} />
          </Link>
          <Link href="https://www.linkedin.com/in/shada-daab-990451266/">
            <LinkedInIcon sx={{ fontSize: 30 }} />
          </Link>
          <Link href="https://twitter.com/itsshdab">
            <XIcon sx={{ fontSize: 30 }} />
          </Link>
        </div>
        <div>shadadaab@gmail.com</div>
        <div></div>
        <div className="font-bold">
          <PlaceIcon />
          Turkey, Istanbul
        </div>
      </div>
    </Reveal>
  );
};

export default Contact;
