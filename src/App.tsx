import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { MainLayout } from './components/layout/MainLayout';
import { ProtectedRoute } from './components/ProtectedRoute';
import { CompanyRole } from './types/company';
import {
	Documents,
	Incubators,
	Kanban,
	Login,
	MyPath,
	NotFound,
	Profile,
	PlaceholderPage,
	Register,
} from './components/pages';

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
							<Route
								path='/'
								element={
									<ProtectedRoute allowedRoles={[CompanyRole.MANAGEMENT]}>
										<Incubators />
									</ProtectedRoute>
								}
							/>
							<Route
								path='/incubators'
								element={
									<ProtectedRoute allowedRoles={[CompanyRole.MANAGEMENT]}>
										<Incubators />
									</ProtectedRoute>
								}
							/>
							<Route
								path='/profile'
								element={
									<ProtectedRoute allowedRoles={[CompanyRole.STARTUP, CompanyRole.MANAGEMENT]}>
										<Profile />
									</ProtectedRoute>
								}
							/>
							<Route
								path='/kanban/:incubatorId?'
								element={
									<ProtectedRoute allowedRoles={[CompanyRole.MANAGEMENT]}>
										<Kanban />
									</ProtectedRoute>
								}
							/>
							<Route
								path='/my-path/:incubatorId?'
								element={
									<ProtectedRoute allowedRoles={[CompanyRole.STARTUP]}>
										<MyPath />
									</ProtectedRoute>
								}
							/>
							<Route
								path='/documents'
								element={
									<ProtectedRoute allowedRoles={[CompanyRole.STARTUP, CompanyRole.MANAGEMENT]}>
										<Documents />
									</ProtectedRoute>
								}
							/>
							<Route
								path='/docs'
								element={
									<ProtectedRoute>
										<PlaceholderPage />
									</ProtectedRoute>
								}
							/>
						</Route>
						<Route path='*' element={<NotFound />} />
					</Routes>
				</BrowserRouter>
			</AuthProvider>
		</TooltipProvider>
	</QueryClientProvider>
);

export default App;
