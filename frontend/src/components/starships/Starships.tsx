"use client";

import Card from "@/components/ui/Card";
import Pagination from "@/components/ui/Pagination";
import { usePagination } from "@/hooks/usePagination";
import starshipData from "@/services/Starship";
import { Starship } from "@/types/types";
import React, { useCallback } from "react";

export default function Starships() {
  const pageSize = 10;

  const fetchStarships = useCallback(
    async (pageSize: number, currentPage: number, search: string) => {
      return await starshipData.getStarships(pageSize, currentPage, search);
    },
    []
  );

  const {
    data: starships,
    currentPage,
    searchTerm,
    hasMore,
    loading,
    onSearchChange,
    onPageChange,
  } = usePagination<Starship>(fetchStarships, pageSize);

  return (
    <section className="flex flex-col justify-between min-h-screen items-center gap-10 container mx-auto w-full">
      <div className="flex flex-col gap-10 w-full">
        <div className="w-full flex flex-col lg:flex-row gap-4 container items-center lg:items-start justify-between">
          <h2 className="text-3xl font-bold underline underline-offset-2">Starships</h2>
          <input
            type="text"
            placeholder="Search starship..."
            className="input input-bordered w-full max-w-xs"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
        <div className="container flex flex-row flex-wrap mx-auto gap-5 justify-center items-center min-w-full min-h-[400px]">
          {loading ? (
            <span className="loading loading-dots loading-lg"></span>
          ) : starships.length === 0 ? (
            <p>No Results...</p>
          ) : (
            starships.map((starship: Starship) => (
              <Card
                title={starship.name}
                description={starship.manufacturer}
                key={starship.name}
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
