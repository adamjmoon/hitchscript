require(['array','ItchCork'], function (c, ic) {
   var suite = new ic.Suite('Fastest method of convert array-like to actual arrays', c);
   suite.shouldEqual(1)
        .compareBenchmarks();

});
