define "itchcork", ["Suite", "Test", "Spy", "Verify"], (Suite, Test, Spy, Verify) ->
  "use strict"
  itchcork = ->
    itchcork::Suite = Suite
    itchcork::Test = Test
    itchcork::Spy = Spy
    itchcork::Verify = Verify

  window.ItchCork = new itchcork()
  window.ItchCork

