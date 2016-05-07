var Promise = require("bluebird"),
    colors = require('colors'),
    fs = Promise.promisifyAll(require('fs-extra'));
var root = __dirname.replace(/dfy\\lib/,'dfy\\');
function generateStructure(project,dirname){
    return fs.copyAsync(root + 'structure', project,{clobber: true})
        .then(function(err){
            if (err) return console.error(err);
            console.log('\n\r [INFO]'.green + ' ' +'Dir:'+dirname);
            console.log('\n\r Done!');
        })
}
module.exports = generateStructure;