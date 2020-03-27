const deepEquality = function (obj1, obj2) {
    if(typeof obj1 == "object" && typeof obj2 == "object" && obj1 && obj2){
        return(JSON.stringify(obj1) === JSON.stringify(obj2))
    }else{
        return ("enter a valid data");
    }
}

const uniqueElements = function (arr) {
    if (Array.isArray(arr)) {
            return arr.filter((item, index) => arr.indexOf(item) == index).length;
        } else {
            return ("enter a valid data");
        }
    }

const countOfEachCharacterInString = function (str) {
    if (typeof str == "string" && str != "" && str != " ") {
         return [...new Set(str)].sort().map(x => { return { [x]: (str.split(x).length - 1) } });
    } else {
        return ("enter a valid data");
    }
}

module.exports = {
    deepEquality,
    uniqueElements,
    countOfEachCharacterInString
}