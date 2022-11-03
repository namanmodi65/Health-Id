import React, { useContext, useState } from 'react'
import reportContex from '../context/report/reportcontext'
import formCss from './Form.module.css'
function Form() {
  const context = useContext(reportContex)
  const {addReport}=context
  const [report, setReport] = useState({disease_name:"",doctor_name:"",medicines_name:"",report_pic:""})

  const [image, setImage] = useState(null);
    const [upladingImg, setUploadingImg] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);


    function validateImg(e) {
      const file = e.target.files[0];
      if (file.size >= 1048576) {
          return alert("Max file size is 1mb");
      } else {
          setImage(file);
          setImagePreview(URL.createObjectURL(file));
      }
  }


  async function uploadImage() {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "iqnuobjo");
    try {
        setUploadingImg(true);
        let res = await fetch("https://api.cloudinary.com/v1_1/dquivuztl/image/upload", {
            method: "post",
            body: data,
        });
        const urlData = await res.json();
        setUploadingImg(false);
        return urlData.url;
    } catch (error) {
        setUploadingImg(false);
        console.log(error);
    }
  }


  const handleClick=async(e)=>{
    e.preventDefault()

    // if (!image) return alert("Please upload your profile picture");
    const url = await uploadImage(image);
    console.log(url)

    addReport(report.disease_name,report.doctor_name,report.medicines_name,report.report_pic)
    setReport({disease_name:"",doctor_name:"",medicines_name:"",report_pic:url})
    alert("Report Added")
  }

  const onChange =(e)=>{
    setReport({...report,[e.target.name]:e.target.value})
  }

  return (
    <>
      <form className={formCss.form}>
        <h1>Add Report...</h1>
        <div className={formCss.box}>
          <label htmlFor="diseasename" >Disease name</label>
          <input type="text" id="disease_name" name='disease_name' value={report.disease_name} onChange={onChange} placeholder="Disease name" required/>
        </div>
        <div className={formCss.box}>
          <label htmlFor="doctorname" >Doctor Name</label>
          <input type="text" id="doctor_name" name='doctor_name' value={report.doctor_name} onChange={onChange} placeholder="Doctor name" required/>
        </div>
        <div className={formCss.box}>
          <label htmlFor="medicine" >Medicines Name</label>
          <textarea id="medicines_name" name='medicines_name' rows="4" value={report.medicines_name} onChange={onChange} placeholder='Medicines Name' required></textarea>
        </div>
        <div className={formCss.box}>
          <label htmlFor="testfile"  >Upload test report</label>
          <input type="file" accept="image/png, image/jpeg" onChange={validateImg} />
          <div className={formCss.notfile}>(if test is not done leave it)</div>
        </div>
        {/* <div className={formCss.box}>
          <label htmlFor="testfile"  >Upload test report</label>
          <input type="file" class="form-control" aria-label="file example" value={report.report_pic} onChange={onChange} />
          <div className={formCss.notfile}>(if test is not done leave it)</div>
        </div> */}
        <div className={formCss.boxbtn}>
        <button className={formCss.btn} onClick={handleClick} type="submit">Submit form</button>
        </div>
      </form>
    </>
  )
}

export default Form