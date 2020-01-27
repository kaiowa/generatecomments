var fs = require('fs');
var datetime = require('node-datetime');

function readDataset(dtType){
  let fileName;
  if(dtType==='sentence'){
    filename='localSentences.txt';
  }
  if(dtType==='word'){
    filename='localWords.txt';
  }
  
}
module.exports = {readDataset}