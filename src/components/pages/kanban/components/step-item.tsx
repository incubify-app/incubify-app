import { memo, useMemo } from 'react';
import { cn, generateRandomColor } from '@/lib/utils';
import { Droppable } from '@hello-pangea/dnd';
import { CompanyRole } from '@/types/company';
import { Step } from '@/types/step';
import { CompanyCard } from './company-card';
import { Draggable } from '@hello-pangea/dnd';
import { useGetCompanies } from '@/hooks/use-get-companies';

interface StepItemProps {
	step: Step;
	role: CompanyRole;
}

const StepItemComponent = ({ step, role }: StepItemProps) => {
	const stepColor = useMemo(() => generateRandomColor(), []);
	const { map: companiesMap } = useGetCompanies({});

	return (
		<div key={step.id} className='min-w-[280px] flex-1 bg-gray-50 p-2 rounded-lg shadow'>
			<div className='flex items-center gap-2 mb-3'>
				<div className='w-3 h-3 rounded-full' style={{ backgroundColor: stepColor }} />
				<h3 className='font-medium text-sm'>{step.name}</h3>
			</div>

			<Droppable droppableId={step.id} isDropDisabled={role !== CompanyRole.MANAGEMENT}>
				{(droppableProvided, snapshot) => (
					<div
						ref={droppableProvided.innerRef}
						{...droppableProvided.droppableProps}
						className={cn('p-3 rounded-md min-h-[150px]', snapshot.isDraggingOver && 'bg-blue-100')}
					>
						{step.company_ids.map((companyId, idx) => {
							const company = companiesMap.get(companyId);
							if (!company) return null;

							return (
								<Draggable
									isDragDisabled={role !== CompanyRole.MANAGEMENT}
									key={companyId}
									draggableId={companyId}
									index={idx}
								>
									{(provided, snapshot) => (
										<div
											ref={provided.innerRef}
											{...provided.draggableProps}
											{...provided.dragHandleProps}
											className={`${snapshot.isDragging ? 'opacity-60' : ''}`}
										>
											<CompanyCard company={company} />
										</div>
									)}
								</Draggable>
							);
						})}
						{droppableProvided.placeholder}
					</div>
				)}
			</Droppable>
		</div>
	);
};

export const StepItem = memo(StepItemComponent);
