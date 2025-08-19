import { forwardRef } from "react"
import { cn } from "@/utils/cn"

const Button = forwardRef(({ className, variant = "primary", size = "md", children, disabled, ...props }, ref) => {
  const baseStyles = "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 transform focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
  
  const variants = {
    primary: "bg-primary-500 hover:bg-primary-600 text-white focus:ring-primary-500 hover:scale-105 shadow-sm hover:shadow-md",
    secondary: "bg-gray-100 hover:bg-gray-200 text-gray-700 focus:ring-gray-500 hover:scale-105",
    ghost: "text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:ring-gray-500",
    danger: "bg-red-500 hover:bg-red-600 text-white focus:ring-red-500 hover:scale-105 shadow-sm hover:shadow-md",
    success: "bg-success hover:bg-green-600 text-white focus:ring-green-500 hover:scale-105 shadow-sm hover:shadow-md"
  }
  
  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base"
  }
  
  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      ref={ref}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
})

Button.displayName = "Button"

export default Button