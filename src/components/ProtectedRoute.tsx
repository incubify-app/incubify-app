import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { CompanyRole } from '@/types/company';

interface ProtectedRouteProps {
	children: ReactNode;
	allowedRoles?: CompanyRole[];
}

export const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
	const { user, isAuthenticated } = useAuth();
	const location = useLocation();

	if (!isAuthenticated || !user) {
		return <Navigate to='/login' state={{ from: location.pathname }} replace />;
	}

	if (allowedRoles && !allowedRoles.includes(user.role)) {
		return <Navigate to='/not-found' replace />;
	}

	return <>{children}</>;
};
