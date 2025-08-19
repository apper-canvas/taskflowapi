import { forwardRef } from "react"
import { cn } from "@/utils/cn"

const Badge = forwardRef(({ className, variant = "default", ...props }, ref) => {
  const variants = {
    default: "bg-gray-100 text-gray-800",
    high: "bg-red-100 text-red-800 border border-red-200",
    medium: "bg-yellow-100 text-yellow-800 border border-yellow-200",
    low: "bg-blue-100 text-blue-800 border border-blue-200",
    success: "bg-green-100 text-green-800 border border-green-200"
  }

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium",
        variants[variant],
        className
      )}
      ref={ref}
      {...props}
    />
  )
})

Badge.displayName = "Badge"

export default Badge