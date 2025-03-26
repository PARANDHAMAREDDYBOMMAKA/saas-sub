import { UpdatePasswordForm } from "@/components/auth/update-password-form";

export default function UpdatePasswordPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="text-center">
          <h2 className="text-3xl font-bold">Set new password</h2>
          <p className="mt-2 text-gray-600">
            Create a new password for your account
          </p>
        </div>

        <div className="mt-8">
          <UpdatePasswordForm />
        </div>
      </div>
    </div>
  );
}
