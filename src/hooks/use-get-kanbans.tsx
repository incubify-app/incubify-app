import { getAllKanbans } from '@/services/get-all-kanbans';
import { useQuery } from '@tanstack/react-query';

export function useGetKanbans({ enabled = true }: { enabled: boolean }) {
	const { data, error, isLoading } = useQuery({
		queryKey: ['kanbans'],
		queryFn: async () => getAllKanbans(),
		retry: 2,
		retryDelay: 1000,
		staleTime: 1000 * 60 * 2, // 2 minutes
		enabled,
	});

	return {
		data,
		error,
		isLoading,
	};
}
