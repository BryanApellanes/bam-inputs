var { expect } = require("chai"),
    bamInputs = require('../../inputs'),
    _ = require('underscore');
const { bamCliArgsFromActionInputs } = require("../../inputs");

describe("bam inputs", function () {
    it("should parse args", function(){
        var cliArgs = bamInputs.toBamCliArgs({ test: 'test', file: 'file'});
        expect(cliArgs).to.equal('/test:test /file:file');
    })

    it("should parse bam cli args", function(){
        var parsed = bamInputs.fromBamCliArgs("/test:test /file:file");
        expect(JSON.stringify(parsed)).to.equal(JSON.stringify({test:'test', file:'file'}));
    })

    it("should get BamArgs from env a single environment variable", function(){
        var testObj = {test: null, value1: null, value2: null};
        var expected = {test: "test value", value1: "value1 value", value2: "value2 value"};
        process.env.test = 'test value';
        process.env.value1 = 'value1 value';
        process.env.value2 = 'value2 value';
        var bamEnvVars = bamInputs.bamCliArgsFromEnv(testObj);
        expect(JSON.stringify(bamEnvVars)).to.equal(JSON.stringify(expected));
    })

    it("should read action core inputs", function(){
        var actionInputs = {
            value1: "value one",
            value2: "value two"
        }
        bamInputs.inject({
            actionsCore: {
                getInput: function(name){
                    return actionInputs[name];
                }
            }
        })
        var bamArgsFromActionInputs = bamInputs.bamArgsFromActionInputs({value1: null, value2: null});
        expect(JSON.stringify(bamArgsFromActionInputs)).to.equal(JSON.stringify(actionInputs));

        var bamCliArgsFromActionInputs = bamInputs.bamCliArgsFromActionInputs({ value1: null, value2: null });
        expect(bamCliArgsFromActionInputs).to.equal('/value1:"value one" /value2:"value two"');
    })

    it("should use defaults if no action inputs", function () {
        var actionInputs = {
            value1: null,
            value2: ""
        }
        bamInputs.inject({
            actionsCore: {
                getInput: function (name) {
                    return actionInputs[name];
                }
            }
        })
        var defaultValues = { value1: "provided default", value2: "provided default 2" };
        var bamArgsFromActionInputs = bamInputs.bamArgsFromActionInputs(defaultValues);

        expect(JSON.stringify(bamArgsFromActionInputs)).to.equal(JSON.stringify(defaultValues));
    })
});
