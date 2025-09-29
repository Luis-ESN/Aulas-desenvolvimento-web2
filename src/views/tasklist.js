// src/TaskList.js
import { useState, useEffect } from "react";
import { getTasks, deleteTask } from "../models/taskModel";
import { useNavigate } from 'react-router-dom';
import { MdOutlineDoneOutline } from "react-icons/md";
import { FaRegHourglassHalf } from "react-icons/fa6";

import Select from 'react-select'

function TaskList() {
  const navigate = useNavigate();
  const options = [
  { value: '', label: 'Todas' },
  { value: 'true', label: 'Completas' },
  { value: 'false', label: 'Incompletas' }
]

  const [title, setTitle] = useState("");
  const [completed, setCompleted] = useState(""); // "", "true", "false"
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
      setTasks(getTasks())
    }, []);

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
    navigate('/taskform', { state: { task } });
  };

  const handleDelete = (id) => {
    deleteTask(id);
    setTasks(getTasks());
    navigate('/taskslist');
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
          <label>STATUS</label>
          <Select options={options} value={options[0]}/>
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
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span>{task.title}</span>- 
              {task.completed ? <div><MdOutlineDoneOutline color="green"/> <span>Completa</span></div> : <div> <FaRegHourglassHalf/> <span>Incompleta</span></div>} -
              <button style={{ cursor: 'pointer', marginLeft: '10px' }} onClick={() => handleEdit(task)} >Editar</button> - 
              <button style={{ cursor: 'pointer', marginLeft: '10px' }} onClick={() => handleDelete(task.id)} >Deletar</button>
              </div>
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
