const informationSchema = require("../schema/informationSchema");


class informationRepositories{
    async createInformation(optionData) {
      console.log(optionData)
    const newOption = new informationSchema(optionData);  
    return await newOption.save();
  } 
}

module.exports=informationRepositories;