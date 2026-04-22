import { useNavigate } from 'react-router-dom';
import backArrow from '../assets/icons/back-arrow.svg';

interface BackButtonProps {
  to?: string;
}

export function BackButton({ to }: BackButtonProps) {
  const navigate = useNavigate();

  const onClick = () => {
    if (to) {
      navigate(to);
    } else {
      navigate(-1);
    }
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className="cursor-pointer w-5 md:w-6"
    >
      <img src={backArrow} alt="back button" />
    </button>
  );
}
