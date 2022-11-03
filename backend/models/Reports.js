const mongoose = require('mongoose');
const { Schema } = mongoose;

const ReportsSchema = new Schema({
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'user'
  },
  disease_name: {
    type: String,
    required: true
  },
  doctor_name: {
    type: String,
    required: true,
  },
  medicines_name: {
    type: String,
  },
  report_pic: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  },
}
);

const Report = mongoose.model('reports', ReportsSchema);
Report.createIndexes()
module.exports = Report