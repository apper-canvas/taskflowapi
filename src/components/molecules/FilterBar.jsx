import Button from "@/components/atoms/Button"
import Select from "@/components/atoms/Select"
import ApperIcon from "@/components/ApperIcon"

const FilterBar = ({ filters, onFilterChange }) => {
  const statusOptions = [
    { value: "all", label: "All Tasks" },
    { value: "active", label: "Active" },
    { value: "completed", label: "Completed" }
  ]

  const sortOptions = [
    { value: "dueDate", label: "Due Date" },
    { value: "priority", label: "Priority" },
    { value: "createdAt", label: "Created" },
    { value: "title", label: "Title" }
  ]

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between bg-gray-50 p-4 rounded-lg">
      <div className="flex flex-wrap gap-2">
        {statusOptions.map((option) => (
          <Button
            key={option.value}
            variant={filters.status === option.value ? "primary" : "secondary"}
            size="sm"
            onClick={() => onFilterChange({ ...filters, status: option.value })}
            className="text-xs"
          >
            {option.label}
            {filters.status === option.value && (
              <ApperIcon name="Check" className="h-3 w-3 ml-1" />
            )}
          </Button>
        ))}
      </div>
      
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600 font-medium">Sort by:</span>
        <Select
          value={filters.sortBy}
          onChange={(e) => onFilterChange({ ...filters, sortBy: e.target.value })}
          className="h-10 min-w-[120px] text-sm"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      </div>
    </div>
  )
}

export default FilterBar