import Pagination from "../components/Pagination";
import ItemCard from "../components/ItemCard";
import { usePaginatedFetch } from "../hooks/usePaginatedFetch";

function Spinner() {
  return (
    <svg
      className="h-6 w-6 animate-spin"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
        fill="none"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      />
    </svg>
  );
}

export default function Home() {
  const {
    page,
    perPage,
    data,
    totalPages,
    loading,
    error,
    setPage,
    retry,
  } = usePaginatedFetch(1, 6);

  return (
    <main className="max-w-screen-lg mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4 dir-ltr text-left">Users</h1>
      <div className="flex items-center justify-end mb-3 text-slate-600">
        <div>
          صفحه {page} از {totalPages} — هر صفحه {perPage} آیتم
        </div>
      </div>

      {loading && (
        <div className="flex items-center gap-2 py-6">
          <Spinner />
          <span>در حال بارگذاری...</span>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-3 mb-3">
          <div className="mb-2">خطا در دریافت داده: {error}</div>
          <button
            onClick={retry}
            className="px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50"
          >
            تلاش مجدد
          </button>
        </div>
      )}

      {!loading && !error && (
        <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {data.map((it) => (
            <ItemCard key={it.id} item={it} />
          ))}
        </div>
      )}

      <div className="mt-4 flex justify-center">
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
          showEdges
          siblingCount={1}
        />
      </div>
    </main>
  );
}
