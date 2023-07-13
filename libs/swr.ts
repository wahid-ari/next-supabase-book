import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const API_URL = `${process.env.NEXT_PUBLIC_API_ROUTE}/api`;

// get total record count on each table for dashboard
export function useCountsData() {
  const { data, error, isLoading } = useSWR(`${API_URL}/dashboard`, fetcher, { refreshInterval: 1000 });
  return { data, error, isLoading };
}

// get total books record count for dashboard
export function useTotalBooksData() {
  const { data, error, isLoading } = useSWR(`${API_URL}/dashboard/total-books`, fetcher, { refreshInterval: 1000 });
  return { data, error, isLoading };
}

// get total authors record count for dashboard
export function useTotalAuthorsData() {
  const { data, error, isLoading } = useSWR(`${API_URL}/dashboard/total-authors`, fetcher, { refreshInterval: 1000 });
  return { data, error, isLoading };
}

// get total genres record count for dashboard
export function useTotalGenresData() {
  const { data, error, isLoading } = useSWR(`${API_URL}/dashboard/total-genres`, fetcher, { refreshInterval: 1000 });
  return { data, error, isLoading };
}

// get total quotes record count for dashboard
export function useTotalQuotesData() {
  const { data, error, isLoading } = useSWR(`${API_URL}/dashboard/total-quotes`, fetcher, { refreshInterval: 1000 });
  return { data, error, isLoading };
}

// get total tags record count for dashboard
export function useTotalTagsData() {
  const { data, error, isLoading } = useSWR(`${API_URL}/dashboard/total-tags`, fetcher, { refreshInterval: 1000 });
  return { data, error, isLoading };
}

// all books
export function useBooksData() {
  const { data, error, isLoading, mutate } = useSWR(`${API_URL}/book`, fetcher, { refreshInterval: 1000 });
  return { data, error, isLoading, mutate };
}

// detail book
export function useBookData(id: string, slug?: string) {
  const { data, error, isLoading, mutate } = useSWR(
    slug ? `${API_URL}/book?slug=${slug}` : `${API_URL}/book?id=${id}`,
    fetcher,
    { refreshInterval: 1000 }
  );
  return { data, error, isLoading, mutate };
}

export function useAuthorsData() {
  const { data, error, isLoading, mutate } = useSWR(`${API_URL}/author`, fetcher, { refreshInterval: 1000 });
  return { data, error, isLoading, mutate };
}

export function useAuthorData(id: string, slug?: string) {
  const { data, error, isLoading, mutate } = useSWR(
    slug ? `${API_URL}/author?slug=${slug}` : `${API_URL}/author?id=${id}`,
    fetcher,
    { refreshInterval: 1000 }
  );
  return { data, error, isLoading, mutate };
}

// get total Book and Quote in from each Author
export function useAuthorTotalBookQuoteData() {
  const { data, error, isLoading } = useSWR(`${API_URL}/author/total-book-quote`, fetcher);
  return { data, error, isLoading };
}

export function useQuotesData() {
  const { data, error, isLoading, mutate } = useSWR(`${API_URL}/quote`, fetcher, { refreshInterval: 1000 });
  return { data, error, isLoading, mutate };
}

// get all Quotes with all Tags in each Quote
export function useQuotesWithTagsData() {
  const { data, error, isLoading } = useSWR(`${API_URL}/quote/with-tags`, fetcher);
  return { data, error, isLoading };
}

export function useQuoteData(id: string) {
  const { data, error, isLoading, mutate } = useSWR(id ? `${API_URL}/quote?id=${id}` : `${API_URL}/quote`, fetcher, {
    refreshInterval: 1000,
  });
  return { data, error, isLoading, mutate };
}

export function useGenresData() {
  const { data, error, isLoading, mutate } = useSWR(`${API_URL}/genre`, fetcher, { refreshInterval: 1000 });
  return { data, error, isLoading, mutate };
}

export function useGenreData(id: string, slug?: boolean) {
  const { data, error, isLoading, mutate } = useSWR(
    slug ? `${API_URL}/genre?slug=${slug}` : `${API_URL}/genre?id=${id}`,
    fetcher
  );
  return { data, error, isLoading, mutate };
}

// get total Book in each Genre
export function useGenreTotalBookData() {
  const { data, error, isLoading } = useSWR(`${API_URL}/genre/total-book`, fetcher);
  return { data, error, isLoading };
}

export function useTagsData() {
  const { data, error, isLoading, mutate } = useSWR(`${API_URL}/tag`, fetcher, { refreshInterval: 1000 });
  return { data, error, isLoading, mutate };
}

export function useTagData(id: string, slug?: boolean) {
  const { data, error, isLoading, mutate } = useSWR(
    slug ? `${API_URL}/tag?slug=${slug}` : `${API_URL}/tag?id=${id}`,
    fetcher
  );
  return { data, error, isLoading, mutate };
}

// get total Quote in each Tag
export function useTagTotalQuoteData() {
  const { data, error, isLoading } = useSWR(`${API_URL}/tag/total-quote`, fetcher);
  return { data, error, isLoading };
}

export function useSearchData(query: string | string[]) {
  const { data, error, isLoading } = useSWR(`${API_URL}/search?q=${query}`, fetcher);
  return { data, error, isLoading };
}

// Statistic
export function useBookByAuthorData() {
  const { data, error, isLoading } = useSWR(`${API_URL}/statistics/book-by-author`, fetcher);
  return { data, error, isLoading };
}

export function useBookByGenreData() {
  const { data, error, isLoading } = useSWR(`${API_URL}/statistics/book-by-genre`, fetcher);
  return { data, error, isLoading };
}

export function useQuoteByAuthorData() {
  const { data, error, isLoading } = useSWR(`${API_URL}/statistics/quote-by-author`, fetcher);
  return { data, error, isLoading };
}

export function useQuoteByTagData() {
  const { data, error, isLoading } = useSWR(`${API_URL}/statistics/quote-by-tag`, fetcher);
  return { data, error, isLoading };
}

export function useLogsData() {
  const { data, error, isLoading } = useSWR(`${API_URL}/log`, fetcher, { refreshInterval: 1000 });
  return { data, error, isLoading };
}

export function useSessionsData() {
  const { data, error, isLoading } = useSWR(`${API_URL}/session`, fetcher, { refreshInterval: 1000 });
  return { data, error, isLoading };
}
