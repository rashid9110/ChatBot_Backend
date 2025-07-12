// src/repositories/PromptRepository.ts

const PromptSchema=require("../schema/PromptSchema");

class PromptRepository {
  async findByParent(parentId) {
    return PromptSchema.find({ parentPrompt: parentId }).lean();
  }
  
    async createOption(optionData) {
        const newOption = new PromptSchema(optionData);  
        return await newOption.save();
    } 

  async findById(id) {
    return PromptSchema.findOne({ promptId: id }).lean();
  }
}

module.exports=PromptRepository;