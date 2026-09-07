import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-[11px] font-mono font-semibold transition-colors border select-none',
  {
    variants: {
      variant: {
        default:
          'border-sky-200 bg-sky-50 text-sky-700',
        secondary:
          'border-slate-200 bg-slate-100 text-slate-700',
        destructive:
          'border-rose-200 bg-rose-50 text-rose-700',
        outline:
          'text-slate-700 border-slate-300 bg-white',
        success:
          'border-emerald-200 bg-emerald-50 text-emerald-700',
        warning:
          'border-amber-200 bg-amber-50 text-amber-700',
        ice:
          'border-sky-200 bg-sky-50 text-sky-700',
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
