"use client"
import Card from "@/components/ui/Card";
import Pagination from "@/components/ui/Pagination";
import { People } from "@/types/types";
import React, { useState } from "react";

interface PeopleProps {
    people: People[]
}

export default function PeoplePage({people} : PeopleProps) {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const pageSize = people.length / 10;

    const onPageChange = (page: number) => {
      if(currentPage >= 1) {
        setCurrentPage(page);
      }
    }

    const paginate = (items: People[], pageNumber: number, pageSize: number) => {
        const starIndex = (pageNumber - 1) * pageSize;
        return items.slice(starIndex, starIndex + pageSize);
    }

    const paginatedPeople = paginate(people, currentPage, pageSize);


  return (
    <section className="flex flex-col items-center gap-4">
      <div className="container flex flex-row flex-wrap mx-auto gap-2 justify-center items-center">
        {paginatedPeople.map((person: People) => {
          return (
            <Card name={person.name} gender={person.gender} key={person.name} />
          );
        })}
      </div>
      <Pagination currentPage={currentPage} pageSize={pageSize} onPageChange={onPageChange} items={people.length} />
    </section>
  );
}
