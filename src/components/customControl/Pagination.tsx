import { Button } from "./Button";

interface IPaginationProps {
  currentPage: number;
  totalPages: number;
  onChange(currentPage: number): void;
}

export function Pagination({
  currentPage,
  totalPages,
  onChange,
}: IPaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between m-4">
      <p className="text-sm text-gray-500">
        Page {currentPage} of {totalPages}
      </p>
      <div className="flex items-center gap-2">
        <Button
          onClick={() => onChange(currentPage - 1)}
          disabled={currentPage === 1}
          size="sm"
          variant={currentPage === 1 ? "primary" : "secondary"}
        >
          Previous
        </Button>

        {Array.from({ length: totalPages }).map((_, i) => {
          const p = i + 1;
          return (
            <Button
              key={p}
              onClick={() => onChange(p)}
              disabled={currentPage === p}
              size="sm"
              variant={p === currentPage ? "primary" : "secondary"}
            >
              {p}
            </Button>
          );
        })}
        <Button
          onClick={() => onChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          size="sm"
          variant={currentPage === totalPages ? "primary" : "secondary"}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
