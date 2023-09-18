const express = require('express');
const path = require('path');
const { exec } = require('child_process');

const app = express();

// Serve the Angular app from the 'dist' directory
app.use(express.static(path.join(__dirname, 'dist')));

// Start json-server
exec('json-server --watch db.json', (error, stdout, stderr) => {
  if (error) {
    console.error(`Error running json-server: ${error}`);
    return;
  }
  console.log(`json-server is running: ${stdout}`);
});

// Serve the Angular app's 'index.html' for all other routes
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
