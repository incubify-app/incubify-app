import { useGetStepsByKanban } from '@/hooks/use-get-steps';
import { cn } from '@/lib/utils';
import { Kanban } from '@/types/kanban';
import { useAuth } from '@/context/AuthContext';
import { StepItem } from './step-item';

export const Steps = ({
	kanbanId,
	isSelected,
}: {
	kanbanId: Kanban['id'];
	isSelected: boolean;
}) => {
	const { data: steps, isLoading } = useGetStepsByKanban({ kanbanId });
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
					steps.map(step => <StepItem key={step.id} step={step} role={role} />)
				)}
			</div>
		</div>
	);
};
