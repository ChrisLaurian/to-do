export function TaskForm({ 
    isEditing, 
    updateTask, 
    addTask, 
    currentTask, 
    setCurrentTask, 
    newTaskText, 
    setNewTaskText, 
    setIsEditing }) {

  return (
    <div className="form-container">
      {isEditing ? (
        <form onSubmit={updateTask} className="edit-form">
          <input 
            type="text"
            value={currentTask.text}
            onChange={(e) => setCurrentTask({...currentTask, text: e.target.value})}
          />
          <button type="submit" className="save-btn">Actualizar</button>
          <button type="button" onClick={() => setIsEditing(false)}>Cancelar</button>
        </form>
      ) : (
        <form onSubmit={addTask}>
          <input 
            type="text"
            value={newTaskText}
            onChange={(e) => setNewTaskText(e.target.value)}
            placeholder="Nueva tarea..."
          />
          <button type="submit">Agregar</button>
        </form>
      )}
    </div>
  );
}