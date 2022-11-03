const express = require('express')
const { body, validationResult } = require('express-validator');
const Report = require('../models/Reports')
const fetchuser = require('../middleware/fetchuser')
const router = express.Router()

//ROUTE-1:Get all the notes GET:/api/notes/fetchallnotes
router.get('/fetchallreports', fetchuser, async (req, res) => {
    try {
        const report = await Report.find({ user: req.user.id })
        res.json(report)
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal server error")
      }
})
//ROUTE-2:Add a new note using  POST:/api/notes/addnote
router.post('/addreport', fetchuser, async (req, res) => {

    try {

        const { disease_name, doctor_name, medicines_name,report_pic } = req.body
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const report = new Report({
            disease_name, doctor_name, medicines_name,report_pic, user: req.user.id
        })
        const savedReport = await report.save()
        res.json(savedReport)
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal server error")
      }
})

//ROUTE-3:Add a new note using  PUT:/api/notes/updatenote
router.put('/editreport/:id', fetchuser, async (req, res) => {
    const { disease_name, doctor_name, medicines_name,report_pic } = req.body
    try {
    //create an newNote object
    const newReport = {};
    if(disease_name){newReport.disease_name = disease_name}
    if(doctor_name){newReport.doctor_name = doctor_name}
    if(medicines_name){newReport.medicines_name = medicines_name}
    if(report_pic){newReport.report_pic = report_pic}
    //Find the note to update and update it
    let report =await Report.findById(req.params.id)
    if(!report){return res.status(404).send("Not Found")}
    if(report.user.toString() !== req.user.id){
        return res.status(401).send("Not Allowed")
    }

    report = await Report.findByIdAndUpdate(req.params.id,{$set: newReport},{new:true})
    res.json(report)
} catch (error) {
    console.error(error.message)
    res.status(500).send("Internal server error")
  }
})

// //ROUTE-4:delete a new note using  DELETE:/api/notes/deletenote
router.delete('/deletereport/:id', fetchuser, async (req, res) => {
    try {
    //Find the note to delete and delete it
    let report =await Report.findById(req.params.id)
    if(!report){return res.status(404).send("Not Found")}
    if(report.user.toString() !== req.user.id){
        return res.status(401).send("Not Allowed")
    }

    report = await Report.findByIdAndDelete(req.params.id)
    res.json({"success":"Note has been deleted",report:report})
} catch (error) {
    console.error(error.message)
    res.status(500).send("Internal server error")
  }
})

module.exports = router