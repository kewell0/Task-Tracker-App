import { useState, useEffect, useRef } from 'react'
import { Routes, Route } from 'react-router-dom'
import About from './components/About';
import AddTask from './components/AddTask';
import Footer from './components/Footer';
import Header from "./components/Header";
import TaskDetails from './components/TaskDetails';
import Tasks from './components/Tasks';

function App() {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([])
  const ref = useRef(true)


  // ***FETCH TASKS

  useEffect(() =>{
    if (ref.current) {
      ref.current = false

      const fetchTasks = async ()=> {
        const response = await fetch(`http://localhost:5000/tasks/`)
        const data = await response.json()
        
        setTasks(data)
      }
      fetchTasks()
    }
    
  },[])

  
  // delete task
  const deleteTask = (id) => {
    fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE'
    })
    setTasks(tasks.filter((task) => task.id !== id))
  }

  // Add TAsk 
  const addTask = async(task) => {
    const response = await fetch(`http://localhost:5000/tasks/`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task)
    })

    const data = await response.json()
   
    setTasks([...tasks, data])
  }


  // FETCH A SINGLE TASK
  const fetchTask = async (id)=> {
    const response = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await response.json()
    
    return (data)
  }
  // ***REMINDER TOGGLE
  const onToggle = async(id) => {
    const taskToToggle = await fetchTask(id)
    const toggleUpdate = {...taskToToggle, 
      reminder: !taskToToggle.reminder}

    // console.log(taskToToggle)
    const response = await fetch(`http://localhost:5000/tasks/${id}`,{
      method:'PUT',
      headers:{
        'Content-type': 'application/json'
      },
      body: JSON.stringify(toggleUpdate)
    })
    const data = await response.json()

   setTasks(tasks.map((task) => 
    task.id === id ? {...task, reminder: 
      data.reminder} : task))
  }

  return ( 
    <div className="container">
      <Header showTaskForm={() =>setShowAddTask(!showAddTask)} 
        showAddTask={showAddTask}/>
      <Routes>
        <Route exact path='/' element={
          <>
            {showAddTask && <AddTask onAdd={addTask} />}
            {tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTask} 
               onToggle={onToggle}/>
                :
              ('No Task Add..!!')}
          </>
        }/>
      
        <Route path='/about' element={<About />}/>
        <Route path='/task/:id' element={<TaskDetails/>} />
      </Routes>
      <Footer />
    </div>
    
  );
}

export default App;
