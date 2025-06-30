import React from 'react';
import { useGetCompanies } from '@/hooks/use-get-companies';

export const IncubatorCompanies = React.memo(({ incubatorId }: { incubatorId: string }) => {
	const { data } = useGetCompanies({
		incubatorId,
	});

	return (
		<>
			{data?.map(empresa => (
				<div key={empresa.id} className='bg-muted/50 px-3 py-1.5 rounded-md flex items-center'>
					<div className='h-2 w-2 rounded-full bg-primary mr-2'></div>
					<span className='text-sm'>{empresa.name}</span>
				</div>
			))}
		</>
	);
});
