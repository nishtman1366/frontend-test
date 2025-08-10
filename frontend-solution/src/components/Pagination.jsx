import React from "react";
import { DOTS, getPaginationRange } from "../lib/pagination";

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  showEdges = true,
  siblingCount = 1,
  className = "",
}) {
  if (totalPages <= 1) return null;

  const range = getPaginationRange({ currentPage, totalPages, siblingCount });

  const toPage = (p) => {
    if (p < 1 || p > totalPages || p === currentPage) return;
    onPageChange(p);
  };

  const isFirst = currentPage === 1;
  const isLast = currentPage === totalPages;

  const baseBtn =
    "px-3 py-1.5 rounded-xl border text-sm transition disabled:opacity-50 disabled:cursor-not-allowed";
  const ghost = "bg-white border-slate-200 hover:bg-slate-50";
  const active = "border-slate-800 font-semibold bg-slate-100";

  return (
    <nav className={className} aria-label="Pagination">
      <ul
        className="
    flex flex-row flex-nowrap items-center gap-2
    list-none overflow-x-auto
    scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent
  "
      >
        {showEdges && (
          <li>
            <button
              onClick={() => toPage(1)}
              disabled={isFirst}
              aria-label="First page"
              className={`${baseBtn} ${ghost}`}
            >
              « اول
            </button>
          </li>
        )}

        <li>
          <button
            onClick={() => toPage(currentPage - 1)}
            disabled={isFirst}
            aria-label="Previous page"
            className={`${baseBtn} ${ghost}`}
          >
            قبلی
          </button>
        </li>

        {range.map((p, idx) => (
          <li key={`${p}-${idx}`}>
            {p === DOTS ? (
              <span className="px-3 py-1.5 select-none">…</span>
            ) : (
              <button
                onClick={() => toPage(p)}
                aria-current={p === currentPage ? "page" : undefined}
                className={`${baseBtn} ${p === currentPage ? active : ghost}`}
              >
                {p}
              </button>
            )}
          </li>
        ))}

        <li>
          <button
            onClick={() => toPage(currentPage + 1)}
            disabled={isLast}
            aria-label="Next page"
            className={`${baseBtn} ${ghost}`}
          >
            بعدی
          </button>
        </li>

        {showEdges && (
          <li>
            <button
              onClick={() => toPage(totalPages)}
              disabled={isLast}
              aria-label="Last page"
              className={`${baseBtn} ${ghost}`}
            >
              آخر »
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}
