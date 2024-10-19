import Image from "next/image";
import Link from "next/link";
import React from "react";

interface MenuItems {
  item: string;
  path: string;
}

export default function Navbar() {
  const menuItems: MenuItems[] = [
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
        <div className="flex items-center gap-2">
          <Image src={'https://i.ibb.co/dBrKSDr/pngegg.png'} height={50} width={50} alt="logo starwiki" />
          <a className="btn btn-ghost text-xl lg:text-3xl">StarWiki</a>
        </div>
      </div>
      <div className="navbar-end hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {menuItems.map(({ item, path }) => {
            return (
              <Link href={path} key={item} className="text-lg lg:text-xl">
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
