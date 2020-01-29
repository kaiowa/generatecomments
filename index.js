var fs = require('fs');

var datetime = require('node-datetime');
const Utils=require('./src/utils');
(async () => {
  console.log('Init generate comments');
  Utils.generateComments();
})();