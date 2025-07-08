import { axiosClient } from '@/config';
import { Step } from '@/types/step';

export async function getAllStepsByKanban(kanbanId: string): Promise<Step[]> {
  try {
    const response = await axiosClient.get<Step[]>(`steps/kanban/${kanbanId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching steps:', error);
    throw error;
  }
}
