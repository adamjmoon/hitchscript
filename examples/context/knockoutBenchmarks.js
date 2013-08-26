define('knockoutBenchmarks', function () {
    'use strict';
    function context() {
        var self = this;
        self.KOData = ko.observable("");
        self.KOUpdates1 = ko.observable(0);
        self.KOUpdates2 = ko.observable(0);
        
        self.KOData.subscribe(function () {
            self.KOUpdates1(self.KOUpdates1() + 1);
        });
        self.KOData.subscribe(function () {
            self.KOUpdates2(self.KOUpdates2() + 1);
        });
        
        var KOviewmodel = {data: self.KOData, updates1: self.KOUpdates1, updates2: self.KOUpdates2};

        self.KOclear = function () {
            self.KOData("");
        };
        self.KOpush = function () {

            self.KOData(self.KOData() + "o");
        };
    }

    return context;
});
