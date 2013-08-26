define "SuiteView", ["UnitTestFrameworkManager"], (utfm) ->
  view = ->
    self = this
    self.unitTestFrameworkManager = new utfm()
    self.unitTestFrameworkManager.init()
    self.menu = document.getElementById("menu")
    self.view = document.getElementById("view")
    self.suites = new ko.observableArray([])
    self.totalTests = new ko.observable(0)
    self.totalPassed = new ko.observable(0)
    self.totalFailed = new ko.observable(0)
    self.githubAccount = new ko.observable("adamjmoon")
    self.githubRepo = new ko.observable("itchcork")
    self.githubBranch = new ko.observable("master")
    self.contextRoot = new ko.observable("raw.github.com/" + self.githubAccount() + "/" + self.githubRepo() + "/" + self.githubBranch() + "/")
    self.vendorRoot = new ko.observable(self.contextRoot() + "vendor/")
    self.currentTheme = ko.observable(amplify.store("currentTheme"))
    self.currentView = ko.observable("")
    customTheme = amplify.store("customTheme")
    self.cto = {}
    for prop of customTheme
      self.cto[prop] = ko.observable(customTheme[prop])
    for prop of self.cto
      self.cto[prop].subscribe new Function("newValue", "window.ThemeManager.updateCustom('" + prop + "',newValue);")
    self.reset = ->
      "use strict"
      self.suites []
      self.totalTests 0
      self.totalPassed 0
      self.totalFailed 0

    self.setMenuHeight = ->
      if self.view.scrollHeight > window.innerHeight
        self.menu.style.height = self.view.scrollHeight - 45 + "px"  if self.view.scrollHeight > self.menu.scrollHeight
      else
        self.menu.style.height = window.innerHeight - 45 + "px"

    self.add = (suite) ->
      suite.vm.num = self.suites().length + 1
      self.suites.push suite.vm
      self.bindView()  if self.suites().length is 1 and self.unitTestFrameworkManager.getFramework() is "itchcork"
      suite.vm.benchmarksDone.subscribe (newValue) ->
        self.setMenuHeight()


    self.incrementPassedCount = ->
      self.totalTests self.totalTests() + 1
      self.totalPassed self.totalPassed() + 1

    self.incrementFailedCount = ->
      self.totalTests self.totalTests() + 1
      self.totalFailed self.totalFailed() + 1

    self.bindView = ->
      ko.applyBindings self, document.getElementById("frame")
      self.setMenuHeight()
      require [self.vendorRoot() + "jscolor"], ->
        jscolor.init()

      self.setupNiceScroll()

    self.setTheme = (theme) ->
      window.ThemeManager.set theme
      self.currentTheme theme

    self.toggleMenu = ->
      menu = document.getElementById("menu")
      unless menu.style.display is "none"
        menu.style.display = "none"
      else
        menu.style.display = "block"

    self.setupNiceScroll = ->
      window.scrollTo 0, 0
      $("html").niceScroll()
      $("#view").niceScroll()
      self.view.onresize = ->
        self.nice.resize()

    self.scrollToSelector = (selector) ->
      window.scrollTo 0, $(selector).position().top

    self.collapseAll = ->
      if $("#rightCorkCollapse").hasClass("expandAll")
        $("div.collapsed").click()
        $("#rightCorkCollapse").removeClass("expandAll").addClass "collapseAll"
      else
        $("div.in").siblings().children(".collapseToggle").click()
        $("#rightCorkCollapse").removeClass("collapseAll").addClass "expandAll"
  view

