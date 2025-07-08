import { getAllStepsByKanban } from '@/services/get-all-steps-by-kanban';
import { Kanban } from '@/types/kanban';
import { useQuery } from '@tanstack/react-query';

export function useGetStepsByKanban({ kanbanId }: { kanbanId: Kanban['id'] }) {
	const { data, error, isLoading } = useQuery({
		queryKey: ['steps', kanbanId],
		queryFn: async () => getAllStepsByKanban(kanbanId),
		retry: 2,
		retryDelay: 1000,
		staleTime: 1000 * 60 * 2, // 2 minutes
	});

	return {
		data,
		error,
		isLoading,
	};
}
