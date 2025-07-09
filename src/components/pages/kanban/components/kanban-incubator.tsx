import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import { useGetIncubators } from '@/hooks/use-get-incubators';
import { useGetKanbansByIncubator } from '@/hooks/use-get-kanbans-incubator';
import { useQueryClient } from '@tanstack/react-query';
import { Step } from '@/types/step';
import { Steps } from './steps';
import { useGetCompanyIncubators } from '@/hooks/use-get-company-incubators';
import { useAuth } from '@/context/AuthContext';

export function KanbanIncubator() {
	const {
		user: { id },
	} = useAuth();
	const { data: companyIncubators } = useGetCompanyIncubators(id);
	console.log('companyIncubators', companyIncubators);

	const { data: kanbans, isLoading } = useGetKanbansByIncubator({
		incubatorId: companyIncubators?.[0]?.id || '',
		enabled: !!companyIncubators?.length,
	});

	const { map: incubadoras } = useGetIncubators();
	const queryClient = useQueryClient();

	const handleDragEnd = async (result: DropResult) => {
		const { source, destination, draggableId } = result;

		if (!destination) return;
		if (source.droppableId === destination.droppableId && source.index === destination.index)
			return;

		const sourceStepId = source.droppableId;
		const destinationStepId = destination.droppableId;
		const companyId = draggableId;

		try {
			const kanbansData = kanbans || [];

			for (const kanban of kanbansData) {
				const stepsQueryKey = ['steps', kanban.id];
				const currentSteps = queryClient.getQueryData(stepsQueryKey) as Step[] | undefined;

				if (!currentSteps) continue;

				const sourceStep = currentSteps.find(step => step.id === sourceStepId);
				const destinationStep = currentSteps.find(step => step.id === destinationStepId);

				if (!sourceStep || !destinationStep) continue;

				const updatedSteps = currentSteps.map(step => {
					if (step.id === sourceStepId) {
						const newCompanyIds = [...step.company_ids];
						newCompanyIds.splice(source.index, 1);
						return { ...step, company_ids: newCompanyIds };
					}

					if (step.id === destinationStepId) {
						const newCompanyIds = [...step.company_ids];
						newCompanyIds.splice(destination.index, 0, companyId);
						return { ...step, company_ids: newCompanyIds };
					}

					return step;
				});

				queryClient.setQueryData(stepsQueryKey, updatedSteps);
			}

			// TODO: Call API to persist the change on the server
			// await updateStepCompanies(sourceStepId, destinationStepId, companyId, source.index, destination.index);
		} catch (error) {
			console.error('Error handling drag and drop:', error);

			queryClient.invalidateQueries({ queryKey: ['steps'] });
		}
	};

	if (isLoading) {
		return <div className='text-center text-muted-foreground'>Carregando kanban...</div>;
	}

	if (!kanbans || kanbans.length === 0) {
		return (
			<div className='text-center text-muted-foreground'>
				Nenhum kanban encontrado para esta incubadora.
			</div>
		);
	}

	return (
		<>
			{kanbans.map(kanban => {
				const incubadora = incubadoras.get(kanban.incubator_id);
				if (!incubadora) return null;

				return (
					<div key={kanban.id} className='mt-8'>
						<div className='flex items-center gap-3 mb-4'>
							<h3 className='text-xl font-semibold'>{incubadora.name}</h3>
						</div>

						<DragDropContext onDragEnd={handleDragEnd}>
							<Steps kanbanId={kanban.id} isSelected={true} />
						</DragDropContext>
					</div>
				);
			})}
		</>
	);
}
