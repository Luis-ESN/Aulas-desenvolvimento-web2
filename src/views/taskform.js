import { useState, useEffect } from 'react';
import { createTask } from "../models/taskModel";
import { useLocation } from 'react-router-dom';


function TaskForm() {
  const [title, setTitle] = useState("");
  const [completed, setCompleted] = useState(0);
  const [id, setId] = useState();
  const [message, setMessage] = useState("");

  const location = useLocation();
  useEffect(() => {
    // Se vier tarefa no state, é edição
    if (location.state?.task) {
      
      const task = location.state.task;
      setId(task.id);
      setTitle(task.title);
      setCompleted(task.completed);
    }else {
    // Resetar campos para criação
    setId(undefined);
    setTitle("");
    setCompleted(0);
  }
  }, [location.state]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id){
      console.log('Editando')
    
    }
    else{
      try {
      await createTask({ title, completed });
    } catch (err) {
      setMessage("Erro: Erro ao salvar tarefa");
    }
    }
  }

  return (
    <div>
      <h2>Nova Tarefa</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Título: </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Status: </label>          
          <select
            value={completed===1?"true":'false'}
            onChange={(e) => setCompleted(e.target.value === "true"?1:0)}
          >
            <option value="false">A fazer</option>
            <option value="true">Feita</option>
          </select>
        </div>

         <button type="submit">{id ? 'Atualizar' : 'Criar'}</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}

export default TaskForm;
