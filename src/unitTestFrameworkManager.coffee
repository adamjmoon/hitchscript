define "UnitTestFrameworkManager", [], ->
  UnitTestFrameworkManager = ->
    UnitTestFrameworkManager::init = ->
      @set "itchcork"  unless amplify.store("currentUnitTestFramework")
      @getFramework()

    UnitTestFrameworkManager::set = (framework) ->
      amplify.store "currentUnitTestFramework", framework  unless framework is amplify.store("currentUnitTestFramework")

    UnitTestFrameworkManager::getFramework = ->
      amplify.store "currentUnitTestFramework"

