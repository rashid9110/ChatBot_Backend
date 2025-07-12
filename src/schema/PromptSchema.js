// src/models/Prompt.ts
const mongoose=require('mongoose')

const PromptSchema = new mongoose.Schema({
  promptId: { type: String, required: true, unique: true },
  promptName: { type: String, required: true },
  promptLevel: { type: Number, required: true },
  parentPrompt: { type: String, default: null },
  action: { type: String, default: null }
});

module.exports=mongoose.model('Prompt',PromptSchema)