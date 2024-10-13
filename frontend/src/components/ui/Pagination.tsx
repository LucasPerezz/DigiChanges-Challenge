import React from "react";

interface PaginationProps {
  items: number;
  currentPage: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  items,
  currentPage,
  pageSize,
  onPageChange,
}: PaginationProps) {
  const pagesCount = Math.ceil(items / pageSize);

  if (pagesCount === 1) return null;

  return (
    <div className="join">
      <button
        className="join-item btn"
        onClick={() => {
          if (currentPage > 1) onPageChange(currentPage - 1);
        }}
      >
        «
      </button>
      <button className="join-item btn">{currentPage}</button>
      <button
        className="join-item btn"
        onClick={() => {
          if (currentPage <= pageSize + 1) onPageChange(currentPage + 1);
        }}
      >
        »
      </button>
    </div>
  );
}
