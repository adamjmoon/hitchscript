define "Suite", ["Test", "benchmark", "SuiteViewModel"], (Test, Benchmark, sVM) ->
  suite = (desc, jsFunc, framework) ->
    "use strict"
    self = this
    self.vm
    self.jsContext

    self.themeManager = window.ThemeManager
    self.framework = "itchcork"
    self.framework = framework  if framework
    self.highlight = (code) ->
      if self.framework is "itchcork"
        code.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/('.*?')/g, "<span class=\"string\">$1</span>").replace(/\bnew *(\w+)/g, "<span class=\"keyword\">new</span> <span class=\"init\">$1</span>").replace /(function|new|throw|return|var|if|else|prototype|Object|Array|Boolean|-&gt;|@|::|this)/g, "<span class=\"keyword\">$1</span>"
      else
        code

    self.setupContextBreakdown = (context, name) ->
      console.log context
      jsStr = ""
      coffeeStr = ""
      for prop of context
        if context[prop] instanceof Function
          jsStr = context[prop].toString()
          try
            coffeeStr = Js2coffee.build(jsStr)
            tc =
              name: name + "." + prop
              jsStr: self.highlight(jsStr)
              coffeeStr: self.highlight(coffeeStr)

            self.vm.testCases.push tc
          catch err
            tc =
              name: name + "." + prop
              jsStr: self.highlight(jsStr)
              coffeeStr: ""

            self.vm.testCases.push tc
        else if context[prop] instanceof Object
          tc =
            name: name + prop
            jsStr: (if Object.toSource then context[prop].toSource() else "is instanceof Object")
            coffeeStr: ""

          self.vm.testCases.push tc
        self.setupContextBreakdown context[prop]::, name + "." + prop + ".prototype"  if context[prop] and context[prop]:: and prop isnt "constructor"

    self.map = ->
      self.vm = new sVM()
      self.vm.suiteDesc desc
      self.vm.jsContextStr jsFunc.toString()
      self.vm.coffeeContextStr self.highlight(Js2coffee.build(self.vm.jsContextStr()))
      self.vm.jsContextStr self.highlight(self.vm.jsContextStr())
      self.jsContext = new jsFunc()
      self.setupContextBreakdown self.jsContext, jsFunc.name

    self.map desc
    self.add = (shouldEqual, func) ->
      self.addTestWithBenchmarks shouldEqual, func, null, false  if typeof func is "function"
      self

    self.currentTest
    self.it = (describe, func, shouldBe) ->
      self.currentTest = self.addTestWithBenchmarks(shouldBe, func, describe, null, true)
      self

    self.shouldBe = shouldBe = (val) ->
      self.currentTest.shouldEqual = val
      self.processTest self.currentTest
      self

    self.processTest = (test) ->
      if test.run()
        self.vm.passedCount self.vm.passedCount() + 1
        window.suiteView.incrementPassedCount()  if window.suiteView
      else
        self.vm.failedCount self.vm.failedCount() + 1
        window.suiteView.incrementFailedCount()  if window.suiteView
      self.vm.tests.push test

    self.addTestWithBenchmarks = (shouldEqual, testFunc, describe, name, defer) ->
      test = new Test(shouldEqual, testFunc, new jsFunc(), name, describe)
      self.processTest test  unless defer
      if name
        fn = ((context, name) ->
          ->
            context[name]()
        )(self.jsContext, name)
        self.vm.benchmarkSuite.add
          name: test.expression
          fn: fn
          async: true
          queued: true
          minSamples: 100

      else
        self.vm.benchmarkSuite.add test.expression, (->
          testFunc test.context
        ),
          async: true
          queued: true
          minSamples: 100

      test

    self.shouldEqual = (shouldEqual) ->
      self.shouldEqualValue = shouldEqual
      self

    self.compareBenchmarks = ->
      func = (c, tc) ->
        c[tc]()

      for testcase of self.jsContext
        console.log typeof self.jsContext[testcase]
        self.addTestWithBenchmarks self.shouldEqualValue, func, testcase, false  if typeof self.jsContext[testcase] is "function"
      self.benchmark()
      self

    self.benchmark = ->
      self.vm.benchmarkingEnabled true
      self.vm.processBenchmarks()

    window.suiteView.add self  if window.suiteView
  suite

