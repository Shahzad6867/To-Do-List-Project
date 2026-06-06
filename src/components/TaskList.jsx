import "./TaskList.css";
import TaskCard from "./TaskCard";
import { useContext } from "react";
import { TaskContext } from "../contexts/TaskContext";
import TaskCardPlain from "./TaskCardPlain";



export default function TaskList({handleLogTask}) {
  const {tasks,setTasks} = useContext(TaskContext)

  function updateTaskCompletion(newTask){
    setTasks(tasks.map(oldTask => {
      if(oldTask.task_id === newTask.task_id){
        return newTask
      }
      return oldTask
    }))
  }

  function handleDeleteTask(task_id){
    setTasks(
      tasks.filter(task => task.task_id !== task_id)
    )
  }
  return (
    <section className="task-list">

      <div className="task-list-header">
        <h2>Your Tasks</h2>
        <span className="task-count">{tasks.length} items</span>
      </div>

      <div className="task-items">
        {tasks.length > 0 ? tasks.map(task => {
          return <TaskCard key={task.task_id} task={task} taskDone={(newTask) => updateTaskCompletion(newTask)}  deleteTask={() => handleDeleteTask(task.task_id)}/>
        }) : <TaskCardPlain />}
      </div>

    </section>
  );
}