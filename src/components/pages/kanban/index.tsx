import { KanbanManagement } from './components';

export function Kanban() {
	return (
		<div className='space-y-6'>
			<div>
				<h2 className='text-3xl font-bold tracking-tight'>Kanban de Startups</h2>
				<p className='text-muted-foreground'>
					Arraste e solte as startups entre os estágios do processo de incubação.
				</p>
			</div>

			<KanbanManagement />
		</div>
	);
}
