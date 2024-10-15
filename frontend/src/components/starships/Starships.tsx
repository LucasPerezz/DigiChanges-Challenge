"use client";
import { Starship } from "@/types/types";
import React, { useState } from "react";
import Card from "../ui/Card";
import Pagination from "../ui/Pagination";

interface StarshipsProps {
  starships: Starship[];
}

export default function Starships({ starships }: StarshipsProps) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchStarship, setSearchStarship] = useState<string>("");

  const filteredStarships = starships.filter((starship: Starship) =>
    starship.name.toLowerCase().includes(searchStarship.toLowerCase())
  );

  const pageSize = 10;

  const totalPages = Math.ceil(filteredStarships.length / pageSize);

  const onPageChange = (page: number) => {
    if (currentPage >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const paginate = (
    items: Starship[],
    pageNumber: number,
    pageSize: number
  ) => {
    const starIndex = (pageNumber - 1) * pageSize;
    return items.slice(starIndex, starIndex + pageSize);
  };

  const paginatedstarships = paginate(filteredStarships, currentPage, pageSize);

  return (
    <section className="flex flex-col items-center gap-4">
      <input
        type="text"
        placeholder="Search starship..."
        className="input input-bordered w-full max-w-xs"
        value={searchStarship}
        onChange={(e) => {
          setSearchStarship(e.target.value);
          setCurrentPage(1);
        }}
      />
      <div className="container flex flex-row flex-wrap mx-auto gap-2 justify-center items-center">
        {paginatedstarships.map((starship: Starship) => {
          return <Card name={starship.name} key={starship.name} />;
        })}
      </div>
      <Pagination
        currentPage={currentPage}
        pageSize={totalPages}
        onPageChange={onPageChange}
        items={filteredStarships.length}
      />
    </section>
  );
}
