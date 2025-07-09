import { KanbanIncubator } from '../kanban/components';

export function MyPath() {
	return (
		<div className='space-y-6'>
			<div>
				<h2 className='text-3xl font-bold tracking-tight'>Meu Caminho</h2>
				<p className='text-muted-foreground'>
					Visualize o progresso da sua startup em cada estágio do processo de incubação.
				</p>
			</div>
			<KanbanIncubator />
		</div>
	);
}
