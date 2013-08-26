define("SuiteViewModel", ['benchmark', 'BenchmarkViewModel'], function (Benchmark, bVM) {
    var vm = function () {
        var self = this;
        this.num = 0;
        self.passedCount = ko.observable(0), self.failedCount = ko.observable(0);
        this.suiteDesc = ko.observable('');
        this.jsContextStr = ko.observable('');
        this.coffeeContextStr = ko.observable('');
        this.tests = ko.observableArray([]);
        this.testCases = ko.observableArray([]);
        this.shouldShow = ko.observable(true);
        self.benchmarks = ko.observableArray([]);
        this.benchmarksDone = ko.observable(false);
        this.benchmarkPlatform = ko.observable('');
        this.benchmarkSuite = new Benchmark.Suite();
        this.benchmarkPlatform(Benchmark.platform.description);
        this.benchmarkingEnabled = ko.observable(false);

        this.processBenchmarks = function () {
            self.benchmarksDone(false);
            self.benchmarks.removeAll();
            self.runBenchmarks();
        }

        this.runBenchmarks = function () {
            self.benchmarkSuite.on('cycle', function (event) {
                var b = event.target;

                var bm = new bVM();
                bm.name(b.name);
                bm.expression(b.name.replace(/context\.(.*?)\(\)\;/gi, '$1'));
                bm.hz(b.hz.toFixed(0));
                bm.relativateMarginError(b.stats.rme.toFixed(2) + '%');
                bm.iterationPerSampleCycle(b.count);
                bm.numAnalysisCycles(b.cycles);
                bm.numSampleCycles(b.stats.sample.length);

                self.benchmarks.push(bm);
            })
                .on('complete', function () {

                    self.benchmarks.sort(function (left, right) {
                        var leftHz = parseInt(left.hz());
                        var rightHz = parseInt(right.hz());
                        return leftHz == rightHz ? 0 : (leftHz > rightHz ? -1 : 1)
                    });
                    self.benchmarks()[0].fastest(true);
                    var length = self.benchmarks().length;
                    self.benchmarks()[length - 1].slowest(true);
                    var slowestHz = self.benchmarks()[length - 1].hz();
                    for (var i = 0; i < length; i++) {
                        self.benchmarks()[i].timesFaster((self.benchmarks()[i].hz() / slowestHz).toFixed(3));
                    }
                    self.benchmarksDone(true);
                });


            self.benchmarkSuite.run();
        };


    };

    return vm;
});