// A new utility for checking strict equality of two value
// but without the nuanced exceptions that === has for NaN and -0 values.
if (!Object.is) {
    Object.is = function(v1, v2) {
        // test for `-0`
        if (v1 === 0 && v2 === 0) {
            return 1 / v1 === 1 / v2;
        }
        // test for `NaN`
        if (v1 !== v1) {
            return v2 !== v2;
        }
        // everything else
        return v1 === v2;
    };
}


//Using LET.
var a = 2;

{
    let a = 3;
    console.log(a); // 3
}

console.log(a); // 2


//Example of the SPREAD/REST operator
var a = [2, 3, 4];
var b = [1, ...a, 5];

console.log(b);


//Setting a default value for a function parameter
function foo(x, y) {
    x = x || 11;
    y = y || 31;

    console.log(x + y);
}

foo(); // 42
foo(5, 6); // 11
foo(5); // 36
foo(null, 6); // 17


//Assignmet of default values to missing arguments
function foo(x = 11, y = 31) {
    console.log(x + y);
}

foo(); // 42
foo(5, 6); // 11
foo(0, 42); // 42

foo(5); // 36
foo(5, undefined); // 36 <-- `undefined` is missing
foo(5, null); // 5  <-- null coerces to `0`

foo(undefined, 6); // 17 <-- `undefined` is missing
foo(null, 6); // 6  <-- null coerces to `0`


//Sample of destructing or structured assignment
function foo() {
    return [1, 2, 3];
}

var tmp = foo(),
    a = tmp[0],
    b = tmp[1],
    c = tmp[2];

console.log(a, b, c); // 1 2 3


//Eliminating the need for the temporary variable.
var [a, b, c] = foo();
var { x: x, y: y, z: z } = bar();

console.log(a, b, c); // 1 2 3
console.log(x, y, z); // 4 5 6


//Declaring object literals
var x = 2,
    y = 3,
    o = {
        x,
        y
    };


//Giving values in objects the value of function ES6 style
var o = {
    x() {
        // ..
    },
    y() {
        // ..
    }
}


//Templates in ES6
var name = "Kyle";

var greeting = `Hello ${name}!`;

console.log(greeting); // "Hello Kyle!"
console.log(typeof greeting); // "string"


//Interpolated expressions
function upper(s) {
    return s.toUpperCase();
}

var who = "reader";

var text =
    `A very ${upper( "warm" )} welcome
to all of you ${upper( `${who}s` )}!`;

console.log( text );
// A very WARM welcome
// to all of you READERS!


//Accessing .raw strings
function showraw(strings, ...values) {
	console.log( strings );
	console.log( strings.raw );
}

showraw`Hello\nWorld`;
// [ "Hello
// World" ]
// [ "Hello\nWorld" ]

console.log( `Hello\nWorld` );
// Hello
// World

console.log( String.raw`Hello\nWorld` );
// Hello\nWorld

String.raw`Hello\nWorld`.length;
// 12


//Comparing normal functions to arrow functions
function foo(x,y) {
	return x + y;
}

// versus

var foo = (x,y) => x + y;


//More versions of arrow functions
var f1 = () => 12;
var f2 = x => x * 2;
var f3 = (x,y) => {
	var z = x * 2 + y;
	y++;
	x *= 3;
	return (x + y + z) / 2;
};