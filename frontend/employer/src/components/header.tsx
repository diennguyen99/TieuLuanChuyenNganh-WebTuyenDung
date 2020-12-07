import React from "react";
import { NavLink } from "react-router-dom";
import { useMe } from "../hooks/useMe";

export const Header: React.FC = () => {
  const { data } = useMe();
  return (
    <header className="shadow border-b">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="uppercase text-2xl font-bold"><span className="text-indigo-500">Ute</span> Recruitment</h1>
        <nav>
          <ul className="flex space-x-2">
            <li>
              <NavLink
                to="/"
                className="inline-block py-6 px-4 text-gray-900 font-medium capitalize border-b-2 border-transparent hover:text-teal-500 hover:border-teal-500"
                activeClassName="text-teal-500 border-teal-500">
                Home
              </NavLink>
              <NavLink
                to="/services"
                className="inline-block py-6 px-4 text-gray-900 font-medium capitalize border-b-2 border-transparent hover:text-teal-500 hover:border-teal-500"
                activeClassName="text-teal-500 border-teal-500">
                Services
              </NavLink>
              <NavLink
                to="/packages"
                className="inline-block py-6 px-4 text-gray-900 font-medium capitalize border-b-2 border-transparent hover:text-teal-500 hover:border-teal-500"
                activeClassName="text-teal-500 border-teal-500">
                Packages
              </NavLink>
              <NavLink
                to="/login"
                className="inline-block py-6 px-4 text-gray-900 font-medium capitalize border-b-2 border-transparent hover:text-teal-500 hover:border-teal-500"
                activeClassName="text-teal-500 border-teal-500">
                Login
              </NavLink>
              <NavLink
                to="/register"
                className="inline-block py-6 px-4 text-gray-900 font-medium capitalize border-b-2 border-transparent hover:text-teal-500 hover:border-teal-500"
                activeClassName="text-teal-500 border-teal-500">
                Register
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
