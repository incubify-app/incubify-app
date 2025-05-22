
import { LoginForm } from "@/components/LoginForm";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-r from-blue-400 via-sky-500 to-blue-600">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-xl">
        <div className="text-center">
          <div className="flex justify-center mb-2">
            <img 
              src="/incubify-logo.png" 
              alt="Incubify Logo" 
              className="h-16 w-auto"
            />
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl text-primary">
            Incubify
          </h1>
          <p className="mt-2 text-lg text-blue-700">
            Plataforma de Incubação de Startups
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
