const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/chat', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const messageSchema = new mongoose.Schema({
    senderName: String,
    senderId: String,
    text: String,
    createdAt: { type: Date, default: Date.now }
});

const Message = mongoose.model('Message', messageSchema);

app.get('/messages/:accountId', async (req, res) => {
    const messages = await Message.find({ senderId: req.params.accountId });
    res.json(messages);
});

app.post('/messages', async (req, res) => {
    const { senderName, senderId, text } = req.body;
    const newMessage = new Message({ senderName, senderId, text });
    await newMessage.save();
    res.json(newMessage);
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
