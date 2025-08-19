import { useState } from "react"
import { motion } from "framer-motion"
import { format } from "date-fns"
import Input from "@/components/atoms/Input"
import Textarea from "@/components/atoms/Textarea"
import Select from "@/components/atoms/Select"
import Button from "@/components/atoms/Button"
import ApperIcon from "@/components/ApperIcon"

const TaskForm = ({ task, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: task?.title || "",
    description: task?.description || "",
    dueDate: task?.dueDate ? format(new Date(task.dueDate), "yyyy-MM-dd") : "",
    priority: task?.priority || "medium"
  })

  const [errors, setErrors] = useState({})

  const validate = () => {
    const newErrors = {}
    if (!formData.title.trim()) {
      newErrors.title = "Title is required"
    }
    return newErrors
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const validationErrors = validate()
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    const taskData = {
      ...formData,
      dueDate: formData.dueDate ? new Date(formData.dueDate) : null
    }

    onSubmit(taskData)
  }

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }))
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={(e) => {
        if (e.target === e.currentTarget) onCancel()
      }}
    >
      <motion.div
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-display font-semibold text-gray-900">
            {task ? "Edit Task" : "Create New Task"}
          </h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onCancel}
          >
            <ApperIcon name="X" className="h-5 w-5" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Task Title
            </label>
            <Input
              type="text"
              value={formData.title}
              onChange={(e) => handleChange("title", e.target.value)}
              placeholder="Enter task title..."
              className={errors.title ? "border-red-500 focus:ring-red-500" : ""}
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">{errors.title}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description (Optional)
            </label>
            <Textarea
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="Add more details about this task..."
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Due Date (Optional)
            </label>
            <Input
              type="date"
              value={formData.dueDate}
              onChange={(e) => handleChange("dueDate", e.target.value)}
              min={format(new Date(), "yyyy-MM-dd")}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Priority
            </label>
            <Select
              value={formData.priority}
              onChange={(e) => handleChange("priority", e.target.value)}
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </Select>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="submit"
              variant="primary"
              className="flex-1"
            >
              <ApperIcon name="Save" className="h-4 w-4 mr-2" />
              {task ? "Update Task" : "Create Task"}
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  )
}

export default TaskForm