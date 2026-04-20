import { useAuthStore } from '@/shared/store/authStore';
import { Layout } from '@/shared/ui/Layout.tsx';
import { AuthFormLayout } from '@/features/auth-layout/ui/AuthFormLayout.tsx';
import { Button } from '@/shared/ui/Button.tsx';

export function DashboardPage() {
  const { userId, logout } = useAuthStore();

  return (
    <div className="h-screen bg-background">
      <Layout>
        <AuthFormLayout title="Dashboard" subtitle={`User - ${userId}`}>
          <Button variant="secondary" type="button" onClick={logout}>
            Выйти
          </Button>
        </AuthFormLayout>
      </Layout>
    </div>
  );
}
