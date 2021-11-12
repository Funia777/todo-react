import React from 'react'
import classNames from 'classnames'
import axios from 'axios'

import removeSvg from '../../assets/img/remove24.svg'

import Circle from '../Circle/index'

import './list.scss'

const List = ({
  items,
  isRemovable,
  onClick,
  onRemove,
  onClickItem,
  activeItem,
}) => {
  const removeList = (item) => {
    if (window.confirm('Реально?')) {
      axios.delete('http://localhost:3001/lists/' + item.id).then(() => {
        onRemove(item.id)
      })
    }
  }

  return (
    <ul onClick={onClick} className="list">
      {items.map((item, index) => (
        <li
          key={index}
          className={classNames(item.className, {
            active: item.active
              ? item.active
              : activeItem && activeItem.id === item.id,
          })}
          onClick={onClickItem ? () => onClickItem(item) : null}
        >
          <i>{item.icon ? item.icon : <Circle color={item.color.name} />}</i>
          <span>
            {item.name}
            {item.tasks && `   (${item.tasks.length})                 `}
          </span>
          {isRemovable && (
            <img
              className="list__remove"
              src={removeSvg}
              alt="delete"
              onClick={() => removeList(item)}
            />
          )}
        </li>
      ))}
    </ul>
  )
}

export default List
