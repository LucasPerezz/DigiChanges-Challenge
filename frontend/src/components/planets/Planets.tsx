"use client";

import Card from "@/components/ui/Card";
import Pagination from "@/components/ui/Pagination";
import planetData from "@/services/Planet"; // Servicio que obtiene los planetas desde la API
import { Planet } from "@/types/types";
import React, { useEffect, useState } from "react";

export default function PlanetsPage() {
  const [planets, setPlanets] = useState<Planet[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchPlanet, setSearchPlanet] = useState<string>("");
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const pageSize = 9;

  useEffect(() => {
    const fetchPlanets = async () => {
      setLoading(true);
      const data = await planetData.getPlanets(pageSize, currentPage, searchPlanet);

      if (data.length < pageSize) {
        setHasMore(false);
      } else {
        setHasMore(true);
      }

      setPlanets(data);
      setLoading(false);
    };

    fetchPlanets();
  }, [currentPage, searchPlanet]);

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

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
            value={searchPlanet}
            onChange={(e) => {
              setSearchPlanet(e.target.value);
              setCurrentPage(1);
            }}
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
      />
    </section>
  );
}


