"use client";

import Card from "@/components/ui/Card";
import Pagination from "@/components/ui/Pagination";
import { usePagination } from "@/hooks/usePagination";
import planetData from "@/services/Planet";
import { Planet } from "@/types/types";
import React, { useCallback } from "react";

export default function PlanetsPage() {
  const pageSize = 9;

  const fetchPlanets = useCallback(
    async (pageSize: number, currentPage: number, search: string) => {
      return await planetData.getPlanets(pageSize, currentPage, search);
    },
    []
  );

  const {
    data: planets,
    currentPage,
    searchTerm,
    hasMore,
    loading,
    onSearchChange,
    onPageChange,
  } = usePagination<Planet>(fetchPlanets, pageSize);

  return (
    <section className="flex flex-col justify-between min-h-screen items-center gap-10 container mx-auto w-full">
      <div className="flex flex-col gap-10 w-full">
        <div className="w-full flex flex-col lg:flex-row gap-4 container items-center lg:items-start justify-between">
          <h2 className="text-3xl font-bold underline underline-offset-2">
            Planets
          </h2>
          <input
            type="text"
            placeholder="Search planet..."
            className="input input-bordered w-full max-w-xs"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
        <div className="container flex flex-row flex-wrap mx-auto gap-5 justify-center items-center min-w-full min-h-[400px]">
          {loading ? (
            <span className="loading loading-dots loading-lg"></span>
          ) : planets.length === 0 ? (
            <p>No Results...</p>
          ) : (
            planets.map((planet: Planet) => (
              <Card
                title={planet.name}
                description={planet.terrain}
                key={planet.name}
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
