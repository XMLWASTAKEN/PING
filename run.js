const express = require("express");
const app = express();
const PORT = process.env.PORT || 2000;

app.listen(PORT, () => {
  console.log(`Script is running !`);
});

app.get('/', (req, res) => {
  res.send(`<body>
  <center><h1>Script is running !</h1></center
  </body>`);
});

import('node-fetch').then(({ default: fetch }) => {
  const urls = [    
'https://everlasting-xml.glitch.me',
'https://everlasting-forex.glitch.me',
'https://everlasting-daryl.glitch.me',
'https://everlasting-sawyer.glitch.me',
'https://everlasting-dynexi.glitch.me',    
'https://elevenpm-disorder1.glitch.me',
'https://elevenpm-disorder2.glitch.me',    
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
