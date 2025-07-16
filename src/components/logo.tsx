import { Stethoscope, type LucideProps } from "lucide-react";
import { cn } from "@/lib/utils";

export function Logo({ className, ...props }: LucideProps) {
  return (
    <Stethoscope
      className={cn("w-16 h-16 text-primary", className)}
      {...props}
    />
  );
}
