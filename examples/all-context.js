define('arrayMocha',function() {
  var context = function context() {
    var self = this;
    this.arr = [1, 2, 3];
    this.fun = function fun(){
        self.arr = _.map(self.arr, function(num){ return num * 3; });
    }
  };
  return context;
});

define('objectcreate',function() {
  'use strict';
   function context() {
      //CROCKFORD OBJECT.CREATE
      Object.create2 = function (o) {
          function F() {}
          F.prototype = o;
          return new F();
      };
      function Shape() {
          this.x = 1;
          this.y = 1;          
      };       
      Shape.prototype.move = function move(x, y) {
          this.x += x;
          this.y += y;
          return "Shape moved.";
      };
      function Rectangle(){
          return Shape.call(this);
      };
      function Rectangle2(){
          return Shape.call(this);
      }
      function Cube(x,y,z){
          this.x=x;
          this.y=y; 
          this.z=z; 
      };
      Rectangle.prototype = Object.create(Shape.prototype);
      Rectangle2.prototype = Object.create2(Shape.prototype);
      Cube.prototype = Object.create2(Shape.prototype);
               
      Cube.prototype.move = function move(z) {
          this.x += z;
          this.y += z;
          this.z += z;
          return "Cube grew in 3 dimensions.";
      };
      this.Shape = Shape;
      this.Rectangle = Rectangle;
      this.Rectangle2 = Rectangle2;
      this.Cube = Cube;
      this.shape = new Shape();
      this.rectangle = new Rectangle();
      this.rectangle2 = new Rectangle2();
      this.cube = new Cube(1,1,1);
  }
  
  return context;
});

define('primitivetypes',function() {
  'use strict';
   function context() {
     this.numberPrimitiveValue = 1;
     this.stringPrimitiveValue = "string";
     this.booleanPrimitiveValue = true;
     this.nullPrimitiveValue = null;
     this.undefinedPrimiteValue;
  }
  return context;
});

define('array',function() {
  'use strict';
   function context() {
   var my_array = [0,1,2,3,4,5,6,7,8,9];


   //private method
   function myMethod(){
        return my_array.length;
    };

   //privileged method
   this.slow = function() {
       var s=0;
        for(var i = 0; i < my_array.length; i++){};
        for(var i = 0; i < myMethod(); i++){};
        s=s+1;
        return s;
      };

   //privileged method
   this.fast = function() {
    var f=0;
    var length = my_array.length;
    for(var i = 0; i < length; i++){};
        var length = myMethod();
    for(var i = 0; i < length; i++){};
        f=f+1;
    return f;
   };
  }
  return context;
});

define('datetime',function() {
     'use strict';
     function context() {
         this.currentDateTime1 =
         function() {
             var time = new Date().getTime();
             var date = new Date(time);
             return date.toString('MM/dd/yyyy');
         };

         this.currentDateTime2 =
         function() {
             return new Date().toString('MM/dd/yyyy');
         };
         this.dateFromMilliseconds = function(){
             return new Date(Date(('/Date(1366831535554)/').replace(/\/Date\((.*?)\)\//gi, "$1")).toString()).toLocaleString();
         };

         this.currentDateMillesondsFrom_Midnight_JUNE_1_1970 =
         function() {
             return new Date().getTime().toString();
         };
     }
    return context;
});

define("inheritance", function () {
    function context() {

        function Mammal(name) {
            this.name = name;
            this.offspring = [];
        }

        Mammal.prototype.haveABaby=function(){
        	var newBaby=new this.constructor("Baby "+this.name);
        	this.offspring.push(newBaby);
        	return newBaby;
        };

        Mammal.prototype.toString = function () {
            return '[Mammal "' + this.name + '"]';
        };


        Cat.prototype = new Mammal();        // Here's where the inheritance occurs
        Cat.prototype.constructor = Cat;       // Otherwise instances of Cat would have a constructor of Mammal
        function Cat(name) {
            this.name = name;
        }

        Cat.prototype.toString = function () {
            return '[Cat "' + this.name + '"]';
        }


        this.Cat = Cat;
        this.Mammal = Mammal;
        this.someAnimal = new Mammal('Mr. Biggles');
        this.myPet = new Cat('Felix');
    }

    return context;
});

define('inheritanceHelper',function(){
  function context(){
    Function.prototype.inheritsFrom = function( parentClassOrObject ){ 
          if ( parentClassOrObject.constructor == Function )
            {
                //Normal Inheritance
                this.prototype = new parentClassOrObject;
                this.prototype.constructor = this;
                this.prototype.parent = parentClassOrObject.prototype;
            }
            else
            {
                //Pure Virtual Inheritance
                this.prototype = parentClassOrObject;
                this.prototype.constructor = this;
                this.prototype.parent = parentClassOrObject;
            }
            return this;
        };

      var LivingThing = {
          beBorn : function(){
              this.alive = true;
          }
      };

      function Mammal(name){
          this.name=name;
          this.offspring=[];
      }
      Mammal.inheritsFrom( LivingThing );
      Mammal.prototype.haveABaby=function(){
          this.parent.beBorn.call(this);
          var newBaby = new this.constructor( "Baby " + this.name );
          this.offspring.push(newBaby);
          return newBaby;
      }

      function Cat( name ){
          this.name=name;
      }
      Cat.inheritsFrom( Mammal );
      Cat.prototype.haveABaby=function(){
          var theKitten = this.parent.haveABaby.call(this);
          return theKitten;
      }
      Cat.prototype.toString=function(){
          return '[Cat "'+this.name+'"]';
      }

    this.LivingThing = LivingThing;
    this.mammalInstance = new Mammal("Bill");
    this.Mammal = Mammal;
    this.Cat = Cat;
    this.felix = new Cat( "Felix" );
    this.kitten = this.felix.haveABaby();
  }
  
 return context;
});

define('knockoutBenchmarks', function () {
    'use strict';
    function context() {
        var self = this;
        self.KOData = ko.observable("");
        self.KOUpdates1 = ko.observable(0);
        self.KOUpdates2 = ko.observable(0);
        
        self.KOData.subscribe(function () {
            self.KOUpdates1(self.KOUpdates1() + 1);
        });
        self.KOData.subscribe(function () {
            self.KOUpdates2(self.KOUpdates2() + 1);
        });
        
        var KOviewmodel = {data: self.KOData, updates1: self.KOUpdates1, updates2: self.KOUpdates2};

        self.KOclear = function () {
            self.KOData("");
        };
        self.KOpush = function () {

            self.KOData(self.KOData() + "o");
        };
    }

    return context;
});
