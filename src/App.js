import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Route, Routes, useNavigate } from 'react-router-dom'

import { List, AddListButton, Tasks } from './components/index'

import listSvg from './assets/img/subject_black_24dp.svg'

function App() {
  const [lists, setLists] = useState(null)
  const [colors, setColors] = useState(null)
  const [activeItem, setActiveItem] = useState(null)
  const [href, setHref] = useState('')
  let navigate = useNavigate()
  useEffect(() => {
    navigate('/')
  }, [])
  useEffect(() => {
    axios
      .get('http://localhost:3001/lists?_expand=color&_embed=tasks')
      .then(({ data }) => {
        setLists(data)
      })
    axios.get('http://localhost:3001/colors').then(({ data }) => {
      setColors(data)
    })
  }, [])

  const onAddList = (obj) => {
    const newList = [...lists, obj]
    setLists(newList)
  }
  const onAddTask = (listId, taskObj) => {
    const newList = lists.map((item) => {
      if (item.id === listId) {
        item.tasks = [...item.tasks, taskObj]
      }
      return item
    })
    setLists(newList)
  }
  const onEditListTitle = (id, title) => {
    const newList = lists.map((item) => {
      if (item.id === id) {
        item.name = title
      }
      return item
    })
    setLists(newList)
  }
  const onEditTask = (listId, taskId, taskText) => {
    const newTaskText = window.prompt('Текст задачи', taskText)
    if (!newTaskText) {
      return
    }
    const newList = lists.map((item) => {
      if (item.id === listId) {
        item.tasks = item.tasks.map((task) => {
          if (task.id === taskId) {
            task.text = newTaskText
          }
          return task
        })
      }
      return item
    })
    setLists(newList)
    axios
      .patch('http://localhost:3001/tasks/' + taskId, { text: newTaskText })
      .catch(() => {
        alert('Ошибка')
      })
  }
  const onRemoveTask = (listId, taskId) => {
    if (window.confirm('Реально?')) {
      const newList = lists.map((item) => {
        if (item.id === listId) {
          item.tasks = item.tasks.filter((task) => task.id !== taskId)
        }
        return item
      })
      setLists(newList)
      axios.delete('http://localhost:3001/tasks/' + taskId).catch(() => {
        alert('Ошибка')
      })
    }
  }
  const onCompleteTask = (listId, taskId, completed) => {
    const newList = lists.map((item) => {
      if (item.id === listId) {
        item.tasks = item.tasks.map((task) => {
          if (task.id === taskId) {
            task.completed = completed
          }
          return task
        })
      }
      return item
    })
    setLists(newList)
    axios
      .patch('http://localhost:3001/tasks/' + taskId, { completed })
      .catch(() => {
        alert('Ошибка')
      })
  }

  useEffect(() => {
    if (lists) {
      const list = lists.find((list) => list.id === Number(href))
      setActiveItem(list)
    }
  }, [href])

  return (
    <div className="todo">
      <div className="todo__sidebar">
        <List
          onClickItem={(item) => {
            navigate('/')
            setHref(item.id)
          }}
          items={[
            {
              icon: <img src={listSvg} alt="listicon" />,
              name: 'Все задачи',
              active: !activeItem,
            },
          ]}
        />

        {lists ? (
          <List
            items={lists}
            onRemove={(id) => {
              const newLists = lists.filter((item) => item.id !== id)
              setLists(newLists)
            }}
            onClickItem={(item) => {
              navigate('/lists/' + item.id)
              setHref(item.id)
            }}
            activeItem={activeItem}
            isRemovable
          />
        ) : (
          'Загрузка...'
        )}
        <AddListButton onAdd={onAddList} colors={colors} />
      </div>
      <div className="todo__tasks">
        <Routes>
          <Route
            path="/"
            element={
              lists &&
              lists.map((list) => (
                <Tasks
                  key={list.id}
                  list={list}
                  onAddTask={onAddTask}
                  onEditTitle={onEditListTitle}
                  onRemoveTask={onRemoveTask}
                  onEditTask={onEditTask}
                  onCompleteTask={onCompleteTask}
                  withOutEmpty
                />
              ))
            }
            exact
          ></Route>

          <Route
            path={'/lists/' + href}
            element={
              lists &&
              activeItem && (
                <Tasks
                  list={activeItem}
                  onAddTask={onAddTask}
                  onEditTitle={onEditListTitle}
                  onRemoveTask={onRemoveTask}
                  onEditTask={onEditTask}
                  onCompleteTask={onCompleteTask}
                />
              )
            }
          ></Route>
        </Routes>
      </div>
    </div>
  )
}

export default App
