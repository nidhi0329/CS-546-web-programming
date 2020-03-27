const lab21 = require("./geometry")
const lab22 = require("./utilities")
const first={a: 2,b: 3};
const second={a: 2,b: 4};
const third={a: 2,b: 3};
const testArr=["a","a","b","a","b","c"]
const test="Hello, the pie is in the oven"

try{
console.log(lab21.volumeOfRectangularPrism(1, 2.1, -7));
}catch(e){
    throw Error;
}

try{
console.log(lab21.surfaceAreaOfRectangularPrism(-1, -2, 7));
}catch(e){
    throw Error;
}

try{
console.log(lab21.volumeOfSphere(27));
}catch(e){
    throw Error;
}

try{
console.log(lab21.surfaceAreaOfSphere(9));
}catch(e){
    throw Error;
}

try{
console.log(lab22.deepEquality(first,second));
console.log(lab22.deepEquality(first,third));
}catch(e){
    throw Error;
}

try{
console.log(lab22.uniqueElements(testArr));
}catch(e){
    throw Error;
}
 
try{
const charMap = console.log(lab22.countOfEachCharacterInString(test));
}catch(e){
    throw Error;
}

