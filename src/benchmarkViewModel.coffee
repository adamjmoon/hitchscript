define "BenchmarkViewModel", [], ->
  vm = ->
    @name = ko.observable("")
    @expression = ko.observable("")
    @hz = ko.observable(0)
    @relativateMarginError = ko.observable("")
    @timesFaster = ko.observable("pending...")
    @slowest = ko.observable(false)
    @fastest = ko.observable(false)
    @iterationPerSampleCycle = ko.observable(0)
    @numAnalysisCycles = ko.observable(0)
    @numSampleCycles = ko.observable(0)

  vm

