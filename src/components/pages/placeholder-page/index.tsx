import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

export function PlaceholderPage() {
	const navigate = useNavigate();

	return (
		<div className='container mx-auto py-6'>
			<Card className='max-w-md mx-auto'>
				<CardHeader>
					<CardTitle>Página em Desenvolvimento</CardTitle>
					<CardDescription>Esta seção está sendo construída</CardDescription>
				</CardHeader>
				<CardContent>
					<div className='flex flex-col items-center justify-center py-12'>
						<div className='rounded-full bg-muted p-6 mb-4'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								width='24'
								height='24'
								viewBox='0 0 24 24'
								fill='none'
								stroke='currentColor'
								strokeWidth='2'
								strokeLinecap='round'
								strokeLinejoin='round'
								className='h-12 w-12 text-foreground/50'
							>
								<circle cx='12' cy='12' r='10' />
								<line x1='12' y1='8' x2='12' y2='12' />
								<line x1='12' y1='16' x2='12.01' y2='16' />
							</svg>
						</div>
						<p className='text-center mb-6'>
							Estamos trabalhando para disponibilizar este conteúdo em breve.
							<br />
							Por favor, volte mais tarde.
						</p>
					</div>
				</CardContent>
				<CardFooter className='justify-center'>
					<Button onClick={() => navigate('/')}>Voltar para visualização de incubadoras</Button>
				</CardFooter>
			</Card>
		</div>
	);
}
