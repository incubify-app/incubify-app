import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { MainLayout } from './components/layout/MainLayout';
import { Incubators, Kanban, Login, NotFound, PlaceholderPage, Register } from './components/pages';

const queryClient = new QueryClient();

const App = () => (
	<QueryClientProvider client={queryClient}>
		<TooltipProvider>
			<AuthProvider>
				<Toaster />
				<Sonner />
				<BrowserRouter>
					<Routes>
						<Route path='/login' element={<Login />} />
						<Route path='/register' element={<Register />} />
						<Route element={<MainLayout />}>
							<Route path='/' element={<Incubators />} />
							<Route path='/incubators' element={<Incubators />} />
							<Route path='/perfil' element={<PlaceholderPage />} />
							<Route path='/kanban' element={<Kanban />} />
							<Route path='/docs' element={<PlaceholderPage />} />
						</Route>
						<Route path='*' element={<NotFound />} />
					</Routes>
				</BrowserRouter>
			</AuthProvider>
		</TooltipProvider>
	</QueryClientProvider>
);

export default App;
