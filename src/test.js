define("Test", [], function () {

    var test = function (shouldEqual, func, ctx, testName, describe) {
        'use strict';
        var expressionStr = func.toString().trim(), self = this;
        this.context = ctx;
        this.passed = false;
        this.describe = describe;
        if (testName) {
            this.expression = testName + '()';
            this.actual = func(this.context, testName);

        } else {
            this.expression = expressionStr.replace(/\n/gm, '')
                .replace(/function +?\(c\) +?\{+?return(.*?)\;+?\}/g, '$1')
                .replace(/function +?\(c\) +?\{ +?return(.*?)\; +?\}/g, '$1');


            this.actual = func(this.context);
        }
        this.shouldEqual = shouldEqual;

        this.typeOf = typeof(this.actual);

        this.run = function () {
            self.passed = self.shouldEqual === self.actual;
            return self.passed;
        };
    };

    return test;
});