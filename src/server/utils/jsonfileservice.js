var fs = require('fs');

module.exports = {
    getDataFromJsonFile: getDataFromJsonFile
};

function getDataFromJsonFile(file) {
    var filepath = __dirname + file;
    var data = readJsonFileSync(filepath);
    return data;
}

function readJsonFileSync(filepath, encoding) {
    var file = fs.readFileSync(filepath, encoding || 'utf8');
    return JSON.parse(file);
}
