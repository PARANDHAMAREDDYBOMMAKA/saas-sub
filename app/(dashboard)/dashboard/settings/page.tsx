import { ProfileForm } from "@/components/dashboard/settings/profile-form";

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Settings</h1>
      </div>

      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-lg font-semibold mb-6">Profile</h2>
        <ProfileForm />
      </div>
    </div>
  );
}
