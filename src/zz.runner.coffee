require ["https://ajax.aspnetcdn.com/ajax/knockout/knockout-2.2.1.js", "https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.4.4/underscore-min.js"], (ko) ->
  window.ko = ko
  require ["SuiteView"], (sv) ->
    window.suiteView = new sv()
    requirejs.config
      baseUrl: "https://"
      paths:
        bootstrap: "netdna.bootstrapcdn.com/twitter-bootstrap/2.3.1/js/bootstrap.min"
        coffeescript: suiteView.vendorRoot() + "coffee/coffeescript.min"
        js2coffee: suiteView.vendorRoot() + "coffee/js2coffee"
        lodash: suiteView.vendorRoot() + "aa.lodash.min"
        mocha: suiteView.vendorRoot() + "mocha"
        sinon: suiteView.vendorRoot() + "sinon"
        chai: suiteView.vendorRoot() + "chai"
        "sinon-chai": suiteView.vendorRoot() + "sinon-chai"
        platform: suiteView.vendorRoot() + "platform"
        benchmark: suiteView.vendorRoot() + "benchmark"

    require ["bootstrap", "sinon"], ->
      window.sinon = sinon
      $("#topNav").show()
      $("div.frame").show()
      require ["coffeescript", "platform", "benchmark"], (CoffeeScript) ->
        @CoffeeScript = CoffeeScript
        require ["js2coffee", "itchcork"], ->
          postResults = (stats, callback) ->
            $.post "/stats",
              stats: stats
            , ->
              callback()  if callback


          postCoverage = ->
            "use strict"
            if window.__coverage__
              coverage = JSON.stringify(window.__coverage__.valueOf())
              $.post "/coverage",
                coverage: coverage


          runItchCork = ->
            "use strict"
            $.get "/benchmarkList", (benchmarks) ->
              require benchmarks, ->



          
          #window.suiteView.bindView();
          runMocha = ->
            chai.use sinonChai
            window.assert = chai.assert
            window.should = chai.should()
            require ["chai", "sinon-chai", "mocha"], (chai, sinonChai, mocha) ->
              if window.location.search
                array = window.location.search.split("?")
                spec = array[1]
                run [spec]
              else
                $.get "/specs", (specs) ->
                  run specs

              run = (specs) ->
                if window.mochaPhantomJS
                  mochaPhantomJS.run()
                else
                  mocha.checkLeaks()
                  mocha.globals ["jQuery"]
                  mocha.run()
                  mocha.setup "bdd"
                  mocha.reporter "html"
                  require specs, ->
                    runner = mocha.run()
                    runner.on "end", ->
                      window.suiteView.totalTests runner.total
                      window.suiteView.totalPassed runner.total - runner.failures
                      window.suiteView.totalFailed runner.failures
                      _.each runner.suite.suites, (s) ->
                        require [s.title], (c) ->


                      
                      # var suite = new window.ItchCork.Suite(s.title, c, "mocha");
                      suites = $("ul#mocha-report li.suite ul")
                      $("#collapse").click ->
                        $(suites).each (index, element) ->
                          element.hidden = true

                        $("#collapse").hide()
                        $("#expand").show()

                      $("#expand").click ->
                        $(suites).each (index, element) ->
                          element.hidden = false

                        $("#expand").hide()
                        $("#collapse").show()

                      postResults runner.stats, ->

                      window.suiteView.bindView()




          view = window.location.pathname
          if view.indexOf("coverage") > -1
            window.suiteView.currentView "Coverage"
            require ["mocha", "/coverage/app.js"], ->
              "use strict"
              window.suiteView.unitTestFrameworkManager.set "both"
              runItchCork()
              runMocha()
              postCoverage()

          else if view.indexOf("benchmarks") > -1
            window.suiteView.currentView "Benchmarks"
            window.suiteView.unitTestFrameworkManager.set "itchcork"
            require ["/js/app.js"], ->
              "use strict"
              runItchCork()

          else
            window.suiteView.currentView "UnitTests"
            window.suiteView.unitTestFrameworkManager.set "mocha"
            require ["mocha", "/js/app.js"], ->
              window.mocha = mocha
              runMocha()






