define "Verify", [], ->
  (F) ->
    "use strict"
    ->
      args = Array::slice.call(arguments_)
      i = undefined
      j = undefined
      call = undefined
      count = 0
      matched = undefined
      i = 0
      while i < F.calls.length
        call = F.calls[i]
        matched = true
        j = 0
        while j < args.length
          if args[j] isnt call[j]
            matched = false
            break
          j += 1
        count += 1  if matched
        i += 1
      count > 0

