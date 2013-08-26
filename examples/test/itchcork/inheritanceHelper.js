require(['inheritanceHelper', 'ItchCork'], function (c, ic) {
    var suite = new ic.Suite('Prototypal JS Inheritance with Helper InheritFrom Method', c);

    suite
        .it(function (c) {
            return c.felix.toString();
        }).shouldBe('[Cat "Felix"]')
        .it(function (c) {
            return c.kitten.toString();
        }).shouldBe('[Cat "Baby Felix"]')
        .it(function (c) {
            return c.kitten instanceof c.Cat;
        }).shouldBe(true)
        .it(function (c) {
            return c.kitten instanceof c.Mammal;
        }).shouldBe(true)

        .it(function (c) {
            return c.mammalInstance instanceof c.Mammal;
        }).shouldBe(true)

        .it(function (c) {
            return c.mammalInstance.name;
        }).shouldBe("Bill")

});
