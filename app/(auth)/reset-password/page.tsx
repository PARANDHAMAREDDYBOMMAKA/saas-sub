import { ResetPasswordForm } from '@/components/auth/reset-password-form';
import Link from 'next/link';

export default function ResetPasswordPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="text-center">
          <h2 className="text-3xl font-bold">Reset your password</h2>
          <p className="mt-2 text-gray-600">
            Enter your email address and we'll send you a link to reset your password
          </p>
        </div>
        
        <div className="mt-8">
          <ResetPasswordForm />
        </div>
      </div>
    </div>
  );
}