import { Button } from '@/shared/ui/Button.tsx';
import { useNavigate } from 'react-router-dom';

interface FooterProps {
  variant?: 'login' | 'register';
}

export const Footer = ({ variant = 'login' }: FooterProps) => {
  const navigate = useNavigate();

  return (
    <footer className="w-full py-8 text-sm border-t border-border/[0.08] text-text-secondary flex justify-center items-center gap-[5px]">
      <span>
        {variant === 'login' ? 'Еще не зарегистрированы?' : 'Уже есть аккаунт?'}
      </span>
      <Button
        variant="tertiary"
        onClick={() => navigate(variant === 'login' ? '/register' : '/login')}
      >
        {variant === 'login' ? 'Регистрация' : 'Войти'}
      </Button>
    </footer>
  );
};
