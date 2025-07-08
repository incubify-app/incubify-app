import { useGetCompanies } from '@/hooks/use-get-companies';
import { useGetStepsByKanban } from '@/hooks/use-get-steps';
import { cn, generateRandomColor } from '@/lib/utils';
import { Kanban } from '@/types/kanban';
import { Draggable, Droppable } from '@hello-pangea/dnd';
import { CompanyCard } from './company-card';
import { useAuth } from '@/context/AuthContext';
import { CompanyRole } from '@/types/company';

export const Steps = ({
	kanbanId,
	isSelected,
}: {
	kanbanId: Kanban['id'];
	isSelected: boolean;
}) => {
	const { data: steps, isLoading } = useGetStepsByKanban({ kanbanId });
	const { map: companiesMap } = useGetCompanies({});
	const {
		user: { role },
	} = useAuth();

	return (
		<div
			className={cn(isSelected && 'border-2 border-blue-400', 'bg-blue-50 p-4 rounded-lg shadow')}
		>
			<div className='flex gap-4 overflow-x-auto pb-4'>
				{isLoading ? (
					<div className='flex items-center justify-center w-full h-32 text-gray-500'>
						Loading steps...
					</div>
				) : (
					steps.map(step => (
						<div key={step.id} className='min-w-[280px] flex-1'>
							<div className='flex items-center gap-2 mb-3'>
								<div
									className='w-3 h-3 rounded-full'
									style={{ backgroundColor: generateRandomColor() }}
								/>
								<h3 className='font-medium text-sm'>{step.name}</h3>
							</div>

							<Droppable droppableId={step.id} isDropDisabled={role !== CompanyRole.MANAGEMENT}>
								{(droppableProvided, snapshot) => (
									<div
										ref={droppableProvided.innerRef}
										{...droppableProvided.droppableProps}
										className={`p-3 rounded-md min-h-[150px] ${
											snapshot.isDraggingOver ? 'bg-blue-100' : 'bg-blue-50'
										}`}
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
					))
				)}
			</div>
		</div>
	);
};
