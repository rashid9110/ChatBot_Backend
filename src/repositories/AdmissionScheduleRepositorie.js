// src/repositories/AdmissionScheduleRepository.ts
const AdmissionSchedule =require("../schema/AdmissinSchediule");

 class AdmissionScheduleRepository {
  async findByProgramCode(code) {
    return AdmissionSchedule.findOne({ programCode: code }).lean();
  }

  async createAdmissionSchedule(optionData) {
    const newOption = new AdmissionSchedule(optionData);  
    return await newOption.save();
  } 
}  

module.exports=AdmissionScheduleRepository; 