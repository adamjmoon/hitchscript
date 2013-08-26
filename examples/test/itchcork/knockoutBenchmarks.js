require(['knockoutBenchmarks', 'ItchCork'], function (c, ic) {
    var suite = new ic.Suite('Knockout JS Benchmarks', c);
    suite
        .it(function (c) {
            c.KOclear();
            for (var i = 0; i < 10; i++) { 
                c.KOpush();
            }
            return c.KOData().length;
        })
        .shouldBe(10)
        .it(function (c) {
            c.KOclear();
            for (var i = 0; i < 100; i++) {
                c.KOpush();
            }
            return c.KOData().length;
        })
        .shouldBe(100)
        .it(function (c) {
            c.KOclear();
            for (var i = 0; i < 500; i++) {
                c.KOpush();
            }
            return c.KOUpdates1();
        })
        .shouldBe(500)
        .it(function (c) {
            c.KOclear();
            for (var i = 0; i < 1000; i++) {
                c.KOpush();
            }
            return c.KOUpdates2();
        })
        .shouldBe(1000)
        .benchmark();
});
