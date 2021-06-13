import { useMutation, UseMutationResult } from 'react-query';

interface Report {
  numberOfDoses: number;
  timestamp: string;

  id?: number;
}

interface UseCreateReportOptions {
  onSuccess?: (report: Report) => void;
  onError?: () => void;
}

export function useCreateReport(options: UseCreateReportOptions = {}): UseMutationResult<Report, unknown, Report> {
  const defaultOptions: any = {
    ...options
  };

  return useMutation(createReport, defaultOptions);
}

async function createReport(report: Report): Promise<Report> {
  const response = await global.fetch('/api/reports', {
    body: JSON.stringify(report),
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST'
  });

  const data = await response.json();

  return data;
}
