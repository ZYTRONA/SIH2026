import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-xs font-mono font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20 disabled:pointer-events-none disabled:opacity-50 select-none active:scale-[0.98]',
  {
    variants: {
      variant: {
        default:
          'bg-black hover:bg-zinc-800 text-white shadow-xs border border-black font-semibold',
        secondary:
          'bg-white hover:bg-zinc-50 text-zinc-900 border border-zinc-200 shadow-xs hover:border-zinc-300',
        outline:
          'border border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-800 shadow-xs',
        ghost:
          'hover:bg-zinc-100 hover:text-black text-zinc-600',
        destructive:
          'bg-rose-600 hover:bg-rose-700 text-white border border-rose-600 shadow-xs font-semibold',
        tactical:
          'bg-zinc-100 hover:bg-zinc-200 text-zinc-950 border border-zinc-300 font-semibold tracking-wider uppercase shadow-xs',
        success:
          'bg-emerald-600 hover:bg-emerald-700 text-white border border-emerald-600 shadow-xs font-semibold',
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-7 rounded-lg px-2.5 text-[11px]',
        lg: 'h-10 rounded-xl px-6 text-sm',
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
