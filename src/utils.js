var fs = require('fs');
const readline = require('readline');

function randomInt(min,max){
  return Math.round(Math.random() * (max-min)+ min)
}

function saveArrayToTxtLineByLine(arrFinal,pathOutput){
  return new Promise(function(resolve,reject){
      let fileToSave = deleteRepeatedValuesOnArray(arrFinal)

      fs.writeFile(pathOutput, fileToSave.join("\n"), function(err){
          if(err){
              reject(err)
          }
          
          resolve(`File saved with ${fileToSave.length} items`)
      })
  })
}

function saveToJson(arrFinal,pathOutput){
  return new Promise(function(resolve,reject){
      fileToSave = deleteRepeatedValuesOnArray(arrFinal)
      
      fs.writeFile(pathOutput, JSON.stringify(fileToSave),function(err){
          if(err){
              reject(err)
          }
          resolve(`File saved with ${fileToSave.length} items`)
      })
  })
}

function deleteRepeatedValuesOnArray(array){
  cleanArray = array.filter(function(item, pos) {
      return array.indexOf(item) == pos;
  })
  return cleanArray
}

function readDataset(fileName){
  return new Promise(function(resolve,reject){
    let dataset = []

    let rl = readline.createInterface({
        input: fs.createReadStream('./dataset/'+fileName)
    });
    
    rl.on('line', function(line) {
        dataset.push(line)
    });
    
    rl.on('close', function(line) {
        resolve(dataset)
    });
})

}

function createComments(sentences,words){
    let newSentences=[];
    sentences.forEach(element => {
        const alea=randomInt(0,words.length-1);
        let newSentence=element.replace('$a',words[alea].replace('o/a','a'));
        newSentence=newSentence.replace('$o',words[alea].replace('o/a','o'));
        newSentences.push(newSentence);
    });
    saveArrayToTxtLineByLine(newSentences,'./dataset/generated.txt');
    //saveToJson(newSentences,'./dataset/generated.json');
}
async function generateComments(){

    let sentences=await this.readDataset('localSentences.txt');
    let words=await this.readDataset('localWords.txt');
    createComments(sentences,words);
  
}
module.exports = {randomInt,saveArrayToTxtLineByLine,saveToJson,readDataset,generateComments}