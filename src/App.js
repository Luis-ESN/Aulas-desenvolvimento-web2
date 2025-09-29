import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import TaskList from "./views/tasklist";
import TaskForm from "./views/taskform";
import Teste from "./views/teste";

function App() {
  return (
    <Router>
      <nav>
        <Link to="/taskslist">Listar Tarefas</Link> |{" "}
        <Link to="/taskform" state={{}}>Nova Tarefa</Link>
      </nav>
      <Routes>
        <Route path="/taskslist" element={<TaskList />} />
        <Route path="/taskform" element={<TaskForm />} />
        <Route path="/teste" element={<Teste />} />
      </Routes>
    </Router>
  );
}

export default App;
