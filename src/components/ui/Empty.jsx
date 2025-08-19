import { motion } from "framer-motion"
import ApperIcon from "@/components/ApperIcon"
import Button from "@/components/atoms/Button"

const Empty = ({ title, description, actionLabel, onAction }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center p-12 text-center"
    >
      <div className="w-20 h-20 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full flex items-center justify-center mb-6">
        <ApperIcon name="CheckSquare" className="h-10 w-10 text-primary-500" />
      </div>
      <h3 className="text-xl font-display font-semibold text-gray-900 mb-3">
        {title || "No tasks yet"}
      </h3>
      <p className="text-gray-600 mb-8 max-w-md leading-relaxed">
        {description || "Start organizing your day by creating your first task. Break down your goals into manageable steps and stay productive!"}
      </p>
      {onAction && (
        <Button onClick={onAction} variant="primary" size="lg">
          <ApperIcon name="Plus" className="h-5 w-5 mr-2" />
          {actionLabel || "Create Your First Task"}
        </Button>
      )}
    </motion.div>
  )
}

export default Empty