const API_BASE_URL = "https://reqres.in/api/users";

export async function fetchItems(page, perPage, signal) {
  const url = new URL(API_BASE_URL);
  url.searchParams.set("page", String(page));
  url.searchParams.set("per_page", String(perPage));

  const res = await fetch(url.toString(), {
    signal,
    headers: {
      "x-api-key": "reqres-free-v1",
    },
  });

  if (!res.ok) throw new Error(`Request failed: ${res.status}`);

  const json = await res.json();

  const list = (json.data ?? []).map((u) => ({
    id: u.id,
    name: `${u.first_name} ${u.last_name}`,
    email: u.email,
    avatar: u.avatar,
  }));

  return {
    data: list,
    page: json.page ?? page,
    per_page: json.per_page ?? perPage,
    total_pages: json.total_pages ?? 1,
    total: json.total ?? list.length,
  };
}
