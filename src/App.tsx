import { useState } from 'react'
import './App.css'
import {TodolistItem} from './TodolistItem'
import { v1 } from 'uuid'

export type Task = {
  id: string
  title: string
  isDone: boolean
}

export type FilterValues = "all" | "active" | "completed";

export const App = () => {

  const changeFilter = (filter: FilterValues) => {
    setFilter(filter)
  }

  const [filter, setFilter] = useState<FilterValues>('all')
  
  const [tasks, setTasks] = useState <Task[]>([
    { id: v1(), title: 'HTML&CSS', isDone: true },
    { id: v1(), title: 'JS', isDone: true },
    { id: v1(), title: 'ReactJS', isDone: false },
    { id: v1(), title: 'Redux', isDone: false },
    { id: v1(), title: 'Typescript', isDone: false },
    { id: v1(), title: 'RTK query', isDone: false },
  ])

 const changeTaskStatus = (taskId: string, isDone: boolean) => {

      const task = tasks.find((t) => t.id === taskId);
      if (task) {
        task.isDone = isDone;
        setTasks([...tasks]);
      }

 };

  const deleteTask = (taskId: string) => {
    const filteredTasks = tasks.filter(task => task.id !== taskId)
      setTasks(filteredTasks);
  }

  let filteredTasks = tasks
  if(filter === 'active') {
    filteredTasks = tasks.filter(task => task.isDone === false)
   
  }
  if(filter === 'completed') {
    filteredTasks = tasks.filter(task => task.isDone === true)
   
  }
 const createTask = (title: string) => {
   const newTask = { id: v1(), title, isDone: false }
   const newTasks = [newTask, ...tasks]
   setTasks(newTasks);
 }

  return (
    <div className="app">
      <TodolistItem
        title="What to learn"
        tasks={filteredTasks}
        deleteTask={deleteTask}
        changeFilter={changeFilter}
        createTask = {createTask}
        changeTaskStatus={changeTaskStatus}
      />
    </div>
  );
}