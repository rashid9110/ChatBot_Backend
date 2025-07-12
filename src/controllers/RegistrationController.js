const RegistrationService = require("../services/RegistrationService");

class RegistrationController {
  constructor() {
    this.info = new RegistrationService();
  }

  // ✅ Get Registration by registrationNo
  findByRegistrationNo = async (req, res) => {
    try {
      const { registrationNo } = req.body;
      console.log("Received RegistrationNo:", registrationNo);

      if (!registrationNo) {
        return res.status(400).json({ error: "registrationNo is required" });
      }

      const registration = await this.info.getByRegistration(registrationNo);
      if (!registration) {
        return res.status(404).json({ message: "Registration not found" });
      }

      res.status(200).json(registration);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  // ✅ Create new registration
  createRegis = async (req, res) => {
    console.log(req.body);
    try {
      const { registrationNo, OTP, mobileNo, status } = req.body;

      if (!registrationNo || !mobileNo) {
        return res.status(400).json({ error: "registrationNo and mobileNo are required" });
      }

      const result = await this.info.createRegistration({
        registrationNo,
        OTP,
        mobileNo,
        status: status || "No" // default to "No" if not given
      });

      res.status(201).json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
}

module.exports = RegistrationController;
