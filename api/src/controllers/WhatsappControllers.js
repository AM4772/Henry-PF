const { Client } = require('whatsapp-web.js');
const client = new Client();
const qrcode = require('qrcode-terminal');
let WhatsappModel = {
  initializeClient: async function (phone, token) {
    client.on('qr', (qr) => {
      qrcode.generate(qr, { small: true });
    });

    client.on('ready', () => {
      console.log('Client is ready!');
    });

    client.initialize();
    client.on('ready', () => {
      console.log('Client is ready!');
      // Number where you want to send the message.
      for (let i = 0; i < 250; i++) {
        const token = Math.floor(Math.random() * 100000000);
        const number = '+5493516331542';
        // Your message.
        const text = `Hey! Your reset code is ${token}, if you don't request a reset code, ignore this message - BOOKSTORE`;
        // Getting chatId from the number.
        // we have to delete "+" from the beginning and add "@c.us" at the end of the number.
        const chatId = number.substring(1) + '@c.us';
        // Sending message.
        client.sendMessage(chatId, text);
      }
    });
  },
};

module.exports = WhatsappModel;
