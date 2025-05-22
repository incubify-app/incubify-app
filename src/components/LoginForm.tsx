import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

export function LoginForm() {
	const [login, setLogin] = useState('');
	const [password, setPassword] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const { login: loginFn } = useAuth();
	const navigate = useNavigate();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);

		try {
			const success = await loginFn(login, password);
			if (success) {
				navigate('/dashboard');
			}
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className='mx-auto max-w-sm space-y-4'>
			<div className='space-y-2 text-center'>
				<h1 className='text-3xl font-bold'>Login</h1>
				<p className='text-gray-500 dark:text-gray-400'>
					Entre para acessar sua plataforma de incubação
				</p>
			</div>
			<form onSubmit={handleSubmit} className='space-y-4'>
				<div className='space-y-2'>
					<Label htmlFor='login'>Login</Label>
					<Input
						id='login'
						placeholder='Seu nome de usuário'
						required
						value={login}
						onChange={e => setLogin(e.target.value)}
					/>
				</div>
				<div className='space-y-2'>
					<div className='flex items-center justify-between'>
						<Label htmlFor='password'>Senha</Label>
						<a className='text-sm text-primary underline-offset-4 hover:underline' href='#'>
							Esqueceu a senha?
						</a>
					</div>
					<Input
						id='password'
						required
						type='password'
						value={password}
						onChange={e => setPassword(e.target.value)}
					/>
				</div>
				<Button className='w-full' type='submit' disabled={isLoading}>
					{isLoading ? 'Entrando...' : 'Entrar'}
				</Button>
			</form>
			<div className='mt-4 text-center text-sm'>
				Não tem uma conta?{' '}
				<Link to='/register' className='text-primary underline-offset-4 hover:underline'>
					Registrar
				</Link>
			</div>
		</div>
	);
}
