import { useEffect, useState } from 'react'
import './App.css'
import Dashboard from './components/Dashboard'
import Header from './components/Header'
import TaskList from './components/TaskList'
import TaskModal from './components/TaskModal'
import { TaskContext } from './contexts/TaskContext'
import iziToast from 'izitoast'
import 'izitoast/dist/css/iziToast.min.css'; 
import { Counter } from './components/Counter'


function App() {
  const [isTaskModalOpen,setIsTaskModalOpen] = useState({actionTitle : "Create" , toOpen : false , payload : null})
  const [tasks,setTasks] = useState([])
  useEffect(() => {
    
    const interval = setInterval(() => {
      const now = new Date();
      const overdueTasks = []
      setTasks(prevTasks =>
        prevTasks.map(task => {
          if (task.isCompleted || task.isOverdueNotified) return task;
  
          const deadline = new Date(
            task.deadline_date + "T" + task.deadline_time
          );

          

          if (now > deadline) {
            overdueTasks.push(task)
            return {
              ...task,
              isOverdueNotified: true
            };
          }
  
          return task;
        })
      );
       overdueTasks.forEach(overdueTask => {
        iziToast.warning({
          title : "Task Overdue",
          message : `${overdueTask.task_title} is due`,
          position : "topRight"
        })
       })
    }, 5000);

  
    return () => {
      clearInterval(interval)
    };
  }, []);


  function addTask(task){
    task.task_id = tasks.length + 1
    task.isCompleted = false
    task.isOverdueNotified = false
    setTasks([...tasks,task])
  }

  function updateTask(updatedTask){
    setTasks(tasks.map(task => {
      if(updatedTask.task_id === task.task_id){
        return updatedTask
      }else{
        return task
      }
    }))
  }

 
  
  
  return (
    <>
      <main>
        <Header handleOpenModal={() => setIsTaskModalOpen({...isTaskModalOpen, actionTitle : "Create", toOpen : true,payload : null})} /> 
        <TaskModal isTaskModalOpen={isTaskModalOpen} handleCloseModal={() => setIsTaskModalOpen({...isTaskModalOpen, toOpen : false , payload : null})}  handleAddTask={addTask} handleUpdateTask={updateTask}/>
        <Dashboard tasks={tasks} />
        <TaskContext value={{tasks,setTasks,setIsTaskModalOpen}} >
             <TaskList />
        </TaskContext>

        
          
      </main>
    </>
  )
}

export default App
