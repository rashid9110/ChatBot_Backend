// src/services/AdmissionScheduleService.ts

const AdmissionScheduleRepository = require("../repositories/AdmissionScheduleRepositorie");

class AdmissionScheduleService {
  constructor(){
    this.repo=new AdmissionScheduleRepository()
  }
  async createAdmissionSchedule(optionData) {
    console.log(optionData)
      return await this.repo.createAdmissionSchedule(optionData);
    }
  async getByProgramCode(programCode) {
    console.log(programCode)
    const sched = await this.repo.findByProgramCode(programCode);
    if (!sched) throw new Error('Program not found');
    return sched;
  }
}

module.exports=AdmissionScheduleService;
