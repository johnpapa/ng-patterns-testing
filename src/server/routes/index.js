var dataDir = '/../data/';
var jsonfileservice = require('../utils/jsonfileservice');
var router = require('express').Router();

module.exports = router;

router.get('/maa', getMaa);
router.get('/maaCast', getMaaCast);

////////////

function getMaa(req, res, next) {
    var json = jsonfileservice.getDataFromJsonFile(dataDir + 'maa.json');
    var maa = json[0].data.results;
    maa.forEach(function(character) {
        var pos = character.name.indexOf('(MAA)');
        character.name = character.name.substr(0, pos - 1);
    });
    res.json(maa);
}

function getMaaCast(req, res, next) {
    var cast = jsonfileservice.getDataFromJsonFile(dataDir + 'maa-cast.json');
    res.json(cast);
}
