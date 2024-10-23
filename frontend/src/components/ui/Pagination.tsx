import React from "react";

interface PaginationProps {
  currentPage: number;
  onPageChange: (page: number) => void;
  hasMore: boolean;
}

export default function Pagination({
  currentPage,
  onPageChange,
  hasMore,
}: PaginationProps) {
  return (
    <div className="join">
      <button
        className="join-item btn"
        onClick={() => {
          if (currentPage > 1) onPageChange(currentPage - 1);
        }}
        disabled={currentPage === 1} // Deshabilitar si estamos en la primera página
      >
        «
      </button>
      <button className="join-item btn">{currentPage}</button>
      <button
        className="join-item btn"
        onClick={() => {
          if (hasMore) onPageChange(currentPage + 1); // Solo permitir avanzar si hay más elementos
        }}
        disabled={!hasMore} // Deshabilitar si no hay más elementos
      >
        »
      </button>
    </div>
  );
}