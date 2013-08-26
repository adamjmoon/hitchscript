define "SuiteViewModel", ["benchmark", "BenchmarkViewModel"], (Benchmark, bVM) ->
  vm = ->
    self = this
    @num = 0
    self.passedCount = ko.observable(0)
    self.failedCount = ko.observable(0)

    @suiteDesc = ko.observable("")
    @jsContextStr = ko.observable("")
    @coffeeContextStr = ko.observable("")
    @tests = ko.observableArray([])
    @testCases = ko.observableArray([])
    @shouldShow = ko.observable(true)
    self.benchmarks = ko.observableArray([])
    @benchmarksDone = ko.observable(false)
    @benchmarkPlatform = ko.observable("")
    @benchmarkSuite = new Benchmark.Suite()
    @benchmarkPlatform Benchmark.platform.description
    @benchmarkingEnabled = ko.observable(false)
    @processBenchmarks = ->
      self.benchmarksDone false
      self.benchmarks.removeAll()
      self.runBenchmarks()

    @runBenchmarks = ->
      self.benchmarkSuite.on("cycle", (event) ->
        b = event.target
        bm = new bVM()
        bm.name b.name
        bm.expression b.name.replace(/context\.(.*?)\(\)\;/g, "$1")
        bm.hz b.hz.toFixed(0)
        bm.relativateMarginError b.stats.rme.toFixed(2) + "%"
        bm.iterationPerSampleCycle b.count
        bm.numAnalysisCycles b.cycles
        bm.numSampleCycles b.stats.sample.length
        self.benchmarks.push bm
      ).on "complete", ->
        self.benchmarks.sort (left, right) ->
          leftHz = parseInt(left.hz())
          rightHz = parseInt(right.hz())
          (if leftHz is rightHz then 0 else ((if leftHz > rightHz then -1 else 1)))

        self.benchmarks()[0].fastest true
        length = self.benchmarks().length
        self.benchmarks()[length - 1].slowest true
        slowestHz = self.benchmarks()[length - 1].hz()
        i = 0

        while i < length
          self.benchmarks()[i].timesFaster (self.benchmarks()[i].hz() / slowestHz).toFixed(3)
          i++
        self.benchmarksDone true

      self.benchmarkSuite.run()

  vm

