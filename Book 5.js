// ajax(..) is some arbitrary Ajax function given by a library
var data = ajax( "http://some.url.1" );

console.log( data );
// Oops! `data` generally won't have the Ajax results


//Example of a simple callback function
// ajax(..) is some arbitrary Ajax function given by a library
ajax( "http://some.url.1", function myCallbackFunction(data){

	console.log( data ); // Yay, I gots me some `data`!

} );


//Example of running code NOW and running code LATER
function now() {
	return 21;
}

function later() {
	answer = answer * 2;
	console.log( "Meaning of life:", answer );
}

var answer = now();

setTimeout( later, 1000 ); // Meaning of life: 42


//Example of CONSOLE running in the background
var a = {
	index: 1
};

// later
console.log( a ); // ??

// even later
a.index++;


//Example of event loop
// `eventLoop` is an array that acts as a queue (first-in, first-out)
var eventLoop = [ ];
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
		}
		catch (err) {
			reportError(err);
		}
	}
}
