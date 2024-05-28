import React, { useState } from 'react'
import { Bar } from 'react-chartjs-2'
import 'chart.js/auto'
import { Dialog } from '../story/types'

interface AnalyticsChartProps {
  dialogs: Dialog[]
}

const AnalyticsChart: React.FC<AnalyticsChartProps> = ({ dialogs }) => {
  const [companyFilter, setCompanyFilter] = useState('')

  const filteredData = dialogs.filter((dialog) => {
    if (companyFilter) {
      return dialog.company.toLowerCase().includes(companyFilter.toLowerCase())
    }
    return true
  })

  const labels = filteredData.map((dialog) => `${new Date(dialog.startDate).toLocaleDateString()} - ${dialog.company}`)
  const data = labels.reduce((acc, label) => {
    acc[label] = (acc[label] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Количество диалогов',
        data: labels.map((label) => data[label]),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  }

  const chartOptions = {
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: {
          callback: function (_value: string | number, index: number) {
            const label = labels[index]
            const [date, company] = label.split(' - ')
            return `${date}\n${company}`
          },
        },
      },
    },
  }

  return (
    <div className='chart-container'>
      <h1>Аналитика</h1>
      <label>
        Фильтр по компании:
        <input type='text' value={companyFilter} onChange={(e) => setCompanyFilter(e.target.value)} />
      </label>
      <Bar data={chartData} options={chartOptions} />
    </div>
  )
}

export default AnalyticsChart
