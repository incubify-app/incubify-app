import { Company } from './company';
import { Kanban } from './kanban';

export type Step = {
	id: string;
	name: string;
	due_date: string;
	created_at: string;
	kanban_id: Kanban['id'];
	company_ids: Company['id'][];
};
