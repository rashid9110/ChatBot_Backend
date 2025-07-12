const RegistrationRepositories = require("../repositories/RejistrationRepo");

class RegistrationService{
    constructor(){
        this.repo=new RegistrationRepositories();
    }
      async createRegistration(optionData) {
    console.log(optionData)
      return await this.repo.createRegistration(optionData);
    }

     getByRegistration(RegistrationNo) {
    return this.repo.findByRegistration(RegistrationNo);
  }
}

module.exports=RegistrationService;