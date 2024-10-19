"use client";

import Card from "@/components/ui/Card";
import Pagination from "@/components/ui/Pagination";
import { Planet } from "@/types/types";
import React, { useState } from "react";

interface PlanetsProps {
  planets: Planet[];
}

export default function Planets({ planets }: PlanetsProps) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchPlanet, setSearchPlanet] = useState<string>("");

  const filteredPlanets = planets.filter((planet: Planet) =>
    planet.name.toLowerCase().includes(searchPlanet.toLowerCase())
  );

  const pageSize = 9;
  const totalPages = Math.ceil(filteredPlanets.length / pageSize);

  const onPageChange = (page: number) => {
    if (currentPage >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const paginate = (items: Planet[], pageNumber: number, pageSize: number) => {
    const starIndex = (pageNumber - 1) * pageSize;
    return items.slice(starIndex, starIndex + pageSize);
  };

  const paginatedPlanets = paginate(filteredPlanets, currentPage, pageSize);

  return (
    <section className="flex flex-col justify-around min-h-screen items-center gap-10 container mx-auto w-full">
      <div className="flex flex-col gap-10 w-full">
        <div className="w-full flex flex-col lg:flex-row gap-4 container items-center lg:items-start justify-between">
          <h2 className="text-3xl font-bold underline underline-offset-2">
            Planets
          </h2>
          <input
            type="text"
            placeholder="Search planet..."
            className="input input-bordered w-full max-w-xs"
            value={searchPlanet}
            onChange={(e) => {
              setSearchPlanet(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
        <div className="container flex flex-row flex-wrap mx-auto gap-5 justify-center items-center min-w-full min-h-[400px]">
          {!paginatedPlanets ? (
            <span className="loading loading-dots loading-lg"></span>
          ) : (
            paginatedPlanets.map((planet: Planet) => {
              return (
                <Card
                  title={planet.name}
                  description={planet.terrain}
                  key={planet.name}
                />
              );
            })
          )}
        </div>
      </div>

      {paginatedPlanets && (
        <Pagination
          currentPage={currentPage}
          pageSize={totalPages}
          onPageChange={onPageChange}
          items={filteredPlanets.length}
        />
      )}
    </section>
  );
}


