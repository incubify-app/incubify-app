import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { Menu, User as UserIcon } from 'lucide-react';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { MobileMenu } from './MobileMenu';
import { Badge } from '../ui/badge';
import { CompanyRole } from '@/types/company';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { getInitials } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

export function Header() {
	const { user, logout } = useAuth();
	const navigate = useNavigate();

	return (
		<header className='border-b bg-background px-4 py-3 flex items-center justify-between'>
			<div className='flex lg:hidden'>
				<Sheet>
					<SheetTrigger asChild>
						<Button variant='ghost' size='icon'>
							<Menu className='h-5 w-5' />
							<span className='sr-only'>Toggle menu</span>
						</Button>
					</SheetTrigger>
					<SheetContent side='left' className='p-0'>
						<MobileMenu />
					</SheetContent>
				</Sheet>
			</div>

			<div className='flex items-center gap-2'>
				<img src='/incubify-logo.png' alt='Incubify Logo' className='h-8 w-auto' />
				<h1 className='text-xl font-semibold hidden sm:block'>Incubify</h1>
				<Badge className='hidden sm:block'>
					{user.role === CompanyRole.MANAGEMENT ? 'Gestão' : 'Incubação'}
				</Badge>
			</div>

			<div className='flex items-center gap-2'>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant='ghost' size='icon' className='rounded-full'>
							<Avatar className='h-8 w-8'>
								<AvatarImage src={user?.avatar} alt={user?.name} />
								<AvatarFallback className='text-sm'>{getInitials(user?.name || '')}</AvatarFallback>
							</Avatar>
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align='end' className='w-56'>
						<div className='flex items-center justify-start gap-2 p-2'>
							<div className='flex h-10 w-10 items-center justify-center rounded-full bg-primary/10'>
								<UserIcon className='h-4 w-4 text-primary' />
							</div>
							<div className='flex flex-col space-y-0.5'>
								<p className='text-sm font-medium'>{user?.contact_name || 'Usuário'}</p>
								<p className='text-xs text-muted-foreground'>{user?.name || 'Empresa'}</p>
							</div>
						</div>
						<DropdownMenuSeparator />
						<DropdownMenuItem
							onClick={() => {
								navigate('/profile');
							}}
						>
							Perfil
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem onClick={logout}>Sair</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</header>
	);
}
