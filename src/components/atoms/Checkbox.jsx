import { forwardRef } from "react"
import { motion } from "framer-motion"
import { cn } from "@/utils/cn"
import ApperIcon from "@/components/ApperIcon"

const Checkbox = forwardRef(({ className, checked, onChange, disabled, ...props }, ref) => {
  return (
    <motion.button
      type="button"
      role="checkbox"
      aria-checked={checked}
      onClick={() => onChange?.(!checked)}
      disabled={disabled}
      className={cn(
        "flex items-center justify-center w-5 h-5 rounded border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed",
        checked
          ? "bg-success border-success text-white"
          : "bg-white border-gray-300 hover:border-gray-400",
        className
      )}
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      ref={ref}
      {...props}
    >
      {checked && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        >
          <ApperIcon name="Check" className="h-3 w-3" />
        </motion.div>
      )}
    </motion.button>
  )
})

Checkbox.displayName = "Checkbox"

export default Checkbox