"use client";

import Card from "@/components/ui/Card";
import Pagination from "@/components/ui/Pagination";
import { usePagination } from "@/hooks/usePagination";
import filmData from "@/services/Film"; 
import { Film } from "@/types/types";
import React, { useCallback } from "react";

export default function FilmsPage() {
  const pageSize = 10;

  const fetchFilms = useCallback(
    async (pageSize: number, currentPage: number, search: string) => {
      return await filmData.getFilms(pageSize, currentPage, search);
    },
    []
  );

  const {
    data: films,
    currentPage,
    searchTerm,
    hasMore,
    loading,
    onSearchChange,
    onPageChange,
  } = usePagination<Film>(fetchFilms, pageSize);

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
            value={searchTerm}  
            onChange={(e) => onSearchChange(e.target.value)} 
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
        loading={loading}
      />
    </section>
  );
}
