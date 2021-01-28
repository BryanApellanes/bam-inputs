if (typeof require !== 'undefined' && require.main === module) {
    require('inputs').run(process.argv.slice(2));
} else {
    module.imports = require('inputs');
}
