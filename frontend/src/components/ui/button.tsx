import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'relative inline-flex items-center justify-center gap-2 whitespace-nowrap text-[14px] sm:text-[17px] font-normal tracking-[-0.374px] transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0071e3] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-40 select-none active:scale-95',
  {
    variants: {
      variant: {
        default:
          'rounded-full bg-[#0066cc] text-white hover:bg-[#0071e3] shadow-none',
        secondary:
          'rounded-full bg-transparent text-[#0066cc] border border-[#0066cc] hover:bg-[#0066cc]/5 shadow-none',
        outline:
          'rounded-full border border-[#e0e0e0] bg-white text-[#1d1d1f] hover:bg-[#f5f5f7] shadow-none',
        ghost:
          'rounded-full hover:bg-[#f5f5f7] text-[#1d1d1f]',
        destructive:
          'rounded-full bg-rose-600 hover:bg-rose-700 text-white shadow-none',
        tactical:
          'rounded-[8px] bg-[#1d1d1f] hover:bg-neutral-800 text-white text-[14px] tracking-[-0.224px] shadow-none',
        pearl:
          'rounded-[11px] bg-[#fafafc] hover:bg-neutral-100 text-[#333333] border border-[#f0f0f0] text-[14px] tracking-[-0.224px] shadow-none',
        success:
          'rounded-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-none',
      },
      size: {
        default: 'min-h-[44px] px-5 py-2.5',
        sm: 'min-h-[34px] h-[34px] rounded-full px-3.5 text-[12px]',
        lg: 'min-h-[50px] px-7 py-3 text-[17px]',
        icon: 'h-11 w-11 min-h-[44px] min-w-[44px] rounded-full p-0 bg-[#d2d2d7]/60 hover:bg-[#d2d2d7]/80 text-[#1d1d1f]',
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
