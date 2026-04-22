import { AuthFormLayout } from '@/features/auth-layout/ui/AuthFormLayout.tsx';
import { Button } from '@/shared/ui/Button.tsx';
import { useNavigate } from 'react-router-dom';
import { useIsMobile } from '@/shared/hooks/useIsMobile.tsx';

export const InvalidScreen = () => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  return (
    <AuthFormLayout
      title={isMobile ? 'Пароль не восстановлен' : 'Пароль не был восстановлен'}
      subtitle={
        isMobile
          ? 'По каким-то причинам мы не смогли изменить ваш пароль. Попробуйте ещё раз.'
          : 'По каким-то причинам мы не смогли изменить ваш пароль. Попробуйте ещё раз через некоторое время.'
      }
      size="lg"
    >
      <Button
        variant="secondary"
        type="button"
        onClick={() => navigate('/login')}
      >
        Назад в авторизацию
      </Button>

      <Button
        variant="tertiary"
        type="button"
        onClick={() => navigate('/password-recovery')}
      >
        Попробовать заново
      </Button>
    </AuthFormLayout>
  );
};
