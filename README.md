# ChatBot + OpenAI GPT Webhook (Render Deployment)

Webhook server dùng để kết nối ChatBot.com với OpenAI GPT (gpt-3.5-turbo hoặc gpt-4) để trả lời tự động khách hàng.

## 🧠 Chức năng

- Nhận câu hỏi từ khách hàng thông qua ChatBot.com webhook
- Gửi nội dung đến OpenAI API
- Trả về phản hồi từ GPT
- Hiển thị kết quả trong khung chat LiveChat/ChatBot

## 🚀 Triển khai trên Render.com

1. Push repo này lên GitHub
2. Tạo "New Web Service" trên [Render.com](https://render.com)
3. Cấu hình:
   - Build command: `npm install`
   - Start command: `npm start`
   - Add environment variable: `OPENAI_API_KEY`

## 📡 Cấu hình webhook trong ChatBot.com

- Webhook URL: `https://your-render-app.onrender.com/webhook`
- Payload gửi đi:

```json
{
  "message": "@input"
}
```

- Bot phản hồi bằng:
```
@webhook.reply
```

## 📩 Liên hệ hỗ trợ

Nếu bạn cần hỗ trợ chỉnh sửa prompt, tạo gợi ý tự động, xử lý ngôn ngữ đa dạng (EN, VI, AR...), vui lòng liên hệ nhóm kỹ thuật.
