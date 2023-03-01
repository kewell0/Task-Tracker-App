
const Button = ({ color, text, showTaskForm }) => {
  return (
    
    <div>
      <button className="btn"
        style={{background: color}} 
        onClick={showTaskForm}>{text}</button>
    </div>
  )
}

export default Button
