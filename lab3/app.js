const bluebird = require("bluebird");
const Promise = bluebird.Promise;
const fs = Promise.promisifyAll(require("fs"));
const textMetrics = require('./textMetrics'); 
const fileData = require('./fileData'); 

async function main() {
    try {
    const file_name = [{
        result_path: './chapter1.result.json',
        file_path: './chapter1.txt'
    }, {
        result_path: './chapter2.result.json',
        file_path: './chapter2.txt'
    }, {
        result_path: './chapter3.result.json',
        file_path: './chapter3.txt'
    }];
    
        //chapter 1
        if (fs.existsSync(file_name[0].result_path)) {
            let result = await fileData.getFileAsJSON(file_name[0].result_path);
            console.log("chapter 1");
            console.log(result);

        } else {
            let result = await fileData.getFileAsString(file_name[0].file_path);
            const textMatrix = await textMetrics.createMetrics(result);
            const save_file = await fileData.saveStringToFile(file_name[0].result_path, JSON.stringify(textMatrix))
            console.log("chapter 1");
            console.log(textMatrix);
        }

        // chapter 2
        if (fs.existsSync(file_name[1].result_path)) {
            let result = await fileData.getFileAsJSON(file_name[1].result_path);
            console.log("chapter 2");
            console.log(result);

        } else {
            let result = await fileData.getFileAsString(file_name[1].file_path);
            const textMatrix = await textMetrics.createMetrics(result);
            const save_file = await fileData.saveStringToFile(file_name[1].result_path, JSON.stringify(textMatrix))
            console.log("chapter 2");
            console.log(textMatrix);
        }

        //chapter 3
        if (fs.existsSync(file_name[2].result_path)) {
            let result = await fileData.getFileAsJSON(file_name[2].result_path);
            console.log("chapter 3");
            console.log(result);

        } else {
            let result = await fileData.getFileAsString(file_name[2].file_path);
            const textMatrix = await textMetrics.createMetrics(result);
            const save_file = await fileData.saveStringToFile(file_name[2].result_path, JSON.stringify(textMatrix))
            console.log("chapter 3");
            console.log(textMatrix);
        }

        const tt = await textMetrics.createMetrics("Helllo, my -! This is a great day to say helllo.\n\n\tHelllo! 2 3 4 23");
        console.log(tt);

    } catch (err) {
        let result = await err;
        console.log( "give proper path",result);
    }
}

main()