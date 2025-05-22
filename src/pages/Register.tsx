import { RegisterForm } from '@/components/RegisterForm';

export default function RegisterPage() {
	return (
		<div className='flex min-h-screen flex-col items-center justify-center bg-gradient-to-r from-blue-400 via-sky-500 to-blue-600 py-10'>
			<div className='w-full max-w-5xl p-8 space-y-6 bg-white rounded-lg shadow-xl'>
				<div className='text-center'>
					<div className='flex justify-center mb-2'>
						<img
							src='/incubify-logo.png'
							alt='Incubify Logo'
							className='h-16 w-auto drop-shadow-md'
						/>
					</div>
					<h1 className='text-4xl font-extrabold tracking-tight lg:text-5xl text-primary'>
						Incubify
					</h1>
				</div>
				<RegisterForm />
			</div>
		</div>
	);
}
