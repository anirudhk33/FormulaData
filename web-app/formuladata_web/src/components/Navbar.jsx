import { useState } from "react";
import react from "../assets/react.svg";
import { navLinks } from "../constants";
import logo from "../assets/logo.png";
import menu from "../assets/menu.svg";
import close from "../assets/close.svg";
import car from "../assets/car.svg";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="w-full flex py-6 justify-between items-center navbar">
      <img src={car} alt="formuladata" className="w-[50px] h-[50px]" />
      <h3 className="font-lobster font-normal text-red-gradient-2 text-[40px] ml-0">
        FormulaData
      </h3>
      <ul className="list-none sm:flex hidden justify-end items-center flex-1 ">
        {navLinks.map((nav, index) => (
          <li
            key={nav.id}
            className={`font-poppins font-normal cursor-pointer text-[16px] $
            } ${index === navLinks.length - 1 ? "mr-0" : "mr-10"} text-white`}
          >
            <a
              onClick={() => {
                navigate(`${nav.route}`);
              }}
              className="hover:text-customRed"
              // href={`#${nav.id}`}
            >
              {nav.title}
            </a>
          </li>
        ))}
      </ul>

      <div className="sm:hidden flex flex-1 justify-end items-center">
        <img
          src={toggle ? close : menu}
          alt="menu"
          className="w-[28px] h-[28px] object-contain"
          onClick={() => setToggle(!toggle)}
        />

        <div
          className={`${
            !toggle ? "hidden" : "flex"
          } p-6 bg-black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar`}
        >
          <ul className="list-none flex justify-end items-start flex-1 flex-col">
            {navLinks.map((nav, index) => (
              <li
                key={nav.id}
                className={`font-poppins font-medium cursor-pointer text-[16px] ${
                  index === navLinks.length - 1 ? "mb-0" : "mb-4"
                }`}
              >
                <a href={`#${nav.id}`}>{nav.title}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};
