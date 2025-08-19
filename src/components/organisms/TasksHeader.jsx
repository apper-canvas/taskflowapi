import { motion } from "framer-motion"
import Button from "@/components/atoms/Button"
import ApperIcon from "@/components/ApperIcon"

const TasksHeader = ({ onCreateTask, taskStats }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8"
    >
      <div>
        <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">
          TaskFlow
        </h1>
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <span className="flex items-center gap-2">
            <div className="w-2 h-2 bg-success rounded-full"></div>
            {taskStats.completed} Completed
          </span>
          <span className="flex items-center gap-2">
            <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
            {taskStats.active} Active
          </span>
          <span className="flex items-center gap-2">
            <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
            {taskStats.total} Total
          </span>
        </div>
      </div>
      
      <Button
        onClick={onCreateTask}
        variant="primary"
        size="lg"
        className="shadow-lg hover:shadow-xl"
      >
        <ApperIcon name="Plus" className="h-5 w-5 mr-2" />
        Add Task
      </Button>
    </motion.div>
  )
}

export default TasksHeader