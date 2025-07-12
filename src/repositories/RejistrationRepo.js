const RegistrationSchema=require("../schema/RegistrationStatus");

class RegistrationRepositories{
    async createRegistration(optionData) {
    try {
      console.log("🟡 Attempting to save:", optionData);
      const newOption = new RegistrationSchema(optionData);
      const result = await newOption.save();
      console.log("✅ Registration saved:", result);
      return result;
    } catch (error) {
      console.error("❌ Error saving registration:", error);
      throw error;
    }
  }
  async findByRegistration(registrationNo){
    return RegistrationSchema.findOne({ registrationNo });
  }
}

module.exports=RegistrationRepositories;