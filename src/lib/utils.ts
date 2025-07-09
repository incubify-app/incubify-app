import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function generateRandomColor(): string {
	const colors = [
		'#FF6B6B',
		'#4ECDC4',
		'#45B7D1',
		'#96CEB4',
		'#FFEAA7',
		'#DDA0DD',
		'#98D8C8',
		'#F7DC6F',
		'#BB8FCE',
		'#85C1E9',
		'#F8C471',
		'#82E0AA',
		'#F1948A',
		'#85C1E9',
		'#D7BDE2',
	];
	return colors[Math.floor(Math.random() * colors.length)];
}

/**
 * Format bytes as human-readable text
 * @param bytes Number of bytes
 * @returns Formatted string
 */
export function bytesToSize(bytes: number): string {
	const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
	if (bytes === 0) return '0 Byte';
	const i = Math.floor(Math.log(bytes) / Math.log(1024));
	return `${Math.round(bytes / Math.pow(1024, i))} ${sizes[i]}`;
}

export const getInitials = (name: string) => {
	if (!name) return 'U';
	return name
		.split(' ')
		.filter(part => part.length > 0)
		.map(n => n[0])
		.join('')
		.toUpperCase()
		.slice(0, 2);
};
