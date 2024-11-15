import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
}) => {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const getVisiblePages = () => {
    const maxVisiblePages = 5;
    let pages: number[] = [];

    if (totalPages <= maxVisiblePages) {
      pages = Array.from({ length: totalPages }, (_, idx) => idx + 1);
    } else {
      const startPage = Math.max(1, currentPage - 2);
      const endPage = Math.min(totalPages, currentPage + 2);
      if (startPage > 1) {
        pages.push(1);
        pages.push(-1);
      }
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      if (endPage < totalPages) {
        pages.push(-1);
        pages.push(totalPages);
      }
    }
    return pages;
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="flex flex-col items-center border-t-2 border-t-gray-100 py-2 justify-center space-y-1">
      <div className="text-primary text-sm">
        Showing {startItem} to {endItem} of {totalItems} entries
      </div>
      <div className="flex justify-between w-full px-5 items-center">
        <button
          className={`px-3 py-1 rounded-md border transition-all duration-150 ease-linear ${
            currentPage === 1
              ? "opacity-80 bg-white cursor-not-allowed"
              : "hover:bg-primary/80 bg-white hover:text-white"
          }`}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <div className="space-x-2">
          {visiblePages.map((page, idx) => {
            if (page === -1) {
              return (
                <span key={idx} className="px-3 py-1">
                  ...
                </span>
              );
            }
            return (
              <button
                key={idx}
                onClick={() => handlePageChange(page)}
                className={`w-7 h-7 rounded-md border ${
                  currentPage === page
                    ? "bg-primary text-white"
                    : "hover:bg-primary bg-white hover:text-white"
                }`}
              >
                {page}
              </button>
            );
          })}
        </div>
        <button
          className={`px-3 py-1 rounded-md border transition-all duration-150 ease-linear ${
            currentPage === totalPages
              ? "opacity-80 bg-white cursor-not-allowed"
              : "hover:bg-primary/80 bg-white hover:text-white"
          }`}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
