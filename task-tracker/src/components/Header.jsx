import { useLocation } from "react-router-dom"
import Button from "./Button"

const Header = ({ title, showAddTask, showTaskForm }) => {
  
  const location = useLocation()

  return (
    <header className="header">
      <h1>{title}</h1>
      {location.pathname ==='/' && <Button color ={showAddTask ? 'red' : 'green'} 
        text={showAddTask ? 'Close' : 'Add'} 
        showTaskForm={showTaskForm}
      />}
    </header>
  )
}

Header.defaultProps = {
  title: 'Task Tracker'
}

export default Header
