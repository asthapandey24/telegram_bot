const TelegramBot = require("node-telegram-bot-api");
const axios = require("axios");

const token = "5916717018:AAHgklJtJRQ3_L6UlY9RiUxTB90h21y3264";

const bot = new TelegramBot(token, {polling: true});

bot.on('message', (msg) => {
  const chatId = msg.chat.id;

  if (msg.text === '/start') {
    bot.sendMessage(chatId, 'Welcome to the Weather Update Bot! Type /subscribe to receive weather updates.');
  } else if (msg.text === '/subscribe') {
    
    bot.sendMessage(chatId, 'You have subscribed to weather updates.');
  }
});



bot.on("message", async (msg) => {
    const chatId = msg.chat.id;
    const userInput = msg.text;
  
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${userInput}&appid=dd60b77b6d3e5174ec164441abf30444`
      );
      const data = response.data;
      const weather = data.weather[0].description;
      const temperature = data.main.temp - 273.15;
      const city = data.name;
      const humidity = data.main.humidity;
      const pressure = data.main.pressure;
      const windSpeed = data.wind.speed;
      const message = `The weather in ${city} is ${weather} with a temperature of ${temperature.toFixed(2)}°C. The humidity is ${humidity}%, the pressure is ${pressure}hPa, and the wind speed is ${windSpeed}m/s.`;
  
      bot.sendMessage(chatId, message);
    } catch (error) {
      bot.sendMessage(chatId, "City doesn't exist.");
    }
  });
