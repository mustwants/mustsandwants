'use client'
import React from 'react'

interface MWButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline'
}

export default function MWButton({
  variant = 'primary',
  className = '',
  children,
  ...props
}: MWButtonProps) {
  const base =
    'rounded-full px-5 py-2 font-subheading text-sm transition-colors duration-200 focus:outline-none'
  const variants = {
    primary:
      'bg-gradient-to-r from-mwAqua to-mwLime text-mwBlack hover:from-mwLime hover:to-mwAqua',
    secondary:
      'bg-mwPink text-mwWhite hover:opacity-90',
    outline:
      'border border-mwAqua text-mwAqua hover:bg-mwAqua hover:text-mwBlack',
  }

  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  )
}
