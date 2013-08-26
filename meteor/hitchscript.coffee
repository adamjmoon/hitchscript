if Meteor.isClient
  addClass = (element, className) ->
    element.className += ((if element.className then " " else "")) + className  if (element = $(element)) and not hasClass(element, className)
    element
  Template.scripts.rendered = ->
    root = "https://raw.github.com/adamjmoon/itchcork/master/"
    main = document.createElement("script")
    main.type = "text/javascript"
    main.src = "https://raw.github.com/adamjmoon/itchcork/master/itchcork.min.js"
    s = document.getElementsByTagName("script")[0]
    s.parentNode.insertBefore main, s
	console.log	'hi'
	
  Template.nanojar.rendered = ->
    n = document.getElementById("nanojarWrap")
    n.innerHTML = "<applet code=nano archive=" + "/nano.jar" + ">"

  Template.ga.rendered = ->
    unless window._gaq?
      window._gaq = []
      _gaq.push ["_setAccount", "UA-40741651-1"]
      _gaq.push ["_trackPageview"]
      (->
        ga = undefined
        gajs = undefined
        s = undefined
        ga = document.createElement("script")
        ga.type = "text/javascript"
        ga.async = true
        gajs = ".google-analytics.com/ga.js"
        ga.src = (if "https:" is document.location.protocol then "https://ssl" + gajs else "http://www" + gajs)
        s = document.getElementsByTagName("script")[0]
        s.parentNode.insertBefore ga, s
      )()
if Meteor.isServer
  Meteor.startup ->
