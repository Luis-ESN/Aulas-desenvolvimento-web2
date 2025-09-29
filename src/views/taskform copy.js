import { useState } from "react";
import { createTask } from "../models/taskModel";


function TaskForm({propid=null, proptitle='', propcompleted=0}) {
  const [title, setTitle] = useState(proptitle);
  const [completed, setCompleted] = useState(propcompleted);
  const [id] = useState(propid);
  const [message, setMessage] = useState("");


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
            value={completed}
            onChange={(e) => setCompleted(e.target.value === "true")}
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
