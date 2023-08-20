const fsPromise = require('fs').promises;
const { trace } = require('console');
const path = require('path');

const fsOperation = async() =>{
   try {
        const data = await fsPromise.readFile(path.join(__dirname,'files','stater.txt'),'utf8');
        console.log(data);

        await fsPromise.writeFile(path.join(__dirname,'files','promiseWrite.txt'),'Hello Nice to meet you.');
        await fsPromise.appendFile(path.join(__dirname,'files','promiseWrite.txt'),'\nSame here');
        await fsPromise.rename(path.join(__dirname,'files','promiseWrite.txt'),path.join(__dirname,'files','newPromiseWrite.txt'));
        const newdata = await fsPromise.readFile(path.join(__dirname,'files','newPromiseWrite.txt'),'utf8');
        console.log(newdata);
   } catch (error) {
        console.log(error);
   }
}

fsOperation();