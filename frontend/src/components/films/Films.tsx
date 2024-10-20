"use client";

import Card from "@/components/ui/Card";
import Pagination from "@/components/ui/Pagination";
import { Film } from "@/types/types";
import React, { useState } from "react";

interface FilmsProps {
  films: Film[];
}

export default function Films({ films }: FilmsProps) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchFilm, setSearchFilm] = useState<string>("");

  const filteredFilms = films.filter((film: Film) =>
    film.title.toLowerCase().includes(searchFilm.toLowerCase())
  );

  const pageSize = 9;
  const totalPages = Math.ceil(filteredFilms.length / pageSize);

  const onPageChange = (page: number) => {
    if (currentPage >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const paginate = (items: Film[], pageNumber: number, pageSize: number) => {
    const starIndex = (pageNumber - 1) * pageSize;
    return items.slice(starIndex, starIndex + pageSize);
  };

  const paginatedFilms = paginate(filteredFilms, currentPage, pageSize);

  return (
    <section className="flex flex-col justify-around min-h-screen items-center gap-10 container mx-auto w-full">
      <div className="flex flex-col gap-10 w-full">
        <div className="w-full flex flex-col lg:flex-row gap-4 container items-center lg:items-start justify-between">
          <h2 className="text-3xl font-bold underline underline-offset-2">
            Films
          </h2>
          <input
            type="text"
            placeholder="Search film..."
            className="input input-bordered w-full max-w-xs"
            value={searchFilm}
            onChange={(e) => {
              setSearchFilm(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
        <div className="container flex flex-row flex-wrap mx-auto gap-5 justify-center items-center min-w-full min-h-[400px]">
          {!filteredFilms ? (
            <span className="loading loading-dots loading-lg"></span>
          ) : (
            paginatedFilms.map((film: Film) => {
              return (
                <Card
                  title={film.title}
                  description={film.director}
                  key={film.title}
                />
              );
            })
          )}
        </div>
      </div>

      {paginatedFilms && (
        <Pagination
          currentPage={currentPage}
          pageSize={totalPages}
          onPageChange={onPageChange}
          items={filteredFilms.length}
        />
      )}
    </section>
  );
}

