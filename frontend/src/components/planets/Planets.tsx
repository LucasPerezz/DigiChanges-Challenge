"use client"
import Card from "@/components/ui/Card";
import Pagination from "@/components/ui/Pagination";
import { Planet } from "@/types/types";
import React, { useState } from "react";

interface PlanetsProps {
    planets: Planet[]
}

export default function Planets({planets}: PlanetsProps) {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const pageSize = planets.length / 10;

    const onPageChange = (page: number) => {
      if(currentPage >= 1) {
        setCurrentPage(page);
      }
    }

    const paginate = (items: Planet[], pageNumber: number, pageSize: number) => {
        const starIndex = (pageNumber - 1) * pageSize;
        return items.slice(starIndex, starIndex + pageSize);
    }

    const paginatedPlanets = paginate(planets, currentPage, pageSize);


  return (
    <section className="flex flex-col items-center gap-4">
      <div className="container flex flex-row flex-wrap mx-auto gap-2 justify-center items-center">
        {paginatedPlanets.map((planet: Planet) => {
          return (
            <Card name={planet.name} key={planet.name} />
          );
        })}
      </div>
      <Pagination currentPage={currentPage} pageSize={pageSize} onPageChange={onPageChange} items={planets.length} />
    </section>
  );
}
