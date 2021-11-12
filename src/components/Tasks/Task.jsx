import React from 'react'

import removeSvg from '../../assets/img/remove24.svg'
import editSvg from '../../assets/img/edit24p.svg'

function Task({ task, onRemove, onEdit, list, onComplete }) {
  const onChangeCheckBox = (e) => {
    onComplete(list.id, task.id, e.target.checked)
  }
  return (
    <div key={task.id} className="tasks__items-row">
      <div className="checkbox">
        <input
          onChange={onChangeCheckBox}
          id={`task-${task.id}`}
          type="checkbox"
          checked={task.completed}
        />
        <label htmlFor={`task-${task.id}`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="18px"
            viewBox="0 0 24 24"
            width="18px"
            fill="#000000"
          >
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />
          </svg>
        </label>
      </div>
      <p>{task.text}</p>
      <img
        onClick={() => onEdit(list.id, task.id, task.text)}
        className="tasks__items-row-edit"
        src={editSvg}
        alt="remove"
      ></img>
      <img
        onClick={() => onRemove(list.id, task.id)}
        className="tasks__items-row-remove"
        src={removeSvg}
        alt="delete"
      ></img>
    </div>
  )
}

export default Task
