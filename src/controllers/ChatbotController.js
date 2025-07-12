

const AdmissionScheduleService = require("../services/AdmissionScheduleService");
const PromptService = require("../services/PromptService");
/services/promptService
const moment = require('moment');
const RegistrationService = require("../services/RegistrationService");

class ChatbotController {
  constructor() {
    this.promptSvc = new PromptService();
    this.scheduleSvc = new AdmissionScheduleService();
    this.Registration = new RegistrationService();
  }

  createOption = async (req, res) => {
    try {
      const { promptId, promptName, parentPrompt, promptLevel, action } = req.body;
      if (!promptId || !promptName) {
        return res.status(400).json({ error: "Key and title are required" });
      }
      const result = await this.promptSvc.createOption({ promptId, promptName, promptLevel, parentPrompt, action });
      res.status(201).json(result);
    } catch (err) {
      res.status(500).json({ error: err.message }); 
    }
  };

  createAdmissionSchedule = async (req, res) => {
    const parseDate = (str) => moment(str, 'DD-MM-YYYY').toDate();
    try {
      const data = {
        programCode: req.body.programCode,
        programName: req.body.programName,
        dateOfTest: parseDate(req.body.dateOfTest),
        seats: parseInt(req.body.seats),
        programFee: parseFloat(req.body.programFee),
        admitCardReleaseDate: parseDate(req.body.admitCardReleaseDate),
        editingStartDate: parseDate(req.body.editingStartDate),
        editingCloseDate: parseDate(req.body.editingCloseDate),
      };
      if (!data.programCode || !data.programName) {
        return res.status(400).json({ error: "programCode and programName are required" });
      }
      const result = await this.scheduleSvc.createAdmissionSchedule(data);
      res.status(201).json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  handlePrompt = async (req, res, next) => {
    try {
      const input = req.body.input;
      let promptId = req.body.promptId || null;

      if (!promptId) {
        const children = await this.promptSvc.getChildPrompts(null);
        return res.json({ reply: '👋 Welcome! Please select an option:', options: children });
      }

      let prompt = await this.promptSvc.getPromptById(promptId);
      if (!prompt) return res.status(404).json({ reply: 'Prompt not found' });

      // If user selected DCS under Admission Schedule
      if (input === 'DCS') {
        const childPrompts = await this.promptSvc.getChildPrompts(promptId);
        if (childPrompts.length > 0) {
          promptId = childPrompts[0].promptId;
          prompt = childPrompts[0];
        } else {
          return res.json({ reply: '❌ No prompt found for DCS.' });
        }
      }

      // 🎯 Admission Schedule logic
      if (prompt.action === 'AdmissionSchedule') {
        if (!input) return res.json({ reply: 'Enter a program code:' });

        try {
          const sched = await this.scheduleSvc.getByProgramCode(input.trim());
          if (!sched) return res.json({ reply: '❌ Program not found' });

          return res.json({
            reply: `📘 Program: ${sched.programName}\n📅 Test: ${sched.dateOfTest.toDateString()}\n🎓 Seats: ${sched.seats}\n💰 Fee: ₹${sched.programFee}`
          });
        } catch (e) {
          return res.json({ reply: '❌ Something went wrong while fetching schedule.' });
        }
      }

      // 📩 Record Complaint logic
      if (prompt.action === 'RecordComplaint') {
        const { registrationNo, mobileNo, complaintText, otp } = req.body;

        if (!registrationNo) {
          return res.json({
            reply: 'Please enter your Registration Number:',
            expectField: 'registrationNo'
          });
        }

        const status = await this.Registration.getByRegistration(registrationNo);
        console.log(status)
        if (!status) {
          return res.json({ reply: '❌ You are not registered.' });
        }

        // Account inactive — needs mobile & OTP verification
        if (status.status === 'No') {
          if (!mobileNo) {
            return res.json({
              reply: 'Your account is inactive. Please enter your Mobile Number to activate:',
              expectField: 'mobileNo'
            });
          }

          if (mobileNo !== status.mobileNo) {
            return res.json({
              reply: '❌ Invalid mobile number. Please try again.',
              expectField: 'mobileNo'
            });
          }

          if (!otp) {
            return res.json({
              reply: `🔐 OTP has been sent your registered Mobile Number: ${status.OTP}. Please enter it to verify:`,
              expectField: 'otp'
            });
          }

          if (otp !== status.OTP) {
            return res.json({
              reply: '❌ Incorrect OTP. Try again:',
              expectField: 'otp'
            });
          }

          return res.json({
            reply: '✅ Your account is now verified. Please enter your complaint:',
            expectField: 'complaintText'
          });
        }

        // Account is active
        if (status.status === 'yes') {
          if (!complaintText) {
            return res.json({
              reply: 'Please enter your complaint text:',
              expectField: 'complaintText'
            });
          }

          // Save complaint (uncomment when you connect infoService)
          // await this.infoService.createinfo({ registrationNo, mobileNo, complaintText, complaintStatus: 'Pending' });

          return res.json({
            reply: '✅ Your complaint has been recorded successfully.'
          });
        }

        return;
      }

      // Fallback: show child prompts
      const children = await this.promptSvc.getChildPrompts(promptId);
      return res.json({
        reply: 'Choose an option:',
        options: children
      });

    } catch (err) {
      next(err);
    }
  };
}

module.exports = ChatbotController;
