import Image from 'next/image';
import { cn } from '@/lib/utils';

export const Logo = ({ className }: { className?: string }) => {
  return (
    <Image
      src="/logo.png"
      alt="BioScript Logo"
      width={250}
      height={100}
      className={cn('h-10 w-auto', className)}
      priority
    />
  );
};
