import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { User, RegisterData } from '../types/auth';
import { toast } from '@/components/ui/use-toast';
import { CompanyRole } from '@/types/company';
import { axiosClient } from '@/config';
import Cookies from 'js-cookie';

interface AuthContextType {
	user: User | null;
	isAuthenticated: boolean;
	login: (
		login: string,
		password: string
	) => Promise<{
		success: boolean;
		redirectTo?: string;
	}>;
	logout: () => void;
	updateUser: (userData: Partial<User>) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
		const token = Cookies.get('token');
		if (token) {
			axiosClient
				.get('/me')
				.then(response => {
					const company: User = response.data;
					setUser(company);
					window.location.href = '/incubators';
				})
				.catch(() => {
					Cookies.remove('token');
					setUser(null);
					window.location.href = '/login';
					toast({
						title: 'Sessão expirada',
						description: 'Por favor, faça login novamente',
						variant: 'destructive',
					});
				});
		} else {
			setUser(null);
		}
	}, []);

	const login = async (
		email: string,
		password: string
	): Promise<{
		success: boolean;
		redirectTo?: string;
	}> => {
		if (email && password) {
			try {
				const response = await axiosClient.post('/login', {
					email,
					password,
				});
				const { company, token } = response.data;
				setUser(company);
				Cookies.set('token', token, {
					expires: 7,
					sameSite: 'strict',
					secure: true,
				});
				return {
					success: true,
					redirectTo: '/incubators'
				};
			} catch (error) {
				const errorDetails = error.response?.data?.details;
				const errorMessage = Array.isArray(errorDetails)
					? errorDetails.map((err: { message: string }) => err.message).join(', ')
					: errorDetails;
				toast({
					title: 'Erro no login',
					description: errorMessage,
					variant: 'destructive',
				});

				return {
					success: false,
				};
			}
		}
	};

	const logout = () => {
		setUser(null);
		Cookies.remove('token');
		toast({
			title: 'Logout realizado',
			description: 'Você saiu com sucesso',
		});
	};

	const updateUser = async (userData: Partial<User>): Promise<boolean> => {
		try {
			setUser(prev => (prev ? { ...prev, ...userData } : null));
			return true;
		} catch (error) {
			console.error('Failed to update user:', error);
			throw error;
		}
	};

	return (
		<AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout, updateUser }}>
			{children}
		</AuthContext.Provider>
	);
}

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error('useAuth deve ser usado dentro de um AuthProvider');
	}
	return context;
};
