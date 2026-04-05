const express = require("express");
const axios = require("axios");
const app = express();

app.use(express.json());

// берём из переменных окружения (ВАЖНО)
const TOKEN = process.env.VK_TOKEN;
const GROUP_ID = process.env.GROUP_ID;

// тестовый маршрут (проверка работы сервера)
app.get("/", (req, res) => {
  res.send("Server is working");
});

app.post("/api/send", async (req, res) => {
  const { name, phone, service, date, time, comment } = req.body;

  const message = 
Новая заявка на груминг:
Имя: ${name}
Телефон: ${phone}
Услуга: ${service}
Дата: ${date}
Время: ${time}
Комментарий: ${comment}
;

  try {
    await axios.post("https://api.vk.com/method/messages.send", null, {
      params: {
        access_token: TOKEN,
        peer_id: GROUP_ID,
        random_id: Date.now(),
        message: message,
        v: "5.131"
      }
    });

    res.json({ success: true });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ success: false });
  }
});

// порт для Render
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server started on port " + PORT);
});
