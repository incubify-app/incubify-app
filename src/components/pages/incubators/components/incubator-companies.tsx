import React from 'react';
import { useGetCompaniesIncubator } from '@/hooks/use-get-companies-incubator';

export const IncubatorCompanies = React.memo(({ incubatorId }: { incubatorId: string }) => {
	const { data } = useGetCompaniesIncubator({
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
			{data?.length === 0 && (
				<div className='text-sm text-gray-600'>Nenhuma empresa incubada</div>
			)}
		</>
	);
});
