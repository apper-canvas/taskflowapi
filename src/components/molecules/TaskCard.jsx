import { motion } from "framer-motion"
import { format, isToday, isPast, isFuture } from "date-fns"
import Checkbox from "@/components/atoms/Checkbox"
import Badge from "@/components/atoms/Badge"
import Button from "@/components/atoms/Button"
import ApperIcon from "@/components/ApperIcon"
import { cn } from "@/utils/cn"

const TaskCard = ({ task, onToggleComplete, onEdit, onDelete }) => {
  const getDueDateIndicator = () => {
    if (!task.dueDate) return "future-indicator"
    
    const dueDate = new Date(task.dueDate)
    if (isPast(dueDate) && !isToday(dueDate)) return "overdue-indicator"
    if (isToday(dueDate)) return "today-indicator"
    return "future-indicator"
  }

  const getDueDateText = () => {
    if (!task.dueDate) return null
    
    const dueDate = new Date(task.dueDate)
    if (isPast(dueDate) && !isToday(dueDate)) return { text: "Overdue", color: "text-red-600" }
    if (isToday(dueDate)) return { text: "Due Today", color: "text-orange-600" }
    if (isFuture(dueDate)) return { text: format(dueDate, "MMM d"), color: "text-gray-600" }
    return null
  }

  const dueDateInfo = getDueDateText()

  return (
    <motion.div
      whileHover={{ y: -2, scale: 1.01 }}
      className={cn(
        "task-card",
        getDueDateIndicator(),
        task.status === "completed" && "opacity-75"
      )}
    >
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 pt-1">
          <Checkbox
            checked={task.status === "completed"}
            onChange={(checked) => onToggleComplete(task.id, checked)}
          />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <h3 className={cn(
                "font-display font-medium text-gray-900 break-words",
                task.status === "completed" && "line-through text-gray-500"
              )}>
                {task.title}
              </h3>
              
              {task.description && (
                <p className={cn(
                  "mt-1 text-sm text-gray-600 break-words",
                  task.status === "completed" && "line-through text-gray-400"
                )}>
                  {task.description}
                </p>
              )}
              
              <div className="flex items-center gap-3 mt-3">
                <Badge variant={task.priority}>
                  {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
                </Badge>
                
                {dueDateInfo && (
                  <span className={cn("text-sm font-medium", dueDateInfo.color)}>
                    {dueDateInfo.text}
                  </span>
                )}
              </div>
            </div>
            
            <div className="flex items-center gap-1 flex-shrink-0">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onEdit(task)}
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <ApperIcon name="Edit2" className="h-4 w-4" />
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDelete(task.id)}
                className="opacity-0 group-hover:opacity-100 transition-opacity text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <ApperIcon name="Trash2" className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default TaskCard