import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import DialogsTable from './components/DialogsTable'
import AnalyticsChart from './components/AnalyticsChart'
import './App.css'
import { Dialog } from './story/types'

const dialogs: Dialog[] = [
  {
    dialogId: 1,
    startDate: '2023-05-01T10:00:00Z',
    lastMessageDate: '2023-05-01T10:05:00Z',
    company: 'Компания А',
    employee: 'Сотрудник 1',
    comments: [
      { author: 'Бот', text: 'Здравствуйте, чем могу помочь?' },
      { author: 'Клиент', text: 'Мне нужна помощь с заказом.' },
    ],
  },
  {
    dialogId: 2,
    startDate: '2023-05-02T11:00:00Z',
    lastMessageDate: '2023-05-02T11:15:00Z',
    company: 'Компания Б',
    employee: 'Сотрудник 2',
    comments: [
      { author: 'Бот', text: 'Добрый день!' },
      { author: 'Клиент', text: 'Здравствуйте, у меня вопрос по доставке.' },
    ],
  },
  {
    dialogId: 3,
    startDate: '2024-02-03T11:00:00Z',
    lastMessageDate: '2024-05-06T11:15:00Z',
    company: 'Компания В',
    employee: 'Сотрудник 2',
    comments: [
      { author: 'Бот', text: 'Добрый день!' },
      { author: 'Клиент', text: 'Здравствуйте, у меня вопрос по доставке.' },
    ],
  },
  {
    dialogId: 4,
    startDate: '2024-05-04T11:00:00Z',
    lastMessageDate: '2024-05-07T11:15:00Z',
    company: 'Компания Г',
    employee: 'Сотрудник 5',
    comments: [
      { author: 'Бот', text: 'Добрый день!' },
      { author: 'Клиент', text: 'Здравствуйте, у меня вопрос по доставке.' },
    ],
  },
  {
    dialogId: 5,
    startDate: '2024-05-05T11:00:00Z',
    lastMessageDate: '2024-05-02T11:15:00Z',
    company: 'Компания Д',
    employee: 'Сотрудник 3',
    comments: [
      { author: 'Бот', text: 'Добрый день!' },
      { author: 'Клиент', text: 'Здравствуйте, у меня вопрос по доставке.' },
    ],
  },
]

const App: React.FC = () => {
  return (
    <Router>
      <div id='root' className='app'>
        <Sidebar />
        <div className='main-content'>
          <Routes>
            <Route
              path='/'
              element={
                <div>
                  <h1>Главная страница</h1>
                  <p>Добро пожаловать на главную страницу.</p>
                </div>
              }
            />
            <Route path='/dialogs' element={<DialogsTable dialogs={dialogs} />} />
            <Route path='/analytics' element={<AnalyticsChart dialogs={dialogs} />} />
            <Route
              path='/settings'
              element={
                <div>
                  <h1>Настройки</h1>
                  <p>Здесь будут настройки.</p>
                </div>
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App
