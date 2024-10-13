"use client"

import Card from "@/components/ui/Card";
import Pagination from "@/components/ui/Pagination";
import { Film } from "@/types/types";
import React, { useState } from "react";

interface FilmsProps {
    films: Film[]
}

export default function Films({films}: FilmsProps) {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const pageSize = films.length < 10 ? films.length : films.length / 10;

    const onPageChange = (page: number) => {
        if(currentPage >= 1) setCurrentPage(page);
    }

    const paginate = (items: Film[], pageNumber: number, pageSize: number) => {
        const starIndex = (pageNumber - 1) * pageSize;
        return items.slice(starIndex, starIndex + pageSize);
    }

    const paginatedPeople = paginate(films, currentPage, pageSize);


  return (
    <section className="flex flex-col items-center gap-4">
      <div className="container flex flex-row flex-wrap mx-auto gap-2 justify-center items-center">
        {paginatedPeople.map((film: Film) => {
          return (
            <Card name={film.title} key={film.title} />
          );
        })}
      </div>
      <Pagination currentPage={currentPage} pageSize={pageSize} onPageChange={onPageChange} items={films.length} />
    </section>
  )
}
