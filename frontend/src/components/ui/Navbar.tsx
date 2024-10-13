import Link from "next/link";
import React from "react";

interface MenuItems {
  item: string;
  path: string;
}

export default function Navbar() {
  const menuItems: MenuItems[] = [
<<<<<<< HEAD
=======
    { item: "Home", path: "/" },
>>>>>>> a4c72e7991682420f9c4094b1861638445e34997
    { item: "Films", path: "/films" },
    { item: "People", path: "/people" },
    { item: "Planets", path: "/planets" },
    { item: "Starships", path: "/starships" },
  ];

  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {menuItems.map(({ item, path }) => {
              return (
                <Link href={path} key={item}>
                  <li>
                    <p>{item}</p>
                  </li>
                </Link>
              );
            })}
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">StarWiki</a>
      </div>
      <div className="navbar-end hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {menuItems.map(({item, path}) => {
            return (
              <Link href={path} key={item}>
              <li>
                <p>{item}</p>
              </li>
            </Link>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
