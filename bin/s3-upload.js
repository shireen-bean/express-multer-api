'use strict';

const fs = require('fs');
const uploader = require('../lib/aws-s3-upload.js')

let filename = process.argv[2] || '';

const readFile = (filename) => {
  return new Promise ((resolve, reject)=>{

    fs.readFile(filename, (error, data)=>{
      if (error) {
        reject(error);
      }

      resolve(data);
    });
  });

};




readFile(filename)
.then(uploader.prepareFile)
.then(uploader.awsUpload)
.then(console.log)
.catch(console.error);



//
// readFile(filename)
// .then((data)=> {
//   let file = mimeType(data);
//   file.data = data;
//   return file;
// }).then(awsUpload)
// .then(console.log)
// .catch(console.error);
