import { motion } from "framer-motion"
import Button from "@/components/atoms/Button"
import ApperIcon from "@/components/ApperIcon"

const ConfirmDialog = ({ 
  isOpen, 
  onConfirm, 
  onCancel, 
  title = "Confirm Action",
  message = "Are you sure you want to proceed?",
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  type = "danger"
}) => {
  if (!isOpen) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={(e) => {
        if (e.target === e.currentTarget) onCancel()
      }}
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 20 }}
        className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6"
      >
        <div className="flex items-center mb-4">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 ${
            type === "danger" ? "bg-red-100" : "bg-yellow-100"
          }`}>
            <ApperIcon 
              name={type === "danger" ? "AlertTriangle" : "AlertCircle"} 
              className={`h-6 w-6 ${
                type === "danger" ? "text-red-600" : "text-yellow-600"
              }`} 
            />
          </div>
          <h3 className="text-lg font-display font-semibold text-gray-900">
            {title}
          </h3>
        </div>

        <p className="text-gray-600 mb-6 leading-relaxed">
          {message}
        </p>

        <div className="flex gap-3">
          <Button
            onClick={onConfirm}
            variant={type === "danger" ? "danger" : "primary"}
            className="flex-1"
          >
            {confirmLabel}
          </Button>
          <Button
            onClick={onCancel}
            variant="secondary"
            className="flex-1"
          >
            {cancelLabel}
          </Button>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default ConfirmDialog