// src/TaskList.js
import { useState } from "react";
import { getTasks } from "../models/taskModel";

function TaskList() {
  const [title, setTitle] = useState("");
  const [completed, setCompleted] = useState(""); // "", "true", "false"
  const [tasks, setTasks] = useState(getTasks());

  const handleFilter = (e) => {
    e.preventDefault();
    const filters = {
      title: title,
      completed:
        completed === ""
          ? null
          : completed === "true"
          ? 1
          : 0,
    };
    setTasks(getTasks(filters));
  };

  const handleEdit = (task) => {
    // Navega para a página de criar/editar tarefa passando os dados da tarefa
    //navigate('/task-form', { state: { task } });
    console.log('Clicou', task)
  };

  return (
    <div>
      <h2>Lista de Tarefas</h2>

      <form onSubmit={handleFilter}>
        <div>
          <label>Nome: </label>
          <input
            type="text"
            placeholder="Digite parte do título"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <label>Status: </label>
          <select value={completed} onChange={(e) => setCompleted(e.target.value)}>
            <option value="">Todas</option>
            <option value="true">Feitas</option>
            <option value="false">Não feitas</option>
          </select>
        </div>

        <button type="submit">Filtrar</button>
      </form>

      <ul>
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <li key={task.id}>
              {task.title} - 
              {task.completed ? "✅ Feita" : "⌛ A fazer"} -
              <button style={{ cursor: 'pointer', marginLeft: '10px' }} onClick={() => handleEdit(task)} >Editar</button>
            </li>
          ))
        ) : (
          <p>Nenhuma tarefa encontrada.</p>
        )}
      </ul>
    </div>
  );
}

export default TaskList;
