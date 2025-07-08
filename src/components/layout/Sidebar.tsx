import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAuth } from '@/context/AuthContext';
import { FileText, Gauge, Home, LogOut, User } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { CompanyRole } from '@/types/company';

const navItems = [
	{
		title: 'Incubadoras',
		href: '/incubators',
		icon: Home,
		roleView: [CompanyRole.MANAGEMENT],
	},
	{
		title: 'Perfil/Dados',
		href: '/profile',
		icon: User,
		roleView: [CompanyRole.STARTUP],
	},
	{
		title: 'Kanban',
		href: '/kanban',
		icon: Gauge,
		roleView: [CompanyRole.MANAGEMENT],
	},
	{
		title: 'Meu caminho',
		href: '/my-path',
		icon: Gauge,
		roleView: [CompanyRole.STARTUP],
	},
	{
		title: 'Documentos',
		href: '/documents',
		icon: FileText,
		roleView: [CompanyRole.STARTUP],
	},
];

export function Sidebar() {
	const { user, logout } = useAuth();
	const { role } = user;

	return (
		<aside className='hidden border-r bg-sidebar lg:flex lg:w-64 lg:flex-col'>
			<div className='p-6'>
				<div className='flex items-center justify-between'>
					<div className='flex items-center gap-2'>
						<img src='/incubify-logo.png' alt='Incubify Logo' className='h-8 w-auto' />
						<h2 className='text-lg font-semibold text-white'>Incubify</h2>
					</div>
				</div>
			</div>
			<div className='flex flex-1 flex-col overflow-hidden'>
				<div className='p-4'>
					<div className='flex items-center gap-4'>
						<img
							src={user?.avatar || 'https://i.pravatar.cc/150?img=32'}
							alt='Avatar'
							className='h-10 w-10 rounded-full'
						/>
						<div>
							<p className='text-sm font-medium text-white'>{user?.name}</p>
						</div>
					</div>
				</div>
				<ScrollArea className='flex-1'>
					<div className='px-1 py-2'>
						<nav className='grid items-start gap-1 px-2'>
							{navItems.map((item, index) => {
								if (!item.roleView.includes(role)) {
									return null;
								}

								return (
									<NavLink
										key={index}
										to={item.href}
										className={({ isActive }) =>
											cn(
												'flex items-center gap-3 rounded-lg px-3 py-2 text-blue-100 transition-all hover:bg-sidebar-accent',
												isActive ? 'bg-sidebar-accent' : 'transparent'
											)
										}
									>
										<item.icon className='h-4 w-4' />
										<span className='text-sm'>{item.title}</span>
									</NavLink>
								);
							})}
						</nav>
					</div>
				</ScrollArea>
				<div className='p-4'>
					<Button
						onClick={logout}
						variant='ghost'
						className='flex w-full items-center justify-start gap-3 rounded-lg px-3 py-2 text-blue-100 transition-all hover:bg-sidebar-accent'
					>
						<LogOut className='h-4 w-4' />
						<span className='text-sm'>Sair</span>
					</Button>
				</div>
			</div>
		</aside>
	);
}
