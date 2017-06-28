// ajax(..) is some arbitrary Ajax function given by a library
var data = ajax("http://some.url.1");

console.log(data);
// Oops! `data` generally won't have the Ajax results


//Example of a simple callback function
// ajax(..) is some arbitrary Ajax function given by a library
ajax("http://some.url.1", function myCallbackFunction(data) {

    console.log(data); // Yay, I gots me some `data`!

});


//Example of running code NOW and running code LATER
function now() {
    return 21;
}

function later() {
    answer = answer * 2;
    console.log("Meaning of life:", answer);
}

var answer = now();

setTimeout(later, 1000); // Meaning of life: 42


//Example of CONSOLE running in the background
var a = {
    index: 1
};

// later
console.log(a); // ??

// even later
a.index++;


//Example of event loop
// `eventLoop` is an array that acts as a queue (first-in, first-out)
var eventLoop = [];
var event;

// keep going "forever"
while (true) {
    // perform a "tick"
    if (eventLoop.length > 0) {
        // get the next event in the queue
        event = eventLoop.shift();

        // now, execute the next event
        try {
            event();
        } catch (err) {
            reportError(err);
        }
    }
}

function later() {
    answer = answer * 2;
    console.log("Meaning of life:", answer);
}

//an Ajax response handler that needs to run through a long list of results to transform the values
var res = [];

// `response(..)` receives array of results from the Ajax call
function response(data) {
    // add onto existing `res` array
    res = res.concat(
        // make a new transformed array with all `data` values doubled
        data.map(function(val) {
            return val * 2;
        })
    );
}

// ajax(..) is some arbitrary Ajax function given by a library
ajax("http://some.url.1", response);
ajax("http://some.url.2", response);

// swap `x` and `y` (via temp variable `z`)
z = x;
x = y;
y = z;

var x, y = 2;

console.log(x + y); // NaN  <-- because `x` isn't set yet

foo(x) {
    // start doing something that could take a while
}

foo(42)

on(foo "completion") {
    // now we can do the next step!
}

on(foo "error") {
    // oops, something went wrong in `foo(..)`
}

function foo(x) {
    // start doing something that could take a while

    // make a `listener` event notification
    // capability to return

    return listener;
}

var evt = foo(42);

evt.on("completion", function() {
    // now we can do the next step!
});

evt.on("failure", function(err) {
    // oops, something went wrong in `foo(..)`
});

//DUCK TYPING
if (
    p !== null &&
    (
        typeof p === "object" ||
        typeof p === "function"
    ) &&
    typeof p.then === "function"
) {
    // assume it's a thenable!
} else {
    // not a thenable
}

//A promise getting rejected.
var p = new Promise(function(resolve, reject) {
    foo.bar(); // `foo` is not defined, so error!
    resolve(42); // never gets here :(
});

p.then(
    function fulfilled() {
        // never gets here :(
    },
    function rejected(err) {
        // `err` will be a `TypeError` exception object
        // from the `foo.bar()` line.
    }
);


//Example of Promis.resolve
var p1 = new Promise(function(resolve, reject) {
    resolve(42);
});

var p2 = Promise.resolve(42);


//Example of CHAIN FLOW with PROMISES
var p = Promise.resolve(21);

var p2 = p.then(function(v) {
    console.log(v); // 21

    // fulfill `p2` with value `42`
    return v * 2;
});

// chain off `p2`
p2.then(function(v) {
    console.log(v); // 42
});


// polyfill-safe guard check
if (!Promise.first) {
    Promise.first = function(prs) {
        return new Promise(function(resolve, reject) {
            // loop through all promises
            prs.forEach(function(pr) {
                // normalize the value
                Promise.resolve(pr)
                    // whichever one fulfills first wins, and
                    // gets to resolve the main promise
                    .then(resolve);
            });
        });
    };
}

//Example of MAP(..)
if (!Promise.map) {
    Promise.map = function(vals, cb) {
        // new promise that waits for all mapped promises
        return Promise.all(
            // note: regular array `map(..)`, turns
            // the array of values into an array of
            // promises
            vals.map(function(val) {
                // replace `val` with a new promise that
                // resolves after `val` is async mapped
                return new Promise(function(resolve) {
                    cb(val, resolve);
                });
            })
        );
    };
}

//Examples of how THEN and CATCH work with PROMISES
p.then(fulfilled);

p.then(fulfilled, rejected);

p.catch(rejected); // or `p.then( null, rejected )`