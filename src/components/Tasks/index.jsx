import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

import editSvg from '../../assets/img/edit24p.svg'

import './Tasks.scss'

import AddTaskForm from './AddTaskForm'
import Task from './Task'

const Tasks = ({
  list,
  onEditTitle,
  onAddTask,
  withOutEmpty,
  onRemoveTask,
  onEditTask,
  onCompleteTask,
  navigate,
}) => {
  const editTitle = () => {
    const newTitle = window.prompt('Название списка', list.name)
    if (newTitle) {
      onEditTitle(list.id, newTitle)
      axios
        .patch('http://localhost:3001/lists/' + list.id, {
          name: newTitle,
        })
        .catch(() => {
          alert('Ошибка')
        })
    }
  }

  return (
    <div className="container">
      <div className="tasks">
        <Link to={'/lists/' + list.id}>
          <h2 style={{ color: list.color.hex }} className="tasks__title">
            {list.name}
            <img onClick={editTitle} src={editSvg} alt="Edit icon" />
          </h2>
        </Link>
      </div>
      <div className="tasks__items">
        {!withOutEmpty && list.tasks && !list.tasks.length && (
          <h2>Задачи отсутствуют</h2>
        )}
        {list.tasks &&
          list.tasks.map((item) => (
            <Task
              key={item.id}
              onEdit={onEditTask}
              onRemove={onRemoveTask}
              onComplete={onCompleteTask}
              task={item}
              list={list}
            />
          ))}

        <AddTaskForm key={list.id} list={list} onAddTask={onAddTask} />
      </div>
    </div>
  )
}

export default Tasks
