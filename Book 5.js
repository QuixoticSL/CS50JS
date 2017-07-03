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

//Having multiple iterators running at the same time
function* foo() {
    var x = yield 2;
    z++;
    var y = yield(x * z);
    console.log(x, y, z);
}

var z = 1;

var it1 = foo();
var it2 = foo();

var val1 = it1.next().value; // 2 <-- yield 2
var val2 = it2.next().value; // 2 <-- yield 2

val1 = it1.next(val2 * 10).value; // 40  <-- x:20,  z:2
val2 = it2.next(val1 * 5).value; // 600 <-- x:200, z:3

it1.next(val2 / 2); // y:300
// 20 300 3
it2.next(val1 / 4); // y:10
// 200 10 3


//YIELDing a PROMISE and wiring that PROMISE to control
//the GENERATOR'S ITERATOR

var it = main();

var p = it.next().value;

// wait for the `p` promise to resolve
p.then(
    function(text) {
        it.next(text);
    },
    function(err) {
        it.throw(err);
    }
);

function foo(x, y) {
    return request(
        "http://some.url.1/?x=" + x + "&y=" + y
    );
}

function* main() {
    try {
        var text = yield foo(11, 31);
        console.log(text);
    } catch (err) {
        console.error(err);
    }
}

//PROMISE AWARE GENERATOR RUNNER
function run(gen) {
    var args = [].slice.call(arguments, 1),
        it;

    // initialize the generator in the current context
    it = gen.apply(this, args);

    // return a promise for the generator completing
    return Promise.resolve()
        .then(function handleNext(value) {
            // run to the next yielded value
            var next = it.next(value);

            return (function handleResult(next) {
                // generator has completed running?
                if (next.done) {
                    return next.value;
                }
                // otherwise keep going
                else {
                    return Promise.resolve(next.value)
                        .then(
                            // resume the async loop on
                            // success, sending the resolved
                            // value back into the generator
                            handleNext,

                            // if `value` is a rejected
                            // promise, propagate error back
                            // into the generator for its own
                            // error handling
                            function handleErr(err) {
                                return Promise.resolve(
                                        it.throw(err)
                                    )
                                    .then(handleResult);
                            }
                        );
                }
            })(next);
        });
}

// note: normal function, not generator
function bar(url1, url2) {
    return Promise.all([
        request(url1),
        request(url2)
    ]);
}

function* foo() {
    // hide the Promise-based concurrency details
    // inside `bar(..)`
    var results = yield bar(
        "http://some.url.1",
        "http://some.url.2"
    );

    var r1 = results[0];
    var r2 = results[1];

    var r3 = yield request(
        "http://some.url.3/?v=" + r1 + "," + r2
    );

    console.log(r3);
}

// use previously defined `run(..)` utility
run(foo);

//Initializing a new Web Worker
var w1 = new Worker("http://some.url.1/mycoolworker.js");

//Using Benchmark.js for a quick performance test
function foo() {
    // operation(s) to test
}

var bench = new Benchmark(
    "foo test", // test name
    foo, // function to test (just contents)
    {
        // ..				// optional extra options (see docs)
    }
);

bench.hz; // number of operations per second
bench.stats.moe; // margin of error
bench.stats.variance; // variance across samples
// ..

//Showcasing a flaw with benchmark.js
// Case 1
var x = [];
for (var i = 0; i < 10; i++) {
    x[i] = "x";
}

// Case 2
var x = [];
for (var i = 0; i < 10; i++) {
    x[x.length] = "x";
}

// Case 3
var x = [];
for (var i = 0; i < 10; i++) {
    x.push("x");
}