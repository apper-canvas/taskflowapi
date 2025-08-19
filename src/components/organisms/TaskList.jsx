import { motion, AnimatePresence } from "framer-motion"
import TaskCard from "@/components/molecules/TaskCard"
import Empty from "@/components/ui/Empty"

const TaskList = ({ 
  tasks, 
  onToggleComplete, 
  onEditTask, 
  onDeleteTask, 
  onCreateTask,
  loading 
}) => {
  if (!loading && tasks.length === 0) {
    return (
      <Empty
        title="No tasks found"
        description="Start organizing your day by creating your first task. Break down your goals into manageable steps and stay productive!"
        actionLabel="Create Your First Task"
        onAction={onCreateTask}
      />
    )
  }

  return (
    <div className="space-y-3">
      <AnimatePresence mode="popLayout">
        {tasks.map((task, index) => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ 
              delay: index * 0.05,
              type: "spring",
              stiffness: 500,
              damping: 30
            }}
            layout
          >
            <TaskCard
              task={task}
              onToggleComplete={onToggleComplete}
              onEdit={onEditTask}
              onDelete={onDeleteTask}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

export default TaskList