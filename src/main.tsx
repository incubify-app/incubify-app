import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import App from './App.tsx';
import './index.css';

const root = document.getElementById('root');

if (!root) {
	throw new Error('Root element not found');
}

const env = import.meta.env.VITE_ENV;

createRoot(root).render(
	env === 'local' || env === 'development' ? (
		<StrictMode>
			<App />
		</StrictMode>
	) : (
		<App />
	)
);
