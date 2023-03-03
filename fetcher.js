//http://www.example.edu/ ./index.html
const url = process.argv.slice(2)[0];
const saveFile = process.argv.slice(3)[0];
const readline = require('readline');
const path = require('path');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const fs = require('fs');

const request = require('request');
request(url, (error, response, body) => {
  if (error == null) {
    //checks to see if this is a valid file path
    fs.access(path.dirname(saveFile), fs.R_OK, (err) => {
      if (err == null) {
        //if path is valid, continue
        fs.stat(saveFile , (err, stat) => {
          if (err == null) {
            //if file exists
            rl.question('File exists, would you like to overwrite it? Type Y to overwrite or any key to exit. ', (answer) => {
              if (answer.toLocaleLowerCase() === 'y') {
                fs.writeFile(saveFile, body, err => {
                  if (err) {
                    console.error(err);
                  }
                  fs.stat(saveFile, (err, stats) => {
                    let fileSize = stats.size
                    console.log(`Downloaded and saved ${fileSize} bytes to ${saveFile}`);
      
                    rl.close();
                  });
                });
              } else {
                //if you do not want to overwrite file
                rl.close();
              }
            });
          } else if (err.code === 'ENOENT') {
            // file does not exist
            fs.writeFile(saveFile, body, err => {
              if (err) {
                console.error(err);
              }
              fs.stat(saveFile, (err, stats) => {
                let fileSize = stats.size
                console.log(`Downloaded and saved ${fileSize} bytes to ${saveFile}`);
              });
              rl.close();
            });
          }
        });
      } else if (err.code === 'ENOENT') {
        //if path is not valid
        console.log(`${path.dirname(saveFile)} is not a valid file path`);

        rl.close();
      }
    });
  } else if (error.code === 'ENOTFOUND') {
    //if url is not valid
    console.log(`${url} is not a valid URL`);
    rl.close();
  }
});