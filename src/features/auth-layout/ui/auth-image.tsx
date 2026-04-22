import aim from '@/shared/assets/icons/authImage.svg';

interface AuthImageProps {
  size?: 'mobile' | 'tablet' | 'desktop';
  className?: string;
}

export const AuthImage = ({ size = 'desktop', className }: AuthImageProps) => {
  const sizes = {
    mobile: 'w-[218px]',
    tablet: 'w-[485px]',
    desktop: 'w-[512px]',
  };

  return (
    <div
      className={`relative w-full bg-secondary-background flex justify-center items-center ${className}`}
    >
      <img src={aim} alt="big-image" className={sizes[size]} />
    </div>
  );
};
