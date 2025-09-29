// Base de Dados
let tasks = [
 { id: 1, title: 'Estudar WEB', completed: 0},
 { id: 2, title: 'Revisar PBC', completed: 1},
 { id: 3, title: 'Estudar BD', completed: 0},
];

 // Funções para manipular as tarefas
 const getAllTasks = () => tasks;

 const getTaskId = (id) => tasks.find(task => task.id === id);

 const deleteTask = (id) => {
  const indice = tasks.findIndex(item => item.id === id);

  if (indice > -1) { // Verifica se o item foi encontrado
    //tasks.filter((_, i) => i !== indice);
    //tasks.find(task => task.id !== id);
    tasks.splice(indice, 1); // Remove 1 elemento a partir do índice encontrado
  }
 };

 const getTasks = ({ title = "", completed = null } = {}) => {
   
   var taskslist = tasks;
   if (completed!==null){
      taskslist = taskslist.filter((task) => task.completed === completed)
   }
   if (title!==''){
    taskslist =taskslist.filter((task) => task.title.toLowerCase().includes(title.toLowerCase()))
   }
   return taskslist
};

 const createTask = (taskData) => {
    const newTask = {
    id: tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1,
    title: taskData.title,
    completed: taskData.completed,
    };
    tasks.push(newTask);
 };

 module.exports = {
    getAllTasks ,
    getTaskId ,
    createTask,
    getTasks,
    deleteTask
 }