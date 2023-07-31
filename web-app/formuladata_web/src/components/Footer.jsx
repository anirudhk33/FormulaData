import { useState } from "react";
import { navLinks } from "../constants";

export const Footer = () => {
  const [toggle, setToggle] = useState(false);

  return (
    <div className="max-w-8xl w-full m-auto mt-8 pt-3 mb-2 sm:pt-3 text-center text-gray-200 border-t ">
      <p className="flex flex-row items-center justify-center sm:gap-[800px] gap-[100px]">
        <div className="inline-flex items-center uppercase text-[10px] font-bold tracking-widest">
          Made with{" "}
          <div className="space-x-2 inline-flex items-center -mt-1 ml-3">
            <span>
              <img
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"
                width="20"
                title="React"
              />
              <span className="sr-only">React</span>
            </span>
            <span>
              <img
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg"
                width="20"
                title="Tensorflow"
              />
              <span className="sr-only">Tensorflow</span>
            </span>
            <span>
              <img
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg"
                width="20"
                title="Python"
              />
              <span className="sr-only">Python</span>
            </span>
          </div>
        </div>
        <div className="-mt-1 text-xs ">
          Made by{" "}
          <a href="mailto:anirudhk@ucla.edu" className="text-white font-medium">
            Anirudh Krishna
          </a>
        </div>
      </p>
    </div>
  );
};
