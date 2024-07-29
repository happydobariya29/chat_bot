const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config(); // Load environment variables from .env file

// Replace 'YOUR_BOT_TOKEN' with your actual bot token from the .env file
const token = process.env.TELEGRAM_BOT_TOKEN;

// Create a new Telegram bot instance
const bot = new TelegramBot(token, { polling: true });

// Define the inline keyboard for the menu
const inlineKeyboard = [
    [{ text: "Start", callback_data: "start" }],
    [{ text: "Exit", callback_data: "exit" }]
];

// Command handler for /menu
bot.onText(/\/menu/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, "Choose an option:", {
        reply_markup: {
            inline_keyboard: inlineKeyboard
        }
    }).catch(error => {
        console.error('Error sending message:', error);
    });
});

// Command handler for /start
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, "Please use /menu to see options.").catch(error => {
        console.error('Error sending message:', error);
    });
});

// Command handler for /exit
bot.onText(/\/exit/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, "Sorry to see you going. Bye for now.").catch(error => {
        console.error('Error sending message:', error);
    });
});

// Callback query handler
bot.on('callback_query', (callbackQuery) => {
    const chatId = callbackQuery.message.chat.id;
    const action = callbackQuery.data;

    if (action === 'start') {
        bot.sendMessage(chatId, "Hey, what's up?");
    } else if (action === 'exit') {
        bot.sendMessage(chatId, "Sorry to see you going. Bye for now.");
    }
});
