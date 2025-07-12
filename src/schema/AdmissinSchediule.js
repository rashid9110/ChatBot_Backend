const mongoose = require('mongoose');

const AdmissionScheduleSchema = new mongoose.Schema({
  programCode: { type: String, required: true, unique: true },
  programName: { type: String, required: true },
  dateOfTest: { type: Date },
  seats: { type: Number },
  programFee: { type: Number },
  admitCardReleaseDate: { type: Date },
  editingStartDate: { type: Date },
  editingCloseDate: { type: Date }
});

module.exports = mongoose.model('AdmissionSchedule', AdmissionScheduleSchema);
