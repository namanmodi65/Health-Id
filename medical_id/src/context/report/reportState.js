import React, { useState } from "react";
import ReportContex from "./reportcontext";

const ReportState =(props) =>{
    const host = 'http://localhost:3001'
    const initialReport = []
    const [reports,setReports] = useState(initialReport)


    //getNote
    const getReport = async()=>{
        const response = await fetch(`${host}/api/reports/fetchallreports`,{
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'auth-token':localStorage.getItem('token')
            }
        })
        const json = await response.json()
        setReports(json)
    }

    //addReport
    const addReport = async (disease_name,doctor_name,medicines_name,report_pic)=>{
        console.log("Adding a new report")

        //API CALL
        const response = await fetch(`${host}/api/reports/addreport`,{
            method:"POST",
            headers:{
                'Content-Type':'application/json',
                'auth-token':localStorage.getItem('token')
            },
            body : JSON.stringify({disease_name,doctor_name,medicines_name,report_pic})
        })
        const report = await response.json()
        setReports(reports.concat(report))
    }

    //delete report
    const deleteReport = async(id)=>{
        const response = await fetch(`${host}/api/reports/deletereport/${id}`,{
            method:"DELETE",
            headers:{
                'Content-Type':'application/json',
                'auth-token':localStorage.getItem('token')
            }
        })
        const json = response.json()
        console.log(json)

        console.log("Deleting the report with id "+id)
        const newReport = reports.filter((note)=>{return note._id !==id})
        setReports(newReport)
    }

    //edit a report 
    // const editReport = async (id,disease_name,doctor_name,medicines_name,report_pic)=>{
    //     const response = await fetch(`${host}/api/reports/editreport/${id}`,{
    //         method:"PUT",
    //         headers:{
    //             'Content-Type':'application/json',
    //             'auth-token':localStorage.getItem('token')
    //         },
    //         body: JSON.stringify({disease_name,doctor_name,medicines_name,report_pic})
    //     })
    //     let newReport = JSON.parse(JSON.stringify(reports))
    //     //logic for edit
    //     for(let index = 0;index<newReport.length;index++){
    //         const element = newReport[index]
    //         if(element._id === id){
    //             element.disease_name = disease_name,
    //             element.doctor_name  = doctor_name,
    //             element.medicines_name = medicines_name,
    //             element.report_pic = report_pic
    //             break;
    //         }
    //     }
    //     setReports(newReport)
    // }
    
    return(
        <ReportContex.Provider value={{reports,addReport,getReport,deleteReport}}>
            {props.children}
        </ReportContex.Provider>
    )
}

export default ReportState
