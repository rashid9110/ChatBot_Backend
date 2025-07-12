const express = require('express');
const ChatbotController = require('../controllers/ChatbotController');
const infoController = require('../controllers/infoController');
const RegistrationController = require('../controllers/RegistrationController');
const ChatbotRouter = express.Router();

// Create an instance of the controller
const chatbotController = new ChatbotController();
const infomationController=new infoController();
const registrationController=new RegistrationController();


ChatbotRouter.post('/prompt', chatbotController.createOption);
ChatbotRouter.post('/select', chatbotController.handlePrompt);
ChatbotRouter.post('/AdmissinSchedule',chatbotController.createAdmissionSchedule);
ChatbotRouter.post('/info',infomationController.createinfo);
ChatbotRouter.post('/validate-registration',registrationController.findByRegistrationNo);
ChatbotRouter.post('/createRegis',registrationController.createRegis);



   
module.exports = ChatbotRouter;
 