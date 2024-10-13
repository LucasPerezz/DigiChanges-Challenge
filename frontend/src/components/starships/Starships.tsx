"use client"
import { Starship } from '@/types/types'
import React, { useState } from 'react'
import Card from '../ui/Card';
import Pagination from '../ui/Pagination';

interface StarshipsProps {
    starships: Starship[]
}

export default function Starships({starships}: StarshipsProps) {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const pageSize = Math.ceil(starships.length / 10);

    const onPageChange = (page: number) => {
      if(currentPage >= 1) {
        setCurrentPage(page);
      }
    }

    const paginate = (items: Starship[], pageNumber: number, pageSize: number) => {
        const starIndex = (pageNumber - 1) * pageSize;
        return items.slice(starIndex, starIndex + pageSize);
    }

    const paginatedstarships = paginate(starships, currentPage, pageSize);


  return (
    <section className="flex flex-col items-center gap-4">
      <div className="container flex flex-row flex-wrap mx-auto gap-2 justify-center items-center">
        {paginatedstarships.map((starship: Starship) => {
          return (
            <Card name={starship.name} key={starship.name} />
          );
        })}
      </div>
      <Pagination currentPage={currentPage} pageSize={pageSize} onPageChange={onPageChange} items={starships.length} />
    </section>
  );
}
