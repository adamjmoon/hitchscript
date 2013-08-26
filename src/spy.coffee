define "Spy", [], ->
  "use strict"
  (F) ->
    G = ->
      args = Array::slice.call(arguments_)
      G.calls.push args
      F.apply this, args
    G:: = F::
    G.calls = []
    G

