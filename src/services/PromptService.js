// src/services/PromptService.ts

const PromptRepository = require("../repositories/promptRepositorie");

class PromptService {
  constructor(){
    this.repo = new PromptRepository()
  }
  getChildPrompts(parentId) {
    return this.repo.findByParent(parentId);
  }
  async createOption(optionData) {
    console.log(optionData)
        return await this.repo.createOption(optionData);
    }
  getPromptById(promptId) {
    return this.repo.findById(promptId);
  }
}
module.exports=PromptService;