import { toast } from 'react-toastify';

const TABLE_NAME = 'task_c';

// Initialize ApperClient
const getApperClient = () => {
  const { ApperClient } = window.ApperSDK;
  return new ApperClient({
    apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
    apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
  });
};

// Map database fields to UI format
const mapTaskFromDatabase = (dbTask) => ({
  id: dbTask.Id,
  title: dbTask.title_c,
  description: dbTask.description_c,
  subcategory: dbTask.subcategory_c,
  dueDate: dbTask.due_date_c,
  priority: dbTask.priority_c,
  status: dbTask.status_c,
  createdAt: dbTask.created_at_c,
  completedAt: dbTask.completed_at_c
});

// Map UI fields to database format
const mapTaskToDatabase = (uiTask) => {
  const dbTask = {};
  
// Only include Updateable fields
  if (uiTask.title !== undefined) dbTask.title_c = uiTask.title;
  if (uiTask.description !== undefined) dbTask.description_c = uiTask.description;
  if (uiTask.subcategory !== undefined) dbTask.subcategory_c = uiTask.subcategory;
  if (uiTask.dueDate !== undefined) dbTask.due_date_c = uiTask.dueDate ? new Date(uiTask.dueDate).toISOString() : null;
  if (uiTask.priority !== undefined) dbTask.priority_c = uiTask.priority;
  if (uiTask.status !== undefined) dbTask.status_c = uiTask.status;
  if (uiTask.createdAt !== undefined) dbTask.created_at_c = uiTask.createdAt ? new Date(uiTask.createdAt).toISOString() : null;
  if (uiTask.completedAt !== undefined) dbTask.completed_at_c = uiTask.completedAt ? new Date(uiTask.completedAt).toISOString() : null;

  return dbTask;
};

export const taskService = {
  async getAll() {
    try {
      const apperClient = getApperClient();
      
      const params = {
fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "title_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "subcategory_c"}},
          {"field": {"Name": "due_date_c"}},
          {"field": {"Name": "priority_c"}},
          {"field": {"Name": "status_c"}},
          {"field": {"Name": "created_at_c"}},
          {"field": {"Name": "completed_at_c"}}
        ],
        orderBy: [{"fieldName": "created_at_c", "sorttype": "DESC"}],
        pagingInfo: {"limit": 100, "offset": 0}
      };
      
      const response = await apperClient.fetchRecords(TABLE_NAME, params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }
      
      if (!response.data || response.data.length === 0) {
        return [];
      }
      
      return response.data.map(mapTaskFromDatabase);
    } catch (error) {
      console.error("Error fetching tasks:", error?.response?.data?.message || error);
      toast.error("Failed to load tasks");
      return [];
    }
  },

  async getById(id) {
    try {
      const apperClient = getApperClient();
      
      const params = {
        fields: [
{"field": {"Name": "Name"}},
          {"field": {"Name": "title_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "subcategory_c"}},
          {"field": {"Name": "due_date_c"}},
          {"field": {"Name": "priority_c"}},
          {"field": {"Name": "status_c"}},
          {"field": {"Name": "created_at_c"}},
          {"field": {"Name": "completed_at_c"}}
        ]
      };
      
      const response = await apperClient.getRecordById(TABLE_NAME, parseInt(id), params);
      
      if (!response?.data) {
        throw new Error("Task not found");
      }
      
      return mapTaskFromDatabase(response.data);
    } catch (error) {
      console.error(`Error fetching task ${id}:`, error?.response?.data?.message || error);
      throw new Error("Task not found");
    }
  },

  async create(taskData) {
    try {
      const apperClient = getApperClient();
      
      const dbTask = mapTaskToDatabase({
        ...taskData,
        status: "active",
        createdAt: new Date().toISOString(),
        completedAt: null
      });
      
      const params = {
        records: [dbTask]
      };
      
      const response = await apperClient.createRecord(TABLE_NAME, params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        throw new Error(response.message);
      }
      
      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to create ${failed.length} records:`, failed);
          failed.forEach(record => {
            if (record.errors) {
              record.errors.forEach(error => toast.error(`${error.fieldLabel}: ${error}`));
            }
            if (record.message) toast.error(record.message);
          });
        }
        
        if (successful.length > 0) {
          toast.success("Task created successfully");
          return mapTaskFromDatabase(successful[0].data);
        }
      }
      
      throw new Error("Failed to create task");
    } catch (error) {
      console.error("Error creating task:", error?.response?.data?.message || error);
      toast.error("Failed to create task");
      throw error;
    }
  },

  async update(id, data) {
    try {
      const apperClient = getApperClient();
      
      const dbTask = {
        Id: parseInt(id),
        ...mapTaskToDatabase(data)
      };
      
      const params = {
        records: [dbTask]
      };
      
      const response = await apperClient.updateRecord(TABLE_NAME, params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        throw new Error(response.message);
      }
      
      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to update ${failed.length} records:`, failed);
          failed.forEach(record => {
            if (record.errors) {
              record.errors.forEach(error => toast.error(`${error.fieldLabel}: ${error}`));
            }
            if (record.message) toast.error(record.message);
          });
        }
        
        if (successful.length > 0) {
          toast.success("Task updated successfully");
          return mapTaskFromDatabase(successful[0].data);
        }
      }
      
      throw new Error("Failed to update task");
    } catch (error) {
      console.error("Error updating task:", error?.response?.data?.message || error);
      toast.error("Failed to update task");
      throw error;
    }
  },

  async delete(id) {
    try {
      const apperClient = getApperClient();
      
      const params = { 
        RecordIds: [parseInt(id)]
      };
      
      const response = await apperClient.deleteRecord(TABLE_NAME, params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return false;
      }
      
      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to delete ${failed.length} records:`, failed);
          failed.forEach(record => {
            if (record.message) toast.error(record.message);
          });
        }
        
        if (successful.length > 0) {
          toast.success("Task deleted successfully");
          return true;
        }
      }
      
      return false;
    } catch (error) {
      console.error("Error deleting task:", error?.response?.data?.message || error);
      toast.error("Failed to delete task");
      return false;
    }
  }
};