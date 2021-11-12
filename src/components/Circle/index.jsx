import React from 'react'
import classNames from 'classnames'

import './Circle.scss'

const Circle = ({ color, onClick, className }) => (
  <i
    onClick={onClick}
    className={classNames(
      'circle',
      { [`  circle circle__${color}`]: color },
      className
    )}
  ></i>
)

export default Circle
