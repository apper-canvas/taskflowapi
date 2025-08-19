import { useState, useEffect } from "react"
import Input from "@/components/atoms/Input"
import ApperIcon from "@/components/ApperIcon"

const SearchBar = ({ onSearch, placeholder = "Search tasks..." }) => {
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      onSearch(searchTerm)
    }, 300)

    return () => clearTimeout(delayedSearch)
  }, [searchTerm, onSearch])

  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 flex items-center pl-4">
        <ApperIcon name="Search" className="h-5 w-5 text-gray-400" />
      </div>
      <Input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="pl-12 h-12 bg-gray-50 border-gray-200 focus:bg-white"
      />
    </div>
  )
}

export default SearchBar