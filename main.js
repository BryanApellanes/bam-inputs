var main = (function(){
    var cliArgs = require('@bamapps/bam-cli-args');
        
    
    return {

        run: function(scriptArgs){
            console.log(cliArgs.scriptInfo());
        }
    }
})()

if(typeof require !== 'undefined' && require.main === module){
    main.run(process.argv.slice(2));
}

module.exports = main;