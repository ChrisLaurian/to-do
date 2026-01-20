export function TaskList({ 
    tasks, 
    toggleComplete, 
    startEdit, 
    deleteTask 
}) {

    return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id} className={task.completed ? "task-completed" : ""}>
          <div className="task-content">
            <input 
              type="checkbox" 
              checked={task.completed} 
              onChange={() => toggleComplete(task)} 
            />
            <span className="task-text">{task.text}</span>
          </div>
          
          <div className="button-group">
            <button className="edit-btn" onClick={() => startEdit(task)}>Editar</button>
            <button className="delete-btn" onClick={() => deleteTask(task.id)}>Eliminar</button>
          </div>
        </li>
      ))}
    </ul>
  );
}