import aim from '@/shared/assets/icons/authImage.svg';

interface AuthImageProps {
  size?: 'mobile' | 'tablet' | 'desktop';
}

export const AuthImage = ({ size = 'desktop' }: AuthImageProps) => {
  const sizes = {
    mobile: 'w-[218px]',
    tablet: 'w-[485px]',
    desktop: 'w-[512px]',
  };

  return (
    <div className="relative w-full bg-secondary-background flex justify-center items-center">
      <img src={aim} alt="big-image" className={sizes[size]} />
    </div>
  );
};
