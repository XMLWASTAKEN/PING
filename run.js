const express = require("express");
const { config } = require('dotenv');

config();

const app = express();
const PORT = process.env.PORT || 2000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Bot Status</title>
      </head>
      <body style="text-align: center; padding: 20px;">
        <h1>ON</h1>
      </body>
    </html>
  `);
});

import('node-fetch').then(({ default: fetch }) => {
  const urls = [    
'https://everlasting-erenity-xml.glitch.me',
'https://everlasting-erenity-forex.glitch.me',
'https://everlasting-erenity-daryl.glitch.me',
'https://everlasting-erenity-sawyer.glitch.me',    
'https://siki-originals.glitch.me',   
  ];

  async function ping(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        return { success: false, message: `Error for ${url}: ${response.status} - ${response.statusText}` };
      }
      return { success: true, message: `Ping successful for ${url}` };
    } catch (error) {
      return { success: false, message: `Error for ${url}: ${error.message}` };
    }
  }

  async function performPing() {
    const pingPromises = urls.map(ping);

    try {
      const results = await Promise.all(pingPromises);

      const successMessages = results.filter((result) => result.success).map((result) => result.message);
      const errorMessages = results.filter((result) => !result.success).map((result) => result.message);

      console.log("Ping summary:");
      if (successMessages.length > 0) {
        console.log("Success:");
        console.log(successMessages.join('\n'));
      }
      if (errorMessages.length > 0) {
        console.error("Errors:");
        console.error(errorMessages.join('\n'));
      }
    } catch (error) {
      console.error("Error in Promise.all:", error);
    }
  }

  (async function pingLoop() {
    while (true) {
      await performPing();
      await new Promise(resolve => setTimeout(resolve, 60000));
    }
  })();

}).catch(error => {
  console.error('Error importing node-fetch:', error);
});
