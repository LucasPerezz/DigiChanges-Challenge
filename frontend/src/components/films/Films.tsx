"use client";

import Card from "@/components/ui/Card";
import Pagination from "@/components/ui/Pagination";
import filmData from "@/services/Film"; 
import { Film } from "@/types/types";
import React, { useEffect, useState } from "react";

export default function FilmsPage() {
  const [films, setFilms] = useState<Film[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchFilm, setSearchFilm] = useState<string>("");
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const pageSize = 10;

  useEffect(() => {
    const fetchFilms = async () => {
      setLoading(true);
      const data = await filmData.getFilms(pageSize, currentPage, searchFilm);

      if (data.length < pageSize) {
        setHasMore(false);
      } else {
        setHasMore(true);
      }

      setFilms(data);
      setLoading(false);
    };

    fetchFilms();
  }, [currentPage, searchFilm]);

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <section className="flex flex-col justify-between min-h-screen items-center gap-10 container mx-auto w-full">
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
          {loading ? (
            <span className="loading loading-dots loading-lg"></span>
          ) : films.length === 0 ? (
            <p>No Results...</p>
          ) : (
            films.map((film: Film) => (
              <Card
                title={film.title}
                description={film.director}
                key={film.title}
              />
            ))
          )}
        </div>
      </div>

      <Pagination
        currentPage={currentPage}
        onPageChange={onPageChange}
        hasMore={hasMore}
      />
    </section>
  );
}
