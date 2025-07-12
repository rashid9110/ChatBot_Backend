const informationRepositories = require("../repositories/informationRepositories");

class informationService{
    constructor(){
        this.repo=new informationRepositories();
    }
      async createInformation(optionData) {
      // console.log(optionData)
      return await this.repo.createInformation(optionData);
    }
}

module.exports=informationService;