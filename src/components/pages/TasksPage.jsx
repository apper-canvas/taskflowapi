import { useState, useEffect, useMemo, useCallback } from "react"
import { toast } from "react-toastify"
import { motion } from "framer-motion"
import TasksHeader from "@/components/organisms/TasksHeader"
import SearchBar from "@/components/molecules/SearchBar"
import FilterBar from "@/components/molecules/FilterBar"
import TaskList from "@/components/organisms/TaskList"
import TaskForm from "@/components/molecules/TaskForm"
import ConfirmDialog from "@/components/molecules/ConfirmDialog"
import FloatingAddButton from "@/components/organisms/FloatingAddButton"
import Loading from "@/components/ui/Loading"
import Error from "@/components/ui/Error"
import { taskService } from "@/services/api/taskService"

const TasksPage = () => {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [filters, setFilters] = useState({
    status: "all",
    sortBy: "dueDate"
  })
  
  // Modal states
  const [showTaskForm, setShowTaskForm] = useState(false)
  const [editingTask, setEditingTask] = useState(null)
  const [deleteTaskId, setDeleteTaskId] = useState(null)

  // Load tasks
  const loadTasks = useCallback(async () => {
    try {
      setLoading(true)
      setError("")
      const data = await taskService.getAll()
      setTasks(data)
    } catch (err) {
      setError(err.message)
      console.error("Failed to load tasks:", err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadTasks()
  }, [loadTasks])

  // Task statistics
  const taskStats = useMemo(() => {
    return {
      total: tasks.length,
      active: tasks.filter(task => task.status === "active").length,
      completed: tasks.filter(task => task.status === "completed").length
    }
  }, [tasks])

  // Filter and sort tasks
  const filteredTasks = useMemo(() => {
    let filtered = [...tasks]

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Filter by status
    if (filters.status !== "all") {
      filtered = filtered.filter(task => task.status === filters.status)
    }

    // Sort tasks
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case "dueDate":
          if (!a.dueDate) return 1
          if (!b.dueDate) return -1
          return new Date(a.dueDate) - new Date(b.dueDate)
        case "priority":
          const priorityOrder = { "high": 0, "medium": 1, "low": 2 }
          return priorityOrder[a.priority] - priorityOrder[b.priority]
        case "title":
          return a.title.localeCompare(b.title)
        case "createdAt":
          return new Date(b.createdAt) - new Date(a.createdAt)
        default:
          return 0
      }
    })

    return filtered
  }, [tasks, searchQuery, filters])

  // Task operations
  const handleCreateTask = async (taskData) => {
    try {
      const newTask = await taskService.create(taskData)
      setTasks(prev => [newTask, ...prev])
      setShowTaskForm(false)
      setEditingTask(null)
      toast.success("Task created successfully!")
    } catch (err) {
      toast.error("Failed to create task")
      console.error("Failed to create task:", err)
    }
  }

  const handleUpdateTask = async (taskData) => {
    if (!editingTask) return

    try {
      const updatedTask = await taskService.update(editingTask.id, taskData)
      setTasks(prev => prev.map(task => 
        task.id === editingTask.id ? updatedTask : task
      ))
      setShowTaskForm(false)
      setEditingTask(null)
      toast.success("Task updated successfully!")
    } catch (err) {
      toast.error("Failed to update task")
      console.error("Failed to update task:", err)
    }
  }

  const handleToggleComplete = async (taskId, completed) => {
    try {
      const task = tasks.find(t => t.id === taskId)
      if (!task) return

      const updatedTask = await taskService.update(taskId, {
        status: completed ? "completed" : "active",
        completedAt: completed ? new Date().toISOString() : null
      })
      
      setTasks(prev => prev.map(t => 
        t.id === taskId ? updatedTask : t
      ))
      
      if (completed) {
        toast.success("Great job! Task completed! 🎉", {
          className: "animate-bounce-subtle"
        })
      }
    } catch (err) {
      toast.error("Failed to update task")
      console.error("Failed to toggle task:", err)
    }
  }

  const handleDeleteTask = async () => {
    if (!deleteTaskId) return

    try {
      await taskService.delete(deleteTaskId)
      setTasks(prev => prev.filter(task => task.id !== deleteTaskId))
      setDeleteTaskId(null)
      toast.success("Task deleted successfully")
    } catch (err) {
      toast.error("Failed to delete task")
      console.error("Failed to delete task:", err)
    }
  }

  // Modal handlers
  const openCreateTaskForm = () => {
    setEditingTask(null)
    setShowTaskForm(true)
  }

  const openEditTaskForm = (task) => {
    setEditingTask(task)
    setShowTaskForm(true)
  }

  const closeTaskForm = () => {
    setShowTaskForm(false)
    setEditingTask(null)
  }

  const handleTaskSubmit = (taskData) => {
    if (editingTask) {
      handleUpdateTask(taskData)
    } else {
      handleCreateTask(taskData)
    }
  }

  if (loading) {
    return <Loading />
  }

  if (error) {
    return <Error message={error} onRetry={loadTasks} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <TasksHeader
          onCreateTask={openCreateTaskForm}
          taskStats={taskStats}
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          <SearchBar
            onSearch={setSearchQuery}
            placeholder="Search your tasks..."
          />

          <FilterBar
            filters={filters}
            onFilterChange={setFilters}
          />

          <TaskList
            tasks={filteredTasks}
            onToggleComplete={handleToggleComplete}
            onEditTask={openEditTaskForm}
            onDeleteTask={setDeleteTaskId}
            onCreateTask={openCreateTaskForm}
            loading={loading}
          />
        </motion.div>

        {/* Floating Add Button - Only show on mobile */}
        <div className="sm:hidden">
          <FloatingAddButton onClick={openCreateTaskForm} />
        </div>

        {/* Modals */}
        {showTaskForm && (
          <TaskForm
            task={editingTask}
            onSubmit={handleTaskSubmit}
            onCancel={closeTaskForm}
          />
        )}

        <ConfirmDialog
          isOpen={!!deleteTaskId}
          title="Delete Task"
          message="Are you sure you want to delete this task? This action cannot be undone."
          confirmLabel="Delete Task"
          cancelLabel="Keep Task"
          type="danger"
          onConfirm={handleDeleteTask}
          onCancel={() => setDeleteTaskId(null)}
        />
      </div>
    </div>
  )
}

export default TasksPage