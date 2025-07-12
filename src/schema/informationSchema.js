const mongoose = require('mongoose');

const informationSchema = new mongoose.Schema({
  ticketNo: {
    type: String,
    required: true,
    unique: true  // ✅ Keep this
  },
  registrationNo: {
    type: String,
    required: true
  
  },
  applicationNo: {
    type: String
  },
  complaintText: {
    type: String,
    required: true
  },
  email: {
    type: String
  },
  mobileNo: {
    type: String,
    validate: {
      validator: function(v) {
        return /^[0-9]{10}$/.test(v);
      },
      message: props => `${props.value} is not a valid 10-digit mobile number!`
    }
  },
  complaintStatus: {
    type: String,
    default: 'Pending'
  }  
});

module.exports = mongoose.model('Information', informationSchema);
