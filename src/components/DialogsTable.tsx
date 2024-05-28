import React, { useState, useEffect, useCallback } from 'react'
import ChatModal from './ChatModal'
import { Dialog } from '../story/types'

interface DialogsTableProps {
  dialogs: Dialog[]
}

const defaultState = {
  startDate: '',
  endDate: '',
  company: '',
  employee: '',
}

const DialogsTable: React.FC<DialogsTableProps> = ({ dialogs }) => {
  const [filters, setFilters] = useState(defaultState)
  const [dialogsList, setDialogsList] = useState(dialogs)
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'ascending' | 'descending' | null }>({
    key: 'startDate',
    direction: 'ascending',
  })
  const [selectedDialog, setSelectedDialog] = useState<Dialog | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFilters({
      ...filters,
      [name]: value,
    })
  }
  const applyFilters = useCallback(() => {
    let filteredDialogs = dialogs.filter((item) => {
      const isCompany = filters.company ? item.company.toLowerCase().includes(filters.company.toLowerCase()) : true
      const isEmployee = filters.employee ? item.employee.toLowerCase().includes(filters.employee.toLowerCase()) : true
      const startDateMatch = filters.startDate ? new Date(item.startDate) >= new Date(filters.startDate) : true
      const endDateMatch = filters.endDate ? new Date(item.startDate) <= new Date(filters.endDate) : true

      return isCompany && isEmployee && startDateMatch && endDateMatch
    })

    if (sortConfig.key) {
      filteredDialogs = filteredDialogs.sort((a, b) => {
        if (sortConfig.key === 'startDate' || sortConfig.key === 'lastMessageDate') {
          const dateA = new Date(a[sortConfig.key])
          const dateB = new Date(b[sortConfig.key])
          if (dateA < dateB) {
            return sortConfig.direction === 'ascending' ? -1 : 1
          }
          if (dateA > dateB) {
            return sortConfig.direction === 'ascending' ? 1 : -1
          }
          return 0
        }
        return 0
      })
    }

    setDialogsList(filteredDialogs)
  }, [dialogs, filters, sortConfig])

  useEffect(() => {
    applyFilters()
  }, [filters, sortConfig, applyFilters])

  const handleSort = (key: string) => {
    let direction: 'ascending' | 'descending' = 'ascending'
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending'
    }
    setSortConfig({ key, direction })
  }

  const resetFilter = () => {
    setFilters(defaultState)
    setDialogsList(dialogs)
  }

  const openModal = (dialog: Dialog) => {
    setSelectedDialog(dialog)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setSelectedDialog(null)
    setIsModalOpen(false)
  }

  return (
    <div>
      <h1>Диалоги</h1>
      <div className='containerBody'>
        <label>
          Начальная дата:
          <input type='date' name='startDate' value={filters.startDate} onChange={handleFilterChange} />
        </label>
        <label>
          Конечная дата:
          <input type='date' name='endDate' value={filters.endDate} onChange={handleFilterChange} />
        </label>
        <label>
          Компания:
          <input type='text' name='company' value={filters.company} onChange={handleFilterChange} />
        </label>
        <label>
          Сотрудник:
          <input type='text' name='employee' value={filters.employee} onChange={handleFilterChange} />
        </label>
        <button className='applyFilter' onClick={resetFilter}>
          Сбросить
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>ИД диалога</th>
            <th onClick={() => handleSort('startDate')}>
              Дата начала {sortConfig.key === 'startDate' ? (sortConfig.direction === 'ascending' ? '↑' : '↓') : ''}
            </th>
            <th onClick={() => handleSort('lastMessageDate')}>
              Дата последнего сообщения{' '}
              {sortConfig.key === 'lastMessageDate' ? (sortConfig.direction === 'ascending' ? '↑' : '↓') : ''}
            </th>
            <th>Компания</th>
            <th>Сотрудник</th>
            <th>Комментарии</th>
          </tr>
        </thead>
        <tbody>
          {dialogsList.map((dialog) => (
            <tr key={dialog.dialogId} onClick={() => openModal(dialog)}>
              <td>{dialog.dialogId}</td>
              <td>{new Date(dialog.startDate).toLocaleString()}</td>
              <td>{new Date(dialog.lastMessageDate).toLocaleString()}</td>
              <td>{dialog.company}</td>
              <td>{dialog.employee}</td>
              <td>
                {dialog.comments.map((comment, index) => (
                  <div key={index}>
                    <strong>{comment.author}:</strong> {comment.text}
                  </div>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ChatModal isOpen={isModalOpen} onRequestClose={closeModal} dialog={selectedDialog} />
    </div>
  )
}

export default DialogsTable
