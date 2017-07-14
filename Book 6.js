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


function foo(x, y) {
    x = x || 11;
    y = y || 31;

    console.log(x + y);
}

foo(); // 42
foo(5, 6); // 11
foo(5); // 36
foo(null, 6); // 17