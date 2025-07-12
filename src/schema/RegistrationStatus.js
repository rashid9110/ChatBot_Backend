const mongoose = require('mongoose');

const RegistrationSchema = new mongoose.Schema({
  registrationNo: {
    type: String,
    required: true,
    unique: true
  },
  OTP: {
    type: String,
    maxlength: 5,
    minlength: 5
  },
  mobileNo: {
    type: String, // ✅ use String for phone numbers
    validate: {
      validator: function (v) {
        return /^[0-9]{10}$/.test(v); // ✅ validate exactly 10 digits
      },
      message: props => `${props.value} is not a valid 10-digit mobile number!`
    }
  },
  status: {
    type: String,
    default: 'No'
  }
});
  
module.exports = mongoose.model('Registration', RegistrationSchema);
