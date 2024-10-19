"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GrFormView } from "react-icons/gr";

import React from "react";

interface CardProps {
  title?: string;
  description?: string;
}

export default function Card({ title, description }: CardProps) {
  const pathName = usePathname();

  return (
    <div className="card bg-base-200 w-96 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>{description}</p>
        <div className="card-actions justify-center">
          <Link href={`${pathName}/${title ?? ""}`}>
            <button className="btn btn-base-100 flex items-center"><GrFormView size={40}/><span>More Information</span></button>
          </Link>
        </div>
      </div>
    </div>
  );
}
