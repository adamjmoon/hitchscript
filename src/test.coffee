define "Test", [], ->
  test = (shouldEqual, func, ctx, testName, describe) ->
    "use strict"
    expressionStr = func.toString().trim()
    self = this
    @context = ctx
    @passed = false
    @describe = describe
    if testName
      @expression = testName + "()"
      @actual = func(@context, testName)
    else
      @expression = expressionStr.replace(/\n/g, "").replace(/function +?\(c\) +?\{+?return(.*?)\;+?\}/g, "$1").replace(/function +?\(c\) +?\{ +?return(.*?)\; +?\}/g, "$1")
      @actual = func(@context)
    @shouldEqual = shouldEqual
    @typeOf = typeof (@actual)
    @run = ->
      self.passed = self.shouldEqual is self.actual
      self.passed

  test

