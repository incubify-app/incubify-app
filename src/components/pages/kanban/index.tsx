import { useAuth } from '@/context/AuthContext';
import { KanbanManagement } from './components';
import { CompanyRole } from '@/types/company';
import { MyPath } from '../my-path';

export function Kanban() {
	const {
		user: { role },
	} = useAuth();
	return (
		<div className='space-y-6'>
			{role === CompanyRole.MANAGEMENT ? <KanbanManagement /> : <MyPath />}
		</div>
	);
}
