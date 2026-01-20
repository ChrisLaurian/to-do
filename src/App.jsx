import { useState, useEffect } from 'react'
import { db } from './firebase'; 
import { 
  collection, addDoc, onSnapshot, deleteDoc, doc, query, orderBy, updateDoc 
} from 'firebase/firestore';
import './App.css'

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTaskText, setNewTaskText] = useState("");
  // Estados para la edición
  const [isEditing, setIsEditing] = useState(false);
  const [currentTask, setCurrentTask] = useState({ id: null, text: "" });

  useEffect(() => {
    const q = query(collection(db, "tareas"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = [];
      snapshot.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
      });
      setTasks(docs);
    });
    return () => unsubscribe();
  }, []);

  const addTask = async (e) => {
    e.preventDefault();
    if (!newTaskText.trim()) return;
    try {
      await addDoc(collection(db, "tareas"), {
        text: newTaskText.trim(),
        completed: false,
        createdAt: new Date()
      });
      setNewTaskText("");
    } catch (error) { console.error(error); }
  };

  // --- FUNCIÓN PARA EDITAR ---
  const updateTask = async (e) => {
    e.preventDefault();
    if (!currentTask.text.trim()) return;

    try {
      const taskRef = doc(db, "tareas", currentTask.id);
      await updateDoc(taskRef, {
        text: currentTask.text
      });
      setIsEditing(false); // Salir del modo edición
      setCurrentTask({ id: null, text: "" });
    } catch (error) {
      console.error("Error al actualizar:", error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await deleteDoc(doc(db, "tareas", id));
    } catch (error) { console.error(error); }
  };

  // Función para activar el modo edición
  const startEdit = (task) => {
    setIsEditing(true);
    setCurrentTask({ id: task.id, text: task.text });
  };

  // Función para marcar tarea como completada
  const toggleComplete = async (task) => {
    try {
      const taskRef = doc(db, "tareas", task.id);
      await updateDoc(taskRef, {
        completed: !task.completed
      });
    } catch (error) {
      console.error("Error al actualizar el estado:", error);
    }
  };

  // Descargar tareas
  const downloadList = () => {
  // 1. Formateamos las tareas en un string legible
  const listText = tasks.map(t => 
    `${t.completed ? '[Hecha]' : '[Pendiente]'} - ${t.text}`
  ).join('\n');

  // 2. Creamos un "Blob" (un objeto que representa datos de archivo)
  const blob = new Blob([listText], { type: 'text/plain' });
  
  // 3. Creamos un link temporal en el documento
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  
  // 4. Configuramos el nombre del archivo y disparamos la descarga
  link.download = 'mi-lista-de-tareas.txt';
  link.href = url;
  link.click();
  
  // 5. Limpiamos la memoria
  URL.revokeObjectURL(url);
};

  return (
  <div className="App">
    {/* 1. Encabezado con Título y Botón de Descarga */}
    <div className="header-actions">
      <h1>Mis Tareas</h1>
      {tasks.length > 0 && (
        <button className="download-btn" onClick={downloadList}>
           Descargar Lista
        </button>
      )}
    </div>

    {/* 2. Formulario (Crear o Editar) */}
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

    {/* 3. Listado de Tareas */}
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
  </div>
);
}

export default App;