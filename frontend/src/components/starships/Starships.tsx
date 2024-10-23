"use client";

import Card from "@/components/ui/Card";
import Pagination from "@/components/ui/Pagination";
import starshipData from "@/services/Starship";
import { Starship } from "@/types/types";
import React, { useEffect, useState } from "react";

export default function StarshipsPage() {
  const [starships, setStarships] = useState<Starship[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchStarship, setSearchStarship] = useState<string>("");
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const pageSize = 9;

  useEffect(() => {
    const fetchStarships = async () => {
      setLoading(true);
      const data = await starshipData.getStarships(pageSize, currentPage, searchStarship);

      if (data.length < pageSize) {
        setHasMore(false);
      } else {
        setHasMore(true);
      }

      setStarships(data);
      setLoading(false);
    };

    fetchStarships();
  }, [currentPage, searchStarship]);

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <section className="flex flex-col justify-between min-h-screen items-center gap-10 container mx-auto w-full">
      <div className="flex flex-col gap-10 w-full">
        <div className="w-full flex flex-col lg:flex-row gap-4 container items-center lg:items-start justify-between">
          <h2 className="text-3xl font-bold underline underline-offset-2">
            Starships
          </h2>
          <input
            type="text"
            placeholder="Search starship..."
            className="input input-bordered w-full max-w-xs"
            value={searchStarship}
            onChange={(e) => {
              setSearchStarship(e.target.value);
              setCurrentPage(1);
            }}
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
                description={starship.model}
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
      />
    </section>
  );
}

