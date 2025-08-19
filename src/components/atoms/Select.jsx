import { forwardRef } from "react"
import { cn } from "@/utils/cn"
import ApperIcon from "@/components/ApperIcon"

const Select = forwardRef(({ className, children, ...props }, ref) => {
  return (
    <div className="relative">
      <select
        className={cn(
          "flex h-12 w-full appearance-none rounded-lg border border-gray-300 bg-white px-4 py-3 pr-10 text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200",
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
        <ApperIcon name="ChevronDown" className="h-4 w-4 text-gray-400" />
      </div>
    </div>
  )
})

Select.displayName = "Select"

export default Select