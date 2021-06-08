import { useQuery, UseQueryResult } from 'react-query';

export function useReports<T>(): UseQueryResult<T, unknown> {
  return useQuery('reports', () =>
    global.fetch('/api/reports').then((res): Promise<T> => res.json())
  );
}
