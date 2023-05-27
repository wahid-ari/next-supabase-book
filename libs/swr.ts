import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const API_URL = `${process.env.NEXT_PUBLIC_API_ROUTE}/api`;

export function useTagsData() {
  const { data, error, isLoading } = useSWR(`${API_URL}/tag`, fetcher);
  return { data, error, isLoading };
}

export function useTagData(id: string) {
  const { data, error, isLoading } = useSWR(id ? `${API_URL}/tag?id=${id}` : `${API_URL}/tag`, fetcher);
  return { data, error, isLoading };
}
