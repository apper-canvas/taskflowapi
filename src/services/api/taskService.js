import tasksData from "@/services/mockData/tasks.json"

// Simulate localStorage persistence
const STORAGE_KEY = "taskflow_tasks"

const getStoredTasks = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : tasksData
  } catch (error) {
    console.error("Failed to load tasks from storage:", error)
    return tasksData
  }
}

const storeTasks = (tasks) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
  } catch (error) {
    console.error("Failed to store tasks:", error)
  }
}

// Initialize tasks in localStorage if not present
if (!localStorage.getItem(STORAGE_KEY)) {
  storeTasks(tasksData)
}

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const taskService = {
  async getAll() {
    await delay(300)
    return getStoredTasks()
  },

  async getById(id) {
    await delay(200)
    const tasks = getStoredTasks()
    const task = tasks.find(task => task.id === parseInt(id))
    if (!task) {
      throw new Error("Task not found")
    }
    return { ...task }
  },

  async create(taskData) {
    await delay(400)
    const tasks = getStoredTasks()
    const maxId = tasks.length > 0 ? Math.max(...tasks.map(task => task.id)) : 0
    
    const newTask = {
      id: maxId + 1,
      ...taskData,
      status: "active",
      createdAt: new Date().toISOString(),
      completedAt: null
    }

    const updatedTasks = [newTask, ...tasks]
    storeTasks(updatedTasks)
    return { ...newTask }
  },

  async update(id, data) {
    await delay(300)
    const tasks = getStoredTasks()
    const taskIndex = tasks.findIndex(task => task.id === parseInt(id))
    
    if (taskIndex === -1) {
      throw new Error("Task not found")
    }

    const updatedTask = {
      ...tasks[taskIndex],
      ...data,
      id: parseInt(id)
    }

    tasks[taskIndex] = updatedTask
    storeTasks(tasks)
    return { ...updatedTask }
  },

  async delete(id) {
    await delay(250)
    const tasks = getStoredTasks()
    const taskExists = tasks.find(task => task.id === parseInt(id))
    
    if (!taskExists) {
      throw new Error("Task not found")
    }

    const updatedTasks = tasks.filter(task => task.id !== parseInt(id))
    storeTasks(updatedTasks)
    return true
  }
}