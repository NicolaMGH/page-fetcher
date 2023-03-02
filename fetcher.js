//http://www.example.edu/ ./index.html
const url = process.argv.slice(2)[0];
const saveFile = process.argv.slice(3)[0];

const fs = require('fs');

const request = require('request');
request(url, (error, response, body) => {
  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  //console.log('body:', body); // Print the HTML
  fs.writeFile(saveFile, body, err => {
    if (err) {
      console.error(err);
    }
    fs.stat(saveFile, (err, stats) => {
      let fileSize = stats.size
      console.log(`Downloaded and saved ${fileSize} bytes to ${saveFile}`);
    });
    //console.log(`Downloaded and saved ${fileSize} bytes to ${saveFile}`);
  });
});