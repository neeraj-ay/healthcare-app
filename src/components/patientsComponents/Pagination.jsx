export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (!totalPages || totalPages <= 1) return null;

  const visiblePages = [];
  const start = Math.max(1, currentPage - 2);
  const end = Math.min(totalPages, currentPage + 2);

  for (let i = start; i <= end; i++) visiblePages.push(i);

  return (
    <div
      className="flex items-center gap-2 mt-4"
      role="navigation"
      aria-label="Pagination"
    >
      <button
        aria-label="Previous page"
        disabled={currentPage === 1}
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        className="px-3 py-1 border rounded disabled:opacity-50"
      >
        Previous
      </button>

      {start > 1 && (
        <>
          <button
            onClick={() => onPageChange(1)}
            className="px-3 py-1 border rounded"
          >
            1
          </button>
          {start > 2 && <span className="px-2">...</span>}
        </>
      )}

      {visiblePages.map((p) => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          aria-current={currentPage === p ? "page" : undefined}
          className={`px-3 py-1 border rounded ${
            currentPage === p ? "bg-blue-600 text-white" : ""
          }`}
        >
          {p}
        </button>
      ))}

      {end < totalPages && (
        <>
          {end < totalPages - 1 && <span className="px-2">...</span>}
          <button
            onClick={() => onPageChange(totalPages)}
            className="px-3 py-1 border rounded"
          >
            {totalPages}
          </button>
        </>
      )}

      <button
        aria-label="Next page"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        className="px-3 py-1 border rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}
