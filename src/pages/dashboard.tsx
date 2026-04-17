import { useAuthStore } from '@/shared/store/authStore';

export function DashboardPage() {
  const { userId, logout } = useAuthStore();

  return (
    <div className="p-8">
      <h1>Dashboard (ID: {userId})</h1>
      <button
        onClick={logout}
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        Выйти
      </button>
    </div>
  );
}
