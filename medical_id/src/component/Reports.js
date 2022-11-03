import React, { useContext, useEffect } from 'react'
import ReportItems from './ReportItems'
import reportContex from '../context/report/reportcontext'
import report from './Report.module.css'
import { useNavigate } from 'react-router-dom'

function Reports() {

  const context = useContext(reportContex)
  const { reports, getReport } = context
  const navigate = useNavigate()
  useEffect(() => {
    if (localStorage.getItem('token')) {
      getReport()
    }
    else {
      navigate('/login')
    }
  }, [])

  return (

    <div className={report.container}>
      <div className={report.heading}>
        <h1>All Report</h1>
      </div>
      {reports.length === 0 && <div className={report.container}>No reports to display</div>}
      <div className={report.row}>
        {reports.map((report) => {
          return <ReportItems key={report._id} report={report} />
        })}
      </div>
    </div>

  )
}

export default Reports