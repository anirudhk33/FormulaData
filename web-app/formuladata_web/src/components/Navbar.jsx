import { useState } from "react";
import react from "../assets/react.svg";
import { navLinks } from "../constants";
import logo from "../assets/logo.png";
import menu from "../assets/menu.svg";
import close from "../assets/close.svg";
import car from "../assets/car.svg";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

export const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="w-full flex py-5 justify-between items-center navbar">
      <img
        src={logo}
        alt="formuladata"
        className="w-[50px] h-[50px] hover:cursor-pointer"
        onClick={() => navigate("/Home")}
      />
      <h3
        onClick={() => navigate("/Home")}
        className="font-poppins font-medium gradient-text-redbull text-[29px] pl-3 hover:cursor-pointer"
      >
        FormulaData
      </h3>
      <ul className="list-none sm:flex hidden justify-end items-center flex-1 ">
        {navLinks.map((nav, index) => (
          <li
            key={nav.id}
            className={`font-poppins font-normal cursor-pointer text-[15px] ${
              index === navLinks.length - 1 ? "mr-0" : "mr-10"
            } ${
              location.pathname === nav.route
                ? "text-redbullYellow"
                : "text-white" // <-- Add this line
            }`}
          >
            <a
              onClick={() => {
                navigate(`${nav.route}`);
              }}
              className="hover:text-redbullYellow"
              // href={`#${nav.id}`}
            >
              {nav.title}
            </a>
          </li>
        ))}
      </ul>

      <div className="sm:hidden flex flex-1 justify-end items-center hover:cursor-pointer">
        <img
          src={toggle ? close : menu}
          alt="menu"
          className="w-[28px] h-[28px] object-contain"
          onClick={() => {
            setToggle(!toggle);
          }}
        />

        <div
          className={`${
            !toggle ? "hidden" : "flex"
          } p-6 bg-black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar`}
        >
          <ul className="list-none text-gray-200 flex justify-end items-start flex-1 flex-col">
            {navLinks.map((nav, index) => (
              <li
                key={nav.id}
                className={`font-poppins font-medium cursor-pointer text-[16px] ${
                  index === navLinks.length - 1 ? "mb-0" : "mb-4"
                }`}
              >
                <a
                  onClick={() => {
                    navigate(`${nav.route}`);
                  }}
                  className="hover:text-redbullYellow"
                  // href={`#${nav.id}`}
                >
                  {nav.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};
