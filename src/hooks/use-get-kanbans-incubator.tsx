import { getKanbansByIncubator } from '@/services/get-kanbans-by-incubator';
import { useQuery } from '@tanstack/react-query';

interface UseGetKanbansByIncubatorProps {
	incubatorId: string;
	enabled?: boolean;
}

export function useGetKanbansByIncubator({
	incubatorId,
	enabled = true,
}: UseGetKanbansByIncubatorProps) {
	const { data, error, isLoading } = useQuery({
		queryKey: ['kanbans', 'incubator', incubatorId],
		queryFn: async () => getKanbansByIncubator(incubatorId),
		retry: 2,
		retryDelay: 1000,
		staleTime: 1000 * 60 * 2, // 2 minutes
		enabled: !!incubatorId && enabled,
	});

	return {
		data,
		error,
		isLoading,
	};
}
