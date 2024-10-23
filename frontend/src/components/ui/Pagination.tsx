import React from "react";

interface PaginationProps {
  currentPage: number;
  onPageChange: (page: number) => void;
  hasMore: boolean;
  loading: boolean;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  onPageChange,
  hasMore,
  loading,
}) => {
  const handleNext = () => {
    if (!loading && hasMore) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1 && !loading) {
      onPageChange(currentPage - 1);
    }
  };

  return (
    <div className="flex justify-center gap-4 mb-12">
      <button
        onClick={handlePrev}
        disabled={currentPage === 1 || loading}
        className="hover:text-white hover:transition-all"
      >
        Previous
      </button>
      <span>{`Page ${currentPage}`}</span>
      <button
        onClick={handleNext}
        disabled={!hasMore || loading}
        className="hover:text-white hover:transition-all"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
