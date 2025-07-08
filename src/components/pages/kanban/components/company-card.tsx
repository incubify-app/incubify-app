import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/context/AuthContext';
import { cn } from '@/lib/utils';
import { Company, CompanyRole } from '@/types/company';

export const CompanyCard = ({ company }: { company: Company }) => {
	const {
		user: { id, role },
	} = useAuth();
	return (
		<Card
			className={cn(
				id === company.id && 'border-2 border-blue-400',
				role === CompanyRole.MANAGEMENT && 'cursor-pointer hover:shadow-md transition-shadow',
				'mb-3 shadow-sm cursor-not-allowed select-none'
			)}
		>
			<CardContent className='p-3'>
				<div className='flex items-center gap-3'>
					<div className='flex-1'>
						<h4 className='font-medium text-sm'>{company.name}</h4>
						<p className='text-xs text-blue-600 line-clamp-2'>{company.identification}</p>
					</div>
				</div>
				<div className='mt-2 flex justify-between items-center text-xs text-blue-600'>
					<span>Resp: {company.contactName}</span>
				</div>
			</CardContent>
		</Card>
	);
};
