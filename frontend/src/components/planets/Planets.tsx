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

  const filteredPlanet = planets.filter((planet: Planet) =>
    planet.name.toLowerCase().includes(searchPlanet.toLowerCase())
  );

  const pageSize = 10;

  const totalPages = Math.ceil(filteredPlanet.length / pageSize);

  const onPageChange = (page: number) => {
    if (currentPage >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const paginate = (items: Planet[], pageNumber: number, pageSize: number) => {
    const starIndex = (pageNumber - 1) * pageSize;
    return items.slice(starIndex, starIndex + pageSize);
  };

  const paginatedPlanets = paginate(filteredPlanet, currentPage, pageSize);

  return (
    <section className="flex flex-col items-center gap-4">
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
      <div className="container flex flex-row flex-wrap mx-auto gap-2 justify-center items-center">
        {paginatedPlanets.map((planet: Planet) => {
          return <Card name={planet.name} key={planet.name} />;
        })}
      </div>
      <Pagination
        currentPage={currentPage}
        pageSize={totalPages}
        onPageChange={onPageChange}
        items={filteredPlanet.length}
      />
    </section>
  );
}
