const { exec } = require('child_process');

// Run json-server using the correct command
exec('json-server --watch db.json', (error, stdout, stderr) => {
  if (error) {
    console.error(`Error running json-server: ${error}`);
    return;
  }
  console.log(`json-server is running: ${stdout}`);
});
