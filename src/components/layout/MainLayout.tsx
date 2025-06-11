import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { useAuth } from '@/context/AuthContext';

export function MainLayout() {
	const { isAuthenticated } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		if (!isAuthenticated) {
			navigate('/login');
		}
	}, [isAuthenticated, navigate]);

	if (!isAuthenticated) {
		return null;
	}

	return (
		<div className='flex h-screen w-full bg-background'>
			<Sidebar />
			<div className='flex flex-col flex-1 overflow-hidden'>
				<Header />
				<main className='flex-1 overflow-auto p-4'>
					<Outlet />
				</main>
			</div>
		</div>
	);
}
