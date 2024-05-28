import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar: React.FC = () => {
  return (
    <div className='sidebar'>
      <h2>Навигация</h2>
      <ul>
        <li>
          <Link to='/'>Главная</Link>
        </li>
        <li>
          <Link to='/dialogs'>Диалоги</Link>
        </li>
        <li>
          <Link to='/analytics'>Аналитика</Link>
        </li>
        <li>
          <Link to='/settings'>Настройки</Link>
        </li>
      </ul>
    </div>
  )
}

export default Sidebar
