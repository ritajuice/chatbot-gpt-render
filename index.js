import express from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

// ✅ Xác minh Webhook Token
const VERIFICATION_TOKEN = '1cd2328dc97e7da6d656593a1cf4fd8c'; // Thay bằng token bạn đã cấu hình

app.get('/webhook', (req, res) => {
  const token = req.query.token;
  const challenge = req.query.challenge;

  if (token === VERIFICATION_TOKEN) {
    res.status(200).send(challenge);
  } else {
    res.sendStatus(401);
  }
});

// ✅ Xử lý nội dung gửi đến từ ChatBot
app.post("/webhook", async (req, res) => {
  const userMessage = req.body.message;

  try {
    const gptResponse = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a helpful customer support assistant for a beverage company. Answer clearly and politely.",
          },
          {
            role: "user",
            content: userMessage,
          },
        ],
        max_tokens: 500,
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const reply = gptResponse.data.choices[0].message.content;
    res.json({ reply });
  } catch (err) {
    console.error("OpenAI error:", err.message);
    res.status(500).json({ reply: "Sorry, there was an error processing your message." });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
