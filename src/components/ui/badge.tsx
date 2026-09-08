import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-[11px] font-mono font-bold transition-colors border select-none',
  {
    variants: {
      variant: {
        default:
          'border-zinc-300 bg-zinc-100 text-zinc-900',
        secondary:
          'border-zinc-200 bg-zinc-50 text-zinc-700',
        active:
          'border-black bg-black text-white',
        destructive:
          'border-rose-300 bg-rose-50 text-rose-900',
        outline:
          'text-zinc-800 border-zinc-300 bg-white',
        success:
          'border-emerald-300 bg-emerald-50 text-emerald-900',
        warning:
          'border-amber-300 bg-amber-50 text-amber-900',
        ice:
          'border-zinc-300 bg-zinc-100 text-zinc-900',
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
