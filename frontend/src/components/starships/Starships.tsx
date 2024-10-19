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

  const pageSize = 9;
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

  const paginatedStarships = paginate(filteredStarships, currentPage, pageSize);

  return (
    <section className="flex flex-col justify-around min-h-screen items-center gap-10 container mx-auto w-full">
      <div className="flex flex-col gap-10 w-full">
        <div className="w-full flex flex-col lg:flex-row gap-4 container items-center lg:items-start justify-between">
          <h2 className="text-3xl font-bold underline underline-offset-2">
            Starships
          </h2>
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
        </div>
        <div className="container flex flex-row flex-wrap mx-auto gap-5 justify-center items-center min-w-full min-h-[400px]">
          {!paginatedStarships ? (
            <span className="loading loading-dots loading-lg"></span>
          ) : (
            paginatedStarships.map((starship: Starship) => {
              return (
                <Card
                  title={starship.name}
                  description={starship.model}
                  key={starship.name}
                />
              );
            })
          )}
        </div>
      </div>

      {paginatedStarships && (
        <Pagination
          currentPage={currentPage}
          pageSize={totalPages}
          onPageChange={onPageChange}
          items={filteredStarships.length}
        />
      )}
    </section>
  );
}
