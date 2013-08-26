require(['datetime', 'ItchCork'], function (c, ic) {
    var suite = new ic.Suite('DateTime tests', c);
    suite.shouldEqual(1)
         .compareBenchmarks();
});
