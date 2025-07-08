import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import { useGetIncubators } from '@/hooks/use-get-incubators';
import { useGetKanbans } from '@/hooks/use-get-kanbans';
import { useQueryClient } from '@tanstack/react-query';
import { Step } from '@/types/step';
import { Steps } from './components';
import { useParams } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { CompanyRole } from '@/types/company';

export function Kanban() {
	const { incubatorId } = useParams();
	const { data: kanbans, isLoading } = useGetKanbans();
	const { map: incubadoras } = useGetIncubators();
	const queryClient = useQueryClient();
	const {
		user: { role },
	} = useAuth();

	// Handle drag and drop within a kanban
	const handleDragEnd = async (result: DropResult) => {
		const { source, destination, draggableId } = result;

		if (!destination) return;
		if (source.droppableId === destination.droppableId && source.index === destination.index)
			return;

		const sourceStepId = source.droppableId;
		const destinationStepId = destination.droppableId;
		const companyId = draggableId;

		try {
			// Optimistically update the cache
			const kanbansData = kanbans || [];

			for (const kanban of kanbansData) {
				// Get current steps data from cache
				const stepsQueryKey = ['steps', kanban.id];
				const currentSteps = queryClient.getQueryData(stepsQueryKey) as Step[] | undefined;

				if (!currentSteps) continue;

				const sourceStep = currentSteps.find(step => step.id === sourceStepId);
				const destinationStep = currentSteps.find(step => step.id === destinationStepId);

				if (!sourceStep || !destinationStep) continue;

				// Create updated steps
				const updatedSteps = currentSteps.map(step => {
					if (step.id === sourceStepId) {
						// Remove company from source step
						const newCompanyIds = [...step.company_ids];
						newCompanyIds.splice(source.index, 1);
						return { ...step, company_ids: newCompanyIds };
					}

					if (step.id === destinationStepId) {
						// Add company to destination step
						const newCompanyIds = [...step.company_ids];
						newCompanyIds.splice(destination.index, 0, companyId);
						return { ...step, company_ids: newCompanyIds };
					}

					return step;
				});

				// Update the query cache
				queryClient.setQueryData(stepsQueryKey, updatedSteps);
			}

			// TODO: Call API to persist the change on the server
			// await updateStepCompanies(sourceStepId, destinationStepId, companyId, source.index, destination.index);
		} catch (error) {
			console.error('Error handling drag and drop:', error);

			// Revert optimistic updates on error
			// TODO: Implement proper error handling and cache reversion
			queryClient.invalidateQueries({ queryKey: ['steps'] });
		}
	};

	return (
		<div className='space-y-6'>
			<div>
				<h2 className='text-3xl font-bold tracking-tight'>Kanban de Startups</h2>
				<p className='text-muted-foreground'>
					{role === CompanyRole.MANAGEMENT
						? 'Arraste e solte as startups entre os estágios do processo de incubação.'
						: 'Visualize o progresso das startups em cada estágio do processo de incubação.'}
				</p>
			</div>

			{/* Render a Kanban board for each incubadora */}
			{isLoading ? (
				<div className='text-center text-muted-foreground'>Carregando kanbans...</div>
			) : (
				kanbans.map(kanban => {
					const incubadora = incubadoras.get(kanban.incubator_id);
					if (!incubadora) return null;

					return (
						<div key={kanban.id} className='mt-8'>
							<div className='flex items-center gap-3 mb-4'>
								<h3 className='text-xl font-semibold'>{incubadora.name}</h3>
							</div>

							<DragDropContext onDragEnd={handleDragEnd}>
								<Steps kanbanId={kanban.id} isSelected={incubatorId === kanban.incubator_id} />
							</DragDropContext>
						</div>
					);
				})
			)}
		</div>
	);
}
