import React, { useState } from 'react'
import axios from 'axios'

import addSvg from '../../assets/img/plus24.svg'

const AddTaskForm = ({ list, onAddTask }) => {
  const [visibleForm, setVisibleForm] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const toggleFormVisible = () => {
    setVisibleForm(!visibleForm)
    setInputValue('')
  }

  const addTask = () => {
    const obj = {
      listId: list.id,
      text: inputValue,
      completed: false,
    }
    setIsLoading(true)
    axios
      .post('http://localhost:3001/tasks/', obj)
      .then(({ data }) => {
        onAddTask(list.id, data)
        toggleFormVisible()
      })
      .catch(() => {
        alert('Ошибка')
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return (
    <div>
      <div className="tasks__form">
        {!visibleForm ? (
          <div onClick={toggleFormVisible} className="tasks__form-new">
            <img src={addSvg} alt="plus" />
            <span> Новая задача</span>
          </div>
        ) : (
          <div className="tasks__form-block">
            <input
              value={inputValue}
              className="field field-tasks"
              type="text"
              placeholder="Текст задачи"
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button
              disabled={isLoading}
              onClick={addTask}
              className="button button--add"
            >
              {isLoading ? 'Добавление...' : 'Добавить задачу'}
            </button>
            <button
              onClick={toggleFormVisible}
              className="button button--cancel"
            >
              Отмена
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default AddTaskForm
