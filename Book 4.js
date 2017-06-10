// TYPES AND SUBTYPES (YDKJS BOOK 4)

//CH1
typeof null === "object"; //true
//This is a bit buggy when using typeof

//To test for a null value you need to do the following.
var a = null;

(!a && typeof a === "object"); //This is considered true by the engine.

//FUNCTION is considered a subtype of OBJECT
typeof function a(){ /* .. */ } === "function"; // true

//The same goes for ARRAYS
typeof [1,2,3] === "object"; // true

//When trying to find the typeof of a variable we check the value
var a = 42;
typeof a; // "number"

// an IIFE ("Immediately Invoked Function Expressions")
--------------------------------------------------------------------------

//We need to be careful when declaring empty arrays.
var a = [ ];

a[0] = 1;
// no `a[1]` slot set here
a[2] = [ 3 ];

a[1];		// undefined

a.length;	// 3

//When adding string values to arrays you don't contribute to the lenght
var a = [ ];

a[0] = 1;
a["foobar"] = 2;

a.length;		// 1
a["foobar"];	// 2
a.foobar;		// 2

// Very large or very small numbers get outputted in exponent form
var a = 5E10;
a;					// 50000000000
a.toExponential();	// "5e+10"

var b = a * a;
b;					// 2.5e+21

var c = 1 / a;
c;					// 2e-11

//Whats created can be different than contructed.
var a = new String( "abc" );

typeof a; // "object" ... not "String"

a instanceof String; // true

Object.prototype.toString.call( a ); // "[object String]"

//"type casting" (or "type conversion")
//occur in statically typed languages at compile time, while "type coercion" is a runtime conversion for dynamically typed languages.

//If you intend to JSON stringify an object that may contain illegal JSON value(s), or if you just have values in the object
//that aren't appropriate for the serialization, you should define a toJSON() method for it that returns a JSON-safe version of the object.

var o = { };

var a = {
	b: 42,
	c: o,
	d: function(){}
};

// create a circular reference inside `a`
o.e = a;

// would throw an error on the circular reference
// JSON.stringify( a );

// define a custom JSON value serialization
a.toJSON = function() {
	// only include the `b` property for serialization
	return { b: this.b };
};

JSON.stringify( a ); // "{"b":42}"
