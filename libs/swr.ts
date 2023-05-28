import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const API_URL = `${process.env.NEXT_PUBLIC_API_ROUTE}/api`;

export function useAuthorsData() {
  const { data, error, isLoading } = useSWR(`${API_URL}/author`, fetcher);
  return { data, error, isLoading };
}

export function useAuthorData(id: string) {
  const { data, error, isLoading } = useSWR(id ? `${API_URL}/author?id=${id}` : `${API_URL}/author`, fetcher);
  return { data, error, isLoading };
}

export function useTagsData() {
  const { data, error, isLoading } = useSWR(`${API_URL}/tag`, fetcher);
  return { data, error, isLoading };
}

export function useTagData(id: string) {
  const { data, error, isLoading } = useSWR(id ? `${API_URL}/tag?id=${id}` : `${API_URL}/tag`, fetcher);
  return { data, error, isLoading };
}

export function useGenresData() {
  const { data, error, isLoading } = useSWR(`${API_URL}/genre`, fetcher);
  return { data, error, isLoading };
}

export function useGenreData(id: string) {
  const { data, error, isLoading } = useSWR(id ? `${API_URL}/genre?id=${id}` : `${API_URL}/genre`, fetcher);
  return { data, error, isLoading };
}

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
