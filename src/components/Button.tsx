
import React from 'react';
import { cn } from '@/lib/utils';

type ButtonVariant = 'primary' | 'secondary' | 'outlined' | 'ghost' | 'link';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  className?: string;
  children: React.ReactNode;
}

const Button = ({
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  fullWidth = false,
  className,
  children,
  ...props
}: ButtonProps) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20 active:translate-y-0.5';
  
  const variantStyles = {
    primary: 'bg-primary text-white hover:bg-primary/90 shadow-md hover:shadow-lg',
    secondary: 'bg-secondary text-foreground hover:bg-secondary/80',
    outlined: 'border border-border bg-transparent hover:bg-secondary/50',
    ghost: 'bg-transparent hover:bg-secondary',
    link: 'bg-transparent underline-offset-4 hover:underline p-0',
  };
  
  const sizeStyles = {
    sm: 'text-sm rounded-full px-4 py-1.5',
    md: 'rounded-full px-6 py-2.5',
    lg: 'text-lg rounded-full px-8 py-3',
  };
  
  // Don't apply padding or size styles to link variant
  const appliedSizeStyles = variant === 'link' ? '' : sizeStyles[size];
  
  return (
    <button
      className={cn(
        baseStyles,
        variantStyles[variant],
        appliedSizeStyles,
        fullWidth ? 'w-full' : '',
        className
      )}
      {...props}
    >
      {icon && iconPosition === 'left' && (
        <span className="mr-2">{icon}</span>
      )}
      <span>{children}</span>
      {icon && iconPosition === 'right' && (
        <span className="ml-2">{icon}</span>
      )}
    </button>
  );
};

export default Button;
