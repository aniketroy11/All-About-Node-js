// how Nodejs differs from vanilla js
// 1. Node runs on a server - not in a browser
// 2. The console is the terminal window

console.log('hello aniket')


// 3. global object instead of window object
// 4. commonJs modules instead of modules

const os = require('os')
const path = require('path')
// const math = require('./math');
const {add,sub,mul,divide} = require('./math')

// console.log(math.add(5,10))
console.log(add(1,5))
console.log(sub(1,5))
console.log(mul(1,5))

// console.log(os.type())
// console.log(os.version())
// console.log(os.homedir())

// console.log(__dirname)
// console.log(__filename)

// console.log(path.dirname(__filename))
// console.log(path.basename(__filename))
// console.log(path.extname(__filename))

// console.log(path.parse(__filename))