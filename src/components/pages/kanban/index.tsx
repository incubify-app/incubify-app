import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import {
	kanbanSteps,
	KanbanStep,
	EmpresaIncubada,
	empresasIncubadas,
	incubadoras,
	Incubadora,
} from '@/constants/mocks';

const EmpresaCard = ({ empresa }: { empresa: EmpresaIncubada }) => {
	return (
		<Card className='mb-3 shadow-sm cursor-pointer hover:shadow-md transition-shadow'>
			<CardContent className='p-3'>
				<div className='flex items-center gap-3'>
					{empresa.logo && (
						<img
							src={empresa.logo}
							alt={empresa.nome}
							className='w-10 h-10 rounded-full object-cover'
						/>
					)}
					<div className='flex-1'>
						<h4 className='font-medium text-sm'>{empresa.nome}</h4>
						<p className='text-xs text-blue-600 line-clamp-2'>{empresa.descricao}</p>
					</div>
				</div>
				<div className='mt-2 flex justify-between items-center text-xs text-blue-600'>
					<span>Resp: {empresa.responsavel}</span>
					<span>{new Date(empresa.data).toLocaleDateString()}</span>
				</div>
			</CardContent>
		</Card>
	);
};

const KanbanColumn = ({
	step,
	index,
}: {
	step: KanbanStep & { empresas: EmpresaIncubada[] };
	index: number;
}) => {
	return (
		<div className='min-w-[280px] flex-1'>
			<div className='flex items-center gap-2 mb-3'>
				<div className='w-3 h-3 rounded-full' style={{ backgroundColor: step.color }} />
				<h3 className='font-medium text-sm'>
					{step.titulo} <span className='ml-1 text-blue-500'>({step.empresas.length})</span>
				</h3>
			</div>

			<Droppable droppableId={step.id}>
				{(droppableProvided, snapshot) => (
					<div
						ref={droppableProvided.innerRef}
						{...droppableProvided.droppableProps}
						className={`p-3 rounded-md min-h-[150px] ${
							snapshot.isDraggingOver ? 'bg-blue-100' : 'bg-blue-50'
						}`}
					>
						{step.empresas.map((empresa, empresaIndex) => (
							<Draggable key={empresa.id} draggableId={empresa.id} index={empresaIndex}>
								{(provided, snapshot) => (
									<div
										ref={provided.innerRef}
										{...provided.draggableProps}
										{...provided.dragHandleProps}
										className={`mb-2 ${snapshot.isDragging ? 'opacity-60' : ''}`}
									>
										<EmpresaCard empresa={empresa} />
									</div>
								)}
							</Draggable>
						))}
						{droppableProvided.placeholder}
					</div>
				)}
			</Droppable>
		</div>
	);
};

export function Kanban() {
	const [showAllIncubadoras, setShowAllIncubadoras] = useState<boolean>(true);
	const [selectedIncubadoraId, setSelectedIncubadoraId] = useState<string | null>(null);
	const [incubadorasWithSteps, setIncubadorasWithSteps] = useState<
		Array<{
			incubadora: Incubadora;
			steps: Array<KanbanStep & { empresas: EmpresaIncubada[] }>;
		}>
	>([]);

	// Prepare data - organize by incubadora and then by steps
	useEffect(() => {
		const result = incubadoras.map(incubadora => {
			// Filter empresas for this incubadora
			const incubadoraEmpresas = empresasIncubadas.filter(
				empresa => empresa.incubadoraId === incubadora.id
			);

			// Create steps with filtered empresas
			const stepsWithFilteredEmpresas = kanbanSteps.map(step => {
				const empresasInStep = incubadoraEmpresas.filter(empresa => empresa.stepId === step.id);

				return {
					...step,
					empresas: empresasInStep,
				};
			});

			return {
				incubadora,
				steps: stepsWithFilteredEmpresas,
			};
		});

		setIncubadorasWithSteps(result);

		// Set default selected incubadora if none is selected
		if (!selectedIncubadoraId && incubadoras.length > 0) {
			setSelectedIncubadoraId(incubadoras[0].id);
		}
	}, [selectedIncubadoraId]);

	// Handle drag and drop within a single incubadora's kanban
	const handleDragEnd = (result: DropResult, incubadoraId: string) => {
		const { source, destination } = result;

		if (!destination) return;
		if (source.droppableId === destination.droppableId && source.index === destination.index)
			return;

		// Find the incubadora being modified
		const incubadoraIndex = incubadorasWithSteps.findIndex(
			item => item.incubadora.id === incubadoraId
		);

		if (incubadoraIndex === -1) return;

		const sourceStepId = source.droppableId;
		const destinationStepId = destination.droppableId;

		// Get the steps for this incubadora
		const updatedIncubadorasWithSteps = [...incubadorasWithSteps];
		const incubadoraSteps = [...updatedIncubadorasWithSteps[incubadoraIndex].steps];

		// Find source and destination step indexes
		const sourceStepIndex = incubadoraSteps.findIndex(step => step.id === sourceStepId);
		const destinationStepIndex = incubadoraSteps.findIndex(step => step.id === destinationStepId);

		if (sourceStepIndex === -1 || destinationStepIndex === -1) return;

		// Get the moved empresa
		const [movedEmpresa] = incubadoraSteps[sourceStepIndex].empresas.splice(source.index, 1);

		// Update the empresa's stepId
		movedEmpresa.stepId = destinationStepId;

		// Insert at the destination
		incubadoraSteps[destinationStepIndex].empresas.splice(destination.index, 0, movedEmpresa);

		// Update the state
		updatedIncubadorasWithSteps[incubadoraIndex].steps = incubadoraSteps;
		setIncubadorasWithSteps(updatedIncubadorasWithSteps);
	};

	// Get the incubadora to display based on selection
	const incubadorasToDisplay = showAllIncubadoras
		? incubadorasWithSteps
		: incubadorasWithSteps.filter(item => item.incubadora.id === selectedIncubadoraId);

	return (
		<div className='space-y-6'>
			<div>
				<h2 className='text-3xl font-bold tracking-tight'>Kanban de Startups</h2>
				<p className='text-muted-foreground'>
					Acompanhe o progresso das startups no processo de incubação.
				</p>
			</div>

			{/* Display mode toggle */}
			<div className='flex items-center gap-4'>
				<div className='flex items-center gap-2'>
					<input
						type='radio'
						id='show-all'
						name='display-mode'
						checked={showAllIncubadoras}
						onChange={() => setShowAllIncubadoras(true)}
					/>
					<label htmlFor='show-all' className='text-sm'>
						Mostrar todas as incubadoras
					</label>
				</div>

				<div className='flex items-center gap-2'>
					<input
						type='radio'
						id='show-one'
						name='display-mode'
						checked={!showAllIncubadoras}
						onChange={() => setShowAllIncubadoras(false)}
					/>
					<label htmlFor='show-one' className='text-sm'>
						Selecionar uma incubadora
					</label>
				</div>

				{!showAllIncubadoras && (
					<select
						value={selectedIncubadoraId || ''}
						onChange={e => setSelectedIncubadoraId(e.target.value)}
						className='rounded-md border border-input bg-background px-3 py-1 text-sm'
						disabled={showAllIncubadoras}
					>
						{incubadoras.map(incubadora => (
							<option key={incubadora.id} value={incubadora.id}>
								{incubadora.nome}
							</option>
						))}
					</select>
				)}
			</div>

			{/* Render a Kanban board for each incubadora */}
			{incubadorasToDisplay.map(({ incubadora, steps }) => (
				<div key={incubadora.id} className='mt-8'>
					<div className='flex items-center gap-3 mb-4'>
						{incubadora.logo && (
							<img
								src={incubadora.logo}
								alt={incubadora.nome}
								className='w-8 h-8 rounded-full object-cover'
							/>
						)}
						<h3 className='text-xl font-semibold'>{incubadora.nome}</h3>
					</div>

					<DragDropContext onDragEnd={result => handleDragEnd(result, incubadora.id)}>
						<div className='bg-blue-50 p-4 rounded-lg shadow'>
							<div className='flex gap-4 overflow-x-auto pb-4'>
								{steps.map((step, index) => (
									<KanbanColumn key={step.id} step={step} index={index} />
								))}
							</div>
						</div>
					</DragDropContext>
				</div>
			))}
		</div>
	);
}
