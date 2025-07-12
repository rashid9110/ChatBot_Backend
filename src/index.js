
const express = require("express");
const cors = require("cors"); // <-- Add this

const ServerConfig = require('./config/serverConfig');
const connectDB = require('./config/dbConfig');
const ChatbotRouter = require("./router/ChatbotRouter");

const app = express();

app.use(cors({
  origin: 'https://universitychatbot.netlify.app/', // <-- Allow your Vite frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

app.use('/chat', ChatbotRouter);

app.post('/ping', (req, res) => {
  console.log(req.body);
  return res.json({ message: 'pong' });
});

// app.listen(ServerConfig.PORT, async () => {
//   await connectDB();
//   console.log(`Server started at port ${ServerConfig.PORT}`);
// });
const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server started at port ${PORT}`);
});