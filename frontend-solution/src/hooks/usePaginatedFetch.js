import { useEffect, useMemo, useState } from "react";
import { fetchItems } from "../lib/api";

export function usePaginatedFetch(initialPage = 1, initialPerPage = 6) {
  const [page, setPage] = useState(initialPage);
  const [perPage] = useState(initialPerPage);

  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(null);

    fetchItems(page, perPage, controller.signal)
      .then((res) => {
        setData(res.data);
        setTotalPages(res.total_pages);
      })
      .catch((err) => {
        if (err.name !== "AbortError")
          setError(err.message || "Failed to load data");
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [page, perPage, reloadKey]);

  const state = useMemo(
    () => ({ page, perPage, data, totalPages, loading, error }),
    [page, perPage, data, totalPages, loading, error]
  );

  return {
    ...state,
    setPage,
    retry: () => setReloadKey((k) => k + 1),
  };
}
