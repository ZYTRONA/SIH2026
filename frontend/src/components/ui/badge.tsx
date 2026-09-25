import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[12px] font-normal tracking-[-0.12px] transition-colors border select-none',
  {
    variants: {
      variant: {
        default:
          'border-[#e0e0e0] bg-[#f5f5f7] text-[#1d1d1f]',
        secondary:
          'border-[#f0f0f0] bg-[#fafafc] text-[#333333]',
        active:
          'border-[#0066cc] bg-[#0066cc] text-white',
        destructive:
          'border-rose-200 bg-rose-50 text-rose-800',
        outline:
          'text-[#1d1d1f] border-[#e0e0e0] bg-white',
        success:
          'border-emerald-200 bg-emerald-50 text-emerald-800',
        warning:
          'border-amber-200 bg-amber-50 text-amber-800',
        ice:
          'border-sky-200 bg-sky-50 text-sky-800',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
