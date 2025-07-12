const { v4: uuidv4 } = require('uuid');
const InformationService = require("../services/informationService");

class InfoController {
  constructor() {
    this.informationService = new InformationService();
  }

  createinfo = async (req, res) => {
    try {
      const ticketNo = uuidv4();
      const { registrationNo, applicationNo, complaintText, email, mobileNo, complaintStatus } = req.body;

      if (!registrationNo || !complaintText) {
        return res.status(400).json({ error: "registrationNo and complaintText are required" });
      }

      const result = await this.informationService.createInformation({
        ticketNo,
        registrationNo,
        applicationNo,
        complaintText,
        email,
        mobileNo,
        complaintStatus
      });

      return res.status(201).json({ ticketNo }); // Only return ticketNo for frontend
    } catch (err) {
      console.error("❌ Error in infoController:", err.message);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };
}

module.exports = InfoController;
