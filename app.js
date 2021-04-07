const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

const PORT = Number(process.env.PORT) || 9900;

app.listen(
  PORT,
  () => console.log(`TORRENTS-TEST-CLIENT is running on port ${PORT}`),
);
