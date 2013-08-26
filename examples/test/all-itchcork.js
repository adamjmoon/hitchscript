require(['objectcreate', 'ItchCork'], function (c, ic) {
      var suite = new ic.Suite('Classical inheritance with Object.create vs CROCKFORD Object.Create', c);
      
      suite.it(function(c) {return c.rectangle instanceof c.Rectangle;}).shouldBe(true)
           .it(function(c) {return c.rectangle instanceof c.Shape;}).shouldBe(true)
           .it(function(c) {return c.rectangle2 instanceof c.Rectangle2;}).shouldBe(true)
           .it(function(c) {return c.rectangle2 instanceof c.Rectangle;}).shouldBe(false)
           .it(function(c) {return c.rectangle2 instanceof c.Shape;}).shouldBe(true)
           .it(function(c) {return c.cube instanceof c.Cube;}).shouldBe(true)
           .it(function(c) {return c.cube instanceof c.Shape;}).shouldBe(true)
           .it(function(c) {return typeof c.Rectangle;}).shouldBe('function')
           .it(function(c) {return typeof c.Rectangle2;}).shouldBe('function')
           .it(function(c) {return c.rectangle.x;}).shouldBe(1)
           .it(function(c) {return c.rectangle.y;}).shouldBe(1)
           .it(function(c) {return c.rectangle2.x;}).shouldBe(1)
           .it(function(c) {return c.rectangle2.y;}).shouldBe(1)
           .it(function(c) {return c.shape.x;}).shouldBe(1)
           .it(function(c) {return c.shape.y;}).shouldBe(1)
           .it(function(c) {return typeof c.rectangle;}).shouldBe('object')
           .it(function(c) {return c.rectangle.move(1);}).shouldBe('Shape moved.')
           .it(function(c) {return c.rectangle2.move(1);}).shouldBe('Shape moved.')
           .it(function(c) {return c.cube.move(1,1);}).shouldBe('Cube grew in 3 dimensions.')
           .it(function(c) {c.cube.move(1,1); return c.cube.x;}).shouldBe(2)
           .it(function(c) {c.cube.move(1,1); return c.cube.y;}).shouldBe(2)
           .it(function(c) {c.cube.move(1,1); return c.cube.z;}).shouldBe(2)
           .it(function(c) {return c.cube.move(1);}).shouldBe('Cube grew in 3 dimensions.')
           .it(function(c) {return c.shape.x;}).shouldBe(1)
           .it(function(c) {return c.shape.y;}).shouldBe(1)

 });

require(['primitivetypes', 'ItchCork'], function (c, ic) {
    var suite = new ic.Suite('Javascript Primitive Values and Types', c);
    suite.add("number", function (c) {
            return typeof c.numberPrimitiveValue;
        })
        .add("function", function (c) {
            return typeof Number;
        })
        .add("string", function (c) {
            return typeof c.stringPrimitiveValue;
        })
        .add("function", function (c) {
            return typeof String;
        })
        .add("boolean", function (c) {
            return typeof c.booleanPrimitiveValue;
        })
        .add("number", function (c) {
            return typeof c.numberPrimitiveValue;
        })
        .add("string", function (c) {
            return typeof c.stringPrimitiveValue;
        })
        .add("boolean", function (c) {
            return typeof c.booleanPrimitiveValue;
        })
        .add("object", function (c) {
            return typeof c.nullPrimitiveValue;
        })
        .add("undefined", function (c) {
            return typeof c.undefinedPrimitiveValue;
        })
        .add("undefined", function (c) {
            return typeof c.notDefined;
        })
        .benchmark();
});

require(['array','ItchCork'], function (c, ic) {
   var suite = new ic.Suite('Fastest method of convert array-like to actual arrays', c);
   suite.shouldEqual(1)
        .compareBenchmarks();

});

require(['datetime', 'ItchCork'], function (c, ic) {
    var suite = new ic.Suite('DateTime tests', c);
    suite.shouldEqual(1)
         .compareBenchmarks();
});

require(['inheritance', 'ItchCork'], function (c, ic) {
      var suite = new ic.Suite('Prototypal JS Inheritance', c);
      
      suite
      .it(function(c) {return c.someAnimal.toString();}).shouldBe('[Mammal "Mr. Biggles"]')
      .it(function(c) {return c.someAnimal instanceof c.Mammal;}).shouldBe(true)
      .it(function(c) {return c.myPet.toString();}).shouldBe('[Cat "Felix"]')
      .it(function(c) {return c.myPet instanceof c.Mammal;}).shouldBe(true)
      .it(function(c) {return c.myPet instanceof c.Cat;}).shouldBe(true)
      .it(function(c) {c.myPet.haveABaby(); return c.myPet.offspring[0].toString();}).shouldBe('[Cat "Baby Felix"]')

 });

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
