import React, { useState, useEffect } from 'react'
import axios from 'axios'

import List from '../List/index'

import addSvg from '/project/1/todo-app/src/assets/img/plus24.svg'

import Circle from '../Circle/index'

import './AddListButton.scss'

const AddListButton = ({ colors, onAdd }) => {
  const [visiblePopup, setVisiblePopup] = useState(false)
  const [selectColor, setSelectColor] = useState(3)
  const [isLoading, setIsLoading] = useState(false)
  const [inputValue, setInputValue] = useState('')

  useEffect(() => {
    if (Array.isArray(colors)) {
      setSelectColor(colors[0].id)
    }
  }, [colors])

  const onClose = () => {
    setVisiblePopup(false)
    setInputValue('')
    setSelectColor(colors[0].id)
  }
  const addList = () => {
    if (!inputValue) {
      alert('Пустое поле')
      return
    }
    setIsLoading(true)
    axios
      .post('http://localhost:3001/lists', {
        name: inputValue,
        colorId: selectColor,
      })
      .then(({ data }) => {
        const color = colors.filter((c) => c.id === selectColor)[0]
        const listObj = {
          ...data,
          color: { name: color.name, hex: color.hex },
          tasks: [],
        }
        onAdd(listObj)
        onClose()
      })
      .catch(() => {
        alert('Ошибка')
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return (
    <div className="add-list">
      <List
        onClick={() => setVisiblePopup(!visiblePopup)}
        items={[
          {
            className: 'list__bottomAdd',
            icon: <img src={addSvg} alt="plus" />,
            name: 'Добавить список',
          },
        ]}
      />
      {visiblePopup && (
        <div className="add-list-popup ">
          <svg
            onClick={onClose}
            className="add-list-popup__close"
            xmlns="http://www.w3.org/2000/svg"
            height="20px"
            viewBox="0 0 24 24"
            width="20px"
            fill="#000"
          >
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
          </svg>
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="field"
            type="text"
            placeholder="Название папки"
          />
          <div className="add-list-popup__colors">
            <ul>
              <li>
                {colors.map((color) => (
                  <Circle
                    onClick={() => setSelectColor(color.id)}
                    key={color.id}
                    color={color.name}
                    className={selectColor === color.id && 'active'}
                  />
                ))}
              </li>
            </ul>
          </div>
          <button onClick={addList} className="button">
            {isLoading ? 'Добавление...' : 'Добавить'}
          </button>
        </div>
      )}
    </div>
  )
}

export default AddListButton
