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

//Iterator syntax
/* Iterator [required]
    next() {method}: retrieves next IteratorResult
*/


//Sample of a iterator function
var arr = [1,2,3];

var it = arr[Symbol.iterator]();

it.next();		// { value: 1, done: false }
it.next();		// { value: 2, done: false }
it.next();		// { value: 3, done: false }

it.next();		// { value: undefined, done: true }


//Primitive string values are also iterables by default
var greeting = "hello world";

var it = greeting[Symbol.iterator]();

it.next();		// { value: "h", done: false }
it.next();		// { value: "e", done: false }
...


//How iterators with generators work.
function *foo(x) {
	if (x < 3) {
		x = yield *foo( x + 1 );
	}
	return x * 2;
}

var it = foo( 1 );
it.next();				// { value: 24, done: true }


//Creating a buffer
var buf = new ArrayBuffer( 32 );
buf.byteLength;
//and layering a typedarray on top of the buffer
var arr = new Uint16Array( buf );
arr.length;							// 16


//How to test endian
var littleEndian = (function() {
	var buffer = new ArrayBuffer( 2 );
	new DataView( buffer ).setInt16( 0, 256, true );
	return new Int16Array( buffer )[0] === 256;
})();


//MAP syntax
var m = new Map();

var x = { id: 1 },
	y = { id: 2 };

m.set( x, "foo" );
m.set( y, "bar" );

m.get( x );						// "foo"
m.get( y );


//Syntax for WeakMaps
var m = new WeakMap();

var x = { id: 1 },
	y = { id: 2 };

m.set( x, "foo" );

m.has( x );						// true
m.has( y );						// false


//Syntax for SETS
var s = new Set();

var x = { id: 1 },
	y = { id: 2 };

s.add( x );
s.add( y );
s.add( x );

s.size;							// 2

s.delete( y );
s.size;							// 1

s.clear();
s.size;							// 0


//Iterator methods are the same for SETS as for MAPS
var s = new Set();

var x = { id: 1 },
	y = { id: 2 };

s.add( x ).add( y );

var keys = [ ...s.keys() ],
	vals = [ ...s.values() ],
	entries = [ ...s.entries() ];

keys[0] === x;
keys[1] === y;

vals[0] === x;
vals[1] === y;

entries[0][0] === x;
entries[0][1] === x;
entries[1][0] === y;
entries[1][1] === y;


//Array.of(..) examples
var a = Array( 3 );
a.length;						// 3
a[0];							// undefined

var b = Array.of( 3 );
b.length;						// 1
b[0];							// 3

var c = Array.of( 1, 2, 3 );
c.length;						// 3
c;								// [1,2,3]


//Array#copywithin syntax
[1,2,3,4,5].copyWithin( 3, 0 );			// [1,2,3,1,2]

[1,2,3,4,5].copyWithin( 3, 0, 1 );		// [1,2,3,1,5]

[1,2,3,4,5].copyWithin( 0, -2 );		// [4,5,3,4,5]

[1,2,3,4,5].copyWithin( 0, -2, -1 );	// [4,2,3,4,5]