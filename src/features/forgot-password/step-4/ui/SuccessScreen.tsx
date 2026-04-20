import { AuthFormLayout } from '@/features/auth-layout/ui/AuthFormLayout.tsx';
import { Button } from '@/shared/ui/Button.tsx';
import { useNavigate } from 'react-router-dom';

export const SuccessScreen = () => {
  const navigate = useNavigate();

  return (
    <AuthFormLayout
      title="Пароль был восстановлен"
      subtitle="Перейдите на страницу авторизации, чтобы войти в систему с новым паролем"
      size="lg"
    >
      <Button
        variant="secondary"
        type="button"
        onClick={() => navigate('/login')}
      >
        Назад в авторизацию
      </Button>
    </AuthFormLayout>
  );
};
