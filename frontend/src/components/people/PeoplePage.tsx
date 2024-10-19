"use client";

import Card from "@/components/ui/Card";
import Pagination from "@/components/ui/Pagination";
import { People } from "@/types/types";
import React, { useState } from "react";

interface PeopleProps {
  people: People[];
}

export default function PeoplePage({ people }: PeopleProps) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchPerson, setSearchPerson] = useState<string>("");

  const filteredPeople = people.filter((person: People) =>
    person.name.toLowerCase().includes(searchPerson.toLowerCase())
  );

  const pageSize = 9; 
  const totalPages = Math.ceil(filteredPeople.length / pageSize);

  const onPageChange = (page: number) => {
    if (currentPage >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const paginate = (items: People[], pageNumber: number, pageSize: number) => {
    const starIndex = (pageNumber - 1) * pageSize;
    return items.slice(starIndex, starIndex + pageSize);
  };

  const paginatedPeople = paginate(filteredPeople, currentPage, pageSize);

  return (
    <section className="flex flex-col justify-around min-h-screen items-center gap-10 container mx-auto w-full">
      <div className="flex flex-col gap-10 w-full">
        <div className="w-full flex flex-col lg:flex-row gap-4 container items-center lg:items-start justify-between">
          <h2 className="text-3xl font-bold underline underline-offset-2">
            People
          </h2>
          <input
            type="text"
            placeholder="Search person..."
            className="input input-bordered w-full max-w-xs"
            value={searchPerson}
            onChange={(e) => {
              setSearchPerson(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
        <div className="container flex flex-row flex-wrap mx-auto gap-5 justify-center items-center min-w-full min-h-[400px]">
          {!paginatedPeople ? (
            <span className="loading loading-dots loading-lg"></span>
          ) : (
            paginatedPeople.map((person: People) => {
              return (
                <Card
                  title={person.name}
                  description={person.gender}
                  key={person.name}
                />
              );
            })
          )}
        </div>
      </div>

      {paginatedPeople && (
        <Pagination
          currentPage={currentPage}
          pageSize={totalPages}
          onPageChange={onPageChange}
          items={filteredPeople.length}
        />
      )}
    </section>
  );
}


