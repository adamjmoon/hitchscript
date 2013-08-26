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
