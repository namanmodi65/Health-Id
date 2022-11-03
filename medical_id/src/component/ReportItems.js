import React ,{useContext}from 'react'
import { Link } from 'react-router-dom'
import reportContex from '../context/report/reportcontext'
import ReadMore from './ReadMore'
import reportitems from './ReportItems.module.css'


function ReportItems(props) {
  const context = useContext(reportContex)
  const {deleteReport} = context
  const {report} = props

  const handleReadMore =()=>{
    console.log("Read more click")
    
  }

  return (
    <div className={reportitems.card}>
      <div className={reportitems.card_header}>
        <h1>{report.disease_name}</h1>
      </div>
      <div className={reportitems.card_body}>
        <p>
          Doctor:-{report.doctor_name}
        </p>
        <p>
        Date:-{new Date(report.date).toDateString()}
        </p>
        <p>
        Medicines:-{report.medicines_name}
        </p>
        <p><a href={report.report_pic} target="_blank">Report Image</a></p>
        {/* <h5>Doctor name</h5> */}

        <Link to={`http://localhost:3000/myreport/${report._id}`} className={reportitems.btn}>Read more</Link>
        <i className='fa fa-trash-alt' onClick={()=>{deleteReport(report._id)}}></i>
        <i className='fa fa-edit'></i>
      </div>
    </div>
  )
}

export default ReportItems