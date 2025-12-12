import Image from 'next/image';
import { cn } from '@/lib/utils';

export const Logo = ({ className }: { className?: string }) => {
  return (
    <Image
      src="https://old.bioscript.shop/wp-content/uploads/2025/03/cropped-BioScript-1-1536x614.png"
      alt="BioScript Logo"
      width={250}
      height={100}
      className={cn('h-10 w-auto', className)}
      priority
    />
  );
};
