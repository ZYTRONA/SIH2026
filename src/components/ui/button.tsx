import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-xs font-mono font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/30 disabled:pointer-events-none disabled:opacity-50 select-none active:scale-[0.98]',
  {
    variants: {
      variant: {
        default:
          'bg-sky-600 hover:bg-sky-700 text-white shadow-sm border border-sky-600 font-semibold',
        secondary:
          'bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 shadow-sm hover:border-slate-400',
        outline:
          'border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 shadow-sm',
        ghost:
          'hover:bg-slate-100 hover:text-slate-900 text-slate-600',
        destructive:
          'bg-rose-600 hover:bg-rose-700 text-white border border-rose-600 shadow-sm font-semibold',
        tactical:
          'bg-sky-50 hover:bg-sky-100 text-sky-800 border border-sky-300 font-semibold tracking-wider uppercase shadow-sm',
        success:
          'bg-emerald-600 hover:bg-emerald-700 text-white border border-emerald-600 shadow-sm font-semibold',
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-7 rounded-md px-2.5 text-[11px]',
        lg: 'h-10 rounded-lg px-6 text-sm',
        icon: 'h-8 w-8 p-0',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
