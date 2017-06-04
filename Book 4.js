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
