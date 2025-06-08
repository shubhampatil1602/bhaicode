import { useMemo } from "react";

export const usePagination = (items, currentPage, itemsPerPage) => {
  const totalPages = Math.ceil(items.length / itemsPerPage);

  const paginatedItems = useMemo(() => {
    return items.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
  }, [items, currentPage, itemsPerPage]);

  return {
    totalPages,
    paginatedItems,
  };
};
