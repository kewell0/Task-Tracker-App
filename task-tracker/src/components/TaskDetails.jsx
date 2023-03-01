import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Button from './Button'

const TaskDetails = () => {
  const [loading, setLoading] = useState(true)
  const [task, setTask] = useState({})
  // const [error, setError] = useState(null)

  const params = useParams()
  const navigate = useNavigate()

  useEffect(()=> {
    const fetchTask = async() => {
      const response = await fetch(`http://localhost:5000/tasks/${params.id}`)
      const data = await response.json()

      setTask(data)
      setLoading(false)
    }

    fetchTask()
  })
  return loading ?(
    <h4>Loading.....</h4>
  ) :(
    <div>
      <h3>{task.text}</h3>
      <p>{task.day}</p>
      <Button showTaskForm={()=> navigate('/')}
        text='Go Back'
        color='#97BAE7'/>
    </div>
  )
}

export default TaskDetails
