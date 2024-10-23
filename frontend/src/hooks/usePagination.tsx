import { useEffect, useState, useCallback } from "react";

export function usePagination<T>(
  fetchFunction: (pageSize: number, currentPage: number, search: string) => Promise<T[]>,
  pageSize: number
) {
  const [data, setData] = useState<T[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    const result = await fetchFunction(pageSize, currentPage, searchTerm);
    setData(result);
    setLoading(false);
    setHasMore(result.length === pageSize); 
  }, [fetchFunction, pageSize, currentPage, searchTerm]);

  useEffect(() => {
    fetchData();
  }, [fetchData]); 

  const onSearchChange = (search: string) => {
    setSearchTerm(search);
    setCurrentPage(1); 
  };

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  return {
    data,
    currentPage,
    searchTerm,
    hasMore,
    loading,
    onSearchChange,
    onPageChange,
  };
}