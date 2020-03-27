const bluebird = require("bluebird");
const Promise = bluebird.Promise;
const fs = bluebird.promisifyAll(require("fs"));

async function getFileAsString(path) {
        if (!path) throw "You must provide a path";
        const text = await fs.readFileAsync(path , "utf-8");
        return text;
}

async function getFileAsJSON(path) {
        if (!path) throw "You must provide a path";
        const stats = await fs.readFileAsync(path);
        return JSON.parse(stats);
}

async function saveStringToFile(path, text) {
        if (!path) throw "You must provide a path";
        await fs.writeFileAsync(path, text);
        return true;
}

async function saveJSONToFile(path, obj) {
        if (!path) throw "You must provide a path";
        if(typeof obj == "object"){
        return await fs.writeFileAsync(path, JSON.stringify(obj));
        }
        else{
            throw "text is not proper";
        }
}
module.exports = {
    getFileAsString: getFileAsString, 
    getFileAsJSON : getFileAsJSON,
    saveStringToFile : saveStringToFile,
    saveJSONToFile : saveJSONToFile
};