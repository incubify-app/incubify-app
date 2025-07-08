import { axiosClient } from '@/config';
import { Kanban } from '@/types/kanban';

export async function getAllKanbans(): Promise<Kanban[]> {
  try {
    const response = await axiosClient.get<Kanban[]>('kanbans');
    return response.data;
  } catch (error) {
    console.error('Error fetching kanbans:', error);
    throw error;
  }
}
