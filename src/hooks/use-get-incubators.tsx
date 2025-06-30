import { getIncubators } from '@/services/get-incubators';
import { useQuery } from '@tanstack/react-query';

export function useGetIncubators({ enabled }) {
	const { data, error, isLoading } = useQuery({
		queryKey: ['incubators'],
		queryFn: async () => getIncubators(),
		refetchInterval: false,
		refetchOnWindowFocus: false,
		refetchOnReconnect: false,
		refetchOnMount: false,
		retry: 2,
		retryDelay: 1000,
		staleTime: 1000 * 60 * 60 * 24,
		enabled,
	});

	return {
		data,
		error,
		isLoading,
	};
}
