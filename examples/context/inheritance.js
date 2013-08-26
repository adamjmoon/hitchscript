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
