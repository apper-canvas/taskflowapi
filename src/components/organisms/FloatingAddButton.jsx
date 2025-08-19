import { motion } from "framer-motion"
import Button from "@/components/atoms/Button"
import ApperIcon from "@/components/ApperIcon"

const FloatingAddButton = ({ onClick }) => {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-40"
    >
      <Button
        onClick={onClick}
        variant="primary"
        size="lg"
        className="rounded-full w-14 h-14 shadow-2xl hover:shadow-3xl bg-gradient-to-r from-primary-500 to-secondary-500"
      >
        <ApperIcon name="Plus" className="h-6 w-6" />
      </Button>
    </motion.div>
  )
}

export default FloatingAddButton