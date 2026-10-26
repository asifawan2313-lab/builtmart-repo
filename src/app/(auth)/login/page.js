import LoginForm from '../../../component/auth/LoginForm.js';

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-[#F4F4F2] text-[#202124] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white border border-[#E2E4E7] rounded-xl p-8">
        <h1 className="text-3xl font-bold uppercase">Login</h1>
        <p className="text-sm text-[#45484D] mt-3 mb-6">
          Demo account — any details work. Nothing is stored or verified.
        </p>
        <LoginForm />
      </div>
    </main>
  );
}