"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";

import React from "react";

interface CardProps {
    name?: string,
    title?: string,
    description?: string,
    gender?:string
}


export default function Card({name, title, description, gender} : CardProps) {
  const pathName = usePathname();

  console.log('card name', name);

  return (
    <div className="card bg-base-100 w-96 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">{name ?? title}</h2>
        <p>{description ?? gender}</p>
        <div className="card-actions justify-end">
          <Link href={`${pathName}/${name ?? ""}`}> 
          <button className="btn btn-primary">View More</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
