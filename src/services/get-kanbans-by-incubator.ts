import { axiosClient } from '@/config';
import { Kanban } from '@/types/kanban';

export async function getKanbansByIncubator(incubatorId: string): Promise<Kanban[]> {
	try {
		const response = await axiosClient.get<Kanban[]>(`/kanban/incubator/${incubatorId}`);
		return response.data;
	} catch (error) {
		console.error('Error fetching kanbans by incubator:', error);
		throw error;
	}
}
