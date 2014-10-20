/*!
 * jQuery JavaScript Library v1.11.1
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-05-01T17:42Z
 */

(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper window is present,
		// execute the factory and get jQuery
		// For environments that do not inherently posses a window with a document
		// (such as Node.js), expose a jQuery-making factory as module.exports
		// This accentuates the need for the creation of a real window
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Can't do this because several apps including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
// Support: Firefox 18+
//

var deletedIds = [];

var slice = deletedIds.slice;

var concat = deletedIds.concat;

var push = deletedIds.push;

var indexOf = deletedIds.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	version = "1.11.1",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {
		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1, IE<9
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {
	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	// (You can seed the arguments with an array of args, but this is
	// only used internally.)
	each: function( callback, args ) {
		return jQuery.each( this, callback, args );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map(this, function( elem, i ) {
			return callback.call( elem, i, elem );
		}));
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[j] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor(null);
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: deletedIds.sort,
	splice: deletedIds.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var src, copyIsArray, copy, name, options, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null ) {
			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray(src) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend({
	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type(obj) === "function";
	},

	isArray: Array.isArray || function( obj ) {
		return jQuery.type(obj) === "array";
	},

	isWindow: function( obj ) {
		/* jshint eqeqeq: false */
		return obj != null && obj == obj.window;
	},

	isNumeric: function( obj ) {
		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		return !jQuery.isArray( obj ) && obj - parseFloat( obj ) >= 0;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	isPlainObject: function( obj ) {
		var key;

		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if ( !obj || jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		try {
			// Not own constructor property must be Object
			if ( obj.constructor &&
				!hasOwn.call(obj, "constructor") &&
				!hasOwn.call(obj.constructor.prototype, "isPrototypeOf") ) {
				return false;
			}
		} catch ( e ) {
			// IE8,9 Will throw exceptions on certain host objects #9897
			return false;
		}

		// Support: IE<9
		// Handle iteration over inherited properties before own properties.
		if ( support.ownLast ) {
			for ( key in obj ) {
				return hasOwn.call( obj, key );
			}
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.
		for ( key in obj ) {}

		return key === undefined || hasOwn.call( obj, key );
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call(obj) ] || "object" :
			typeof obj;
	},

	// Evaluates a script in a global context
	// Workarounds based on findings by Jim Driscoll
	// http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
	globalEval: function( data ) {
		if ( data && jQuery.trim( data ) ) {
			// We use execScript on Internet Explorer
			// We use an anonymous function so that context is window
			// rather than jQuery in Firefox
			( window.execScript || function( data ) {
				window[ "eval" ].call( window, data );
			} )( data );
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	// args is for internal usage only
	each: function( obj, callback, args ) {
		var value,
			i = 0,
			length = obj.length,
			isArray = isArraylike( obj );

		if ( args ) {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			}

		// A special, fast, case for the most common use of each
		} else {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1, IE<9
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArraylike( Object(arr) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		var len;

		if ( arr ) {
			if ( indexOf ) {
				return indexOf.call( arr, elem, i );
			}

			len = arr.length;
			i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

			for ( ; i < len; i++ ) {
				// Skip accessing in sparse arrays
				if ( i in arr && arr[ i ] === elem ) {
					return i;
				}
			}
		}

		return -1;
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		while ( j < len ) {
			first[ i++ ] = second[ j++ ];
		}

		// Support: IE<9
		// Workaround casting of .length to NaN on otherwise arraylike objects (e.g., NodeLists)
		if ( len !== len ) {
			while ( second[j] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var value,
			i = 0,
			length = elems.length,
			isArray = isArraylike( elems ),
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArray ) {
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var args, proxy, tmp;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: function() {
		return +( new Date() );
	},

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
});

// Populate the class2type map
jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
});

function isArraylike( obj ) {
	var length = obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	if ( obj.nodeType === 1 && length ) {
		return true;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v1.10.19
 * http://sizzlejs.com/
 *
 * Copyright 2013 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-04-18
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + -(new Date()),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	strundefined = typeof undefined,
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf if we can't use a native one
	indexOf = arr.indexOf || function( elem ) {
		var i = 0,
			len = this.length;
		for ( ; i < len; i++ ) {
			if ( this[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",
	// http://www.w3.org/TR/css3-syntax/#characters
	characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Loosely modeled on CSS identifier characters
	// An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
	// Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = characterEncoding.replace( "w", "w#" ),

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + characterEncoding + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + characterEncoding + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + characterEncoding + ")" ),
		"CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
		"TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var match, elem, m, nodeType,
		// QSA vars
		i, groups, old, nid, newContext, newSelector;

	if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
		setDocument( context );
	}

	context = context || document;
	results = results || [];

	if ( !selector || typeof selector !== "string" ) {
		return results;
	}

	if ( (nodeType = context.nodeType) !== 1 && nodeType !== 9 ) {
		return [];
	}

	if ( documentIsHTML && !seed ) {

		// Shortcuts
		if ( (match = rquickExpr.exec( selector )) ) {
			// Speed-up: Sizzle("#ID")
			if ( (m = match[1]) ) {
				if ( nodeType === 9 ) {
					elem = context.getElementById( m );
					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document (jQuery #6963)
					if ( elem && elem.parentNode ) {
						// Handle the case where IE, Opera, and Webkit return items
						// by name instead of ID
						if ( elem.id === m ) {
							results.push( elem );
							return results;
						}
					} else {
						return results;
					}
				} else {
					// Context is not a document
					if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
						contains( context, elem ) && elem.id === m ) {
						results.push( elem );
						return results;
					}
				}

			// Speed-up: Sizzle("TAG")
			} else if ( match[2] ) {
				push.apply( results, context.getElementsByTagName( selector ) );
				return results;

			// Speed-up: Sizzle(".CLASS")
			} else if ( (m = match[3]) && support.getElementsByClassName && context.getElementsByClassName ) {
				push.apply( results, context.getElementsByClassName( m ) );
				return results;
			}
		}

		// QSA path
		if ( support.qsa && (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
			nid = old = expando;
			newContext = context;
			newSelector = nodeType === 9 && selector;

			// qSA works strangely on Element-rooted queries
			// We can work around this by specifying an extra ID on the root
			// and working up from there (Thanks to Andrew Dupont for the technique)
			// IE 8 doesn't work on object elements
			if ( nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
				groups = tokenize( selector );

				if ( (old = context.getAttribute("id")) ) {
					nid = old.replace( rescape, "\\$&" );
				} else {
					context.setAttribute( "id", nid );
				}
				nid = "[id='" + nid + "'] ";

				i = groups.length;
				while ( i-- ) {
					groups[i] = nid + toSelector( groups[i] );
				}
				newContext = rsibling.test( selector ) && testContext( context.parentNode ) || context;
				newSelector = groups.join(",");
			}

			if ( newSelector ) {
				try {
					push.apply( results,
						newContext.querySelectorAll( newSelector )
					);
					return results;
				} catch(qsaError) {
				} finally {
					if ( !old ) {
						context.removeAttribute("id");
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = attrs.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== strundefined && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare,
		doc = node ? node.ownerDocument || node : preferredDoc,
		parent = doc.defaultView;

	// If no document and documentElement is available, return
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Set our document
	document = doc;
	docElem = doc.documentElement;

	// Support tests
	documentIsHTML = !isXML( doc );

	// Support: IE>8
	// If iframe document is assigned to "document" variable and if iframe has been reloaded,
	// IE will throw "permission denied" error when accessing "document" variable, see jQuery #13936
	// IE6-8 do not support the defaultView property so parent will be undefined
	if ( parent && parent !== parent.top ) {
		// IE11 does not have attachEvent, so all must suffer
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", function() {
				setDocument();
			}, false );
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", function() {
				setDocument();
			});
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( doc.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Check if getElementsByClassName can be trusted
	support.getElementsByClassName = rnative.test( doc.getElementsByClassName ) && assert(function( div ) {
		div.innerHTML = "<div class='a'></div><div class='a i'></div>";

		// Support: Safari<4
		// Catch class over-caching
		div.firstChild.className = "i";
		// Support: Opera<10
		// Catch gEBCN failure to find non-leading classes
		return div.getElementsByClassName("i").length === 2;
	});

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !doc.getElementsByName || !doc.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== strundefined && documentIsHTML ) {
				var m = context.getElementById( id );
				// Check parentNode to catch when Blackberry 4.6 returns
				// nodes that are no longer in the document #6963
				return m && m.parentNode ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== strundefined && elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== strundefined ) {
				return context.getElementsByTagName( tag );
			}
		} :
		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== strundefined && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( doc.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			div.innerHTML = "<select msallowclip=''><option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowclip^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = doc.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully does not implement inclusive descendent
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === doc || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === doc || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === doc ? -1 :
				b === doc ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return doc;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch(e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== strundefined && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, outerCache, node, diff, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) {
										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {
							// Seek `elem` from a previously-cached index
							outerCache = parent[ expando ] || (parent[ expando ] = {});
							cache = outerCache[ type ] || [];
							nodeIndex = cache[0] === dirruns && cache[1];
							diff = cache[0] === dirruns && cache[2];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									outerCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						// Use previously-cached element index if available
						} else if ( useCache && (cache = (elem[ expando ] || (elem[ expando ] = {}))[ type ]) && cache[0] === dirruns ) {
							diff = cache[1];

						// xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)
						} else {
							// Use the same loop as above to seek `elem` from the start
							while ( (node = ++nodeIndex && node && node[ dir ] ||
								(diff = nodeIndex = 0) || start.pop()) ) {

								if ( ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) && ++diff ) {
									// Cache the index of each encountered element
									if ( useCache ) {
										(node[ expando ] || (node[ expando ] = {}))[ type ] = [ dirruns, diff ];
									}

									if ( node === elem ) {
										break;
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf.call( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});
						if ( (oldCache = outerCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							outerCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf.call( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf.call( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			return ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context !== document && context;
			}

			// Add elements passing elementMatchers directly to results
			// Keep `i` a string if there are no elements so `matchedCount` will be "00" below
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context, xml ) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// Apply set filters to unmatched elements
			matchedCount += i;
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is no seed and only one group
	if ( match.length === 1 ) {

		// Take a shortcut and set the context if the root selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome<14
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[":"] = jQuery.expr.pseudos;
jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = (/^<(\w+)\s*\/?>(?:<\/\1>|)$/);



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		});

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		});

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( jQuery.inArray( elem, qualifier ) >= 0 ) !== not;
	});
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		}));
};

jQuery.fn.extend({
	find: function( selector ) {
		var i,
			ret = [],
			self = this,
			len = self.length;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter(function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			}) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow(this, selector || [], false) );
	},
	not: function( selector ) {
		return this.pushStack( winnow(this, selector || [], true) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
});


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// Use the correct document accordingly with window argument (sandbox)
	document = window.document,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector.charAt(0) === "<" && selector.charAt( selector.length - 1 ) === ">" && selector.length >= 3 ) {
				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && (match[1] || !context) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[1] ) {
					context = context instanceof jQuery ? context[0] : context;

					// scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[1],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {
							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[2] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {
						// Handle the case where IE and Opera return items
						// by name instead of ID
						if ( elem.id !== match[2] ) {
							return rootjQuery.find( selector );
						}

						// Otherwise, we inject the element directly into the jQuery object
						this.length = 1;
						this[0] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || rootjQuery ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[0] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof rootjQuery.ready !== "undefined" ?
				rootjQuery.ready( selector ) :
				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,
	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.extend({
	dir: function( elem, dir, until ) {
		var matched = [],
			cur = elem[ dir ];

		while ( cur && cur.nodeType !== 9 && (until === undefined || cur.nodeType !== 1 || !jQuery( cur ).is( until )) ) {
			if ( cur.nodeType === 1 ) {
				matched.push( cur );
			}
			cur = cur[dir];
		}
		return matched;
	},

	sibling: function( n, elem ) {
		var r = [];

		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				r.push( n );
			}
		}

		return r;
	}
});

jQuery.fn.extend({
	has: function( target ) {
		var i,
			targets = jQuery( target, this ),
			len = targets.length;

		return this.filter(function() {
			for ( i = 0; i < len; i++ ) {
				if ( jQuery.contains( this, targets[i] ) ) {
					return true;
				}
			}
		});
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[i]; cur && cur !== context; cur = cur.parentNode ) {
				// Always skip document fragments
				if ( cur.nodeType < 11 && (pos ?
					pos.index(cur) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector(cur, selectors)) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.unique( matched ) : matched );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[0] && this[0].parentNode ) ? this.first().prevAll().length : -1;
		}

		// index in selector
		if ( typeof elem === "string" ) {
			return jQuery.inArray( this[0], jQuery( elem ) );
		}

		// Locate the position of the desired element
		return jQuery.inArray(
			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[0] : elem, this );
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.unique(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter(selector)
		);
	}
});

function sibling( cur, dir ) {
	do {
		cur = cur[ dir ];
	} while ( cur && cur.nodeType !== 1 );

	return cur;
}

jQuery.each({
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return jQuery.dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return jQuery.dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return jQuery.dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return jQuery.sibling( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return jQuery.sibling( elem.firstChild );
	},
	contents: function( elem ) {
		return jQuery.nodeName( elem, "iframe" ) ?
			elem.contentDocument || elem.contentWindow.document :
			jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var ret = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			ret = jQuery.filter( selector, ret );
		}

		if ( this.length > 1 ) {
			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				ret = jQuery.unique( ret );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				ret = ret.reverse();
			}
		}

		return this.pushStack( ret );
	};
});
var rnotwhite = (/\S+/g);



// String to Object options format cache
var optionsCache = {};

// Convert String-formatted options into Object-formatted ones and store in cache
function createOptions( options ) {
	var object = optionsCache[ options ] = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	});
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		( optionsCache[ options ] || createOptions( options ) ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,
		// Last fire value (for non-forgettable lists)
		memory,
		// Flag to know if list was already fired
		fired,
		// End of the loop when firing
		firingLength,
		// Index of currently firing callback (modified by remove if needed)
		firingIndex,
		// First callback to fire (used internally by add and fireWith)
		firingStart,
		// Actual callback list
		list = [],
		// Stack of fire calls for repeatable lists
		stack = !options.once && [],
		// Fire callbacks
		fire = function( data ) {
			memory = options.memory && data;
			fired = true;
			firingIndex = firingStart || 0;
			firingStart = 0;
			firingLength = list.length;
			firing = true;
			for ( ; list && firingIndex < firingLength; firingIndex++ ) {
				if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {
					memory = false; // To prevent further calls using add
					break;
				}
			}
			firing = false;
			if ( list ) {
				if ( stack ) {
					if ( stack.length ) {
						fire( stack.shift() );
					}
				} else if ( memory ) {
					list = [];
				} else {
					self.disable();
				}
			}
		},
		// Actual Callbacks object
		self = {
			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {
					// First, we save the current length
					var start = list.length;
					(function add( args ) {
						jQuery.each( args, function( _, arg ) {
							var type = jQuery.type( arg );
							if ( type === "function" ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && type !== "string" ) {
								// Inspect recursively
								add( arg );
							}
						});
					})( arguments );
					// Do we need to add the callbacks to the
					// current firing batch?
					if ( firing ) {
						firingLength = list.length;
					// With memory, if we're not firing then
					// we should call right away
					} else if ( memory ) {
						firingStart = start;
						fire( memory );
					}
				}
				return this;
			},
			// Remove a callback from the list
			remove: function() {
				if ( list ) {
					jQuery.each( arguments, function( _, arg ) {
						var index;
						while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
							list.splice( index, 1 );
							// Handle firing indexes
							if ( firing ) {
								if ( index <= firingLength ) {
									firingLength--;
								}
								if ( index <= firingIndex ) {
									firingIndex--;
								}
							}
						}
					});
				}
				return this;
			},
			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ? jQuery.inArray( fn, list ) > -1 : !!( list && list.length );
			},
			// Remove all callbacks from the list
			empty: function() {
				list = [];
				firingLength = 0;
				return this;
			},
			// Have the list do nothing anymore
			disable: function() {
				list = stack = memory = undefined;
				return this;
			},
			// Is it disabled?
			disabled: function() {
				return !list;
			},
			// Lock the list in its current state
			lock: function() {
				stack = undefined;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			// Is it locked?
			locked: function() {
				return !stack;
			},
			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( list && ( !fired || stack ) ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					if ( firing ) {
						stack.push( args );
					} else {
						fire( args );
					}
				}
				return this;
			},
			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},
			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend({

	Deferred: function( func ) {
		var tuples = [
				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks("memory") ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred(function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];
							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[1] ](function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.done( newDefer.resolve )
										.fail( newDefer.reject )
										.progress( newDefer.notify );
								} else {
									newDefer[ tuple[ 0 ] + "With" ]( this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments );
								}
							});
						});
						fns = null;
					}).promise();
				},
				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[1] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(function() {
					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[0] ] = function() {
				deferred[ tuple[0] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[0] + "With" ] = list.fireWith;
		});

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred. If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );

					} else if ( !(--remaining) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject )
						.progress( updateFunc( i, progressContexts, progressValues ) );
				} else {
					--remaining;
				}
			}
		}

		// if we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
});


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {
	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend({
	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
		if ( !document.body ) {
			return setTimeout( jQuery.ready );
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
});

/**
 * Clean-up method for dom ready events
 */
function detach() {
	if ( document.addEventListener ) {
		document.removeEventListener( "DOMContentLoaded", completed, false );
		window.removeEventListener( "load", completed, false );

	} else {
		document.detachEvent( "onreadystatechange", completed );
		window.detachEvent( "onload", completed );
	}
}

/**
 * The ready event handler and self cleanup method
 */
function completed() {
	// readyState === "complete" is good enough for us to call the dom ready in oldIE
	if ( document.addEventListener || event.type === "load" || document.readyState === "complete" ) {
		detach();
		jQuery.ready();
	}
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called after the browser event has already occurred.
		// we once tried to use readyState "interactive" here, but it caused issues like the one
		// discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
		if ( document.readyState === "complete" ) {
			// Handle it asynchronously to allow scripts the opportunity to delay ready
			setTimeout( jQuery.ready );

		// Standards-based browsers support DOMContentLoaded
		} else if ( document.addEventListener ) {
			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed, false );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed, false );

		// If IE event model is used
		} else {
			// Ensure firing before onload, maybe late but safe also for iframes
			document.attachEvent( "onreadystatechange", completed );

			// A fallback to window.onload, that will always work
			window.attachEvent( "onload", completed );

			// If IE and not a frame
			// continually check to see if the document is ready
			var top = false;

			try {
				top = window.frameElement == null && document.documentElement;
			} catch(e) {}

			if ( top && top.doScroll ) {
				(function doScrollCheck() {
					if ( !jQuery.isReady ) {

						try {
							// Use the trick by Diego Perini
							// http://javascript.nwbox.com/IEContentLoaded/
							top.doScroll("left");
						} catch(e) {
							return setTimeout( doScrollCheck, 50 );
						}

						// detach all dom ready events
						detach();

						// and execute any waiting functions
						jQuery.ready();
					}
				})();
			}
		}
	}
	return readyList.promise( obj );
};


var strundefined = typeof undefined;



// Support: IE<9
// Iteration over object's inherited properties before its own
var i;
for ( i in jQuery( support ) ) {
	break;
}
support.ownLast = i !== "0";

// Note: most support tests are defined in their respective modules.
// false until the test is run
support.inlineBlockNeedsLayout = false;

// Execute ASAP in case we need to set body.style.zoom
jQuery(function() {
	// Minified: var a,b,c,d
	var val, div, body, container;

	body = document.getElementsByTagName( "body" )[ 0 ];
	if ( !body || !body.style ) {
		// Return for frameset docs that don't have a body
		return;
	}

	// Setup
	div = document.createElement( "div" );
	container = document.createElement( "div" );
	container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
	body.appendChild( container ).appendChild( div );

	if ( typeof div.style.zoom !== strundefined ) {
		// Support: IE<8
		// Check if natively block-level elements act like inline-block
		// elements when setting their display to 'inline' and giving
		// them layout
		div.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1";

		support.inlineBlockNeedsLayout = val = div.offsetWidth === 3;
		if ( val ) {
			// Prevent IE 6 from affecting layout for positioned elements #11048
			// Prevent IE from shrinking the body in IE 7 mode #12869
			// Support: IE<8
			body.style.zoom = 1;
		}
	}

	body.removeChild( container );
});




(function() {
	var div = document.createElement( "div" );

	// Execute the test only if not already executed in another module.
	if (support.deleteExpando == null) {
		// Support: IE<9
		support.deleteExpando = true;
		try {
			delete div.test;
		} catch( e ) {
			support.deleteExpando = false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
})();


/**
 * Determines whether an object can have data
 */
jQuery.acceptData = function( elem ) {
	var noData = jQuery.noData[ (elem.nodeName + " ").toLowerCase() ],
		nodeType = +elem.nodeType || 1;

	// Do not set data on non-element DOM nodes because it will not be cleared (#8335).
	return nodeType !== 1 && nodeType !== 9 ?
		false :

		// Nodes accept data unless otherwise specified; rejection can be conditional
		!noData || noData !== true && elem.getAttribute("classid") === noData;
};


var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /([A-Z])/g;

function dataAttr( elem, key, data ) {
	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {

		var name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();

		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :
					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch( e ) {}

			// Make sure we set the data so it isn't changed later
			jQuery.data( elem, key, data );

		} else {
			data = undefined;
		}
	}

	return data;
}

// checks a cache object for emptiness
function isEmptyDataObject( obj ) {
	var name;
	for ( name in obj ) {

		// if the public data object is empty, the private is still empty
		if ( name === "data" && jQuery.isEmptyObject( obj[name] ) ) {
			continue;
		}
		if ( name !== "toJSON" ) {
			return false;
		}
	}

	return true;
}

function internalData( elem, name, data, pvt /* Internal Use Only */ ) {
	if ( !jQuery.acceptData( elem ) ) {
		return;
	}

	var ret, thisCache,
		internalKey = jQuery.expando,

		// We have to handle DOM nodes and JS objects differently because IE6-7
		// can't GC object references properly across the DOM-JS boundary
		isNode = elem.nodeType,

		// Only DOM nodes need the global jQuery cache; JS object data is
		// attached directly to the object so GC can occur automatically
		cache = isNode ? jQuery.cache : elem,

		// Only defining an ID for JS objects if its cache already exists allows
		// the code to shortcut on the same path as a DOM node with no cache
		id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey;

	// Avoid doing any more work than we need to when trying to get data on an
	// object that has no data at all
	if ( (!id || !cache[id] || (!pvt && !cache[id].data)) && data === undefined && typeof name === "string" ) {
		return;
	}

	if ( !id ) {
		// Only DOM nodes need a new unique ID for each element since their data
		// ends up in the global cache
		if ( isNode ) {
			id = elem[ internalKey ] = deletedIds.pop() || jQuery.guid++;
		} else {
			id = internalKey;
		}
	}

	if ( !cache[ id ] ) {
		// Avoid exposing jQuery metadata on plain JS objects when the object
		// is serialized using JSON.stringify
		cache[ id ] = isNode ? {} : { toJSON: jQuery.noop };
	}

	// An object can be passed to jQuery.data instead of a key/value pair; this gets
	// shallow copied over onto the existing cache
	if ( typeof name === "object" || typeof name === "function" ) {
		if ( pvt ) {
			cache[ id ] = jQuery.extend( cache[ id ], name );
		} else {
			cache[ id ].data = jQuery.extend( cache[ id ].data, name );
		}
	}

	thisCache = cache[ id ];

	// jQuery data() is stored in a separate object inside the object's internal data
	// cache in order to avoid key collisions between internal data and user-defined
	// data.
	if ( !pvt ) {
		if ( !thisCache.data ) {
			thisCache.data = {};
		}

		thisCache = thisCache.data;
	}

	if ( data !== undefined ) {
		thisCache[ jQuery.camelCase( name ) ] = data;
	}

	// Check for both converted-to-camel and non-converted data property names
	// If a data property was specified
	if ( typeof name === "string" ) {

		// First Try to find as-is property data
		ret = thisCache[ name ];

		// Test for null|undefined property data
		if ( ret == null ) {

			// Try to find the camelCased property
			ret = thisCache[ jQuery.camelCase( name ) ];
		}
	} else {
		ret = thisCache;
	}

	return ret;
}

function internalRemoveData( elem, name, pvt ) {
	if ( !jQuery.acceptData( elem ) ) {
		return;
	}

	var thisCache, i,
		isNode = elem.nodeType,

		// See jQuery.data for more information
		cache = isNode ? jQuery.cache : elem,
		id = isNode ? elem[ jQuery.expando ] : jQuery.expando;

	// If there is already no cache entry for this object, there is no
	// purpose in continuing
	if ( !cache[ id ] ) {
		return;
	}

	if ( name ) {

		thisCache = pvt ? cache[ id ] : cache[ id ].data;

		if ( thisCache ) {

			// Support array or space separated string names for data keys
			if ( !jQuery.isArray( name ) ) {

				// try the string as a key before any manipulation
				if ( name in thisCache ) {
					name = [ name ];
				} else {

					// split the camel cased version by spaces unless a key with the spaces exists
					name = jQuery.camelCase( name );
					if ( name in thisCache ) {
						name = [ name ];
					} else {
						name = name.split(" ");
					}
				}
			} else {
				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = name.concat( jQuery.map( name, jQuery.camelCase ) );
			}

			i = name.length;
			while ( i-- ) {
				delete thisCache[ name[i] ];
			}

			// If there is no data left in the cache, we want to continue
			// and let the cache object itself get destroyed
			if ( pvt ? !isEmptyDataObject(thisCache) : !jQuery.isEmptyObject(thisCache) ) {
				return;
			}
		}
	}

	// See jQuery.data for more information
	if ( !pvt ) {
		delete cache[ id ].data;

		// Don't destroy the parent cache unless the internal data object
		// had been the only thing left in it
		if ( !isEmptyDataObject( cache[ id ] ) ) {
			return;
		}
	}

	// Destroy the cache
	if ( isNode ) {
		jQuery.cleanData( [ elem ], true );

	// Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
	/* jshint eqeqeq: false */
	} else if ( support.deleteExpando || cache != cache.window ) {
		/* jshint eqeqeq: true */
		delete cache[ id ];

	// When all else fails, null
	} else {
		cache[ id ] = null;
	}
}

jQuery.extend({
	cache: {},

	// The following elements (space-suffixed to avoid Object.prototype collisions)
	// throw uncatchable exceptions if you attempt to set expando properties
	noData: {
		"applet ": true,
		"embed ": true,
		// ...but Flash objects (which have this classid) *can* handle expandos
		"object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
	},

	hasData: function( elem ) {
		elem = elem.nodeType ? jQuery.cache[ elem[jQuery.expando] ] : elem[ jQuery.expando ];
		return !!elem && !isEmptyDataObject( elem );
	},

	data: function( elem, name, data ) {
		return internalData( elem, name, data );
	},

	removeData: function( elem, name ) {
		return internalRemoveData( elem, name );
	},

	// For internal use only.
	_data: function( elem, name, data ) {
		return internalData( elem, name, data, true );
	},

	_removeData: function( elem, name ) {
		return internalRemoveData( elem, name, true );
	}
});

jQuery.fn.extend({
	data: function( key, value ) {
		var i, name, data,
			elem = this[0],
			attrs = elem && elem.attributes;

		// Special expections of .data basically thwart jQuery.access,
		// so implement the relevant behavior ourselves

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = jQuery.data( elem );

				if ( elem.nodeType === 1 && !jQuery._data( elem, "parsedAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice(5) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					jQuery._data( elem, "parsedAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each(function() {
				jQuery.data( this, key );
			});
		}

		return arguments.length > 1 ?

			// Sets one value
			this.each(function() {
				jQuery.data( this, key, value );
			}) :

			// Gets one value
			// Try to fetch any internally stored data first
			elem ? dataAttr( elem, key, jQuery.data( elem, key ) ) : undefined;
	},

	removeData: function( key ) {
		return this.each(function() {
			jQuery.removeData( this, key );
		});
	}
});


jQuery.extend({
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = jQuery._data( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray(data) ) {
					queue = jQuery._data( elem, type, jQuery.makeArray(data) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// not intended for public consumption - generates a queueHooks object, or returns the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return jQuery._data( elem, key ) || jQuery._data( elem, key, {
			empty: jQuery.Callbacks("once memory").add(function() {
				jQuery._removeData( elem, type + "queue" );
				jQuery._removeData( elem, key );
			})
		});
	}
});

jQuery.fn.extend({
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[0], type );
		}

		return data === undefined ?
			this :
			this.each(function() {
				var queue = jQuery.queue( this, type, data );

				// ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[0] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			});
	},
	dequeue: function( type ) {
		return this.each(function() {
			jQuery.dequeue( this, type );
		});
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},
	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = jQuery._data( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
});
var pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;

var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {
		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" || !jQuery.contains( elem.ownerDocument, elem );
	};



// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = jQuery.access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		length = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			jQuery.access( elems, fn, i, key[i], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {
			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < length; i++ ) {
				fn( elems[i], key, raw ? value : value.call( elems[i], i, fn( elems[i], key ) ) );
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			length ? fn( elems[0], key ) : emptyGet;
};
var rcheckableType = (/^(?:checkbox|radio)$/i);



(function() {
	// Minified: var a,b,c
	var input = document.createElement( "input" ),
		div = document.createElement( "div" ),
		fragment = document.createDocumentFragment();

	// Setup
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

	// IE strips leading whitespace when .innerHTML is used
	support.leadingWhitespace = div.firstChild.nodeType === 3;

	// Make sure that tbody elements aren't automatically inserted
	// IE will insert them into empty tables
	support.tbody = !div.getElementsByTagName( "tbody" ).length;

	// Make sure that link elements get serialized correctly by innerHTML
	// This requires a wrapper element in IE
	support.htmlSerialize = !!div.getElementsByTagName( "link" ).length;

	// Makes sure cloning an html5 element does not cause problems
	// Where outerHTML is undefined, this still works
	support.html5Clone =
		document.createElement( "nav" ).cloneNode( true ).outerHTML !== "<:nav></:nav>";

	// Check if a disconnected checkbox will retain its checked
	// value of true after appended to the DOM (IE6/7)
	input.type = "checkbox";
	input.checked = true;
	fragment.appendChild( input );
	support.appendChecked = input.checked;

	// Make sure textarea (and checkbox) defaultValue is properly cloned
	// Support: IE6-IE11+
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;

	// #11217 - WebKit loses check when the name is after the checked attribute
	fragment.appendChild( div );
	div.innerHTML = "<input type='radio' checked='checked' name='t'/>";

	// Support: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3
	// old WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<9
	// Opera does not clone events (and typeof div.attachEvent === undefined).
	// IE9-10 clones events bound via attachEvent, but they don't trigger with .click()
	support.noCloneEvent = true;
	if ( div.attachEvent ) {
		div.attachEvent( "onclick", function() {
			support.noCloneEvent = false;
		});

		div.cloneNode( true ).click();
	}

	// Execute the test only if not already executed in another module.
	if (support.deleteExpando == null) {
		// Support: IE<9
		support.deleteExpando = true;
		try {
			delete div.test;
		} catch( e ) {
			support.deleteExpando = false;
		}
	}
})();


(function() {
	var i, eventName,
		div = document.createElement( "div" );

	// Support: IE<9 (lack submit/change bubble), Firefox 23+ (lack focusin event)
	for ( i in { submit: true, change: true, focusin: true }) {
		eventName = "on" + i;

		if ( !(support[ i + "Bubbles" ] = eventName in window) ) {
			// Beware of CSP restrictions (https://developer.mozilla.org/en/Security/CSP)
			div.setAttribute( eventName, "t" );
			support[ i + "Bubbles" ] = div.attributes[ eventName ].expando === false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
})();


var rformElems = /^(?:input|select|textarea)$/i,
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {
		var tmp, events, t, handleObjIn,
			special, eventHandle, handleObj,
			handlers, type, namespaces, origType,
			elemData = jQuery._data( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !(events = elemData.events) ) {
			events = elemData.events = {};
		}
		if ( !(eventHandle = elemData.handle) ) {
			eventHandle = elemData.handle = function( e ) {
				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== strundefined && (!e || jQuery.event.triggered !== e.type) ?
					jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
					undefined;
			};
			// Add elem as a property of the handle fn to prevent a memory leak with IE non-native events
			eventHandle.elem = elem;
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend({
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join(".")
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !(handlers = events[ type ]) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener/attachEvent if the special events handler returns false
				if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
					// Bind the global event handler to the element
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );

					} else if ( elem.attachEvent ) {
						elem.attachEvent( "on" + type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

		// Nullify elem to prevent memory leaks in IE
		elem = null;
	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {
		var j, handleObj, tmp,
			origCount, t, events,
			special, handlers, type,
			namespaces, origType,
			elemData = jQuery.hasData( elem ) && jQuery._data( elem );

		if ( !elemData || !(events = elemData.events) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[2] && new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown || special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;

			// removeData also checks for emptiness and clears the expando if empty
			// so use it instead of delete
			jQuery._removeData( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {
		var handle, ontype, cur,
			bubbleType, special, tmp, i,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split(".") : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf(".") >= 0 ) {
			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split(".");
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf(":") < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join(".");
		event.namespace_re = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === (elem.ownerDocument || document) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( (cur = eventPath[i++]) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( jQuery._data( cur, "events" ) || {} )[ event.type ] && jQuery._data( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && jQuery.acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( (!special._default || special._default.apply( eventPath.pop(), data ) === false) &&
				jQuery.acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name name as the event.
				// Can't use an .isFunction() check here because IE6/7 fails that test.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && elem[ type ] && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					try {
						elem[ type ]();
					} catch ( e ) {
						// IE<9 dies on focus/blur to hidden element (#1486,#12518)
						// only reproducible on winXP IE8 native, not IE9 in IE8 mode
					}
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, ret, handleObj, matched, j,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( jQuery._data( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[0] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( (matched = handlerQueue[ i++ ]) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( (handleObj = matched.handlers[ j++ ]) && !event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or
				// 2) have namespace(s) a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.namespace_re || event.namespace_re.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )
							.apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( (event.result = ret) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var sel, handleObj, matches, i,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		// Avoid non-left-click bubbling in Firefox (#3861)
		if ( delegateCount && cur.nodeType && (!event.button || event.type !== "click") ) {

			/* jshint eqeqeq: false */
			for ( ; cur != this; cur = cur.parentNode || this ) {
				/* jshint eqeqeq: true */

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && (cur.disabled !== true || event.type !== "click") ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) >= 0 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push({ elem: cur, handlers: matches });
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push({ elem: this, handlers: handlers.slice( delegateCount ) });
		}

		return handlerQueue;
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: IE<9
		// Fix target property (#1925)
		if ( !event.target ) {
			event.target = originalEvent.srcElement || document;
		}

		// Support: Chrome 23+, Safari?
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		// Support: IE<9
		// For mouse/key events, metaKey==false if it's undefined (#3368, #11328)
		event.metaKey = !!event.metaKey;

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split(" "),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
		filter: function( event, original ) {
			var body, eventDoc, doc,
				button = original.button,
				fromElement = original.fromElement;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add relatedTarget, if necessary
			if ( !event.relatedTarget && fromElement ) {
				event.relatedTarget = fromElement === event.target ? original.toElement : fromElement;
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	special: {
		load: {
			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {
			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					try {
						this.focus();
						return false;
					} catch ( e ) {
						// Support: IE<9
						// If we error on focus to hidden element (#1486, #12518),
						// let .trigger() run the handlers
					}
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {
			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( jQuery.nodeName( this, "input" ) && this.type === "checkbox" && this.click ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	simulate: function( type, elem, event, bubble ) {
		// Piggyback on a donor event to simulate a different one.
		// Fake originalEvent to avoid donor's stopPropagation, but if the
		// simulated event prevents default then we do the same on the donor.
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true,
				originalEvent: {}
			}
		);
		if ( bubble ) {
			jQuery.event.trigger( e, null, elem );
		} else {
			jQuery.event.dispatch.call( elem, e );
		}
		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = document.removeEventListener ?
	function( elem, type, handle ) {
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle, false );
		}
	} :
	function( elem, type, handle ) {
		var name = "on" + type;

		if ( elem.detachEvent ) {

			// #8545, #7054, preventing memory leaks for custom events in IE6-8
			// detachEvent needed property on element, by name of that event, to properly expose it to GC
			if ( typeof elem[ name ] === strundefined ) {
				elem[ name ] = null;
			}

			elem.detachEvent( name, handle );
		}
	};

jQuery.Event = function( src, props ) {
	// Allow instantiation without the 'new' keyword
	if ( !(this instanceof jQuery.Event) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&
				// Support: IE < 9, Android < 4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;
		if ( !e ) {
			return;
		}

		// If preventDefault exists, run it on the original event
		if ( e.preventDefault ) {
			e.preventDefault();

		// Support: IE
		// Otherwise set the returnValue property of the original event to false
		} else {
			e.returnValue = false;
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;
		if ( !e ) {
			return;
		}
		// If stopPropagation exists, run it on the original event
		if ( e.stopPropagation ) {
			e.stopPropagation();
		}

		// Support: IE
		// Set the cancelBubble property of the original event to true
		e.cancelBubble = true;
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && e.stopImmediatePropagation ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
jQuery.each({
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mousenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || (related !== target && !jQuery.contains( target, related )) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
});

// IE submit delegation
if ( !support.submitBubbles ) {

	jQuery.event.special.submit = {
		setup: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Lazy-add a submit handler when a descendant form may potentially be submitted
			jQuery.event.add( this, "click._submit keypress._submit", function( e ) {
				// Node name check avoids a VML-related crash in IE (#9807)
				var elem = e.target,
					form = jQuery.nodeName( elem, "input" ) || jQuery.nodeName( elem, "button" ) ? elem.form : undefined;
				if ( form && !jQuery._data( form, "submitBubbles" ) ) {
					jQuery.event.add( form, "submit._submit", function( event ) {
						event._submit_bubble = true;
					});
					jQuery._data( form, "submitBubbles", true );
				}
			});
			// return undefined since we don't need an event listener
		},

		postDispatch: function( event ) {
			// If form was submitted by the user, bubble the event up the tree
			if ( event._submit_bubble ) {
				delete event._submit_bubble;
				if ( this.parentNode && !event.isTrigger ) {
					jQuery.event.simulate( "submit", this.parentNode, event, true );
				}
			}
		},

		teardown: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Remove delegated handlers; cleanData eventually reaps submit handlers attached above
			jQuery.event.remove( this, "._submit" );
		}
	};
}

// IE change delegation and checkbox/radio fix
if ( !support.changeBubbles ) {

	jQuery.event.special.change = {

		setup: function() {

			if ( rformElems.test( this.nodeName ) ) {
				// IE doesn't fire change on a check/radio until blur; trigger it on click
				// after a propertychange. Eat the blur-change in special.change.handle.
				// This still fires onchange a second time for check/radio after blur.
				if ( this.type === "checkbox" || this.type === "radio" ) {
					jQuery.event.add( this, "propertychange._change", function( event ) {
						if ( event.originalEvent.propertyName === "checked" ) {
							this._just_changed = true;
						}
					});
					jQuery.event.add( this, "click._change", function( event ) {
						if ( this._just_changed && !event.isTrigger ) {
							this._just_changed = false;
						}
						// Allow triggered, simulated change events (#11500)
						jQuery.event.simulate( "change", this, event, true );
					});
				}
				return false;
			}
			// Delegated event; lazy-add a change handler on descendant inputs
			jQuery.event.add( this, "beforeactivate._change", function( e ) {
				var elem = e.target;

				if ( rformElems.test( elem.nodeName ) && !jQuery._data( elem, "changeBubbles" ) ) {
					jQuery.event.add( elem, "change._change", function( event ) {
						if ( this.parentNode && !event.isSimulated && !event.isTrigger ) {
							jQuery.event.simulate( "change", this.parentNode, event, true );
						}
					});
					jQuery._data( elem, "changeBubbles", true );
				}
			});
		},

		handle: function( event ) {
			var elem = event.target;

			// Swallow native change events from checkbox/radio, we already triggered them above
			if ( this !== elem || event.isSimulated || event.isTrigger || (elem.type !== "radio" && elem.type !== "checkbox") ) {
				return event.handleObj.handler.apply( this, arguments );
			}
		},

		teardown: function() {
			jQuery.event.remove( this, "._change" );

			return !rformElems.test( this.nodeName );
		}
	};
}

// Create "bubbling" focus and blur events
if ( !support.focusinBubbles ) {
	jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
			};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				jQuery._data( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					jQuery._removeData( doc, fix );
				} else {
					jQuery._data( doc, fix, attaches );
				}
			}
		};
	});
}

jQuery.fn.extend({

	on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
		var type, origFn;

		// Types can be a map of types/handlers
		if ( typeof types === "object" ) {
			// ( types-Object, selector, data )
			if ( typeof selector !== "string" ) {
				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for ( type in types ) {
				this.on( type, selector, data, types[ type ], one );
			}
			return this;
		}

		if ( data == null && fn == null ) {
			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if ( fn == null ) {
			if ( typeof selector === "string" ) {
				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {
				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if ( fn === false ) {
			fn = returnFalse;
		} else if ( !fn ) {
			return this;
		}

		if ( one === 1 ) {
			origFn = fn;
			fn = function( event ) {
				// Can use an empty set, since event contains the info
				jQuery().off( event );
				return origFn.apply( this, arguments );
			};
			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
		}
		return this.each( function() {
			jQuery.event.add( this, types, fn, data, selector );
		});
	},
	one: function( types, selector, data, fn ) {
		return this.on( types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {
			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {
			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {
			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each(function() {
			jQuery.event.remove( this, types, fn, selector );
		});
	},

	trigger: function( type, data ) {
		return this.each(function() {
			jQuery.event.trigger( type, data, this );
		});
	},
	triggerHandler: function( type, data ) {
		var elem = this[0];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
});


function createSafeFragment( document ) {
	var list = nodeNames.split( "|" ),
		safeFrag = document.createDocumentFragment();

	if ( safeFrag.createElement ) {
		while ( list.length ) {
			safeFrag.createElement(
				list.pop()
			);
		}
	}
	return safeFrag;
}

var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|" +
		"header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
	rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
	rnoshimcache = new RegExp("<(?:" + nodeNames + ")[\\s/>]", "i"),
	rleadingWhitespace = /^\s+/,
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
	rtagName = /<([\w:]+)/,
	rtbody = /<tbody/i,
	rhtml = /<|&#?\w+;/,
	rnoInnerhtml = /<(?:script|style|link)/i,
	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptType = /^$|\/(?:java|ecma)script/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,

	// We have to close these tags to support XHTML (#13200)
	wrapMap = {
		option: [ 1, "<select multiple='multiple'>", "</select>" ],
		legend: [ 1, "<fieldset>", "</fieldset>" ],
		area: [ 1, "<map>", "</map>" ],
		param: [ 1, "<object>", "</object>" ],
		thead: [ 1, "<table>", "</table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

		// IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
		// unless wrapped in a div with non-breaking characters in front of it.
		_default: support.htmlSerialize ? [ 0, "", "" ] : [ 1, "X<div>", "</div>"  ]
	},
	safeFragment = createSafeFragment( document ),
	fragmentDiv = safeFragment.appendChild( document.createElement("div") );

wrapMap.optgroup = wrapMap.option;
wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

function getAll( context, tag ) {
	var elems, elem,
		i = 0,
		found = typeof context.getElementsByTagName !== strundefined ? context.getElementsByTagName( tag || "*" ) :
			typeof context.querySelectorAll !== strundefined ? context.querySelectorAll( tag || "*" ) :
			undefined;

	if ( !found ) {
		for ( found = [], elems = context.childNodes || context; (elem = elems[i]) != null; i++ ) {
			if ( !tag || jQuery.nodeName( elem, tag ) ) {
				found.push( elem );
			} else {
				jQuery.merge( found, getAll( elem, tag ) );
			}
		}
	}

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], found ) :
		found;
}

// Used in buildFragment, fixes the defaultChecked property
function fixDefaultChecked( elem ) {
	if ( rcheckableType.test( elem.type ) ) {
		elem.defaultChecked = elem.checked;
	}
}

// Support: IE<8
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName("tbody")[0] ||
			elem.appendChild( elem.ownerDocument.createElement("tbody") ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = (jQuery.find.attr( elem, "type" ) !== null) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );
	if ( match ) {
		elem.type = match[1];
	} else {
		elem.removeAttribute("type");
	}
	return elem;
}

// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var elem,
		i = 0;
	for ( ; (elem = elems[i]) != null; i++ ) {
		jQuery._data( elem, "globalEval", !refElements || jQuery._data( refElements[i], "globalEval" ) );
	}
}

function cloneCopyEvent( src, dest ) {

	if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {
		return;
	}

	var type, i, l,
		oldData = jQuery._data( src ),
		curData = jQuery._data( dest, oldData ),
		events = oldData.events;

	if ( events ) {
		delete curData.handle;
		curData.events = {};

		for ( type in events ) {
			for ( i = 0, l = events[ type ].length; i < l; i++ ) {
				jQuery.event.add( dest, type, events[ type ][ i ] );
			}
		}
	}

	// make the cloned public data object a copy from the original
	if ( curData.data ) {
		curData.data = jQuery.extend( {}, curData.data );
	}
}

function fixCloneNodeIssues( src, dest ) {
	var nodeName, e, data;

	// We do not need to do anything for non-Elements
	if ( dest.nodeType !== 1 ) {
		return;
	}

	nodeName = dest.nodeName.toLowerCase();

	// IE6-8 copies events bound via attachEvent when using cloneNode.
	if ( !support.noCloneEvent && dest[ jQuery.expando ] ) {
		data = jQuery._data( dest );

		for ( e in data.events ) {
			jQuery.removeEvent( dest, e, data.handle );
		}

		// Event data gets referenced instead of copied if the expando gets copied too
		dest.removeAttribute( jQuery.expando );
	}

	// IE blanks contents when cloning scripts, and tries to evaluate newly-set text
	if ( nodeName === "script" && dest.text !== src.text ) {
		disableScript( dest ).text = src.text;
		restoreScript( dest );

	// IE6-10 improperly clones children of object elements using classid.
	// IE10 throws NoModificationAllowedError if parent is null, #12132.
	} else if ( nodeName === "object" ) {
		if ( dest.parentNode ) {
			dest.outerHTML = src.outerHTML;
		}

		// This path appears unavoidable for IE9. When cloning an object
		// element in IE9, the outerHTML strategy above is not sufficient.
		// If the src has innerHTML and the destination does not,
		// copy the src.innerHTML into the dest.innerHTML. #10324
		if ( support.html5Clone && ( src.innerHTML && !jQuery.trim(dest.innerHTML) ) ) {
			dest.innerHTML = src.innerHTML;
		}

	} else if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		// IE6-8 fails to persist the checked state of a cloned checkbox
		// or radio button. Worse, IE6-7 fail to give the cloned element
		// a checked appearance if the defaultChecked value isn't also set

		dest.defaultChecked = dest.checked = src.checked;

		// IE6-7 get confused and end up setting the value of a cloned
		// checkbox/radio button to an empty string instead of "on"
		if ( dest.value !== src.value ) {
			dest.value = src.value;
		}

	// IE6-8 fails to return the selected option to the default selected
	// state when cloning options
	} else if ( nodeName === "option" ) {
		dest.defaultSelected = dest.selected = src.defaultSelected;

	// IE6-8 fails to set the defaultValue to the correct value when
	// cloning other types of input fields
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

jQuery.extend({
	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var destElements, node, clone, i, srcElements,
			inPage = jQuery.contains( elem.ownerDocument, elem );

		if ( support.html5Clone || jQuery.isXMLDoc(elem) || !rnoshimcache.test( "<" + elem.nodeName + ">" ) ) {
			clone = elem.cloneNode( true );

		// IE<=8 does not properly clone detached, unknown element nodes
		} else {
			fragmentDiv.innerHTML = elem.outerHTML;
			fragmentDiv.removeChild( clone = fragmentDiv.firstChild );
		}

		if ( (!support.noCloneEvent || !support.noCloneChecked) &&
				(elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			// Fix all IE cloning issues
			for ( i = 0; (node = srcElements[i]) != null; ++i ) {
				// Ensure that the destination node is not null; Fixes #9587
				if ( destElements[i] ) {
					fixCloneNodeIssues( node, destElements[i] );
				}
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0; (node = srcElements[i]) != null; i++ ) {
					cloneCopyEvent( node, destElements[i] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		destElements = srcElements = node = null;

		// Return the cloned set
		return clone;
	},

	buildFragment: function( elems, context, scripts, selection ) {
		var j, elem, contains,
			tmp, tag, tbody, wrap,
			l = elems.length,

			// Ensure a safe fragment
			safe = createSafeFragment( context ),

			nodes = [],
			i = 0;

		for ( ; i < l; i++ ) {
			elem = elems[ i ];

			if ( elem || elem === 0 ) {

				// Add nodes directly
				if ( jQuery.type( elem ) === "object" ) {
					jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

				// Convert non-html into a text node
				} else if ( !rhtml.test( elem ) ) {
					nodes.push( context.createTextNode( elem ) );

				// Convert html into DOM nodes
				} else {
					tmp = tmp || safe.appendChild( context.createElement("div") );

					// Deserialize a standard representation
					tag = (rtagName.exec( elem ) || [ "", "" ])[ 1 ].toLowerCase();
					wrap = wrapMap[ tag ] || wrapMap._default;

					tmp.innerHTML = wrap[1] + elem.replace( rxhtmlTag, "<$1></$2>" ) + wrap[2];

					// Descend through wrappers to the right content
					j = wrap[0];
					while ( j-- ) {
						tmp = tmp.lastChild;
					}

					// Manually add leading whitespace removed by IE
					if ( !support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
						nodes.push( context.createTextNode( rleadingWhitespace.exec( elem )[0] ) );
					}

					// Remove IE's autoinserted <tbody> from table fragments
					if ( !support.tbody ) {

						// String was a <table>, *may* have spurious <tbody>
						elem = tag === "table" && !rtbody.test( elem ) ?
							tmp.firstChild :

							// String was a bare <thead> or <tfoot>
							wrap[1] === "<table>" && !rtbody.test( elem ) ?
								tmp :
								0;

						j = elem && elem.childNodes.length;
						while ( j-- ) {
							if ( jQuery.nodeName( (tbody = elem.childNodes[j]), "tbody" ) && !tbody.childNodes.length ) {
								elem.removeChild( tbody );
							}
						}
					}

					jQuery.merge( nodes, tmp.childNodes );

					// Fix #12392 for WebKit and IE > 9
					tmp.textContent = "";

					// Fix #12392 for oldIE
					while ( tmp.firstChild ) {
						tmp.removeChild( tmp.firstChild );
					}

					// Remember the top-level container for proper cleanup
					tmp = safe.lastChild;
				}
			}
		}

		// Fix #11356: Clear elements from fragment
		if ( tmp ) {
			safe.removeChild( tmp );
		}

		// Reset defaultChecked for any radios and checkboxes
		// about to be appended to the DOM in IE 6/7 (#8060)
		if ( !support.appendChecked ) {
			jQuery.grep( getAll( nodes, "input" ), fixDefaultChecked );
		}

		i = 0;
		while ( (elem = nodes[ i++ ]) ) {

			// #4087 - If origin and destination elements are the same, and this is
			// that element, do not do anything
			if ( selection && jQuery.inArray( elem, selection ) !== -1 ) {
				continue;
			}

			contains = jQuery.contains( elem.ownerDocument, elem );

			// Append to fragment
			tmp = getAll( safe.appendChild( elem ), "script" );

			// Preserve script evaluation history
			if ( contains ) {
				setGlobalEval( tmp );
			}

			// Capture executables
			if ( scripts ) {
				j = 0;
				while ( (elem = tmp[ j++ ]) ) {
					if ( rscriptType.test( elem.type || "" ) ) {
						scripts.push( elem );
					}
				}
			}
		}

		tmp = null;

		return safe;
	},

	cleanData: function( elems, /* internal */ acceptData ) {
		var elem, type, id, data,
			i = 0,
			internalKey = jQuery.expando,
			cache = jQuery.cache,
			deleteExpando = support.deleteExpando,
			special = jQuery.event.special;

		for ( ; (elem = elems[i]) != null; i++ ) {
			if ( acceptData || jQuery.acceptData( elem ) ) {

				id = elem[ internalKey ];
				data = id && cache[ id ];

				if ( data ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Remove cache only if it was not already removed by jQuery.event.remove
					if ( cache[ id ] ) {

						delete cache[ id ];

						// IE does not allow us to delete expando properties from nodes,
						// nor does it have a removeAttribute function on Document nodes;
						// we must handle all of these cases
						if ( deleteExpando ) {
							delete elem[ internalKey ];

						} else if ( typeof elem.removeAttribute !== strundefined ) {
							elem.removeAttribute( internalKey );

						} else {
							elem[ internalKey ] = null;
						}

						deletedIds.push( id );
					}
				}
			}
		}
	}
});

jQuery.fn.extend({
	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().append( ( this[0] && this[0].ownerDocument || document ).createTextNode( value ) );
		}, null, value, arguments.length );
	},

	append: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		});
	},

	prepend: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		});
	},

	before: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		});
	},

	after: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		});
	},

	remove: function( selector, keepData /* Internal Use Only */ ) {
		var elem,
			elems = selector ? jQuery.filter( selector, this ) : this,
			i = 0;

		for ( ; (elem = elems[i]) != null; i++ ) {

			if ( !keepData && elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem ) );
			}

			if ( elem.parentNode ) {
				if ( keepData && jQuery.contains( elem.ownerDocument, elem ) ) {
					setGlobalEval( getAll( elem, "script" ) );
				}
				elem.parentNode.removeChild( elem );
			}
		}

		return this;
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; (elem = this[i]) != null; i++ ) {
			// Remove element nodes and prevent memory leaks
			if ( elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem, false ) );
			}

			// Remove any remaining nodes
			while ( elem.firstChild ) {
				elem.removeChild( elem.firstChild );
			}

			// If this is a select, ensure that it displays empty (#12336)
			// Support: IE<9
			if ( elem.options && jQuery.nodeName( elem, "select" ) ) {
				elem.options.length = 0;
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map(function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		});
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined ) {
				return elem.nodeType === 1 ?
					elem.innerHTML.replace( rinlinejQuery, "" ) :
					undefined;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				( support.htmlSerialize || !rnoshimcache.test( value )  ) &&
				( support.leadingWhitespace || !rleadingWhitespace.test( value ) ) &&
				!wrapMap[ (rtagName.exec( value ) || [ "", "" ])[ 1 ].toLowerCase() ] ) {

				value = value.replace( rxhtmlTag, "<$1></$2>" );

				try {
					for (; i < l; i++ ) {
						// Remove element nodes and prevent memory leaks
						elem = this[i] || {};
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch(e) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var arg = arguments[ 0 ];

		// Make the changes, replacing each context element with the new content
		this.domManip( arguments, function( elem ) {
			arg = this.parentNode;

			jQuery.cleanData( getAll( this ) );

			if ( arg ) {
				arg.replaceChild( elem, this );
			}
		});

		// Force removal if there was no new content (e.g., from empty arguments)
		return arg && (arg.length || arg.nodeType) ? this : this.remove();
	},

	detach: function( selector ) {
		return this.remove( selector, true );
	},

	domManip: function( args, callback ) {

		// Flatten any nested arrays
		args = concat.apply( [], args );

		var first, node, hasScripts,
			scripts, doc, fragment,
			i = 0,
			l = this.length,
			set = this,
			iNoClone = l - 1,
			value = args[0],
			isFunction = jQuery.isFunction( value );

		// We can't cloneNode fragments that contain checked, in WebKit
		if ( isFunction ||
				( l > 1 && typeof value === "string" &&
					!support.checkClone && rchecked.test( value ) ) ) {
			return this.each(function( index ) {
				var self = set.eq( index );
				if ( isFunction ) {
					args[0] = value.call( this, index, self.html() );
				}
				self.domManip( args, callback );
			});
		}

		if ( l ) {
			fragment = jQuery.buildFragment( args, this[ 0 ].ownerDocument, false, this );
			first = fragment.firstChild;

			if ( fragment.childNodes.length === 1 ) {
				fragment = first;
			}

			if ( first ) {
				scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
				hasScripts = scripts.length;

				// Use the original fragment for the last item instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				for ( ; i < l; i++ ) {
					node = fragment;

					if ( i !== iNoClone ) {
						node = jQuery.clone( node, true, true );

						// Keep references to cloned scripts for later restoration
						if ( hasScripts ) {
							jQuery.merge( scripts, getAll( node, "script" ) );
						}
					}

					callback.call( this[i], node, i );
				}

				if ( hasScripts ) {
					doc = scripts[ scripts.length - 1 ].ownerDocument;

					// Reenable scripts
					jQuery.map( scripts, restoreScript );

					// Evaluate executable scripts on first document insertion
					for ( i = 0; i < hasScripts; i++ ) {
						node = scripts[ i ];
						if ( rscriptType.test( node.type || "" ) &&
							!jQuery._data( node, "globalEval" ) && jQuery.contains( doc, node ) ) {

							if ( node.src ) {
								// Optional AJAX dependency, but won't run scripts if not present
								if ( jQuery._evalUrl ) {
									jQuery._evalUrl( node.src );
								}
							} else {
								jQuery.globalEval( ( node.text || node.textContent || node.innerHTML || "" ).replace( rcleanScript, "" ) );
							}
						}
					}
				}

				// Fix #11809: Avoid leaking memory
				fragment = first = null;
			}
		}

		return this;
	}
});

jQuery.each({
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			i = 0,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone(true);
			jQuery( insert[i] )[ original ]( elems );

			// Modern browsers can apply jQuery collections as arrays, but oldIE needs a .get()
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
});


var iframe,
	elemdisplay = {};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */
// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var style,
		elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		// getDefaultComputedStyle might be reliably used only on attached element
		display = window.getDefaultComputedStyle && ( style = window.getDefaultComputedStyle( elem[ 0 ] ) ) ?

			// Use of this method is a temporary fix (more like optmization) until something better comes along,
			// since it was removed from specification and supported only in FF
			style.display : jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = (iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" )).appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = ( iframe[ 0 ].contentWindow || iframe[ 0 ].contentDocument ).document;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}


(function() {
	var shrinkWrapBlocksVal;

	support.shrinkWrapBlocks = function() {
		if ( shrinkWrapBlocksVal != null ) {
			return shrinkWrapBlocksVal;
		}

		// Will be changed later if needed.
		shrinkWrapBlocksVal = false;

		// Minified: var b,c,d
		var div, body, container;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {
			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		// Support: IE6
		// Check if elements with layout shrink-wrap their children
		if ( typeof div.style.zoom !== strundefined ) {
			// Reset CSS: box-sizing; display; margin; border
			div.style.cssText =
				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;" +
				"padding:1px;width:1px;zoom:1";
			div.appendChild( document.createElement( "div" ) ).style.width = "5px";
			shrinkWrapBlocksVal = div.offsetWidth !== 3;
		}

		body.removeChild( container );

		return shrinkWrapBlocksVal;
	};

})();
var rmargin = (/^margin/);

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );



var getStyles, curCSS,
	rposition = /^(top|right|bottom|left)$/;

if ( window.getComputedStyle ) {
	getStyles = function( elem ) {
		return elem.ownerDocument.defaultView.getComputedStyle( elem, null );
	};

	curCSS = function( elem, name, computed ) {
		var width, minWidth, maxWidth, ret,
			style = elem.style;

		computed = computed || getStyles( elem );

		// getPropertyValue is only needed for .css('filter') in IE9, see #12537
		ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined;

		if ( computed ) {

			if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
				ret = jQuery.style( elem, name );
			}

			// A tribute to the "awesome hack by Dean Edwards"
			// Chrome < 17 and Safari 5.0 uses "computed value" instead of "used value" for margin-right
			// Safari 5.1.7 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
			// this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
			if ( rnumnonpx.test( ret ) && rmargin.test( name ) ) {

				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "";
	};
} else if ( document.documentElement.currentStyle ) {
	getStyles = function( elem ) {
		return elem.currentStyle;
	};

	curCSS = function( elem, name, computed ) {
		var left, rs, rsLeft, ret,
			style = elem.style;

		computed = computed || getStyles( elem );
		ret = computed ? computed[ name ] : undefined;

		// Avoid setting ret to empty string here
		// so we don't default to auto
		if ( ret == null && style && style[ name ] ) {
			ret = style[ name ];
		}

		// From the awesome hack by Dean Edwards
		// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

		// If we're not dealing with a regular pixel number
		// but a number that has a weird ending, we need to convert it to pixels
		// but not position css attributes, as those are proportional to the parent element instead
		// and we can't measure the parent instead because it might trigger a "stacking dolls" problem
		if ( rnumnonpx.test( ret ) && !rposition.test( name ) ) {

			// Remember the original values
			left = style.left;
			rs = elem.runtimeStyle;
			rsLeft = rs && rs.left;

			// Put in the new values to get a computed value out
			if ( rsLeft ) {
				rs.left = elem.currentStyle.left;
			}
			style.left = name === "fontSize" ? "1em" : ret;
			ret = style.pixelLeft + "px";

			// Revert the changed values
			style.left = left;
			if ( rsLeft ) {
				rs.left = rsLeft;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "" || "auto";
	};
}




function addGetHookIf( conditionFn, hookFn ) {
	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			var condition = conditionFn();

			if ( condition == null ) {
				// The test was not ready at this point; screw the hook this time
				// but check again when needed next time.
				return;
			}

			if ( condition ) {
				// Hook not needed (or it's not possible to use it due to missing dependency),
				// remove it.
				// Since there are no other hooks for marginRight, remove the whole object.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.

			return (this.get = hookFn).apply( this, arguments );
		}
	};
}


(function() {
	// Minified: var b,c,d,e,f,g, h,i
	var div, style, a, pixelPositionVal, boxSizingReliableVal,
		reliableHiddenOffsetsVal, reliableMarginRightVal;

	// Setup
	div = document.createElement( "div" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName( "a" )[ 0 ];
	style = a && a.style;

	// Finish early in limited (non-browser) environments
	if ( !style ) {
		return;
	}

	style.cssText = "float:left;opacity:.5";

	// Support: IE<9
	// Make sure that element opacity exists (as opposed to filter)
	support.opacity = style.opacity === "0.5";

	// Verify style float existence
	// (IE uses styleFloat instead of cssFloat)
	support.cssFloat = !!style.cssFloat;

	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	// Support: Firefox<29, Android 2.3
	// Vendor-prefix box-sizing
	support.boxSizing = style.boxSizing === "" || style.MozBoxSizing === "" ||
		style.WebkitBoxSizing === "";

	jQuery.extend(support, {
		reliableHiddenOffsets: function() {
			if ( reliableHiddenOffsetsVal == null ) {
				computeStyleTests();
			}
			return reliableHiddenOffsetsVal;
		},

		boxSizingReliable: function() {
			if ( boxSizingReliableVal == null ) {
				computeStyleTests();
			}
			return boxSizingReliableVal;
		},

		pixelPosition: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelPositionVal;
		},

		// Support: Android 2.3
		reliableMarginRight: function() {
			if ( reliableMarginRightVal == null ) {
				computeStyleTests();
			}
			return reliableMarginRightVal;
		}
	});

	function computeStyleTests() {
		// Minified: var b,c,d,j
		var div, body, container, contents;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {
			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		div.style.cssText =
			// Support: Firefox<29, Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;-moz-box-sizing:border-box;" +
			"box-sizing:border-box;display:block;margin-top:1%;top:1%;" +
			"border:1px;padding:1px;width:4px;position:absolute";

		// Support: IE<9
		// Assume reasonable values in the absence of getComputedStyle
		pixelPositionVal = boxSizingReliableVal = false;
		reliableMarginRightVal = true;

		// Check for getComputedStyle so that this code is not run in IE<9.
		if ( window.getComputedStyle ) {
			pixelPositionVal = ( window.getComputedStyle( div, null ) || {} ).top !== "1%";
			boxSizingReliableVal =
				( window.getComputedStyle( div, null ) || { width: "4px" } ).width === "4px";

			// Support: Android 2.3
			// Div with explicit width and no margin-right incorrectly
			// gets computed margin-right based on width of container (#3333)
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			contents = div.appendChild( document.createElement( "div" ) );

			// Reset CSS: box-sizing; display; margin; border; padding
			contents.style.cssText = div.style.cssText =
				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;padding:0";
			contents.style.marginRight = contents.style.width = "0";
			div.style.width = "1px";

			reliableMarginRightVal =
				!parseFloat( ( window.getComputedStyle( contents, null ) || {} ).marginRight );
		}

		// Support: IE8
		// Check if table cells still have offsetWidth/Height when they are set
		// to display:none and there are still other visible table cells in a
		// table row; if so, offsetWidth/Height are not reliable for use when
		// determining if an element has been hidden directly using
		// display:none (it is still safe to use offsets if a parent element is
		// hidden; don safety goggles and see bug #4512 for more information).
		div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
		contents = div.getElementsByTagName( "td" );
		contents[ 0 ].style.cssText = "margin:0;border:0;padding:0;display:none";
		reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
		if ( reliableHiddenOffsetsVal ) {
			contents[ 0 ].style.display = "";
			contents[ 1 ].style.display = "none";
			reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
		}

		body.removeChild( container );
	}

})();


// A method for quickly swapping in/out CSS properties to get correct calculations.
jQuery.swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var
		ralpha = /alpha\([^)]*\)/i,
	ropacity = /opacity\s*=\s*([^)]*)/,

	// swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
	// see here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),
	rrelNum = new RegExp( "^([+-])=(" + pnum + ")", "i" ),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ];


// return a css property mapped to a potentially vendor prefixed property
function vendorPropName( style, name ) {

	// shortcut for names that are not vendor prefixed
	if ( name in style ) {
		return name;
	}

	// check for vendor prefixed names
	var capName = name.charAt(0).toUpperCase() + name.slice(1),
		origName = name,
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in style ) {
			return name;
		}
	}

	return origName;
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = jQuery._data( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {
			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] = jQuery._data( elem, "olddisplay", defaultDisplay(elem.nodeName) );
			}
		} else {
			hidden = isHidden( elem );

			if ( display && display !== "none" || !hidden ) {
				jQuery._data( elem, "olddisplay", hidden ? display : jQuery.css( elem, "display" ) );
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?
		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?
		// If we already have the right measurement, avoid augmentation
		4 :
		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {
		// both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {
			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// at this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {
			// at this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// at this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = support.boxSizing && jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {
		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test(val) ) {
			return val;
		}

		// we need the check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox && ( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

jQuery.extend({
	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {
					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		// normalize float css property
		"float": support.cssFloat ? "cssFloat" : "styleFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {
		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// convert relative number strings (+= or -=) to relative numbers. #7345
			if ( type === "string" && (ret = rrelNum.exec( value )) ) {
				value = ( ret[1] + 1 ) * ret[2] + parseFloat( jQuery.css( elem, name ) );
				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set. See: #7116
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add 'px' to the (except for certain CSS properties)
			if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
				value += "px";
			}

			// Fixes #8908, it can be done more correctly by specifing setters in cssHooks,
			// but it would mean to define eight (for every problematic property) identical functions
			if ( !support.clearCloneStyle && value === "" && name.indexOf("background") === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value, extra )) !== undefined ) {

				// Support: IE
				// Swallow errors from 'invalid' CSS values (#5509)
				try {
					style[ name ] = value;
				} catch(e) {}
			}

		} else {
			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var num, val, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( elem.style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		//convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Return, converting to number if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || jQuery.isNumeric( num ) ? num || 0 : val;
		}
		return val;
	}
});

jQuery.each([ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {
				// certain elements can have dimension info if we invisibly show them
				// however, it must have a current display style that would benefit from this
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) && elem.offsetWidth === 0 ?
					jQuery.swap( elem, cssShow, function() {
						return getWidthOrHeight( elem, name, extra );
					}) :
					getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					support.boxSizing && jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
});

if ( !support.opacity ) {
	jQuery.cssHooks.opacity = {
		get: function( elem, computed ) {
			// IE uses filters for opacity
			return ropacity.test( (computed && elem.currentStyle ? elem.currentStyle.filter : elem.style.filter) || "" ) ?
				( 0.01 * parseFloat( RegExp.$1 ) ) + "" :
				computed ? "1" : "";
		},

		set: function( elem, value ) {
			var style = elem.style,
				currentStyle = elem.currentStyle,
				opacity = jQuery.isNumeric( value ) ? "alpha(opacity=" + value * 100 + ")" : "",
				filter = currentStyle && currentStyle.filter || style.filter || "";

			// IE has trouble with opacity if it does not have layout
			// Force it by setting the zoom level
			style.zoom = 1;

			// if setting opacity to 1, and no other filters exist - attempt to remove filter attribute #6652
			// if value === "", then remove inline opacity #12685
			if ( ( value >= 1 || value === "" ) &&
					jQuery.trim( filter.replace( ralpha, "" ) ) === "" &&
					style.removeAttribute ) {

				// Setting style.filter to null, "" & " " still leave "filter:" in the cssText
				// if "filter:" is present at all, clearType is disabled, we want to avoid this
				// style.removeAttribute is IE Only, but so apparently is this code path...
				style.removeAttribute( "filter" );

				// if there is no filter style applied in a css rule or unset inline opacity, we are done
				if ( value === "" || currentStyle && !currentStyle.filter ) {
					return;
				}
			}

			// otherwise, set new filter values
			style.filter = ralpha.test( filter ) ?
				filter.replace( ralpha, opacity ) :
				filter + " " + opacity;
		}
	};
}

jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			// Work around by temporarily setting element display to inline-block
			return jQuery.swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each({
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// assumes a single number if not a string
				parts = typeof value === "string" ? value.split(" ") : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
});

jQuery.fn.extend({
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each(function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		});
	}
});


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || "swing";
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			if ( tween.elem[ tween.prop ] != null &&
				(!tween.elem.style || tween.elem.style[ tween.prop ] == null) ) {
				return tween.elem[ tween.prop ];
			}

			// passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails
			// so, simple values such as "10px" are parsed to Float.
			// complex values such as "rotate(1rad)" are returned as is.
			result = jQuery.css( tween.elem, tween.prop, "" );
			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {
			// use step hook for back compat - use cssHook if its there - use .style if its
			// available and use plain properties where available
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.style && ( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null || jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9
// Panic based approach to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	}
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rfxnum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" ),
	rrun = /queueHooks$/,
	animationPrefilters = [ defaultPrefilter ],
	tweeners = {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value ),
				target = tween.cur(),
				parts = rfxnum.exec( value ),
				unit = parts && parts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

				// Starting value computation is required for potential unit mismatches
				start = ( jQuery.cssNumber[ prop ] || unit !== "px" && +target ) &&
					rfxnum.exec( jQuery.css( tween.elem, prop ) ),
				scale = 1,
				maxIterations = 20;

			if ( start && start[ 3 ] !== unit ) {
				// Trust units reported by jQuery.css
				unit = unit || start[ 3 ];

				// Make sure we update the tween properties later on
				parts = parts || [];

				// Iteratively approximate from a nonzero starting point
				start = +target || 1;

				do {
					// If previous iteration zeroed out, double until we get *something*
					// Use a string for doubling factor so we don't accidentally see scale as unchanged below
					scale = scale || ".5";

					// Adjust and apply
					start = start / scale;
					jQuery.style( tween.elem, prop, start + unit );

				// Update scale, tolerating zero or NaN from tween.cur()
				// And breaking the loop if scale is unchanged or perfect, or if we've just had enough
				} while ( scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations );
			}

			// Update tween properties
			if ( parts ) {
				start = tween.start = +start || +target || 0;
				tween.unit = unit;
				// If a +=/-= token was provided, we're doing a relative animation
				tween.end = parts[ 1 ] ?
					start + ( parts[ 1 ] + 1 ) * parts[ 2 ] :
					+parts[ 2 ];
			}

			return tween;
		} ]
	};

// Animations created synchronously will run synchronously
function createFxNow() {
	setTimeout(function() {
		fxNow = undefined;
	});
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		attrs = { height: type },
		i = 0;

	// if we include width, step value is 1 to do all cssExpand values,
	// if we don't include width, step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( tweeners[ prop ] || [] ).concat( tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( (tween = collection[ index ].call( animation, prop, value )) ) {

			// we're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = jQuery._data( elem, "fxshow" );

	// handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always(function() {
			// doing this makes sure that the complete handler will be called
			// before this completes
			anim.always(function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			});
		});
	}

	// height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {
		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE does not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			jQuery._data( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {

			// inline-level elements accept inline-block;
			// block-level elements need to be inline with layout
			if ( !support.inlineBlockNeedsLayout || defaultDisplay( elem.nodeName ) === "inline" ) {
				style.display = "inline-block";
			} else {
				style.zoom = 1;
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		if ( !support.shrinkWrapBlocks() ) {
			anim.always(function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			});
		}
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = jQuery._data( elem, "fxshow", {} );
		}

		// store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done(function() {
				jQuery( elem ).hide();
			});
		}
		anim.done(function() {
			var prop;
			jQuery._removeData( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		});
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( (display === "none" ? defaultDisplay( elem.nodeName ) : display) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// not quite $.extend, this wont overwrite keys already present.
			// also - reusing 'index' from above because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = animationPrefilters.length,
		deferred = jQuery.Deferred().always( function() {
			// don't match elem in the :animated selector
			delete tick.elem;
		}),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
				// archaic crash bug won't allow us to use 1 - ( 0.5 || 0 ) (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ]);

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise({
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, { specialEasing: {} }, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,
					// if we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// resolve when we played the last frame
				// otherwise, reject
				if ( gotoEnd ) {
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		}),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = animationPrefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		})
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {
	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.split(" ");
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			tweeners[ prop ] = tweeners[ prop ] || [];
			tweeners[ prop ].unshift( callback );
		}
	},

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			animationPrefilters.unshift( callback );
		} else {
			animationPrefilters.push( callback );
		}
	}
});

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend({
	fadeTo: function( speed, to, easing, callback ) {

		// show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// animate to the value specified
			.end().animate({ opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {
				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || jQuery._data( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each(function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = jQuery._data( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {
					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// start the next in the queue if the last step wasn't forced
			// timers currently will call their complete callbacks, which will dequeue
			// but only if they were gotoEnd
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		});
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each(function() {
			var index,
				data = jQuery._data( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// enable finishing flag on private data
			data.finish = true;

			// empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// turn off finishing flag
			delete data.finish;
		});
	}
});

jQuery.each([ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
});

// Generate shortcuts for custom animations
jQuery.each({
	slideDown: genFx("show"),
	slideUp: genFx("hide"),
	slideToggle: genFx("toggle"),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
});

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		timers = jQuery.timers,
		i = 0;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];
		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,
	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = setTimeout( next, time );
		hooks.stop = function() {
			clearTimeout( timeout );
		};
	});
};


(function() {
	// Minified: var a,b,c,d,e
	var input, div, select, a, opt;

	// Setup
	div = document.createElement( "div" );
	div.setAttribute( "className", "t" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName("a")[ 0 ];

	// First batch of tests.
	select = document.createElement("select");
	opt = select.appendChild( document.createElement("option") );
	input = div.getElementsByTagName("input")[ 0 ];

	a.style.cssText = "top:1px";

	// Test setAttribute on camelCase class. If it works, we need attrFixes when doing get/setAttribute (ie6/7)
	support.getSetAttribute = div.className !== "t";

	// Get the style information from getAttribute
	// (IE uses .cssText instead)
	support.style = /top/.test( a.getAttribute("style") );

	// Make sure that URLs aren't manipulated
	// (IE normalizes it by default)
	support.hrefNormalized = a.getAttribute("href") === "/a";

	// Check the default checkbox/radio value ("" on WebKit; "on" elsewhere)
	support.checkOn = !!input.value;

	// Make sure that a selected-by-default option has a working selected property.
	// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
	support.optSelected = opt.selected;

	// Tests for enctype support on a form (#6743)
	support.enctype = !!document.createElement("form").enctype;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE8 only
	// Check if we can trust getAttribute("value")
	input = document.createElement( "input" );
	input.setAttribute( "value", "" );
	support.input = input.getAttribute( "value" ) === "";

	// Check if an input maintains its value after becoming a radio
	input.value = "t";
	input.setAttribute( "type", "radio" );
	support.radioValue = input.value === "t";
})();


var rreturn = /\r/g;

jQuery.fn.extend({
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[0];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] || jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?
					// handle most common string cases
					ret.replace(rreturn, "") :
					// handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each(function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";
			} else if ( typeof val === "number" ) {
				val += "";
			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				});
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		});
	}
});

jQuery.extend({
	valHooks: {
		option: {
			get: function( elem ) {
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :
					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					jQuery.trim( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// oldIE doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&
							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null ) &&
							( !option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					if ( jQuery.inArray( jQuery.valHooks.option.get( option ), values ) >= 0 ) {

						// Support: IE6
						// When new option element is added to select box we need to
						// force reflow of newly added node in order to workaround delay
						// of initialization properties
						try {
							option.selected = optionSet = true;

						} catch ( _ ) {

							// Will be executed only in IE6
							option.scrollHeight;
						}

					} else {
						option.selected = false;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}

				return options;
			}
		}
	}
});

// Radios and checkboxes getter/setter
jQuery.each([ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			// Support: Webkit
			// "" is returned instead of "on" if a value isn't specified
			return elem.getAttribute("value") === null ? "on" : elem.value;
		};
	}
});




var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle,
	ruseDefault = /^(?:checked|selected)$/i,
	getSetAttribute = support.getSetAttribute,
	getSetInput = support.input;

jQuery.fn.extend({
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each(function() {
			jQuery.removeAttr( this, name );
		});
	}
});

jQuery.extend({
	attr: function( elem, name, value ) {
		var hooks, ret,
			nType = elem.nodeType;

		// don't get/set attributes on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === strundefined ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {

			if ( value === null ) {
				jQuery.removeAttr( elem, name );

			} else if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
				return ret;

			} else {
				elem.setAttribute( name, value + "" );
				return value;
			}

		} else if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
			return ret;

		} else {
			ret = jQuery.find.attr( elem, name );

			// Non-existent attributes return null, we normalize to undefined
			return ret == null ?
				undefined :
				ret;
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( (name = attrNames[i++]) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {
					// Set corresponding property to false
					if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
						elem[ propName ] = false;
					// Support: IE<9
					// Also clear defaultChecked/defaultSelected (if appropriate)
					} else {
						elem[ jQuery.camelCase( "default-" + name ) ] =
							elem[ propName ] = false;
					}

				// See #9699 for explanation of this approach (setting first, then removal)
				} else {
					jQuery.attr( elem, name, "" );
				}

				elem.removeAttribute( getSetAttribute ? name : propName );
			}
		}
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" && jQuery.nodeName(elem, "input") ) {
					// Setting the type on a radio button after the value resets the value in IE6-9
					// Reset value to default in case type is set after value during creation
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	}
});

// Hook for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {
			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
			// IE<8 needs the *property* name
			elem.setAttribute( !getSetAttribute && jQuery.propFix[ name ] || name, name );

		// Use defaultChecked and defaultSelected for oldIE
		} else {
			elem[ jQuery.camelCase( "default-" + name ) ] = elem[ name ] = true;
		}

		return name;
	}
};

// Retrieve booleans specially
jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {

	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = getSetInput && getSetAttribute || !ruseDefault.test( name ) ?
		function( elem, name, isXML ) {
			var ret, handle;
			if ( !isXML ) {
				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[ name ];
				attrHandle[ name ] = ret;
				ret = getter( elem, name, isXML ) != null ?
					name.toLowerCase() :
					null;
				attrHandle[ name ] = handle;
			}
			return ret;
		} :
		function( elem, name, isXML ) {
			if ( !isXML ) {
				return elem[ jQuery.camelCase( "default-" + name ) ] ?
					name.toLowerCase() :
					null;
			}
		};
});

// fix oldIE attroperties
if ( !getSetInput || !getSetAttribute ) {
	jQuery.attrHooks.value = {
		set: function( elem, value, name ) {
			if ( jQuery.nodeName( elem, "input" ) ) {
				// Does not return so that setAttribute is also used
				elem.defaultValue = value;
			} else {
				// Use nodeHook if defined (#1954); otherwise setAttribute is fine
				return nodeHook && nodeHook.set( elem, value, name );
			}
		}
	};
}

// IE6/7 do not support getting/setting some attributes with get/setAttribute
if ( !getSetAttribute ) {

	// Use this for any attribute in IE6/7
	// This fixes almost every IE6/7 issue
	nodeHook = {
		set: function( elem, value, name ) {
			// Set the existing or create a new attribute node
			var ret = elem.getAttributeNode( name );
			if ( !ret ) {
				elem.setAttributeNode(
					(ret = elem.ownerDocument.createAttribute( name ))
				);
			}

			ret.value = value += "";

			// Break association with cloned elements by also using setAttribute (#9646)
			if ( name === "value" || value === elem.getAttribute( name ) ) {
				return value;
			}
		}
	};

	// Some attributes are constructed with empty-string values when not defined
	attrHandle.id = attrHandle.name = attrHandle.coords =
		function( elem, name, isXML ) {
			var ret;
			if ( !isXML ) {
				return (ret = elem.getAttributeNode( name )) && ret.value !== "" ?
					ret.value :
					null;
			}
		};

	// Fixing value retrieval on a button requires this module
	jQuery.valHooks.button = {
		get: function( elem, name ) {
			var ret = elem.getAttributeNode( name );
			if ( ret && ret.specified ) {
				return ret.value;
			}
		},
		set: nodeHook.set
	};

	// Set contenteditable to false on removals(#10429)
	// Setting to empty string throws an error as an invalid value
	jQuery.attrHooks.contenteditable = {
		set: function( elem, value, name ) {
			nodeHook.set( elem, value === "" ? false : value, name );
		}
	};

	// Set width and height to auto instead of 0 on empty string( Bug #8150 )
	// This is for removals
	jQuery.each([ "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = {
			set: function( elem, value ) {
				if ( value === "" ) {
					elem.setAttribute( name, "auto" );
					return value;
				}
			}
		};
	});
}

if ( !support.style ) {
	jQuery.attrHooks.style = {
		get: function( elem ) {
			// Return undefined in the case of empty string
			// Note: IE uppercases css property names, but if we were to .toLowerCase()
			// .cssText, that would destroy case senstitivity in URL's, like in "background"
			return elem.style.cssText || undefined;
		},
		set: function( elem, value ) {
			return ( elem.style.cssText = value + "" );
		}
	};
}




var rfocusable = /^(?:input|select|textarea|button|object)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend({
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		name = jQuery.propFix[ name ] || name;
		return this.each(function() {
			// try/catch handles cases where IE balks (such as removing a property on window)
			try {
				this[ name ] = undefined;
				delete this[ name ];
			} catch( e ) {}
		});
	}
});

jQuery.extend({
	propFix: {
		"for": "htmlFor",
		"class": "className"
	},

	prop: function( elem, name, value ) {
		var ret, hooks, notxml,
			nType = elem.nodeType;

		// don't get/set properties on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		if ( notxml ) {
			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			return hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ?
				ret :
				( elem[ name ] = value );

		} else {
			return hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ?
				ret :
				elem[ name ];
		}
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {
				// elem.tabIndex doesn't always return the correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				return tabindex ?
					parseInt( tabindex, 10 ) :
					rfocusable.test( elem.nodeName ) || rclickable.test( elem.nodeName ) && elem.href ?
						0 :
						-1;
			}
		}
	}
});

// Some attributes require a special call on IE
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !support.hrefNormalized ) {
	// href/src property should get the full normalized URL (#10299/#12915)
	jQuery.each([ "href", "src" ], function( i, name ) {
		jQuery.propHooks[ name ] = {
			get: function( elem ) {
				return elem.getAttribute( name, 4 );
			}
		};
	});
}

// Support: Safari, IE9+
// mis-reports the default selected property of an option
// Accessing the parent's selectedIndex property fixes it
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;

			if ( parent ) {
				parent.selectedIndex;

				// Make sure that it also works with optgroups, see #5701
				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
			return null;
		}
	};
}

jQuery.each([
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
});

// IE6/7 call enctype encoding
if ( !support.enctype ) {
	jQuery.propFix.enctype = "encoding";
}




var rclass = /[\t\r\n\f]/g;

jQuery.fn.extend({
	addClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			i = 0,
			len = this.length,
			proceed = typeof value === "string" && value;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).addClass( value.call( this, j, this.className ) );
			});
		}

		if ( proceed ) {
			// The disjunction here is for better compressibility (see removeClass)
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					" "
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			i = 0,
			len = this.length,
			proceed = arguments.length === 0 || typeof value === "string" && value;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).removeClass( value.call( this, j, this.className ) );
			});
		}
		if ( proceed ) {
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					""
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) >= 0 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = value ? jQuery.trim( cur ) : "";
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( i ) {
				jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
			});
		}

		return this.each(function() {
			if ( type === "string" ) {
				// toggle individual class names
				var className,
					i = 0,
					self = jQuery( this ),
					classNames = value.match( rnotwhite ) || [];

				while ( (className = classNames[ i++ ]) ) {
					// check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( type === strundefined || type === "boolean" ) {
				if ( this.className ) {
					// store className if set
					jQuery._data( this, "__className__", this.className );
				}

				// If the element has a class name or if we're passed "false",
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				this.className = this.className || value === false ? "" : jQuery._data( this, "__className__" ) || "";
			}
		});
	},

	hasClass: function( selector ) {
		var className = " " + selector + " ",
			i = 0,
			l = this.length;
		for ( ; i < l; i++ ) {
			if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) >= 0 ) {
				return true;
			}
		}

		return false;
	}
});




// Return jQuery for attributes-only inclusion


jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
});

jQuery.fn.extend({
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	},

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {
		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ? this.off( selector, "**" ) : this.off( types, selector || "**", fn );
	}
});


var nonce = jQuery.now();

var rquery = (/\?/);



var rvalidtokens = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;

jQuery.parseJSON = function( data ) {
	// Attempt to parse using the native JSON parser first
	if ( window.JSON && window.JSON.parse ) {
		// Support: Android 2.3
		// Workaround failure to string-cast null input
		return window.JSON.parse( data + "" );
	}

	var requireNonComma,
		depth = null,
		str = jQuery.trim( data + "" );

	// Guard against invalid (and possibly dangerous) input by ensuring that nothing remains
	// after removing valid tokens
	return str && !jQuery.trim( str.replace( rvalidtokens, function( token, comma, open, close ) {

		// Force termination if we see a misplaced comma
		if ( requireNonComma && comma ) {
			depth = 0;
		}

		// Perform no more replacements after returning to outermost depth
		if ( depth === 0 ) {
			return token;
		}

		// Commas must not follow "[", "{", or ","
		requireNonComma = open || comma;

		// Determine new depth
		// array/object open ("[" or "{"): depth += true - false (increment)
		// array/object close ("]" or "}"): depth += false - true (decrement)
		// other cases ("," or primitive): depth += true - true (numeric cast)
		depth += !close - !open;

		// Remove this token
		return "";
	}) ) ?
		( Function( "return " + str ) )() :
		jQuery.error( "Invalid JSON: " + data );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, tmp;
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	try {
		if ( window.DOMParser ) { // Standard
			tmp = new DOMParser();
			xml = tmp.parseFromString( data, "text/xml" );
		} else { // IE
			xml = new ActiveXObject( "Microsoft.XMLDOM" );
			xml.async = "false";
			xml.loadXML( data );
		}
	} catch( e ) {
		xml = undefined;
	}
	if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	// Document location
	ajaxLocParts,
	ajaxLocation,

	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg, // IE leaves an \r character at EOL
	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat("*");

// #8138, IE may throw an exception when accessing
// a field from window.location if document.domain has been set
try {
	ajaxLocation = location.href;
} catch( e ) {
	// Use the href attribute of an A element
	// since IE will modify it given document.location
	ajaxLocation = document.createElement( "a" );
	ajaxLocation.href = "";
	ajaxLocation = ajaxLocation.href;
}

// Segment location into parts
ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {
			// For each dataType in the dataTypeExpression
			while ( (dataType = dataTypes[i++]) ) {
				// Prepend if requested
				if ( dataType.charAt( 0 ) === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					(structure[ dataType ] = structure[ dataType ] || []).unshift( func );

				// Otherwise append
				} else {
					(structure[ dataType ] = structure[ dataType ] || []).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[ dataTypeOrTransport ] ) {
				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		});
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var deep, key,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || (deep = {}) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {
	var firstDataType, ct, finalDataType, type,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {
		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}
		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},
		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {
								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return { state: "parsererror", error: conv ? e : "No conversion from " + prev + " to " + current };
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend({

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /xml/,
			html: /html/,
			json: /json/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var // Cross-domain detection vars
			parts,
			// Loop variable
			i,
			// URL without anti-cache param
			cacheURL,
			// Response headers as string
			responseHeadersString,
			// timeout handle
			timeoutTimer,

			// To know if global events are to be dispatched
			fireGlobals,

			transport,
			// Response headers
			responseHeaders,
			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),
			// Callbacks context
			callbackContext = s.context || s,
			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context && ( callbackContext.nodeType || callbackContext.jquery ) ?
				jQuery( callbackContext ) :
				jQuery.event,
			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks("once memory"),
			// Status-dependent callbacks
			statusCode = s.statusCode || {},
			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},
			// The jqXHR state
			state = 0,
			// Default abort message
			strAbort = "canceled",
			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( (match = rheaders.exec( responseHeadersString )) ) {
								responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {
								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {
							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" ).replace( rhash, "" ).replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		fireGlobals = s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger("ajaxStart");
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );
				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
				s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
			// Abort if not done already and return
			return jqXHR.abort();
		}

		// aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}
			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = setTimeout(function() {
					jqXHR.abort("timeout");
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {
				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );
				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader("Last-Modified");
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader("etag");
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {
				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger("ajaxStop");
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
});

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {
		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		return jQuery.ajax({
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		});
	};
});

// Attach a bunch of functions for handling common AJAX events
jQuery.each( [ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
});


jQuery._evalUrl = function( url ) {
	return jQuery.ajax({
		url: url,
		type: "GET",
		dataType: "script",
		async: false,
		global: false,
		"throws": true
	});
};


jQuery.fn.extend({
	wrapAll: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapAll( html.call(this, i) );
			});
		}

		if ( this[0] ) {
			// The elements to wrap the target around
			var wrap = jQuery( html, this[0].ownerDocument ).eq(0).clone(true);

			if ( this[0].parentNode ) {
				wrap.insertBefore( this[0] );
			}

			wrap.map(function() {
				var elem = this;

				while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
					elem = elem.firstChild;
				}

				return elem;
			}).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapInner( html.call(this, i) );
			});
		}

		return this.each(function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		});
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each(function(i) {
			jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );
		});
	},

	unwrap: function() {
		return this.parent().each(function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		}).end();
	}
});


jQuery.expr.filters.hidden = function( elem ) {
	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return elem.offsetWidth <= 0 && elem.offsetHeight <= 0 ||
		(!support.reliableHiddenOffsets() &&
			((elem.style && elem.style.display) || jQuery.css( elem, "display" )) === "none");
};

jQuery.expr.filters.visible = function( elem ) {
	return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {
		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {
				// Treat each array item as a scalar.
				add( prefix, v );

			} else {
				// Item is non-scalar (array or object), encode its numeric index.
				buildParams( prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, traditional, add );
			}
		});

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {
		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {
		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {
			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		});

	} else {
		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend({
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map(function() {
			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		})
		.filter(function() {
			var type = this.type;
			// Use .is(":disabled") so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		})
		.map(function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					}) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		}).get();
	}
});


// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
jQuery.ajaxSettings.xhr = window.ActiveXObject !== undefined ?
	// Support: IE6+
	function() {

		// XHR cannot access local files, always use ActiveX for that case
		return !this.isLocal &&

			// Support: IE7-8
			// oldIE XHR does not support non-RFC2616 methods (#13240)
			// See http://msdn.microsoft.com/en-us/library/ie/ms536648(v=vs.85).aspx
			// and http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9
			// Although this check for six methods instead of eight
			// since IE also does not support "trace" and "connect"
			/^(get|post|head|put|delete|options)$/i.test( this.type ) &&

			createStandardXHR() || createActiveXHR();
	} :
	// For all other browsers, use the standard XMLHttpRequest object
	createStandardXHR;

var xhrId = 0,
	xhrCallbacks = {},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE<10
// Open requests must be manually aborted on unload (#5280)
if ( window.ActiveXObject ) {
	jQuery( window ).on( "unload", function() {
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]( undefined, true );
		}
	});
}

// Determine support properties
support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
xhrSupported = support.ajax = !!xhrSupported;

// Create transport if the browser can provide an xhr
if ( xhrSupported ) {

	jQuery.ajaxTransport(function( options ) {
		// Cross domain only allowed if supported through XMLHttpRequest
		if ( !options.crossDomain || support.cors ) {

			var callback;

			return {
				send: function( headers, complete ) {
					var i,
						xhr = options.xhr(),
						id = ++xhrId;

					// Open the socket
					xhr.open( options.type, options.url, options.async, options.username, options.password );

					// Apply custom fields if provided
					if ( options.xhrFields ) {
						for ( i in options.xhrFields ) {
							xhr[ i ] = options.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( options.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( options.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !options.crossDomain && !headers["X-Requested-With"] ) {
						headers["X-Requested-With"] = "XMLHttpRequest";
					}

					// Set headers
					for ( i in headers ) {
						// Support: IE<9
						// IE's ActiveXObject throws a 'Type Mismatch' exception when setting
						// request header to a null-value.
						//
						// To keep consistent with other XHR implementations, cast the value
						// to string and ignore `undefined`.
						if ( headers[ i ] !== undefined ) {
							xhr.setRequestHeader( i, headers[ i ] + "" );
						}
					}

					// Do send the request
					// This may raise an exception which is actually
					// handled in jQuery.ajax (so no try/catch here)
					xhr.send( ( options.hasContent && options.data ) || null );

					// Listener
					callback = function( _, isAbort ) {
						var status, statusText, responses;

						// Was never called and is aborted or complete
						if ( callback && ( isAbort || xhr.readyState === 4 ) ) {
							// Clean up
							delete xhrCallbacks[ id ];
							callback = undefined;
							xhr.onreadystatechange = jQuery.noop;

							// Abort manually if needed
							if ( isAbort ) {
								if ( xhr.readyState !== 4 ) {
									xhr.abort();
								}
							} else {
								responses = {};
								status = xhr.status;

								// Support: IE<10
								// Accessing binary-data responseText throws an exception
								// (#11426)
								if ( typeof xhr.responseText === "string" ) {
									responses.text = xhr.responseText;
								}

								// Firefox throws an exception when accessing
								// statusText for faulty cross-domain requests
								try {
									statusText = xhr.statusText;
								} catch( e ) {
									// We normalize with Webkit giving an empty statusText
									statusText = "";
								}

								// Filter status for non standard behaviors

								// If the request is local and we have data: assume a success
								// (success with no data won't get notified, that's the best we
								// can do given current implementations)
								if ( !status && options.isLocal && !options.crossDomain ) {
									status = responses.text ? 200 : 404;
								// IE - #1450: sometimes returns 1223 when it should be 204
								} else if ( status === 1223 ) {
									status = 204;
								}
							}
						}

						// Call complete if needed
						if ( responses ) {
							complete( status, statusText, responses, xhr.getAllResponseHeaders() );
						}
					};

					if ( !options.async ) {
						// if we're in sync mode we fire the callback
						callback();
					} else if ( xhr.readyState === 4 ) {
						// (IE6 & IE7) if it's in cache and has been
						// retrieved directly we need to fire the callback
						setTimeout( callback );
					} else {
						// Add to the list of active xhr callbacks
						xhr.onreadystatechange = xhrCallbacks[ id ] = callback;
					}
				},

				abort: function() {
					if ( callback ) {
						callback( undefined, true );
					}
				}
			};
		}
	});
}

// Functions to create xhrs
function createStandardXHR() {
	try {
		return new window.XMLHttpRequest();
	} catch( e ) {}
}

function createActiveXHR() {
	try {
		return new window.ActiveXObject( "Microsoft.XMLHTTP" );
	} catch( e ) {}
}




// Install script dataType
jQuery.ajaxSetup({
	accepts: {
		script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /(?:java|ecma)script/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
});

// Handle cache's special case and global
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
		s.global = false;
	}
});

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function(s) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {

		var script,
			head = document.head || jQuery("head")[0] || document.documentElement;

		return {

			send: function( _, callback ) {

				script = document.createElement("script");

				script.async = true;

				if ( s.scriptCharset ) {
					script.charset = s.scriptCharset;
				}

				script.src = s.url;

				// Attach handlers for all browsers
				script.onload = script.onreadystatechange = function( _, isAbort ) {

					if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {

						// Handle memory leak in IE
						script.onload = script.onreadystatechange = null;

						// Remove the script
						if ( script.parentNode ) {
							script.parentNode.removeChild( script );
						}

						// Dereference the script
						script = null;

						// Callback if not abort
						if ( !isAbort ) {
							callback( 200, "success" );
						}
					}
				};

				// Circumvent IE6 bugs with base elements (#2709 and #4378) by prepending
				// Use native DOM manipulation to avoid our domManip AJAX trickery
				head.insertBefore( script, head.firstChild );
			},

			abort: function() {
				if ( script ) {
					script.onload( undefined, true );
				}
			}
		};
	}
});




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup({
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
});

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" && !( s.contentType || "" ).indexOf("application/x-www-form-urlencoded") && rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters["script json"] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always(function() {
			// Restore preexisting value
			window[ callbackName ] = overwritten;

			// Save back as free
			if ( s[ callbackName ] ) {
				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		});

		// Delegate to script
		return "script";
	}
});




// data: string of html
// context (optional): If specified, the fragment will be created in this context, defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}
	context = context || document;

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[1] ) ];
	}

	parsed = jQuery.buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, response, type,
		self = this,
		off = url.indexOf(" ");

	if ( off >= 0 ) {
		selector = jQuery.trim( url.slice( off, url.length ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax({
			url: url,

			// if "type" variable is undefined, then "GET" method will be used
			type: type,
			dataType: "html",
			data: params
		}).done(function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery("<div>").append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		}).complete( callback && function( jqXHR, status ) {
			self.each( callback, response || [ jqXHR.responseText, status, jqXHR ] );
		});
	}

	return this;
};




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep(jQuery.timers, function( fn ) {
		return elem === fn.elem;
	}).length;
};





var docElem = window.document.documentElement;

/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ?
		elem :
		elem.nodeType === 9 ?
			elem.defaultView || elem.parentWindow :
			false;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			jQuery.inArray("auto", [ curCSSTop, curCSSLeft ] ) > -1;

		// need to be able to calculate position if either top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;
		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {
			options = options.call( elem, i, curOffset );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );
		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend({
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each(function( i ) {
					jQuery.offset.setOffset( this, options, i );
				});
		}

		var docElem, win,
			box = { top: 0, left: 0 },
			elem = this[ 0 ],
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		// If we don't have gBCR, just use 0,0 rather than error
		// BlackBerry 5, iOS 3 (original iPhone)
		if ( typeof elem.getBoundingClientRect !== strundefined ) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow( doc );
		return {
			top: box.top  + ( win.pageYOffset || docElem.scrollTop )  - ( docElem.clientTop  || 0 ),
			left: box.left + ( win.pageXOffset || docElem.scrollLeft ) - ( docElem.clientLeft || 0 )
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			parentOffset = { top: 0, left: 0 },
			elem = this[ 0 ];

		// fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {
			// we assume that getBoundingClientRect is available when computed position is fixed
			offset = elem.getBoundingClientRect();
		} else {
			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top  += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		// note: when an element has margin: auto the offsetLeft and marginLeft
		// are the same in Safari causing offset.left to incorrectly be 0
		return {
			top:  offset.top  - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true)
		};
	},

	offsetParent: function() {
		return this.map(function() {
			var offsetParent = this.offsetParent || docElem;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) && jQuery.css( offsetParent, "position" ) === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}
			return offsetParent || docElem;
		});
	}
});

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = /Y/.test( prop );

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? (prop in win) ? win[ prop ] :
					win.document.documentElement[ method ] :
					elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : jQuery( win ).scrollLeft(),
					top ? val : jQuery( win ).scrollTop()
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
});

// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// getComputedStyle returns percent when specified for top/left/bottom/right
// rather than make the css module depend on the offset module, we just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );
				// if curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
});


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name }, function( defaultExtra, funcName ) {
		// margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {
					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height], whichever is greatest
					// unfortunately, this causes bug #3838 in IE6/8 only, but there is currently no good, small way to fix it.
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?
					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	});
});


// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	});
}




var
	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in
// AMD (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( typeof noGlobal === strundefined ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;

}));

// VERSION: 2.3 LAST UPDATE: 11.07.2013
/* 
 * Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php
 * 
 * Made by Wilq32, wilq32@gmail.com, Wroclaw, Poland, 01.2009
 * Website: http://code.google.com/p/jqueryrotate/ 
 */

(function($) {
    var supportedCSS,supportedCSSOrigin, styles=document.getElementsByTagName("head")[0].style,toCheck="transformProperty WebkitTransform OTransform msTransform MozTransform".split(" ");
    for (var a = 0; a < toCheck.length; a++) if (styles[toCheck[a]] !== undefined) { supportedCSS = toCheck[a]; }
    if (supportedCSS) {
      supportedCSSOrigin = supportedCSS.replace(/[tT]ransform/,"TransformOrigin");
      if (supportedCSSOrigin[0] == "T") supportedCSSOrigin[0] = "t";
    }

    // Bad eval to preven google closure to remove it from code o_O
    eval('IE = "v"=="\v"');

    jQuery.fn.extend({
        rotate:function(parameters)
        {
          if (this.length===0||typeof parameters=="undefined") return;
          if (typeof parameters=="number") parameters={angle:parameters};
          var returned=[];
          for (var i=0,i0=this.length;i<i0;i++)
          {
            var element=this.get(i);	
            if (!element.Wilq32 || !element.Wilq32.PhotoEffect) {

              var paramClone = $.extend(true, {}, parameters); 
              var newRotObject = new Wilq32.PhotoEffect(element,paramClone)._rootObj;

              returned.push($(newRotObject));
            }
            else {
              element.Wilq32.PhotoEffect._handleRotation(parameters);
            }
          }
          return returned;
        },
        getRotateAngle: function(){
          var ret = [];
          for (var i=0,i0=this.length;i<i0;i++)
          {
            var element=this.get(i);	
            if (element.Wilq32 && element.Wilq32.PhotoEffect) {
              ret[i] = element.Wilq32.PhotoEffect._angle;
            }
          }
          return ret;
        },
        stopRotate: function(){
          for (var i=0,i0=this.length;i<i0;i++)
          {
            var element=this.get(i);	
            if (element.Wilq32 && element.Wilq32.PhotoEffect) {
              clearTimeout(element.Wilq32.PhotoEffect._timer);
            }
          }
        }
    });

    // Library agnostic interface

    Wilq32=window.Wilq32||{};
    Wilq32.PhotoEffect=(function(){

      if (supportedCSS) {
        return function(img,parameters){
          img.Wilq32 = {
            PhotoEffect: this
          };

          this._img = this._rootObj = this._eventObj = img;
          this._handleRotation(parameters);
        }
      } else {
        return function(img,parameters) {
          this._img = img;
          this._onLoadDelegate = [parameters];

          this._rootObj=document.createElement('span');
          this._rootObj.style.display="inline-block";
          this._rootObj.Wilq32 = 
            {
              PhotoEffect: this
            };
          img.parentNode.insertBefore(this._rootObj,img);

          if (img.complete) {
            this._Loader();
          } else {
            var self=this;
            // TODO: Remove jQuery dependency
            jQuery(this._img).bind("load", function(){ self._Loader(); });
          }
        }
      }
    })();

    Wilq32.PhotoEffect.prototype = {
      _setupParameters : function (parameters){
        this._parameters = this._parameters || {};
        if (typeof this._angle !== "number") { this._angle = 0 ; }
        if (typeof parameters.angle==="number") { this._angle = parameters.angle; }
        this._parameters.animateTo = (typeof parameters.animateTo === "number") ? (parameters.animateTo) : (this._angle); 

        this._parameters.step = parameters.step || this._parameters.step || null;
        this._parameters.easing = parameters.easing || this._parameters.easing || this._defaultEasing;
        this._parameters.duration = parameters.duration || this._parameters.duration || 1000;
        this._parameters.callback = parameters.callback || this._parameters.callback || this._emptyFunction;
        this._parameters.center = parameters.center || this._parameters.center || ["50%","50%"];
        if (typeof this._parameters.center[0] == "string") {
          this._rotationCenterX = (parseInt(this._parameters.center[0],10) / 100) * this._imgWidth * this._aspectW;
        } else {
          this._rotationCenterX = this._parameters.center[0];
        }
        if (typeof this._parameters.center[1] == "string") {
          this._rotationCenterY = (parseInt(this._parameters.center[1],10) / 100) * this._imgHeight * this._aspectH;
        } else {
          this._rotationCenterY = this._parameters.center[1];
        }

        if (parameters.bind && parameters.bind != this._parameters.bind) { this._BindEvents(parameters.bind); }
      },
      _emptyFunction: function(){},
      _defaultEasing: function (x, t, b, c, d) { return -c * ((t=t/d-1)*t*t*t - 1) + b }, 
      _handleRotation : function(parameters, dontcheck){
        if (!supportedCSS && !this._img.complete && !dontcheck) {
          this._onLoadDelegate.push(parameters);
          return;
        }
        this._setupParameters(parameters);
        if (this._angle==this._parameters.animateTo) {
          this._rotate(this._angle);
        }
        else { 
          this._animateStart();          
        }
      },

      _BindEvents:function(events){
        if (events && this._eventObj) 
        {
          // Unbinding previous Events
          if (this._parameters.bind){
            var oldEvents = this._parameters.bind;
            for (var a in oldEvents) if (oldEvents.hasOwnProperty(a)) 
              // TODO: Remove jQuery dependency
              jQuery(this._eventObj).unbind(a,oldEvents[a]);
          }

        this._parameters.bind = events;
        for (var a in events) if (events.hasOwnProperty(a)) 
          // TODO: Remove jQuery dependency
          jQuery(this._eventObj).bind(a,events[a]);
        }
      },

      _Loader:(function()
      {
        if (IE)
          return function() {
            var width=this._img.width;
            var height=this._img.height;
            this._imgWidth = width;
            this._imgHeight = height; 
            this._img.parentNode.removeChild(this._img);

            this._vimage = this.createVMLNode('image');
            this._vimage.src=this._img.src;
            this._vimage.style.height=height+"px";
            this._vimage.style.width=width+"px";
            this._vimage.style.position="absolute"; // FIXES IE PROBLEM - its only rendered if its on absolute position!
            this._vimage.style.top = "0px";
            this._vimage.style.left = "0px";
            this._aspectW = this._aspectH = 1;

            /* Group minifying a small 1px precision problem when rotating object */
            this._container = this.createVMLNode('group');
            this._container.style.width=width;
            this._container.style.height=height;
            this._container.style.position="absolute";
            this._container.style.top="0px";
            this._container.style.left="0px";
            this._container.setAttribute('coordsize',width-1+','+(height-1)); // This -1, -1 trying to fix ugly problem with small displacement on IE
            this._container.appendChild(this._vimage);

            this._rootObj.appendChild(this._container);
            this._rootObj.style.position="relative"; // FIXES IE PROBLEM
            this._rootObj.style.width=width+"px";
            this._rootObj.style.height=height+"px";
            this._rootObj.setAttribute('id',this._img.getAttribute('id'));
            this._rootObj.className=this._img.className;			
            this._eventObj = this._rootObj;	
            var parameters;
            while (parameters = this._onLoadDelegate.shift()) {
              this._handleRotation(parameters, true);	
            }
          }
          else return function () {
            this._rootObj.setAttribute('id',this._img.getAttribute('id'));
            this._rootObj.className=this._img.className;

            this._imgWidth=this._img.naturalWidth;
            this._imgHeight=this._img.naturalHeight;
            var _widthMax=Math.sqrt((this._imgHeight)*(this._imgHeight) + (this._imgWidth) * (this._imgWidth));
            this._width = _widthMax * 3;
            this._height = _widthMax * 3;

            this._aspectW = this._img.offsetWidth/this._img.naturalWidth;
            this._aspectH = this._img.offsetHeight/this._img.naturalHeight;

            this._img.parentNode.removeChild(this._img);	


            this._canvas=document.createElement('canvas');
            this._canvas.setAttribute('width',this._width);
            this._canvas.style.position="relative";
            this._canvas.style.left = -this._img.height * this._aspectW + "px";
            this._canvas.style.top = -this._img.width * this._aspectH + "px";
            this._canvas.Wilq32 = this._rootObj.Wilq32;

            this._rootObj.appendChild(this._canvas);
            this._rootObj.style.width=this._img.width*this._aspectW+"px";
            this._rootObj.style.height=this._img.height*this._aspectH+"px";
            this._eventObj = this._canvas;

            this._cnv=this._canvas.getContext('2d');
            var parameters;
            while (parameters = this._onLoadDelegate.shift()) {
              this._handleRotation(parameters, true);	
            }
          }
      })(),

      _animateStart:function()
      {	
        if (this._timer) {
          clearTimeout(this._timer);
        }
        this._animateStartTime = +new Date;
        this._animateStartAngle = this._angle;
        this._animate();
      },
      _animate:function()
      {
        var actualTime = +new Date;
        var checkEnd = actualTime - this._animateStartTime > this._parameters.duration;

        // TODO: Bug for animatedGif for static rotation ? (to test)
        if (checkEnd && !this._parameters.animatedGif) 
        {
          clearTimeout(this._timer);
        }
        else 
        {
          if (this._canvas||this._vimage||this._img) {
            var angle = this._parameters.easing(0, actualTime - this._animateStartTime, this._animateStartAngle, this._parameters.animateTo - this._animateStartAngle, this._parameters.duration);
            this._rotate((~~(angle*10))/10);
          }
          if (this._parameters.step) {
            this._parameters.step(this._angle);
          }
          var self = this;
          this._timer = setTimeout(function()
          {
            self._animate.call(self);
          }, 10);
        }

      // To fix Bug that prevents using recursive function in callback I moved this function to back
      if (this._parameters.callback && checkEnd){
        this._angle = this._parameters.animateTo;
        this._rotate(this._angle);
        this._parameters.callback.call(this._rootObj);
      }
      },

      _rotate : (function()
      {
        var rad = Math.PI/180;
        if (IE)
          return function(angle)
        {
          this._angle = angle;
          this._container.style.rotation=(angle%360)+"deg";
          this._vimage.style.top = -(this._rotationCenterY - this._imgHeight/2) + "px";
          this._vimage.style.left = -(this._rotationCenterX - this._imgWidth/2) + "px";
          this._container.style.top = this._rotationCenterY - this._imgHeight/2 + "px";
          this._container.style.left = this._rotationCenterX - this._imgWidth/2 + "px";

        }
          else if (supportedCSS)
          return function(angle){
            this._angle = angle;
            this._img.style[supportedCSS]="rotate("+(angle%360)+"deg)";
            this._img.style[supportedCSSOrigin]=this._parameters.center.join(" ");
          }
          else 
            return function(angle)
          {
            this._angle = angle;
            angle=(angle%360)* rad;
            // clear canvas	
            this._canvas.width = this._width;//+this._widthAdd;
            this._canvas.height = this._height;//+this._heightAdd;

            // REMEMBER: all drawings are read from backwards.. so first function is translate, then rotate, then translate, translate..
            this._cnv.translate(this._imgWidth*this._aspectW,this._imgHeight*this._aspectH);	// at least center image on screen
            this._cnv.translate(this._rotationCenterX,this._rotationCenterY);			// we move image back to its orginal 
            this._cnv.rotate(angle);										// rotate image
            this._cnv.translate(-this._rotationCenterX,-this._rotationCenterY);		// move image to its center, so we can rotate around its center
            this._cnv.scale(this._aspectW,this._aspectH); // SCALE - if needed ;)
            this._cnv.drawImage(this._img, 0, 0);							// First - we draw image
          }

      })()
      }

      if (IE)
      {
        Wilq32.PhotoEffect.prototype.createVMLNode=(function(){
          document.createStyleSheet().addRule(".rvml", "behavior:url(#default#VML)");
          try {
            !document.namespaces.rvml && document.namespaces.add("rvml", "urn:schemas-microsoft-com:vml");
            return function (tagName) {
              return document.createElement('<rvml:' + tagName + ' class="rvml">');
            };
          } catch (e) {
            return function (tagName) {
              return document.createElement('<' + tagName + ' xmlns="urn:schemas-microsoft.com:vml" class="rvml">');
            };
          }		
        })();
      }

})(jQuery);

/*! Video.js v4.6.4 Copyright 2014 Brightcove, Inc. https://github.com/videojs/video.js/blob/master/LICENSE */ 
(function() {var b=void 0,f=!0,j=null,l=!1;function m(){return function(){}}function q(a){return function(){return this[a]}}function r(a){return function(){return a}}var t;document.createElement("video");document.createElement("audio");document.createElement("track");function u(a,c,d){if("string"===typeof a){0===a.indexOf("#")&&(a=a.slice(1));if(u.Aa[a])return u.Aa[a];a=u.w(a)}if(!a||!a.nodeName)throw new TypeError("The element or ID supplied is not valid. (videojs)");return a.player||new u.Player(a,c,d)}
var videojs=u;window.je=window.ke=u;u.Ub="4.6";u.Pc="https:"==document.location.protocol?"https://":"http://";u.options={techOrder:["html5","flash"],html5:{},flash:{},width:300,height:150,defaultVolume:0,playbackRates:[],children:{mediaLoader:{},posterImage:{},textTrackDisplay:{},loadingSpinner:{},bigPlayButton:{},controlBar:{},errorDisplay:{}},notSupportedMessage:"No compatible source was found for this video."};"GENERATED_CDN_VSN"!==u.Ub&&(videojs.options.flash.swf=u.Pc+"vjs.zencdn.net/"+u.Ub+"/video-js.swf");
u.Aa={};"function"===typeof define&&define.amd?define([],function(){return videojs}):"object"===typeof exports&&"object"===typeof module&&(module.exports=videojs);u.pa=u.CoreObject=m();u.pa.extend=function(a){var c,d;a=a||{};c=a.init||a.h||this.prototype.init||this.prototype.h||m();d=function(){c.apply(this,arguments)};d.prototype=u.l.create(this.prototype);d.prototype.constructor=d;d.extend=u.pa.extend;d.create=u.pa.create;for(var e in a)a.hasOwnProperty(e)&&(d.prototype[e]=a[e]);return d};
u.pa.create=function(){var a=u.l.create(this.prototype);this.apply(a,arguments);return a};u.d=function(a,c,d){var e=u.getData(a);e.D||(e.D={});e.D[c]||(e.D[c]=[]);d.v||(d.v=u.v++);e.D[c].push(d);e.X||(e.disabled=l,e.X=function(c){if(!e.disabled){c=u.oc(c);var d=e.D[c.type];if(d)for(var d=d.slice(0),k=0,p=d.length;k<p&&!c.wc();k++)d[k].call(a,c)}});1==e.D[c].length&&(document.addEventListener?a.addEventListener(c,e.X,l):document.attachEvent&&a.attachEvent("on"+c,e.X))};
u.p=function(a,c,d){if(u.sc(a)){var e=u.getData(a);if(e.D)if(c){var g=e.D[c];if(g){if(d){if(d.v)for(e=0;e<g.length;e++)g[e].v===d.v&&g.splice(e--,1)}else e.D[c]=[];u.jc(a,c)}}else for(g in e.D)c=g,e.D[c]=[],u.jc(a,c)}};u.jc=function(a,c){var d=u.getData(a);0===d.D[c].length&&(delete d.D[c],document.removeEventListener?a.removeEventListener(c,d.X,l):document.detachEvent&&a.detachEvent("on"+c,d.X));u.Eb(d.D)&&(delete d.D,delete d.X,delete d.disabled);u.Eb(d)&&u.Dc(a)};
u.oc=function(a){function c(){return f}function d(){return l}if(!a||!a.Fb){var e=a||window.event;a={};for(var g in e)"layerX"!==g&&("layerY"!==g&&"keyboardEvent.keyLocation"!==g)&&("returnValue"==g&&e.preventDefault||(a[g]=e[g]));a.target||(a.target=a.srcElement||document);a.relatedTarget=a.fromElement===a.target?a.toElement:a.fromElement;a.preventDefault=function(){e.preventDefault&&e.preventDefault();a.returnValue=l;a.rd=c;a.defaultPrevented=f};a.rd=d;a.defaultPrevented=l;a.stopPropagation=function(){e.stopPropagation&&
e.stopPropagation();a.cancelBubble=f;a.Fb=c};a.Fb=d;a.stopImmediatePropagation=function(){e.stopImmediatePropagation&&e.stopImmediatePropagation();a.wc=c;a.stopPropagation()};a.wc=d;if(a.clientX!=j){g=document.documentElement;var h=document.body;a.pageX=a.clientX+(g&&g.scrollLeft||h&&h.scrollLeft||0)-(g&&g.clientLeft||h&&h.clientLeft||0);a.pageY=a.clientY+(g&&g.scrollTop||h&&h.scrollTop||0)-(g&&g.clientTop||h&&h.clientTop||0)}a.which=a.charCode||a.keyCode;a.button!=j&&(a.button=a.button&1?0:a.button&
4?1:a.button&2?2:0)}return a};u.k=function(a,c){var d=u.sc(a)?u.getData(a):{},e=a.parentNode||a.ownerDocument;"string"===typeof c&&(c={type:c,target:a});c=u.oc(c);d.X&&d.X.call(a,c);if(e&&!c.Fb()&&c.bubbles!==l)u.k(e,c);else if(!e&&!c.defaultPrevented&&(d=u.getData(c.target),c.target[c.type])){d.disabled=f;if("function"===typeof c.target[c.type])c.target[c.type]();d.disabled=l}return!c.defaultPrevented};
u.W=function(a,c,d){function e(){u.p(a,c,e);d.apply(this,arguments)}e.v=d.v=d.v||u.v++;u.d(a,c,e)};var v=Object.prototype.hasOwnProperty;u.e=function(a,c){var d,e;d=document.createElement(a||"div");for(e in c)v.call(c,e)&&(-1!==e.indexOf("aria-")||"role"==e?d.setAttribute(e,c[e]):d[e]=c[e]);return d};u.$=function(a){return a.charAt(0).toUpperCase()+a.slice(1)};u.l={};u.l.create=Object.create||function(a){function c(){}c.prototype=a;return new c};
u.l.wa=function(a,c,d){for(var e in a)v.call(a,e)&&c.call(d||this,e,a[e])};u.l.B=function(a,c){if(!c)return a;for(var d in c)v.call(c,d)&&(a[d]=c[d]);return a};u.l.fd=function(a,c){var d,e,g;a=u.l.copy(a);for(d in c)v.call(c,d)&&(e=a[d],g=c[d],a[d]=u.l.Sa(e)&&u.l.Sa(g)?u.l.fd(e,g):c[d]);return a};u.l.copy=function(a){return u.l.B({},a)};u.l.Sa=function(a){return!!a&&"object"===typeof a&&"[object Object]"===a.toString()&&a.constructor===Object};
u.bind=function(a,c,d){function e(){return c.apply(a,arguments)}c.v||(c.v=u.v++);e.v=d?d+"_"+c.v:c.v;return e};u.ta={};u.v=1;u.expando="vdata"+(new Date).getTime();u.getData=function(a){var c=a[u.expando];c||(c=a[u.expando]=u.v++,u.ta[c]={});return u.ta[c]};u.sc=function(a){a=a[u.expando];return!(!a||u.Eb(u.ta[a]))};u.Dc=function(a){var c=a[u.expando];if(c){delete u.ta[c];try{delete a[u.expando]}catch(d){a.removeAttribute?a.removeAttribute(u.expando):a[u.expando]=j}}};
u.Eb=function(a){for(var c in a)if(a[c]!==j)return l;return f};u.o=function(a,c){-1==(" "+a.className+" ").indexOf(" "+c+" ")&&(a.className=""===a.className?c:a.className+" "+c)};u.r=function(a,c){var d,e;if(-1!=a.className.indexOf(c)){d=a.className.split(" ");for(e=d.length-1;0<=e;e--)d[e]===c&&d.splice(e,1);a.className=d.join(" ")}};u.A=u.e("video");u.M=navigator.userAgent;u.Uc=/iPhone/i.test(u.M);u.Tc=/iPad/i.test(u.M);u.Vc=/iPod/i.test(u.M);u.Sc=u.Uc||u.Tc||u.Vc;var aa=u,w;var x=u.M.match(/OS (\d+)_/i);
w=x&&x[1]?x[1]:b;aa.Zd=w;u.Rc=/Android/i.test(u.M);var ba=u,y;var z=u.M.match(/Android (\d+)(?:\.(\d+))?(?:\.(\d+))*/i),A,B;z?(A=z[1]&&parseFloat(z[1]),B=z[2]&&parseFloat(z[2]),y=A&&B?parseFloat(z[1]+"."+z[2]):A?A:j):y=j;ba.Tb=y;u.Wc=u.Rc&&/webkit/i.test(u.M)&&2.3>u.Tb;u.Xb=/Firefox/i.test(u.M);u.$d=/Chrome/i.test(u.M);u.ec=!!("ontouchstart"in window||window.Qc&&document instanceof window.Qc);
u.Bb=function(a){var c,d,e,g;c={};if(a&&a.attributes&&0<a.attributes.length){d=a.attributes;for(var h=d.length-1;0<=h;h--){e=d[h].name;g=d[h].value;if("boolean"===typeof a[e]||-1!==",autoplay,controls,loop,muted,default,".indexOf(","+e+","))g=g!==j?f:l;c[e]=g}}return c};
u.ce=function(a,c){var d="";document.defaultView&&document.defaultView.getComputedStyle?d=document.defaultView.getComputedStyle(a,"").getPropertyValue(c):a.currentStyle&&(d=a["client"+c.substr(0,1).toUpperCase()+c.substr(1)]+"px");return d};u.Db=function(a,c){c.firstChild?c.insertBefore(a,c.firstChild):c.appendChild(a)};u.Na={};u.w=function(a){0===a.indexOf("#")&&(a=a.slice(1));return document.getElementById(a)};
u.ya=function(a,c){c=c||a;var d=Math.floor(a%60),e=Math.floor(a/60%60),g=Math.floor(a/3600),h=Math.floor(c/60%60),k=Math.floor(c/3600);if(isNaN(a)||Infinity===a)g=e=d="-";g=0<g||0<k?g+":":"";return g+(((g||10<=h)&&10>e?"0"+e:e)+":")+(10>d?"0"+d:d)};u.bd=function(){document.body.focus();document.onselectstart=r(l)};u.Td=function(){document.onselectstart=r(f)};u.trim=function(a){return(a+"").replace(/^\s+|\s+$/g,"")};u.round=function(a,c){c||(c=0);return Math.round(a*Math.pow(10,c))/Math.pow(10,c)};
u.yb=function(a,c){return{length:1,start:function(){return a},end:function(){return c}}};
u.get=function(a,c,d,e){var g,h,k,p;d=d||m();"undefined"===typeof XMLHttpRequest&&(window.XMLHttpRequest=function(){try{return new window.ActiveXObject("Msxml2.XMLHTTP.6.0")}catch(a){}try{return new window.ActiveXObject("Msxml2.XMLHTTP.3.0")}catch(c){}try{return new window.ActiveXObject("Msxml2.XMLHTTP")}catch(d){}throw Error("This browser does not support XMLHttpRequest.");});h=new XMLHttpRequest;k=u.Fd(a);p=window.location;k.protocol+k.host!==p.protocol+p.host&&window.XDomainRequest&&!("withCredentials"in
h)?(h=new window.XDomainRequest,h.onload=function(){c(h.responseText)},h.onerror=d,h.onprogress=m(),h.ontimeout=d):(g="file:"==k.protocol||"file:"==p.protocol,h.onreadystatechange=function(){4===h.readyState&&(200===h.status||g&&0===h.status?c(h.responseText):d(h.responseText))});try{h.open("GET",a,f),e&&(h.withCredentials=f)}catch(n){d(n);return}try{h.send()}catch(s){d(s)}};
u.Kd=function(a){try{var c=window.localStorage||l;c&&(c.volume=a)}catch(d){22==d.code||1014==d.code?u.log("LocalStorage Full (VideoJS)",d):18==d.code?u.log("LocalStorage not allowed (VideoJS)",d):u.log("LocalStorage Error (VideoJS)",d)}};u.qc=function(a){a.match(/^https?:\/\//)||(a=u.e("div",{innerHTML:'<a href="'+a+'">x</a>'}).firstChild.href);return a};
u.Fd=function(a){var c,d,e,g;g="protocol hostname port pathname search hash host".split(" ");d=u.e("a",{href:a});if(e=""===d.host&&"file:"!==d.protocol)c=u.e("div"),c.innerHTML='<a href="'+a+'"></a>',d=c.firstChild,c.setAttribute("style","display:none; position:absolute;"),document.body.appendChild(c);a={};for(var h=0;h<g.length;h++)a[g[h]]=d[g[h]];e&&document.body.removeChild(c);return a};function D(){}var E=window.console||{log:D,warn:D,error:D};
function F(a,c){var d=Array.prototype.slice.call(c);a?d.unshift(a.toUpperCase()+":"):a="log";u.log.history.push(d);d.unshift("VIDEOJS:");if(E[a].apply)E[a].apply(E,d);else E[a](d.join(" "))}u.log=function(){F(j,arguments)};u.log.history=[];u.log.error=function(){F("error",arguments)};u.log.warn=function(){F("warn",arguments)};
u.od=function(a){var c,d;a.getBoundingClientRect&&a.parentNode&&(c=a.getBoundingClientRect());if(!c)return{left:0,top:0};a=document.documentElement;d=document.body;return{left:u.round(c.left+(window.pageXOffset||d.scrollLeft)-(a.clientLeft||d.clientLeft||0)),top:u.round(c.top+(window.pageYOffset||d.scrollTop)-(a.clientTop||d.clientTop||0))}};u.oa={};u.oa.Jb=function(a,c){var d,e,g;a=u.l.copy(a);for(d in c)c.hasOwnProperty(d)&&(e=a[d],g=c[d],a[d]=u.l.Sa(e)&&u.l.Sa(g)?u.oa.Jb(e,g):c[d]);return a};
u.a=u.pa.extend({h:function(a,c,d){this.c=a;this.j=u.l.copy(this.j);c=this.options(c);this.T=c.id||(c.el&&c.el.id?c.el.id:a.id()+"_component_"+u.v++);this.wd=c.name||j;this.b=c.el||this.e();this.N=[];this.Oa={};this.Pa={};this.uc();this.J(d);if(c.Ec!==l){var e,g;e=u.bind(this.m(),this.m().reportUserActivity);this.d("touchstart",function(){e();clearInterval(g);g=setInterval(e,250)});a=function(){e();clearInterval(g)};this.d("touchmove",e);this.d("touchend",a);this.d("touchcancel",a)}}});t=u.a.prototype;
t.dispose=function(){this.k({type:"dispose",bubbles:l});if(this.N)for(var a=this.N.length-1;0<=a;a--)this.N[a].dispose&&this.N[a].dispose();this.Pa=this.Oa=this.N=j;this.p();this.b.parentNode&&this.b.parentNode.removeChild(this.b);u.Dc(this.b);this.b=j};t.c=f;t.m=q("c");t.options=function(a){return a===b?this.j:this.j=u.oa.Jb(this.j,a)};t.e=function(a,c){return u.e(a,c)};t.w=q("b");t.ia=function(){return this.u||this.b};t.id=q("T");t.name=q("wd");t.children=q("N");t.qd=function(a){return this.Oa[a]};
t.ja=function(a){return this.Pa[a]};t.V=function(a,c){var d,e;"string"===typeof a?(e=a,c=c||{},d=c.componentClass||u.$(e),c.name=e,d=new window.videojs[d](this.c||this,c)):d=a;this.N.push(d);"function"===typeof d.id&&(this.Oa[d.id()]=d);(e=e||d.name&&d.name())&&(this.Pa[e]=d);"function"===typeof d.el&&d.el()&&this.ia().appendChild(d.el());return d};
t.removeChild=function(a){"string"===typeof a&&(a=this.ja(a));if(a&&this.N){for(var c=l,d=this.N.length-1;0<=d;d--)if(this.N[d]===a){c=f;this.N.splice(d,1);break}c&&(this.Oa[a.id]=j,this.Pa[a.name]=j,(c=a.w())&&c.parentNode===this.ia()&&this.ia().removeChild(a.w()))}};t.uc=function(){var a,c,d,e;a=this;if(c=this.options().children)if(c instanceof Array)for(var g=0;g<c.length;g++)d=c[g],"string"==typeof d?(e=d,d={}):e=d.name,a[e]=a.V(e,d);else u.l.wa(c,function(c,d){d!==l&&(a[c]=a.V(c,d))})};t.S=r("");
t.d=function(a,c){u.d(this.b,a,u.bind(this,c));return this};t.p=function(a,c){u.p(this.b,a,c);return this};t.W=function(a,c){u.W(this.b,a,u.bind(this,c));return this};t.k=function(a,c){u.k(this.b,a,c);return this};t.J=function(a){a&&(this.ca?a.call(this):(this.Za===b&&(this.Za=[]),this.Za.push(a)));return this};t.Ea=function(){this.ca=f;var a=this.Za;if(a&&0<a.length){for(var c=0,d=a.length;c<d;c++)a[c].call(this);this.Za=[];this.k("ready")}};t.o=function(a){u.o(this.b,a);return this};
t.r=function(a){u.r(this.b,a);return this};t.show=function(){this.b.style.display="block";return this};t.G=function(){this.b.style.display="none";return this};function G(a){a.r("vjs-lock-showing")}t.disable=function(){this.G();this.show=m()};t.width=function(a,c){return H(this,"width",a,c)};t.height=function(a,c){return H(this,"height",a,c)};t.jd=function(a,c){return this.width(a,f).height(c)};
function H(a,c,d,e){if(d!==b)return a.b.style[c]=-1!==(""+d).indexOf("%")||-1!==(""+d).indexOf("px")?d:"auto"===d?"":d+"px",e||a.k("resize"),a;if(!a.b)return 0;d=a.b.style[c];e=d.indexOf("px");return-1!==e?parseInt(d.slice(0,e),10):parseInt(a.b["offset"+u.$(c)],10)}
function I(a){var c,d,e,g,h,k,p,n;c=0;d=j;a.d("touchstart",function(a){1===a.touches.length&&(d=a.touches[0],c=(new Date).getTime(),g=f)});a.d("touchmove",function(a){1<a.touches.length?g=l:d&&(k=a.touches[0].pageX-d.pageX,p=a.touches[0].pageY-d.pageY,n=Math.sqrt(k*k+p*p),22<n&&(g=l))});h=function(){g=l};a.d("touchleave",h);a.d("touchcancel",h);a.d("touchend",function(a){d=j;g===f&&(e=(new Date).getTime()-c,250>e&&(a.preventDefault(),this.k("tap")))})}
u.s=u.a.extend({h:function(a,c){u.a.call(this,a,c);I(this);this.d("tap",this.q);this.d("click",this.q);this.d("focus",this.Va);this.d("blur",this.Ua)}});t=u.s.prototype;
t.e=function(a,c){var d;c=u.l.B({className:this.S(),role:"button","aria-live":"polite",tabIndex:0},c);d=u.a.prototype.e.call(this,a,c);c.innerHTML||(this.u=u.e("div",{className:"vjs-control-content"}),this.wb=u.e("span",{className:"vjs-control-text",innerHTML:this.sa||"Need Text"}),this.u.appendChild(this.wb),d.appendChild(this.u));return d};t.S=function(){return"vjs-control "+u.a.prototype.S.call(this)};t.q=m();t.Va=function(){u.d(document,"keyup",u.bind(this,this.da))};
t.da=function(a){if(32==a.which||13==a.which)a.preventDefault(),this.q()};t.Ua=function(){u.p(document,"keyup",u.bind(this,this.da))};u.Q=u.a.extend({h:function(a,c){u.a.call(this,a,c);this.ad=this.ja(this.j.barName);this.handle=this.ja(this.j.handleName);this.d("mousedown",this.Wa);this.d("touchstart",this.Wa);this.d("focus",this.Va);this.d("blur",this.Ua);this.d("click",this.q);this.c.d("controlsvisible",u.bind(this,this.update));a.d(this.Ac,u.bind(this,this.update));this.R={}}});t=u.Q.prototype;
t.e=function(a,c){c=c||{};c.className+=" vjs-slider";c=u.l.B({role:"slider","aria-valuenow":0,"aria-valuemin":0,"aria-valuemax":100,tabIndex:0},c);return u.a.prototype.e.call(this,a,c)};t.Wa=function(a){a.preventDefault();u.bd();this.R.move=u.bind(this,this.Kb);this.R.end=u.bind(this,this.Lb);u.d(document,"mousemove",this.R.move);u.d(document,"mouseup",this.R.end);u.d(document,"touchmove",this.R.move);u.d(document,"touchend",this.R.end);this.Kb(a)};
t.Lb=function(){u.Td();u.p(document,"mousemove",this.R.move,l);u.p(document,"mouseup",this.R.end,l);u.p(document,"touchmove",this.R.move,l);u.p(document,"touchend",this.R.end,l);this.update()};t.update=function(){if(this.b){var a,c=this.Cb(),d=this.handle,e=this.ad;isNaN(c)&&(c=0);a=c;if(d){a=this.b.offsetWidth;var g=d.w().offsetWidth;a=g?g/a:0;c*=1-a;a=c+a/2;d.w().style.left=u.round(100*c,2)+"%"}e.w().style.width=u.round(100*a,2)+"%"}};
function J(a,c){var d,e,g,h;d=a.b;e=u.od(d);h=g=d.offsetWidth;d=a.handle;if(a.j.Vd)return h=e.top,e=c.changedTouches?c.changedTouches[0].pageY:c.pageY,d&&(d=d.w().offsetHeight,h+=d/2,g-=d),Math.max(0,Math.min(1,(h-e+g)/g));g=e.left;e=c.changedTouches?c.changedTouches[0].pageX:c.pageX;d&&(d=d.w().offsetWidth,g+=d/2,h-=d);return Math.max(0,Math.min(1,(e-g)/h))}t.Va=function(){u.d(document,"keyup",u.bind(this,this.da))};
t.da=function(a){37==a.which?(a.preventDefault(),this.Gc()):39==a.which&&(a.preventDefault(),this.Hc())};t.Ua=function(){u.p(document,"keyup",u.bind(this,this.da))};t.q=function(a){a.stopImmediatePropagation();a.preventDefault()};u.Y=u.a.extend();u.Y.prototype.defaultValue=0;u.Y.prototype.e=function(a,c){c=c||{};c.className+=" vjs-slider-handle";c=u.l.B({innerHTML:'<span class="vjs-control-text">'+this.defaultValue+"</span>"},c);return u.a.prototype.e.call(this,"div",c)};u.ga=u.a.extend();
function ca(a,c){a.V(c);c.d("click",u.bind(a,function(){G(this)}))}u.ga.prototype.e=function(){var a=this.options().kc||"ul";this.u=u.e(a,{className:"vjs-menu-content"});a=u.a.prototype.e.call(this,"div",{append:this.u,className:"vjs-menu"});a.appendChild(this.u);u.d(a,"click",function(a){a.preventDefault();a.stopImmediatePropagation()});return a};u.I=u.s.extend({h:function(a,c){u.s.call(this,a,c);this.selected(c.selected)}});
u.I.prototype.e=function(a,c){return u.s.prototype.e.call(this,"li",u.l.B({className:"vjs-menu-item",innerHTML:this.j.label},c))};u.I.prototype.q=function(){this.selected(f)};u.I.prototype.selected=function(a){a?(this.o("vjs-selected"),this.b.setAttribute("aria-selected",f)):(this.r("vjs-selected"),this.b.setAttribute("aria-selected",l))};
u.L=u.s.extend({h:function(a,c){u.s.call(this,a,c);this.za=this.va();this.V(this.za);this.O&&0===this.O.length&&this.G();this.d("keyup",this.da);this.b.setAttribute("aria-haspopup",f);this.b.setAttribute("role","button")}});t=u.L.prototype;t.ra=l;t.va=function(){var a=new u.ga(this.c);this.options().title&&a.ia().appendChild(u.e("li",{className:"vjs-menu-title",innerHTML:u.$(this.options().title),Rd:-1}));if(this.O=this.createItems())for(var c=0;c<this.O.length;c++)ca(a,this.O[c]);return a};
t.ua=m();t.S=function(){return this.className+" vjs-menu-button "+u.s.prototype.S.call(this)};t.Va=m();t.Ua=m();t.q=function(){this.W("mouseout",u.bind(this,function(){G(this.za);this.b.blur()}));this.ra?K(this):L(this)};t.da=function(a){a.preventDefault();32==a.which||13==a.which?this.ra?K(this):L(this):27==a.which&&this.ra&&K(this)};function L(a){a.ra=f;a.za.o("vjs-lock-showing");a.b.setAttribute("aria-pressed",f);a.O&&0<a.O.length&&a.O[0].w().focus()}
function K(a){a.ra=l;G(a.za);a.b.setAttribute("aria-pressed",l)}u.F=function(a){"number"===typeof a?this.code=a:"string"===typeof a?this.message=a:"object"===typeof a&&u.l.B(this,a);this.message||(this.message=u.F.gd[this.code]||"")};u.F.prototype.code=0;u.F.prototype.message="";u.F.prototype.status=j;u.F.Ra="MEDIA_ERR_CUSTOM MEDIA_ERR_ABORTED MEDIA_ERR_NETWORK MEDIA_ERR_DECODE MEDIA_ERR_SRC_NOT_SUPPORTED MEDIA_ERR_ENCRYPTED".split(" ");
u.F.gd={1:"You aborted the video playback",2:"A network error caused the video download to fail part-way.",3:"The video playback was aborted due to a corruption problem or because the video used features your browser did not support.",4:"The video could not be loaded, either because the server or network failed or because the format is not supported.",5:"The video is encrypted and we do not have the keys to decrypt it."};for(var M=0;M<u.F.Ra.length;M++)u.F[u.F.Ra[M]]=M,u.F.prototype[u.F.Ra[M]]=M;
var N,O,P,Q;
N=["requestFullscreen exitFullscreen fullscreenElement fullscreenEnabled fullscreenchange fullscreenerror".split(" "),"webkitRequestFullscreen webkitExitFullscreen webkitFullscreenElement webkitFullscreenEnabled webkitfullscreenchange webkitfullscreenerror".split(" "),"webkitRequestFullScreen webkitCancelFullScreen webkitCurrentFullScreenElement webkitCancelFullScreen webkitfullscreenchange webkitfullscreenerror".split(" "),"mozRequestFullScreen mozCancelFullScreen mozFullScreenElement mozFullScreenEnabled mozfullscreenchange mozfullscreenerror".split(" "),"msRequestFullscreen msExitFullscreen msFullscreenElement msFullscreenEnabled MSFullscreenChange MSFullscreenError".split(" ")];
O=N[0];for(Q=0;Q<N.length;Q++)if(N[Q][1]in document){P=N[Q];break}if(P){u.Na.Ab={};for(Q=0;Q<P.length;Q++)u.Na.Ab[O[Q]]=P[Q]}
u.Player=u.a.extend({h:function(a,c,d){this.P=a;a.id=a.id||"vjs_video_"+u.v++;c=u.l.B(da(a),c);this.z={};this.Bc=c.poster;this.xb=c.controls;a.controls=l;c.Ec=l;u.a.call(this,this,c,d);this.controls()?this.o("vjs-controls-enabled"):this.o("vjs-controls-disabled");u.Aa[this.T]=this;c.plugins&&u.l.wa(c.plugins,function(a,c){this[a](c)},this);var e,g,h,k,p,n;e=u.bind(this,this.reportUserActivity);this.d("mousedown",function(){e();clearInterval(g);g=setInterval(e,250)});this.d("mousemove",function(a){if(a.screenX!=
p||a.screenY!=n)p=a.screenX,n=a.screenY,e()});this.d("mouseup",function(){e();clearInterval(g)});this.d("keydown",e);this.d("keyup",e);h=setInterval(u.bind(this,function(){this.na&&(this.na=l,this.userActive(f),clearTimeout(k),k=setTimeout(u.bind(this,function(){this.na||this.userActive(l)}),2E3))}),250);this.d("dispose",function(){clearInterval(h);clearTimeout(k)})}});t=u.Player.prototype;t.j=u.options;
t.dispose=function(){this.k("dispose");this.p("dispose");u.Aa[this.T]=j;this.P&&this.P.player&&(this.P.player=j);this.b&&this.b.player&&(this.b.player=j);clearInterval(this.Ya);this.Ba();this.g&&this.g.dispose();u.a.prototype.dispose.call(this)};function da(a){var c={sources:[],tracks:[]};u.l.B(c,u.Bb(a));if(a.hasChildNodes()){var d,e,g,h;a=a.childNodes;g=0;for(h=a.length;g<h;g++)d=a[g],e=d.nodeName.toLowerCase(),"source"===e?c.sources.push(u.Bb(d)):"track"===e&&c.tracks.push(u.Bb(d))}return c}
t.e=function(){var a=this.b=u.a.prototype.e.call(this,"div"),c=this.P;c.removeAttribute("width");c.removeAttribute("height");if(c.hasChildNodes()){var d,e,g,h,k;d=c.childNodes;e=d.length;for(k=[];e--;)g=d[e],h=g.nodeName.toLowerCase(),"track"===h&&k.push(g);for(d=0;d<k.length;d++)c.removeChild(k[d])}a.id=c.id;a.className=c.className;c.id+="_html5_api";c.className="vjs-tech";c.player=a.player=this;this.o("vjs-paused");this.width(this.j.width,f);this.height(this.j.height,f);c.parentNode&&c.parentNode.insertBefore(a,
c);u.Db(c,a);this.b=a;this.d("loadstart",this.Bd);this.d("ended",this.xd);this.d("play",this.Nb);this.d("firstplay",this.zd);this.d("pause",this.Mb);this.d("progress",this.Cd);this.d("durationchange",this.yc);this.d("fullscreenchange",this.Ad);return a};
function R(a,c,d){a.g&&(a.ca=l,a.g.dispose(),a.Hb&&(a.Hb=l,clearInterval(a.Ya)),a.Ib&&S(a),a.g=l);"Html5"!==c&&a.P&&(u.f.mc(a.P),a.P=j);a.Ca=c;a.ca=l;var e=u.l.B({source:d,parentEl:a.b},a.j[c.toLowerCase()]);d&&(d.src==a.z.src&&0<a.z.currentTime&&(e.startTime=a.z.currentTime),a.z.src=d.src);a.g=new window.videojs[c](a,e);a.g.J(function(){this.c.Ea();if(!this.n.progressEvents){var a=this.c;a.Hb=f;a.Ya=setInterval(u.bind(a,function(){this.z.sb<this.buffered().end(0)?this.k("progress"):1==this.bufferedPercent()&&
(clearInterval(this.Ya),this.k("progress"))}),500);a.g&&a.g.W("progress",function(){this.n.progressEvents=f;var a=this.c;a.Hb=l;clearInterval(a.Ya)})}this.n.timeupdateEvents||(a=this.c,a.Ib=f,a.d("play",a.Kc),a.d("pause",a.Ba),a.g&&a.g.W("timeupdate",function(){this.n.timeupdateEvents=f;S(this.c)}))})}function S(a){a.Ib=l;a.Ba();a.p("play",a.Kc);a.p("pause",a.Ba)}t.Kc=function(){this.lc&&this.Ba();this.lc=setInterval(u.bind(this,function(){this.k("timeupdate")}),250)};
t.Ba=function(){clearInterval(this.lc);this.k("timeupdate")};t.Bd=function(){this.error(j);this.paused()?(T(this,l),this.W("play",function(){T(this,f)})):this.k("firstplay")};t.tc=l;function T(a,c){c!==b&&a.tc!==c&&((a.tc=c)?(a.o("vjs-has-started"),a.k("firstplay")):a.r("vjs-has-started"))}t.Nb=function(){u.r(this.b,"vjs-paused");u.o(this.b,"vjs-playing")};t.zd=function(){this.j.starttime&&this.currentTime(this.j.starttime);this.o("vjs-has-started")};
t.Mb=function(){u.r(this.b,"vjs-playing");u.o(this.b,"vjs-paused")};t.Cd=function(){1==this.bufferedPercent()&&this.k("loadedalldata")};t.xd=function(){this.j.loop&&(this.currentTime(0),this.play())};t.yc=function(){var a=U(this,"duration");a&&(0>a&&(a=Infinity),this.duration(a),Infinity===a?this.o("vjs-live"):this.r("vjs-live"))};t.Ad=function(){this.isFullscreen()?this.o("vjs-fullscreen"):this.r("vjs-fullscreen")};
function V(a,c,d){if(a.g&&!a.g.ca)a.g.J(function(){this[c](d)});else try{a.g[c](d)}catch(e){throw u.log(e),e;}}function U(a,c){if(a.g&&a.g.ca)try{return a.g[c]()}catch(d){throw a.g[c]===b?u.log("Video.js: "+c+" method not defined for "+a.Ca+" playback technology.",d):"TypeError"==d.name?(u.log("Video.js: "+c+" unavailable on "+a.Ca+" playback technology element.",d),a.g.ca=l):u.log(d),d;}}t.play=function(){V(this,"play");return this};t.pause=function(){V(this,"pause");return this};
t.paused=function(){return U(this,"paused")===l?l:f};t.currentTime=function(a){return a!==b?(V(this,"setCurrentTime",a),this.Ib&&this.k("timeupdate"),this):this.z.currentTime=U(this,"currentTime")||0};t.duration=function(a){if(a!==b)return this.z.duration=parseFloat(a),this;this.z.duration===b&&this.yc();return this.z.duration||0};t.buffered=function(){var a=U(this,"buffered"),c=a.length-1,d=this.z.sb=this.z.sb||0;a&&(0<=c&&a.end(c)!==d)&&(d=a.end(c),this.z.sb=d);return u.yb(0,d)};
t.bufferedPercent=function(){return this.duration()?this.buffered().end(0)/this.duration():0};t.volume=function(a){if(a!==b)return a=Math.max(0,Math.min(1,parseFloat(a))),this.z.volume=a,V(this,"setVolume",a),u.Kd(a),this;a=parseFloat(U(this,"volume"));return isNaN(a)?1:a};t.muted=function(a){return a!==b?(V(this,"setMuted",a),this):U(this,"muted")||l};t.ab=function(){return U(this,"supportsFullScreen")||l};t.vc=l;t.isFullscreen=function(a){return a!==b?(this.vc=!!a,this):this.vc};
t.isFullScreen=function(a){u.log.warn('player.isFullScreen() has been deprecated, use player.isFullscreen() with a lowercase "s")');return this.isFullscreen(a)};
t.requestFullscreen=function(){var a=u.Na.Ab;this.isFullscreen(f);a?(u.d(document,a.fullscreenchange,u.bind(this,function(c){this.isFullscreen(document[a.fullscreenElement]);this.isFullscreen()===l&&u.p(document,a.fullscreenchange,arguments.callee);this.k("fullscreenchange")})),this.b[a.requestFullscreen]()):this.g.ab()?V(this,"enterFullScreen"):(this.sd=f,this.kd=document.documentElement.style.overflow,u.d(document,"keydown",u.bind(this,this.pc)),document.documentElement.style.overflow="hidden",
u.o(document.body,"vjs-full-window"),this.k("enterFullWindow"),this.k("fullscreenchange"));return this};t.exitFullscreen=function(){var a=u.Na.Ab;this.isFullscreen(l);if(a)document[a.exitFullscreen]();else this.g.ab()?V(this,"exitFullScreen"):(ea(this),this.k("fullscreenchange"));return this};t.pc=function(a){27===a.keyCode&&(this.isFullscreen()===f?this.exitFullscreen():ea(this))};
function ea(a){a.sd=l;u.p(document,"keydown",a.pc);document.documentElement.style.overflow=a.kd;u.r(document.body,"vjs-full-window");a.k("exitFullWindow")}
t.src=function(a){if(a===b)return U(this,"src");if(a instanceof Array){var c;a:{c=a;for(var d=0,e=this.j.techOrder;d<e.length;d++){var g=u.$(e[d]),h=window.videojs[g];if(h){if(h.isSupported())for(var k=0,p=c;k<p.length;k++){var n=p[k];if(h.canPlaySource(n)){c={source:n,g:g};break a}}}else u.log.error('The "'+g+'" tech is undefined. Skipped browser support check for that tech.')}c=l}c?(a=c.source,c=c.g,c==this.Ca?this.src(a):R(this,c,a)):(this.error({code:4,message:this.options().notSupportedMessage}),
this.Ea())}else a instanceof Object?window.videojs[this.Ca].canPlaySource(a)?this.src(a.src):this.src([a]):(this.z.src=a,this.ca?(V(this,"src",a),"auto"==this.j.preload&&this.load(),this.j.autoplay&&this.play()):this.J(function(){this.src(a)}));return this};t.load=function(){V(this,"load");return this};t.currentSrc=function(){return U(this,"currentSrc")||this.z.src||""};t.Xa=function(a){return a!==b?(V(this,"setPreload",a),this.j.preload=a,this):U(this,"preload")};
t.autoplay=function(a){return a!==b?(V(this,"setAutoplay",a),this.j.autoplay=a,this):U(this,"autoplay")};t.loop=function(a){return a!==b?(V(this,"setLoop",a),this.j.loop=a,this):U(this,"loop")};t.poster=function(a){if(a===b)return this.Bc;this.Bc=a;V(this,"setPoster",a);this.k("posterchange")};
t.controls=function(a){return a!==b?(a=!!a,this.xb!==a&&((this.xb=a)?(this.r("vjs-controls-disabled"),this.o("vjs-controls-enabled"),this.k("controlsenabled")):(this.r("vjs-controls-enabled"),this.o("vjs-controls-disabled"),this.k("controlsdisabled"))),this):this.xb};u.Player.prototype.Sb;t=u.Player.prototype;
t.usingNativeControls=function(a){return a!==b?(a=!!a,this.Sb!==a&&((this.Sb=a)?(this.o("vjs-using-native-controls"),this.k("usingnativecontrols")):(this.r("vjs-using-native-controls"),this.k("usingcustomcontrols"))),this):this.Sb};t.ba=j;t.error=function(a){if(a===b)return this.ba;if(a===j)return this.ba=a,this.r("vjs-error"),this;this.ba=a instanceof u.F?a:new u.F(a);this.k("error");this.o("vjs-error");u.log.error("(CODE:"+this.ba.code+" "+u.F.Ra[this.ba.code]+")",this.ba.message,this.ba);return this};
t.ended=function(){return U(this,"ended")};t.seeking=function(){return U(this,"seeking")};t.na=f;t.reportUserActivity=function(){this.na=f};t.Rb=f;t.userActive=function(a){return a!==b?(a=!!a,a!==this.Rb&&((this.Rb=a)?(this.na=f,this.r("vjs-user-inactive"),this.o("vjs-user-active"),this.k("useractive")):(this.na=l,this.g&&this.g.W("mousemove",function(a){a.stopPropagation();a.preventDefault()}),this.r("vjs-user-active"),this.o("vjs-user-inactive"),this.k("userinactive"))),this):this.Rb};
t.playbackRate=function(a){return a!==b?(V(this,"setPlaybackRate",a),this):this.g&&this.g.n&&this.g.n.playbackRate?U(this,"playbackRate"):1};u.Ha=u.a.extend();u.Ha.prototype.j={ee:"play",children:{playToggle:{},currentTimeDisplay:{},timeDivider:{},durationDisplay:{},remainingTimeDisplay:{},liveDisplay:{},progressControl:{},fullscreenToggle:{},volumeControl:{},muteToggle:{},playbackRateMenuButton:{}}};u.Ha.prototype.e=function(){return u.e("div",{className:"vjs-control-bar"})};
u.Yb=u.a.extend({h:function(a,c){u.a.call(this,a,c)}});u.Yb.prototype.e=function(){var a=u.a.prototype.e.call(this,"div",{className:"vjs-live-controls vjs-control"});this.u=u.e("div",{className:"vjs-live-display",innerHTML:'<span class="vjs-control-text">Stream Type </span>LIVE',"aria-live":"off"});a.appendChild(this.u);return a};u.ac=u.s.extend({h:function(a,c){u.s.call(this,a,c);a.d("play",u.bind(this,this.Nb));a.d("pause",u.bind(this,this.Mb))}});t=u.ac.prototype;t.sa="Play";
t.S=function(){return"vjs-play-control "+u.s.prototype.S.call(this)};t.q=function(){this.c.paused()?this.c.play():this.c.pause()};t.Nb=function(){u.r(this.b,"vjs-paused");u.o(this.b,"vjs-playing");this.b.children[0].children[0].innerHTML="Pause"};t.Mb=function(){u.r(this.b,"vjs-playing");u.o(this.b,"vjs-paused");this.b.children[0].children[0].innerHTML="Play"};u.eb=u.a.extend({h:function(a,c){u.a.call(this,a,c);a.d("timeupdate",u.bind(this,this.fa))}});
u.eb.prototype.e=function(){var a=u.a.prototype.e.call(this,"div",{className:"vjs-current-time vjs-time-controls vjs-control"});this.u=u.e("div",{className:"vjs-current-time-display",innerHTML:'<span class="vjs-control-text">Current Time </span>0:00',"aria-live":"off"});a.appendChild(this.u);return a};u.eb.prototype.fa=function(){var a=this.c.$a?this.c.z.currentTime:this.c.currentTime();this.u.innerHTML='<span class="vjs-control-text">Current Time </span>'+u.ya(a,this.c.duration())};
u.fb=u.a.extend({h:function(a,c){u.a.call(this,a,c);a.d("timeupdate",u.bind(this,this.fa))}});u.fb.prototype.e=function(){var a=u.a.prototype.e.call(this,"div",{className:"vjs-duration vjs-time-controls vjs-control"});this.u=u.e("div",{className:"vjs-duration-display",innerHTML:'<span class="vjs-control-text">Duration Time </span>0:00',"aria-live":"off"});a.appendChild(this.u);return a};
u.fb.prototype.fa=function(){var a=this.c.duration();a&&(this.u.innerHTML='<span class="vjs-control-text">Duration Time </span>'+u.ya(a))};u.gc=u.a.extend({h:function(a,c){u.a.call(this,a,c)}});u.gc.prototype.e=function(){return u.a.prototype.e.call(this,"div",{className:"vjs-time-divider",innerHTML:"<div><span>/</span></div>"})};u.mb=u.a.extend({h:function(a,c){u.a.call(this,a,c);a.d("timeupdate",u.bind(this,this.fa))}});
u.mb.prototype.e=function(){var a=u.a.prototype.e.call(this,"div",{className:"vjs-remaining-time vjs-time-controls vjs-control"});this.u=u.e("div",{className:"vjs-remaining-time-display",innerHTML:'<span class="vjs-control-text">Remaining Time </span>-0:00',"aria-live":"off"});a.appendChild(this.u);return a};u.mb.prototype.fa=function(){this.c.duration()&&(this.u.innerHTML='<span class="vjs-control-text">Remaining Time </span>-'+u.ya(this.c.duration()-this.c.currentTime()))};
u.Ia=u.s.extend({h:function(a,c){u.s.call(this,a,c)}});u.Ia.prototype.sa="Fullscreen";u.Ia.prototype.S=function(){return"vjs-fullscreen-control "+u.s.prototype.S.call(this)};u.Ia.prototype.q=function(){this.c.isFullscreen()?(this.c.exitFullscreen(),this.wb.innerHTML="Fullscreen"):(this.c.requestFullscreen(),this.wb.innerHTML="Non-Fullscreen")};u.lb=u.a.extend({h:function(a,c){u.a.call(this,a,c)}});u.lb.prototype.j={children:{seekBar:{}}};
u.lb.prototype.e=function(){return u.a.prototype.e.call(this,"div",{className:"vjs-progress-control vjs-control"})};u.cc=u.Q.extend({h:function(a,c){u.Q.call(this,a,c);a.d("timeupdate",u.bind(this,this.ma));a.J(u.bind(this,this.ma))}});t=u.cc.prototype;t.j={children:{loadProgressBar:{},playProgressBar:{},seekHandle:{}},barName:"playProgressBar",handleName:"seekHandle"};t.Ac="timeupdate";t.e=function(){return u.Q.prototype.e.call(this,"div",{className:"vjs-progress-holder","aria-label":"video progress bar"})};
t.ma=function(){var a=this.c.$a?this.c.z.currentTime:this.c.currentTime();this.b.setAttribute("aria-valuenow",u.round(100*this.Cb(),2));this.b.setAttribute("aria-valuetext",u.ya(a,this.c.duration()))};t.Cb=function(){return this.c.currentTime()/this.c.duration()};t.Wa=function(a){u.Q.prototype.Wa.call(this,a);this.c.$a=f;this.Wd=!this.c.paused();this.c.pause()};t.Kb=function(a){a=J(this,a)*this.c.duration();a==this.c.duration()&&(a-=0.1);this.c.currentTime(a)};
t.Lb=function(a){u.Q.prototype.Lb.call(this,a);this.c.$a=l;this.Wd&&this.c.play()};t.Hc=function(){this.c.currentTime(this.c.currentTime()+5)};t.Gc=function(){this.c.currentTime(this.c.currentTime()-5)};u.ib=u.a.extend({h:function(a,c){u.a.call(this,a,c);a.d("progress",u.bind(this,this.update))}});u.ib.prototype.e=function(){return u.a.prototype.e.call(this,"div",{className:"vjs-load-progress",innerHTML:'<span class="vjs-control-text">Loaded: 0%</span>'})};
u.ib.prototype.update=function(){this.b.style&&(this.b.style.width=u.round(100*this.c.bufferedPercent(),2)+"%")};u.$b=u.a.extend({h:function(a,c){u.a.call(this,a,c)}});u.$b.prototype.e=function(){return u.a.prototype.e.call(this,"div",{className:"vjs-play-progress",innerHTML:'<span class="vjs-control-text">Progress: 0%</span>'})};u.Ka=u.Y.extend({h:function(a,c){u.Y.call(this,a,c);a.d("timeupdate",u.bind(this,this.fa))}});u.Ka.prototype.defaultValue="00:00";
u.Ka.prototype.e=function(){return u.Y.prototype.e.call(this,"div",{className:"vjs-seek-handle","aria-live":"off"})};u.Ka.prototype.fa=function(){var a=this.c.$a?this.c.z.currentTime:this.c.currentTime();this.b.innerHTML='<span class="vjs-control-text">'+u.ya(a,this.c.duration())+"</span>"};u.ob=u.a.extend({h:function(a,c){u.a.call(this,a,c);a.g&&(a.g.n&&a.g.n.volumeControl===l)&&this.o("vjs-hidden");a.d("loadstart",u.bind(this,function(){a.g.n&&a.g.n.volumeControl===l?this.o("vjs-hidden"):this.r("vjs-hidden")}))}});
u.ob.prototype.j={children:{volumeBar:{}}};u.ob.prototype.e=function(){return u.a.prototype.e.call(this,"div",{className:"vjs-volume-control vjs-control"})};u.nb=u.Q.extend({h:function(a,c){u.Q.call(this,a,c);a.d("volumechange",u.bind(this,this.ma));a.J(u.bind(this,this.ma))}});t=u.nb.prototype;t.ma=function(){this.b.setAttribute("aria-valuenow",u.round(100*this.c.volume(),2));this.b.setAttribute("aria-valuetext",u.round(100*this.c.volume(),2)+"%")};
t.j={children:{volumeLevel:{},volumeHandle:{}},barName:"volumeLevel",handleName:"volumeHandle"};t.Ac="volumechange";t.e=function(){return u.Q.prototype.e.call(this,"div",{className:"vjs-volume-bar","aria-label":"volume level"})};t.Kb=function(a){this.c.muted()&&this.c.muted(l);this.c.volume(J(this,a))};t.Cb=function(){return this.c.muted()?0:this.c.volume()};t.Hc=function(){this.c.volume(this.c.volume()+0.1)};t.Gc=function(){this.c.volume(this.c.volume()-0.1)};
u.hc=u.a.extend({h:function(a,c){u.a.call(this,a,c)}});u.hc.prototype.e=function(){return u.a.prototype.e.call(this,"div",{className:"vjs-volume-level",innerHTML:'<span class="vjs-control-text"></span>'})};u.pb=u.Y.extend();u.pb.prototype.defaultValue="00:00";u.pb.prototype.e=function(){return u.Y.prototype.e.call(this,"div",{className:"vjs-volume-handle"})};
u.ha=u.s.extend({h:function(a,c){u.s.call(this,a,c);a.d("volumechange",u.bind(this,this.update));a.g&&(a.g.n&&a.g.n.volumeControl===l)&&this.o("vjs-hidden");a.d("loadstart",u.bind(this,function(){a.g.n&&a.g.n.volumeControl===l?this.o("vjs-hidden"):this.r("vjs-hidden")}))}});u.ha.prototype.e=function(){return u.s.prototype.e.call(this,"div",{className:"vjs-mute-control vjs-control",innerHTML:'<div><span class="vjs-control-text">Mute</span></div>'})};
u.ha.prototype.q=function(){this.c.muted(this.c.muted()?l:f)};u.ha.prototype.update=function(){var a=this.c.volume(),c=3;0===a||this.c.muted()?c=0:0.33>a?c=1:0.67>a&&(c=2);this.c.muted()?"Unmute"!=this.b.children[0].children[0].innerHTML&&(this.b.children[0].children[0].innerHTML="Unmute"):"Mute"!=this.b.children[0].children[0].innerHTML&&(this.b.children[0].children[0].innerHTML="Mute");for(a=0;4>a;a++)u.r(this.b,"vjs-vol-"+a);u.o(this.b,"vjs-vol-"+c)};
u.qa=u.L.extend({h:function(a,c){u.L.call(this,a,c);a.d("volumechange",u.bind(this,this.update));a.g&&(a.g.n&&a.g.n.Nc===l)&&this.o("vjs-hidden");a.d("loadstart",u.bind(this,function(){a.g.n&&a.g.n.Nc===l?this.o("vjs-hidden"):this.r("vjs-hidden")}));this.o("vjs-menu-button")}});u.qa.prototype.va=function(){var a=new u.ga(this.c,{kc:"div"}),c=new u.nb(this.c,u.l.B({Vd:f},this.j.le));a.V(c);return a};u.qa.prototype.q=function(){u.ha.prototype.q.call(this);u.L.prototype.q.call(this)};
u.qa.prototype.e=function(){return u.s.prototype.e.call(this,"div",{className:"vjs-volume-menu-button vjs-menu-button vjs-control",innerHTML:'<div><span class="vjs-control-text">Mute</span></div>'})};u.qa.prototype.update=u.ha.prototype.update;u.bc=u.L.extend({h:function(a,c){u.L.call(this,a,c);this.Mc();this.Lc();a.d("loadstart",u.bind(this,this.Mc));a.d("ratechange",u.bind(this,this.Lc))}});t=u.bc.prototype;
t.e=function(){var a=u.a.prototype.e.call(this,"div",{className:"vjs-playback-rate vjs-menu-button vjs-control",innerHTML:'<div class="vjs-control-content"><span class="vjs-control-text">Playback Rate</span></div>'});this.xc=u.e("div",{className:"vjs-playback-rate-value",innerHTML:1});a.appendChild(this.xc);return a};t.va=function(){var a=new u.ga(this.m()),c=this.m().options().playbackRates;if(c)for(var d=c.length-1;0<=d;d--)a.V(new u.kb(this.m(),{rate:c[d]+"x"}));return a};
t.ma=function(){this.w().setAttribute("aria-valuenow",this.m().playbackRate())};t.q=function(){for(var a=this.m().playbackRate(),c=this.m().options().playbackRates,d=c[0],e=0;e<c.length;e++)if(c[e]>a){d=c[e];break}this.m().playbackRate(d)};function fa(a){return a.m().g&&a.m().g.n.playbackRate&&a.m().options().playbackRates&&0<a.m().options().playbackRates.length}t.Mc=function(){fa(this)?this.r("vjs-hidden"):this.o("vjs-hidden")};
t.Lc=function(){fa(this)&&(this.xc.innerHTML=this.m().playbackRate()+"x")};u.kb=u.I.extend({kc:"button",h:function(a,c){var d=this.label=c.rate,e=this.Cc=parseFloat(d,10);c.label=d;c.selected=1===e;u.I.call(this,a,c);this.m().d("ratechange",u.bind(this,this.update))}});u.kb.prototype.q=function(){u.I.prototype.q.call(this);this.m().playbackRate(this.Cc)};u.kb.prototype.update=function(){this.selected(this.m().playbackRate()==this.Cc)};
u.Ja=u.s.extend({h:function(a,c){u.s.call(this,a,c);a.poster()&&this.src(a.poster());(!a.poster()||!a.controls())&&this.G();a.d("posterchange",u.bind(this,function(){this.src(a.poster())}));a.d("play",u.bind(this,this.G))}});var ga="backgroundSize"in u.A.style;u.Ja.prototype.e=function(){var a=u.e("div",{className:"vjs-poster",tabIndex:-1});ga||a.appendChild(u.e("img"));return a};u.Ja.prototype.src=function(a){var c=this.w();a!==b&&(ga?c.style.backgroundImage='url("'+a+'")':c.firstChild.src=a)};
u.Ja.prototype.q=function(){this.m().controls()&&this.c.play()};u.Zb=u.a.extend({h:function(a,c){u.a.call(this,a,c);a.d("canplay",u.bind(this,this.G));a.d("canplaythrough",u.bind(this,this.G));a.d("playing",u.bind(this,this.G));a.d("seeking",u.bind(this,this.show));a.d("seeked",u.bind(this,this.G));a.d("ended",u.bind(this,this.G));a.d("waiting",u.bind(this,this.show))}});u.Zb.prototype.e=function(){return u.a.prototype.e.call(this,"div",{className:"vjs-loading-spinner"})};u.bb=u.s.extend();
u.bb.prototype.e=function(){return u.s.prototype.e.call(this,"div",{className:"vjs-big-play-button",innerHTML:'<span aria-hidden="true"></span>',"aria-label":"play video"})};u.bb.prototype.q=function(){this.c.play()};u.gb=u.a.extend({h:function(a,c){u.a.call(this,a,c);this.update();a.d("error",u.bind(this,this.update))}});u.gb.prototype.e=function(){var a=u.a.prototype.e.call(this,"div",{className:"vjs-error-display"});this.u=u.e("div");a.appendChild(this.u);return a};
u.gb.prototype.update=function(){this.m().error()&&(this.u.innerHTML=this.m().error().message)};
u.t=u.a.extend({h:function(a,c,d){c=c||{};c.Ec=l;u.a.call(this,a,c,d);var e,g;g=this;e=this.m();a=function(){if(e.controls()&&!e.usingNativeControls()){var a;g.d("mousedown",g.q);g.d("touchstart",function(c){c.preventDefault();a=this.c.userActive()});g.d("touchmove",function(){a&&this.m().reportUserActivity()});I(g);g.d("tap",g.Dd)}};c=u.bind(g,g.Hd);this.J(a);e.d("controlsenabled",a);e.d("controlsdisabled",c);this.J(function(){this.networkState&&0<this.networkState()&&this.m().k("loadstart")})}});
t=u.t.prototype;t.Hd=function(){this.p("tap");this.p("touchstart");this.p("touchmove");this.p("touchleave");this.p("touchcancel");this.p("touchend");this.p("click");this.p("mousedown")};t.q=function(a){0===a.button&&this.m().controls()&&(this.m().paused()?this.m().play():this.m().pause())};t.Dd=function(){this.m().userActive(!this.m().userActive())};t.Pb=m();t.n={volumeControl:f,fullscreenResize:l,playbackRate:l,progressEvents:l,timeupdateEvents:l};u.media={};
u.f=u.t.extend({h:function(a,c,d){this.n.volumeControl=u.f.dd();this.n.playbackRate=u.f.cd();this.n.movingMediaElementInDOM=!u.Sc;this.n.fullscreenResize=f;u.t.call(this,a,c,d);for(d=u.f.hb.length-1;0<=d;d--)u.d(this.b,u.f.hb[d],u.bind(this,this.md));if((c=c.source)&&this.b.currentSrc!==c.src)this.b.src=c.src;if(u.ec&&a.options().nativeControlsForTouch!==l){var e,g,h,k;e=this;g=this.m();c=g.controls();e.b.controls=!!c;h=function(){e.b.controls=f};k=function(){e.b.controls=l};g.d("controlsenabled",
h);g.d("controlsdisabled",k);c=function(){g.p("controlsenabled",h);g.p("controlsdisabled",k)};e.d("dispose",c);g.d("usingcustomcontrols",c);g.usingNativeControls(f)}a.J(function(){this.P&&(this.j.autoplay&&this.paused())&&(delete this.P.poster,this.play())});this.Ea()}});t=u.f.prototype;t.dispose=function(){u.t.prototype.dispose.call(this)};
t.e=function(){var a=this.c,c=a.P,d;if(!c||this.n.movingMediaElementInDOM===l)c?(d=c.cloneNode(l),u.f.mc(c),c=d,a.P=j):c=u.e("video",{id:a.id()+"_html5_api",className:"vjs-tech"}),c.player=a,u.Db(c,a.w());d=["autoplay","preload","loop","muted"];for(var e=d.length-1;0<=e;e--){var g=d[e];a.j[g]!==j&&(c[g]=a.j[g])}return c};t.md=function(a){"error"==a.type?this.m().error(this.error().code):(a.bubbles=l,this.m().k(a))};t.play=function(){this.b.play()};t.pause=function(){this.b.pause()};t.paused=function(){return this.b.paused};
t.currentTime=function(){return this.b.currentTime};t.Jd=function(a){try{this.b.currentTime=a}catch(c){u.log(c,"Video is not ready. (Video.js)")}};t.duration=function(){return this.b.duration||0};t.buffered=function(){return this.b.buffered};t.volume=function(){return this.b.volume};t.Pd=function(a){this.b.volume=a};t.muted=function(){return this.b.muted};t.Md=function(a){this.b.muted=a};t.width=function(){return this.b.offsetWidth};t.height=function(){return this.b.offsetHeight};
t.ab=function(){return"function"==typeof this.b.webkitEnterFullScreen&&(/Android/.test(u.M)||!/Chrome|Mac OS X 10.5/.test(u.M))?f:l};t.nc=function(){var a=this.b;a.paused&&a.networkState<=a.Yd?(this.b.play(),setTimeout(function(){a.pause();a.webkitEnterFullScreen()},0)):a.webkitEnterFullScreen()};t.nd=function(){this.b.webkitExitFullScreen()};t.src=function(a){this.b.src=a};t.load=function(){this.b.load()};t.currentSrc=function(){return this.b.currentSrc};t.poster=function(){return this.b.poster};
t.Pb=function(a){this.b.poster=a};t.Xa=function(){return this.b.Xa};t.Od=function(a){this.b.Xa=a};t.autoplay=function(){return this.b.autoplay};t.Id=function(a){this.b.autoplay=a};t.controls=function(){return this.b.controls};t.loop=function(){return this.b.loop};t.Ld=function(a){this.b.loop=a};t.error=function(){return this.b.error};t.seeking=function(){return this.b.seeking};t.ended=function(){return this.b.ended};t.playbackRate=function(){return this.b.playbackRate};
t.Nd=function(a){this.b.playbackRate=a};t.networkState=function(){return this.b.networkState};u.f.isSupported=function(){try{u.A.volume=0.5}catch(a){return l}return!!u.A.canPlayType};u.f.tb=function(a){try{return!!u.A.canPlayType(a.type)}catch(c){return""}};u.f.dd=function(){var a=u.A.volume;u.A.volume=a/2+0.1;return a!==u.A.volume};u.f.cd=function(){var a=u.A.playbackRate;u.A.playbackRate=a/2+0.1;return a!==u.A.playbackRate};var W,ha=/^application\/(?:x-|vnd\.apple\.)mpegurl/i,ia=/^video\/mp4/i;
u.f.zc=function(){4<=u.Tb&&(W||(W=u.A.constructor.prototype.canPlayType),u.A.constructor.prototype.canPlayType=function(a){return a&&ha.test(a)?"maybe":W.call(this,a)});u.Wc&&(W||(W=u.A.constructor.prototype.canPlayType),u.A.constructor.prototype.canPlayType=function(a){return a&&ia.test(a)?"maybe":W.call(this,a)})};u.f.Ud=function(){var a=u.A.constructor.prototype.canPlayType;u.A.constructor.prototype.canPlayType=W;W=j;return a};u.f.zc();u.f.hb="loadstart suspend abort error emptied stalled loadedmetadata loadeddata canplay canplaythrough playing waiting seeking seeked ended durationchange timeupdate progress play pause ratechange volumechange".split(" ");
u.f.mc=function(a){if(a){a.player=j;for(a.parentNode&&a.parentNode.removeChild(a);a.hasChildNodes();)a.removeChild(a.firstChild);a.removeAttribute("src");if("function"===typeof a.load)try{a.load()}catch(c){}}};
u.i=u.t.extend({h:function(a,c,d){u.t.call(this,a,c,d);var e=c.source;d=c.parentEl;var g=this.b=u.e("div",{id:a.id()+"_temp_flash"}),h=a.id()+"_flash_api";a=a.j;var k=u.l.B({readyFunction:"videojs.Flash.onReady",eventProxyFunction:"videojs.Flash.onEvent",errorEventProxyFunction:"videojs.Flash.onError",autoplay:a.autoplay,preload:a.Xa,loop:a.loop,muted:a.muted},c.flashVars),p=u.l.B({wmode:"opaque",bgcolor:"#000000"},c.params),n=u.l.B({id:h,name:h,"class":"vjs-tech"},c.attributes),s;e&&(e.type&&u.i.ud(e.type)?
(a=u.i.Ic(e.src),k.rtmpConnection=encodeURIComponent(a.vb),k.rtmpStream=encodeURIComponent(a.Qb)):k.src=encodeURIComponent(u.qc(e.src)));this.setCurrentTime=function(a){s=a;this.b.vjs_setProperty("currentTime",a)};this.currentTime=function(){return this.seeking()?s:this.b.vjs_getProperty("currentTime")};u.Db(g,d);c.startTime&&this.J(function(){this.load();this.play();this.currentTime(c.startTime)});u.Xb&&this.J(function(){u.d(this.w(),"mousemove",u.bind(this,function(){this.m().k({type:"mousemove",
bubbles:l})}))});if(c.iFrameMode===f&&!u.Xb){var C=u.e("iframe",{id:h+"_iframe",name:h+"_iframe",className:"vjs-tech",scrolling:"no",marginWidth:0,marginHeight:0,frameBorder:0});k.readyFunction="ready";k.eventProxyFunction="events";k.errorEventProxyFunction="errors";u.d(C,"load",u.bind(this,function(){var a,d=C.contentWindow;a=C.contentDocument?C.contentDocument:C.contentWindow.document;a.write(u.i.rc(c.swf,k,p,n));d.player=this.c;d.ready=u.bind(this.c,function(c){var d=this.g;d.b=a.getElementById(c);
u.i.ub(d)});d.events=u.bind(this.c,function(a,c){this&&"flash"===this.Ca&&this.k(c)});d.errors=u.bind(this.c,function(a,c){u.log("Flash Error",c)})}));g.parentNode.replaceChild(C,g)}else u.i.ld(c.swf,g,k,p,n)}});t=u.i.prototype;t.dispose=function(){u.t.prototype.dispose.call(this)};t.play=function(){this.b.vjs_play()};t.pause=function(){this.b.vjs_pause()};
t.src=function(a){if(a===b)return this.currentSrc();u.i.td(a)?(a=u.i.Ic(a),this.ge(a.vb),this.he(a.Qb)):(a=u.qc(a),this.b.vjs_src(a));if(this.c.autoplay()){var c=this;setTimeout(function(){c.play()},0)}};t.currentSrc=function(){var a=this.b.vjs_getProperty("currentSrc");if(a==j){var c=this.rtmpConnection(),d=this.rtmpStream();c&&d&&(a=u.i.Qd(c,d))}return a};t.load=function(){this.b.vjs_load()};t.poster=function(){this.b.vjs_getProperty("poster")};t.Pb=m();t.buffered=function(){return u.yb(0,this.b.vjs_getProperty("buffered"))};
t.ab=r(l);t.nc=r(l);var ja=u.i.prototype,X="rtmpConnection rtmpStream preload defaultPlaybackRate playbackRate autoplay loop mediaGroup controller controls volume muted defaultMuted".split(" "),ka="error networkState readyState seeking initialTime duration startOffsetTime paused played seekable ended videoTracks audioTracks videoWidth videoHeight textTracks".split(" ");function la(){var a=X[Y],c=a.charAt(0).toUpperCase()+a.slice(1);ja["set"+c]=function(c){return this.b.vjs_setProperty(a,c)}}
function ma(a){ja[a]=function(){return this.b.vjs_getProperty(a)}}var Y;for(Y=0;Y<X.length;Y++)ma(X[Y]),la();for(Y=0;Y<ka.length;Y++)ma(ka[Y]);u.i.isSupported=function(){return 10<=u.i.version()[0]};u.i.tb=function(a){if(!a.type)return"";a=a.type.replace(/;.*/,"").toLowerCase();if(a in u.i.pd||a in u.i.Jc)return"maybe"};u.i.pd={"video/flv":"FLV","video/x-flv":"FLV","video/mp4":"MP4","video/m4v":"MP4"};u.i.Jc={"rtmp/mp4":"MP4","rtmp/flv":"FLV"};
u.i.onReady=function(a){a=u.w(a);var c=a.player||a.parentNode.player,d=c.g;a.player=c;d.b=a;u.i.ub(d)};u.i.ub=function(a){a.w().vjs_getProperty?a.Ea():setTimeout(function(){u.i.ub(a)},50)};u.i.onEvent=function(a,c){u.w(a).player.k(c)};u.i.onError=function(a,c){var d=u.w(a).player,e="FLASH: "+c;"srcnotfound"==c?d.error({code:4,message:e}):d.error(e)};
u.i.version=function(){var a="0,0,0";try{a=(new window.ActiveXObject("ShockwaveFlash.ShockwaveFlash")).GetVariable("$version").replace(/\D+/g,",").match(/^,?(.+),?$/)[1]}catch(c){try{navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin&&(a=(navigator.plugins["Shockwave Flash 2.0"]||navigator.plugins["Shockwave Flash"]).description.replace(/\D+/g,",").match(/^,?(.+),?$/)[1])}catch(d){}}return a.split(",")};
u.i.ld=function(a,c,d,e,g){a=u.i.rc(a,d,e,g);a=u.e("div",{innerHTML:a}).childNodes[0];d=c.parentNode;c.parentNode.replaceChild(a,c);var h=d.childNodes[0];setTimeout(function(){h.style.display="block"},1E3)};
u.i.rc=function(a,c,d,e){var g="",h="",k="";c&&u.l.wa(c,function(a,c){g+=a+"="+c+"&amp;"});d=u.l.B({movie:a,flashvars:g,allowScriptAccess:"always",allowNetworking:"all"},d);u.l.wa(d,function(a,c){h+='<param name="'+a+'" value="'+c+'" />'});e=u.l.B({data:a,width:"100%",height:"100%"},e);u.l.wa(e,function(a,c){k+=a+'="'+c+'" '});return'<object type="application/x-shockwave-flash"'+k+">"+h+"</object>"};u.i.Qd=function(a,c){return a+"&"+c};
u.i.Ic=function(a){var c={vb:"",Qb:""};if(!a)return c;var d=a.indexOf("&"),e;-1!==d?e=d+1:(d=e=a.lastIndexOf("/")+1,0===d&&(d=e=a.length));c.vb=a.substring(0,d);c.Qb=a.substring(e,a.length);return c};u.i.ud=function(a){return a in u.i.Jc};u.i.Yc=/^rtmp[set]?:\/\//i;u.i.td=function(a){return u.i.Yc.test(a)};
u.Xc=u.a.extend({h:function(a,c,d){u.a.call(this,a,c,d);if(!a.j.sources||0===a.j.sources.length){c=0;for(d=a.j.techOrder;c<d.length;c++){var e=u.$(d[c]),g=window.videojs[e];if(g&&g.isSupported()){R(a,e);break}}}else a.src(a.j.sources)}});u.Player.prototype.textTracks=function(){return this.Da=this.Da||[]};
function na(a,c,d,e,g){var h=a.Da=a.Da||[];g=g||{};g.kind=c;g.label=d;g.language=e;c=u.$(c||"subtitles");var k=new window.videojs[c+"Track"](a,g);h.push(k);k.Qa()&&a.J(function(){setTimeout(function(){k.show()},0)})}function oa(a,c,d){for(var e=a.Da,g=0,h=e.length,k,p;g<h;g++)k=e[g],k.id()===c?(k.show(),p=k):d&&(k.K()==d&&0<k.mode())&&k.disable();(c=p?p.K():d?d:l)&&a.k(c+"trackchange")}
u.C=u.a.extend({h:function(a,c){u.a.call(this,a,c);this.T=c.id||"vjs_"+c.kind+"_"+c.language+"_"+u.v++;this.Fc=c.src;this.hd=c["default"]||c.dflt;this.Sd=c.title;this.de=c.srclang;this.vd=c.label;this.aa=[];this.qb=[];this.ka=this.la=0;this.c.d("fullscreenchange",u.bind(this,this.$c))}});t=u.C.prototype;t.K=q("H");t.src=q("Fc");t.Qa=q("hd");t.title=q("Sd");t.label=q("vd");t.ed=q("aa");t.Zc=q("qb");t.readyState=q("la");t.mode=q("ka");
t.$c=function(){this.b.style.fontSize=this.c.isFullScreen()?140*(screen.width/this.c.width())+"%":""};t.e=function(){return u.a.prototype.e.call(this,"div",{className:"vjs-"+this.H+" vjs-text-track"})};t.show=function(){pa(this);this.ka=2;u.a.prototype.show.call(this)};t.G=function(){pa(this);this.ka=1;u.a.prototype.G.call(this)};
t.disable=function(){2==this.ka&&this.G();this.c.p("timeupdate",u.bind(this,this.update,this.T));this.c.p("ended",u.bind(this,this.reset,this.T));this.reset();this.c.ja("textTrackDisplay").removeChild(this);this.ka=0};function pa(a){0===a.la&&a.load();0===a.ka&&(a.c.d("timeupdate",u.bind(a,a.update,a.T)),a.c.d("ended",u.bind(a,a.reset,a.T)),("captions"===a.H||"subtitles"===a.H)&&a.c.ja("textTrackDisplay").V(a))}
t.load=function(){0===this.la&&(this.la=1,u.get(this.Fc,u.bind(this,this.Ed),u.bind(this,this.yd)))};t.yd=function(a){this.error=a;this.la=3;this.k("error")};t.Ed=function(a){var c,d;a=a.split("\n");for(var e="",g=1,h=a.length;g<h;g++)if(e=u.trim(a[g])){-1==e.indexOf("--\x3e")?(c=e,e=u.trim(a[++g])):c=this.aa.length;c={id:c,index:this.aa.length};d=e.split(" --\x3e ");c.startTime=qa(d[0]);c.xa=qa(d[1]);for(d=[];a[++g]&&(e=u.trim(a[g]));)d.push(e);c.text=d.join("<br/>");this.aa.push(c)}this.la=2;this.k("loaded")};
function qa(a){var c=a.split(":");a=0;var d,e,g;3==c.length?(d=c[0],e=c[1],c=c[2]):(d=0,e=c[0],c=c[1]);c=c.split(/\s+/);c=c.splice(0,1)[0];c=c.split(/\.|,/);g=parseFloat(c[1]);c=c[0];a+=3600*parseFloat(d);a+=60*parseFloat(e);a+=parseFloat(c);g&&(a+=g/1E3);return a}
t.update=function(){if(0<this.aa.length){var a=this.c.options().trackTimeOffset||0,a=this.c.currentTime()+a;if(this.Ob===b||a<this.Ob||this.Ta<=a){var c=this.aa,d=this.c.duration(),e=0,g=l,h=[],k,p,n,s;a>=this.Ta||this.Ta===b?s=this.zb!==b?this.zb:0:(g=f,s=this.Gb!==b?this.Gb:c.length-1);for(;;){n=c[s];if(n.xa<=a)e=Math.max(e,n.xa),n.Ma&&(n.Ma=l);else if(a<n.startTime){if(d=Math.min(d,n.startTime),n.Ma&&(n.Ma=l),!g)break}else g?(h.splice(0,0,n),p===b&&(p=s),k=s):(h.push(n),k===b&&(k=s),p=s),d=Math.min(d,
n.xa),e=Math.max(e,n.startTime),n.Ma=f;if(g)if(0===s)break;else s--;else if(s===c.length-1)break;else s++}this.qb=h;this.Ta=d;this.Ob=e;this.zb=k;this.Gb=p;k=this.qb;p="";a=0;for(c=k.length;a<c;a++)p+='<span class="vjs-tt-cue">'+k[a].text+"</span>";this.b.innerHTML=p;this.k("cuechange")}}};t.reset=function(){this.Ta=0;this.Ob=this.c.duration();this.Gb=this.zb=0};u.Vb=u.C.extend();u.Vb.prototype.H="captions";u.dc=u.C.extend();u.dc.prototype.H="subtitles";u.Wb=u.C.extend();u.Wb.prototype.H="chapters";
u.fc=u.a.extend({h:function(a,c,d){u.a.call(this,a,c,d);if(a.j.tracks&&0<a.j.tracks.length){c=this.c;a=a.j.tracks;for(var e=0;e<a.length;e++)d=a[e],na(c,d.kind,d.label,d.language,d)}}});u.fc.prototype.e=function(){return u.a.prototype.e.call(this,"div",{className:"vjs-text-track-display"})};u.Z=u.I.extend({h:function(a,c){var d=this.ea=c.track;c.label=d.label();c.selected=d.Qa();u.I.call(this,a,c);this.c.d(d.K()+"trackchange",u.bind(this,this.update))}});
u.Z.prototype.q=function(){u.I.prototype.q.call(this);oa(this.c,this.ea.T,this.ea.K())};u.Z.prototype.update=function(){this.selected(2==this.ea.mode())};u.jb=u.Z.extend({h:function(a,c){c.track={K:function(){return c.kind},m:a,label:function(){return c.kind+" off"},Qa:r(l),mode:r(l)};u.Z.call(this,a,c);this.selected(f)}});u.jb.prototype.q=function(){u.Z.prototype.q.call(this);oa(this.c,this.ea.T,this.ea.K())};
u.jb.prototype.update=function(){for(var a=this.c.textTracks(),c=0,d=a.length,e,g=f;c<d;c++)e=a[c],e.K()==this.ea.K()&&2==e.mode()&&(g=l);this.selected(g)};u.U=u.L.extend({h:function(a,c){u.L.call(this,a,c);1>=this.O.length&&this.G()}});u.U.prototype.ua=function(){var a=[],c;a.push(new u.jb(this.c,{kind:this.H}));for(var d=0;d<this.c.textTracks().length;d++)c=this.c.textTracks()[d],c.K()===this.H&&a.push(new u.Z(this.c,{track:c}));return a};
u.Fa=u.U.extend({h:function(a,c,d){u.U.call(this,a,c,d);this.b.setAttribute("aria-label","Captions Menu")}});u.Fa.prototype.H="captions";u.Fa.prototype.sa="Captions";u.Fa.prototype.className="vjs-captions-button";u.La=u.U.extend({h:function(a,c,d){u.U.call(this,a,c,d);this.b.setAttribute("aria-label","Subtitles Menu")}});u.La.prototype.H="subtitles";u.La.prototype.sa="Subtitles";u.La.prototype.className="vjs-subtitles-button";
u.Ga=u.U.extend({h:function(a,c,d){u.U.call(this,a,c,d);this.b.setAttribute("aria-label","Chapters Menu")}});t=u.Ga.prototype;t.H="chapters";t.sa="Chapters";t.className="vjs-chapters-button";t.ua=function(){for(var a=[],c,d=0;d<this.c.textTracks().length;d++)c=this.c.textTracks()[d],c.K()===this.H&&a.push(new u.Z(this.c,{track:c}));return a};
t.va=function(){for(var a=this.c.textTracks(),c=0,d=a.length,e,g,h=this.O=[];c<d;c++)if(e=a[c],e.K()==this.H&&e.Qa()){if(2>e.readyState()){this.ae=e;e.d("loaded",u.bind(this,this.va));return}g=e;break}a=this.za=new u.ga(this.c);a.ia().appendChild(u.e("li",{className:"vjs-menu-title",innerHTML:u.$(this.H),Rd:-1}));if(g){e=g.aa;for(var k,c=0,d=e.length;c<d;c++)k=e[c],k=new u.cb(this.c,{track:g,cue:k}),h.push(k),a.V(k)}0<this.O.length&&this.show();return a};
u.cb=u.I.extend({h:function(a,c){var d=this.ea=c.track,e=this.cue=c.cue,g=a.currentTime();c.label=e.text;c.selected=e.startTime<=g&&g<e.xa;u.I.call(this,a,c);d.d("cuechange",u.bind(this,this.update))}});u.cb.prototype.q=function(){u.I.prototype.q.call(this);this.c.currentTime(this.cue.startTime);this.update(this.cue.startTime)};u.cb.prototype.update=function(){var a=this.cue,c=this.c.currentTime();this.selected(a.startTime<=c&&c<a.xa)};
u.l.B(u.Ha.prototype.j.children,{subtitlesButton:{},captionsButton:{},chaptersButton:{}});
if("undefined"!==typeof window.JSON&&"function"===window.JSON.parse)u.JSON=window.JSON;else{u.JSON={};var Z=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;u.JSON.parse=function(a,c){function d(a,e){var k,p,n=a[e];if(n&&"object"===typeof n)for(k in n)Object.prototype.hasOwnProperty.call(n,k)&&(p=d(n,k),p!==b?n[k]=p:delete n[k]);return c.call(a,e,n)}var e;a=String(a);Z.lastIndex=0;Z.test(a)&&(a=a.replace(Z,function(a){return"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)}));
if(/^[\],:{}\s]*$/.test(a.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,"")))return e=eval("("+a+")"),"function"===typeof c?d({"":e},""):e;throw new SyntaxError("JSON.parse(): invalid or malformed JSON data");}}
u.ic=function(){var a,c,d=document.getElementsByTagName("video");if(d&&0<d.length)for(var e=0,g=d.length;e<g;e++)if((c=d[e])&&c.getAttribute)c.player===b&&(a=c.getAttribute("data-setup"),a!==j&&(a=u.JSON.parse(a||"{}"),videojs(c,a)));else{u.rb();break}else u.Oc||u.rb()};u.rb=function(){setTimeout(u.ic,1)};"complete"===document.readyState?u.Oc=f:u.W(window,"load",function(){u.Oc=f});u.rb();u.Gd=function(a,c){u.Player.prototype[a]=c};var ra=this;ra.Xd=f;function $(a,c){var d=a.split("."),e=ra;!(d[0]in e)&&e.execScript&&e.execScript("var "+d[0]);for(var g;d.length&&(g=d.shift());)!d.length&&c!==b?e[g]=c:e=e[g]?e[g]:e[g]={}};$("videojs",u);$("_V_",u);$("videojs.options",u.options);$("videojs.players",u.Aa);$("videojs.TOUCH_ENABLED",u.ec);$("videojs.cache",u.ta);$("videojs.Component",u.a);u.a.prototype.player=u.a.prototype.m;u.a.prototype.options=u.a.prototype.options;u.a.prototype.init=u.a.prototype.h;u.a.prototype.dispose=u.a.prototype.dispose;u.a.prototype.createEl=u.a.prototype.e;u.a.prototype.contentEl=u.a.prototype.ia;u.a.prototype.el=u.a.prototype.w;u.a.prototype.addChild=u.a.prototype.V;
u.a.prototype.getChild=u.a.prototype.ja;u.a.prototype.getChildById=u.a.prototype.qd;u.a.prototype.children=u.a.prototype.children;u.a.prototype.initChildren=u.a.prototype.uc;u.a.prototype.removeChild=u.a.prototype.removeChild;u.a.prototype.on=u.a.prototype.d;u.a.prototype.off=u.a.prototype.p;u.a.prototype.one=u.a.prototype.W;u.a.prototype.trigger=u.a.prototype.k;u.a.prototype.triggerReady=u.a.prototype.Ea;u.a.prototype.show=u.a.prototype.show;u.a.prototype.hide=u.a.prototype.G;
u.a.prototype.width=u.a.prototype.width;u.a.prototype.height=u.a.prototype.height;u.a.prototype.dimensions=u.a.prototype.jd;u.a.prototype.ready=u.a.prototype.J;u.a.prototype.addClass=u.a.prototype.o;u.a.prototype.removeClass=u.a.prototype.r;u.a.prototype.buildCSSClass=u.a.prototype.S;u.Player.prototype.ended=u.Player.prototype.ended;$("videojs.MediaLoader",u.Xc);$("videojs.TextTrackDisplay",u.fc);$("videojs.ControlBar",u.Ha);$("videojs.Button",u.s);$("videojs.PlayToggle",u.ac);
$("videojs.FullscreenToggle",u.Ia);$("videojs.BigPlayButton",u.bb);$("videojs.LoadingSpinner",u.Zb);$("videojs.CurrentTimeDisplay",u.eb);$("videojs.DurationDisplay",u.fb);$("videojs.TimeDivider",u.gc);$("videojs.RemainingTimeDisplay",u.mb);$("videojs.LiveDisplay",u.Yb);$("videojs.ErrorDisplay",u.gb);$("videojs.Slider",u.Q);$("videojs.ProgressControl",u.lb);$("videojs.SeekBar",u.cc);$("videojs.LoadProgressBar",u.ib);$("videojs.PlayProgressBar",u.$b);$("videojs.SeekHandle",u.Ka);
$("videojs.VolumeControl",u.ob);$("videojs.VolumeBar",u.nb);$("videojs.VolumeLevel",u.hc);$("videojs.VolumeMenuButton",u.qa);$("videojs.VolumeHandle",u.pb);$("videojs.MuteToggle",u.ha);$("videojs.PosterImage",u.Ja);$("videojs.Menu",u.ga);$("videojs.MenuItem",u.I);$("videojs.MenuButton",u.L);$("videojs.PlaybackRateMenuButton",u.bc);u.L.prototype.createItems=u.L.prototype.ua;u.U.prototype.createItems=u.U.prototype.ua;u.Ga.prototype.createItems=u.Ga.prototype.ua;$("videojs.SubtitlesButton",u.La);
$("videojs.CaptionsButton",u.Fa);$("videojs.ChaptersButton",u.Ga);$("videojs.MediaTechController",u.t);u.t.prototype.features=u.t.prototype.n;u.t.prototype.n.volumeControl=u.t.prototype.n.Nc;u.t.prototype.n.fullscreenResize=u.t.prototype.n.be;u.t.prototype.n.progressEvents=u.t.prototype.n.fe;u.t.prototype.n.timeupdateEvents=u.t.prototype.n.ie;u.t.prototype.setPoster=u.t.prototype.Pb;$("videojs.Html5",u.f);u.f.Events=u.f.hb;u.f.isSupported=u.f.isSupported;u.f.canPlaySource=u.f.tb;
u.f.patchCanPlayType=u.f.zc;u.f.unpatchCanPlayType=u.f.Ud;u.f.prototype.setCurrentTime=u.f.prototype.Jd;u.f.prototype.setVolume=u.f.prototype.Pd;u.f.prototype.setMuted=u.f.prototype.Md;u.f.prototype.setPreload=u.f.prototype.Od;u.f.prototype.setAutoplay=u.f.prototype.Id;u.f.prototype.setLoop=u.f.prototype.Ld;u.f.prototype.enterFullScreen=u.f.prototype.nc;u.f.prototype.exitFullScreen=u.f.prototype.nd;u.f.prototype.playbackRate=u.f.prototype.playbackRate;u.f.prototype.setPlaybackRate=u.f.prototype.Nd;
$("videojs.Flash",u.i);u.i.isSupported=u.i.isSupported;u.i.canPlaySource=u.i.tb;u.i.onReady=u.i.onReady;$("videojs.TextTrack",u.C);u.C.prototype.label=u.C.prototype.label;u.C.prototype.kind=u.C.prototype.K;u.C.prototype.mode=u.C.prototype.mode;u.C.prototype.cues=u.C.prototype.ed;u.C.prototype.activeCues=u.C.prototype.Zc;$("videojs.CaptionsTrack",u.Vb);$("videojs.SubtitlesTrack",u.dc);$("videojs.ChaptersTrack",u.Wb);$("videojs.autoSetup",u.ic);$("videojs.plugin",u.Gd);$("videojs.createTimeRange",u.yb);
$("videojs.util",u.oa);u.oa.mergeOptions=u.oa.Jb;})();
!function(t,a,e,n,m){m=a.location,t.src="//www.google-analytics.com/__utm.gif?utmwv=5.4.2&utmac=UA-16505296-2&utmn=1&utmhn="+n(m.hostname)+"&utmsr="+a.screen.availWidth+"x"+a.screen.availHeight+"&utmul="+(e.language||e.userLanguage||"").toLowerCase()+"&utmr="+n(m.href)+"&utmp="+n(m.hostname+m.pathname)+"&utmcc=__utma%3D1."+Math.floor(1e10*Math.random())+".1.1.1.1%3B"+"&utme=8(vjsv)9(v4.6.4)"}(new Image,window,navigator,encodeURIComponent);

/* global videojs, YT */
/* jshint browser: true */

(function() {
  /**
   * @fileoverview YouTube Media Controller - Wrapper for YouTube Media API
   */

  /**
   * YouTube Media Controller - Wrapper for YouTube Media API
   * @param {videojs.Player|Object} player
   * @param {Object=} options
   * @param {Function=} ready
   * @constructor
   */

  function addEventListener(element, event, cb) {
    if(!element.addEventListener) {
      element.attachEvent(event, cb);
    } else {
      element.addEventListener(event, cb, true);
    }
  }

  videojs.Youtube = videojs.MediaTechController.extend({
    /** @constructor */
    init: function(player, options, ready) {
      // No event is triggering this for YouTube
      this.features['progressEvents'] = false;
      this.features['timeupdateEvents'] = false;

      videojs.MediaTechController.call(this, player, options, ready);

      this.isIos = /(iPad|iPhone|iPod)/g.test( navigator.userAgent );
      this.isAndroid = /(Android)/g.test( navigator.userAgent );
      //used to prevent play events on IOS7 and Android > 4.2 until the user has clicked the player
      this.playVideoIsAllowed = !(this.isIos || this.isAndroid);

      // Copy the JavaScript options if they exists
      if(typeof options['source'] !== 'undefined') {
        for(var key in options['source']) {
          if(options['source'].hasOwnProperty(key)) {
            player.options()[key] = options['source'][key];
          }
        }
      }

      this.userQuality = videojs.Youtube.convertQualityName(player.options()['quality']);

      // Save those for internal usage
      this.player_ = player;
      this.playerEl_ = document.getElementById(player.id());
      this.playerEl_.className += ' vjs-youtube';

      // Create the Quality button
      this.qualityButton = document.createElement('div');
      this.qualityButton.setAttribute('class', 'vjs-quality-button vjs-menu-button vjs-control');
      this.qualityButton.setAttribute('tabindex', 0);

      var qualityContent = document.createElement('div');
      this.qualityButton.appendChild(qualityContent);

      this.qualityTitle = document.createElement('span');
      qualityContent.appendChild(this.qualityTitle);

      if(player.options()['quality'] !== 'undefined') {
        setInnerText(this.qualityTitle, player.options()['quality'] || 'auto');
      }

      var qualityMenu = document.createElement('div');
      qualityMenu.setAttribute('class', 'vjs-menu');
      this.qualityButton.appendChild(qualityMenu);

      this.qualityMenuContent = document.createElement('ul');
      this.qualityMenuContent.setAttribute('class', 'vjs-menu-content');
      qualityMenu.appendChild(this.qualityMenuContent);

      this.id_ = this.player_.id() + '_youtube_api';

      this.el_ = videojs.Component.prototype.createEl('iframe', {
        id: this.id_,
        className: 'vjs-tech',
        scrolling: 'no',
        marginWidth: 0,
        marginHeight: 0,
        frameBorder: 0
      });

      this.el_.setAttribute('allowFullScreen', '');

      this.playerEl_.insertBefore(this.el_, this.playerEl_.firstChild);

      if(/MSIE (\d+\.\d+);/.test(navigator.userAgent)) {
        var ieVersion = Number(RegExp.$1);
        this.addIframeBlocker(ieVersion);
      } else if(!/(iPad|iPhone|iPod|android)/g.test(navigator.userAgent)) {
        // the pointer-events: none block the mobile player
        this.el_.className += ' onDesktop';
        this.addIframeBlocker();
      }

      this.parseSrc(player.options()['src']);

      this.playOnReady = this.player_.options()['autoplay'] || false;
      this.forceSSL = !!(
        typeof this.player_.options()['forceSSL'] === 'undefined' ||
          this.player_.options()['forceSSL'] === true
        );
      this.forceHTML5 = !!(
        typeof this.player_.options()['forceHTML5'] === 'undefined' ||
          this.player_.options()['forceHTML5'] === true
        );

      this.updateIframeSrc();

      var self = this;

      player.ready(function() {
        var controlBar = self.playerEl_.querySelectorAll('.vjs-control-bar')[0];
        controlBar.appendChild(self.qualityButton);

        if(self.playOnReady && !self.player_.options()['ytcontrols']) {
          if(typeof self.player_.loadingSpinner !== 'undefined') {
            self.player_.loadingSpinner.show();
          }
          if(typeof self.player_.bigPlayButton !== 'undefined') {
            self.player_.bigPlayButton.hide();
          }
        }

        player.trigger('loadstart');
      });

      this.on('dispose', function() {
        if(this.ytplayer) {
          this.ytplayer.destroy();
        }

        if(!this.player_.options()['ytcontrols']) {
          this.player_.off('waiting', this.bindedWaiting);
        }

        // Remove the poster
        this.playerEl_.querySelectorAll('.vjs-poster')[0].style.backgroundImage = 'none';

        // If still connected to the DOM, remove it.
        if(this.el_.parentNode) {
          this.el_.parentNode.removeChild(this.el_);
        }

        // Get rid of the created DOM elements
        if (this.qualityButton.parentNode) {
          this.qualityButton.parentNode.removeChild(this.qualityButton);
        }

        if(typeof this.player_.loadingSpinner !== 'undefined') {
          this.player_.loadingSpinner.hide();
        }
        if(typeof this.player_.bigPlayButton !== 'undefined') {
          this.player_.bigPlayButton.hide();
        }

        if(this.iframeblocker) {
          this.playerEl_.removeChild(this.iframeblocker);
        }
      });
    }
  });

  videojs.Youtube.prototype.updateIframeSrc = function() {
    var params = {
      enablejsapi: 1,
      /*jshint -W106 */
      iv_load_policy: 3,
      /*jshint +W106 */
      playerapiid: this.id(),
      disablekb: 1,
      wmode: 'transparent',
      controls: (this.player_.options()['ytcontrols']) ? 1 : 0,
      html5: (this.player_.options()['forceHTML5']) ? 1 : null,
      playsinline: (this.player_.options()['playsInline']) ? 1 : 0,
      showinfo: 0,
      modestbranding: 1,
      rel: 0,
      autoplay: (this.playOnReady) ? 1 : 0,
      loop: (this.player_.options()['loop']) ? 1 : 0,
      list: this.playlistId,
      vq: this.userQuality,
      origin: window.location.protocol + '//' + window.location.host
    };

    // When running with no Web server, we can't specify the origin or it will break the YouTube API messages
    if(window.location.protocol === 'file:') {
      delete params.origin;
    }

    // Delete unset properties
    for(var prop in params) {
      if(params.hasOwnProperty(prop) &&
        ( typeof params[ prop ] === 'undefined' || params[ prop ] === null )
        ) {
        delete params[ prop ];
      }
    }
    var self = this;

    if(this.videoId === null) {
      this.el_.src = 'about:blank';
      setTimeout(function() {
        self.triggerReady();
      }, 500);
    } else {
      this.el_.src = (
        (this.forceSSL || window.location.protocol === 'file:') ?
          'https:'
          : window.location.protocol
        ) + '//www.youtube.com/embed/' + this.videoId + '?' + videojs.Youtube.makeQueryString(params);

      if(this.player_.options()['ytcontrols']) {
        // Disable the video.js controls if we use the YouTube controls
        this.player_.controls(false);
      } else if(typeof this.player_.poster() === 'undefined') {
        // Don't use player.poster(), it will fail here because the tech is still null in constructor
        setTimeout(function() {
          var posterEl = self.playerEl_.querySelectorAll('.vjs-poster')[0];
          posterEl.style.backgroundImage = 'url(https://img.youtube.com/vi/' + self.videoId + '/0.jpg)';
          posterEl.style.display = '';
        }, 100);
      }

      this.bindedWaiting = function() {
        self.onWaiting();
      };

      this.player_.on('waiting', this.bindedWaiting);

      if(videojs.Youtube.apiReady) {
        this.loadYoutube();
      } else {
        // Add to the queue because the YouTube API is not ready
        videojs.Youtube.loadingQueue.push(this);

        // Load the YouTube API if it is the first YouTube video
        if(!videojs.Youtube.apiLoading) {
          var tag = document.createElement('script');
          tag.onerror = function(e) {
            self.onError(e);
          };
          tag.src = ( !this.forceSSL && window.location.protocol !== 'file:' ) ?
            '//www.youtube.com/iframe_api'
            : 'https://www.youtube.com/iframe_api';
          var firstScriptTag = document.getElementsByTagName('script')[0];
          firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
          videojs.Youtube.apiLoading = true;
        }
      }
    }
  };

  videojs.Youtube.prototype.onWaiting = function(/*e*/) {
    // Make sure to hide the play button while the spinner is there
    this.player_.bigPlayButton.hide();
  };

  videojs.Youtube.prototype.addIframeBlocker = function(ieVersion) {
    this.iframeblocker = videojs.Component.prototype.createEl('div');

    this.iframeblocker.className = 'iframeblocker';

    this.iframeblocker.style.position = 'absolute';
    this.iframeblocker.style.left = 0;
    this.iframeblocker.style.right = 0;
    this.iframeblocker.style.top = 0;
    this.iframeblocker.style.bottom = 0;
    this.iframeblocker.style.zIndex = 9999;

    // Odd quirk for IE8 (doesn't support rgba)
    if(ieVersion && ieVersion < 9) {
      this.iframeblocker.style.opacity = 0.01;
    } else {
      this.iframeblocker.style.background = 'rgba(255, 255, 255, 0.01)';
    }

    var self = this;
    addEventListener(this.iframeblocker, 'mousemove', function(e) {
      if(!self.player_.userActive()) {
        self.player_.userActive(true);
      }

      e.stopPropagation();
      e.preventDefault();
    });

    addEventListener(this.iframeblocker, 'click', function(/*e*/) {
      if(self.paused()) {
        self.play();
      } else {
        self.pause();
      }
    });

    this.playerEl_.insertBefore(this.iframeblocker, this.el_.nextSibling);
  };

  videojs.Youtube.prototype.parseSrc = function(src) {
    this.srcVal = src;

    if(src) {
      // Regex to parse the video ID
      var regId = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
      var match = src.match(regId);

      if(match && match[2].length === 11) {
        this.videoId = match[2];
      } else {
        this.videoId = null;
      }

      // Regex to parse the playlist ID
      var regPlaylist = /[?&]list=([^#\&\?]+)/;
      match = src.match(regPlaylist);

      if(match !== null && match.length > 1) {
        this.playlistId = match[1];
      } else {
        // Make sure their is no playlist
        if(this.playlistId) {
          delete this.playlistId;
        }
      }

      // Parse video quality option
      var regVideoQuality = /[?&]vq=([^#\&\?]+)/;
      match = src.match(regVideoQuality);

      if(match !== null && match.length > 1) {
        this.userQuality = match[1];
        setInnerText(this.qualityTitle, videojs.Youtube.parseQualityName(this.userQuality));
      }
    }
  };

  videojs.Youtube.prototype.src = function(src) {
    if(typeof src !== 'undefined') {
      this.parseSrc(src);

      if(this.el_.src === 'about:blank') {
        this.updateIframeSrc();
        return;
      }

      delete this.defaultQuality;

      if(this.videoId !== null) {
        if(this.player_.options()['autoplay'] && this.playVideoIsAllowed) {
          this.ytplayer.loadVideoById({
            videoId: this.videoId,
            suggestedQuality: this.userQuality
          });
        } else {
          this.ytplayer.cueVideoById({
            videoId: this.videoId,
            suggestedQuality: this.userQuality
          });
        }

        // Update the poster
        this.playerEl_.querySelectorAll('.vjs-poster')[0].style.backgroundImage =
          'url(https://img.youtube.com/vi/' + this.videoId + '/0.jpg)';
        this.player_.poster('https://img.youtube.com/vi/' + this.videoId + '/0.jpg');
      }
      /* else Invalid URL */
    }

    return this.srcVal;
  };

  videojs.Youtube.prototype.load = function() {
  };

  videojs.Youtube.prototype.play = function() {
    if(this.videoId !== null) {

      // Make sure to not display the spinner for mobile
      if(!this.player_.options()['ytcontrols']) {
        // Display the spinner until the video is playing by YouTube
        this.player_.trigger('waiting');
      }

      if(this.isReady_) {
        // Sync the player volume with YouTube
        this.ytplayer.setVolume(this.player_.volume() * 100);

        if(this.volumeVal > 0) {
          this.ytplayer.unMute();
        } else {
          this.ytplayer.mute();
        }

        if(this.playVideoIsAllowed) {
          this.ytplayer.playVideo();
        }
      } else {
        this.playOnReady = true;
      }
    }
  };

  videojs.Youtube.prototype.pause = function() {
    this.ytplayer.pauseVideo();
  };
  videojs.Youtube.prototype.paused = function() {
    return (this.ytplayer) ?
      (this.lastState !== YT.PlayerState.PLAYING && this.lastState !== YT.PlayerState.BUFFERING)
      : true;
  };
  videojs.Youtube.prototype.currentTime = function() {
    return (this.ytplayer && this.ytplayer.getCurrentTime) ? this.ytplayer.getCurrentTime() : 0;
  };
  videojs.Youtube.prototype.setCurrentTime = function(seconds) {
    this.ytplayer.seekTo(seconds, true);
    this.player_.trigger('timeupdate');
  };
  videojs.Youtube.prototype.duration = function() {
    return (this.ytplayer && this.ytplayer.getDuration) ? this.ytplayer.getDuration() : 0;
  };
  videojs.Youtube.prototype.currentSrc = function() {
    return this.srcVal;
  };

  videojs.Youtube.prototype.volume = function() {
    if(this.ytplayer && isNaN(this.volumeVal)) {
      this.volumeVal = this.ytplayer.getVolume() / 100.0;
      this.player_.volume(this.volumeVal);
    }

    return this.volumeVal;
  };

  videojs.Youtube.prototype.setVolume = function(percentAsDecimal) {
    if(typeof(percentAsDecimal) !== 'undefined' && percentAsDecimal !== this.volumeVal) {
      this.ytplayer.setVolume(percentAsDecimal * 100.0);
      this.volumeVal = percentAsDecimal;
      this.player_.trigger('volumechange');
    }
  };

  videojs.Youtube.prototype.muted = function() {
    return this.mutedVal;
  };
  videojs.Youtube.prototype.setMuted = function(muted) {
    if(muted) {
      this.ytplayer.mute();
      this.player_.volume(0);
    } else {
      this.ytplayer.unMute();
      this.player_.volume(this.volumeVal);
    }

    this.mutedVal = muted;

    this.player_.trigger('volumechange');
  };

  videojs.Youtube.prototype.buffered = function() {
    if(this.ytplayer && this.ytplayer.getVideoBytesLoaded) {
      var loadedBytes = this.ytplayer.getVideoBytesLoaded();
      var totalBytes = this.ytplayer.getVideoBytesTotal();
      if(!loadedBytes || !totalBytes) {
        return 0;
      }

      var duration = this.ytplayer.getDuration();
      var secondsBuffered = (loadedBytes / totalBytes) * duration;
      var secondsOffset = (this.ytplayer.getVideoStartBytes() / totalBytes) * duration;

      return videojs.createTimeRange(secondsOffset, secondsOffset + secondsBuffered);
    } else {
      return videojs.createTimeRange(0, 0);
    }
  };

  videojs.Youtube.prototype.supportsFullScreen = function() {
    return true;
  };

  // YouTube is supported on all platforms
  videojs.Youtube.isSupported = function() {
    return true;
  };

  // You can use video/youtube as a media in your HTML5 video to specify the source
  videojs.Youtube.canPlaySource = function(srcObj) {
    return (srcObj.type === 'video/youtube');
  };

  // Always can control the volume
  videojs.Youtube.canControlVolume = function() {
    return true;
  };

  ////////////////////////////// YouTube specific functions //////////////////////////////

  // All videos created before YouTube API is loaded
  videojs.Youtube.loadingQueue = [];

  // Create the YouTube player
  videojs.Youtube.prototype.loadYoutube = function() {
    this.ytplayer = new YT.Player(this.id_, {
      events: {
        onReady: function(e) {
          e.target.vjsTech.onReady();
        },
        onStateChange: function(e) {
          e.target.vjsTech.onStateChange(e.data);
        },
        onPlaybackQualityChange: function(e) {
          e.target.vjsTech.onPlaybackQualityChange(e.data);
        },
        onError: function(e) {
          e.target.vjsTech.onError(e.data);
        }
      }
    });

    this.ytplayer.vjsTech = this;
  };

  // Transform a JavaScript object into URL params
  videojs.Youtube.makeQueryString = function(args) {
    var array = [];
    for(var key in args) {
      if(args.hasOwnProperty(key)) {
        array.push(key + '=' + args[key]);
      }
    }

    return array.join('&');
  };

  // Called when YouTube API is ready to be used
  window.onYouTubeIframeAPIReady = function() {
    var yt;
    while((yt = videojs.Youtube.loadingQueue.shift())) {
      yt.loadYoutube();
    }
    videojs.Youtube.loadingQueue = [];
    videojs.Youtube.apiReady = true;
  };

  videojs.Youtube.prototype.onReady = function() {
    this.isReady_ = true;
    this.triggerReady();

    this.player_.trigger('loadedmetadata');

    // The duration is loaded so we might as well fire off the timeupdate and duration events
    // this allows for the duration of the video (timeremaining) to be displayed if styled
    // to show the control bar initially. This gives the user the ability to see how long the video
    // is before clicking play
    this.player_.trigger('durationchange');
    this.player_.trigger('timeupdate');

    // Let the player take care of itself as soon as the YouTube is ready
    // The loading spinner while waiting for the tech would be impossible otherwise
    if(typeof this.player_.loadingSpinner !== 'undefined') {
      this.player_.loadingSpinner.hide();
    }

    if(this.player_.options()['muted']) {
      this.setMuted(true);
    }

    // Play ASAP if they clicked play before it's ready
    if(this.playOnReady) {
      this.playOnReady = false;
      this.play();
    }
  };

  videojs.Youtube.prototype.updateQualities = function() {

    function setupEventListener(el) {
      addEventListener(el, 'click', function() {
        var quality = this.getAttribute('data-val');
        self.ytplayer.setPlaybackQuality(quality);

        self.userQuality = quality;
        setInnerText(self.qualityTitle, videojs.Youtube.parseQualityName(quality));

        var selected = self.qualityMenuContent.querySelector('.vjs-selected');
        if(selected) {
          videojs.Youtube.removeClass(selected, 'vjs-selected');
        }

        videojs.Youtube.addClass(this, 'vjs-selected');
      });
    }

    var qualities = this.ytplayer.getAvailableQualityLevels();
    var self = this;

    if(qualities.indexOf(this.userQuality) < 0) {
      setInnerText(self.qualityTitle, videojs.Youtube.parseQualityName(this.defaultQuality));
    }

    if(qualities.length === 0) {
      this.qualityButton.style.display = 'none';
    } else {
      this.qualityButton.style.display = '';

      while(this.qualityMenuContent.hasChildNodes()) {
        this.qualityMenuContent.removeChild(this.qualityMenuContent.lastChild);
      }

      for(var i = 0; i < qualities.length; ++i) {
        var el = document.createElement('li');
        el.setAttribute('class', 'vjs-menu-item');
        setInnerText(el, videojs.Youtube.parseQualityName(qualities[i]));
        el.setAttribute('data-val', qualities[i]);
        if(qualities[i] === this.quality) {
          videojs.Youtube.addClass(el, 'vjs-selected');
        }
        setupEventListener(el);


        this.qualityMenuContent.appendChild(el);
      }
    }
  };

  videojs.Youtube.prototype.onStateChange = function(state) {
    if(state !== this.lastState) {
      switch(state) {
        case -1:
          this.player_.trigger('durationchange');
          break;

        case YT.PlayerState.ENDED:
          // Replace YouTube play button by our own
          if(!this.player_.options()['ytcontrols']) {
            this.playerEl_.querySelectorAll('.vjs-poster')[0].style.display = 'block';
            if(typeof this.player_.bigPlayButton !== 'undefined') {
              this.player_.bigPlayButton.show();
            }
          }

          this.player_.trigger('ended');
          break;

        case YT.PlayerState.PLAYING:
          this.playVideoIsAllowed = true;
          this.updateQualities();
          this.player_.trigger('timeupdate');
          this.player_.trigger('durationchange');
          this.player_.trigger('playing');
          this.player_.trigger('play');
          break;

        case YT.PlayerState.PAUSED:
          this.player_.trigger('pause');
          break;

        case YT.PlayerState.BUFFERING:
          this.player_.trigger('timeupdate');

          // Make sure to not display the spinner for mobile
          if(!this.player_.options()['ytcontrols']) {
            this.player_.trigger('waiting');
          }
          break;

        case YT.PlayerState.CUED:
          break;
      }

      this.lastState = state;
    }
  };

  videojs.Youtube.convertQualityName = function(name) {
    switch(name) {
      case '144p':
        return 'tiny';

      case '240p':
        return 'small';

      case '360p':
        return 'medium';

      case '480p':
        return 'large';

      case '720p':
        return 'hd720';

      case '1080p':
        return 'hd1080';
    }

    return 'auto';
  };

  videojs.Youtube.parseQualityName = function(name) {
    switch(name) {
      case 'tiny':
        return '144p';

      case 'small':
        return '240p';

      case 'medium':
        return '360p';

      case 'large':
        return '480p';

      case 'hd720':
        return '720p';

      case 'hd1080':
        return '1080p';
    }

    return 'auto';
  };

  videojs.Youtube.prototype.onPlaybackQualityChange = function(quality) {
    if(typeof this.defaultQuality === 'undefined') {
      this.defaultQuality = quality;

      if(typeof this.userQuality !== 'undefined') {
        return;
      }
    }

    this.quality = quality;
    setInnerText(this.qualityTitle, videojs.Youtube.parseQualityName(quality));

    switch(quality) {
      case 'medium':
        this.player_.videoWidth = 480;
        this.player_.videoHeight = 360;
        break;

      case 'large':
        this.player_.videoWidth = 640;
        this.player_.videoHeight = 480;
        break;

      case 'hd720':
        this.player_.videoWidth = 960;
        this.player_.videoHeight = 720;
        break;

      case 'hd1080':
        this.player_.videoWidth = 1440;
        this.player_.videoHeight = 1080;
        break;

      case 'highres':
        this.player_.videoWidth = 1920;
        this.player_.videoHeight = 1080;
        break;

      case 'small':
        this.player_.videoWidth = 320;
        this.player_.videoHeight = 240;
        break;

      case 'tiny':
        this.player_.videoWidth = 144;
        this.player_.videoHeight = 108;
        break;

      default:
        this.player_.videoWidth = 0;
        this.player_.videoHeight = 0;
        break;
    }

    this.player_.trigger('ratechange');
  };

  videojs.Youtube.prototype.onError = function(error) {
    this.player_.error(error);

    if(error === 100 || error === 101 || error === 150) {
      this.player_.bigPlayButton.hide();
      this.player_.loadingSpinner.hide();
      this.player_.posterImage.hide();
    }
  };

  /**
   * Add a CSS class name to an element
   * @param {Element} element    Element to add class name to
   * @param {String} classToAdd Classname to add
   */
  videojs.Youtube.addClass = function(element, classToAdd) {
    if((' ' + element.className + ' ').indexOf(' ' + classToAdd + ' ') === -1) {
      element.className = element.className === '' ? classToAdd : element.className + ' ' + classToAdd;
    }
  };

  /**
   * Remove a CSS class name from an element
   * @param {Element} element    Element to remove from class name
   * @param {String} classToRemove Classname to remove
   */
  videojs.Youtube.removeClass = function(element, classToRemove) {
    var classNames, i;

    if(element.className.indexOf(classToRemove) === -1) {
      return;
    }

    classNames = element.className.split(' ');

    // no arr.indexOf in ie8, and we don't want to add a big shim
    for(i = classNames.length - 1; i >= 0; i--) {
      if(classNames[i] === classToRemove) {
        classNames.splice(i, 1);
      }
    }

    element.className = classNames.join(' ');
  };

  // Cross-browsers support (IE8 wink wink)
  function setInnerText(element, text) {
    if(typeof element === 'undefined') {
      return false;
    }

    var textProperty = ('innerText' in element) ? 'innerText' : 'textContent';

    try {
      element[textProperty] = text;
    } catch(anException) {
      //IE<9 FIX
      element.setAttribute('innerText', text);
    }
  }


// Stretch the YouTube poster
  var style = document.createElement('style');
  var def = ' ' +
    '.vjs-youtube .vjs-poster { background-size: 100%!important; }' +
    '.vjs-youtube .vjs-poster, ' +
    '.vjs-youtube .vjs-loading-spinner, ' +
    '.vjs-youtube .vjs-text-track-display{' +
    '    pointer-events: none !important;' +
    ' }' +
    '.vjs-youtube.vjs-user-active .iframeblocker { display: none; }' +
    '.vjs-youtube.vjs-user-inactive .vjs-tech.onDesktop { pointer-events: none; }' +
    '.vjs-quality-button > div:first-child > span:first-child { position:relative;top:7px }';

  style.setAttribute('type', 'text/css');
  document.getElementsByTagName('head')[0].appendChild(style);

  if(style.styleSheet) {
    style.styleSheet.cssText = def;
  } else {
    style.appendChild(document.createTextNode(def));
  }

  // IE8 fix for indexOf
  if(!Array.prototype.indexOf) {
    Array.prototype.indexOf = function(elt /*, from*/) {
      var len = this.length >>> 0; // jshint ignore:line

      var from = Number(arguments[1]) || 0;
      from = (from < 0) ?
        Math.ceil(from)
        : Math.floor(from);
      if(from < 0) {
        from += len;
      }

      for(; from < len; from++) {
        if(from in this && this[from] === elt) {
          return from;
        }
      }
      return -1;
    };
  }
})();
var utils = {
  isCanvasSupported: function() {
    var elem = document.createElement('canvas');
    return !!(elem.getContext && elem.getContext('2d'));
  }
};

if (utils.isCanvasSupported()) {
    /**
     * @license
     * pixi.js - v1.6.0
     * Copyright (c) 2012-2014, Mat Groves
     * http://goodboydigital.com/
     *
     * Compiled: 2014-07-18
     *
     * pixi.js is licensed under the MIT License.
     * http://www.opensource.org/licenses/mit-license.php
     */
    /**
     * @author Mat Groves http://matgroves.com/ @Doormat23
     */

    (function(){

        var root = this;

    /**
     * @author Mat Groves http://matgroves.com/ @Doormat23
     */

    /**
     * @module PIXI
     */
    var PIXI = PIXI || {};

    /* 
    * 
    * This file contains a lot of pixi consts which are used across the rendering engine
    * @class Consts
    */
    PIXI.WEBGL_RENDERER = 0;
    PIXI.CANVAS_RENDERER = 1;

    // useful for testing against if your lib is using pixi.
    PIXI.VERSION = "v1.6.1";


    // the various blend modes supported by pixi
    PIXI.blendModes = {
        NORMAL:0,
        ADD:1,
        MULTIPLY:2,
        SCREEN:3,
        OVERLAY:4,
        DARKEN:5,
        LIGHTEN:6,
        COLOR_DODGE:7,
        COLOR_BURN:8,
        HARD_LIGHT:9,
        SOFT_LIGHT:10,
        DIFFERENCE:11,
        EXCLUSION:12,
        HUE:13,
        SATURATION:14,
        COLOR:15,
        LUMINOSITY:16
    };

    // the scale modes
    PIXI.scaleModes = {
        DEFAULT:0,
        LINEAR:0,
        NEAREST:1
    };

    // used to create uids for various pixi objects..
    PIXI._UID = 0;

    if(typeof(Float32Array) != 'undefined')
    {
        PIXI.Float32Array = Float32Array;
        PIXI.Uint16Array = Uint16Array;
    }
    else
    {
        PIXI.Float32Array = Array;
        PIXI.Uint16Array = Array;
    }

    // interaction frequency 
    PIXI.INTERACTION_FREQUENCY = 30;
    PIXI.AUTO_PREVENT_DEFAULT = true;

    PIXI.RAD_TO_DEG = 180 / Math.PI;
    PIXI.DEG_TO_RAD = Math.PI / 180;


    PIXI.dontSayHello = false;

    PIXI.sayHello = function (type) 
    {
        if(PIXI.dontSayHello)return;

        if ( navigator.userAgent.toLowerCase().indexOf('chrome') > -1 )
        {
            var args = [
                '%c %c %c Pixi.js ' + PIXI.VERSION + ' - ' + type + '  %c ' + ' %c ' + ' http://www.pixijs.com/  %c %c ♥%c♥%c♥ ',
                'background: #ff66a5',
                'background: #ff66a5',
                'color: #ff66a5; background: #030307;',
                'background: #ff66a5',
                'background: #ffc3dc',
                'background: #ff66a5',
                'color: #ff2424; background: #fff',
                'color: #ff2424; background: #fff',
                'color: #ff2424; background: #fff'
            ];

           

            console.log.apply(console, args);
        }
        else if (window['console'])
        {
            console.log('Pixi.js ' + PIXI.VERSION + ' - http://www.pixijs.com/');
        }

        PIXI.dontSayHello = true;
    };

    /**
     * @author Mat Groves http://matgroves.com/ @Doormat23
     */

    /**
     * The Point object represents a location in a two-dimensional coordinate system, where x represents the horizontal axis and y represents the vertical axis.
     *
     * @class Point
     * @constructor
     * @param x {Number} position of the point on the x axis
     * @param y {Number} position of the point on the y axis
     */
    PIXI.Point = function(x, y)
    {
        /**
         * @property x
         * @type Number
         * @default 0
         */
        this.x = x || 0;

        /**
         * @property y
         * @type Number
         * @default 0
         */
        this.y = y || 0;
    };

    /**
     * Creates a clone of this point
     *
     * @method clone
     * @return {Point} a copy of the point
     */
    PIXI.Point.prototype.clone = function()
    {
        return new PIXI.Point(this.x, this.y);
    };

    /**
     * Sets the point to a new x and y position.
     * If y is ommited, both x and y will be set to x.
     * 
     * @method set
     * @param [x=0] {Number} position of the point on the x axis
     * @param [y=0] {Number} position of the point on the y axis
     */
    PIXI.Point.prototype.set = function(x, y)
    {
        this.x = x || 0;
        this.y = y || ( (y !== 0) ? this.x : 0 ) ;
    };

    // constructor
    PIXI.Point.prototype.constructor = PIXI.Point;
    /**
     * @author Mat Groves http://matgroves.com/
     */

    /**
     * the Rectangle object is an area defined by its position, as indicated by its top-left corner point (x, y) and by its width and its height.
     *
     * @class Rectangle
     * @constructor
     * @param x {Number} The X coord of the upper-left corner of the rectangle
     * @param y {Number} The Y coord of the upper-left corner of the rectangle
     * @param width {Number} The overall width of this rectangle
     * @param height {Number} The overall height of this rectangle
     */
    PIXI.Rectangle = function(x, y, width, height)
    {
        /**
         * @property x
         * @type Number
         * @default 0
         */
        this.x = x || 0;

        /**
         * @property y
         * @type Number
         * @default 0
         */
        this.y = y || 0;

        /**
         * @property width
         * @type Number
         * @default 0
         */
        this.width = width || 0;

        /**
         * @property height
         * @type Number
         * @default 0
         */
        this.height = height || 0;
    };

    /**
     * Creates a clone of this Rectangle
     *
     * @method clone
     * @return {Rectangle} a copy of the rectangle
     */
    PIXI.Rectangle.prototype.clone = function()
    {
        return new PIXI.Rectangle(this.x, this.y, this.width, this.height);
    };

    /**
     * Checks whether the x and y coordinates passed to this function are contained within this Rectangle
     *
     * @method contains
     * @param x {Number} The X coordinate of the point to test
     * @param y {Number} The Y coordinate of the point to test
     * @return {Boolean} Whether the x/y coords are within this Rectangle
     */
    PIXI.Rectangle.prototype.contains = function(x, y)
    {
        if(this.width <= 0 || this.height <= 0)
            return false;

        var x1 = this.x;
        if(x >= x1 && x <= x1 + this.width)
        {
            var y1 = this.y;

            if(y >= y1 && y <= y1 + this.height)
            {
                return true;
            }
        }

        return false;
    };

    // constructor
    PIXI.Rectangle.prototype.constructor = PIXI.Rectangle;

    PIXI.EmptyRectangle = new PIXI.Rectangle(0,0,0,0);
    /**
     * @author Adrien Brault <adrien.brault@gmail.com>
     */

    /**
     * @class Polygon
     * @constructor
     * @param points* {Array<Point>|Array<Number>|Point...|Number...} This can be an array of Points that form the polygon,
     *      a flat array of numbers that will be interpreted as [x,y, x,y, ...], or the arguments passed can be
     *      all the points of the polygon e.g. `new PIXI.Polygon(new PIXI.Point(), new PIXI.Point(), ...)`, or the
     *      arguments passed can be flat x,y values e.g. `new PIXI.Polygon(x,y, x,y, x,y, ...)` where `x` and `y` are
     *      Numbers.
     */
    PIXI.Polygon = function(points)
    {
        //if points isn't an array, use arguments as the array
        if(!(points instanceof Array))
            points = Array.prototype.slice.call(arguments);

        //if this is a flat array of numbers, convert it to points
        if(typeof points[0] === 'number') {
            var p = [];
            for(var i = 0, il = points.length; i < il; i+=2) {
                p.push(
                    new PIXI.Point(points[i], points[i + 1])
                );
            }

            points = p;
        }

        this.points = points;
    };

    /**
     * Creates a clone of this polygon
     *
     * @method clone
     * @return {Polygon} a copy of the polygon
     */
    PIXI.Polygon.prototype.clone = function()
    {
        var points = [];
        for (var i=0; i<this.points.length; i++) {
            points.push(this.points[i].clone());
        }

        return new PIXI.Polygon(points);
    };

    /**
     * Checks whether the x and y coordinates passed to this function are contained within this polygon
     *
     * @method contains
     * @param x {Number} The X coordinate of the point to test
     * @param y {Number} The Y coordinate of the point to test
     * @return {Boolean} Whether the x/y coordinates are within this polygon
     */
    PIXI.Polygon.prototype.contains = function(x, y)
    {
        var inside = false;

        // use some raycasting to test hits
        // https://github.com/substack/point-in-polygon/blob/master/index.js
        for(var i = 0, j = this.points.length - 1; i < this.points.length; j = i++) {
            var xi = this.points[i].x, yi = this.points[i].y,
                xj = this.points[j].x, yj = this.points[j].y,
                intersect = ((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);

            if(intersect) inside = !inside;
        }

        return inside;
    };

    // constructor
    PIXI.Polygon.prototype.constructor = PIXI.Polygon;

    /**
     * @author Chad Engler <chad@pantherdev.com>
     */

    /**
     * The Circle object can be used to specify a hit area for displayObjects
     *
     * @class Circle
     * @constructor
     * @param x {Number} The X coordinate of the center of this circle
     * @param y {Number} The Y coordinate of the center of this circle
     * @param radius {Number} The radius of the circle
     */
    PIXI.Circle = function(x, y, radius)
    {
        /**
         * @property x
         * @type Number
         * @default 0
         */
        this.x = x || 0;

        /**
         * @property y
         * @type Number
         * @default 0
         */
        this.y = y || 0;

        /**
         * @property radius
         * @type Number
         * @default 0
         */
        this.radius = radius || 0;
    };

    /**
     * Creates a clone of this Circle instance
     *
     * @method clone
     * @return {Circle} a copy of the polygon
     */
    PIXI.Circle.prototype.clone = function()
    {
        return new PIXI.Circle(this.x, this.y, this.radius);
    };

    /**
     * Checks whether the x, and y coordinates passed to this function are contained within this circle
     *
     * @method contains
     * @param x {Number} The X coordinate of the point to test
     * @param y {Number} The Y coordinate of the point to test
     * @return {Boolean} Whether the x/y coordinates are within this polygon
     */
    PIXI.Circle.prototype.contains = function(x, y)
    {
        if(this.radius <= 0)
            return false;

        var dx = (this.x - x),
            dy = (this.y - y),
            r2 = this.radius * this.radius;

        dx *= dx;
        dy *= dy;

        return (dx + dy <= r2);
    };

    /**
    * Returns the framing rectangle of the circle as a PIXI.Rectangle object
    *
    * @method getBounds
    * @return {Rectangle} the framing rectangle
    */
    PIXI.Circle.prototype.getBounds = function()
    {
        return new PIXI.Rectangle(this.x - this.radius, this.y - this.radius, this.width, this.height);
    };

    // constructor
    PIXI.Circle.prototype.constructor = PIXI.Circle;


    /**
     * @author Chad Engler <chad@pantherdev.com>
     */

    /**
     * The Ellipse object can be used to specify a hit area for displayObjects
     *
     * @class Ellipse
     * @constructor
     * @param x {Number} The X coordinate of the center of the ellipse
     * @param y {Number} The Y coordinate of the center of the ellipse
     * @param width {Number} The half width of this ellipse
     * @param height {Number} The half height of this ellipse
     */
    PIXI.Ellipse = function(x, y, width, height)
    {
        /**
         * @property x
         * @type Number
         * @default 0
         */
        this.x = x || 0;

        /**
         * @property y
         * @type Number
         * @default 0
         */
        this.y = y || 0;

        /**
         * @property width
         * @type Number
         * @default 0
         */
        this.width = width || 0;

        /**
         * @property height
         * @type Number
         * @default 0
         */
        this.height = height || 0;
    };

    /**
     * Creates a clone of this Ellipse instance
     *
     * @method clone
     * @return {Ellipse} a copy of the ellipse
     */
    PIXI.Ellipse.prototype.clone = function()
    {
        return new PIXI.Ellipse(this.x, this.y, this.width, this.height);
    };

    /**
     * Checks whether the x and y coordinates passed to this function are contained within this ellipse
     *
     * @method contains
     * @param x {Number} The X coordinate of the point to test
     * @param y {Number} The Y coordinate of the point to test
     * @return {Boolean} Whether the x/y coords are within this ellipse
     */
    PIXI.Ellipse.prototype.contains = function(x, y)
    {
        if(this.width <= 0 || this.height <= 0)
            return false;

        //normalize the coords to an ellipse with center 0,0
        var normx = ((x - this.x) / this.width),
            normy = ((y - this.y) / this.height);

        normx *= normx;
        normy *= normy;

        return (normx + normy <= 1);
    };

    /**
    * Returns the framing rectangle of the ellipse as a PIXI.Rectangle object
    *
    * @method getBounds
    * @return {Rectangle} the framing rectangle
    */
    PIXI.Ellipse.prototype.getBounds = function()
    {
        return new PIXI.Rectangle(this.x - this.width, this.y - this.height, this.width, this.height);
    };

    // constructor
    PIXI.Ellipse.prototype.constructor = PIXI.Ellipse;

    /**
     * @author Mat Groves http://matgroves.com/ @Doormat23
     */

    /**
     * The Matrix class is now an object, which makes it a lot faster, 
     * here is a representation of it : 
     * | a | b | tx|
     * | c | d | ty|
     * | 0 | 0 | 1 |
     *
     * @class Matrix
     * @constructor
     */
    PIXI.Matrix = function()
    {
        this.a = 1;
        this.b = 0;
        this.c = 0;
        this.d = 1;
        this.tx = 0;
        this.ty = 0;
    };

    /**
     * Creates a pixi matrix object based on the array given as a parameter
     *
     * @method fromArray
     * @param array {Array} The array that the matrix will be filled with
     */
    PIXI.Matrix.prototype.fromArray = function(array)
    {
        this.a = array[0];
        this.b = array[1];
        this.c = array[3];
        this.d = array[4];
        this.tx = array[2];
        this.ty = array[5];
    };

    /**
     * Creates an array from the current Matrix object
     *
     * @method toArray
     * @param transpose {Boolean} Whether we need to transpose the matrix or not
     * @return {Array} the newly created array which contains the matrix
     */
    PIXI.Matrix.prototype.toArray = function(transpose)
    {
        if(!this.array) this.array = new Float32Array(9);
        var array = this.array;

        if(transpose)
        {
            array[0] = this.a;
            array[1] = this.c;
            array[2] = 0;
            array[3] = this.b;
            array[4] = this.d;
            array[5] = 0;
            array[6] = this.tx;
            array[7] = this.ty;
            array[8] = 1;
        }
        else
        {
            array[0] = this.a;
            array[1] = this.b;
            array[2] = this.tx;
            array[3] = this.c;
            array[4] = this.d;
            array[5] = this.ty;
            array[6] = 0;
            array[7] = 0;
            array[8] = 1;
        }

        return array;
    };

    PIXI.identityMatrix = new PIXI.Matrix();

    PIXI.determineMatrixArrayType = function() {
        return (typeof Float32Array !== 'undefined') ? Float32Array : Array;
    };

    /**
     * The Matrix2 class will choose the best type of array to use between
     * a regular javascript Array and a Float32Array if the latter is available
     *
     * @class Matrix2
     * @constructor
     */
    PIXI.Matrix2 = PIXI.determineMatrixArrayType();

    /**
     * @author Mat Groves http://matgroves.com/ @Doormat23
     */

    /**
     * The base class for all objects that are rendered on the screen. 
     * This is an abstract class and should not be used on its own rather it should be extended.
     *
     * @class DisplayObject
     * @constructor
     */
    PIXI.DisplayObject = function()
    {
        /**
         * The coordinate of the object relative to the local coordinates of the parent.
         *
         * @property position
         * @type Point
         */
        this.position = new PIXI.Point();

        /**
         * The scale factor of the object.
         *
         * @property scale
         * @type Point
         */
        this.scale = new PIXI.Point(1,1);//{x:1, y:1};

        /**
         * The pivot point of the displayObject that it rotates around
         *
         * @property pivot
         * @type Point
         */
        this.pivot = new PIXI.Point(0,0);

        /**
         * The rotation of the object in radians.
         *
         * @property rotation
         * @type Number
         */
        this.rotation = 0;

        /**
         * The opacity of the object.
         *
         * @property alpha
         * @type Number
         */
        this.alpha = 1;

        /**
         * The visibility of the object.
         *
         * @property visible
         * @type Boolean
         */
        this.visible = true;

        /**
         * This is the defined area that will pick up mouse / touch events. It is null by default.
         * Setting it is a neat way of optimising the hitTest function that the interactionManager will use (as it will not need to hit test all the children)
         *
         * @property hitArea
         * @type Rectangle|Circle|Ellipse|Polygon
         */
        this.hitArea = null;

        /**
         * This is used to indicate if the displayObject should display a mouse hand cursor on rollover
         *
         * @property buttonMode
         * @type Boolean
         */
        this.buttonMode = false;

        /**
         * Can this object be rendered
         *
         * @property renderable
         * @type Boolean
         */
        this.renderable = false;

        /**
         * [read-only] The display object container that contains this display object.
         *
         * @property parent
         * @type DisplayObjectContainer
         * @readOnly
         */
        this.parent = null;

        /**
         * [read-only] The stage the display object is connected to, or undefined if it is not connected to the stage.
         *
         * @property stage
         * @type Stage
         * @readOnly
         */
        this.stage = null;

        /**
         * [read-only] The multiplied alpha of the displayObject
         *
         * @property worldAlpha
         * @type Number
         * @readOnly
         */
        this.worldAlpha = 1;

        /**
         * [read-only] Whether or not the object is interactive, do not toggle directly! use the `interactive` property
         *
         * @property _interactive
         * @type Boolean
         * @readOnly
         * @private
         */
        this._interactive = false;

        /**
         * This is the cursor that will be used when the mouse is over this object. To enable this the element must have interaction = true and buttonMode = true
         * 
         * @property defaultCursor
         * @type String
         *
        */
        this.defaultCursor = 'pointer';

        /**
         * [read-only] Current transform of the object based on world (parent) factors
         *
         * @property worldTransform
         * @type Mat3
         * @readOnly
         * @private
         */
        this.worldTransform = new PIXI.Matrix();

        /**
         * [NYI] Unknown
         *
         * @property color
         * @type Array<>
         * @private
         */
        this.color = [];

        /**
         * [NYI] Holds whether or not this object is dynamic, for rendering optimization
         *
         * @property dynamic
         * @type Boolean
         * @private
         */
        this.dynamic = true;

        // cached sin rotation and cos rotation
        this._sr = 0;
        this._cr = 1;

        /**
         * The area the filter is applied to like the hitArea this is used as more of an optimisation
         * rather than figuring out the dimensions of the displayObject each frame you can set this rectangle
         *
         * @property filterArea
         * @type Rectangle
         */
        this.filterArea = null;//new PIXI.Rectangle(0,0,1,1);

        /**
         * The original, cached bounds of the object
         *
         * @property _bounds
         * @type Rectangle
         * @private
         */
        this._bounds = new PIXI.Rectangle(0, 0, 1, 1);
        /**
         * The most up-to-date bounds of the object
         *
         * @property _currentBounds
         * @type Rectangle
         * @private
         */
        this._currentBounds = null;
        /**
         * The original, cached mask of the object
         *
         * @property _currentBounds
         * @type Rectangle
         * @private
         */
        this._mask = null;

        this._cacheAsBitmap = false;
        this._cacheIsDirty = false;


        /*
         * MOUSE Callbacks
         */

        /**
         * A callback that is used when the users clicks on the displayObject with their mouse
         * @method click
         * @param interactionData {InteractionData}
         */

        /**
         * A callback that is used when the user clicks the mouse down over the sprite
         * @method mousedown
         * @param interactionData {InteractionData}
         */

        /**
         * A callback that is used when the user releases the mouse that was over the displayObject
         * for this callback to be fired the mouse must have been pressed down over the displayObject
         * @method mouseup
         * @param interactionData {InteractionData}
         */

        /**
         * A callback that is used when the user releases the mouse that was over the displayObject but is no longer over the displayObject
         * for this callback to be fired, The touch must have started over the displayObject
         * @method mouseupoutside
         * @param interactionData {InteractionData}
         */

        /**
         * A callback that is used when the users mouse rolls over the displayObject
         * @method mouseover
         * @param interactionData {InteractionData}
         */

        /**
         * A callback that is used when the users mouse leaves the displayObject
         * @method mouseout
         * @param interactionData {InteractionData}
         */


        /*
         * TOUCH Callbacks
         */

        /**
         * A callback that is used when the users taps on the sprite with their finger
         * basically a touch version of click
         * @method tap
         * @param interactionData {InteractionData}
         */

        /**
         * A callback that is used when the user touches over the displayObject
         * @method touchstart
         * @param interactionData {InteractionData}
         */

        /**
         * A callback that is used when the user releases a touch over the displayObject
         * @method touchend
         * @param interactionData {InteractionData}
         */

        /**
         * A callback that is used when the user releases the touch that was over the displayObject
         * for this callback to be fired, The touch must have started over the sprite
         * @method touchendoutside
         * @param interactionData {InteractionData}
         */
    };

    // constructor
    PIXI.DisplayObject.prototype.constructor = PIXI.DisplayObject;

    /**
     * [Deprecated] Indicates if the sprite will have touch and mouse interactivity. It is false by default
     * Instead of using this function you can now simply set the interactive property to true or false
     *
     * @method setInteractive
     * @param interactive {Boolean}
     * @deprecated Simply set the `interactive` property directly
     */
    PIXI.DisplayObject.prototype.setInteractive = function(interactive)
    {
        this.interactive = interactive;
    };

    /**
     * Indicates if the sprite will have touch and mouse interactivity. It is false by default
     *
     * @property interactive
     * @type Boolean
     * @default false
     */
    Object.defineProperty(PIXI.DisplayObject.prototype, 'interactive', {
        get: function() {
            return this._interactive;
        },
        set: function(value) {
            this._interactive = value;

            // TODO more to be done here..
            // need to sort out a re-crawl!
            if(this.stage)this.stage.dirty = true;
        }
    });

    /**
     * [read-only] Indicates if the sprite is globaly visible.
     *
     * @property worldVisible
     * @type Boolean
     */
    Object.defineProperty(PIXI.DisplayObject.prototype, 'worldVisible', {
        get: function() {
            var item = this;

            do
            {
                if(!item.visible)return false;
                item = item.parent;
            }
            while(item);

            return true;
        }
    });

    /**
     * Sets a mask for the displayObject. A mask is an object that limits the visibility of an object to the shape of the mask applied to it.
     * In PIXI a regular mask must be a PIXI.Graphics object. This allows for much faster masking in canvas as it utilises shape clipping.
     * To remove a mask, set this property to null.
     *
     * @property mask
     * @type Graphics
     */
    Object.defineProperty(PIXI.DisplayObject.prototype, 'mask', {
        get: function() {
            return this._mask;
        },
        set: function(value) {

            if(this._mask)this._mask.isMask = false;
            this._mask = value;
            if(this._mask)this._mask.isMask = true;
        }
    });

    /**
     * Sets the filters for the displayObject.
     * * IMPORTANT: This is a webGL only feature and will be ignored by the canvas renderer.
     * To remove filters simply set this property to 'null'
     * @property filters
     * @type Array An array of filters
     */
    Object.defineProperty(PIXI.DisplayObject.prototype, 'filters', {
        get: function() {
            return this._filters;
        },
        set: function(value) {

            if(value)
            {
                // now put all the passes in one place..
                var passes = [];
                for (var i = 0; i < value.length; i++)
                {
                    var filterPasses = value[i].passes;
                    for (var j = 0; j < filterPasses.length; j++)
                    {
                        passes.push(filterPasses[j]);
                    }
                }

                // TODO change this as it is legacy
                this._filterBlock = {target:this, filterPasses:passes};
            }

            this._filters = value;
        }
    });

    /**
     * Set weather or not a the display objects is cached as a bitmap.
     * This basically takes a snap shot of the display object as it is at that moment. It can provide a performance benefit for complex static displayObjects
     * To remove filters simply set this property to 'null'
     * @property cacheAsBitmap
     * @type Boolean
     */
    Object.defineProperty(PIXI.DisplayObject.prototype, 'cacheAsBitmap', {
        get: function() {
            return  this._cacheAsBitmap;
        },
        set: function(value) {

            if(this._cacheAsBitmap === value)return;

            if(value)
            {
                //this._cacheIsDirty = true;
                this._generateCachedSprite();
            }
            else
            {
                this._destroyCachedSprite();
            }

            this._cacheAsBitmap = value;
        }
    });

    /*
     * Updates the object transform for rendering
     *
     * @method updateTransform
     * @private
     */
    PIXI.DisplayObject.prototype.updateTransform = function()
    {
        // TODO OPTIMIZE THIS!! with dirty
        if(this.rotation !== this.rotationCache)
        {

            this.rotationCache = this.rotation;
            this._sr =  Math.sin(this.rotation);
            this._cr =  Math.cos(this.rotation);
        }

       // var localTransform = this.localTransform//.toArray();
        var parentTransform = this.parent.worldTransform;//.toArray();
        var worldTransform = this.worldTransform;//.toArray();

        var px = this.pivot.x;
        var py = this.pivot.y;

        var a00 = this._cr * this.scale.x,
            a01 = -this._sr * this.scale.y,
            a10 = this._sr * this.scale.x,
            a11 = this._cr * this.scale.y,
            a02 = this.position.x - a00 * px - py * a01,
            a12 = this.position.y - a11 * py - px * a10,
            b00 = parentTransform.a, b01 = parentTransform.b,
            b10 = parentTransform.c, b11 = parentTransform.d;

        worldTransform.a = b00 * a00 + b01 * a10;
        worldTransform.b = b00 * a01 + b01 * a11;
        worldTransform.tx = b00 * a02 + b01 * a12 + parentTransform.tx;

        worldTransform.c = b10 * a00 + b11 * a10;
        worldTransform.d = b10 * a01 + b11 * a11;
        worldTransform.ty = b10 * a02 + b11 * a12 + parentTransform.ty;

        this.worldAlpha = this.alpha * this.parent.worldAlpha;
    };

    /**
     * Retrieves the bounds of the displayObject as a rectangle object
     *
     * @method getBounds
     * @return {Rectangle} the rectangular bounding area
     */
    PIXI.DisplayObject.prototype.getBounds = function( matrix )
    {
        matrix = matrix;//just to get passed js hinting (and preserve inheritance)
        return PIXI.EmptyRectangle;
    };

    /**
     * Retrieves the local bounds of the displayObject as a rectangle object
     *
     * @method getLocalBounds
     * @return {Rectangle} the rectangular bounding area
     */
    PIXI.DisplayObject.prototype.getLocalBounds = function()
    {
        return this.getBounds(PIXI.identityMatrix);///PIXI.EmptyRectangle();
    };


    /**
     * Sets the object's stage reference, the stage this object is connected to
     *
     * @method setStageReference
     * @param stage {Stage} the stage that the object will have as its current stage reference
     */
    PIXI.DisplayObject.prototype.setStageReference = function(stage)
    {
        this.stage = stage;
        if(this._interactive)this.stage.dirty = true;
    };

    PIXI.DisplayObject.prototype.generateTexture = function(renderer)
    {
        var bounds = this.getLocalBounds();

        var renderTexture = new PIXI.RenderTexture(bounds.width | 0, bounds.height | 0, renderer);
        renderTexture.render(this, new PIXI.Point(-bounds.x, -bounds.y) );

        return renderTexture;
    };

    PIXI.DisplayObject.prototype.updateCache = function()
    {
        this._generateCachedSprite();
    };

    PIXI.DisplayObject.prototype._renderCachedSprite = function(renderSession)
    {
        this._cachedSprite.worldAlpha = this.worldAlpha;
       
        if(renderSession.gl)
        {
            PIXI.Sprite.prototype._renderWebGL.call(this._cachedSprite, renderSession);
        }
        else
        {
            PIXI.Sprite.prototype._renderCanvas.call(this._cachedSprite, renderSession);
        }
    };

    PIXI.DisplayObject.prototype._generateCachedSprite = function()//renderSession)
    {
        this._cacheAsBitmap = false;
        var bounds = this.getLocalBounds();
       
        if(!this._cachedSprite)
        {
            var renderTexture = new PIXI.RenderTexture(bounds.width | 0, bounds.height | 0);//, renderSession.renderer);
            
            this._cachedSprite = new PIXI.Sprite(renderTexture);
            this._cachedSprite.worldTransform = this.worldTransform;
        }
        else
        {
            this._cachedSprite.texture.resize(bounds.width | 0, bounds.height | 0);
        }

        //REMOVE filter!
        var tempFilters = this._filters;
        this._filters = null;

        this._cachedSprite.filters = tempFilters;
        this._cachedSprite.texture.render(this, new PIXI.Point(-bounds.x, -bounds.y) );

        this._cachedSprite.anchor.x = -( bounds.x / bounds.width );
        this._cachedSprite.anchor.y = -( bounds.y / bounds.height );

        this._filters = tempFilters;

        this._cacheAsBitmap = true;
    };

    /**
    * Renders the object using the WebGL renderer
    *
    * @method _renderWebGL
    * @param renderSession {RenderSession} 
    * @private
    */
    PIXI.DisplayObject.prototype._destroyCachedSprite = function()
    {
        if(!this._cachedSprite)return;

        this._cachedSprite.texture.destroy(true);
      //  console.log("DESTROY")
        // let the gc collect the unused sprite
        // TODO could be object pooled!
        this._cachedSprite = null;
    };


    PIXI.DisplayObject.prototype._renderWebGL = function(renderSession)
    {
        // OVERWRITE;
        // this line is just here to pass jshinting :)
        renderSession = renderSession;
    };

    /**
    * Renders the object using the Canvas renderer
    *
    * @method _renderCanvas
    * @param renderSession {RenderSession} 
    * @private
    */
    PIXI.DisplayObject.prototype._renderCanvas = function(renderSession)
    {
        // OVERWRITE;
        // this line is just here to pass jshinting :)
        renderSession = renderSession;
    };

    /**
     * The position of the displayObject on the x axis relative to the local coordinates of the parent.
     *
     * @property x
     * @type Number
     */
    Object.defineProperty(PIXI.DisplayObject.prototype, 'x', {
        get: function() {
            return  this.position.x;
        },
        set: function(value) {
            this.position.x = value;
        }
    });

    /**
     * The position of the displayObject on the y axis relative to the local coordinates of the parent.
     *
     * @property y
     * @type Number
     */
    Object.defineProperty(PIXI.DisplayObject.prototype, 'y', {
        get: function() {
            return  this.position.y;
        },
        set: function(value) {
            this.position.y = value;
        }
    });

    /**
     * @author Mat Groves http://matgroves.com/ @Doormat23
     */


    /**
     * A DisplayObjectContainer represents a collection of display objects.
     * It is the base class of all display objects that act as a container for other objects.
     *
     * @class DisplayObjectContainer
     * @extends DisplayObject
     * @constructor
     */
    PIXI.DisplayObjectContainer = function()
    {
        PIXI.DisplayObject.call( this );

        /**
         * [read-only] The array of children of this container.
         *
         * @property children
         * @type Array<DisplayObject>
         * @readOnly
         */
        this.children = [];
    };

    // constructor
    PIXI.DisplayObjectContainer.prototype = Object.create( PIXI.DisplayObject.prototype );
    PIXI.DisplayObjectContainer.prototype.constructor = PIXI.DisplayObjectContainer;

    /**
     * The width of the displayObjectContainer, setting this will actually modify the scale to achieve the value set
     *
     * @property width
     * @type Number
     */

     
    Object.defineProperty(PIXI.DisplayObjectContainer.prototype, 'width', {
        get: function() {
            return this.scale.x * this.getLocalBounds().width;
        },
        set: function(value) {
            
            var width = this.getLocalBounds().width;

            if(width !== 0)
            {
                this.scale.x = value / ( width/this.scale.x );
            }
            else
            {
                this.scale.x = 1;
            }

            
            this._width = value;
        }
    });


    /**
     * The height of the displayObjectContainer, setting this will actually modify the scale to achieve the value set
     *
     * @property height
     * @type Number
     */

    Object.defineProperty(PIXI.DisplayObjectContainer.prototype, 'height', {
        get: function() {
            return  this.scale.y * this.getLocalBounds().height;
        },
        set: function(value) {

            var height = this.getLocalBounds().height;

            if(height !== 0)
            {
                this.scale.y = value / ( height/this.scale.y );
            }
            else
            {
                this.scale.y = 1;
            }

            this._height = value;
        }
    });


    /**
     * Adds a child to the container.
     *
     * @method addChild
     * @param child {DisplayObject} The DisplayObject to add to the container
     */
    PIXI.DisplayObjectContainer.prototype.addChild = function(child)
    {
        return this.addChildAt(child, this.children.length);
    };

    /**
     * Adds a child to the container at a specified index. If the index is out of bounds an error will be thrown
     *
     * @method addChildAt
     * @param child {DisplayObject} The child to add
     * @param index {Number} The index to place the child in
     */
    PIXI.DisplayObjectContainer.prototype.addChildAt = function(child, index)
    {
        if(index >= 0 && index <= this.children.length)
        {
            if(child.parent)
            {
                child.parent.removeChild(child);
            }

            child.parent = this;

            this.children.splice(index, 0, child);

            if(this.stage)child.setStageReference(this.stage);

            return child;
        }
        else
        {
            throw new Error(child + ' The index '+ index +' supplied is out of bounds ' + this.children.length);
        }
    };

    /**
     * [NYI] Swaps the depth of 2 displayObjects
     *
     * @method swapChildren
     * @param child {DisplayObject}
     * @param child2 {DisplayObject}
     * @private
     */
    PIXI.DisplayObjectContainer.prototype.swapChildren = function(child, child2)
    {
        if(child === child2) {
            return;
        }

        var index1 = this.children.indexOf(child);
        var index2 = this.children.indexOf(child2);

        if(index1 < 0 || index2 < 0) {
            throw new Error('swapChildren: Both the supplied DisplayObjects must be a child of the caller.');
        }

        this.children[index1] = child2;
        this.children[index2] = child;
        
    };

    /**
     * Returns the child at the specified index
     *
     * @method getChildAt
     * @param index {Number} The index to get the child from
     */
    PIXI.DisplayObjectContainer.prototype.getChildAt = function(index)
    {
        if(index >= 0 && index < this.children.length)
        {
            return this.children[index];
        }
        else
        {
            throw new Error('Supplied index does not exist in the child list, or the supplied DisplayObject must be a child of the caller');
        }
    };

    /**
     * Removes a child from the container.
     *
     * @method removeChild
     * @param child {DisplayObject} The DisplayObject to remove
     */
    PIXI.DisplayObjectContainer.prototype.removeChild = function(child)
    {
        return this.removeChildAt( this.children.indexOf( child ) );
    };

    /**
     * Removes a child from the specified index position in the child list of the container.
     *
     * @method removeChildAt
     * @param index {Number} The index to get the child from
     */
    PIXI.DisplayObjectContainer.prototype.removeChildAt = function(index)
    {
        var child = this.getChildAt( index );
        if(this.stage)
            child.removeStageReference();

        child.parent = undefined;
        this.children.splice( index, 1 );
        return child;
    };

    /**
    * Removes all child instances from the child list of the container.
    *
    * @method removeChildren
    * @param beginIndex {Number} The beginning position. Predefined value is 0.
    * @param endIndex {Number} The ending position. Predefined value is children's array length.
    */
    PIXI.DisplayObjectContainer.prototype.removeChildren = function(beginIndex, endIndex)
    {
        var begin = beginIndex || 0;
        var end = typeof endIndex === 'number' ? endIndex : this.children.length;
        var range = end - begin;

        if (range > 0 && range <= end)
        {
            var removed = this.children.splice(begin, range);
            for (var i = 0; i < removed.length; i++) {
                var child = removed[i];
                if(this.stage)
                    child.removeStageReference();
                child.parent = undefined;
            }
            return removed;
        }
        else
        {
            throw new Error( 'Range Error, numeric values are outside the acceptable range' );
        }
    };

    /*
     * Updates the container's childrens transform for rendering
     *
     * @method updateTransform
     * @private
     */
    PIXI.DisplayObjectContainer.prototype.updateTransform = function()
    {
        //this._currentBounds = null;

        if(!this.visible)return;

        PIXI.DisplayObject.prototype.updateTransform.call( this );

        if(this._cacheAsBitmap)return;

        for(var i=0,j=this.children.length; i<j; i++)
        {
            this.children[i].updateTransform();
        }
    };

    /**
     * Retrieves the bounds of the displayObjectContainer as a rectangle object
     *
     * @method getBounds
     * @return {Rectangle} the rectangular bounding area
     */
    PIXI.DisplayObjectContainer.prototype.getBounds = function(matrix)
    {
        if(this.children.length === 0)return PIXI.EmptyRectangle;

        // TODO the bounds have already been calculated this render session so return what we have
        if(matrix)
        {
            var matrixCache = this.worldTransform;
            this.worldTransform = matrix;
            this.updateTransform();
            this.worldTransform = matrixCache;
        }

        var minX = Infinity;
        var minY = Infinity;

        var maxX = -Infinity;
        var maxY = -Infinity;

        var childBounds;
        var childMaxX;
        var childMaxY;

        var childVisible = false;

        for(var i=0,j=this.children.length; i<j; i++)
        {
            var child = this.children[i];
            
            if(!child.visible)continue;

            childVisible = true;

            childBounds = this.children[i].getBounds( matrix );
         
            minX = minX < childBounds.x ? minX : childBounds.x;
            minY = minY < childBounds.y ? minY : childBounds.y;

            childMaxX = childBounds.width + childBounds.x;
            childMaxY = childBounds.height + childBounds.y;

            maxX = maxX > childMaxX ? maxX : childMaxX;
            maxY = maxY > childMaxY ? maxY : childMaxY;
        }

        if(!childVisible)
            return PIXI.EmptyRectangle;

        var bounds = this._bounds;

        bounds.x = minX;
        bounds.y = minY;
        bounds.width = maxX - minX;
        bounds.height = maxY - minY;

        // TODO: store a reference so that if this function gets called again in the render cycle we do not have to recalculate
        //this._currentBounds = bounds;
       
        return bounds;
    };

    PIXI.DisplayObjectContainer.prototype.getLocalBounds = function()
    {
        var matrixCache = this.worldTransform;

        this.worldTransform = PIXI.identityMatrix;

        for(var i=0,j=this.children.length; i<j; i++)
        {
            this.children[i].updateTransform();
        }

        var bounds = this.getBounds();

        this.worldTransform = matrixCache;

        return bounds;
    };

    /**
     * Sets the container's stage reference, the stage this object is connected to
     *
     * @method setStageReference
     * @param stage {Stage} the stage that the container will have as its current stage reference
     */
    PIXI.DisplayObjectContainer.prototype.setStageReference = function(stage)
    {
        this.stage = stage;
        if(this._interactive)this.stage.dirty = true;

        for(var i=0,j=this.children.length; i<j; i++)
        {
            var child = this.children[i];
            child.setStageReference(stage);
        }
    };

    /**
     * removes the current stage reference of the container
     *
     * @method removeStageReference
     */
    PIXI.DisplayObjectContainer.prototype.removeStageReference = function()
    {

        for(var i=0,j=this.children.length; i<j; i++)
        {
            var child = this.children[i];
            child.removeStageReference();
        }

        if(this._interactive)this.stage.dirty = true;
        
        this.stage = null;
    };

    /**
    * Renders the object using the WebGL renderer
    *
    * @method _renderWebGL
    * @param renderSession {RenderSession} 
    * @private
    */
    PIXI.DisplayObjectContainer.prototype._renderWebGL = function(renderSession)
    {
        if(!this.visible || this.alpha <= 0)return;
        
        if(this._cacheAsBitmap)
        {
            this._renderCachedSprite(renderSession);
            return;
        }
        
        var i,j;

        if(this._mask || this._filters)
        {
            
            // push filter first as we need to ensure the stencil buffer is correct for any masking
            if(this._filters)
            {
                renderSession.spriteBatch.flush();
                renderSession.filterManager.pushFilter(this._filterBlock);
            }

            if(this._mask)
            {
                renderSession.spriteBatch.stop();
                renderSession.maskManager.pushMask(this.mask, renderSession);
                renderSession.spriteBatch.start();
            }

            // simple render children!
            for(i=0,j=this.children.length; i<j; i++)
            {
                this.children[i]._renderWebGL(renderSession);
            }

            renderSession.spriteBatch.stop();

            if(this._mask)renderSession.maskManager.popMask(this._mask, renderSession);
            if(this._filters)renderSession.filterManager.popFilter();
            
            renderSession.spriteBatch.start();
        }
        else
        {
            // simple render children!
            for(i=0,j=this.children.length; i<j; i++)
            {
                this.children[i]._renderWebGL(renderSession);
            }
        }
    };

    /**
    * Renders the object using the Canvas renderer
    *
    * @method _renderCanvas
    * @param renderSession {RenderSession} 
    * @private
    */
    PIXI.DisplayObjectContainer.prototype._renderCanvas = function(renderSession)
    {
        if(this.visible === false || this.alpha === 0)return;

        if(this._cacheAsBitmap)
        {

            this._renderCachedSprite(renderSession);
            return;
        }

        if(this._mask)
        {
            renderSession.maskManager.pushMask(this._mask, renderSession.context);
        }

        for(var i=0,j=this.children.length; i<j; i++)
        {
            var child = this.children[i];
            child._renderCanvas(renderSession);
        }

        if(this._mask)
        {
            renderSession.maskManager.popMask(renderSession.context);
        }
    };

    /**
     * @author Mat Groves http://matgroves.com/ @Doormat23
     */

    /**
     * The Sprite object is the base for all textured objects that are rendered to the screen
     *
     * @class Sprite
     * @extends DisplayObjectContainer
     * @constructor
     * @param texture {Texture} The texture for this sprite
     * 
     * A sprite can be created directly from an image like this : 
     * var sprite = new PIXI.Sprite.fromImage('assets/image.png');
     * yourStage.addChild(sprite);
     * then obviously don't forget to add it to the stage you have already created
     */
    PIXI.Sprite = function(texture)
    {
        PIXI.DisplayObjectContainer.call( this );

        /**
         * The anchor sets the origin point of the texture.
         * The default is 0,0 this means the texture's origin is the top left
         * Setting than anchor to 0.5,0.5 means the textures origin is centred
         * Setting the anchor to 1,1 would mean the textures origin points will be the bottom right corner
         *
         * @property anchor
         * @type Point
         */
        this.anchor = new PIXI.Point();

        /**
         * The texture that the sprite is using
         *
         * @property texture
         * @type Texture
         */
        this.texture = texture;

        /**
         * The width of the sprite (this is initially set by the texture)
         *
         * @property _width
         * @type Number
         * @private
         */
        this._width = 0;

        /**
         * The height of the sprite (this is initially set by the texture)
         *
         * @property _height
         * @type Number
         * @private
         */
        this._height = 0;


        /**
         * The tint applied to the sprite. This is a hex value
         *
         * @property tint
         * @type Number
         * @default 0xFFFFFF
         */
        this.tint = 0xFFFFFF;// * Math.random();
        
        /**
         * The blend mode to be applied to the sprite
         *
         * @property blendMode
         * @type Number
         * @default PIXI.blendModes.NORMAL;
         */
        this.blendMode = PIXI.blendModes.NORMAL;

        if(texture.baseTexture.hasLoaded)
        {
            this.onTextureUpdate();
        }
        else
        {
            this.onTextureUpdateBind = this.onTextureUpdate.bind(this);
            this.texture.addEventListener( 'update', this.onTextureUpdateBind );
        }

        this.renderable = true;
    };

    // constructor
    PIXI.Sprite.prototype = Object.create( PIXI.DisplayObjectContainer.prototype );
    PIXI.Sprite.prototype.constructor = PIXI.Sprite;

    /**
     * The width of the sprite, setting this will actually modify the scale to achieve the value set
     *
     * @property width
     * @type Number
     */
    Object.defineProperty(PIXI.Sprite.prototype, 'width', {
        get: function() {
            return this.scale.x * this.texture.frame.width;
        },
        set: function(value) {
            this.scale.x = value / this.texture.frame.width;
            this._width = value;
        }
    });

    /**
     * The height of the sprite, setting this will actually modify the scale to achieve the value set
     *
     * @property height
     * @type Number
     */
    Object.defineProperty(PIXI.Sprite.prototype, 'height', {
        get: function() {
            return  this.scale.y * this.texture.frame.height;
        },
        set: function(value) {
            this.scale.y = value / this.texture.frame.height;
            this._height = value;
        }
    });

    /**
     * Sets the texture of the sprite
     *
     * @method setTexture
     * @param texture {Texture} The PIXI texture that is displayed by the sprite
     */
    PIXI.Sprite.prototype.setTexture = function(texture)
    {
        this.texture = texture;
        this.cachedTint = 0xFFFFFF;
    };

    /**
     * When the texture is updated, this event will fire to update the scale and frame
     *
     * @method onTextureUpdate
     * @param event
     * @private
     */
    PIXI.Sprite.prototype.onTextureUpdate = function()
    {
        // so if _width is 0 then width was not set..
        if(this._width)this.scale.x = this._width / this.texture.frame.width;
        if(this._height)this.scale.y = this._height / this.texture.frame.height;


        //this.updateFrame = true;
    };

    /**
    * Returns the framing rectangle of the sprite as a PIXI.Rectangle object
    *
    * @method getBounds
    * @param matrix {Matrix} the transformation matrix of the sprite
    * @return {Rectangle} the framing rectangle
    */
    PIXI.Sprite.prototype.getBounds = function(matrix)
    {

        var width = this.texture.frame.width;
        var height = this.texture.frame.height;

        var w0 = width * (1-this.anchor.x);
        var w1 = width * -this.anchor.x;

        var h0 = height * (1-this.anchor.y);
        var h1 = height * -this.anchor.y;

        var worldTransform = matrix || this.worldTransform ;

        var a = worldTransform.a;
        var b = worldTransform.c;
        var c = worldTransform.b;
        var d = worldTransform.d;
        var tx = worldTransform.tx;
        var ty = worldTransform.ty;

        var x1 = a * w1 + c * h1 + tx;
        var y1 = d * h1 + b * w1 + ty;

        var x2 = a * w0 + c * h1 + tx;
        var y2 = d * h1 + b * w0 + ty;

        var x3 = a * w0 + c * h0 + tx;
        var y3 = d * h0 + b * w0 + ty;

        var x4 =  a * w1 + c * h0 + tx;
        var y4 =  d * h0 + b * w1 + ty;

        var maxX = -Infinity;
        var maxY = -Infinity;

        var minX = Infinity;
        var minY = Infinity;

        minX = x1 < minX ? x1 : minX;
        minX = x2 < minX ? x2 : minX;
        minX = x3 < minX ? x3 : minX;
        minX = x4 < minX ? x4 : minX;

        minY = y1 < minY ? y1 : minY;
        minY = y2 < minY ? y2 : minY;
        minY = y3 < minY ? y3 : minY;
        minY = y4 < minY ? y4 : minY;

        maxX = x1 > maxX ? x1 : maxX;
        maxX = x2 > maxX ? x2 : maxX;
        maxX = x3 > maxX ? x3 : maxX;
        maxX = x4 > maxX ? x4 : maxX;

        maxY = y1 > maxY ? y1 : maxY;
        maxY = y2 > maxY ? y2 : maxY;
        maxY = y3 > maxY ? y3 : maxY;
        maxY = y4 > maxY ? y4 : maxY;

        var bounds = this._bounds;

        bounds.x = minX;
        bounds.width = maxX - minX;

        bounds.y = minY;
        bounds.height = maxY - minY;

        // store a reference so that if this function gets called again in the render cycle we do not have to recalculate
        this._currentBounds = bounds;

        return bounds;
    };

    /**
    * Renders the object using the WebGL renderer
    *
    * @method _renderWebGL
    * @param renderSession {RenderSession} 
    * @private
    */
    PIXI.Sprite.prototype._renderWebGL = function(renderSession)
    {
        // if the sprite is not visible or the alpha is 0 then no need to render this element
        if(!this.visible || this.alpha <= 0)return;
        
        var i,j;

        // do a quick check to see if this element has a mask or a filter.
        if(this._mask || this._filters)
        {
            var spriteBatch =  renderSession.spriteBatch;

            // push filter first as we need to ensure the stencil buffer is correct for any masking
            if(this._filters)
            {
                spriteBatch.flush();
                renderSession.filterManager.pushFilter(this._filterBlock);
            }

            if(this._mask)
            {
                spriteBatch.stop();
                renderSession.maskManager.pushMask(this.mask, renderSession);
                spriteBatch.start();
            }

            // add this sprite to the batch
            spriteBatch.render(this);

            // now loop through the children and make sure they get rendered
            for(i=0,j=this.children.length; i<j; i++)
            {
                this.children[i]._renderWebGL(renderSession);
            }

            // time to stop the sprite batch as either a mask element or a filter draw will happen next
            spriteBatch.stop();

            if(this._mask)renderSession.maskManager.popMask(this._mask, renderSession);
            if(this._filters)renderSession.filterManager.popFilter();
            
            spriteBatch.start();
        }
        else
        {
            renderSession.spriteBatch.render(this);

            // simple render children!
            for(i=0,j=this.children.length; i<j; i++)
            {
                this.children[i]._renderWebGL(renderSession);
            }
        }

       
        //TODO check culling  
    };

    /**
    * Renders the object using the Canvas renderer
    *
    * @method _renderCanvas
    * @param renderSession {RenderSession} 
    * @private
    */
    PIXI.Sprite.prototype._renderCanvas = function(renderSession)
    {
        // If the sprite is not visible or the alpha is 0 then no need to render this element
        if (this.visible === false || this.alpha === 0) return;
        
        if (this.blendMode !== renderSession.currentBlendMode)
        {
            renderSession.currentBlendMode = this.blendMode;
            renderSession.context.globalCompositeOperation = PIXI.blendModesCanvas[renderSession.currentBlendMode];
        }

        if (this._mask)
        {
            renderSession.maskManager.pushMask(this._mask, renderSession.context);
        }

        //  Ignore null sources
        if (this.texture.valid)
        {
            renderSession.context.globalAlpha = this.worldAlpha;

            //  Allow for pixel rounding
            if (renderSession.roundPixels)
            {
                renderSession.context.setTransform(
                    this.worldTransform.a,
                    this.worldTransform.c,
                    this.worldTransform.b,
                    this.worldTransform.d,
                    this.worldTransform.tx | 0,
                    this.worldTransform.ty | 0);
            }
            else
            {
                renderSession.context.setTransform(
                    this.worldTransform.a,
                    this.worldTransform.c,
                    this.worldTransform.b,
                    this.worldTransform.d,
                    this.worldTransform.tx,
                    this.worldTransform.ty);
            }

            //  If smoothingEnabled is supported and we need to change the smoothing property for this texture
            if (renderSession.smoothProperty && renderSession.scaleMode !== this.texture.baseTexture.scaleMode)
            {
                renderSession.scaleMode = this.texture.baseTexture.scaleMode;
                renderSession.context[renderSession.smoothProperty] = (renderSession.scaleMode === PIXI.scaleModes.LINEAR);
            }

            //  If the texture is trimmed we offset by the trim x/y, otherwise we use the frame dimensions
            var dx = (this.texture.trim) ? this.texture.trim.x - this.anchor.x * this.texture.trim.width : this.anchor.x * -this.texture.frame.width;
            var dy = (this.texture.trim) ? this.texture.trim.y - this.anchor.y * this.texture.trim.height : this.anchor.y * -this.texture.frame.height;

            if (this.tint !== 0xFFFFFF)
            {
                if (this.cachedTint !== this.tint)
                {
                    this.cachedTint = this.tint;
                    
                    //  TODO clean up caching - how to clean up the caches?
                    this.tintedTexture = PIXI.CanvasTinter.getTintedTexture(this, this.tint);
                }

                renderSession.context.drawImage(
                                    this.tintedTexture,
                                    0,
                                    0,
                                    this.texture.crop.width,
                                    this.texture.crop.height,
                                    dx,
                                    dy,
                                    this.texture.crop.width,
                                    this.texture.crop.height);
            }
            else
            {
                renderSession.context.drawImage(
                                    this.texture.baseTexture.source,
                                    this.texture.crop.x,
                                    this.texture.crop.y,
                                    this.texture.crop.width,
                                    this.texture.crop.height,
                                    dx,
                                    dy,
                                    this.texture.crop.width,
                                    this.texture.crop.height);
            }
        }

        // OVERWRITE
        for (var i = 0, j = this.children.length; i < j; i++)
        {
            this.children[i]._renderCanvas(renderSession);
        }

        if (this._mask)
        {
            renderSession.maskManager.popMask(renderSession.context);
        }
    };

    // some helper functions..

    /**
     *
     * Helper function that creates a sprite that will contain a texture from the TextureCache based on the frameId
     * The frame ids are created when a Texture packer file has been loaded
     *
     * @method fromFrame
     * @static
     * @param frameId {String} The frame Id of the texture in the cache
     * @return {Sprite} A new Sprite using a texture from the texture cache matching the frameId
     */
    PIXI.Sprite.fromFrame = function(frameId)
    {
        var texture = PIXI.TextureCache[frameId];
        if(!texture) throw new Error('The frameId "' + frameId + '" does not exist in the texture cache' + this);
        return new PIXI.Sprite(texture);
    };

    /**
     *
     * Helper function that creates a sprite that will contain a texture based on an image url
     * If the image is not in the texture cache it will be loaded
     *
     * @method fromImage
     * @static
     * @param imageId {String} The image url of the texture
     * @return {Sprite} A new Sprite using a texture from the texture cache matching the image id
     */
    PIXI.Sprite.fromImage = function(imageId, crossorigin, scaleMode)
    {
        var texture = PIXI.Texture.fromImage(imageId, crossorigin, scaleMode);
        return new PIXI.Sprite(texture);
    };

    /**
     * @author Mat Groves http://matgroves.com/
     */

    /**
     * The SpriteBatch class is a really fast version of the DisplayObjectContainer 
     * built solely for speed, so use when you need a lot of sprites or particles.
     * And it's extremely easy to use : 

        var container = new PIXI.SpriteBatch();
     
        stage.addChild(container);
     
        for(var i  = 0; i < 100; i++)
        {
            var sprite = new PIXI.Sprite.fromImage("myImage.png");
            container.addChild(sprite);
        }
     * And here you have a hundred sprites that will be renderer at the speed of light
     *
     * @class SpriteBatch
     * @constructor
     * @param texture {Texture}
     */
    PIXI.SpriteBatch = function(texture)
    {
        PIXI.DisplayObjectContainer.call( this);

        this.textureThing = texture;

        this.ready = false;
    };

    PIXI.SpriteBatch.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);
    PIXI.SpriteBatch.constructor = PIXI.SpriteBatch;

    /*
     * Initialises the spriteBatch
     *
     * @method initWebGL
     * @param gl {WebGLContext} the current WebGL drawing context
     */
    PIXI.SpriteBatch.prototype.initWebGL = function(gl)
    {
        // TODO only one needed for the whole engine really?
        this.fastSpriteBatch = new PIXI.WebGLFastSpriteBatch(gl);

        this.ready = true;
    };

    /*
     * Updates the object transform for rendering
     *
     * @method updateTransform
     * @private
     */
    PIXI.SpriteBatch.prototype.updateTransform = function()
    {
       // TODO dont need to!
        PIXI.DisplayObject.prototype.updateTransform.call( this );
      //  PIXI.DisplayObjectContainer.prototype.updateTransform.call( this );
    };

    /**
    * Renders the object using the WebGL renderer
    *
    * @method _renderWebGL
    * @param renderSession {RenderSession} 
    * @private
    */
    PIXI.SpriteBatch.prototype._renderWebGL = function(renderSession)
    {
        if(!this.visible || this.alpha <= 0 || !this.children.length)return;

        if(!this.ready)this.initWebGL( renderSession.gl );
        
        renderSession.spriteBatch.stop();
        
        renderSession.shaderManager.setShader(renderSession.shaderManager.fastShader);
        
        this.fastSpriteBatch.begin(this, renderSession);
        this.fastSpriteBatch.render(this);

        renderSession.spriteBatch.start();
     
    };

    /**
    * Renders the object using the Canvas renderer
    *
    * @method _renderCanvas
    * @param renderSession {RenderSession} 
    * @private
    */
    PIXI.SpriteBatch.prototype._renderCanvas = function(renderSession)
    {
        var context = renderSession.context;
        context.globalAlpha = this.worldAlpha;

        PIXI.DisplayObject.prototype.updateTransform.call(this);

        var transform = this.worldTransform;
        // alow for trimming
           
        var isRotated = true;

        for (var i = 0; i < this.children.length; i++) {
           
            var child = this.children[i];

            if(!child.visible)continue;

            var texture = child.texture;
            var frame = texture.frame;

            context.globalAlpha = this.worldAlpha * child.alpha;

            if(child.rotation % (Math.PI * 2) === 0)
            {
                if(isRotated)
                {
                    context.setTransform(transform.a, transform.c, transform.b, transform.d, transform.tx, transform.ty);
                    isRotated = false;
                }

                // this is the fastest  way to optimise! - if rotation is 0 then we can avoid any kind of setTransform call
                context.drawImage(texture.baseTexture.source,
                                     frame.x,
                                     frame.y,
                                     frame.width,
                                     frame.height,
                                     ((child.anchor.x) * (-frame.width * child.scale.x) + child.position.x  + 0.5) | 0,
                                     ((child.anchor.y) * (-frame.height * child.scale.y) + child.position.y  + 0.5) | 0,
                                     frame.width * child.scale.x,
                                     frame.height * child.scale.y);
            }
            else
            {
                if(!isRotated)isRotated = true;
        
                PIXI.DisplayObject.prototype.updateTransform.call(child);
               
                var childTransform = child.worldTransform;

                // allow for trimming
               
                if (renderSession.roundPixels)
                {
                    context.setTransform(childTransform.a, childTransform.c, childTransform.b, childTransform.d, childTransform.tx | 0, childTransform.ty | 0);
                }
                else
                {
                    context.setTransform(childTransform.a, childTransform.c, childTransform.b, childTransform.d, childTransform.tx, childTransform.ty);
                }

                context.drawImage(texture.baseTexture.source,
                                     frame.x,
                                     frame.y,
                                     frame.width,
                                     frame.height,
                                     ((child.anchor.x) * (-frame.width) + 0.5) | 0,
                                     ((child.anchor.y) * (-frame.height) + 0.5) | 0,
                                     frame.width,
                                     frame.height);
               

            }

           // context.restore();
        }

    //    context.restore();
    };


    /**
     * @author Mat Groves http://matgroves.com/ @Doormat23
     */

    /**
     * A MovieClip is a simple way to display an animation depicted by a list of textures.
     *
     * @class MovieClip
     * @extends Sprite
     * @constructor
     * @param textures {Array<Texture>} an array of {Texture} objects that make up the animation
     */
    PIXI.MovieClip = function(textures)
    {
        PIXI.Sprite.call(this, textures[0]);

        /**
         * The array of textures that make up the animation
         *
         * @property textures
         * @type Array
         */
        this.textures = textures;

        /**
         * The speed that the MovieClip will play at. Higher is faster, lower is slower
         *
         * @property animationSpeed
         * @type Number
         * @default 1
         */
        this.animationSpeed = 1;

        /**
         * Whether or not the movie clip repeats after playing.
         *
         * @property loop
         * @type Boolean
         * @default true
         */
        this.loop = true;

        /**
         * Function to call when a MovieClip finishes playing
         *
         * @property onComplete
         * @type Function
         */
        this.onComplete = null;

        /**
         * [read-only] The MovieClips current frame index (this may not have to be a whole number)
         *
         * @property currentFrame
         * @type Number
         * @default 0
         * @readOnly
         */
        this.currentFrame = 0;

        /**
         * [read-only] Indicates if the MovieClip is currently playing
         *
         * @property playing
         * @type Boolean
         * @readOnly
         */
        this.playing = false;
    };

    // constructor
    PIXI.MovieClip.prototype = Object.create( PIXI.Sprite.prototype );
    PIXI.MovieClip.prototype.constructor = PIXI.MovieClip;

    /**
    * [read-only] totalFrames is the total number of frames in the MovieClip. This is the same as number of textures
    * assigned to the MovieClip.
    *
    * @property totalFrames
    * @type Number
    * @default 0
    * @readOnly
    */
    Object.defineProperty( PIXI.MovieClip.prototype, 'totalFrames', {
    	get: function() {

    		return this.textures.length;
    	}
    });


    /**
     * Stops the MovieClip
     *
     * @method stop
     */
    PIXI.MovieClip.prototype.stop = function()
    {
        this.playing = false;
    };

    /**
     * Plays the MovieClip
     *
     * @method play
     */
    PIXI.MovieClip.prototype.play = function()
    {
        this.playing = true;
    };

    /**
     * Stops the MovieClip and goes to a specific frame
     *
     * @method gotoAndStop
     * @param frameNumber {Number} frame index to stop at
     */
    PIXI.MovieClip.prototype.gotoAndStop = function(frameNumber)
    {
        this.playing = false;
        this.currentFrame = frameNumber;
        var round = (this.currentFrame + 0.5) | 0;
        this.setTexture(this.textures[round % this.textures.length]);
    };

    /**
     * Goes to a specific frame and begins playing the MovieClip
     *
     * @method gotoAndPlay
     * @param frameNumber {Number} frame index to start at
     */
    PIXI.MovieClip.prototype.gotoAndPlay = function(frameNumber)
    {
        this.currentFrame = frameNumber;
        this.playing = true;
    };

    /*
     * Updates the object transform for rendering
     *
     * @method updateTransform
     * @private
     */
    PIXI.MovieClip.prototype.updateTransform = function()
    {
        PIXI.Sprite.prototype.updateTransform.call(this);

        if(!this.playing)return;

        this.currentFrame += this.animationSpeed;

        var round = (this.currentFrame + 0.5) | 0;

        this.currentFrame = this.currentFrame % this.textures.length;

        if(this.loop || round < this.textures.length)
        {
            this.setTexture(this.textures[round % this.textures.length]);
        }
        else if(round >= this.textures.length)
        {
            this.gotoAndStop(this.textures.length - 1);
            if(this.onComplete)
            {
                this.onComplete();
            }
        }
    };

    /**
     * A short hand way of creating a movieclip from an array of frame ids
     *
     * @static
     * @method fromFrames
     * @param frames {Array} the array of frames ids the movieclip will use as its texture frames
     */
    PIXI.MovieClip.fromFrames = function(frames)
    {
        var textures = [];

        for (var i = 0; i < frames.length; i++)
        {
            textures.push(new PIXI.Texture.fromFrame(frames[i]));
        }

        return new PIXI.MovieClip(textures);
    };

    /**
     * A short hand way of creating a movieclip from an array of image ids
     *
     * @static
     * @method fromFrames
     * @param frames {Array} the array of image ids the movieclip will use as its texture frames
     */
    PIXI.MovieClip.fromImages = function(images)
    {
        var textures = [];

        for (var i = 0; i < images.length; i++)
        {
            textures.push(new PIXI.Texture.fromImage(images[i]));
        }

        return new PIXI.MovieClip(textures);
    };
    /**
     * @author Mat Groves http://matgroves.com/ @Doormat23
     */


    PIXI.FilterBlock = function()
    {
        this.visible = true;
        this.renderable = true;
    };

    /**
     * @author Mat Groves http://matgroves.com/ @Doormat23
     * - Modified by Tom Slezakowski http://www.tomslezakowski.com @TomSlezakowski (24/03/2014) - Added dropShadowColor.
     */

    /**
     * A Text Object will create a line(s) of text. To split a line you can use '\n' 
     * or add a wordWrap property set to true and and wordWrapWidth property with a value
     * in the style object
     *
     * @class Text
     * @extends Sprite
     * @constructor
     * @param text {String} The copy that you would like the text to display
     * @param [style] {Object} The style parameters
     * @param [style.font] {String} default 'bold 20px Arial' The style and size of the font
     * @param [style.fill='black'] {String|Number} A canvas fillstyle that will be used on the text e.g 'red', '#00FF00'
     * @param [style.align='left'] {String} Alignment for multiline text ('left', 'center' or 'right'), does not affect single line text
     * @param [style.stroke] {String|Number} A canvas fillstyle that will be used on the text stroke e.g 'blue', '#FCFF00'
     * @param [style.strokeThickness=0] {Number} A number that represents the thickness of the stroke. Default is 0 (no stroke)
     * @param [style.wordWrap=false] {Boolean} Indicates if word wrap should be used
     * @param [style.wordWrapWidth=100] {Number} The width at which text will wrap, it needs wordWrap to be set to true
     * @param [style.dropShadow=false] {Boolean} Set a drop shadow for the text
     * @param [style.dropShadowColor='#000000'] {String} A fill style to be used on the dropshadow e.g 'red', '#00FF00'
     * @param [style.dropShadowAngle=Math.PI/4] {Number} Set a angle of the drop shadow
     * @param [style.dropShadowDistance=5] {Number} Set a distance of the drop shadow
     */
    PIXI.Text = function(text, style)
    {
        /**
         * The canvas element that everything is drawn to
         *
         * @property canvas
         * @type HTMLCanvasElement
         */
        this.canvas = document.createElement('canvas');

        /**
         * The canvas 2d context that everything is drawn with
         * @property context
         * @type HTMLCanvasElement 2d Context
         */
        this.context = this.canvas.getContext('2d');

        PIXI.Sprite.call(this, PIXI.Texture.fromCanvas(this.canvas));

        this.setText(text);
        this.setStyle(style);
    };

    // constructor
    PIXI.Text.prototype = Object.create(PIXI.Sprite.prototype);
    PIXI.Text.prototype.constructor = PIXI.Text;


    /**
     * The width of the sprite, setting this will actually modify the scale to achieve the value set
     *
     * @property width
     * @type Number
     */
    Object.defineProperty(PIXI.Text.prototype, 'width', {
        get: function() {

            if(this.dirty)
            {
                this.updateText();
                this.dirty = false;
            }


            return this.scale.x * this.texture.frame.width;
        },
        set: function(value) {
            this.scale.x = value / this.texture.frame.width;
            this._width = value;
        }
    });

    /**
     * The height of the Text, setting this will actually modify the scale to achieve the value set
     *
     * @property height
     * @type Number
     */
    Object.defineProperty(PIXI.Text.prototype, 'height', {
        get: function() {

            if(this.dirty)
            {
                this.updateText();
                this.dirty = false;
            }


            return  this.scale.y * this.texture.frame.height;
        },
        set: function(value) {
            this.scale.y = value / this.texture.frame.height;
            this._height = value;
        }
    });


    /**
     * Set the style of the text
     *
     * @method setStyle
     * @param [style] {Object} The style parameters
     * @param [style.font='bold 20pt Arial'] {String} The style and size of the font
     * @param [style.fill='black'] {Object} A canvas fillstyle that will be used on the text eg 'red', '#00FF00'
     * @param [style.align='left'] {String} Alignment for multiline text ('left', 'center' or 'right'), does not affect single line text
     * @param [style.stroke='black'] {String} A canvas fillstyle that will be used on the text stroke eg 'blue', '#FCFF00'
     * @param [style.strokeThickness=0] {Number} A number that represents the thickness of the stroke. Default is 0 (no stroke)
     * @param [style.wordWrap=false] {Boolean} Indicates if word wrap should be used
     * @param [style.wordWrapWidth=100] {Number} The width at which text will wrap
     * @param [style.dropShadow=false] {Boolean} Set a drop shadow for the text
     * @param [style.dropShadowColor='#000000'] {String} A fill style to be used on the dropshadow e.g 'red', '#00FF00'
     * @param [style.dropShadowAngle=Math.PI/4] {Number} Set a angle of the drop shadow
     * @param [style.dropShadowDistance=5] {Number} Set a distance of the drop shadow
     */
    PIXI.Text.prototype.setStyle = function(style)
    {
        style = style || {};
        style.font = style.font || 'bold 20pt Arial';
        style.fill = style.fill || 'black';
        style.align = style.align || 'left';
        style.stroke = style.stroke || 'black'; //provide a default, see: https://github.com/GoodBoyDigital/pixi.js/issues/136
        style.strokeThickness = style.strokeThickness || 0;
        style.wordWrap = style.wordWrap || false;
        style.wordWrapWidth = style.wordWrapWidth || 100;
        style.wordWrapWidth = style.wordWrapWidth || 100;
        
        style.dropShadow = style.dropShadow || false;
        style.dropShadowAngle = style.dropShadowAngle || Math.PI / 6;
        style.dropShadowDistance = style.dropShadowDistance || 4;
        style.dropShadowColor = style.dropShadowColor || 'black';

        this.style = style;
        this.dirty = true;
    };

    /**
     * Set the copy for the text object. To split a line you can use '\n'
     *
     * @method setText
     * @param {String} text The copy that you would like the text to display
     */
    PIXI.Text.prototype.setText = function(text)
    {
        this.text = text.toString() || ' ';
        this.dirty = true;

    };

    /**
     * Renders text and updates it when needed
     *
     * @method updateText
     * @private
     */
    PIXI.Text.prototype.updateText = function()
    {
        this.context.font = this.style.font;

        var outputText = this.text;

        // word wrap
        // preserve original text
        if(this.style.wordWrap)outputText = this.wordWrap(this.text);

        //split text into lines
        var lines = outputText.split(/(?:\r\n|\r|\n)/);

        //calculate text width
        var lineWidths = [];
        var maxLineWidth = 0;
        for (var i = 0; i < lines.length; i++)
        {
            var lineWidth = this.context.measureText(lines[i]).width;
            lineWidths[i] = lineWidth;
            maxLineWidth = Math.max(maxLineWidth, lineWidth);
        }

        var width = maxLineWidth + this.style.strokeThickness;
        if(this.style.dropShadow)width += this.style.dropShadowDistance;

        this.canvas.width = width + this.context.lineWidth;
        //calculate text height
        var lineHeight = this.determineFontHeight('font: ' + this.style.font  + ';') + this.style.strokeThickness;
        
        var height = lineHeight * lines.length;
        if(this.style.dropShadow)height += this.style.dropShadowDistance;

        this.canvas.height = height;

        if(navigator.isCocoonJS) this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
        
        this.context.font = this.style.font;
        this.context.strokeStyle = this.style.stroke;
        this.context.lineWidth = this.style.strokeThickness;
        this.context.textBaseline = 'top';

        var linePositionX;
        var linePositionY;

        if(this.style.dropShadow)
        {
            this.context.fillStyle = this.style.dropShadowColor;

            var xShadowOffset = Math.sin(this.style.dropShadowAngle) * this.style.dropShadowDistance;
            var yShadowOffset = Math.cos(this.style.dropShadowAngle) * this.style.dropShadowDistance;

            for (i = 0; i < lines.length; i++)
            {
                linePositionX = this.style.strokeThickness / 2;
                linePositionY = this.style.strokeThickness / 2 + i * lineHeight;

                if(this.style.align === 'right')
                {
                    linePositionX += maxLineWidth - lineWidths[i];
                }
                else if(this.style.align === 'center')
                {
                    linePositionX += (maxLineWidth - lineWidths[i]) / 2;
                }

                if(this.style.fill)
                {
                    this.context.fillText(lines[i], linePositionX + xShadowOffset, linePositionY + yShadowOffset);
                }

              //  if(dropShadow)
            }
        }

        //set canvas text styles
        this.context.fillStyle = this.style.fill;
        
        //draw lines line by line
        for (i = 0; i < lines.length; i++)
        {
            linePositionX = this.style.strokeThickness / 2;
            linePositionY = this.style.strokeThickness / 2 + i * lineHeight;

            if(this.style.align === 'right')
            {
                linePositionX += maxLineWidth - lineWidths[i];
            }
            else if(this.style.align === 'center')
            {
                linePositionX += (maxLineWidth - lineWidths[i]) / 2;
            }

            if(this.style.stroke && this.style.strokeThickness)
            {
                this.context.strokeText(lines[i], linePositionX, linePositionY);
            }

            if(this.style.fill)
            {
                this.context.fillText(lines[i], linePositionX, linePositionY);
            }

          //  if(dropShadow)
        }


        this.updateTexture();
    };

    /**
     * Updates texture size based on canvas size
     *
     * @method updateTexture
     * @private
     */
    PIXI.Text.prototype.updateTexture = function()
    {
        this.texture.baseTexture.width = this.canvas.width;
        this.texture.baseTexture.height = this.canvas.height;
        this.texture.crop.width = this.texture.frame.width = this.canvas.width;
        this.texture.crop.height = this.texture.frame.height = this.canvas.height;

        this._width = this.canvas.width;
        this._height = this.canvas.height;

        this.requiresUpdate =  true;
    };

    /**
    * Renders the object using the WebGL renderer
    *
    * @method _renderWebGL
    * @param renderSession {RenderSession} 
    * @private
    */
    PIXI.Text.prototype._renderWebGL = function(renderSession)
    {
        if(this.requiresUpdate)
        {
            this.requiresUpdate = false;
            PIXI.updateWebGLTexture(this.texture.baseTexture, renderSession.gl);
        }

        PIXI.Sprite.prototype._renderWebGL.call(this, renderSession);
    };

    /**
     * Updates the transform of this object
     *
     * @method updateTransform
     * @private
     */
    PIXI.Text.prototype.updateTransform = function()
    {
        if(this.dirty)
        {
            this.updateText();
            this.dirty = false;
        }

        PIXI.Sprite.prototype.updateTransform.call(this);
    };

    /*
     * http://stackoverflow.com/users/34441/ellisbben
     * great solution to the problem!
     * returns the height of the given font
     *
     * @method determineFontHeight
     * @param fontStyle {Object}
     * @private
     */
    PIXI.Text.prototype.determineFontHeight = function(fontStyle)
    {
        // build a little reference dictionary so if the font style has been used return a
        // cached version...
        var result = PIXI.Text.heightCache[fontStyle];

        if(!result)
        {
            var body = document.getElementsByTagName('body')[0];
            var dummy = document.createElement('div');
            var dummyText = document.createTextNode('M');
            dummy.appendChild(dummyText);
            dummy.setAttribute('style', fontStyle + ';position:absolute;top:0;left:0');
            body.appendChild(dummy);

            result = dummy.offsetHeight;
            PIXI.Text.heightCache[fontStyle] = result;

            body.removeChild(dummy);
        }

        return result;
    };

    /**
     * Applies newlines to a string to have it optimally fit into the horizontal
     * bounds set by the Text object's wordWrapWidth property.
     *
     * @method wordWrap
     * @param text {String}
     * @private
     */
    PIXI.Text.prototype.wordWrap = function(text)
    {
        // Greedy wrapping algorithm that will wrap words as the line grows longer
        // than its horizontal bounds.
        var result = '';
        var lines = text.split('\n');
        for (var i = 0; i < lines.length; i++)
        {
            var spaceLeft = this.style.wordWrapWidth;
            var words = lines[i].split(' ');
            for (var j = 0; j < words.length; j++)
            {
                var wordWidth = this.context.measureText(words[j]).width;
                var wordWidthWithSpace = wordWidth + this.context.measureText(' ').width;
                if(j === 0 || wordWidthWithSpace > spaceLeft)
                {
                    // Skip printing the newline if it's the first word of the line that is
                    // greater than the word wrap width.
                    if(j > 0)
                    {
                        result += '\n';
                    }
                    result += words[j];
                    spaceLeft = this.style.wordWrapWidth - wordWidth;
                }
                else
                {
                    spaceLeft -= wordWidthWithSpace;
                    result += ' ' + words[j];
                }
            }

            if (i < lines.length-1)
            {
                result += '\n';
            }
        }
        return result;
    };

    /**
     * Destroys this text object
     *
     * @method destroy
     * @param destroyBaseTexture {Boolean} whether to destroy the base texture as well
     */
    PIXI.Text.prototype.destroy = function(destroyBaseTexture)
    {
        // make sure to reset the the context and canvas.. dont want this hanging around in memory!
        this.context = null;
        this.canvas = null;

        this.texture.destroy(destroyBaseTexture === undefined ? true : destroyBaseTexture);
    };

    PIXI.Text.heightCache = {};

    /**
     * @author Mat Groves http://matgroves.com/ @Doormat23
     */

    /**
     * A Text Object will create a line(s) of text using bitmap font. To split a line you can use '\n', '\r' or '\r\n'
     * You can generate the fnt files using
     * http://www.angelcode.com/products/bmfont/ for windows or
     * http://www.bmglyph.com/ for mac.
     *
     * @class BitmapText
     * @extends DisplayObjectContainer
     * @constructor
     * @param text {String} The copy that you would like the text to display
     * @param style {Object} The style parameters
     * @param style.font {String} The size (optional) and bitmap font id (required) eq 'Arial' or '20px Arial' (must have loaded previously)
     * @param [style.align='left'] {String} Alignment for multiline text ('left', 'center' or 'right'), does not affect single line text
     */
    PIXI.BitmapText = function(text, style)
    {
        PIXI.DisplayObjectContainer.call(this);

        this._pool = [];

        this.setText(text);
        this.setStyle(style);
        this.updateText();
        this.dirty = false;
    };

    // constructor
    PIXI.BitmapText.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);
    PIXI.BitmapText.prototype.constructor = PIXI.BitmapText;

    /**
     * Set the copy for the text object
     *
     * @method setText
     * @param text {String} The copy that you would like the text to display
     */
    PIXI.BitmapText.prototype.setText = function(text)
    {
        this.text = text || ' ';
        this.dirty = true;
    };

    /**
     * Set the style of the text
     * style.font {String} The size (optional) and bitmap font id (required) eq 'Arial' or '20px Arial' (must have loaded previously)
     * [style.align='left'] {String} Alignment for multiline text ('left', 'center' or 'right'), does not affect single line text
     *
     * @method setStyle
     * @param style {Object} The style parameters, contained as properties of an object
     */
    PIXI.BitmapText.prototype.setStyle = function(style)
    {
        style = style || {};
        style.align = style.align || 'left';
        this.style = style;

        var font = style.font.split(' ');
        this.fontName = font[font.length - 1];
        this.fontSize = font.length >= 2 ? parseInt(font[font.length - 2], 10) : PIXI.BitmapText.fonts[this.fontName].size;

        this.dirty = true;
        this.tint = style.tint;
    };

    /**
     * Renders text and updates it when needed
     *
     * @method updateText
     * @private
     */
    PIXI.BitmapText.prototype.updateText = function()
    {
        var data = PIXI.BitmapText.fonts[this.fontName];
        var pos = new PIXI.Point();
        var prevCharCode = null;
        var chars = [];
        var maxLineWidth = 0;
        var lineWidths = [];
        var line = 0;
        var scale = this.fontSize / data.size;
        

        for(var i = 0; i < this.text.length; i++)
        {
            var charCode = this.text.charCodeAt(i);
            if(/(?:\r\n|\r|\n)/.test(this.text.charAt(i)))
            {
                lineWidths.push(pos.x);
                maxLineWidth = Math.max(maxLineWidth, pos.x);
                line++;

                pos.x = 0;
                pos.y += data.lineHeight;
                prevCharCode = null;
                continue;
            }

            var charData = data.chars[charCode];
            if(!charData) continue;

            if(prevCharCode && charData[prevCharCode])
            {
                pos.x += charData.kerning[prevCharCode];
            }
            chars.push({texture:charData.texture, line: line, charCode: charCode, position: new PIXI.Point(pos.x + charData.xOffset, pos.y + charData.yOffset)});
            pos.x += charData.xAdvance;

            prevCharCode = charCode;
        }

        lineWidths.push(pos.x);
        maxLineWidth = Math.max(maxLineWidth, pos.x);

        var lineAlignOffsets = [];
        for(i = 0; i <= line; i++)
        {
            var alignOffset = 0;
            if(this.style.align === 'right')
            {
                alignOffset = maxLineWidth - lineWidths[i];
            }
            else if(this.style.align === 'center')
            {
                alignOffset = (maxLineWidth - lineWidths[i]) / 2;
            }
            lineAlignOffsets.push(alignOffset);
        }

        var lenChildren = this.children.length;
        var lenChars = chars.length;
        var tint = this.tint || 0xFFFFFF;
        for(i = 0; i < lenChars; i++)
        {
            var c = i < lenChildren ? this.children[i] : this._pool.pop(); // get old child if have. if not - take from pool.

            if (c) c.setTexture(chars[i].texture); // check if got one before.
            else c = new PIXI.Sprite(chars[i].texture); // if no create new one.

            c.position.x = (chars[i].position.x + lineAlignOffsets[chars[i].line]) * scale;
            c.position.y = chars[i].position.y * scale;
            c.scale.x = c.scale.y = scale;
            c.tint = tint;
            if (!c.parent) this.addChild(c);
        }

        // remove unnecessary children.
        // and put their into the pool.
        while(this.children.length > lenChars)
        {
            var child = this.getChildAt(this.children.length - 1);
            this._pool.push(child);
            this.removeChild(child);
        }


        /**
         * [read-only] The width of the overall text, different from fontSize,
         * which is defined in the style object
         *
         * @property textWidth
         * @type Number
         */
        this.textWidth = maxLineWidth * scale;

        /**
         * [read-only] The height of the overall text, different from fontSize,
         * which is defined in the style object
         *
         * @property textHeight
         * @type Number
         */
        this.textHeight = (pos.y + data.lineHeight) * scale;
    };

    /**
     * Updates the transform of this object
     *
     * @method updateTransform
     * @private
     */
    PIXI.BitmapText.prototype.updateTransform = function()
    {
        if(this.dirty)
        {
            this.updateText();
            this.dirty = false;
        }

        PIXI.DisplayObjectContainer.prototype.updateTransform.call(this);
    };

    PIXI.BitmapText.fonts = {};

    /**
     * @author Mat Groves http://matgroves.com/ @Doormat23
     */
     
    /**
     * Holds all information related to an Interaction event
     *
     * @class InteractionData
     * @constructor
     */
    PIXI.InteractionData = function()
    {
        /**
         * This point stores the global coords of where the touch/mouse event happened
         *
         * @property global
         * @type Point
         */
        this.global = new PIXI.Point();

       
        /**
         * The target Sprite that was interacted with
         *
         * @property target
         * @type Sprite
         */
        this.target = null;

        /**
         * When passed to an event handler, this will be the original DOM Event that was captured
         *
         * @property originalEvent
         * @type Event
         */
        this.originalEvent = null;
    };

    /**
     * This will return the local coordinates of the specified displayObject for this InteractionData
     *
     * @method getLocalPosition
     * @param displayObject {DisplayObject} The DisplayObject that you would like the local coords off
     * @return {Point} A point containing the coordinates of the InteractionData position relative to the DisplayObject
     */
    PIXI.InteractionData.prototype.getLocalPosition = function(displayObject)
    {
        var worldTransform = displayObject.worldTransform;
        var global = this.global;

        // do a cheeky transform to get the mouse coords;
        var a00 = worldTransform.a, a01 = worldTransform.b, a02 = worldTransform.tx,
            a10 = worldTransform.c, a11 = worldTransform.d, a12 = worldTransform.ty,
            id = 1 / (a00 * a11 + a01 * -a10);
        // set the mouse coords...
        return new PIXI.Point(a11 * id * global.x + -a01 * id * global.y + (a12 * a01 - a02 * a11) * id,
                                   a00 * id * global.y + -a10 * id * global.x + (-a12 * a00 + a02 * a10) * id);
    };

    // constructor
    PIXI.InteractionData.prototype.constructor = PIXI.InteractionData;
    /**
     * @author Mat Groves http://matgroves.com/ @Doormat23
     */

     /**
     * The interaction manager deals with mouse and touch events. Any DisplayObject can be interactive
     * if its interactive parameter is set to true
     * This manager also supports multitouch.
     *
     * @class InteractionManager
     * @constructor
     * @param stage {Stage} The stage to handle interactions
     */
    PIXI.InteractionManager = function(stage)
    {
        /**
         * a reference to the stage
         *
         * @property stage
         * @type Stage
         */
        this.stage = stage;

        /**
         * the mouse data
         *
         * @property mouse
         * @type InteractionData
         */
        this.mouse = new PIXI.InteractionData();

        /**
         * an object that stores current touches (InteractionData) by id reference
         *
         * @property touchs
         * @type Object
         */
        this.touchs = {};

        // helpers
        this.tempPoint = new PIXI.Point();

        /**
         * 
         * @property mouseoverEnabled
         * @type Boolean
         * @default
         */
        this.mouseoverEnabled = true;

        /**
         * tiny little interactiveData pool !
         * 
         * @property pool
         * @type Array
         */
        this.pool = [];

        /**
         * An array containing all the iterative items from the our interactive tree
         * @property interactiveItems
         * @type Array
         * @private
         *
         */
        this.interactiveItems = [];

        /**
         * Our canvas
         * @property interactionDOMElement
         * @type HTMLCanvasElement
         * @private
         */
        this.interactionDOMElement = null;

        //this will make it so that you dont have to call bind all the time
        this.onMouseMove = this.onMouseMove.bind( this );
        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseOut = this.onMouseOut.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);

        this.onTouchStart = this.onTouchStart.bind(this);
        this.onTouchEnd = this.onTouchEnd.bind(this);
        this.onTouchMove = this.onTouchMove.bind(this);

        this.last = 0;

        /**
         * The css style of the cursor that is being used
         * @property currentCursorStyle
         * @type String
         *
         */
        this.currentCursorStyle = 'inherit';

        /**
         * Is set to true when the mouse is moved out of the canvas
         * @property mouseOut
         * @type Boolean
         *
         */
        this.mouseOut = false;
    };

    // constructor
    PIXI.InteractionManager.prototype.constructor = PIXI.InteractionManager;

    /**
     * Collects an interactive sprite recursively to have their interactions managed
     *
     * @method collectInteractiveSprite
     * @param displayObject {DisplayObject} the displayObject to collect
     * @param iParent {DisplayObject} the display object's parent
     * @private
     */
    PIXI.InteractionManager.prototype.collectInteractiveSprite = function(displayObject, iParent)
    {
        var children = displayObject.children;
        var length = children.length;

        // make an interaction tree... {item.__interactiveParent}
        for (var i = length-1; i >= 0; i--)
        {
            var child = children[i];

            // push all interactive bits
            if(child._interactive)
            {
                iParent.interactiveChildren = true;
                //child.__iParent = iParent;
                this.interactiveItems.push(child);

                if(child.children.length > 0)
                {
                    this.collectInteractiveSprite(child, child);
                }
            }
            else
            {
                child.__iParent = null;

                if(child.children.length > 0)
                {
                    this.collectInteractiveSprite(child, iParent);
                }
            }

        }
    };

    /**
     * Sets the target for event delegation
     *
     * @method setTarget
     * @param target {WebGLRenderer|CanvasRenderer} the renderer to bind events to
     * @private
     */
    PIXI.InteractionManager.prototype.setTarget = function(target)
    {
        this.target = target;

        //check if the dom element has been set. If it has don't do anything
        if( this.interactionDOMElement === null ) {

            this.setTargetDomElement( target.view );
        }

        
    };


    /**
     * Sets the DOM element which will receive mouse/touch events. This is useful for when you have other DOM
     * elements on top of the renderers Canvas element. With this you'll be able to delegate another DOM element
     * to receive those events
     *
     * @method setTargetDomElement
     * @param domElement {DOMElement} the DOM element which will receive mouse and touch events
     * @private
     */
    PIXI.InteractionManager.prototype.setTargetDomElement = function(domElement)
    {

        this.removeEvents();


        if (window.navigator.msPointerEnabled)
        {
            // time to remove some of that zoom in ja..
            domElement.style['-ms-content-zooming'] = 'none';
            domElement.style['-ms-touch-action'] = 'none';

            // DO some window specific touch!
        }

        this.interactionDOMElement = domElement;

        domElement.addEventListener('mousemove',  this.onMouseMove, true);
        domElement.addEventListener('mousedown',  this.onMouseDown, true);
        domElement.addEventListener('mouseout',   this.onMouseOut, true);

        // aint no multi touch just yet!
        domElement.addEventListener('touchstart', this.onTouchStart, true);
        domElement.addEventListener('touchend', this.onTouchEnd, true);
        domElement.addEventListener('touchmove', this.onTouchMove, true);

        window.addEventListener('mouseup',  this.onMouseUp, true);
    };


    PIXI.InteractionManager.prototype.removeEvents = function()
    {
        if(!this.interactionDOMElement)return;

        this.interactionDOMElement.style['-ms-content-zooming'] = '';
        this.interactionDOMElement.style['-ms-touch-action'] = '';

        this.interactionDOMElement.removeEventListener('mousemove',  this.onMouseMove, true);
        this.interactionDOMElement.removeEventListener('mousedown',  this.onMouseDown, true);
        this.interactionDOMElement.removeEventListener('mouseout',   this.onMouseOut, true);

        // aint no multi touch just yet!
        this.interactionDOMElement.removeEventListener('touchstart', this.onTouchStart, true);
        this.interactionDOMElement.removeEventListener('touchend', this.onTouchEnd, true);
        this.interactionDOMElement.removeEventListener('touchmove', this.onTouchMove, true);

        this.interactionDOMElement = null;

        window.removeEventListener('mouseup',  this.onMouseUp, true);
    };

    /**
     * updates the state of interactive objects
     *
     * @method update
     * @private
     */
    PIXI.InteractionManager.prototype.update = function()
    {
        if(!this.target)return;

        // frequency of 30fps??
        var now = Date.now();
        var diff = now - this.last;
        diff = (diff * PIXI.INTERACTION_FREQUENCY ) / 1000;
        if(diff < 1)return;
        this.last = now;

        var i = 0;

        // ok.. so mouse events??
        // yes for now :)
        // OPTIMISE - how often to check??
        if(this.dirty)
        {
            this.rebuildInteractiveGraph();
        }

        // loop through interactive objects!
        var length = this.interactiveItems.length;
        var cursor = 'inherit';
        var over = false;

        for (i = 0; i < length; i++)
        {
            var item = this.interactiveItems[i];

            // OPTIMISATION - only calculate every time if the mousemove function exists..
            // OK so.. does the object have any other interactive functions?
            // hit-test the clip!
           // if(item.mouseover || item.mouseout || item.buttonMode)
           // {
            // ok so there are some functions so lets hit test it..
            item.__hit = this.hitTest(item, this.mouse);
            this.mouse.target = item;
            // ok so deal with interactions..
            // looks like there was a hit!
            if(item.__hit && !over)
            {
                if(item.buttonMode) cursor = item.defaultCursor;

                if(!item.interactiveChildren)over = true;

                if(!item.__isOver)
                {
                    if(item.mouseover)item.mouseover(this.mouse);
                    item.__isOver = true;
                }
            }
            else
            {
                if(item.__isOver)
                {
                    // roll out!
                    if(item.mouseout)item.mouseout(this.mouse);
                    item.__isOver = false;
                }
            }
        }

        if( this.currentCursorStyle !== cursor )
        {
            this.currentCursorStyle = cursor;
            this.interactionDOMElement.style.cursor = cursor;
        }
    };

    PIXI.InteractionManager.prototype.rebuildInteractiveGraph = function()
    {
        this.dirty = false;

        var len = this.interactiveItems.length;

        for (var i = 0; i < len; i++) {
            this.interactiveItems[i].interactiveChildren = false;
        }

        this.interactiveItems = [];

        if(this.stage.interactive)this.interactiveItems.push(this.stage);
        // go through and collect all the objects that are interactive..
        this.collectInteractiveSprite(this.stage, this.stage);
    };

    /**
     * Is called when the mouse moves across the renderer element
     *
     * @method onMouseMove
     * @param event {Event} The DOM event of the mouse moving
     * @private
     */
    PIXI.InteractionManager.prototype.onMouseMove = function(event)
    {
        if(this.dirty)
        {
            this.rebuildInteractiveGraph();
        }

        this.mouse.originalEvent = event || window.event; //IE uses window.event
        // TODO optimize by not check EVERY TIME! maybe half as often? //
        var rect = this.interactionDOMElement.getBoundingClientRect();

        this.mouse.global.x = (event.clientX - rect.left) * (this.target.width / rect.width);
        this.mouse.global.y = (event.clientY - rect.top) * ( this.target.height / rect.height);

        var length = this.interactiveItems.length;

        for (var i = 0; i < length; i++)
        {
            var item = this.interactiveItems[i];

            if(item.mousemove)
            {
                //call the function!
                item.mousemove(this.mouse);
            }
        }
    };

    /**
     * Is called when the mouse button is pressed down on the renderer element
     *
     * @method onMouseDown
     * @param event {Event} The DOM event of a mouse button being pressed down
     * @private
     */
    PIXI.InteractionManager.prototype.onMouseDown = function(event)
    {
        if(this.dirty)
        {
            this.rebuildInteractiveGraph();
        }

        this.mouse.originalEvent = event || window.event; //IE uses window.event

        if(PIXI.AUTO_PREVENT_DEFAULT)this.mouse.originalEvent.preventDefault();

        // loop through interaction tree...
        // hit test each item! ->
        // get interactive items under point??
        //stage.__i
        var length = this.interactiveItems.length;

        // while
        // hit test
        for (var i = 0; i < length; i++)
        {
            var item = this.interactiveItems[i];

            if(item.mousedown || item.click)
            {
                item.__mouseIsDown = true;
                item.__hit = this.hitTest(item, this.mouse);

                if(item.__hit)
                {
                    //call the function!
                    if(item.mousedown)item.mousedown(this.mouse);
                    item.__isDown = true;

                    // just the one!
                    if(!item.interactiveChildren)break;
                }
            }
        }
    };

    /**
     * Is called when the mouse button is moved out of the renderer element
     *
     * @method onMouseOut
     * @param event {Event} The DOM event of a mouse button being moved out
     * @private 
     */
    PIXI.InteractionManager.prototype.onMouseOut = function()
    {
        if(this.dirty)
        {
            this.rebuildInteractiveGraph();
        }

        var length = this.interactiveItems.length;

        this.interactionDOMElement.style.cursor = 'inherit';

        for (var i = 0; i < length; i++)
        {
            var item = this.interactiveItems[i];
            if(item.__isOver)
            {
                this.mouse.target = item;
                if(item.mouseout)item.mouseout(this.mouse);
                item.__isOver = false;
            }
        }

        this.mouseOut = true;

        // move the mouse to an impossible position
        this.mouse.global.x = -10000;
        this.mouse.global.y = -10000;
    };

    /**
     * Is called when the mouse button is released on the renderer element
     *
     * @method onMouseUp
     * @param event {Event} The DOM event of a mouse button being released
     * @private
     */
    PIXI.InteractionManager.prototype.onMouseUp = function(event)
    {
        if(this.dirty)
        {
            this.rebuildInteractiveGraph();
        }

        this.mouse.originalEvent = event || window.event; //IE uses window.event

        var length = this.interactiveItems.length;
        var up = false;

        for (var i = 0; i < length; i++)
        {
            var item = this.interactiveItems[i];

            item.__hit = this.hitTest(item, this.mouse);

            if(item.__hit && !up)
            {
                //call the function!
                if(item.mouseup)
                {
                    item.mouseup(this.mouse);
                }
                if(item.__isDown)
                {
                    if(item.click)item.click(this.mouse);
                }

                if(!item.interactiveChildren)up = true;
            }
            else
            {
                if(item.__isDown)
                {
                    if(item.mouseupoutside)item.mouseupoutside(this.mouse);
                }
            }

            item.__isDown = false;
            //}
        }
    };

    /**
     * Tests if the current mouse coordinates hit a sprite
     *
     * @method hitTest
     * @param item {DisplayObject} The displayObject to test for a hit
     * @param interactionData {InteractionData} The interactionData object to update in the case there is a hit
     * @private
     */
    PIXI.InteractionManager.prototype.hitTest = function(item, interactionData)
    {
        var global = interactionData.global;

        if( !item.worldVisible )return false;

        // temp fix for if the element is in a non visible
       
        var isSprite = (item instanceof PIXI.Sprite),
            worldTransform = item.worldTransform,
            a00 = worldTransform.a, a01 = worldTransform.b, a02 = worldTransform.tx,
            a10 = worldTransform.c, a11 = worldTransform.d, a12 = worldTransform.ty,
            id = 1 / (a00 * a11 + a01 * -a10),
            x = a11 * id * global.x + -a01 * id * global.y + (a12 * a01 - a02 * a11) * id,
            y = a00 * id * global.y + -a10 * id * global.x + (-a12 * a00 + a02 * a10) * id;

        interactionData.target = item;

        //a sprite or display object with a hit area defined
        if(item.hitArea && item.hitArea.contains) {
            if(item.hitArea.contains(x, y)) {
                //if(isSprite)
                interactionData.target = item;

                return true;
            }

            return false;
        }
        // a sprite with no hitarea defined
        else if(isSprite)
        {
            var width = item.texture.frame.width,
                height = item.texture.frame.height,
                x1 = -width * item.anchor.x,
                y1;

            if(x > x1 && x < x1 + width)
            {
                y1 = -height * item.anchor.y;

                if(y > y1 && y < y1 + height)
                {
                    // set the target property if a hit is true!
                    interactionData.target = item;
                    return true;
                }
            }
        }

        var length = item.children.length;

        for (var i = 0; i < length; i++)
        {
            var tempItem = item.children[i];
            var hit = this.hitTest(tempItem, interactionData);
            if(hit)
            {
                // hmm.. TODO SET CORRECT TARGET?
                interactionData.target = item;
                return true;
            }
        }

        return false;
    };

    /**
     * Is called when a touch is moved across the renderer element
     *
     * @method onTouchMove
     * @param event {Event} The DOM event of a touch moving across the renderer view
     * @private
     */
    PIXI.InteractionManager.prototype.onTouchMove = function(event)
    {
        if(this.dirty)
        {
            this.rebuildInteractiveGraph();
        }

        var rect = this.interactionDOMElement.getBoundingClientRect();
        var changedTouches = event.changedTouches;
        var touchData;
        var i = 0;

        for (i = 0; i < changedTouches.length; i++)
        {
            var touchEvent = changedTouches[i];
            touchData = this.touchs[touchEvent.identifier];
            touchData.originalEvent =  event || window.event;

            // update the touch position
            touchData.global.x = (touchEvent.clientX - rect.left) * (this.target.width / rect.width);
            touchData.global.y = (touchEvent.clientY - rect.top)  * (this.target.height / rect.height);
            if(navigator.isCocoonJS) {
                touchData.global.x = touchEvent.clientX;
                touchData.global.y = touchEvent.clientY;
            }

            for (var j = 0; j < this.interactiveItems.length; j++)
            {
                var item = this.interactiveItems[j];
                if(item.touchmove && item.__touchData && item.__touchData[touchEvent.identifier]) item.touchmove(touchData);
            }
        }
    };

    /**
     * Is called when a touch is started on the renderer element
     *
     * @method onTouchStart
     * @param event {Event} The DOM event of a touch starting on the renderer view
     * @private
     */
    PIXI.InteractionManager.prototype.onTouchStart = function(event)
    {
        if(this.dirty)
        {
            this.rebuildInteractiveGraph();
        }

        var rect = this.interactionDOMElement.getBoundingClientRect();

        if(PIXI.AUTO_PREVENT_DEFAULT)event.preventDefault();
        
        var changedTouches = event.changedTouches;
        for (var i=0; i < changedTouches.length; i++)
        {
            var touchEvent = changedTouches[i];

            var touchData = this.pool.pop();
            if(!touchData)touchData = new PIXI.InteractionData();

            touchData.originalEvent =  event || window.event;

            this.touchs[touchEvent.identifier] = touchData;
            touchData.global.x = (touchEvent.clientX - rect.left) * (this.target.width / rect.width);
            touchData.global.y = (touchEvent.clientY - rect.top)  * (this.target.height / rect.height);
            if(navigator.isCocoonJS) {
                touchData.global.x = touchEvent.clientX;
                touchData.global.y = touchEvent.clientY;
            }

            var length = this.interactiveItems.length;

            for (var j = 0; j < length; j++)
            {
                var item = this.interactiveItems[j];

                if(item.touchstart || item.tap)
                {
                    item.__hit = this.hitTest(item, touchData);

                    if(item.__hit)
                    {
                        //call the function!
                        if(item.touchstart)item.touchstart(touchData);
                        item.__isDown = true;
                        item.__touchData = item.__touchData || {};
                        item.__touchData[touchEvent.identifier] = touchData;

                        if(!item.interactiveChildren)break;
                    }
                }
            }
        }
    };

    /**
     * Is called when a touch is ended on the renderer element
     *
     * @method onTouchEnd
     * @param event {Event} The DOM event of a touch ending on the renderer view
     * @private
     */
    PIXI.InteractionManager.prototype.onTouchEnd = function(event)
    {
        if(this.dirty)
        {
            this.rebuildInteractiveGraph();
        }
        
        //this.mouse.originalEvent = event || window.event; //IE uses window.event
        var rect = this.interactionDOMElement.getBoundingClientRect();
        var changedTouches = event.changedTouches;

        for (var i=0; i < changedTouches.length; i++)
        {
            var touchEvent = changedTouches[i];
            var touchData = this.touchs[touchEvent.identifier];
            var up = false;
            touchData.global.x = (touchEvent.clientX - rect.left) * (this.target.width / rect.width);
            touchData.global.y = (touchEvent.clientY - rect.top)  * (this.target.height / rect.height);
            if(navigator.isCocoonJS) {
                touchData.global.x = touchEvent.clientX;
                touchData.global.y = touchEvent.clientY;
            }

            var length = this.interactiveItems.length;
            for (var j = 0; j < length; j++)
            {
                var item = this.interactiveItems[j];

                if(item.__touchData && item.__touchData[touchEvent.identifier]) {

                    item.__hit = this.hitTest(item, item.__touchData[touchEvent.identifier]);

                    // so this one WAS down...
                    touchData.originalEvent = event || window.event;
                    // hitTest??

                    if(item.touchend || item.tap)
                    {
                        if(item.__hit && !up)
                        {
                            if(item.touchend)item.touchend(touchData);
                            if(item.__isDown)
                            {
                                if(item.tap)item.tap(touchData);
                            }

                            if(!item.interactiveChildren)up = true;
                        }
                        else
                        {
                            if(item.__isDown)
                            {
                                if(item.touchendoutside)item.touchendoutside(touchData);
                            }
                        }

                        item.__isDown = false;
                    }

                    item.__touchData[touchEvent.identifier] = null;
                }
            }
            // remove the touch..
            this.pool.push(touchData);
            this.touchs[touchEvent.identifier] = null;
        }
    };

    /**
     * @author Mat Groves http://matgroves.com/ @Doormat23
     */

    /**
     * A Stage represents the root of the display tree. Everything connected to the stage is rendered
     *
     * @class Stage
     * @extends DisplayObjectContainer
     * @constructor
     * @param backgroundColor {Number} the background color of the stage, you have to pass this in is in hex format
     *      like: 0xFFFFFF for white
     * 
     * Creating a stage is a mandatory process when you use Pixi, which is as simple as this : 
     * var stage = new PIXI.Stage(0xFFFFFF);
     * where the parameter given is the background colour of the stage, in hex
     * you will use this stage instance to add your sprites to it and therefore to the renderer
     * Here is how to add a sprite to the stage : 
     * stage.addChild(sprite);
     */
    PIXI.Stage = function(backgroundColor)
    {
        PIXI.DisplayObjectContainer.call( this );

        /**
         * [read-only] Current transform of the object based on world (parent) factors
         *
         * @property worldTransform
         * @type Mat3
         * @readOnly
         * @private
         */
        this.worldTransform = new PIXI.Matrix();

        /**
         * Whether or not the stage is interactive
         *
         * @property interactive
         * @type Boolean
         */
        this.interactive = true;

        /**
         * The interaction manage for this stage, manages all interactive activity on the stage
         *
         * @property interactionManager
         * @type InteractionManager
         */
        this.interactionManager = new PIXI.InteractionManager(this);

        /**
         * Whether the stage is dirty and needs to have interactions updated
         *
         * @property dirty
         * @type Boolean
         * @private
         */
        this.dirty = true;

        //the stage is its own stage
        this.stage = this;

        //optimize hit detection a bit
        this.stage.hitArea = new PIXI.Rectangle(0,0,100000, 100000);

        this.setBackgroundColor(backgroundColor);
    };

    // constructor
    PIXI.Stage.prototype = Object.create( PIXI.DisplayObjectContainer.prototype );
    PIXI.Stage.prototype.constructor = PIXI.Stage;

    /**
     * Sets another DOM element which can receive mouse/touch interactions instead of the default Canvas element.
     * This is useful for when you have other DOM elements on top of the Canvas element.
     *
     * @method setInteractionDelegate
     * @param domElement {DOMElement} This new domElement which will receive mouse/touch events
     */
    PIXI.Stage.prototype.setInteractionDelegate = function(domElement)
    {
        this.interactionManager.setTargetDomElement( domElement );
    };

    /*
     * Updates the object transform for rendering
     *
     * @method updateTransform
     * @private
     */
    PIXI.Stage.prototype.updateTransform = function()
    {
        this.worldAlpha = 1;

        for(var i=0,j=this.children.length; i<j; i++)
        {
            this.children[i].updateTransform();
        }

        if(this.dirty)
        {
            this.dirty = false;
            // update interactive!
            this.interactionManager.dirty = true;
        }

        if(this.interactive)this.interactionManager.update();
    };

    /**
     * Sets the background color for the stage
     *
     * @method setBackgroundColor
     * @param backgroundColor {Number} the color of the background, easiest way to pass this in is in hex format
     *      like: 0xFFFFFF for white
     */
    PIXI.Stage.prototype.setBackgroundColor = function(backgroundColor)
    {
        this.backgroundColor = backgroundColor || 0x000000;
        this.backgroundColorSplit = PIXI.hex2rgb(this.backgroundColor);
        var hex = this.backgroundColor.toString(16);
        hex = '000000'.substr(0, 6 - hex.length) + hex;
        this.backgroundColorString = '#' + hex;
    };

    /**
     * This will return the point containing global coords of the mouse.
     *
     * @method getMousePosition
     * @return {Point} The point containing the coords of the global InteractionData position.
     */
    PIXI.Stage.prototype.getMousePosition = function()
    {
        return this.interactionManager.mouse.global;
    };

    /**
     * @author Mat Groves http://matgroves.com/ @Doormat23
     */
     
    // http://paulirish.com/2011/requestanimationframe-for-smart-animating/
    // http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating

    // requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel

    // MIT license

    /**
     * A polyfill for requestAnimationFrame
     * You can actually use both requestAnimationFrame and requestAnimFrame, 
     * you will still benefit from the polyfill
     *
     * @method requestAnimationFrame
     */
    /**
     * A polyfill for cancelAnimationFrame
     *
     * @method cancelAnimationFrame
     */
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] ||
            window[vendors[x] + 'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function(callback) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); },
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
    }

    if (!window.cancelAnimationFrame) {
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
    }

    window.requestAnimFrame = window.requestAnimationFrame;

    /**
     * Converts a hex color number to an [R, G, B] array
     *
     * @method hex2rgb
     * @param hex {Number}
     */
    PIXI.hex2rgb = function(hex) {
        return [(hex >> 16 & 0xFF) / 255, ( hex >> 8 & 0xFF) / 255, (hex & 0xFF)/ 255];
    };

    /**
     * Converts a color as an [R, G, B] array to a hex number
     *
     * @method rgb2hex
     * @param rgb {Array}
     */
    PIXI.rgb2hex = function(rgb) {
        return ((rgb[0]*255 << 16) + (rgb[1]*255 << 8) + rgb[2]*255);
    };

    /**
     * A polyfill for Function.prototype.bind
     *
     * @method bind
     */
    if (typeof Function.prototype.bind !== 'function') {
        Function.prototype.bind = (function () {
            var slice = Array.prototype.slice;
            return function (thisArg) {
                var target = this, boundArgs = slice.call(arguments, 1);

                if (typeof target !== 'function') throw new TypeError();

                function bound() {
                    var args = boundArgs.concat(slice.call(arguments));
                    target.apply(this instanceof bound ? this : thisArg, args);
                }

                bound.prototype = (function F(proto) {
                    if (proto) F.prototype = proto;
                    if (!(this instanceof F)) return new F();
                })(target.prototype);

                return bound;
            };
        })();
    }

    /**
     * A wrapper for ajax requests to be handled cross browser
     *
     * @class AjaxRequest
     * @constructor
     */
    PIXI.AjaxRequest = function()
    {
        var activexmodes = ['Msxml2.XMLHTTP.6.0', 'Msxml2.XMLHTTP.3.0', 'Microsoft.XMLHTTP']; //activeX versions to check for in IE

        if (window.ActiveXObject)
        { //Test for support for ActiveXObject in IE first (as XMLHttpRequest in IE7 is broken)
            for (var i=0; i<activexmodes.length; i++)
            {
                try{
                    return new window.ActiveXObject(activexmodes[i]);
                }
                catch(e) {
                    //suppress error
                }
            }
        }
        else if (window.XMLHttpRequest) // if Mozilla, Safari etc
        {
            return new window.XMLHttpRequest();
        }
        else
        {
            return false;
        }
    };
    /*
    PIXI.packColorRGBA = function(r, g, b, a)//r, g, b, a)
    {
      //  console.log(r, b, c, d)
      return (Math.floor((r)*63) << 18) | (Math.floor((g)*63) << 12) | (Math.floor((b)*63) << 6);// | (Math.floor((a)*63))
      //  i = i | (Math.floor((a)*63));
       // return i;
       // var r = (i / 262144.0 ) / 64;
       // var g = (i / 4096.0)%64 / 64;
      //  var b = (i / 64.0)%64 / 64;
      //  var a = (i)%64 / 64;
         
      //  console.log(r, g, b, a);
      //  return i;

    };
    */
    /*
    PIXI.packColorRGB = function(r, g, b)//r, g, b, a)
    {
        return (Math.floor((r)*255) << 16) | (Math.floor((g)*255) << 8) | (Math.floor((b)*255));
    };

    PIXI.unpackColorRGB = function(r, g, b)//r, g, b, a)
    {
        return (Math.floor((r)*255) << 16) | (Math.floor((g)*255) << 8) | (Math.floor((b)*255));
    };
    */

    /**
     * Checks whether the Canvas BlendModes are supported by the current browser
     *
     * @method canUseNewCanvasBlendModes
     * @return {Boolean} whether they are supported
     */
    PIXI.canUseNewCanvasBlendModes = function()
    {
        var canvas = document.createElement('canvas');
        canvas.width = 1;
        canvas.height = 1;
        var context = canvas.getContext('2d');
        context.fillStyle = '#000';
        context.fillRect(0,0,1,1);
        context.globalCompositeOperation = 'multiply';
        context.fillStyle = '#fff';
        context.fillRect(0,0,1,1);
        return context.getImageData(0,0,1,1).data[0] === 0;
    };

    /**
     * Given a number, this function returns the closest number that is a power of two
     * this function is taken from Starling Framework as its pretty neat ;)
     *
     * @method getNextPowerOfTwo
     * @param number {Number}
     * @return {Number} the closest number that is a power of two
     */
    PIXI.getNextPowerOfTwo = function(number)
    {
        if (number > 0 && (number & (number - 1)) === 0) // see: http://goo.gl/D9kPj
            return number;
        else
        {
            var result = 1;
            while (result < number) result <<= 1;
            return result;
        }
    };

    /**
     * @author Mat Groves http://matgroves.com/ @Doormat23
     */
     
    /**
     * https://github.com/mrdoob/eventtarget.js/
     * THankS mr DOob!
     */

    /**
     * Adds event emitter functionality to a class
     *
     * @class EventTarget
     * @example
     *      function MyEmitter() {
     *          PIXI.EventTarget.call(this); //mixes in event target stuff
     *      }
     *
     *      var em = new MyEmitter();
     *      em.emit({ type: 'eventName', data: 'some data' });
     */
    PIXI.EventTarget = function () {

        /**
         * Holds all the listeners
         *
         * @property listeners
         * @type Object
         */
        var listeners = {};

        /**
         * Adds a listener for a specific event
         *
         * @method addEventListener
         * @param type {string} A string representing the event type to listen for.
         * @param listener {function} The callback function that will be fired when the event occurs
         */
        this.addEventListener = this.on = function ( type, listener ) {


            if ( listeners[ type ] === undefined ) {

                listeners[ type ] = [];

            }

            if ( listeners[ type ].indexOf( listener ) === - 1 ) {

                listeners[ type ].unshift( listener );
            }

        };

        /**
         * Fires the event, ie pretends that the event has happened
         *
         * @method dispatchEvent
         * @param event {Event} the event object
         */
        this.dispatchEvent = this.emit = function ( event ) {

            if ( !listeners[ event.type ] || !listeners[ event.type ].length ) {

                return;

            }


            for(var i = listeners[ event.type ].length-1; i >= 0; i--) {
    //        for(var i = 0, l=listeners[ event.type ].length; i < l; i++) {


                listeners[ event.type ][ i ]( event );

            }

        };

        /**
         * Removes the specified listener that was assigned to the specified event type
         *
         * @method removeEventListener
         * @param type {string} A string representing the event type which will have its listener removed
         * @param listener {function} The callback function that was be fired when the event occured
         */
        this.removeEventListener = this.off = function ( type, listener ) {

            if ( listeners[ type ] === undefined ) return;

            var index = listeners[ type ].indexOf( listener );

            if ( index !== - 1 ) {

                listeners[ type ].splice( index, 1 );

            }

        };

        /**
         * Removes all the listeners that were active for the specified event type
         *
         * @method removeAllEventListeners
         * @param type {string} A string representing the event type which will have all its listeners removed
         */
    	this.removeAllEventListeners = function( type ) {
    		var a = listeners[type];
    		if (a)
    			a.length = 0;
    	};
    };

    /**
     * @author Mat Groves http://matgroves.com/ @Doormat23
     */

    /**
     * This helper function will automatically detect which renderer you should be using.
     * WebGL is the preferred renderer as it is a lot faster. If webGL is not supported by
     * the browser then this function will return a canvas renderer
     * @class autoDetectRenderer
     * @static
     * @param width=800 {Number} the width of the renderers view
     * @param height=600 {Number} the height of the renderers view
     * @param [view] {Canvas} the canvas to use as a view, optional 
     * @param [transparent=false] {Boolean} the transparency of the render view, default false
     * @param [antialias=false] {Boolean} sets antialias (only applicable in webGL chrome at the moment)
     *
     */
    PIXI.autoDetectRenderer = function(width, height, view, transparent, antialias)
    {
        if(!width)width = 800;
        if(!height)height = 600;

        // BORROWED from Mr Doob (mrdoob.com)
        var webgl = ( function () { try {
                                        var canvas = document.createElement( 'canvas' );
                                        return !! window.WebGLRenderingContext && ( canvas.getContext( 'webgl' ) || canvas.getContext( 'experimental-webgl' ) );
                                    } catch( e ) {
                                        return false;
                                    }
                                } )();

        if( webgl )
        {
            return new PIXI.WebGLRenderer(width, height, view, transparent, antialias);
        }

        return  new PIXI.CanvasRenderer(width, height, view, transparent);
    };

    /**
     * This helper function will automatically detect which renderer you should be using.
     * This function is very similar to the autoDetectRenderer function except that is will return a canvas renderer for android.
     * Even thought both android chrome suports webGL the canvas implementation perform better at the time of writing. 
     * This function will likely change and update as webGL performance imporoves on thease devices.
     * @class getRecommendedRenderer
     * @static
     * @param width=800 {Number} the width of the renderers view
     * @param height=600 {Number} the height of the renderers view
     * @param [view] {Canvas} the canvas to use as a view, optional 
     * @param [transparent=false] {Boolean} the transparency of the render view, default false
     * @param [antialias=false] {Boolean} sets antialias (only applicable in webGL chrome at the moment)
     *
     */
    PIXI.autoDetectRecommendedRenderer = function(width, height, view, transparent, antialias)
    {
        if(!width)width = 800;
        if(!height)height = 600;

        // BORROWED from Mr Doob (mrdoob.com)
        var webgl = ( function () { try {
                                        var canvas = document.createElement( 'canvas' );
                                        return !! window.WebGLRenderingContext && ( canvas.getContext( 'webgl' ) || canvas.getContext( 'experimental-webgl' ) );
                                    } catch( e ) {
                                        return false;
                                    }
                                } )();

        var isAndroid = /Android/i.test(navigator.userAgent);

        if( webgl && !isAndroid)
        {
            return new PIXI.WebGLRenderer(width, height, view, transparent, antialias);
        }

        return  new PIXI.CanvasRenderer(width, height, view, transparent);
    };

    /*
        PolyK library
        url: http://polyk.ivank.net
        Released under MIT licence.

        Copyright (c) 2012 Ivan Kuckir

        Permission is hereby granted, free of charge, to any person
        obtaining a copy of this software and associated documentation
        files (the "Software"), to deal in the Software without
        restriction, including without limitation the rights to use,
        copy, modify, merge, publish, distribute, sublicense, and/or sell
        copies of the Software, and to permit persons to whom the
        Software is furnished to do so, subject to the following
        conditions:

        The above copyright notice and this permission notice shall be
        included in all copies or substantial portions of the Software.

        THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
        EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
        OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
        NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
        HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
        WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
        FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
        OTHER DEALINGS IN THE SOFTWARE.

        This is an amazing lib!

        slightly modified by Mat Groves (matgroves.com);
    */

    /**
     * Based on the Polyk library http://polyk.ivank.net released under MIT licence.
     * This is an amazing lib!
     * slightly modified by Mat Groves (matgroves.com);
     * @class PolyK
     *
     */
    PIXI.PolyK = {};

    /**
     * Triangulates shapes for webGL graphic fills
     *
     * @method Triangulate
     * 
     */
    PIXI.PolyK.Triangulate = function(p)
    {
        var sign = true;

        var n = p.length >> 1;
        if(n < 3) return [];

        var tgs = [];
        var avl = [];
        for(var i = 0; i < n; i++) avl.push(i);

        i = 0;
        var al = n;
        while(al > 3)
        {
            var i0 = avl[(i+0)%al];
            var i1 = avl[(i+1)%al];
            var i2 = avl[(i+2)%al];

            var ax = p[2*i0],  ay = p[2*i0+1];
            var bx = p[2*i1],  by = p[2*i1+1];
            var cx = p[2*i2],  cy = p[2*i2+1];

            var earFound = false;
            if(PIXI.PolyK._convex(ax, ay, bx, by, cx, cy, sign))
            {
                earFound = true;
                for(var j = 0; j < al; j++)
                {
                    var vi = avl[j];
                    if(vi === i0 || vi === i1 || vi === i2) continue;

                    if(PIXI.PolyK._PointInTriangle(p[2*vi], p[2*vi+1], ax, ay, bx, by, cx, cy)) {
                        earFound = false;
                        break;
                    }
                }
            }

            if(earFound)
            {
                tgs.push(i0, i1, i2);
                avl.splice((i+1)%al, 1);
                al--;
                i = 0;
            }
            else if(i++ > 3*al)
            {
                // need to flip flip reverse it!
                // reset!
                if(sign)
                {
                    tgs = [];
                    avl = [];
                    for(i = 0; i < n; i++) avl.push(i);

                    i = 0;
                    al = n;

                    sign = false;
                }
                else
                {
                    window.console.log("PIXI Warning: shape too complex to fill");
                    return [];
                }
            }
        }

        tgs.push(avl[0], avl[1], avl[2]);
        return tgs;
    };

    /**
     * Checks whether a point is within a triangle
     *
     * @method _PointInTriangle
     * @param px {Number} x coordinate of the point to test
     * @param py {Number} y coordinate of the point to test
     * @param ax {Number} x coordinate of the a point of the triangle
     * @param ay {Number} y coordinate of the a point of the triangle
     * @param bx {Number} x coordinate of the b point of the triangle
     * @param by {Number} y coordinate of the b point of the triangle
     * @param cx {Number} x coordinate of the c point of the triangle
     * @param cy {Number} y coordinate of the c point of the triangle
     * @private
     */
    PIXI.PolyK._PointInTriangle = function(px, py, ax, ay, bx, by, cx, cy)
    {
        var v0x = cx-ax;
        var v0y = cy-ay;
        var v1x = bx-ax;
        var v1y = by-ay;
        var v2x = px-ax;
        var v2y = py-ay;

        var dot00 = v0x*v0x+v0y*v0y;
        var dot01 = v0x*v1x+v0y*v1y;
        var dot02 = v0x*v2x+v0y*v2y;
        var dot11 = v1x*v1x+v1y*v1y;
        var dot12 = v1x*v2x+v1y*v2y;

        var invDenom = 1 / (dot00 * dot11 - dot01 * dot01);
        var u = (dot11 * dot02 - dot01 * dot12) * invDenom;
        var v = (dot00 * dot12 - dot01 * dot02) * invDenom;

        // Check if point is in triangle
        return (u >= 0) && (v >= 0) && (u + v < 1);
    };

    /**
     * Checks whether a shape is convex
     *
     * @method _convex
     * 
     * @private
     */
    PIXI.PolyK._convex = function(ax, ay, bx, by, cx, cy, sign)
    {
        return ((ay-by)*(cx-bx) + (bx-ax)*(cy-by) >= 0) === sign;
    };

    /**
     * @author Mat Groves http://matgroves.com/ @Doormat23
     */

    // TODO Alvin and Mat
    // Should we eventually create a Utils class ? 
    // Or just move this file to the pixi.js file ?
    PIXI.initDefaultShaders = function()
    {
       
      //  PIXI.stripShader = new PIXI.StripShader();
    //    PIXI.stripShader.init();

    };

    PIXI.CompileVertexShader = function(gl, shaderSrc)
    {
        return PIXI._CompileShader(gl, shaderSrc, gl.VERTEX_SHADER);
    };

    PIXI.CompileFragmentShader = function(gl, shaderSrc)
    {
        return PIXI._CompileShader(gl, shaderSrc, gl.FRAGMENT_SHADER);
    };

    PIXI._CompileShader = function(gl, shaderSrc, shaderType)
    {
        var src = shaderSrc.join("\n");
        var shader = gl.createShader(shaderType);
        gl.shaderSource(shader, src);
        gl.compileShader(shader);

        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            window.console.log(gl.getShaderInfoLog(shader));
            return null;
        }

        return shader;
    };

    PIXI.compileProgram = function(gl, vertexSrc, fragmentSrc)
    {
        var fragmentShader = PIXI.CompileFragmentShader(gl, fragmentSrc);
        var vertexShader = PIXI.CompileVertexShader(gl, vertexSrc);

        var shaderProgram = gl.createProgram();

        gl.attachShader(shaderProgram, vertexShader);
        gl.attachShader(shaderProgram, fragmentShader);
        gl.linkProgram(shaderProgram);

        if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
            window.console.log("Could not initialise shaders");
        }

        return shaderProgram;
    };

    /**
     * @author Mat Groves http://matgroves.com/ @Doormat23
     * @author Richard Davey http://www.photonstorm.com @photonstorm
     */

    /**
    * @class PixiShader
    * @constructor
    */
    PIXI.PixiShader = function(gl)
    {
        this._UID = PIXI._UID++;
        
        /**
         * @property gl
         * @type WebGLContext
         */
        this.gl = gl;

        /**
        * @property {any} program - The WebGL program.
        */
        this.program = null;

        /**
        * @property {array} fragmentSrc - The fragment shader.
        */
        this.fragmentSrc = [
            'precision lowp float;',
            'varying vec2 vTextureCoord;',
            'varying vec4 vColor;',
            'uniform sampler2D uSampler;',
            'void main(void) {',
            '   gl_FragColor = texture2D(uSampler, vTextureCoord) * vColor ;',
            '}'
        ];

        /**
        * @property {number} textureCount - A local texture counter for multi-texture shaders.
        */
        this.textureCount = 0;

        this.attributes = [];

        this.init();
    };

    /**
    * Initialises the shader
    * @method init
    *
    */
    PIXI.PixiShader.prototype.init = function()
    {
        var gl = this.gl;

        var program = PIXI.compileProgram(gl, this.vertexSrc || PIXI.PixiShader.defaultVertexSrc, this.fragmentSrc);
        
        gl.useProgram(program);

        // get and store the uniforms for the shader
        this.uSampler = gl.getUniformLocation(program, 'uSampler');
        this.projectionVector = gl.getUniformLocation(program, 'projectionVector');
        this.offsetVector = gl.getUniformLocation(program, 'offsetVector');
        this.dimensions = gl.getUniformLocation(program, 'dimensions');

        // get and store the attributes
        this.aVertexPosition = gl.getAttribLocation(program, 'aVertexPosition');
        this.aTextureCoord = gl.getAttribLocation(program, 'aTextureCoord');
        this.colorAttribute = gl.getAttribLocation(program, 'aColor');


        // Begin worst hack eva //

        // WHY??? ONLY on my chrome pixel the line above returns -1 when using filters?
        // maybe its something to do with the current state of the gl context.
        // Im convinced this is a bug in the chrome browser as there is NO reason why this should be returning -1 especially as it only manifests on my chrome pixel
        // If theres any webGL people that know why could happen please help :)
        if(this.colorAttribute === -1)
        {
            this.colorAttribute = 2;
        }

        this.attributes = [this.aVertexPosition, this.aTextureCoord, this.colorAttribute];

        // End worst hack eva //

        // add those custom shaders!
        for (var key in this.uniforms)
        {
            // get the uniform locations..
            this.uniforms[key].uniformLocation = gl.getUniformLocation(program, key);
        }

        this.initUniforms();

        this.program = program;
    };

    /**
    * Initialises the shader uniform values.
    * Uniforms are specified in the GLSL_ES Specification: http://www.khronos.org/registry/webgl/specs/latest/1.0/
    * http://www.khronos.org/registry/gles/specs/2.0/GLSL_ES_Specification_1.0.17.pdf
    *
    * @method initUniforms
    */
    PIXI.PixiShader.prototype.initUniforms = function()
    {
        this.textureCount = 1;
        var gl = this.gl;
        var uniform;

        for (var key in this.uniforms)
        {
            uniform = this.uniforms[key];

            var type = uniform.type;

            if (type === 'sampler2D')
            {
                uniform._init = false;

                if (uniform.value !== null)
                {
                    this.initSampler2D(uniform);
                }
            }
            else if (type === 'mat2' || type === 'mat3' || type === 'mat4')
            {
                //  These require special handling
                uniform.glMatrix = true;
                uniform.glValueLength = 1;

                if (type === 'mat2')
                {
                    uniform.glFunc = gl.uniformMatrix2fv;
                }
                else if (type === 'mat3')
                {
                    uniform.glFunc = gl.uniformMatrix3fv;
                }
                else if (type === 'mat4')
                {
                    uniform.glFunc = gl.uniformMatrix4fv;
                }
            }
            else
            {
                //  GL function reference
                uniform.glFunc = gl['uniform' + type];

                if (type === '2f' || type === '2i')
                {
                    uniform.glValueLength = 2;
                }
                else if (type === '3f' || type === '3i')
                {
                    uniform.glValueLength = 3;
                }
                else if (type === '4f' || type === '4i')
                {
                    uniform.glValueLength = 4;
                }
                else
                {
                    uniform.glValueLength = 1;
                }
            }
        }

    };

    /**
    * Initialises a Sampler2D uniform (which may only be available later on after initUniforms once the texture has loaded)
    *
    * @method initSampler2D
    */
    PIXI.PixiShader.prototype.initSampler2D = function(uniform)
    {
        if (!uniform.value || !uniform.value.baseTexture || !uniform.value.baseTexture.hasLoaded)
        {
            return;
        }

        var gl = this.gl;

        gl.activeTexture(gl['TEXTURE' + this.textureCount]);
        gl.bindTexture(gl.TEXTURE_2D, uniform.value.baseTexture._glTextures[gl.id]);

        //  Extended texture data
        if (uniform.textureData)
        {
            var data = uniform.textureData;

            // GLTexture = mag linear, min linear_mipmap_linear, wrap repeat + gl.generateMipmap(gl.TEXTURE_2D);
            // GLTextureLinear = mag/min linear, wrap clamp
            // GLTextureNearestRepeat = mag/min NEAREST, wrap repeat
            // GLTextureNearest = mag/min nearest, wrap clamp
            // AudioTexture = whatever + luminance + width 512, height 2, border 0
            // KeyTexture = whatever + luminance + width 256, height 2, border 0

            //  magFilter can be: gl.LINEAR, gl.LINEAR_MIPMAP_LINEAR or gl.NEAREST
            //  wrapS/T can be: gl.CLAMP_TO_EDGE or gl.REPEAT

            var magFilter = (data.magFilter) ? data.magFilter : gl.LINEAR;
            var minFilter = (data.minFilter) ? data.minFilter : gl.LINEAR;
            var wrapS = (data.wrapS) ? data.wrapS : gl.CLAMP_TO_EDGE;
            var wrapT = (data.wrapT) ? data.wrapT : gl.CLAMP_TO_EDGE;
            var format = (data.luminance) ? gl.LUMINANCE : gl.RGBA;

            if (data.repeat)
            {
                wrapS = gl.REPEAT;
                wrapT = gl.REPEAT;
            }

            gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, !!data.flipY);

            if (data.width)
            {
                var width = (data.width) ? data.width : 512;
                var height = (data.height) ? data.height : 2;
                var border = (data.border) ? data.border : 0;

                // void texImage2D(GLenum target, GLint level, GLenum internalformat, GLsizei width, GLsizei height, GLint border, GLenum format, GLenum type, ArrayBufferView? pixels);
                gl.texImage2D(gl.TEXTURE_2D, 0, format, width, height, border, format, gl.UNSIGNED_BYTE, null);
            }
            else
            {
                //  void texImage2D(GLenum target, GLint level, GLenum internalformat, GLenum format, GLenum type, ImageData? pixels);
                gl.texImage2D(gl.TEXTURE_2D, 0, format, gl.RGBA, gl.UNSIGNED_BYTE, uniform.value.baseTexture.source);
            }

            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, magFilter);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, minFilter);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, wrapS);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, wrapT);
        }

        gl.uniform1i(uniform.uniformLocation, this.textureCount);

        uniform._init = true;

        this.textureCount++;

    };

    /**
    * Updates the shader uniform values.
    *
    * @method syncUniforms
    */
    PIXI.PixiShader.prototype.syncUniforms = function()
    {
        this.textureCount = 1;
        var uniform;
        var gl = this.gl;

        //  This would probably be faster in an array and it would guarantee key order
        for (var key in this.uniforms)
        {
            uniform = this.uniforms[key];

            if (uniform.glValueLength === 1)
            {
                if (uniform.glMatrix === true)
                {
                    uniform.glFunc.call(gl, uniform.uniformLocation, uniform.transpose, uniform.value);
                }
                else
                {
                    uniform.glFunc.call(gl, uniform.uniformLocation, uniform.value);
                }
            }
            else if (uniform.glValueLength === 2)
            {
                uniform.glFunc.call(gl, uniform.uniformLocation, uniform.value.x, uniform.value.y);
            }
            else if (uniform.glValueLength === 3)
            {
                uniform.glFunc.call(gl, uniform.uniformLocation, uniform.value.x, uniform.value.y, uniform.value.z);
            }
            else if (uniform.glValueLength === 4)
            {
                uniform.glFunc.call(gl, uniform.uniformLocation, uniform.value.x, uniform.value.y, uniform.value.z, uniform.value.w);
            }
            else if (uniform.type === 'sampler2D')
            {
                if (uniform._init)
                {
                    gl.activeTexture(gl['TEXTURE' + this.textureCount]);
                    gl.bindTexture(gl.TEXTURE_2D, uniform.value.baseTexture._glTextures[gl.id] || PIXI.createWebGLTexture( uniform.value.baseTexture, gl));
                    gl.uniform1i(uniform.uniformLocation, this.textureCount);
                    this.textureCount++;
                }
                else
                {
                    this.initSampler2D(uniform);
                }
            }
        }

    };

    /**
    * Destroys the shader
    * @method destroy
    */
    PIXI.PixiShader.prototype.destroy = function()
    {
        this.gl.deleteProgram( this.program );
        this.uniforms = null;
        this.gl = null;

        this.attributes = null;
    };

    /**
    * The Default Vertex shader source
    * @property defaultVertexSrc
    * @type String
    */
    PIXI.PixiShader.defaultVertexSrc = [
        'attribute vec2 aVertexPosition;',
        'attribute vec2 aTextureCoord;',
        'attribute vec2 aColor;',

        'uniform vec2 projectionVector;',
        'uniform vec2 offsetVector;',

        'varying vec2 vTextureCoord;',
        'varying vec4 vColor;',

        'const vec2 center = vec2(-1.0, 1.0);',

        'void main(void) {',
        '   gl_Position = vec4( ((aVertexPosition + offsetVector) / projectionVector) + center , 0.0, 1.0);',
        '   vTextureCoord = aTextureCoord;',
        '   vec3 color = mod(vec3(aColor.y/65536.0, aColor.y/256.0, aColor.y), 256.0) / 256.0;',
        '   vColor = vec4(color * aColor.x, aColor.x);',
        '}'
    ];

    /**
     * @author Mat Groves http://matgroves.com/ @Doormat23
     * @author Richard Davey http://www.photonstorm.com @photonstorm
     */

    /**
    * @class PixiFastShader
    * @constructor
    * @param gl {WebGLContext} the current WebGL drawing context
    */
    PIXI.PixiFastShader = function(gl)
    {
        this._UID = PIXI._UID++;
        
        /**
         * @property gl
         * @type WebGLContext
         */
        this.gl = gl;

        /**
         * @property {any} program - The WebGL program.
         */
        this.program = null;

        /**
         * @property {array} fragmentSrc - The fragment shader.
         */
        this.fragmentSrc = [
            'precision lowp float;',
            'varying vec2 vTextureCoord;',
            'varying float vColor;',
            'uniform sampler2D uSampler;',
            'void main(void) {',
            '   gl_FragColor = texture2D(uSampler, vTextureCoord) * vColor ;',
            '}'
        ];

        /**
        * @property {array} vertexSrc - The vertex shader
        */
        this.vertexSrc = [
            'attribute vec2 aVertexPosition;',
            'attribute vec2 aPositionCoord;',
            'attribute vec2 aScale;',
            'attribute float aRotation;',
            'attribute vec2 aTextureCoord;',
            'attribute float aColor;',

            'uniform vec2 projectionVector;',
            'uniform vec2 offsetVector;',
            'uniform mat3 uMatrix;',

            'varying vec2 vTextureCoord;',
            'varying float vColor;',

            'const vec2 center = vec2(-1.0, 1.0);',

            'void main(void) {',
            '   vec2 v;',
            '   vec2 sv = aVertexPosition * aScale;',
            '   v.x = (sv.x) * cos(aRotation) - (sv.y) * sin(aRotation);',
            '   v.y = (sv.x) * sin(aRotation) + (sv.y) * cos(aRotation);',
            '   v = ( uMatrix * vec3(v + aPositionCoord , 1.0) ).xy ;',
            '   gl_Position = vec4( ( v / projectionVector) + center , 0.0, 1.0);',
            '   vTextureCoord = aTextureCoord;',
          //  '   vec3 color = mod(vec3(aColor.y/65536.0, aColor.y/256.0, aColor.y), 256.0) / 256.0;',
            '   vColor = aColor;',
            '}'
        ];


        /**
        * @property {number} textureCount - A local texture counter for multi-texture shaders.
        */
        this.textureCount = 0;

        
        this.init();
    };

    /**
    * Initialises the shader
    * @method init
    *
    */
    PIXI.PixiFastShader.prototype.init = function()
    {

        var gl = this.gl;

        var program = PIXI.compileProgram(gl, this.vertexSrc, this.fragmentSrc);
        
        gl.useProgram(program);

        // get and store the uniforms for the shader
        this.uSampler = gl.getUniformLocation(program, 'uSampler');

        this.projectionVector = gl.getUniformLocation(program, 'projectionVector');
        this.offsetVector = gl.getUniformLocation(program, 'offsetVector');
        this.dimensions = gl.getUniformLocation(program, 'dimensions');
        this.uMatrix = gl.getUniformLocation(program, 'uMatrix');

        // get and store the attributes
        this.aVertexPosition = gl.getAttribLocation(program, 'aVertexPosition');
        this.aPositionCoord = gl.getAttribLocation(program, 'aPositionCoord');

        this.aScale = gl.getAttribLocation(program, 'aScale');
        this.aRotation = gl.getAttribLocation(program, 'aRotation');

        this.aTextureCoord = gl.getAttribLocation(program, 'aTextureCoord');
        this.colorAttribute = gl.getAttribLocation(program, 'aColor');
       

       
        // Begin worst hack eva //

        // WHY??? ONLY on my chrome pixel the line above returns -1 when using filters?
        // maybe its somthing to do with the current state of the gl context.
        // Im convinced this is a bug in the chrome browser as there is NO reason why this should be returning -1 especially as it only manifests on my chrome pixel
        // If theres any webGL people that know why could happen please help :)
        if(this.colorAttribute === -1)
        {
            this.colorAttribute = 2;
        }

        this.attributes = [this.aVertexPosition, this.aPositionCoord,  this.aScale, this.aRotation, this.aTextureCoord, this.colorAttribute];
        
        // End worst hack eva //


        this.program = program;
    };

    /**
    * Destroys the shader
    * @method destroy
    *
    */
    PIXI.PixiFastShader.prototype.destroy = function()
    {
        this.gl.deleteProgram( this.program );
        this.uniforms = null;
        this.gl = null;

        this.attributes = null;
    };

    /**
     * @author Mat Groves http://matgroves.com/ @Doormat23
     */


    PIXI.StripShader = function(gl)
    {
        this._UID = PIXI._UID++;
        
        this.gl = gl;

        /**
        * @property {any} program - The WebGL program.
        */
        this.program = null;

        /**
         * @property {array} fragmentSrc - The fragment shader.
         */
        this.fragmentSrc = [
            'precision mediump float;',
            'varying vec2 vTextureCoord;',
         //   'varying float vColor;',
            'uniform float alpha;',
            'uniform sampler2D uSampler;',

            'void main(void) {',
            '   gl_FragColor = texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y));',
          //  '   gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);',//gl_FragColor * alpha;',
            '}'
        ];

         /**
        * @property {array} fragmentSrc - The fragment shader.
        */
        this.vertexSrc  = [
            'attribute vec2 aVertexPosition;',
            'attribute vec2 aTextureCoord;',
            'uniform mat3 translationMatrix;',
            'uniform vec2 projectionVector;',
            'uniform vec2 offsetVector;',
          //  'uniform float alpha;',
           // 'uniform vec3 tint;',
            'varying vec2 vTextureCoord;',
          //  'varying vec4 vColor;',

            'void main(void) {',
            '   vec3 v = translationMatrix * vec3(aVertexPosition , 1.0);',
            '   v -= offsetVector.xyx;',
            '   gl_Position = vec4( v.x / projectionVector.x -1.0, v.y / -projectionVector.y + 1.0 , 0.0, 1.0);',
            '   vTextureCoord = aTextureCoord;',
           // '   vColor = aColor * vec4(tint * alpha, alpha);',
            '}'
        ];

        this.init();
    };

    /**
    * Initialises the shader
    * @method init
    *
    */
    PIXI.StripShader.prototype.init = function()
    {
        var gl = this.gl;

        var program = PIXI.compileProgram(gl, this.vertexSrc, this.fragmentSrc);
        gl.useProgram(program);

        // get and store the uniforms for the shader
        this.uSampler = gl.getUniformLocation(program, 'uSampler');
        this.projectionVector = gl.getUniformLocation(program, 'projectionVector');
        this.offsetVector = gl.getUniformLocation(program, 'offsetVector');
        this.colorAttribute = gl.getAttribLocation(program, 'aColor');
        //this.dimensions = gl.getUniformLocation(this.program, 'dimensions');

        // get and store the attributes
        this.aVertexPosition = gl.getAttribLocation(program, 'aVertexPosition');
        this.aTextureCoord = gl.getAttribLocation(program, 'aTextureCoord');

        this.attributes = [this.aVertexPosition, this.aTextureCoord];

        this.translationMatrix = gl.getUniformLocation(program, 'translationMatrix');
        this.alpha = gl.getUniformLocation(program, 'alpha');

        this.program = program;
    };

    /**
     * @author Mat Groves http://matgroves.com/ @Doormat23
     */

    /**
    * @class PrimitiveShader
    * @constructor
    * @param gl {WebGLContext} the current WebGL drawing context
    */
    PIXI.PrimitiveShader = function(gl)
    {
        this._UID = PIXI._UID++;
     
        /**
         * @property gl
         * @type WebGLContext
         */
        this.gl = gl;

        /**
        * @property {any} program - The WebGL program.
        */
        this.program = null;

        /**
         * @property fragmentSrc
         * @type Array
         */
        this.fragmentSrc = [
            'precision mediump float;',
            'varying vec4 vColor;',

            'void main(void) {',
            '   gl_FragColor = vColor;',
            '}'
        ];

        /**
         * @property vertexSrc
         * @type Array
         */
        this.vertexSrc  = [
            'attribute vec2 aVertexPosition;',
            'attribute vec4 aColor;',
            'uniform mat3 translationMatrix;',
            'uniform vec2 projectionVector;',
            'uniform vec2 offsetVector;',
            'uniform float alpha;',
            'uniform vec3 tint;',
            'varying vec4 vColor;',

            'void main(void) {',
            '   vec3 v = translationMatrix * vec3(aVertexPosition , 1.0);',
            '   v -= offsetVector.xyx;',
            '   gl_Position = vec4( v.x / projectionVector.x -1.0, v.y / -projectionVector.y + 1.0 , 0.0, 1.0);',
            '   vColor = aColor * vec4(tint * alpha, alpha);',
            '}'
        ];

        this.init();
    };

    /**
    * Initialises the shader
    * @method init
    *
    */
    PIXI.PrimitiveShader.prototype.init = function()
    {

        var gl = this.gl;

        var program = PIXI.compileProgram(gl, this.vertexSrc, this.fragmentSrc);
        gl.useProgram(program);

        // get and store the uniforms for the shader
        this.projectionVector = gl.getUniformLocation(program, 'projectionVector');
        this.offsetVector = gl.getUniformLocation(program, 'offsetVector');
        this.tintColor = gl.getUniformLocation(program, 'tint');


        // get and store the attributes
        this.aVertexPosition = gl.getAttribLocation(program, 'aVertexPosition');
        this.colorAttribute = gl.getAttribLocation(program, 'aColor');

        this.attributes = [this.aVertexPosition, this.colorAttribute];

        this.translationMatrix = gl.getUniformLocation(program, 'translationMatrix');
        this.alpha = gl.getUniformLocation(program, 'alpha');

        this.program = program;
    };

    /**
    * Destroys the shader
    * @method destroy
    *
    */
    PIXI.PrimitiveShader.prototype.destroy = function()
    {
        this.gl.deleteProgram( this.program );
        this.uniforms = null;
        this.gl = null;

        this.attribute = null;
    };

    /**
     * @author Mat Groves http://matgroves.com/ @Doormat23
     */

    /**
    * @class ComplexPrimitiveShader
    * @constructor
    * @param gl {WebGLContext} the current WebGL drawing context
    */
    PIXI.ComplexPrimitiveShader = function(gl)
    {
        this._UID = PIXI._UID++;
        /**
         * @property gl
         * @type WebGLContext
         */
        this.gl = gl;

        /**
        * @property {any} program - The WebGL program.
        */
        this.program = null;

        /**
         * @property fragmentSrc
         * @type Array
         */
        this.fragmentSrc = [
            'precision mediump float;',
            


            'varying vec4 vColor;',

            'void main(void) {',
            '   gl_FragColor = vColor;',
            '}'
        ];

        /**
         * @property vertexSrc
         * @type Array
         */
        this.vertexSrc  = [
            'attribute vec2 aVertexPosition;',
            //'attribute vec4 aColor;',
            'uniform mat3 translationMatrix;',
            'uniform vec2 projectionVector;',
            'uniform vec2 offsetVector;',
            
            'uniform vec3 tint;',
            'uniform float alpha;',
            'uniform vec3 color;',

            'varying vec4 vColor;',

            'void main(void) {',
            '   vec3 v = translationMatrix * vec3(aVertexPosition , 1.0);',
            '   v -= offsetVector.xyx;',
            '   gl_Position = vec4( v.x / projectionVector.x -1.0, v.y / -projectionVector.y + 1.0 , 0.0, 1.0);',
            '   vColor = vec4(color * alpha * tint, alpha);',//" * vec4(tint * alpha, alpha);',
            '}'
        ];

        this.init();
    };

    /**
    * Initialises the shader
    * @method init
    *
    */
    PIXI.ComplexPrimitiveShader.prototype.init = function()
    {

        var gl = this.gl;

        var program = PIXI.compileProgram(gl, this.vertexSrc, this.fragmentSrc);
        gl.useProgram(program);

        // get and store the uniforms for the shader
        this.projectionVector = gl.getUniformLocation(program, 'projectionVector');
        this.offsetVector = gl.getUniformLocation(program, 'offsetVector');
        this.tintColor = gl.getUniformLocation(program, 'tint');
        this.color = gl.getUniformLocation(program, 'color');


        // get and store the attributes
        this.aVertexPosition = gl.getAttribLocation(program, 'aVertexPosition');
       // this.colorAttribute = gl.getAttribLocation(program, 'aColor');

        this.attributes = [this.aVertexPosition, this.colorAttribute];

        this.translationMatrix = gl.getUniformLocation(program, 'translationMatrix');
        this.alpha = gl.getUniformLocation(program, 'alpha');

        this.program = program;
    };

    /**
    * Destroys the shader
    * @method destroy
    *
    */
    PIXI.ComplexPrimitiveShader.prototype.destroy = function()
    {
        this.gl.deleteProgram( this.program );
        this.uniforms = null;
        this.gl = null;

        this.attribute = null;
    };

    /**
     * @author Mat Groves http://matgroves.com/ @Doormat23
     */

    /**
     * A set of functions used by the webGL renderer to draw the primitive graphics data
     *
     * @class WebGLGraphics
     * @private
     * @static
     */
    PIXI.WebGLGraphics = function()
    {

    };

    /**
     * Renders the graphics object
     *
     * @static
     * @private
     * @method renderGraphics
     * @param graphics {Graphics}
     * @param renderSession {Object}
     */
    PIXI.WebGLGraphics.renderGraphics = function(graphics, renderSession)//projection, offset)
    {
        var gl = renderSession.gl;
        var projection = renderSession.projection,
            offset = renderSession.offset,
            shader = renderSession.shaderManager.primitiveShader,
            webGLData;

        if(graphics.dirty)
        {
            PIXI.WebGLGraphics.updateGraphics(graphics, gl);
        }

        var webGL = graphics._webGL[gl.id];

        // This  could be speeded up for sure!

        for (var i = 0; i < webGL.data.length; i++)
        {
            if(webGL.data[i].mode === 1)
            {
                webGLData = webGL.data[i];

                renderSession.stencilManager.pushStencil(graphics, webGLData, renderSession);

                // render quad..
                gl.drawElements(gl.TRIANGLE_FAN, 4, gl.UNSIGNED_SHORT, ( webGLData.indices.length - 4 ) * 2 );
                
                renderSession.stencilManager.popStencil(graphics, webGLData, renderSession);
                
                this.last = webGLData.mode;
            }
            else
            {
                webGLData = webGL.data[i];
               

                renderSession.shaderManager.setShader( shader );//activatePrimitiveShader();
                shader = renderSession.shaderManager.primitiveShader;
                gl.uniformMatrix3fv(shader.translationMatrix, false, graphics.worldTransform.toArray(true));

                gl.uniform2f(shader.projectionVector, projection.x, -projection.y);
                gl.uniform2f(shader.offsetVector, -offset.x, -offset.y);

                gl.uniform3fv(shader.tintColor, PIXI.hex2rgb(graphics.tint));

                gl.uniform1f(shader.alpha, graphics.worldAlpha);
                

                gl.bindBuffer(gl.ARRAY_BUFFER, webGLData.buffer);

                gl.vertexAttribPointer(shader.aVertexPosition, 2, gl.FLOAT, false, 4 * 6, 0);
                gl.vertexAttribPointer(shader.colorAttribute, 4, gl.FLOAT, false,4 * 6, 2 * 4);

                // set the index buffer!
                gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, webGLData.indexBuffer);
                gl.drawElements(gl.TRIANGLE_STRIP,  webGLData.indices.length, gl.UNSIGNED_SHORT, 0 );
            }
        }
    };

    /**
     * Updates the graphics object
     *
     * @static
     * @private
     * @method updateGraphics
     * @param graphicsData {Graphics} The graphics object to update
     * @param gl {WebGLContext} the current WebGL drawing context
     */
    PIXI.WebGLGraphics.updateGraphics = function(graphics, gl)
    {
        // get the contexts graphics object
        var webGL = graphics._webGL[gl.id];
        // if the graphics object does not exist in the webGL context time to create it!
        if(!webGL)webGL = graphics._webGL[gl.id] = {lastIndex:0, data:[], gl:gl};

        // flag the graphics as not dirty as we are about to update it...
        graphics.dirty = false;

        var i;

        // if the user cleared the graphics object we will need to clear every object
        if(graphics.clearDirty)
        {
            graphics.clearDirty = false;

            // lop through and return all the webGLDatas to the object pool so than can be reused later on
            for (i = 0; i < webGL.data.length; i++)
            {
                var graphicsData = webGL.data[i];
                graphicsData.reset();
                PIXI.WebGLGraphics.graphicsDataPool.push( graphicsData );
            }

            // clear the array and reset the index.. 
            webGL.data = [];
            webGL.lastIndex = 0;
        }

        
        var webGLData;
        
        // loop through the graphics datas and construct each one..
        // if the object is a complex fill then the new stencil buffer technique will be used
        // other wise graphics objects will be pushed into a batch..
        for (i = webGL.lastIndex; i < graphics.graphicsData.length; i++)
        {
            var data = graphics.graphicsData[i];

            if(data.type === PIXI.Graphics.POLY)
            {
                // MAKE SURE WE HAVE THE CORRECT TYPE..
                if(data.fill)
                {
                    if(data.points.length > 6)
                    {
                        if(data.points.length > 5 * 2)
                        {
                            webGLData = PIXI.WebGLGraphics.switchMode(webGL, 1);
                            PIXI.WebGLGraphics.buildComplexPoly(data, webGLData);
                        }
                        else
                        {
                            webGLData = PIXI.WebGLGraphics.switchMode(webGL, 0);
                            PIXI.WebGLGraphics.buildPoly(data, webGLData);
                        }
                    }
                }

                if(data.lineWidth > 0)
                {
                    webGLData = PIXI.WebGLGraphics.switchMode(webGL, 0);
                    PIXI.WebGLGraphics.buildLine(data, webGLData);

                }
            }
            else
            {
                webGLData = PIXI.WebGLGraphics.switchMode(webGL, 0);
                
                if(data.type === PIXI.Graphics.RECT)
                {
                    PIXI.WebGLGraphics.buildRectangle(data, webGLData);
                }
                else if(data.type === PIXI.Graphics.CIRC || data.type === PIXI.Graphics.ELIP)
                {
                    PIXI.WebGLGraphics.buildCircle(data, webGLData);
                }
                else if(data.type === PIXI.Graphics.RREC)
                {
                    PIXI.WebGLGraphics.buildRoundedRectangle(data, webGLData);
                }
            }


            webGL.lastIndex++;
        }

        // upload all the dirty data...
        for (i = 0; i < webGL.data.length; i++)
        {
            webGLData = webGL.data[i];
            if(webGLData.dirty)webGLData.upload();
        }
    };


    PIXI.WebGLGraphics.switchMode = function(webGL, type)
    {
        var webGLData;

        if(!webGL.data.length)
        {
            webGLData = PIXI.WebGLGraphics.graphicsDataPool.pop() || new PIXI.WebGLGraphicsData(webGL.gl);
            webGLData.mode = type;
            webGL.data.push(webGLData);
        }
        else
        {
            webGLData = webGL.data[webGL.data.length-1];

            if(webGLData.mode !== type || type === 1)
            {
                webGLData = PIXI.WebGLGraphics.graphicsDataPool.pop() || new PIXI.WebGLGraphicsData(webGL.gl);
                webGLData.mode = type;
                webGL.data.push(webGLData);
            }
        }

        webGLData.dirty = true;

        return webGLData;
    };

    /**
     * Builds a rectangle to draw
     *
     * @static
     * @private
     * @method buildRectangle
     * @param graphicsData {Graphics} The graphics object containing all the necessary properties
     * @param webGLData {Object}
     */
    PIXI.WebGLGraphics.buildRectangle = function(graphicsData, webGLData)
    {
        // --- //
        // need to convert points to a nice regular data
        //
        var rectData = graphicsData.points;
        var x = rectData[0];
        var y = rectData[1];
        var width = rectData[2];
        var height = rectData[3];


        if(graphicsData.fill)
        {
            var color = PIXI.hex2rgb(graphicsData.fillColor);
            var alpha = graphicsData.fillAlpha;

            var r = color[0] * alpha;
            var g = color[1] * alpha;
            var b = color[2] * alpha;

            var verts = webGLData.points;
            var indices = webGLData.indices;

            var vertPos = verts.length/6;

            // start
            verts.push(x, y);
            verts.push(r, g, b, alpha);

            verts.push(x + width, y);
            verts.push(r, g, b, alpha);

            verts.push(x , y + height);
            verts.push(r, g, b, alpha);

            verts.push(x + width, y + height);
            verts.push(r, g, b, alpha);

            // insert 2 dead triangles..
            indices.push(vertPos, vertPos, vertPos+1, vertPos+2, vertPos+3, vertPos+3);
        }

        if(graphicsData.lineWidth)
        {
            var tempPoints = graphicsData.points;

            graphicsData.points = [x, y,
                      x + width, y,
                      x + width, y + height,
                      x, y + height,
                      x, y];


            PIXI.WebGLGraphics.buildLine(graphicsData, webGLData);

            graphicsData.points = tempPoints;
        }
    };

    /**
     * Builds a rounded rectangle to draw
     *
     * @static
     * @private
     * @method buildRoundedRectangle
     * @param graphicsData {Graphics} The graphics object containing all the necessary properties
     * @param webGLData {Object}
     */
    PIXI.WebGLGraphics.buildRoundedRectangle = function(graphicsData, webGLData)
    {

        var points = graphicsData.points;
        var x = points[0];
        var y = points[1];
        var width = points[2];
        var height = points[3];
        var radius = points[4];


        var recPoints = [];
        recPoints.push(x, y + radius);
        recPoints = recPoints.concat(PIXI.WebGLGraphics.quadraticBezierCurve(x, y + height - radius, x, y + height, x + radius, y + height));
        recPoints = recPoints.concat(PIXI.WebGLGraphics.quadraticBezierCurve(x + width - radius, y + height, x + width, y + height, x + width, y + height - radius));
        recPoints = recPoints.concat(PIXI.WebGLGraphics.quadraticBezierCurve(x + width, y + radius, x + width, y, x + width - radius, y));
        recPoints = recPoints.concat(PIXI.WebGLGraphics.quadraticBezierCurve(x + radius, y, x, y, x, y + radius));


        if (graphicsData.fill) {
            var color = PIXI.hex2rgb(graphicsData.fillColor);
            var alpha = graphicsData.fillAlpha;

            var r = color[0] * alpha;
            var g = color[1] * alpha;
            var b = color[2] * alpha;

            var verts = webGLData.points;
            var indices = webGLData.indices;

            var vecPos = verts.length/6;

            var triangles = PIXI.PolyK.Triangulate(recPoints);

            var i = 0;
            for (i = 0; i < triangles.length; i+=3)
            {
                indices.push(triangles[i] + vecPos);
                indices.push(triangles[i] + vecPos);
                indices.push(triangles[i+1] + vecPos);
                indices.push(triangles[i+2] + vecPos);
                indices.push(triangles[i+2] + vecPos);
            }

            for (i = 0; i < recPoints.length; i++)
            {
                verts.push(recPoints[i], recPoints[++i], r, g, b, alpha);
            }
        }

        if (graphicsData.lineWidth) {
            var tempPoints = graphicsData.points;

            graphicsData.points = recPoints;

            PIXI.WebGLGraphics.buildLine(graphicsData, webGLData);

            graphicsData.points = tempPoints;
        }
    };

    /**
     * Calcul the points for a quadratic bezier curve. (helper function..)
     * Based on : https://stackoverflow.com/questions/785097/how-do-i-implement-a-bezier-curve-in-c
     *
     * @param  {number}   fromX Origin point x
     * @param  {number}   fromY Origin point x
     * @param  {number}   cpX   Control point x
     * @param  {number}   cpY   Control point y
     * @param  {number}   toX   Destination point x
     * @param  {number}   toY   Destination point y
     * @return {number[]}
     */
    PIXI.WebGLGraphics.quadraticBezierCurve = function(fromX, fromY, cpX, cpY, toX, toY) {
        var xa,
            ya,
            xb,
            yb,
            x,
            y,
            n = 20,
            points = [];

        function getPt(n1 , n2, perc) {
            var diff = n2 - n1;

            return n1 + ( diff * perc );
        }

        var j = 0;
        for (var i = 0; i <= n; i++ )
        {
            j = i / n;

            // The Green Line
            xa = getPt( fromX , cpX , j );
            ya = getPt( fromY , cpY , j );
            xb = getPt( cpX , toX , j );
            yb = getPt( cpY , toY , j );

            // The Black Dot
            x = getPt( xa , xb , j );
            y = getPt( ya , yb , j );

            points.push(x, y);
        }
        return points;
    };

    /**
     * Builds a circle to draw
     *
     * @static
     * @private
     * @method buildCircle
     * @param graphicsData {Graphics} The graphics object to draw
     * @param webGLData {Object}
     */
    PIXI.WebGLGraphics.buildCircle = function(graphicsData, webGLData)
    {
        
        // need to convert points to a nice regular data
        var rectData = graphicsData.points;
        var x = rectData[0];
        var y = rectData[1];
        var width = rectData[2];
        var height = rectData[3];

        var totalSegs = 40;
        var seg = (Math.PI * 2) / totalSegs ;

        var i = 0;

        if(graphicsData.fill)
        {
            var color = PIXI.hex2rgb(graphicsData.fillColor);
            var alpha = graphicsData.fillAlpha;

            var r = color[0] * alpha;
            var g = color[1] * alpha;
            var b = color[2] * alpha;

            var verts = webGLData.points;
            var indices = webGLData.indices;

            var vecPos = verts.length/6;

            indices.push(vecPos);

            for (i = 0; i < totalSegs + 1 ; i++)
            {
                verts.push(x,y, r, g, b, alpha);

                verts.push(x + Math.sin(seg * i) * width,
                           y + Math.cos(seg * i) * height,
                           r, g, b, alpha);

                indices.push(vecPos++, vecPos++);
            }

            indices.push(vecPos-1);
        }

        if(graphicsData.lineWidth)
        {
            var tempPoints = graphicsData.points;

            graphicsData.points = [];

            for (i = 0; i < totalSegs + 1; i++)
            {
                graphicsData.points.push(x + Math.sin(seg * i) * width,
                                         y + Math.cos(seg * i) * height);
            }

            PIXI.WebGLGraphics.buildLine(graphicsData, webGLData);

            graphicsData.points = tempPoints;
        }
    };

    /**
     * Builds a line to draw
     *
     * @static
     * @private
     * @method buildLine
     * @param graphicsData {Graphics} The graphics object containing all the necessary properties
     * @param webGLData {Object}
     */
    PIXI.WebGLGraphics.buildLine = function(graphicsData, webGLData)
    {
        // TODO OPTIMISE!
        var i = 0;

        var points = graphicsData.points;
        if(points.length === 0)return;

        // if the line width is an odd number add 0.5 to align to a whole pixel
        if(graphicsData.lineWidth%2)
        {
            for (i = 0; i < points.length; i++) {
                points[i] += 0.5;
            }
        }

        // get first and last point.. figure out the middle!
        var firstPoint = new PIXI.Point( points[0], points[1] );
        var lastPoint = new PIXI.Point( points[points.length - 2], points[points.length - 1] );

        // if the first point is the last point - gonna have issues :)
        if(firstPoint.x === lastPoint.x && firstPoint.y === lastPoint.y)
        {
            // need to clone as we are going to slightly modify the shape..
            points = points.slice();

            points.pop();
            points.pop();

            lastPoint = new PIXI.Point( points[points.length - 2], points[points.length - 1] );

            var midPointX = lastPoint.x + (firstPoint.x - lastPoint.x) *0.5;
            var midPointY = lastPoint.y + (firstPoint.y - lastPoint.y) *0.5;

            points.unshift(midPointX, midPointY);
            points.push(midPointX, midPointY);
        }

        var verts = webGLData.points;
        var indices = webGLData.indices;
        var length = points.length / 2;
        var indexCount = points.length;
        var indexStart = verts.length/6;

        // DRAW the Line
        var width = graphicsData.lineWidth / 2;

        // sort color
        var color = PIXI.hex2rgb(graphicsData.lineColor);
        var alpha = graphicsData.lineAlpha;
        var r = color[0] * alpha;
        var g = color[1] * alpha;
        var b = color[2] * alpha;

        var px, py, p1x, p1y, p2x, p2y, p3x, p3y;
        var perpx, perpy, perp2x, perp2y, perp3x, perp3y;
        var a1, b1, c1, a2, b2, c2;
        var denom, pdist, dist;

        p1x = points[0];
        p1y = points[1];

        p2x = points[2];
        p2y = points[3];

        perpx = -(p1y - p2y);
        perpy =  p1x - p2x;

        dist = Math.sqrt(perpx*perpx + perpy*perpy);

        perpx /= dist;
        perpy /= dist;
        perpx *= width;
        perpy *= width;

        // start
        verts.push(p1x - perpx , p1y - perpy,
                    r, g, b, alpha);

        verts.push(p1x + perpx , p1y + perpy,
                    r, g, b, alpha);

        for (i = 1; i < length-1; i++)
        {
            p1x = points[(i-1)*2];
            p1y = points[(i-1)*2 + 1];

            p2x = points[(i)*2];
            p2y = points[(i)*2 + 1];

            p3x = points[(i+1)*2];
            p3y = points[(i+1)*2 + 1];

            perpx = -(p1y - p2y);
            perpy = p1x - p2x;

            dist = Math.sqrt(perpx*perpx + perpy*perpy);
            perpx /= dist;
            perpy /= dist;
            perpx *= width;
            perpy *= width;

            perp2x = -(p2y - p3y);
            perp2y = p2x - p3x;

            dist = Math.sqrt(perp2x*perp2x + perp2y*perp2y);
            perp2x /= dist;
            perp2y /= dist;
            perp2x *= width;
            perp2y *= width;

            a1 = (-perpy + p1y) - (-perpy + p2y);
            b1 = (-perpx + p2x) - (-perpx + p1x);
            c1 = (-perpx + p1x) * (-perpy + p2y) - (-perpx + p2x) * (-perpy + p1y);
            a2 = (-perp2y + p3y) - (-perp2y + p2y);
            b2 = (-perp2x + p2x) - (-perp2x + p3x);
            c2 = (-perp2x + p3x) * (-perp2y + p2y) - (-perp2x + p2x) * (-perp2y + p3y);

            denom = a1*b2 - a2*b1;

            if(Math.abs(denom) < 0.1 )
            {

                denom+=10.1;
                verts.push(p2x - perpx , p2y - perpy,
                    r, g, b, alpha);

                verts.push(p2x + perpx , p2y + perpy,
                    r, g, b, alpha);

                continue;
            }

            px = (b1*c2 - b2*c1)/denom;
            py = (a2*c1 - a1*c2)/denom;


            pdist = (px -p2x) * (px -p2x) + (py -p2y) + (py -p2y);


            if(pdist > 140 * 140)
            {
                perp3x = perpx - perp2x;
                perp3y = perpy - perp2y;

                dist = Math.sqrt(perp3x*perp3x + perp3y*perp3y);
                perp3x /= dist;
                perp3y /= dist;
                perp3x *= width;
                perp3y *= width;

                verts.push(p2x - perp3x, p2y -perp3y);
                verts.push(r, g, b, alpha);

                verts.push(p2x + perp3x, p2y +perp3y);
                verts.push(r, g, b, alpha);

                verts.push(p2x - perp3x, p2y -perp3y);
                verts.push(r, g, b, alpha);

                indexCount++;
            }
            else
            {

                verts.push(px , py);
                verts.push(r, g, b, alpha);

                verts.push(p2x - (px-p2x), p2y - (py - p2y));
                verts.push(r, g, b, alpha);
            }
        }

        p1x = points[(length-2)*2];
        p1y = points[(length-2)*2 + 1];

        p2x = points[(length-1)*2];
        p2y = points[(length-1)*2 + 1];

        perpx = -(p1y - p2y);
        perpy = p1x - p2x;

        dist = Math.sqrt(perpx*perpx + perpy*perpy);
        perpx /= dist;
        perpy /= dist;
        perpx *= width;
        perpy *= width;

        verts.push(p2x - perpx , p2y - perpy);
        verts.push(r, g, b, alpha);

        verts.push(p2x + perpx , p2y + perpy);
        verts.push(r, g, b, alpha);

        indices.push(indexStart);

        for (i = 0; i < indexCount; i++)
        {
            indices.push(indexStart++);
        }

        indices.push(indexStart-1);
    };

    /**
     * Builds a complex polygon to draw
     *
     * @static
     * @private
     * @method buildPoly
     * @param graphicsData {Graphics} The graphics object containing all the necessary properties
     * @param webGLData {Object}
     */
    PIXI.WebGLGraphics.buildComplexPoly = function(graphicsData, webGLData)
    {

        //TODO - no need to copy this as it gets turned into a FLoat32Array anyways..
        var points = graphicsData.points.slice();
        if(points.length < 6)return;

        // get first and last point.. figure out the middle!
        var indices = webGLData.indices;
        webGLData.points = points;
        webGLData.alpha = graphicsData.fillAlpha;
        webGLData.color = PIXI.hex2rgb(graphicsData.fillColor);

        /*
            calclate the bounds..
        */
        var minX = Infinity;
        var maxX = -Infinity;

        var minY = Infinity;
        var maxY = -Infinity;

        var x,y;

        // get size..
        for (var i = 0; i < points.length; i+=2)
        {
            x = points[i];
            y = points[i+1];

            minX = x < minX ? x : minX;
            maxX = x > maxX ? x : maxX;

            minY = y < minY ? y : minY;
            maxY = y > maxY ? y : maxY;
        }

        // add a quad to the end cos there is no point making another buffer!
        points.push(minX, minY,
                    maxX, minY,
                    maxX, maxY,
                    minX, maxY);

        // push a quad onto the end.. 
        
        //TODO - this aint needed!
        var length = points.length / 2;
        for (i = 0; i < length; i++)
        {
            indices.push( i );
        }

    };

    PIXI.WebGLGraphics.buildPoly = function(graphicsData, webGLData)
    {
        var points = graphicsData.points;
        if(points.length < 6)return;

        // get first and last point.. figure out the middle!
        var verts = webGLData.points;
        var indices = webGLData.indices;

        var length = points.length / 2;

        // sort color
        var color = PIXI.hex2rgb(graphicsData.fillColor);
        var alpha = graphicsData.fillAlpha;
        var r = color[0] * alpha;
        var g = color[1] * alpha;
        var b = color[2] * alpha;

        var triangles = PIXI.PolyK.Triangulate(points);
        var vertPos = verts.length / 6;

        var i = 0;

        for (i = 0; i < triangles.length; i+=3)
        {
            indices.push(triangles[i] + vertPos);
            indices.push(triangles[i] + vertPos);
            indices.push(triangles[i+1] + vertPos);
            indices.push(triangles[i+2] +vertPos);
            indices.push(triangles[i+2] + vertPos);
        }

        for (i = 0; i < length; i++)
        {
            verts.push(points[i * 2], points[i * 2 + 1],
                       r, g, b, alpha);
        }

    };

    PIXI.WebGLGraphics.graphicsDataPool = [];

    PIXI.WebGLGraphicsData = function(gl)
    {
        this.gl = gl;

        //TODO does this need to be split before uploding??
        this.color = [0,0,0]; // color split!
        this.points = [];
        this.indices = [];
        this.lastIndex = 0;
        this.buffer = gl.createBuffer();
        this.indexBuffer = gl.createBuffer();
        this.mode = 1;
        this.alpha = 1;
        this.dirty = true;
    };

    PIXI.WebGLGraphicsData.prototype.reset = function()
    {
        this.points = [];
        this.indices = [];
        this.lastIndex = 0;
    };

    PIXI.WebGLGraphicsData.prototype.upload = function()
    {
        var gl = this.gl;

    //    this.lastIndex = graphics.graphicsData.length;
        this.glPoints = new Float32Array(this.points);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
        gl.bufferData(gl.ARRAY_BUFFER, this.glPoints, gl.STATIC_DRAW);

        this.glIndicies = new Uint16Array(this.indices);

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.glIndicies, gl.STATIC_DRAW);

        this.dirty = false;
    };

    /**
     * @author Mat Groves http://matgroves.com/ @Doormat23
     */

    PIXI.glContexts = []; // this is where we store the webGL contexts for easy access.

    /**
     * the WebGLRenderer draws the stage and all its content onto a webGL enabled canvas. This renderer
     * should be used for browsers that support webGL. This Render works by automatically managing webGLBatch's.
     * So no need for Sprite Batch's or Sprite Cloud's
     * Dont forget to add the view to your DOM or you will not see anything :)
     *
     * @class WebGLRenderer
     * @constructor
     * @param width=0 {Number} the width of the canvas view
     * @param height=0 {Number} the height of the canvas view
     * @param view {HTMLCanvasElement} the canvas to use as a view, optional
     * @param transparent=false {Boolean} If the render view is transparent, default false
     * @param antialias=false {Boolean} sets antialias (only applicable in chrome at the moment)
     * @param preserveDrawingBuffer=false {Boolean} enables drawing buffer preservation, enable this if you need to call toDataUrl on the webgl context
     *
     */
    PIXI.WebGLRenderer = function(width, height, view, transparent, antialias, preserveDrawingBuffer)
    {
        if(!PIXI.defaultRenderer)
        {
            PIXI.sayHello('webGL');
            PIXI.defaultRenderer = this;
        }

        this.type = PIXI.WEBGL_RENDERER;

        // do a catch.. only 1 webGL renderer..
        /**
         * Whether the render view is transparent
         *
         * @property transparent
         * @type Boolean
         */
        this.transparent = !!transparent;

        /**
         * The value of the preserveDrawingBuffer flag affects whether or not the contents of the stencil buffer is retained after rendering.
         *
         * @property preserveDrawingBuffer
         * @type Boolean
         */
        this.preserveDrawingBuffer = preserveDrawingBuffer;

        /**
         * The width of the canvas view
         *
         * @property width
         * @type Number
         * @default 800
         */
        this.width = width || 800;

        /**
         * The height of the canvas view
         *
         * @property height
         * @type Number
         * @default 600
         */
        this.height = height || 600;

        /**
         * The canvas element that everything is drawn to
         *
         * @property view
         * @type HTMLCanvasElement
         */
        this.view = view || document.createElement( 'canvas' );
        this.view.width = this.width;
        this.view.height = this.height;

        // deal with losing context..
        this.contextLost = this.handleContextLost.bind(this);
        this.contextRestoredLost = this.handleContextRestored.bind(this);
        
        this.view.addEventListener('webglcontextlost', this.contextLost, false);
        this.view.addEventListener('webglcontextrestored', this.contextRestoredLost, false);

        this.options = {
            alpha: this.transparent,
            antialias:!!antialias, // SPEED UP??
            premultipliedAlpha:!!transparent,
            stencil:true,
            preserveDrawingBuffer: preserveDrawingBuffer
        };

        var gl = null;

        ['experimental-webgl', 'webgl'].forEach(function(name) {
            try {
                gl = gl || this.view.getContext(name,  this.options);
            } catch(e) {}
        }, this);

        if (!gl) {
            // fail, not able to get a context
            throw new Error('This browser does not support webGL. Try using the canvas renderer' + this);
        }

        this.gl = gl;
        this.glContextId = gl.id = PIXI.WebGLRenderer.glContextId ++;

        PIXI.glContexts[this.glContextId] = gl;

        if(!PIXI.blendModesWebGL)
        {
            PIXI.blendModesWebGL = [];

            PIXI.blendModesWebGL[PIXI.blendModes.NORMAL]        = [gl.ONE,       gl.ONE_MINUS_SRC_ALPHA];
            PIXI.blendModesWebGL[PIXI.blendModes.ADD]           = [gl.SRC_ALPHA, gl.DST_ALPHA];
            PIXI.blendModesWebGL[PIXI.blendModes.MULTIPLY]      = [gl.DST_COLOR, gl.ONE_MINUS_SRC_ALPHA];
            PIXI.blendModesWebGL[PIXI.blendModes.SCREEN]        = [gl.SRC_ALPHA, gl.ONE];
            PIXI.blendModesWebGL[PIXI.blendModes.OVERLAY]       = [gl.ONE,       gl.ONE_MINUS_SRC_ALPHA];
            PIXI.blendModesWebGL[PIXI.blendModes.DARKEN]        = [gl.ONE,       gl.ONE_MINUS_SRC_ALPHA];
            PIXI.blendModesWebGL[PIXI.blendModes.LIGHTEN]       = [gl.ONE,       gl.ONE_MINUS_SRC_ALPHA];
            PIXI.blendModesWebGL[PIXI.blendModes.COLOR_DODGE]   = [gl.ONE,       gl.ONE_MINUS_SRC_ALPHA];
            PIXI.blendModesWebGL[PIXI.blendModes.COLOR_BURN]    = [gl.ONE,       gl.ONE_MINUS_SRC_ALPHA];
            PIXI.blendModesWebGL[PIXI.blendModes.HARD_LIGHT]    = [gl.ONE,       gl.ONE_MINUS_SRC_ALPHA];
            PIXI.blendModesWebGL[PIXI.blendModes.SOFT_LIGHT]    = [gl.ONE,       gl.ONE_MINUS_SRC_ALPHA];
            PIXI.blendModesWebGL[PIXI.blendModes.DIFFERENCE]    = [gl.ONE,       gl.ONE_MINUS_SRC_ALPHA];
            PIXI.blendModesWebGL[PIXI.blendModes.EXCLUSION]     = [gl.ONE,       gl.ONE_MINUS_SRC_ALPHA];
            PIXI.blendModesWebGL[PIXI.blendModes.HUE]           = [gl.ONE,       gl.ONE_MINUS_SRC_ALPHA];
            PIXI.blendModesWebGL[PIXI.blendModes.SATURATION]    = [gl.ONE,       gl.ONE_MINUS_SRC_ALPHA];
            PIXI.blendModesWebGL[PIXI.blendModes.COLOR]         = [gl.ONE,       gl.ONE_MINUS_SRC_ALPHA];
            PIXI.blendModesWebGL[PIXI.blendModes.LUMINOSITY]    = [gl.ONE,       gl.ONE_MINUS_SRC_ALPHA];
        }




        this.projection = new PIXI.Point();
        this.projection.x =  this.width/2;
        this.projection.y =  -this.height/2;

        this.offset = new PIXI.Point(0, 0);

        this.resize(this.width, this.height);
        this.contextLost = false;

        // time to create the render managers! each one focuses on managine a state in webGL
        this.shaderManager = new PIXI.WebGLShaderManager(gl);                   // deals with managing the shader programs and their attribs
        this.spriteBatch = new PIXI.WebGLSpriteBatch(gl);                       // manages the rendering of sprites
        //this.primitiveBatch = new PIXI.WebGLPrimitiveBatch(gl);               // primitive batch renderer
        this.maskManager = new PIXI.WebGLMaskManager(gl);                       // manages the masks using the stencil buffer
        this.filterManager = new PIXI.WebGLFilterManager(gl, this.transparent); // manages the filters
        this.stencilManager = new PIXI.WebGLStencilManager(gl);
        this.blendModeManager = new PIXI.WebGLBlendModeManager(gl);

        this.renderSession = {};
        this.renderSession.gl = this.gl;
        this.renderSession.drawCount = 0;
        this.renderSession.shaderManager = this.shaderManager;
        this.renderSession.maskManager = this.maskManager;
        this.renderSession.filterManager = this.filterManager;
        this.renderSession.blendModeManager = this.blendModeManager;
       // this.renderSession.primitiveBatch = this.primitiveBatch;
        this.renderSession.spriteBatch = this.spriteBatch;
        this.renderSession.stencilManager = this.stencilManager;
        this.renderSession.renderer = this;

        gl.useProgram(this.shaderManager.defaultShader.program);

        gl.disable(gl.DEPTH_TEST);
        gl.disable(gl.CULL_FACE);

        gl.enable(gl.BLEND);
        gl.colorMask(true, true, true, this.transparent);
    };

    // constructor
    PIXI.WebGLRenderer.prototype.constructor = PIXI.WebGLRenderer;

    /**
     * Renders the stage to its webGL view
     *
     * @method render
     * @param stage {Stage} the Stage element to be rendered
     */
    PIXI.WebGLRenderer.prototype.render = function(stage)
    {
        if(this.contextLost)return;


        // if rendering a new stage clear the batches..
        if(this.__stage !== stage)
        {
            if(stage.interactive)stage.interactionManager.removeEvents();

            // TODO make this work
            // dont think this is needed any more?
            this.__stage = stage;
        }

        // update any textures this includes uvs and uploading them to the gpu
        PIXI.WebGLRenderer.updateTextures();

        // update the scene graph
        stage.updateTransform();


        // interaction
        if(stage._interactive)
        {
            //need to add some events!
            if(!stage._interactiveEventsAdded)
            {
                stage._interactiveEventsAdded = true;
                stage.interactionManager.setTarget(this);
            }
        }
        
        var gl = this.gl;

        // -- Does this need to be set every frame? -- //
        //gl.colorMask(true, true, true, this.transparent);
        gl.viewport(0, 0, this.width, this.height);

        // make sure we are bound to the main frame buffer
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);

        if(this.transparent)
        {
            gl.clearColor(0, 0, 0, 0);
        }
        else
        {
            gl.clearColor(stage.backgroundColorSplit[0],stage.backgroundColorSplit[1],stage.backgroundColorSplit[2], 1);
        }


        gl.clear(gl.COLOR_BUFFER_BIT);

        this.renderDisplayObject( stage, this.projection );

        // interaction
        if(stage.interactive)
        {
            //need to add some events!
            if(!stage._interactiveEventsAdded)
            {
                stage._interactiveEventsAdded = true;
                stage.interactionManager.setTarget(this);
            }
        }
        else
        {
            if(stage._interactiveEventsAdded)
            {
                stage._interactiveEventsAdded = false;
                stage.interactionManager.setTarget(this);
            }
        }

        /*
        //can simulate context loss in Chrome like so:
         this.view.onmousedown = function(ev) {
         console.dir(this.gl.getSupportedExtensions());
            var ext = (
                gl.getExtension("WEBGL_scompressed_texture_s3tc")
           // gl.getExtension("WEBGL_compressed_texture_s3tc") ||
           // gl.getExtension("MOZ_WEBGL_compressed_texture_s3tc") ||
           // gl.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc")
         );
         console.dir(ext);
         var loseCtx = this.gl.getExtension("WEBGL_lose_context");
          console.log("killing context");
          loseCtx.loseContext();
         setTimeout(function() {
              console.log("restoring context...");
              loseCtx.restoreContext();
          }.bind(this), 1000);
         }.bind(this);
         */
    };

    /**
     * Renders a display Object
     *
     * @method renderDIsplayObject
     * @param displayObject {DisplayObject} The DisplayObject to render
     * @param projection {Point} The projection
     * @param buffer {Array} a standard WebGL buffer 
     */
    PIXI.WebGLRenderer.prototype.renderDisplayObject = function(displayObject, projection, buffer)
    {
        this.renderSession.blendModeManager.setBlendMode(PIXI.blendModes.NORMAL);
        // reset the render session data..
        this.renderSession.drawCount = 0;
        this.renderSession.currentBlendMode = 9999;

        this.renderSession.projection = projection;
        this.renderSession.offset = this.offset;

        // start the sprite batch
        this.spriteBatch.begin(this.renderSession);

    //    this.primitiveBatch.begin(this.renderSession);

        // start the filter manager
        this.filterManager.begin(this.renderSession, buffer);

        // render the scene!
        displayObject._renderWebGL(this.renderSession);

        // finish the sprite batch
        this.spriteBatch.end();

    //    this.primitiveBatch.end();
    };

    /**
     * Updates the textures loaded into this webgl renderer
     *
     * @static
     * @method updateTextures
     * @private
     */
    PIXI.WebGLRenderer.updateTextures = function()
    {
        var i = 0;

        //TODO break this out into a texture manager...
      //  for (i = 0; i < PIXI.texturesToUpdate.length; i++)
      //      PIXI..updateWebGLTexture(PIXI.texturesToUpdate[i], this.gl);


        for (i=0; i < PIXI.Texture.frameUpdates.length; i++)
            PIXI.WebGLRenderer.updateTextureFrame(PIXI.Texture.frameUpdates[i]);

        for (i = 0; i < PIXI.texturesToDestroy.length; i++)
            PIXI.WebGLRenderer.destroyTexture(PIXI.texturesToDestroy[i]);

        PIXI.texturesToUpdate.length = 0;
        PIXI.texturesToDestroy.length = 0;
        PIXI.Texture.frameUpdates.length = 0;
    };

    /**
     * Destroys a loaded webgl texture
     *
     * @method destroyTexture
     * @param texture {Texture} The texture to update
     * @private
     */
    PIXI.WebGLRenderer.destroyTexture = function(texture)
    {
        //TODO break this out into a texture manager...

        for (var i = texture._glTextures.length - 1; i >= 0; i--)
        {
            var glTexture = texture._glTextures[i];
            var gl = PIXI.glContexts[i];

            if(gl && glTexture)
            {
                gl.deleteTexture(glTexture);
            }
        }

        texture._glTextures.length = 0;
    };

    /**
     *
     * @method updateTextureFrame
     * @param texture {Texture} The texture to update the frame from
     * @private
     */
    PIXI.WebGLRenderer.updateTextureFrame = function(texture)
    {
        //texture.updateFrame = false;

        // now set the uvs. Figured that the uv data sits with a texture rather than a sprite.
        // so uv data is stored on the texture itself
        texture._updateWebGLuvs();
    };

    /**
     * resizes the webGL view to the specified width and height
     *
     * @method resize
     * @param width {Number} the new width of the webGL view
     * @param height {Number} the new height of the webGL view
     */
    PIXI.WebGLRenderer.prototype.resize = function(width, height)
    {
        this.width = width;
        this.height = height;

        this.view.width = width;
        this.view.height = height;

        this.gl.viewport(0, 0, this.width, this.height);

        this.projection.x =  this.width/2;
        this.projection.y =  -this.height/2;
    };

    /**
     * Creates a WebGL texture
     *
     * @method createWebGLTexture
     * @param texture {Texture} the texture to render
     * @param gl {webglContext} the WebGL context
     * @static
     */
    PIXI.createWebGLTexture = function(texture, gl)
    {


        if(texture.hasLoaded)
        {
            texture._glTextures[gl.id] = gl.createTexture();

            gl.bindTexture(gl.TEXTURE_2D, texture._glTextures[gl.id]);
            gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, texture.premultipliedAlpha);

            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, texture.source);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, texture.scaleMode === PIXI.scaleModes.LINEAR ? gl.LINEAR : gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, texture.scaleMode === PIXI.scaleModes.LINEAR ? gl.LINEAR : gl.NEAREST);

            // reguler...

            if(!texture._powerOf2)
            {
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            }
            else
            {
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
            }

            gl.bindTexture(gl.TEXTURE_2D, null);

            texture._dirty[gl.id] = false;
        }

        return  texture._glTextures[gl.id];
    };

    /**
     * Updates a WebGL texture
     *
     * @method updateWebGLTexture
     * @param texture {Texture} the texture to update
     * @param gl {webglContext} the WebGL context
     * @private
     */
    PIXI.updateWebGLTexture = function(texture, gl)
    {
        if( texture._glTextures[gl.id] )
        {
            gl.bindTexture(gl.TEXTURE_2D, texture._glTextures[gl.id]);
            gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, texture.premultipliedAlpha);

            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, texture.source);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, texture.scaleMode === PIXI.scaleModes.LINEAR ? gl.LINEAR : gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, texture.scaleMode === PIXI.scaleModes.LINEAR ? gl.LINEAR : gl.NEAREST);

            // reguler...

            if(!texture._powerOf2)
            {
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            }
            else
            {
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
            }

            texture._dirty[gl.id] = false;
        }
        
    };

    /**
     * Handles a lost webgl context
     *
     * @method handleContextLost
     * @param event {Event}
     * @private
     */
    PIXI.WebGLRenderer.prototype.handleContextLost = function(event)
    {
        event.preventDefault();
        this.contextLost = true;
    };

    /**
     * Handles a restored webgl context
     *
     * @method handleContextRestored
     * @param event {Event}
     * @private
     */
    PIXI.WebGLRenderer.prototype.handleContextRestored = function()
    {

        //try 'experimental-webgl'
        try {
            this.gl = this.view.getContext('experimental-webgl',  this.options);
        } catch (e) {
            //try 'webgl'
            try {
                this.gl = this.view.getContext('webgl',  this.options);
            } catch (e2) {
                // fail, not able to get a context
                throw new Error(' This browser does not support webGL. Try using the canvas renderer' + this);
            }
        }

        var gl = this.gl;
        gl.id = PIXI.WebGLRenderer.glContextId ++;



        // need to set the context...
        this.shaderManager.setContext(gl);
        this.spriteBatch.setContext(gl);
        this.primitiveBatch.setContext(gl);
        this.maskManager.setContext(gl);
        this.filterManager.setContext(gl);


        this.renderSession.gl = this.gl;

        gl.disable(gl.DEPTH_TEST);
        gl.disable(gl.CULL_FACE);

        gl.enable(gl.BLEND);
        gl.colorMask(true, true, true, this.transparent);

        this.gl.viewport(0, 0, this.width, this.height);

        for(var key in PIXI.TextureCache)
        {
            var texture = PIXI.TextureCache[key].baseTexture;
            texture._glTextures = [];
        }

        /**
         * Whether the context was lost 
         * @property contextLost
         * @type Boolean
         */
        this.contextLost = false;

    };

    /**
     * Removes everything from the renderer (event listeners, spritebatch, etc...)
     *
     * @method destroy
     */
    PIXI.WebGLRenderer.prototype.destroy = function()
    {

        // deal with losing context..
        
        // remove listeners
        this.view.removeEventListener('webglcontextlost', this.contextLost);
        this.view.removeEventListener('webglcontextrestored', this.contextRestoredLost);

        PIXI.glContexts[this.glContextId] = null;

        this.projection = null;
        this.offset = null;

        // time to create the render managers! each one focuses on managine a state in webGL
        this.shaderManager.destroy();
        this.spriteBatch.destroy();
        this.primitiveBatch.destroy();
        this.maskManager.destroy();
        this.filterManager.destroy();

        this.shaderManager = null;
        this.spriteBatch = null;
        this.maskManager = null;
        this.filterManager = null;
        
        this.gl = null;
        //
        this.renderSession = null;
    };


    PIXI.WebGLRenderer.glContextId = 0;

    /**
     * @author Mat Groves http://matgroves.com/ @Doormat23
     */

    /**
    * @class WebGLMaskManager
    * @constructor
    * @param gl {WebGLContext} the current WebGL drawing context
    * @private
    */
    PIXI.WebGLBlendModeManager = function(gl)
    {
        this.gl = gl;
        this.currentBlendMode = 99999;
    };

    /**
    * Sets-up the given blendMode from WebGL's point of view
    * @method setBlendMode 
    *
    * @param blendMode {Number} the blendMode, should be a Pixi const, such as PIXI.BlendModes.ADD
    */
    PIXI.WebGLBlendModeManager.prototype.setBlendMode = function(blendMode)
    {
        if(this.currentBlendMode === blendMode)return false;
     //   console.log("SWAP!")
        this.currentBlendMode = blendMode;
        
        var blendModeWebGL = PIXI.blendModesWebGL[this.currentBlendMode];
        this.gl.blendFunc(blendModeWebGL[0], blendModeWebGL[1]);
        
        return true;
    };

    PIXI.WebGLBlendModeManager.prototype.destroy = function()
    {
        this.gl = null;
    };
    /**
     * @author Mat Groves http://matgroves.com/ @Doormat23
     */

    /**
    * @class WebGLMaskManager
    * @constructor
    * @param gl {WebGLContext} the current WebGL drawing context
    * @private
    */
    PIXI.WebGLMaskManager = function(gl)
    {
        this.maskStack = [];
        this.maskPosition = 0;

        this.setContext(gl);

        this.reverse = false;
        this.count = 0;
    };

    /**
    * Sets the drawing context to the one given in parameter
    * @method setContext 
    * @param gl {WebGLContext} the current WebGL drawing context
    */
    PIXI.WebGLMaskManager.prototype.setContext = function(gl)
    {
        this.gl = gl;
    };

    /**
    * Applies the Mask and adds it to the current filter stack
    * @method pushMask
    * @param maskData {Array}
    * @param renderSession {RenderSession}
    */
    PIXI.WebGLMaskManager.prototype.pushMask = function(maskData, renderSession)
    {
        var gl = renderSession.gl;

        if(maskData.dirty)
        {
            PIXI.WebGLGraphics.updateGraphics(maskData, gl);
        }

        if(!maskData._webGL[gl.id].data.length)return;

        renderSession.stencilManager.pushStencil(maskData, maskData._webGL[gl.id].data[0], renderSession);
    };

    /**
    * Removes the last filter from the filter stack and doesn't return it
    * @method popMask
    *
    * @param renderSession {RenderSession} an object containing all the useful parameters
    */
    PIXI.WebGLMaskManager.prototype.popMask = function(maskData, renderSession)
    {
        var gl = this.gl;
        renderSession.stencilManager.popStencil(maskData, maskData._webGL[gl.id].data[0], renderSession);
    };


    /**
    * Destroys the mask stack
    * @method destroy
    */
    PIXI.WebGLMaskManager.prototype.destroy = function()
    {
        this.maskStack = null;
        this.gl = null;
    };
    /**
     * @author Mat Groves http://matgroves.com/ @Doormat23
     */
     
    //BA0285
    //Intercontinental Hotel, 888 Howard Street
    //San Francisco

    /**
    * @class WebGLStencilManager
    * @constructor
    * @param gl {WebGLContext} the current WebGL drawing context
    * @private
    */
    PIXI.WebGLStencilManager = function(gl)
    {
       
        this.stencilStack = [];
        this.setContext(gl);
        this.reverse = true;
        this.count = 0;

    };

    /**
    * Sets the drawing context to the one given in parameter
    * @method setContext 
    * @param gl {WebGLContext} the current WebGL drawing context
    */
    PIXI.WebGLStencilManager.prototype.setContext = function(gl)
    {
        this.gl = gl;
    };

    /**
    * Applies the Mask and adds it to the current filter stack
    * @method pushMask
    * @param maskData {Array}
    * @param renderSession {RenderSession}
    */
    PIXI.WebGLStencilManager.prototype.pushStencil = function(graphics, webGLData, renderSession)
    {
        var gl = this.gl;
        this.bindGraphics(graphics, webGLData, renderSession);

        if(this.stencilStack.length === 0)
        {
            gl.enable(gl.STENCIL_TEST);
            gl.clear(gl.STENCIL_BUFFER_BIT);
            this.reverse = true;
            this.count = 0;
        }

        this.stencilStack.push(webGLData);

        var level = this.count;

        gl.colorMask(false, false, false, false);

        gl.stencilFunc(gl.ALWAYS,0,0xFF);
        gl.stencilOp(gl.KEEP,gl.KEEP,gl.INVERT);

        // draw the triangle strip!

        if(webGLData.mode === 1)
        {

            gl.drawElements(gl.TRIANGLE_FAN,  webGLData.indices.length - 4, gl.UNSIGNED_SHORT, 0 );
           
            if(this.reverse)
            {
                gl.stencilFunc(gl.EQUAL, 0xFF - level, 0xFF);
                gl.stencilOp(gl.KEEP,gl.KEEP,gl.DECR);
            }
            else
            {
                gl.stencilFunc(gl.EQUAL,level, 0xFF);
                gl.stencilOp(gl.KEEP,gl.KEEP,gl.INCR);
            }

            // draw a quad to increment..
            gl.drawElements(gl.TRIANGLE_FAN, 4, gl.UNSIGNED_SHORT, ( webGLData.indices.length - 4 ) * 2 );
                   
            if(this.reverse)
            {
                gl.stencilFunc(gl.EQUAL,0xFF-(level+1), 0xFF);
            }
            else
            {
                gl.stencilFunc(gl.EQUAL,level+1, 0xFF);
            }

            this.reverse = !this.reverse;
        }
        else
        {
            if(!this.reverse)
            {
                gl.stencilFunc(gl.EQUAL, 0xFF - level, 0xFF);
                gl.stencilOp(gl.KEEP,gl.KEEP,gl.DECR);
            }
            else
            {
                gl.stencilFunc(gl.EQUAL,level, 0xFF);
                gl.stencilOp(gl.KEEP,gl.KEEP,gl.INCR);
            }

            gl.drawElements(gl.TRIANGLE_STRIP,  webGLData.indices.length, gl.UNSIGNED_SHORT, 0 );

            if(!this.reverse)
            {
                gl.stencilFunc(gl.EQUAL,0xFF-(level+1), 0xFF);
            }
            else
            {
                gl.stencilFunc(gl.EQUAL,level+1, 0xFF);
            }
        }

        gl.colorMask(true, true, true, true);
        gl.stencilOp(gl.KEEP,gl.KEEP,gl.KEEP);

        this.count++;
    };

    //TODO this does not belong here!
    PIXI.WebGLStencilManager.prototype.bindGraphics = function(graphics, webGLData, renderSession)
    {
        //if(this._currentGraphics === graphics)return;
        this._currentGraphics = graphics;

        var gl = this.gl;

         // bind the graphics object..
        var projection = renderSession.projection,
            offset = renderSession.offset,
            shader;// = renderSession.shaderManager.primitiveShader;

        if(webGLData.mode === 1)
        {
            shader = renderSession.shaderManager.complexPrimativeShader;

            renderSession.shaderManager.setShader( shader );

            gl.uniformMatrix3fv(shader.translationMatrix, false, graphics.worldTransform.toArray(true));

            gl.uniform2f(shader.projectionVector, projection.x, -projection.y);
            gl.uniform2f(shader.offsetVector, -offset.x, -offset.y);

            gl.uniform3fv(shader.tintColor, PIXI.hex2rgb(graphics.tint));
            gl.uniform3fv(shader.color, webGLData.color);

            gl.uniform1f(shader.alpha, graphics.worldAlpha * webGLData.alpha);

            gl.bindBuffer(gl.ARRAY_BUFFER, webGLData.buffer);

            gl.vertexAttribPointer(shader.aVertexPosition, 2, gl.FLOAT, false, 4 * 2, 0);


            // now do the rest..
            // set the index buffer!
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, webGLData.indexBuffer);
        }
        else
        {
            //renderSession.shaderManager.activatePrimitiveShader();
            shader = renderSession.shaderManager.primitiveShader;
            renderSession.shaderManager.setShader( shader );

            gl.uniformMatrix3fv(shader.translationMatrix, false, graphics.worldTransform.toArray(true));

            gl.uniform2f(shader.projectionVector, projection.x, -projection.y);
            gl.uniform2f(shader.offsetVector, -offset.x, -offset.y);

            gl.uniform3fv(shader.tintColor, PIXI.hex2rgb(graphics.tint));

            gl.uniform1f(shader.alpha, graphics.worldAlpha);
            
            gl.bindBuffer(gl.ARRAY_BUFFER, webGLData.buffer);

            gl.vertexAttribPointer(shader.aVertexPosition, 2, gl.FLOAT, false, 4 * 6, 0);
            gl.vertexAttribPointer(shader.colorAttribute, 4, gl.FLOAT, false,4 * 6, 2 * 4);

            // set the index buffer!
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, webGLData.indexBuffer);
        }
    };

    PIXI.WebGLStencilManager.prototype.popStencil = function(graphics, webGLData, renderSession)
    {
    	var gl = this.gl;
        this.stencilStack.pop();
       
        this.count--;

        if(this.stencilStack.length === 0)
        {
            // the stack is empty!
            gl.disable(gl.STENCIL_TEST);

        }
        else
        {

            var level = this.count;

            this.bindGraphics(graphics, webGLData, renderSession);

            gl.colorMask(false, false, false, false);
        
            if(webGLData.mode === 1)
            {
                this.reverse = !this.reverse;

                if(this.reverse)
                {
                    gl.stencilFunc(gl.EQUAL, 0xFF - (level+1), 0xFF);
                    gl.stencilOp(gl.KEEP,gl.KEEP,gl.INCR);
                }
                else
                {
                    gl.stencilFunc(gl.EQUAL,level+1, 0xFF);
                    gl.stencilOp(gl.KEEP,gl.KEEP,gl.DECR);
                }

                // draw a quad to increment..
                gl.drawElements(gl.TRIANGLE_FAN, 4, gl.UNSIGNED_SHORT, ( webGLData.indices.length - 4 ) * 2 );
                
                gl.stencilFunc(gl.ALWAYS,0,0xFF);
                gl.stencilOp(gl.KEEP,gl.KEEP,gl.INVERT);

                // draw the triangle strip!
                gl.drawElements(gl.TRIANGLE_FAN,  webGLData.indices.length - 4, gl.UNSIGNED_SHORT, 0 );
               
                if(!this.reverse)
                {
                    gl.stencilFunc(gl.EQUAL,0xFF-(level), 0xFF);
                }
                else
                {
                    gl.stencilFunc(gl.EQUAL,level, 0xFF);
                }

            }
            else
            {
              //  console.log("<<>>")
                if(!this.reverse)
                {
                    gl.stencilFunc(gl.EQUAL, 0xFF - (level+1), 0xFF);
                    gl.stencilOp(gl.KEEP,gl.KEEP,gl.INCR);
                }
                else
                {
                    gl.stencilFunc(gl.EQUAL,level+1, 0xFF);
                    gl.stencilOp(gl.KEEP,gl.KEEP,gl.DECR);
                }

                gl.drawElements(gl.TRIANGLE_STRIP,  webGLData.indices.length, gl.UNSIGNED_SHORT, 0 );

                if(!this.reverse)
                {
                    gl.stencilFunc(gl.EQUAL,0xFF-(level), 0xFF);
                }
                else
                {
                    gl.stencilFunc(gl.EQUAL,level, 0xFF);
                }
            }

            gl.colorMask(true, true, true, true);
            gl.stencilOp(gl.KEEP,gl.KEEP,gl.KEEP);


        }

        //renderSession.shaderManager.deactivatePrimitiveShader();
    };

    /**
    * Destroys the mask stack
    * @method destroy
    */
    PIXI.WebGLStencilManager.prototype.destroy = function()
    {
        this.maskStack = null;
        this.gl = null;
    };
    /**
     * @author Mat Groves http://matgroves.com/ @Doormat23
     */

    /**
    * @class WebGLShaderManager
    * @constructor
    * @param gl {WebGLContext} the current WebGL drawing context
    * @private
    */
    PIXI.WebGLShaderManager = function(gl)
    {

        this.maxAttibs = 10;
        this.attribState = [];
        this.tempAttribState = [];
        this.shaderMap = [];

        for (var i = 0; i < this.maxAttibs; i++) {
            this.attribState[i] = false;
        }

        this.setContext(gl);
        // the final one is used for the rendering strips
    };


    /**
    * Initialises the context and the properties
    * @method setContext 
    * @param gl {WebGLContext} the current WebGL drawing context
    * @param transparent {Boolean} Whether or not the drawing context should be transparent
    */
    PIXI.WebGLShaderManager.prototype.setContext = function(gl)
    {
        this.gl = gl;
        
        // the next one is used for rendering primatives
        this.primitiveShader = new PIXI.PrimitiveShader(gl);

        // the next one is used for rendering triangle strips
        this.complexPrimativeShader = new PIXI.ComplexPrimitiveShader(gl);

        // this shader is used for the default sprite rendering
        this.defaultShader = new PIXI.PixiShader(gl);

        // this shader is used for the fast sprite rendering
        this.fastShader = new PIXI.PixiFastShader(gl);

        // the next one is used for rendering triangle strips
        this.stripShader = new PIXI.StripShader(gl);
        this.setShader(this.defaultShader);
    };


    /**
    * Takes the attributes given in parameters 
    * @method setAttribs
    * @param attribs {Array} attribs 
    */
    PIXI.WebGLShaderManager.prototype.setAttribs = function(attribs)
    {
        // reset temp state

        var i;

        for (i = 0; i < this.tempAttribState.length; i++)
        {
            this.tempAttribState[i] = false;
        }

        // set the new attribs
        for (i = 0; i < attribs.length; i++)
        {
            var attribId = attribs[i];
            this.tempAttribState[attribId] = true;
        }

        var gl = this.gl;

        for (i = 0; i < this.attribState.length; i++)
        {
            if(this.attribState[i] !== this.tempAttribState[i])
            {
                this.attribState[i] = this.tempAttribState[i];

                if(this.tempAttribState[i])
                {
                    gl.enableVertexAttribArray(i);
                }
                else
                {
                    gl.disableVertexAttribArray(i);
                }
            }
        }
    };

    PIXI.WebGLShaderManager.prototype.setShader = function(shader)
    {
        if(this._currentId === shader._UID)return false;
        
        this._currentId = shader._UID;

        this.currentShader = shader;

        this.gl.useProgram(shader.program);
        this.setAttribs(shader.attributes);

        return true;
    };

    /**
    * Destroys
    * @method destroy
    */
    PIXI.WebGLShaderManager.prototype.destroy = function()
    {
        this.attribState = null;

        this.tempAttribState = null;

        this.primitiveShader.destroy();

        this.defaultShader.destroy();

        this.fastShader.destroy();

        this.stripShader.destroy();

        this.gl = null;
    };


    /**
     * @author Mat Groves
     * 
     * Big thanks to the very clever Matt DesLauriers <mattdesl> https://github.com/mattdesl/
     * for creating the original pixi version!
     *
     * Heavily inspired by LibGDX's WebGLSpriteBatch:
     * https://github.com/libgdx/libgdx/blob/master/gdx/src/com/badlogic/gdx/graphics/g2d/WebGLSpriteBatch.java
     */

     /**
     *
     * @class WebGLSpriteBatch
     * @private
     * @constructor
     * @param gl {WebGLContext} the current WebGL drawing context
     *
     */
    PIXI.WebGLSpriteBatch = function(gl)
    {

        /**
         * 
         *
         * @property vertSize
         * @type Number
         */
        this.vertSize = 6;

        /**
         * The number of images in the SpriteBatch before it flushes
         * @property size
         * @type Number
         */
        this.size = 2000;//Math.pow(2, 16) /  this.vertSize;

        //the total number of floats in our batch
        var numVerts = this.size * 4 *  this.vertSize;
        //the total number of indices in our batch
        var numIndices = this.size * 6;

        //vertex data

        /**
        * Holds the vertices
        *
        * @property vertices
        * @type Float32Array
        */
        this.vertices = new Float32Array(numVerts);

        //index data
        /**
         * Holds the indices
         *
         * @property indices
         * @type Uint16Array
         */
        this.indices = new Uint16Array(numIndices);
        
        this.lastIndexCount = 0;

        for (var i=0, j=0; i < numIndices; i += 6, j += 4)
        {
            this.indices[i + 0] = j + 0;
            this.indices[i + 1] = j + 1;
            this.indices[i + 2] = j + 2;
            this.indices[i + 3] = j + 0;
            this.indices[i + 4] = j + 2;
            this.indices[i + 5] = j + 3;
        }


        this.drawing = false;
        this.currentBatchSize = 0;
        this.currentBaseTexture = null;
        
        this.setContext(gl);

        this.dirty = true;

        this.textures = [];
        this.blendModes = [];
    };

    /**
    * 
    * @method setContext
    *
    * @param gl {WebGLContext} the current WebGL drawing context
    */
    PIXI.WebGLSpriteBatch.prototype.setContext = function(gl)
    {
        this.gl = gl;

        // create a couple of buffers
        this.vertexBuffer = gl.createBuffer();
        this.indexBuffer = gl.createBuffer();

        // 65535 is max index, so 65535 / 6 = 10922.


        //upload the index data
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.indices, gl.STATIC_DRAW);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, this.vertices, gl.DYNAMIC_DRAW);

        this.currentBlendMode = 99999;
    };

    /**
    * 
    * @method begin
    *
    * @param renderSession {RenderSession} the RenderSession
    */
    PIXI.WebGLSpriteBatch.prototype.begin = function(renderSession)
    {
        this.renderSession = renderSession;
        this.shader = this.renderSession.shaderManager.defaultShader;

        this.start();
    };

    /**
    * 
    * @method end
    *
    */
    PIXI.WebGLSpriteBatch.prototype.end = function()
    {
        this.flush();
    };

    /**
    * 
    * @method render
    * 
    * @param sprite {Sprite} the sprite to render when using this spritebatch
    */
    PIXI.WebGLSpriteBatch.prototype.render = function(sprite)
    {
        var texture = sprite.texture;
        
       //TODO set blend modes.. 
        // check texture..
        if(this.currentBatchSize >= this.size)
        {
            //return;
            this.flush();
            this.currentBaseTexture = texture.baseTexture;
        }

        // get the uvs for the texture
        var uvs = texture._uvs;
        // if the uvs have not updated then no point rendering just yet!
        if(!uvs)return;

        // get the sprites current alpha
        var alpha = sprite.worldAlpha;
        var tint = sprite.tint;

        var verticies = this.vertices;


        // TODO trim??
        var aX = sprite.anchor.x;
        var aY = sprite.anchor.y;

        var w0, w1, h0, h1;
            
        if (texture.trim)
        {
            // if the sprite is trimmed then we need to add the extra space before transforming the sprite coords..
            var trim = texture.trim;

            w1 = trim.x - aX * trim.width;
            w0 = w1 + texture.crop.width;

            h1 = trim.y - aY * trim.height;
            h0 = h1 + texture.crop.height;

        }
        else
        {
            w0 = (texture.frame.width ) * (1-aX);
            w1 = (texture.frame.width ) * -aX;

            h0 = texture.frame.height * (1-aY);
            h1 = texture.frame.height * -aY;
        }

        var index = this.currentBatchSize * 4 * this.vertSize;

        var worldTransform = sprite.worldTransform;

        var a = worldTransform.a;//[0];
        var b = worldTransform.c;//[3];
        var c = worldTransform.b;//[1];
        var d = worldTransform.d;//[4];
        var tx = worldTransform.tx;//[2];
        var ty = worldTransform.ty;///[5];

        // xy
        verticies[index++] = a * w1 + c * h1 + tx;
        verticies[index++] = d * h1 + b * w1 + ty;
        // uv
        verticies[index++] = uvs.x0;
        verticies[index++] = uvs.y0;
        // color
        verticies[index++] = alpha;
        verticies[index++] = tint;

        // xy
        verticies[index++] = a * w0 + c * h1 + tx;
        verticies[index++] = d * h1 + b * w0 + ty;
        // uv
        verticies[index++] = uvs.x1;
        verticies[index++] = uvs.y1;
        // color
        verticies[index++] = alpha;
        verticies[index++] = tint;

        // xy
        verticies[index++] = a * w0 + c * h0 + tx;
        verticies[index++] = d * h0 + b * w0 + ty;
        // uv
        verticies[index++] = uvs.x2;
        verticies[index++] = uvs.y2;
        // color
        verticies[index++] = alpha;
        verticies[index++] = tint;

        // xy
        verticies[index++] = a * w1 + c * h0 + tx;
        verticies[index++] = d * h0 + b * w1 + ty;
        // uv
        verticies[index++] = uvs.x3;
        verticies[index++] = uvs.y3;
        // color
        verticies[index++] = alpha;
        verticies[index++] = tint;
        
        // increment the batchsize
        this.textures[this.currentBatchSize] = sprite.texture.baseTexture;
        this.blendModes[this.currentBatchSize] = sprite.blendMode;

        this.currentBatchSize++;

    };

    /**
    * Renders a tilingSprite using the spriteBatch
    * @method renderTilingSprite
    * 
    * @param sprite {TilingSprite} the tilingSprite to render
    */
    PIXI.WebGLSpriteBatch.prototype.renderTilingSprite = function(tilingSprite)
    {
        var texture = tilingSprite.tilingTexture;

        
        // check texture..
        if(this.currentBatchSize >= this.size)
        {
            //return;
            this.flush();
            this.currentBaseTexture = texture.baseTexture;
        }

         // set the textures uvs temporarily
        // TODO create a separate texture so that we can tile part of a texture

        if(!tilingSprite._uvs)tilingSprite._uvs = new PIXI.TextureUvs();

        var uvs = tilingSprite._uvs;

        tilingSprite.tilePosition.x %= texture.baseTexture.width * tilingSprite.tileScaleOffset.x;
        tilingSprite.tilePosition.y %= texture.baseTexture.height * tilingSprite.tileScaleOffset.y;

        var offsetX =  tilingSprite.tilePosition.x/(texture.baseTexture.width*tilingSprite.tileScaleOffset.x);
        var offsetY =  tilingSprite.tilePosition.y/(texture.baseTexture.height*tilingSprite.tileScaleOffset.y);

        var scaleX =  (tilingSprite.width / texture.baseTexture.width)  / (tilingSprite.tileScale.x * tilingSprite.tileScaleOffset.x);
        var scaleY =  (tilingSprite.height / texture.baseTexture.height) / (tilingSprite.tileScale.y * tilingSprite.tileScaleOffset.y);

        uvs.x0 = 0 - offsetX;
        uvs.y0 = 0 - offsetY;

        uvs.x1 = (1 * scaleX) - offsetX;
        uvs.y1 = 0 - offsetY;

        uvs.x2 = (1 * scaleX) - offsetX;
        uvs.y2 = (1 * scaleY) - offsetY;

        uvs.x3 = 0 - offsetX;
        uvs.y3 = (1 *scaleY) - offsetY;

        // get the tilingSprites current alpha
        var alpha = tilingSprite.worldAlpha;
        var tint = tilingSprite.tint;

        var  verticies = this.vertices;

        var width = tilingSprite.width;
        var height = tilingSprite.height;

        // TODO trim??
        var aX = tilingSprite.anchor.x;
        var aY = tilingSprite.anchor.y;
        var w0 = width * (1-aX);
        var w1 = width * -aX;

        var h0 = height * (1-aY);
        var h1 = height * -aY;

        var index = this.currentBatchSize * 4 * this.vertSize;

        var worldTransform = tilingSprite.worldTransform;

        var a = worldTransform.a;//[0];
        var b = worldTransform.c;//[3];
        var c = worldTransform.b;//[1];
        var d = worldTransform.d;//[4];
        var tx = worldTransform.tx;//[2];
        var ty = worldTransform.ty;///[5];

        // xy
        verticies[index++] = a * w1 + c * h1 + tx;
        verticies[index++] = d * h1 + b * w1 + ty;
        // uv
        verticies[index++] = uvs.x0;
        verticies[index++] = uvs.y0;
        // color
        verticies[index++] = alpha;
        verticies[index++] = tint;

        // xy
        verticies[index++] = (a * w0 + c * h1 + tx);
        verticies[index++] = d * h1 + b * w0 + ty;
        // uv
        verticies[index++] = uvs.x1;
        verticies[index++] = uvs.y1;
        // color
        verticies[index++] = alpha;
        verticies[index++] = tint;
        
        // xy
        verticies[index++] = a * w0 + c * h0 + tx;
        verticies[index++] = d * h0 + b * w0 + ty;
        // uv
        verticies[index++] = uvs.x2;
        verticies[index++] = uvs.y2;
        // color
        verticies[index++] = alpha;
        verticies[index++] = tint;

        // xy
        verticies[index++] = a * w1 + c * h0 + tx;
        verticies[index++] = d * h0 + b * w1 + ty;
        // uv
        verticies[index++] = uvs.x3;
        verticies[index++] = uvs.y3;
        // color
        verticies[index++] = alpha;
        verticies[index++] = tint;

        // increment the batchs
        this.textures[this.currentBatchSize] = texture.baseTexture;
        this.blendModes[this.currentBatchSize] = tilingSprite.blendMode;
        this.currentBatchSize++;
    };


    /**
    * Renders the content and empties the current batch
    *
    * @method flush
    * 
    */
    PIXI.WebGLSpriteBatch.prototype.flush = function()
    {
        // If the batch is length 0 then return as there is nothing to draw
        if (this.currentBatchSize===0)return;

        var gl = this.gl;

        this.renderSession.shaderManager.setShader(this.renderSession.shaderManager.defaultShader);

        if(this.dirty)
        {
            this.dirty = false;
            // bind the main texture
            gl.activeTexture(gl.TEXTURE0);

            // bind the buffers
            gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);

            // set the projection
            var projection = this.renderSession.projection;
            gl.uniform2f(this.shader.projectionVector, projection.x, projection.y);

            // set the pointers
            var stride =  this.vertSize * 4;
            gl.vertexAttribPointer(this.shader.aVertexPosition, 2, gl.FLOAT, false, stride, 0);
            gl.vertexAttribPointer(this.shader.aTextureCoord, 2, gl.FLOAT, false, stride, 2 * 4);
            gl.vertexAttribPointer(this.shader.colorAttribute, 2, gl.FLOAT, false, stride, 4 * 4);

        }

        // upload the verts to the buffer  
        if(this.currentBatchSize > ( this.size * 0.5 ) )
        {
            gl.bufferSubData(gl.ARRAY_BUFFER, 0, this.vertices);
        }
        else
        {
            var view = this.vertices.subarray(0, this.currentBatchSize * 4 * this.vertSize);
            gl.bufferSubData(gl.ARRAY_BUFFER, 0, view);
        }

        var nextTexture, nextBlendMode;
        var batchSize = 0;
        var start = 0;

        var currentBaseTexture = null;
        var currentBlendMode = this.renderSession.blendModeManager.currentBlendMode;

        for (var i = 0, j = this.currentBatchSize; i < j; i++) {
            
            nextTexture = this.textures[i];
            nextBlendMode = this.blendModes[i];

            if(currentBaseTexture !== nextTexture || currentBlendMode !== nextBlendMode)
            {
                this.renderBatch(currentBaseTexture, batchSize, start);

                start = i;
                batchSize = 0;
                currentBaseTexture = nextTexture;
                currentBlendMode = nextBlendMode;
                
                this.renderSession.blendModeManager.setBlendMode( currentBlendMode );
            }

            batchSize++;
        }

        this.renderBatch(currentBaseTexture, batchSize, start);

        // then reset the batch!
        this.currentBatchSize = 0;
    };

    PIXI.WebGLSpriteBatch.prototype.renderBatch = function(texture, size, startIndex)
    {
        if(size === 0)return;

        var gl = this.gl;
        // bind the current texture
        gl.bindTexture(gl.TEXTURE_2D, texture._glTextures[gl.id] || PIXI.createWebGLTexture(texture, gl));

        // check if a texture is dirty..
        if(texture._dirty[gl.id])
        {
            PIXI.updateWebGLTexture(this.currentBaseTexture, gl);
        }

        // now draw those suckas!
        gl.drawElements(gl.TRIANGLES, size * 6, gl.UNSIGNED_SHORT, startIndex * 6 * 2);
        
        // increment the draw count
        this.renderSession.drawCount++;
    };

    /**
    * 
    * @method stop
    *
    */
    PIXI.WebGLSpriteBatch.prototype.stop = function()
    {
        this.flush();
    };

    /**
    * 
    * @method start
    *
    */
    PIXI.WebGLSpriteBatch.prototype.start = function()
    {
        this.dirty = true;
    };

    /**
    * Destroys the SpriteBatch
    * @method destroy
    */
    PIXI.WebGLSpriteBatch.prototype.destroy = function()
    {

        this.vertices = null;
        this.indices = null;
        
        this.gl.deleteBuffer( this.vertexBuffer );
        this.gl.deleteBuffer( this.indexBuffer );
        
        this.currentBaseTexture = null;
        
        this.gl = null;
    };


    /**
     * @author Mat Groves
     * 
     * Big thanks to the very clever Matt DesLauriers <mattdesl> https://github.com/mattdesl/
     * for creating the original pixi version!
     *
     * Heavily inspired by LibGDX's WebGLSpriteBatch:
     * https://github.com/libgdx/libgdx/blob/master/gdx/src/com/badlogic/gdx/graphics/g2d/WebGLSpriteBatch.java
     */

    PIXI.WebGLFastSpriteBatch = function(gl)
    {
       

        this.vertSize = 10;
        this.maxSize = 6000;//Math.pow(2, 16) /  this.vertSize;
        this.size = this.maxSize;

        //the total number of floats in our batch
        var numVerts = this.size * 4 *  this.vertSize;
        //the total number of indices in our batch
        var numIndices = this.maxSize * 6;

         //vertex data
        this.vertices = new Float32Array(numVerts);
        //index data
        this.indices = new Uint16Array(numIndices);
        
        this.vertexBuffer = null;
        this.indexBuffer = null;

        this.lastIndexCount = 0;

        for (var i=0, j=0; i < numIndices; i += 6, j += 4)
        {
            this.indices[i + 0] = j + 0;
            this.indices[i + 1] = j + 1;
            this.indices[i + 2] = j + 2;
            this.indices[i + 3] = j + 0;
            this.indices[i + 4] = j + 2;
            this.indices[i + 5] = j + 3;
        }

        this.drawing = false;
        this.currentBatchSize = 0;
        this.currentBaseTexture = null;
       
        this.currentBlendMode = 0;
        this.renderSession = null;
        

        this.shader = null;

        this.matrix = null;

        this.setContext(gl);
    };

    PIXI.WebGLFastSpriteBatch.prototype.setContext = function(gl)
    {
        this.gl = gl;

        // create a couple of buffers
        this.vertexBuffer = gl.createBuffer();
        this.indexBuffer = gl.createBuffer();

        // 65535 is max index, so 65535 / 6 = 10922.


        //upload the index data
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.indices, gl.STATIC_DRAW);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, this.vertices, gl.DYNAMIC_DRAW);
    };

    PIXI.WebGLFastSpriteBatch.prototype.begin = function(spriteBatch, renderSession)
    {
        this.renderSession = renderSession;
        this.shader = this.renderSession.shaderManager.fastShader;

        this.matrix = spriteBatch.worldTransform.toArray(true);

        this.start();
    };

    PIXI.WebGLFastSpriteBatch.prototype.end = function()
    {
        this.flush();
    };


    PIXI.WebGLFastSpriteBatch.prototype.render = function(spriteBatch)
    {

        var children = spriteBatch.children;
        var sprite = children[0];

        // if the uvs have not updated then no point rendering just yet!
        
        // check texture.
        if(!sprite.texture._uvs)return;
       
        this.currentBaseTexture = sprite.texture.baseTexture;
        
        // check blend mode
        if(sprite.blendMode !== this.renderSession.blendModeManager.currentBlendMode)
        {
            this.flush();
            this.renderSession.blendModeManager.setBlendMode(sprite.blendMode);
        }
        
        for(var i=0,j= children.length; i<j; i++)
        {
            this.renderSprite(children[i]);
        }

        this.flush();
    };

    PIXI.WebGLFastSpriteBatch.prototype.renderSprite = function(sprite)
    {
        //sprite = children[i];
        if(!sprite.visible)return;
        
        // TODO trim??
        if(sprite.texture.baseTexture !== this.currentBaseTexture)
        {
            this.flush();
            this.currentBaseTexture = sprite.texture.baseTexture;
            
            if(!sprite.texture._uvs)return;
        }

        var uvs, verticies = this.vertices, width, height, w0, w1, h0, h1, index;

        uvs = sprite.texture._uvs;


        width = sprite.texture.frame.width;
        height = sprite.texture.frame.height;

        if (sprite.texture.trim)
        {
            // if the sprite is trimmed then we need to add the extra space before transforming the sprite coords..
            var trim = sprite.texture.trim;

            w1 = trim.x - sprite.anchor.x * trim.width;
            w0 = w1 + sprite.texture.crop.width;

            h1 = trim.y - sprite.anchor.y * trim.height;
            h0 = h1 + sprite.texture.crop.height;
        }
        else
        {
            w0 = (sprite.texture.frame.width ) * (1-sprite.anchor.x);
            w1 = (sprite.texture.frame.width ) * -sprite.anchor.x;

            h0 = sprite.texture.frame.height * (1-sprite.anchor.y);
            h1 = sprite.texture.frame.height * -sprite.anchor.y;
        }

        index = this.currentBatchSize * 4 * this.vertSize;

        // xy
        verticies[index++] = w1;
        verticies[index++] = h1;

        verticies[index++] = sprite.position.x;
        verticies[index++] = sprite.position.y;

        //scale
        verticies[index++] = sprite.scale.x;
        verticies[index++] = sprite.scale.y;

        //rotation
        verticies[index++] = sprite.rotation;

        // uv
        verticies[index++] = uvs.x0;
        verticies[index++] = uvs.y1;
        // color
        verticies[index++] = sprite.alpha;
     

        // xy
        verticies[index++] = w0;
        verticies[index++] = h1;

        verticies[index++] = sprite.position.x;
        verticies[index++] = sprite.position.y;

        //scale
        verticies[index++] = sprite.scale.x;
        verticies[index++] = sprite.scale.y;

         //rotation
        verticies[index++] = sprite.rotation;

        // uv
        verticies[index++] = uvs.x1;
        verticies[index++] = uvs.y1;
        // color
        verticies[index++] = sprite.alpha;
      

        // xy
        verticies[index++] = w0;
        verticies[index++] = h0;

        verticies[index++] = sprite.position.x;
        verticies[index++] = sprite.position.y;

        //scale
        verticies[index++] = sprite.scale.x;
        verticies[index++] = sprite.scale.y;

         //rotation
        verticies[index++] = sprite.rotation;

        // uv
        verticies[index++] = uvs.x2;
        verticies[index++] = uvs.y2;
        // color
        verticies[index++] = sprite.alpha;
     



        // xy
        verticies[index++] = w1;
        verticies[index++] = h0;

        verticies[index++] = sprite.position.x;
        verticies[index++] = sprite.position.y;

        //scale
        verticies[index++] = sprite.scale.x;
        verticies[index++] = sprite.scale.y;

         //rotation
        verticies[index++] = sprite.rotation;

        // uv
        verticies[index++] = uvs.x3;
        verticies[index++] = uvs.y3;
        // color
        verticies[index++] = sprite.alpha;

        // increment the batchs
        this.currentBatchSize++;

        if(this.currentBatchSize >= this.size)
        {
            this.flush();
        }
    };

    PIXI.WebGLFastSpriteBatch.prototype.flush = function()
    {

        // If the batch is length 0 then return as there is nothing to draw
        if (this.currentBatchSize===0)return;

        var gl = this.gl;
        
        // bind the current texture

        if(!this.currentBaseTexture._glTextures[gl.id])PIXI.createWebGLTexture(this.currentBaseTexture, gl);

        gl.bindTexture(gl.TEXTURE_2D, this.currentBaseTexture._glTextures[gl.id]);

        // upload the verts to the buffer

       
        if(this.currentBatchSize > ( this.size * 0.5 ) )
        {
            gl.bufferSubData(gl.ARRAY_BUFFER, 0, this.vertices);
        }
        else
        {
            var view = this.vertices.subarray(0, this.currentBatchSize * 4 * this.vertSize);

            gl.bufferSubData(gl.ARRAY_BUFFER, 0, view);
        }
        
        
        // now draw those suckas!
        gl.drawElements(gl.TRIANGLES, this.currentBatchSize * 6, gl.UNSIGNED_SHORT, 0);
       
        // then reset the batch!
        this.currentBatchSize = 0;

        // increment the draw count
        this.renderSession.drawCount++;
    };


    PIXI.WebGLFastSpriteBatch.prototype.stop = function()
    {
        this.flush();
    };

    PIXI.WebGLFastSpriteBatch.prototype.start = function()
    {
        var gl = this.gl;

        // bind the main texture
        gl.activeTexture(gl.TEXTURE0);

        // bind the buffers
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);

        // set the projection
        var projection = this.renderSession.projection;
        gl.uniform2f(this.shader.projectionVector, projection.x, projection.y);

        // set the matrix
        gl.uniformMatrix3fv(this.shader.uMatrix, false, this.matrix);

        // set the pointers
        var stride =  this.vertSize * 4;

        gl.vertexAttribPointer(this.shader.aVertexPosition, 2, gl.FLOAT, false, stride, 0);
        gl.vertexAttribPointer(this.shader.aPositionCoord, 2, gl.FLOAT, false, stride, 2 * 4);
        gl.vertexAttribPointer(this.shader.aScale, 2, gl.FLOAT, false, stride, 4 * 4);
        gl.vertexAttribPointer(this.shader.aRotation, 1, gl.FLOAT, false, stride, 6 * 4);
        gl.vertexAttribPointer(this.shader.aTextureCoord, 2, gl.FLOAT, false, stride, 7 * 4);
        gl.vertexAttribPointer(this.shader.colorAttribute, 1, gl.FLOAT, false, stride, 9 * 4);

        
    };



    /**
     * @author Mat Groves http://matgroves.com/ @Doormat23
     */

    /**
    * @class WebGLFilterManager
    * @constructor
    * @param gl {WebGLContext} the current WebGL drawing context
    * @param transparent {Boolean} Whether or not the drawing context should be transparent
    * @private
    */
    PIXI.WebGLFilterManager = function(gl, transparent)
    {
        this.transparent = transparent;

        this.filterStack = [];
        
        this.offsetX = 0;
        this.offsetY = 0;

        this.setContext(gl);
    };

    // API
    /**
    * Initialises the context and the properties
    * @method setContext 
    * @param gl {WebGLContext} the current WebGL drawing context
    */
    PIXI.WebGLFilterManager.prototype.setContext = function(gl)
    {
        this.gl = gl;
        this.texturePool = [];

        this.initShaderBuffers();
    };

    /**
    * 
    * @method begin
    * @param renderSession {RenderSession} 
    * @param buffer {ArrayBuffer} 
    */
    PIXI.WebGLFilterManager.prototype.begin = function(renderSession, buffer)
    {
        this.renderSession = renderSession;
        this.defaultShader = renderSession.shaderManager.defaultShader;

        var projection = this.renderSession.projection;
       // console.log(this.width)
        this.width = projection.x * 2;
        this.height = -projection.y * 2;
        this.buffer = buffer;
    };

    /**
    * Applies the filter and adds it to the current filter stack
    * @method pushFilter
    * @param filterBlock {Object} the filter that will be pushed to the current filter stack
    */
    PIXI.WebGLFilterManager.prototype.pushFilter = function(filterBlock)
    {
        var gl = this.gl;

        var projection = this.renderSession.projection;
        var offset = this.renderSession.offset;

        filterBlock._filterArea = filterBlock.target.filterArea || filterBlock.target.getBounds();


        // filter program
        // OPTIMISATION - the first filter is free if its a simple color change?
        this.filterStack.push(filterBlock);

        var filter = filterBlock.filterPasses[0];

        this.offsetX += filterBlock._filterArea.x;
        this.offsetY += filterBlock._filterArea.y;

        var texture = this.texturePool.pop();
        if(!texture)
        {
            texture = new PIXI.FilterTexture(this.gl, this.width, this.height);
        }
        else
        {
            texture.resize(this.width, this.height);
        }

        gl.bindTexture(gl.TEXTURE_2D,  texture.texture);

        var filterArea = filterBlock._filterArea;// filterBlock.target.getBounds();///filterBlock.target.filterArea;

        var padding = filter.padding;
        filterArea.x -= padding;
        filterArea.y -= padding;
        filterArea.width += padding * 2;
        filterArea.height += padding * 2;

        // cap filter to screen size..
        if(filterArea.x < 0)filterArea.x = 0;
        if(filterArea.width > this.width)filterArea.width = this.width;
        if(filterArea.y < 0)filterArea.y = 0;
        if(filterArea.height > this.height)filterArea.height = this.height;

        //gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA,  filterArea.width, filterArea.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
        gl.bindFramebuffer(gl.FRAMEBUFFER, texture.frameBuffer);

        // set view port
        gl.viewport(0, 0, filterArea.width, filterArea.height);

        projection.x = filterArea.width/2;
        projection.y = -filterArea.height/2;

        offset.x = -filterArea.x;
        offset.y = -filterArea.y;

        // update projection
        // now restore the regular shader..
        this.renderSession.shaderManager.setShader(this.defaultShader);
        gl.uniform2f(this.defaultShader.projectionVector, filterArea.width/2, -filterArea.height/2);
        gl.uniform2f(this.defaultShader.offsetVector, -filterArea.x, -filterArea.y);

        gl.colorMask(true, true, true, true);
        gl.clearColor(0,0,0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT);

        filterBlock._glFilterTexture = texture;

    };


    /**
    * Removes the last filter from the filter stack and doesn't return it
    * @method popFilter
    */
    PIXI.WebGLFilterManager.prototype.popFilter = function()
    {
        var gl = this.gl;
        var filterBlock = this.filterStack.pop();
        var filterArea = filterBlock._filterArea;
        var texture = filterBlock._glFilterTexture;
        var projection = this.renderSession.projection;
        var offset = this.renderSession.offset;

        if(filterBlock.filterPasses.length > 1)
        {
            gl.viewport(0, 0, filterArea.width, filterArea.height);

            gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);

            this.vertexArray[0] = 0;
            this.vertexArray[1] = filterArea.height;

            this.vertexArray[2] = filterArea.width;
            this.vertexArray[3] = filterArea.height;

            this.vertexArray[4] = 0;
            this.vertexArray[5] = 0;

            this.vertexArray[6] = filterArea.width;
            this.vertexArray[7] = 0;

            gl.bufferSubData(gl.ARRAY_BUFFER, 0, this.vertexArray);

            gl.bindBuffer(gl.ARRAY_BUFFER, this.uvBuffer);
            // now set the uvs..
            this.uvArray[2] = filterArea.width/this.width;
            this.uvArray[5] = filterArea.height/this.height;
            this.uvArray[6] = filterArea.width/this.width;
            this.uvArray[7] = filterArea.height/this.height;

            gl.bufferSubData(gl.ARRAY_BUFFER, 0, this.uvArray);

            var inputTexture = texture;
            var outputTexture = this.texturePool.pop();
            if(!outputTexture)outputTexture = new PIXI.FilterTexture(this.gl, this.width, this.height);
            outputTexture.resize(this.width, this.height);

            // need to clear this FBO as it may have some left over elements from a previous filter.
            gl.bindFramebuffer(gl.FRAMEBUFFER, outputTexture.frameBuffer );
            gl.clear(gl.COLOR_BUFFER_BIT);

            gl.disable(gl.BLEND);

            for (var i = 0; i < filterBlock.filterPasses.length-1; i++)
            {
                var filterPass = filterBlock.filterPasses[i];

                gl.bindFramebuffer(gl.FRAMEBUFFER, outputTexture.frameBuffer );

                // set texture
                gl.activeTexture(gl.TEXTURE0);
                gl.bindTexture(gl.TEXTURE_2D, inputTexture.texture);

                // draw texture..
                //filterPass.applyFilterPass(filterArea.width, filterArea.height);
                this.applyFilterPass(filterPass, filterArea, filterArea.width, filterArea.height);

                // swap the textures..
                var temp = inputTexture;
                inputTexture = outputTexture;
                outputTexture = temp;
            }

            gl.enable(gl.BLEND);

            texture = inputTexture;
            this.texturePool.push(outputTexture);
        }

        var filter = filterBlock.filterPasses[filterBlock.filterPasses.length-1];

        this.offsetX -= filterArea.x;
        this.offsetY -= filterArea.y;


        var sizeX = this.width;
        var sizeY = this.height;

        var offsetX = 0;
        var offsetY = 0;

        var buffer = this.buffer;

        // time to render the filters texture to the previous scene
        if(this.filterStack.length === 0)
        {
            gl.colorMask(true, true, true, true);//this.transparent);
        }
        else
        {
            var currentFilter = this.filterStack[this.filterStack.length-1];
            filterArea = currentFilter._filterArea;

            sizeX = filterArea.width;
            sizeY = filterArea.height;

            offsetX = filterArea.x;
            offsetY = filterArea.y;

            buffer =  currentFilter._glFilterTexture.frameBuffer;
        }



        // TODO need toremove thease global elements..
        projection.x = sizeX/2;
        projection.y = -sizeY/2;

        offset.x = offsetX;
        offset.y = offsetY;

        filterArea = filterBlock._filterArea;

        var x = filterArea.x-offsetX;
        var y = filterArea.y-offsetY;

        // update the buffers..
        // make sure to flip the y!
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);

        this.vertexArray[0] = x;
        this.vertexArray[1] = y + filterArea.height;

        this.vertexArray[2] = x + filterArea.width;
        this.vertexArray[3] = y + filterArea.height;

        this.vertexArray[4] = x;
        this.vertexArray[5] = y;

        this.vertexArray[6] = x + filterArea.width;
        this.vertexArray[7] = y;

        gl.bufferSubData(gl.ARRAY_BUFFER, 0, this.vertexArray);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.uvBuffer);

        this.uvArray[2] = filterArea.width/this.width;
        this.uvArray[5] = filterArea.height/this.height;
        this.uvArray[6] = filterArea.width/this.width;
        this.uvArray[7] = filterArea.height/this.height;

        gl.bufferSubData(gl.ARRAY_BUFFER, 0, this.uvArray);

       //console.log(this.vertexArray)
       //console.log(this.uvArray)
        //console.log(sizeX + " : " + sizeY)

        gl.viewport(0, 0, sizeX, sizeY);

        // bind the buffer
        gl.bindFramebuffer(gl.FRAMEBUFFER, buffer );

        // set the blend mode! 
        //gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA)

        // set texture
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, texture.texture);

        // apply!
        this.applyFilterPass(filter, filterArea, sizeX, sizeY);

        // now restore the regular shader..
        this.renderSession.shaderManager.setShader(this.defaultShader);
        gl.uniform2f(this.defaultShader.projectionVector, sizeX/2, -sizeY/2);
        gl.uniform2f(this.defaultShader.offsetVector, -offsetX, -offsetY);

        // return the texture to the pool
        this.texturePool.push(texture);
        filterBlock._glFilterTexture = null;
    };


    /**
    * Applies the filter to the specified area
    * @method applyFilterPass
    * @param filter {AbstractFilter} the filter that needs to be applied
    * @param filterArea {texture} TODO - might need an update
    * @param width {Number} the horizontal range of the filter
    * @param height {Number} the vertical range of the filter
    */
    PIXI.WebGLFilterManager.prototype.applyFilterPass = function(filter, filterArea, width, height)
    {
        // use program
        var gl = this.gl;
        var shader = filter.shaders[gl.id];

        if(!shader)
        {
            shader = new PIXI.PixiShader(gl);

            shader.fragmentSrc = filter.fragmentSrc;
            shader.uniforms = filter.uniforms;
            shader.init();

            filter.shaders[gl.id] = shader;
        }

        // set the shader
        this.renderSession.shaderManager.setShader(shader);

    //    gl.useProgram(shader.program);

        gl.uniform2f(shader.projectionVector, width/2, -height/2);
        gl.uniform2f(shader.offsetVector, 0,0);

        if(filter.uniforms.dimensions)
        {
            filter.uniforms.dimensions.value[0] = this.width;//width;
            filter.uniforms.dimensions.value[1] = this.height;//height;
            filter.uniforms.dimensions.value[2] = this.vertexArray[0];
            filter.uniforms.dimensions.value[3] = this.vertexArray[5];//filterArea.height;
        }

      //  console.log(this.uvArray )
        shader.syncUniforms();

        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
        gl.vertexAttribPointer(shader.aVertexPosition, 2, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.uvBuffer);
        gl.vertexAttribPointer(shader.aTextureCoord, 2, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuffer);
        gl.vertexAttribPointer(shader.colorAttribute, 2, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);

        // draw the filter...
        gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0 );

        this.renderSession.drawCount++;
    };

    /**
    * Initialises the shader buffers
    * @method initShaderBuffers
    */
    PIXI.WebGLFilterManager.prototype.initShaderBuffers = function()
    {
        var gl = this.gl;

        // create some buffers
        this.vertexBuffer = gl.createBuffer();
        this.uvBuffer = gl.createBuffer();
        this.colorBuffer = gl.createBuffer();
        this.indexBuffer = gl.createBuffer();


        // bind and upload the vertexs..
        // keep a reference to the vertexFloatData..
        this.vertexArray = new Float32Array([0.0, 0.0,
                                             1.0, 0.0,
                                             0.0, 1.0,
                                             1.0, 1.0]);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
        gl.bufferData(
        gl.ARRAY_BUFFER,
        this.vertexArray,
        gl.STATIC_DRAW);


        // bind and upload the uv buffer
        this.uvArray = new Float32Array([0.0, 0.0,
                                         1.0, 0.0,
                                         0.0, 1.0,
                                         1.0, 1.0]);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.uvBuffer);
        gl.bufferData(
        gl.ARRAY_BUFFER,
        this.uvArray,
        gl.STATIC_DRAW);

        this.colorArray = new Float32Array([1.0, 0xFFFFFF,
                                            1.0, 0xFFFFFF,
                                            1.0, 0xFFFFFF,
                                            1.0, 0xFFFFFF]);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuffer);
        gl.bufferData(
        gl.ARRAY_BUFFER,
        this.colorArray,
        gl.STATIC_DRAW);

        // bind and upload the index
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
        gl.bufferData(
        gl.ELEMENT_ARRAY_BUFFER,
        new Uint16Array([0, 1, 2, 1, 3, 2]),
        gl.STATIC_DRAW);
    };

    /**
    * Destroys the filter and removes it from the filter stack
    * @method destroy
    */
    PIXI.WebGLFilterManager.prototype.destroy = function()
    {
        var gl = this.gl;

        this.filterStack = null;
        
        this.offsetX = 0;
        this.offsetY = 0;

        // destroy textures
        for (var i = 0; i < this.texturePool.length; i++) {
            this.texturePool[i].destroy();
        }
        
        this.texturePool = null;

        //destroy buffers..
        gl.deleteBuffer(this.vertexBuffer);
        gl.deleteBuffer(this.uvBuffer);
        gl.deleteBuffer(this.colorBuffer);
        gl.deleteBuffer(this.indexBuffer);
    };

    /**
     * @author Mat Groves http://matgroves.com/ @Doormat23
     */

    /**
    * @class FilterTexture
    * @constructor
    * @param gl {WebGLContext} the current WebGL drawing context
    * @param width {Number} the horizontal range of the filter
    * @param height {Number} the vertical range of the filter
    * @param scaleMode {Number} Should be one of the PIXI.scaleMode consts
    * @private
    */
    PIXI.FilterTexture = function(gl, width, height, scaleMode)
    {
        /**
         * @property gl
         * @type WebGLContext
         */
        this.gl = gl;

        // next time to create a frame buffer and texture
        this.frameBuffer = gl.createFramebuffer();
        this.texture = gl.createTexture();

        scaleMode = scaleMode || PIXI.scaleModes.DEFAULT;

        gl.bindTexture(gl.TEXTURE_2D,  this.texture);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, scaleMode === PIXI.scaleModes.LINEAR ? gl.LINEAR : gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, scaleMode === PIXI.scaleModes.LINEAR ? gl.LINEAR : gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.bindFramebuffer(gl.FRAMEBUFFER, this.framebuffer );

        gl.bindFramebuffer(gl.FRAMEBUFFER, this.frameBuffer );
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.texture, 0);

        // required for masking a mask??
        this.renderBuffer = gl.createRenderbuffer();
        gl.bindRenderbuffer(gl.RENDERBUFFER, this.renderBuffer);
        gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_STENCIL_ATTACHMENT, gl.RENDERBUFFER, this.renderBuffer);
      
        this.resize(width, height);
    };


    /**
    * Clears the filter texture
    * @method clear
    */
    PIXI.FilterTexture.prototype.clear = function()
    {
        var gl = this.gl;
        
        gl.clearColor(0,0,0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT);
    };

    /**
     * Resizes the texture to the specified width and height
     *
     * @method resize
     * @param width {Number} the new width of the texture
     * @param height {Number} the new height of the texture
     */
    PIXI.FilterTexture.prototype.resize = function(width, height)
    {
        if(this.width === width && this.height === height) return;

        this.width = width;
        this.height = height;

        var gl = this.gl;

        gl.bindTexture(gl.TEXTURE_2D,  this.texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA,  width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);

        // update the stencil buffer width and height
        gl.bindRenderbuffer(gl.RENDERBUFFER, this.renderBuffer);
        gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_STENCIL, width, height);
    };

    /**
    * Destroys the filter texture
    * @method destroy
    */
    PIXI.FilterTexture.prototype.destroy = function()
    {
        var gl = this.gl;
        gl.deleteFramebuffer( this.frameBuffer );
        gl.deleteTexture( this.texture );

        this.frameBuffer = null;
        this.texture = null;
    };

    /**
     * @author Mat Groves
     * 
     * 
     */
    /**
     * A set of functions used to handle masking
     *
     * @class CanvasMaskManager
     */
    PIXI.CanvasMaskManager = function()
    {
        
    };

    /**
     * This method adds it to the current stack of masks
     *
     * @method pushMask
     * @param maskData the maskData that will be pushed
     * @param context {Context2D} the 2d drawing method of the canvas
     */
    PIXI.CanvasMaskManager.prototype.pushMask = function(maskData, context)
    {
        context.save();
        
        var cacheAlpha = maskData.alpha;
        var transform = maskData.worldTransform;

        context.setTransform(transform.a, transform.c, transform.b, transform.d, transform.tx, transform.ty);

        PIXI.CanvasGraphics.renderGraphicsMask(maskData, context);

        context.clip();

        maskData.worldAlpha = cacheAlpha;
    };

    /**
     * Restores the current drawing context to the state it was before the mask was applied
     *
     * @method popMask
     * @param context {Context2D} the 2d drawing method of the canvas
     */
    PIXI.CanvasMaskManager.prototype.popMask = function(context)
    {
        context.restore();
    };

    /**
     * @author Mat Groves
     * 
     * 
     */

    /**
     * @class CanvasTinter
     * @constructor
     * @static
     */
    PIXI.CanvasTinter = function()
    {
        /// this.textureCach
    };

    //PIXI.CanvasTinter.cachTint = true;
        

    /**
     * Basically this method just needs a sprite and a color and tints the sprite 
     * with the given color
     * 
     * @method getTintedTexture 
     * @param sprite {Sprite} the sprite to tint
     * @param color {Number} the color to use to tint the sprite with
     */
    PIXI.CanvasTinter.getTintedTexture = function(sprite, color)
    {

        var texture = sprite.texture;

        color = PIXI.CanvasTinter.roundColor(color);

        var stringColor = "#" + ("00000" + ( color | 0).toString(16)).substr(-6);
       
        texture.tintCache = texture.tintCache || {};

        if(texture.tintCache[stringColor]) return texture.tintCache[stringColor];

         // clone texture..
        var canvas = PIXI.CanvasTinter.canvas || document.createElement("canvas");
        
        //PIXI.CanvasTinter.tintWithPerPixel(texture, stringColor, canvas);

        
        PIXI.CanvasTinter.tintMethod(texture, color, canvas);

        if(PIXI.CanvasTinter.convertTintToImage)
        {
            // is this better?
            var tintImage = new Image();
            tintImage.src = canvas.toDataURL();

            texture.tintCache[stringColor] = tintImage;
        }
        else
        {
          
            texture.tintCache[stringColor] = canvas;
            // if we are not converting the texture to an image then we need to lose the reference to the canvas
            PIXI.CanvasTinter.canvas = null;

        }

        return canvas;
    };

    /**
     * Tint a texture using the "multiply" operation
     * @method tintWithMultiply
     * @param texture {texture} the texture to tint
     * @param color {Number} the color to use to tint the sprite with
     * @param canvas {HTMLCanvasElement} the current canvas
     */
    PIXI.CanvasTinter.tintWithMultiply = function(texture, color, canvas)
    {
        var context = canvas.getContext( "2d" );

        var frame = texture.frame;

        canvas.width = frame.width;
        canvas.height = frame.height;

        context.fillStyle = "#" + ("00000" + ( color | 0).toString(16)).substr(-6);
        
        context.fillRect(0, 0, frame.width, frame.height);
        
        context.globalCompositeOperation = "multiply";

        context.drawImage(texture.baseTexture.source,
                               frame.x,
                               frame.y,
                               frame.width,
                               frame.height,
                               0,
                               0,
                               frame.width,
                               frame.height);

        context.globalCompositeOperation = "destination-atop";
        
        context.drawImage(texture.baseTexture.source,
                               frame.x,
                               frame.y,
                               frame.width,
                               frame.height,
                               0,
                               0,
                               frame.width,
                               frame.height);
    };

    /**
     * Tint a texture using the "overlay" operation
     * @method tintWithOverlay
     * @param texture {texture} the texture to tint
     * @param color {Number} the color to use to tint the sprite with
     * @param canvas {HTMLCanvasElement} the current canvas
     */
    PIXI.CanvasTinter.tintWithOverlay = function(texture, color, canvas)
    {
        var context = canvas.getContext( "2d" );

        var frame = texture.frame;

        canvas.width = frame.width;
        canvas.height = frame.height;

        
        
        context.globalCompositeOperation = "copy";
        context.fillStyle = "#" + ("00000" + ( color | 0).toString(16)).substr(-6);
        context.fillRect(0, 0, frame.width, frame.height);

        context.globalCompositeOperation = "destination-atop";
        context.drawImage(texture.baseTexture.source,
                               frame.x,
                               frame.y,
                               frame.width,
                               frame.height,
                               0,
                               0,
                               frame.width,
                               frame.height);

        
        //context.globalCompositeOperation = "copy";

    };

    /**
     * Tint a texture pixel per pixel
     * @method tintPerPixel
     * @param texture {texture} the texture to tint
     * @param color {Number} the color to use to tint the sprite with
     * @param canvas {HTMLCanvasElement} the current canvas
     */
    PIXI.CanvasTinter.tintWithPerPixel = function(texture, color, canvas)
    {
        var context = canvas.getContext( "2d" );

        var frame = texture.frame;

        canvas.width = frame.width;
        canvas.height = frame.height;
      
        context.globalCompositeOperation = "copy";
        context.drawImage(texture.baseTexture.source,
                               frame.x,
                               frame.y,
                               frame.width,
                               frame.height,
                               0,
                               0,
                               frame.width,
                               frame.height);

        var rgbValues = PIXI.hex2rgb(color);
        var r = rgbValues[0], g = rgbValues[1], b = rgbValues[2];

        var pixelData = context.getImageData(0, 0, frame.width, frame.height);

        var pixels = pixelData.data;

        for (var i = 0; i < pixels.length; i += 4)
        {
            pixels[i+0] *= r;
            pixels[i+1] *= g;
            pixels[i+2] *= b;
        }

        context.putImageData(pixelData, 0, 0);
    };

    /**
     * Rounds the specified color according to the PIXI.CanvasTinter.cacheStepsPerColorChannel
     * @method roundColor
     * @param color {number} the color to round, should be a hex color
     */
    PIXI.CanvasTinter.roundColor = function(color)
    {
        var step = PIXI.CanvasTinter.cacheStepsPerColorChannel;

        var rgbValues = PIXI.hex2rgb(color);

        rgbValues[0] = Math.min(255, (rgbValues[0] / step) * step);
        rgbValues[1] = Math.min(255, (rgbValues[1] / step) * step);
        rgbValues[2] = Math.min(255, (rgbValues[2] / step) * step);

        return PIXI.rgb2hex(rgbValues);
    };

    /**
     * 
     * Number of steps which will be used as a cap when rounding colors
     *
     * @property cacheStepsPerColorChannel
     * @type Number
     */
    PIXI.CanvasTinter.cacheStepsPerColorChannel = 8;
    /**
     * 
     * Number of steps which will be used as a cap when rounding colors
     *
     * @property convertTintToImage
     * @type Boolean
     */
    PIXI.CanvasTinter.convertTintToImage = false;

    /**
     * Whether or not the Canvas BlendModes are supported, consequently the ability to tint using the multiply method
     *
     * @property canUseMultiply
     * @type Boolean
     */
    PIXI.CanvasTinter.canUseMultiply = PIXI.canUseNewCanvasBlendModes();

    PIXI.CanvasTinter.tintMethod = PIXI.CanvasTinter.canUseMultiply ? PIXI.CanvasTinter.tintWithMultiply :  PIXI.CanvasTinter.tintWithPerPixel;


    /**
     * @author Mat Groves http://matgroves.com/ @Doormat23
     */

    /**
     * the CanvasRenderer draws the stage and all its content onto a 2d canvas. This renderer should be used for browsers that do not support webGL.
     * Dont forget to add the view to your DOM or you will not see anything :)
     *
     * @class CanvasRenderer
     * @constructor
     * @param width=800 {Number} the width of the canvas view
     * @param height=600 {Number} the height of the canvas view
     * @param [view] {HTMLCanvasElement} the canvas to use as a view, optional
     * @param [transparent=false] {Boolean} the transparency of the render view, default false
     */
    PIXI.CanvasRenderer = function(width, height, view, transparent)
    {
        if(!PIXI.defaultRenderer)
        {
            PIXI.sayHello("Canvas");
            PIXI.defaultRenderer = this;
        }

        this.type = PIXI.CANVAS_RENDERER;

        /**
         * This sets if the CanvasRenderer will clear the canvas or not before the new render pass.
         * If the Stage is NOT transparent Pixi will use a canvas sized fillRect operation every frame to set the canvas background color.
         * If the Stage is transparent Pixi will use clearRect to clear the canvas every frame.
         * Disable this by setting this to false. For example if your game has a canvas filling background image you often don't need this set.
         *
         * @property clearBeforeRender
         * @type Boolean
         * @default
         */
        this.clearBeforeRender = true;

        /**
         * Whether the render view is transparent
         *
         * @property transparent
         * @type Boolean
         */
        this.transparent = !!transparent;

        if(!PIXI.blendModesCanvas)
        {
            PIXI.blendModesCanvas = [];

            if(PIXI.canUseNewCanvasBlendModes())
            {
                PIXI.blendModesCanvas[PIXI.blendModes.NORMAL]   = "source-over";
                PIXI.blendModesCanvas[PIXI.blendModes.ADD]      = "lighter"; //IS THIS OK???
                PIXI.blendModesCanvas[PIXI.blendModes.MULTIPLY] = "multiply";
                PIXI.blendModesCanvas[PIXI.blendModes.SCREEN]   = "screen";
                PIXI.blendModesCanvas[PIXI.blendModes.OVERLAY]  = "overlay";
                PIXI.blendModesCanvas[PIXI.blendModes.DARKEN]   = "darken";
                PIXI.blendModesCanvas[PIXI.blendModes.LIGHTEN]  = "lighten";
                PIXI.blendModesCanvas[PIXI.blendModes.COLOR_DODGE] = "color-dodge";
                PIXI.blendModesCanvas[PIXI.blendModes.COLOR_BURN] = "color-burn";
                PIXI.blendModesCanvas[PIXI.blendModes.HARD_LIGHT] = "hard-light";
                PIXI.blendModesCanvas[PIXI.blendModes.SOFT_LIGHT] = "soft-light";
                PIXI.blendModesCanvas[PIXI.blendModes.DIFFERENCE] = "difference";
                PIXI.blendModesCanvas[PIXI.blendModes.EXCLUSION] = "exclusion";
                PIXI.blendModesCanvas[PIXI.blendModes.HUE]       = "hue";
                PIXI.blendModesCanvas[PIXI.blendModes.SATURATION] = "saturation";
                PIXI.blendModesCanvas[PIXI.blendModes.COLOR]      = "color";
                PIXI.blendModesCanvas[PIXI.blendModes.LUMINOSITY] = "luminosity";
            }
            else
            {
                // this means that the browser does not support the cool new blend modes in canvas "cough" ie "cough"
                PIXI.blendModesCanvas[PIXI.blendModes.NORMAL]   = "source-over";
                PIXI.blendModesCanvas[PIXI.blendModes.ADD]      = "lighter"; //IS THIS OK???
                PIXI.blendModesCanvas[PIXI.blendModes.MULTIPLY] = "source-over";
                PIXI.blendModesCanvas[PIXI.blendModes.SCREEN]   = "source-over";
                PIXI.blendModesCanvas[PIXI.blendModes.OVERLAY]  = "source-over";
                PIXI.blendModesCanvas[PIXI.blendModes.DARKEN]   = "source-over";
                PIXI.blendModesCanvas[PIXI.blendModes.LIGHTEN]  = "source-over";
                PIXI.blendModesCanvas[PIXI.blendModes.COLOR_DODGE] = "source-over";
                PIXI.blendModesCanvas[PIXI.blendModes.COLOR_BURN] = "source-over";
                PIXI.blendModesCanvas[PIXI.blendModes.HARD_LIGHT] = "source-over";
                PIXI.blendModesCanvas[PIXI.blendModes.SOFT_LIGHT] = "source-over";
                PIXI.blendModesCanvas[PIXI.blendModes.DIFFERENCE] = "source-over";
                PIXI.blendModesCanvas[PIXI.blendModes.EXCLUSION] = "source-over";
                PIXI.blendModesCanvas[PIXI.blendModes.HUE]       = "source-over";
                PIXI.blendModesCanvas[PIXI.blendModes.SATURATION] = "source-over";
                PIXI.blendModesCanvas[PIXI.blendModes.COLOR]      = "source-over";
                PIXI.blendModesCanvas[PIXI.blendModes.LUMINOSITY] = "source-over";
            }
        }

        /**
         * The width of the canvas view
         *
         * @property width
         * @type Number
         * @default 800
         */
        this.width = width || 800;

        /**
         * The height of the canvas view
         *
         * @property height
         * @type Number
         * @default 600
         */
        this.height = height || 600;

        /**
         * The canvas element that everything is drawn to
         *
         * @property view
         * @type HTMLCanvasElement
         */
        this.view = view || document.createElement( "canvas" );

        /**
         * The canvas 2d context that everything is drawn with
         * @property context
         * @type HTMLCanvasElement 2d Context
         */
        this.context = this.view.getContext( "2d", { alpha: this.transparent } );

        this.refresh = true;
        // hack to enable some hardware acceleration!
        //this.view.style["transform"] = "translatez(0)";

        this.view.width = this.width;
        this.view.height = this.height;
        this.count = 0;

        /**
         * Instance of a PIXI.CanvasMaskManager, handles masking when using the canvas renderer
         * @property CanvasMaskManager
         * @type CanvasMaskManager
         */
        this.maskManager = new PIXI.CanvasMaskManager();

        /**
         * The render session is just a bunch of parameter used for rendering
         * @property renderSession
         * @type Object
         */
        this.renderSession = {
            context: this.context,
            maskManager: this.maskManager,
            scaleMode: null,
            smoothProperty: null,

            /**
             * If true Pixi will Math.floor() x/y values when rendering, stopping pixel interpolation.
             * Handy for crisp pixel art and speed on legacy devices.
             *
             */
            roundPixels: false
        };

        if("imageSmoothingEnabled" in this.context)
            this.renderSession.smoothProperty = "imageSmoothingEnabled";
        else if("webkitImageSmoothingEnabled" in this.context)
            this.renderSession.smoothProperty = "webkitImageSmoothingEnabled";
        else if("mozImageSmoothingEnabled" in this.context)
            this.renderSession.smoothProperty = "mozImageSmoothingEnabled";
        else if("oImageSmoothingEnabled" in this.context)
            this.renderSession.smoothProperty = "oImageSmoothingEnabled";
    };

    // constructor
    PIXI.CanvasRenderer.prototype.constructor = PIXI.CanvasRenderer;

    /**
     * Renders the stage to its canvas view
     *
     * @method render
     * @param stage {Stage} the Stage element to be rendered
     */
    PIXI.CanvasRenderer.prototype.render = function(stage)
    {
        // update textures if need be
        PIXI.texturesToUpdate.length = 0;
        PIXI.texturesToDestroy.length = 0;

        stage.updateTransform();

        this.context.setTransform(1,0,0,1,0,0);
        this.context.globalAlpha = 1;

        if (navigator.isCocoonJS && this.view.screencanvas) {
            this.context.fillStyle = "black";
            this.context.clear();
        }

        if (!this.transparent && this.clearBeforeRender)
        {
            this.context.fillStyle = stage.backgroundColorString;
            this.context.fillRect(0, 0, this.width, this.height);
        }
        else if (this.transparent && this.clearBeforeRender)
        {
            this.context.clearRect(0, 0, this.width, this.height);
        }

        this.renderDisplayObject(stage);

        // run interaction!
        if(stage.interactive)
        {
            //need to add some events!
            if(!stage._interactiveEventsAdded)
            {
                stage._interactiveEventsAdded = true;
                stage.interactionManager.setTarget(this);
            }
        }

        // remove frame updates..
        if(PIXI.Texture.frameUpdates.length > 0)
        {
            PIXI.Texture.frameUpdates.length = 0;
        }
    };

    /**
     * Resizes the canvas view to the specified width and height
     *
     * @method resize
     * @param width {Number} the new width of the canvas view
     * @param height {Number} the new height of the canvas view
     */
    PIXI.CanvasRenderer.prototype.resize = function(width, height)
    {
        this.width = width;
        this.height = height;

        this.view.width = width;
        this.view.height = height;
    };

    /**
     * Renders a display object
     *
     * @method renderDisplayObject
     * @param displayObject {DisplayObject} The displayObject to render
     * @param context {Context2D} the context 2d method of the canvas
     * @private
     */
    PIXI.CanvasRenderer.prototype.renderDisplayObject = function(displayObject, context)
    {
        // no longer recursive!
        //var transform;
        //var context = this.context;

        this.renderSession.context = context || this.context;
        displayObject._renderCanvas(this.renderSession);
    };

    /**
     * Renders a flat strip
     *
     * @method renderStripFlat
     * @param strip {Strip} The Strip to render
     * @private
     */
    PIXI.CanvasRenderer.prototype.renderStripFlat = function(strip)
    {
        var context = this.context;
        var verticies = strip.verticies;

        var length = verticies.length/2;
        this.count++;

        context.beginPath();
        for (var i=1; i < length-2; i++)
        {
            // draw some triangles!
            var index = i*2;

            var x0 = verticies[index],   x1 = verticies[index+2], x2 = verticies[index+4];
            var y0 = verticies[index+1], y1 = verticies[index+3], y2 = verticies[index+5];

            context.moveTo(x0, y0);
            context.lineTo(x1, y1);
            context.lineTo(x2, y2);
        }

        context.fillStyle = "#FF0000";
        context.fill();
        context.closePath();
    };

    /**
     * Renders a strip
     *
     * @method renderStrip
     * @param strip {Strip} The Strip to render
     * @private
     */
    PIXI.CanvasRenderer.prototype.renderStrip = function(strip)
    {
        var context = this.context;

        // draw triangles!!
        var verticies = strip.verticies;
        var uvs = strip.uvs;

        var length = verticies.length/2;
        this.count++;

        for (var i = 1; i < length-2; i++)
        {
            // draw some triangles!
            var index = i*2;

            var x0 = verticies[index],   x1 = verticies[index+2], x2 = verticies[index+4];
            var y0 = verticies[index+1], y1 = verticies[index+3], y2 = verticies[index+5];

            var u0 = uvs[index] * strip.texture.width,   u1 = uvs[index+2] * strip.texture.width, u2 = uvs[index+4]* strip.texture.width;
            var v0 = uvs[index+1]* strip.texture.height, v1 = uvs[index+3] * strip.texture.height, v2 = uvs[index+5]* strip.texture.height;

            context.save();
            context.beginPath();
            context.moveTo(x0, y0);
            context.lineTo(x1, y1);
            context.lineTo(x2, y2);
            context.closePath();

            context.clip();

            // Compute matrix transform
            var delta = u0*v1 + v0*u2 + u1*v2 - v1*u2 - v0*u1 - u0*v2;
            var deltaA = x0*v1 + v0*x2 + x1*v2 - v1*x2 - v0*x1 - x0*v2;
            var deltaB = u0*x1 + x0*u2 + u1*x2 - x1*u2 - x0*u1 - u0*x2;
            var deltaC = u0*v1*x2 + v0*x1*u2 + x0*u1*v2 - x0*v1*u2 - v0*u1*x2 - u0*x1*v2;
            var deltaD = y0*v1 + v0*y2 + y1*v2 - v1*y2 - v0*y1 - y0*v2;
            var deltaE = u0*y1 + y0*u2 + u1*y2 - y1*u2 - y0*u1 - u0*y2;
            var deltaF = u0*v1*y2 + v0*y1*u2 + y0*u1*v2 - y0*v1*u2 - v0*u1*y2 - u0*y1*v2;

            context.transform(deltaA / delta, deltaD / delta,
                                deltaB / delta, deltaE / delta,
                                deltaC / delta, deltaF / delta);

            context.drawImage(strip.texture.baseTexture.source, 0, 0);
            context.restore();
        }
    };

    /**
     * Creates a Canvas element of the given size
     *
     * @method CanvasBuffer
     * @param width {Number} the width for the newly created canvas
     * @param height {Number} the height for the newly created canvas
     * @static
     * @private
     */
    PIXI.CanvasBuffer = function(width, height)
    {
        this.width = width;
        this.height = height;

        this.canvas = document.createElement( "canvas" );
        this.context = this.canvas.getContext( "2d" );

        this.canvas.width = width;
        this.canvas.height = height;
    };

    /**
     * Clears the canvas that was created by the CanvasBuffer class
     *
     * @method clear
     * @private
     */
    PIXI.CanvasBuffer.prototype.clear = function()
    {
        this.context.clearRect(0,0, this.width, this.height);
    };

    /**
     * Resizes the canvas that was created by the CanvasBuffer class to the specified width and height
     *
     * @method resize
     * @param width {Number} the new width of the canvas
     * @param height {Number} the new height of the canvas
     * @private
     */

    PIXI.CanvasBuffer.prototype.resize = function(width, height)
    {
        this.width = this.canvas.width = width;
        this.height = this.canvas.height = height;
    };


    /**
     * @author Mat Groves http://matgroves.com/ @Doormat23
     */


    /**
     * A set of functions used by the canvas renderer to draw the primitive graphics data
     *
     * @class CanvasGraphics
     */
    PIXI.CanvasGraphics = function()
    {

    };


    /*
     * Renders the graphics object
     *
     * @static
     * @private
     * @method renderGraphics
     * @param graphics {Graphics} the actual graphics object to render
     * @param context {Context2D} the 2d drawing method of the canvas
     */
    PIXI.CanvasGraphics.renderGraphics = function(graphics, context)
    {
        var worldAlpha = graphics.worldAlpha;
        var color = '';

        for (var i = 0; i < graphics.graphicsData.length; i++)
        {
            var data = graphics.graphicsData[i];
            var points = data.points;

            context.strokeStyle = color = '#' + ('00000' + ( data.lineColor | 0).toString(16)).substr(-6);

            context.lineWidth = data.lineWidth;

            if(data.type === PIXI.Graphics.POLY)
            {
                context.beginPath();

                context.moveTo(points[0], points[1]);

                for (var j=1; j < points.length/2; j++)
                {
                    context.lineTo(points[j * 2], points[j * 2 + 1]);
                }

                // if the first and last point are the same close the path - much neater :)
                if(points[0] === points[points.length-2] && points[1] === points[points.length-1])
                {
                    context.closePath();
                }

                if(data.fill)
                {
                    context.globalAlpha = data.fillAlpha * worldAlpha;
                    context.fillStyle = color = '#' + ('00000' + ( data.fillColor | 0).toString(16)).substr(-6);
                    context.fill();
                }
                if(data.lineWidth)
                {
                    context.globalAlpha = data.lineAlpha * worldAlpha;
                    context.stroke();
                }
            }
            else if(data.type === PIXI.Graphics.RECT)
            {

                if(data.fillColor || data.fillColor === 0)
                {
                    context.globalAlpha = data.fillAlpha * worldAlpha;
                    context.fillStyle = color = '#' + ('00000' + ( data.fillColor | 0).toString(16)).substr(-6);
                    context.fillRect(points[0], points[1], points[2], points[3]);

                }
                if(data.lineWidth)
                {
                    context.globalAlpha = data.lineAlpha * worldAlpha;
                    context.strokeRect(points[0], points[1], points[2], points[3]);
                }

            }
            else if(data.type === PIXI.Graphics.CIRC)
            {
                // TODO - need to be Undefined!
                context.beginPath();
                context.arc(points[0], points[1], points[2],0,2*Math.PI);
                context.closePath();

                if(data.fill)
                {
                    context.globalAlpha = data.fillAlpha * worldAlpha;
                    context.fillStyle = color = '#' + ('00000' + ( data.fillColor | 0).toString(16)).substr(-6);
                    context.fill();
                }
                if(data.lineWidth)
                {
                    context.globalAlpha = data.lineAlpha * worldAlpha;
                    context.stroke();
                }
            }
            else if(data.type === PIXI.Graphics.ELIP)
            {

                // ellipse code taken from: http://stackoverflow.com/questions/2172798/how-to-draw-an-oval-in-html5-canvas

                var ellipseData =  data.points;

                var w = ellipseData[2] * 2;
                var h = ellipseData[3] * 2;

                var x = ellipseData[0] - w/2;
                var y = ellipseData[1] - h/2;

                context.beginPath();

                var kappa = 0.5522848,
                    ox = (w / 2) * kappa, // control point offset horizontal
                    oy = (h / 2) * kappa, // control point offset vertical
                    xe = x + w,           // x-end
                    ye = y + h,           // y-end
                    xm = x + w / 2,       // x-middle
                    ym = y + h / 2;       // y-middle

                context.moveTo(x, ym);
                context.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
                context.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
                context.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
                context.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);

                context.closePath();

                if(data.fill)
                {
                    context.globalAlpha = data.fillAlpha * worldAlpha;
                    context.fillStyle = color = '#' + ('00000' + ( data.fillColor | 0).toString(16)).substr(-6);
                    context.fill();
                }
                if(data.lineWidth)
                {
                    context.globalAlpha = data.lineAlpha * worldAlpha;
                    context.stroke();
                }
            }
            else if (data.type === PIXI.Graphics.RREC)
            {
                var rx = points[0];
                var ry = points[1];
                var width = points[2];
                var height = points[3];
                var radius = points[4];

                var maxRadius = Math.min(width, height) / 2 | 0;
                radius = radius > maxRadius ? maxRadius : radius;

                context.beginPath();
                context.moveTo(rx, ry + radius);
                context.lineTo(rx, ry + height - radius);
                context.quadraticCurveTo(rx, ry + height, rx + radius, ry + height);
                context.lineTo(rx + width - radius, ry + height);
                context.quadraticCurveTo(rx + width, ry + height, rx + width, ry + height - radius);
                context.lineTo(rx + width, ry + radius);
                context.quadraticCurveTo(rx + width, ry, rx + width - radius, ry);
                context.lineTo(rx + radius, ry);
                context.quadraticCurveTo(rx, ry, rx, ry + radius);
                context.closePath();

                if(data.fillColor || data.fillColor === 0)
                {
                    context.globalAlpha = data.fillAlpha * worldAlpha;
                    context.fillStyle = color = '#' + ('00000' + ( data.fillColor | 0).toString(16)).substr(-6);
                    context.fill();

                }
                if(data.lineWidth)
                {
                    context.globalAlpha = data.lineAlpha * worldAlpha;
                    context.stroke();
                }
            }
        }
    };

    /*
     * Renders a graphics mask
     *
     * @static
     * @private
     * @method renderGraphicsMask
     * @param graphics {Graphics} the graphics which will be used as a mask
     * @param context {Context2D} the context 2d method of the canvas
     */
    PIXI.CanvasGraphics.renderGraphicsMask = function(graphics, context)
    {
        var len = graphics.graphicsData.length;

        if(len === 0) return;

        if(len > 1)
        {
            len = 1;
            window.console.log('Pixi.js warning: masks in canvas can only mask using the first path in the graphics object');
        }

        for (var i = 0; i < 1; i++)
        {
            var data = graphics.graphicsData[i];
            var points = data.points;

            if(data.type === PIXI.Graphics.POLY)
            {
                context.beginPath();
                context.moveTo(points[0], points[1]);

                for (var j=1; j < points.length/2; j++)
                {
                    context.lineTo(points[j * 2], points[j * 2 + 1]);
                }

                // if the first and last point are the same close the path - much neater :)
                if(points[0] === points[points.length-2] && points[1] === points[points.length-1])
                {
                    context.closePath();
                }

            }
            else if(data.type === PIXI.Graphics.RECT)
            {
                context.beginPath();
                context.rect(points[0], points[1], points[2], points[3]);
                context.closePath();
            }
            else if(data.type === PIXI.Graphics.CIRC)
            {
                // TODO - need to be Undefined!
                context.beginPath();
                context.arc(points[0], points[1], points[2],0,2*Math.PI);
                context.closePath();
            }
            else if(data.type === PIXI.Graphics.ELIP)
            {

                // ellipse code taken from: http://stackoverflow.com/questions/2172798/how-to-draw-an-oval-in-html5-canvas
                var ellipseData =  data.points;

                var w = ellipseData[2] * 2;
                var h = ellipseData[3] * 2;

                var x = ellipseData[0] - w/2;
                var y = ellipseData[1] - h/2;

                context.beginPath();

                var kappa = 0.5522848,
                    ox = (w / 2) * kappa, // control point offset horizontal
                    oy = (h / 2) * kappa, // control point offset vertical
                    xe = x + w,           // x-end
                    ye = y + h,           // y-end
                    xm = x + w / 2,       // x-middle
                    ym = y + h / 2;       // y-middle

                context.moveTo(x, ym);
                context.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
                context.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
                context.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
                context.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);
                context.closePath();
            }
            else if (data.type === PIXI.Graphics.RREC)
            {
                var rx = points[0];
                var ry = points[1];
                var width = points[2];
                var height = points[3];
                var radius = points[4];

                var maxRadius = Math.min(width, height) / 2 | 0;
                radius = radius > maxRadius ? maxRadius : radius;

                context.beginPath();
                context.moveTo(rx, ry + radius);
                context.lineTo(rx, ry + height - radius);
                context.quadraticCurveTo(rx, ry + height, rx + radius, ry + height);
                context.lineTo(rx + width - radius, ry + height);
                context.quadraticCurveTo(rx + width, ry + height, rx + width, ry + height - radius);
                context.lineTo(rx + width, ry + radius);
                context.quadraticCurveTo(rx + width, ry, rx + width - radius, ry);
                context.lineTo(rx + radius, ry);
                context.quadraticCurveTo(rx, ry, rx, ry + radius);
                context.closePath();
            }
        }
    };

    /**
     * @author Mat Groves http://matgroves.com/ @Doormat23
     */


    /**
     * The Graphics class contains a set of methods that you can use to create primitive shapes and lines.
     * It is important to know that with the webGL renderer only simple polygons can be filled at this stage
     * Complex polygons will not be filled. Heres an example of a complex polygon: http://www.goodboydigital.com/wp-content/uploads/2013/06/complexPolygon.png
     *
     * @class Graphics
     * @extends DisplayObjectContainer
     * @constructor
     */
    PIXI.Graphics = function()
    {
        PIXI.DisplayObjectContainer.call( this );

        this.renderable = true;

        /**
         * The alpha of the fill of this graphics object
         *
         * @property fillAlpha
         * @type Number
         */
        this.fillAlpha = 1;

        /**
         * The width of any lines drawn
         *
         * @property lineWidth
         * @type Number
         */
        this.lineWidth = 0;

        /**
         * The color of any lines drawn
         *
         * @property lineColor
         * @type String
         */
        this.lineColor = "black";

        /**
         * Graphics data
         *
         * @property graphicsData
         * @type Array
         * @private
         */
        this.graphicsData = [];


        /**
         * The tint applied to the graphic shape. This is a hex value
         *
         * @property tint
         * @type Number
         * @default 0xFFFFFF
         */
        this.tint = 0xFFFFFF;// * Math.random();
        
        /**
         * The blend mode to be applied to the graphic shape
         *
         * @property blendMode
         * @type Number
         * @default PIXI.blendModes.NORMAL;
         */
        this.blendMode = PIXI.blendModes.NORMAL;
        
        /**
         * Current path
         *
         * @property currentPath
         * @type Object
         * @private
         */
        this.currentPath = {points:[]};

        /**
         * Array containing some WebGL-related properties used by the WebGL renderer
         *
         * @property _webGL
         * @type Array
         * @private
         */
        this._webGL = [];

        /**
         * Whether this shape is being used as a mask
         *
         * @property isMask
         * @type isMask
         */
        this.isMask = false;

        /**
         * The bounds of the graphic shape as rectangle object
         *
         * @property bounds
         * @type Rectangle
         */
        this.bounds = null;

        /**
         * the bounds' padding used for bounds calculation
         *
         * @property boundsPadding
         * @type Number
         */
        this.boundsPadding = 10;

        /**
         * Used to detect if the graphics object has changed if this is set to true then the graphics object will be recalculated
         * 
         * @type {Boolean}
         */
        this.dirty = true;
    };

    // constructor
    PIXI.Graphics.prototype = Object.create( PIXI.DisplayObjectContainer.prototype );
    PIXI.Graphics.prototype.constructor = PIXI.Graphics;

    /**
     * If cacheAsBitmap is true the graphics object will then be rendered as if it was a sprite.
     * This is useful if your graphics element does not change often as it will speed up the rendering of the object
     * It is also usful as the graphics object will always be antialiased because it will be rendered using canvas
     * Not recommended if you are constanly redrawing the graphics element.
     *
     * @property cacheAsBitmap
     * @default false
     * @type Boolean
     * @private
     */
    Object.defineProperty(PIXI.Graphics.prototype, "cacheAsBitmap", {
        get: function() {
            return  this._cacheAsBitmap;
        },
        set: function(value) {
            this._cacheAsBitmap = value;

            if(this._cacheAsBitmap)
            {
                this._generateCachedSprite();
            }
            else
            {
                this.destroyCachedSprite();
                this.dirty = true;
            }

        }
    });


    /**
     * Specifies the line style used for subsequent calls to Graphics methods such as the lineTo() method or the drawCircle() method.
     *
     * @method lineStyle
     * @param lineWidth {Number} width of the line to draw, will update the object's stored style
     * @param color {Number} color of the line to draw, will update the object's stored style
     * @param alpha {Number} alpha of the line to draw, will update the object's stored style
     */
    PIXI.Graphics.prototype.lineStyle = function(lineWidth, color, alpha)
    {
        if (!this.currentPath.points.length) this.graphicsData.pop();

        this.lineWidth = lineWidth || 0;
        this.lineColor = color || 0;
        this.lineAlpha = (arguments.length < 3) ? 1 : alpha;

        this.currentPath = {lineWidth:this.lineWidth, lineColor:this.lineColor, lineAlpha:this.lineAlpha,
                            fillColor:this.fillColor, fillAlpha:this.fillAlpha, fill:this.filling, points:[], type:PIXI.Graphics.POLY};

        this.graphicsData.push(this.currentPath);

        return this;
    };

    /**
     * Moves the current drawing position to (x, y).
     *
     * @method moveTo
     * @param x {Number} the X coordinate to move to
     * @param y {Number} the Y coordinate to move to
     */
    PIXI.Graphics.prototype.moveTo = function(x, y)
    {
        if (!this.currentPath.points.length) this.graphicsData.pop();

        this.currentPath = this.currentPath = {lineWidth:this.lineWidth, lineColor:this.lineColor, lineAlpha:this.lineAlpha,
                            fillColor:this.fillColor, fillAlpha:this.fillAlpha, fill:this.filling, points:[], type:PIXI.Graphics.POLY};

        this.currentPath.points.push(x, y);

        this.graphicsData.push(this.currentPath);

        return this;
    };

    /**
     * Draws a line using the current line style from the current drawing position to (x, y);
     * the current drawing position is then set to (x, y).
     *
     * @method lineTo
     * @param x {Number} the X coordinate to draw to
     * @param y {Number} the Y coordinate to draw to
     */
    PIXI.Graphics.prototype.lineTo = function(x, y)
    {
        this.currentPath.points.push(x, y);
        this.dirty = true;

        return this;
    };

    /**
     * Calculate the points for a quadratic bezier curve.
     * Based on : https://stackoverflow.com/questions/785097/how-do-i-implement-a-bezier-curve-in-c
     *
     * @method quadraticCurveTo
     * @param  {number}   cpX   Control point x
     * @param  {number}   cpY   Control point y
     * @param  {number}   toX   Destination point x
     * @param  {number}   toY   Destination point y
     * @return {PIXI.Graphics}
     */
    PIXI.Graphics.prototype.quadraticCurveTo = function(cpX, cpY, toX, toY)
    {
        if( this.currentPath.points.length === 0)this.moveTo(0,0);

        var xa,
        ya,
        n = 20,
        points = this.currentPath.points;
        if(points.length === 0)this.moveTo(0, 0);
        

        var fromX = points[points.length-2];
        var fromY = points[points.length-1];

        var j = 0;
        for (var i = 1; i <= n; i++ )
        {
            j = i / n;

            xa = fromX + ( (cpX - fromX) * j );
            ya = fromY + ( (cpY - fromY) * j );

            points.push( xa + ( ((cpX + ( (toX - cpX) * j )) - xa) * j ),
                         ya + ( ((cpY + ( (toY - cpY) * j )) - ya) * j ) );
        }


        this.dirty = true;

        return this;
    };

    /**
     * Calculate the points for a bezier curve.
     *
     * @method bezierCurveTo
     * @param  {number}   cpX    Control point x
     * @param  {number}   cpY    Control point y
     * @param  {number}   cpX2   Second Control point x
     * @param  {number}   cpY2   Second Control point y
     * @param  {number}   toX    Destination point x
     * @param  {number}   toY    Destination point y
     * @return {PIXI.Graphics}
     */
    PIXI.Graphics.prototype.bezierCurveTo = function(cpX, cpY, cpX2, cpY2, toX, toY)
    {
        if( this.currentPath.points.length === 0)this.moveTo(0,0);

        var n = 20,
        dt,
        dt2,
        dt3,
        t2,
        t3,
        points = this.currentPath.points;

        var fromX = points[points.length-2];
        var fromY = points[points.length-1];
        
        var j = 0;

        for (var i=1; i<n; i++)
        {
            j = i / n;

            dt = (1 - j);
            dt2 = dt * dt;
            dt3 = dt2 * dt;

            t2 = j * j;
            t3 = t2 * j;
            
            points.push( dt3 * fromX + 3 * dt2 * j * cpX + 3 * dt * t2 * cpX2 + t3 * toX,
                         dt3 * fromY + 3 * dt2 * j * cpY + 3 * dt * t2 * cpY2 + t3 * toY);
            
        }
        
        this.dirty = true;

        return this;
    };

    /*
     * the arcTo() method creates an arc/curve between two tangents on the canvas.
     * 
     * "borrowed" from https://code.google.com/p/fxcanvas/ - thanks google!
     *
     * @method arcTo
     * @param  {number}   x1        The x-coordinate of the beginning of the arc
     * @param  {number}   y1        The y-coordinate of the beginning of the arc
     * @param  {number}   x2        The x-coordinate of the end of the arc
     * @param  {number}   y2        The y-coordinate of the end of the arc
     * @param  {number}   radius    The radius of the arc
     * @return {PIXI.Graphics}
     */
    PIXI.Graphics.prototype.arcTo = function(x1, y1, x2, y2, radius)
    {
        // check that path contains subpaths
        if( this.currentPath.points.length === 0)this.moveTo(x1, y1);
        
        var points = this.currentPath.points;
        var fromX = points[points.length-2];
        var fromY = points[points.length-1];

    //    points.push( x1,  y1);

        var a1 = fromY - y1;
        var b1 = fromX - x1;
        var a2 = y2   - y1;
        var b2 = x2   - x1;
        var mm = Math.abs(a1 * b2 - b1 * a2);

        if (mm < 1.0e-8 || radius === 0)
        {
            points.push(x1, y1);
        }
        else
        {
            var dd = a1 * a1 + b1 * b1;
            var cc = a2 * a2 + b2 * b2;
            var tt = a1 * a2 + b1 * b2;
            var k1 = radius * Math.sqrt(dd) / mm;
            var k2 = radius * Math.sqrt(cc) / mm;
            var j1 = k1 * tt / dd;
            var j2 = k2 * tt / cc;
            var cx = k1 * b2 + k2 * b1;
            var cy = k1 * a2 + k2 * a1;
            var px = b1 * (k2 + j1);
            var py = a1 * (k2 + j1);
            var qx = b2 * (k1 + j2);
            var qy = a2 * (k1 + j2);
            var startAngle = Math.atan2(py - cy, px - cx);
            var endAngle   = Math.atan2(qy - cy, qx - cx);
            // not required?
         //   points.push(px + x1 , py + y1);
            this.arc(cx + x1, cy + y1, radius, startAngle, endAngle, b1 * a2 > b2 * a1);
        }

        this.dirty = true;

        return this;
    };

    /**
     * The arc() method creates an arc/curve (used to create circles, or parts of circles).
     *
     * @method arc
     * @param  {number}   cx                The x-coordinate of the center of the circle
     * @param  {number}   cy                The y-coordinate of the center of the circle
     * @param  {number}   radius            The radius of the circle
     * @param  {number}   startAngle        The starting angle, in radians (0 is at the 3 o'clock position of the arc's circle)
     * @param  {number}   endAngle          The ending angle, in radians
     * @param  {number}   anticlockwise     Optional. Specifies whether the drawing should be counterclockwise or clockwise. False is default, and indicates clockwise, while true indicates counter-clockwise.
     * @return {PIXI.Graphics}
     */
    PIXI.Graphics.prototype.arc = function(cx, cy, radius, startAngle, endAngle, anticlockwise)
    {
        var startX = cx + Math.cos(startAngle) * radius;
        var startY = cy + Math.sin(startAngle) * radius;
        
        var points = this.currentPath.points;

        if(points.length !== 0 && points[points.length-2] !== startX || points[points.length-1] !== startY)
        {
            this.moveTo(startX, startY);
            points = this.currentPath.points;
        }

        if (startAngle === endAngle)return this;

        if( !anticlockwise && endAngle <= startAngle )
        {
            endAngle += Math.PI * 2;
        }
        else if( anticlockwise && startAngle <= endAngle )
        {
            startAngle += Math.PI * 2;
        }

        var sweep = anticlockwise ? (startAngle - endAngle) *-1 : (endAngle - startAngle);
        var segs =  ( Math.abs(sweep)/ (Math.PI * 2) ) * 40;

        if( sweep === 0 ) return this;

        var theta = sweep/(segs*2);
        var theta2 = theta*2;

        var cTheta = Math.cos(theta);
        var sTheta = Math.sin(theta);
        
        var segMinus = segs - 1;

        var remainder = ( segMinus % 1 ) / segMinus;

        for(var i=0; i<=segMinus; i++)
        {
            var real =  i + remainder * i;

        
            var angle = ((theta) + startAngle + (theta2 * real));

            var c = Math.cos(angle);
            var s = -Math.sin(angle);

            points.push(( (cTheta *  c) + (sTheta * s) ) * radius + cx,
                        ( (cTheta * -s) + (sTheta * c) ) * radius + cy);
        }

        this.dirty = true;

        return this;
    };

    /**
     * Draws a line using the current line style from the current drawing position to (x, y);
     * the current drawing position is then set to (x, y).
     *
     * @method lineTo
     * @param x {Number} the X coordinate to draw to
     * @param y {Number} the Y coordinate to draw to
     */
    PIXI.Graphics.prototype.drawPath = function(path)
    {
        if (!this.currentPath.points.length) this.graphicsData.pop();

        this.currentPath = this.currentPath = {lineWidth:this.lineWidth, lineColor:this.lineColor, lineAlpha:this.lineAlpha,
                            fillColor:this.fillColor, fillAlpha:this.fillAlpha, fill:this.filling, points:[], type:PIXI.Graphics.POLY};

        this.graphicsData.push(this.currentPath);

        this.currentPath.points = this.currentPath.points.concat(path);
        this.dirty = true;

        return this;
    };

    /**
     * Specifies a simple one-color fill that subsequent calls to other Graphics methods
     * (such as lineTo() or drawCircle()) use when drawing.
     *
     * @method beginFill
     * @param color {Number} the color of the fill
     * @param alpha {Number} the alpha of the fill
     */
    PIXI.Graphics.prototype.beginFill = function(color, alpha)
    {

        this.filling = true;
        this.fillColor = color || 0;
        this.fillAlpha = (arguments.length < 2) ? 1 : alpha;

        return this;
    };

    /**
     * Applies a fill to the lines and shapes that were added since the last call to the beginFill() method.
     *
     * @method endFill
     */
    PIXI.Graphics.prototype.endFill = function()
    {
        this.filling = false;
        this.fillColor = null;
        this.fillAlpha = 1;

        return this;
    };

    /**
     * @method drawRect
     *
     * @param x {Number} The X coord of the top-left of the rectangle
     * @param y {Number} The Y coord of the top-left of the rectangle
     * @param width {Number} The width of the rectangle
     * @param height {Number} The height of the rectangle
     */
    PIXI.Graphics.prototype.drawRect = function( x, y, width, height )
    {
        if (!this.currentPath.points.length) this.graphicsData.pop();

        this.currentPath = {lineWidth:this.lineWidth, lineColor:this.lineColor, lineAlpha:this.lineAlpha,
                            fillColor:this.fillColor, fillAlpha:this.fillAlpha, fill:this.filling,
                            points:[x, y, width, height], type:PIXI.Graphics.RECT};

        this.graphicsData.push(this.currentPath);
        this.dirty = true;

        return this;
    };

    /**
     * @method drawRoundedRect
     *
     * @param x {Number} The X coord of the top-left of the rectangle
     * @param y {Number} The Y coord of the top-left of the rectangle
     * @param width {Number} The width of the rectangle
     * @param height {Number} The height of the rectangle
     * @param radius {Number} Radius of the rectangle corners
     */
    PIXI.Graphics.prototype.drawRoundedRect = function( x, y, width, height, radius )
    {
        if (!this.currentPath.points.length) this.graphicsData.pop();

        this.currentPath = {lineWidth:this.lineWidth, lineColor:this.lineColor, lineAlpha:this.lineAlpha,
                            fillColor:this.fillColor, fillAlpha:this.fillAlpha, fill:this.filling,
                            points:[x, y, width, height, radius], type:PIXI.Graphics.RREC};

        this.graphicsData.push(this.currentPath);
        this.dirty = true;

        return this;
    };

    /**
     * Draws a circle.
     *
     * @method drawCircle
     * @param x {Number} The X coordinate of the center of the circle
     * @param y {Number} The Y coordinate of the center of the circle
     * @param radius {Number} The radius of the circle
     */
    PIXI.Graphics.prototype.drawCircle = function(x, y, radius)
    {

        if (!this.currentPath.points.length) this.graphicsData.pop();

        this.currentPath = {lineWidth:this.lineWidth, lineColor:this.lineColor, lineAlpha:this.lineAlpha,
                            fillColor:this.fillColor, fillAlpha:this.fillAlpha, fill:this.filling,
                            points:[x, y, radius, radius], type:PIXI.Graphics.CIRC};

        this.graphicsData.push(this.currentPath);
        this.dirty = true;

        return this;
    };

    /**
     * Draws an ellipse.
     *
     * @method drawEllipse
     * @param x {Number} The X coordinate of the center of the ellipse
     * @param y {Number} The Y coordinate of the center of the ellipse
     * @param width {Number} The half width of the ellipse
     * @param height {Number} The half height of the ellipse
     */
    PIXI.Graphics.prototype.drawEllipse = function(x, y, width, height)
    {

        if (!this.currentPath.points.length) this.graphicsData.pop();

        this.currentPath = {lineWidth:this.lineWidth, lineColor:this.lineColor, lineAlpha:this.lineAlpha,
                            fillColor:this.fillColor, fillAlpha:this.fillAlpha, fill:this.filling,
                            points:[x, y, width, height], type:PIXI.Graphics.ELIP};

        this.graphicsData.push(this.currentPath);
        this.dirty = true;

        return this;
    };

    /**
     * Clears the graphics that were drawn to this Graphics object, and resets fill and line style settings.
     *
     * @method clear
     */
    PIXI.Graphics.prototype.clear = function()
    {
        this.lineWidth = 0;
        this.filling = false;

        this.dirty = true;
        this.clearDirty = true;
        this.graphicsData = [];

        this.bounds = null; //new PIXI.Rectangle();

        return this;
    };

    /**
     * Useful function that returns a texture of the graphics object that can then be used to create sprites
     * This can be quite useful if your geometry is complicated and needs to be reused multiple times.
     *
     * @method generateTexture
     * @return {Texture} a texture of the graphics object
     */
    PIXI.Graphics.prototype.generateTexture = function()
    {
        var bounds = this.getBounds();

        var canvasBuffer = new PIXI.CanvasBuffer(bounds.width, bounds.height);
        var texture = PIXI.Texture.fromCanvas(canvasBuffer.canvas);

        canvasBuffer.context.translate(-bounds.x,-bounds.y);
        
        PIXI.CanvasGraphics.renderGraphics(this, canvasBuffer.context);

        return texture;
    };

    /**
    * Renders the object using the WebGL renderer
    *
    * @method _renderWebGL
    * @param renderSession {RenderSession} 
    * @private
    */
    PIXI.Graphics.prototype._renderWebGL = function(renderSession)
    {
        // if the sprite is not visible or the alpha is 0 then no need to render this element
        if(this.visible === false || this.alpha === 0 || this.isMask === true)return;
        

        if(this._cacheAsBitmap)
        {
           
            if(this.dirty)
            {
                this._generateCachedSprite();
                // we will also need to update the texture on the gpu too!
                PIXI.updateWebGLTexture(this._cachedSprite.texture.baseTexture, renderSession.gl);
                
                this.dirty =  false;
            }

            this._cachedSprite.alpha = this.alpha;
            PIXI.Sprite.prototype._renderWebGL.call(this._cachedSprite, renderSession);

            return;
        }
        else
        {
            renderSession.spriteBatch.stop();
            renderSession.blendModeManager.setBlendMode(this.blendMode);

            if(this._mask)renderSession.maskManager.pushMask(this._mask, renderSession);
            if(this._filters)renderSession.filterManager.pushFilter(this._filterBlock);
          
            // check blend mode
            if(this.blendMode !== renderSession.spriteBatch.currentBlendMode)
            {
                renderSession.spriteBatch.currentBlendMode = this.blendMode;
                var blendModeWebGL = PIXI.blendModesWebGL[renderSession.spriteBatch.currentBlendMode];
                renderSession.spriteBatch.gl.blendFunc(blendModeWebGL[0], blendModeWebGL[1]);
            }
            
          //  for (var i = this.graphicsData.length - 1; i >= 0; i--) {
            //    this.graphicsData[i]
                
    //        };

            PIXI.WebGLGraphics.renderGraphics(this, renderSession);
            
            // only render if it has children!
            if(this.children.length)
            {
                renderSession.spriteBatch.start();

                 // simple render children!
                for(var i=0, j=this.children.length; i<j; i++)
                {
                    this.children[i]._renderWebGL(renderSession);
                }

                renderSession.spriteBatch.stop();
            }

            if(this._filters)renderSession.filterManager.popFilter();
            if(this._mask)renderSession.maskManager.popMask(this.mask, renderSession);
              
            renderSession.drawCount++;

            renderSession.spriteBatch.start();
        }
    };

    /**
    * Renders the object using the Canvas renderer
    *
    * @method _renderCanvas
    * @param renderSession {RenderSession} 
    * @private
    */
    PIXI.Graphics.prototype._renderCanvas = function(renderSession)
    {
        // if the sprite is not visible or the alpha is 0 then no need to render this element
        if(this.visible === false || this.alpha === 0 || this.isMask === true)return;
        
        var context = renderSession.context;
        var transform = this.worldTransform;
        
        if(this.blendMode !== renderSession.currentBlendMode)
        {
            renderSession.currentBlendMode = this.blendMode;
            context.globalCompositeOperation = PIXI.blendModesCanvas[renderSession.currentBlendMode];
        }

        if(this._mask)
        {
            renderSession.maskManager.pushMask(this._mask, renderSession.context);
        }

        context.setTransform(transform.a, transform.c, transform.b, transform.d, transform.tx, transform.ty);
        PIXI.CanvasGraphics.renderGraphics(this, context);

         // simple render children!
        for(var i=0, j=this.children.length; i<j; i++)
        {
            this.children[i]._renderCanvas(renderSession);
        }

        if(this._mask)
        {
            renderSession.maskManager.popMask(renderSession.context);
        }
    };

    /**
     * Retrieves the bounds of the graphic shape as a rectangle object
     *
     * @method getBounds
     * @return {Rectangle} the rectangular bounding area
     */
    PIXI.Graphics.prototype.getBounds = function( matrix )
    {
        if(!this.bounds)this.updateBounds();

        var w0 = this.bounds.x;
        var w1 = this.bounds.width + this.bounds.x;

        var h0 = this.bounds.y;
        var h1 = this.bounds.height + this.bounds.y;

        var worldTransform = matrix || this.worldTransform;

        var a = worldTransform.a;
        var b = worldTransform.c;
        var c = worldTransform.b;
        var d = worldTransform.d;
        var tx = worldTransform.tx;
        var ty = worldTransform.ty;

        var x1 = a * w1 + c * h1 + tx;
        var y1 = d * h1 + b * w1 + ty;

        var x2 = a * w0 + c * h1 + tx;
        var y2 = d * h1 + b * w0 + ty;

        var x3 = a * w0 + c * h0 + tx;
        var y3 = d * h0 + b * w0 + ty;

        var x4 =  a * w1 + c * h0 + tx;
        var y4 =  d * h0 + b * w1 + ty;

        var maxX = x1;
        var maxY = y1;

        var minX = x1;
        var minY = y1;

        minX = x2 < minX ? x2 : minX;
        minX = x3 < minX ? x3 : minX;
        minX = x4 < minX ? x4 : minX;

        minY = y2 < minY ? y2 : minY;
        minY = y3 < minY ? y3 : minY;
        minY = y4 < minY ? y4 : minY;

        maxX = x2 > maxX ? x2 : maxX;
        maxX = x3 > maxX ? x3 : maxX;
        maxX = x4 > maxX ? x4 : maxX;

        maxY = y2 > maxY ? y2 : maxY;
        maxY = y3 > maxY ? y3 : maxY;
        maxY = y4 > maxY ? y4 : maxY;

        var bounds = this._bounds;

        bounds.x = minX;
        bounds.width = maxX - minX;

        bounds.y = minY;
        bounds.height = maxY - minY;

        return bounds;
    };

    /**
     * Update the bounds of the object
     *
     * @method updateBounds
     */
    PIXI.Graphics.prototype.updateBounds = function()
    {
        
        var minX = Infinity;
        var maxX = -Infinity;

        var minY = Infinity;
        var maxY = -Infinity;

        var points, x, y, w, h;

        for (var i = 0; i < this.graphicsData.length; i++) {
            var data = this.graphicsData[i];
            var type = data.type;
            var lineWidth = data.lineWidth;

            points = data.points;

            if(type === PIXI.Graphics.RECT)
            {
                x = points[0] - lineWidth/2;
                y = points[1] - lineWidth/2;
                w = points[2] + lineWidth;
                h = points[3] + lineWidth;

                minX = x < minX ? x : minX;
                maxX = x + w > maxX ? x + w : maxX;

                minY = y < minY ? x : minY;
                maxY = y + h > maxY ? y + h : maxY;
            }
            else if(type === PIXI.Graphics.CIRC || type === PIXI.Graphics.ELIP)
            {
                x = points[0];
                y = points[1];
                w = points[2] + lineWidth/2;
                h = points[3] + lineWidth/2;

                minX = x - w < minX ? x - w : minX;
                maxX = x + w > maxX ? x + w : maxX;

                minY = y - h < minY ? y - h : minY;
                maxY = y + h > maxY ? y + h : maxY;
            }
            else
            {
                // POLY
                for (var j = 0; j < points.length; j+=2)
                {

                    x = points[j];
                    y = points[j+1];
                    minX = x-lineWidth < minX ? x-lineWidth : minX;
                    maxX = x+lineWidth > maxX ? x+lineWidth : maxX;

                    minY = y-lineWidth < minY ? y-lineWidth : minY;
                    maxY = y+lineWidth > maxY ? y+lineWidth : maxY;
                }
            }
        }

        var padding = this.boundsPadding;
        this.bounds = new PIXI.Rectangle(minX - padding, minY - padding, (maxX - minX) + padding * 2, (maxY - minY) + padding * 2);
    };


    /**
     * Generates the cached sprite when the sprite has cacheAsBitmap = true
     *
     * @method _generateCachedSprite
     * @private
     */
    PIXI.Graphics.prototype._generateCachedSprite = function()
    {
        var bounds = this.getLocalBounds();

        if(!this._cachedSprite)
        {
            var canvasBuffer = new PIXI.CanvasBuffer(bounds.width, bounds.height);
            var texture = PIXI.Texture.fromCanvas(canvasBuffer.canvas);
            
            this._cachedSprite = new PIXI.Sprite(texture);
            this._cachedSprite.buffer = canvasBuffer;

            this._cachedSprite.worldTransform = this.worldTransform;
        }
        else
        {
            this._cachedSprite.buffer.resize(bounds.width, bounds.height);
        }

        // leverage the anchor to account for the offset of the element
        this._cachedSprite.anchor.x = -( bounds.x / bounds.width );
        this._cachedSprite.anchor.y = -( bounds.y / bounds.height );

       // this._cachedSprite.buffer.context.save();
        this._cachedSprite.buffer.context.translate(-bounds.x,-bounds.y);
        
        PIXI.CanvasGraphics.renderGraphics(this, this._cachedSprite.buffer.context);
        this._cachedSprite.alpha = this.alpha;

       // this._cachedSprite.buffer.context.restore();
    };

    PIXI.Graphics.prototype.destroyCachedSprite = function()
    {
        this._cachedSprite.texture.destroy(true);

        // let the gc collect the unused sprite
        // TODO could be object pooled!
        this._cachedSprite = null;
    };


    // SOME TYPES:
    PIXI.Graphics.POLY = 0;
    PIXI.Graphics.RECT = 1;
    PIXI.Graphics.CIRC = 2;
    PIXI.Graphics.ELIP = 3;
    PIXI.Graphics.RREC = 4;


    /**
     * @author Mat Groves http://matgroves.com/
     */

     /**
     * 
     * @class Strip
     * @extends DisplayObjectContainer
     * @constructor
     * @param texture {Texture} The texture to use
     * @param width {Number} the width 
     * @param height {Number} the height
     * 
     */
    PIXI.Strip = function(texture)
    {
        PIXI.DisplayObjectContainer.call( this );
        
        this.texture = texture;

        // set up the main bits..
        this.uvs = new PIXI.Float32Array([0, 1,
                                        1, 1,
                                        1, 0,
                                        0,1]);

        this.verticies = new PIXI.Float32Array([0, 0,
                          100,0,
                          100,100,
                          0, 100]);

        this.colors = new PIXI.Float32Array([1, 1, 1, 1]);

        this.indices = new PIXI.Uint16Array([0, 1, 2, 3]);
        

        this.dirty = true;
    };

    // constructor
    PIXI.Strip.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);
    PIXI.Strip.prototype.constructor = PIXI.Strip;

    PIXI.Strip.prototype._renderWebGL = function(renderSession)
    {
        // if the sprite is not visible or the alpha is 0 then no need to render this element
        if(!this.visible || this.alpha <= 0)return;
        // render triangle strip..

        renderSession.spriteBatch.stop();

        // init! init!
        if(!this._vertexBuffer)this._initWebGL(renderSession);
        
        renderSession.shaderManager.setShader(renderSession.shaderManager.stripShader);

        this._renderStrip(renderSession);

        ///renderSession.shaderManager.activateDefaultShader();

        renderSession.spriteBatch.start();

        //TODO check culling  
    };

    PIXI.Strip.prototype._initWebGL = function(renderSession)
    {
        // build the strip!
        var gl = renderSession.gl;
        
        this._vertexBuffer = gl.createBuffer();
        this._indexBuffer = gl.createBuffer();
        this._uvBuffer = gl.createBuffer();
        this._colorBuffer = gl.createBuffer();
        
        gl.bindBuffer(gl.ARRAY_BUFFER, this._vertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, this.verticies, gl.DYNAMIC_DRAW);

        gl.bindBuffer(gl.ARRAY_BUFFER, this._uvBuffer);
        gl.bufferData(gl.ARRAY_BUFFER,  this.uvs, gl.STATIC_DRAW);

        gl.bindBuffer(gl.ARRAY_BUFFER, this._colorBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, this.colors, gl.STATIC_DRAW);
     
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._indexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.indices, gl.STATIC_DRAW);
    };

    PIXI.Strip.prototype._renderStrip = function(renderSession)
    {
        var gl = renderSession.gl;
        var projection = renderSession.projection,
            offset = renderSession.offset,
            shader = renderSession.shaderManager.stripShader;


        // gl.uniformMatrix4fv(shaderProgram.mvMatrixUniform, false, mat4Real);

        gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

        // set uniforms
        gl.uniformMatrix3fv(shader.translationMatrix, false, this.worldTransform.toArray(true));
        gl.uniform2f(shader.projectionVector, projection.x, -projection.y);
        gl.uniform2f(shader.offsetVector, -offset.x, -offset.y);
        gl.uniform1f(shader.alpha, 1);

        if(!this.dirty)
        {
            
            gl.bindBuffer(gl.ARRAY_BUFFER, this._vertexBuffer);
            gl.bufferSubData(gl.ARRAY_BUFFER, 0, this.verticies);
            gl.vertexAttribPointer(shader.aVertexPosition, 2, gl.FLOAT, false, 0, 0);
            
            // update the uvs
            gl.bindBuffer(gl.ARRAY_BUFFER, this._uvBuffer);
            gl.vertexAttribPointer(shader.aTextureCoord, 2, gl.FLOAT, false, 0, 0);
                
            gl.activeTexture(gl.TEXTURE0);
             // bind the current texture
            gl.bindTexture(gl.TEXTURE_2D, this.texture.baseTexture._glTextures[gl.id] || PIXI.createWebGLTexture(this.texture.baseTexture, gl));
        
            // dont need to upload!
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._indexBuffer);
        
        
        }
        else
        {

            this.dirty = false;
            gl.bindBuffer(gl.ARRAY_BUFFER, this._vertexBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, this.verticies, gl.STATIC_DRAW);
            gl.vertexAttribPointer(shader.aVertexPosition, 2, gl.FLOAT, false, 0, 0);
            
            // update the uvs
            gl.bindBuffer(gl.ARRAY_BUFFER, this._uvBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, this.uvs, gl.STATIC_DRAW);
            gl.vertexAttribPointer(shader.aTextureCoord, 2, gl.FLOAT, false, 0, 0);
                
            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, this.texture.baseTexture._glTextures[gl.id] || PIXI.createWebGLTexture(this.texture.baseTexture, gl));
        
            // dont need to upload!
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._indexBuffer);
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.indices, gl.STATIC_DRAW);
            
        }
        //console.log(gl.TRIANGLE_STRIP)
        //
        //
        gl.drawElements(gl.TRIANGLE_STRIP, this.indices.length, gl.UNSIGNED_SHORT, 0);
        
      
    };

    PIXI.Strip.prototype._renderCanvas = function(renderSession)
    {
        var context = renderSession.context;
        
        var transform = this.worldTransform;

        if (renderSession.roundPixels)
        {
            context.setTransform(transform.a, transform.c, transform.b, transform.d, transform.tx | 0, transform.ty | 0);
        }
        else
        {
            context.setTransform(transform.a, transform.c, transform.b, transform.d, transform.tx, transform.ty);
        }
            
        var strip = this;
        // draw triangles!!
        var verticies = strip.verticies;
        var uvs = strip.uvs;

        var length = verticies.length/2;
        this.count++;

        for (var i = 0; i < length-2; i++)
        {
            // draw some triangles!
            var index = i*2;

            var x0 = verticies[index],   x1 = verticies[index+2], x2 = verticies[index+4];
            var y0 = verticies[index+1], y1 = verticies[index+3], y2 = verticies[index+5];

            if(true)
            {

                //expand();
                var centerX = (x0 + x1 + x2)/3;
                var centerY = (y0 + y1 + y2)/3;

                var normX = x0 - centerX;
                var normY = y0 - centerY;

                var dist = Math.sqrt( normX * normX + normY * normY );
                x0 = centerX + (normX / dist) * (dist + 3);
                y0 = centerY + (normY / dist) * (dist + 3);

                // 
                
                normX = x1 - centerX;
                normY = y1 - centerY;

                dist = Math.sqrt( normX * normX + normY * normY );
                x1 = centerX + (normX / dist) * (dist + 3);
                y1 = centerY + (normY / dist) * (dist + 3);

                normX = x2 - centerX;
                normY = y2 - centerY;

                dist = Math.sqrt( normX * normX + normY * normY );
                x2 = centerX + (normX / dist) * (dist + 3);
                y2 = centerY + (normY / dist) * (dist + 3);

            }

            var u0 = uvs[index] * strip.texture.width,   u1 = uvs[index+2] * strip.texture.width, u2 = uvs[index+4]* strip.texture.width;
            var v0 = uvs[index+1]* strip.texture.height, v1 = uvs[index+3] * strip.texture.height, v2 = uvs[index+5]* strip.texture.height;

            context.save();
            context.beginPath();


            context.moveTo(x0, y0);
            context.lineTo(x1, y1);
            context.lineTo(x2, y2);

            context.closePath();

            context.clip();

            // Compute matrix transform
            var delta = u0*v1 + v0*u2 + u1*v2 - v1*u2 - v0*u1 - u0*v2;
            var deltaA = x0*v1 + v0*x2 + x1*v2 - v1*x2 - v0*x1 - x0*v2;
            var deltaB = u0*x1 + x0*u2 + u1*x2 - x1*u2 - x0*u1 - u0*x2;
            var deltaC = u0*v1*x2 + v0*x1*u2 + x0*u1*v2 - x0*v1*u2 - v0*u1*x2 - u0*x1*v2;
            var deltaD = y0*v1 + v0*y2 + y1*v2 - v1*y2 - v0*y1 - y0*v2;
            var deltaE = u0*y1 + y0*u2 + u1*y2 - y1*u2 - y0*u1 - u0*y2;
            var deltaF = u0*v1*y2 + v0*y1*u2 + y0*u1*v2 - y0*v1*u2 - v0*u1*y2 - u0*y1*v2;

            context.transform(deltaA / delta, deltaD / delta,
                                deltaB / delta, deltaE / delta,
                                deltaC / delta, deltaF / delta);

            context.drawImage(strip.texture.baseTexture.source, 0, 0);
            context.restore();
        }
    };

    /*
     * Sets the texture that the Strip will use 
     *
     * @method setTexture
     * @param texture {Texture} the texture that will be used
     * @private
     */

    /*
    PIXI.Strip.prototype.setTexture = function(texture)
    {
        //TODO SET THE TEXTURES
        //TODO VISIBILITY

        // stop current texture
        this.texture = texture;
        this.width   = texture.frame.width;
        this.height  = texture.frame.height;
        this.updateFrame = true;
    };
    */

    /**
     * When the texture is updated, this event will fire to update the scale and frame
     *
     * @method onTextureUpdate
     * @param event
     * @private
     */

    PIXI.Strip.prototype.onTextureUpdate = function()
    {
        this.updateFrame = true;
    };
    /* @author Mat Groves http://matgroves.com/ @Doormat23
     */

    /**
     * 
     * @class Rope
     * @constructor
     * @param texture {Texture} The texture to use
     * @param points {Array}
     * 
     */
    PIXI.Rope = function(texture, points)
    {
        PIXI.Strip.call( this, texture );
        this.points = points;

        this.verticies = new PIXI.Float32Array(points.length * 4);
        this.uvs = new PIXI.Float32Array(points.length * 4);
        this.colors = new PIXI.Float32Array(points.length * 2);
        this.indices = new PIXI.Uint16Array(points.length * 2);
       

        this.refresh();
    };


    // constructor
    PIXI.Rope.prototype = Object.create( PIXI.Strip.prototype );
    PIXI.Rope.prototype.constructor = PIXI.Rope;

    /*
     * Refreshes 
     *
     * @method refresh
     */
    PIXI.Rope.prototype.refresh = function()
    {
        var points = this.points;
        if(points.length < 1) return;

        var uvs = this.uvs;

        var lastPoint = points[0];
        var indices = this.indices;
        var colors = this.colors;

        this.count-=0.2;

        uvs[0] = 0;
        uvs[1] = 0;
        uvs[2] = 0;
        uvs[3] = 1;

        colors[0] = 1;
        colors[1] = 1;

        indices[0] = 0;
        indices[1] = 1;

        var total = points.length,
            point, index, amount;

        for (var i = 1; i < total; i++)
        {
            point = points[i];
            index = i * 4;
            // time to do some smart drawing!
            amount = i / (total-1);

            if(i%2)
            {
                uvs[index] = amount;
                uvs[index+1] = 0;

                uvs[index+2] = amount;
                uvs[index+3] = 1;
            }
            else
            {
                uvs[index] = amount;
                uvs[index+1] = 0;

                uvs[index+2] = amount;
                uvs[index+3] = 1;
            }

            index = i * 2;
            colors[index] = 1;
            colors[index+1] = 1;

            index = i * 2;
            indices[index] = index;
            indices[index + 1] = index + 1;

            lastPoint = point;
        }
    };

    /*
     * Updates the object transform for rendering
     *
     * @method updateTransform
     * @private
     */
    PIXI.Rope.prototype.updateTransform = function()
    {

        var points = this.points;
        if(points.length < 1)return;

        var lastPoint = points[0];
        var nextPoint;
        var perp = {x:0, y:0};

        this.count-=0.2;

        var verticies = this.verticies;
        var total = points.length,
            point, index, ratio, perpLength, num;

        for (var i = 0; i < total; i++)
        {
            point = points[i];
            index = i * 4;

            if(i < points.length-1)
            {
                nextPoint = points[i+1];
            }
            else
            {
                nextPoint = point;
            }

            perp.y = -(nextPoint.x - lastPoint.x);
            perp.x = nextPoint.y - lastPoint.y;

            ratio = (1 - (i / (total-1))) * 10;

            if(ratio > 1) ratio = 1;

            perpLength = Math.sqrt(perp.x * perp.x + perp.y * perp.y);
            num = this.texture.height / 2; //(20 + Math.abs(Math.sin((i + this.count) * 0.3) * 50) )* ratio;
            perp.x /= perpLength;
            perp.y /= perpLength;

            perp.x *= num;
            perp.y *= num;

            verticies[index] = point.x + perp.x;
            verticies[index+1] = point.y + perp.y;
            verticies[index+2] = point.x - perp.x;
            verticies[index+3] = point.y - perp.y;

            lastPoint = point;
        }

        PIXI.DisplayObjectContainer.prototype.updateTransform.call( this );
    };
    /*
     * Sets the texture that the Rope will use 
     *
     * @method setTexture
     * @param texture {Texture} the texture that will be used
     */
    PIXI.Rope.prototype.setTexture = function(texture)
    {
        // stop current texture
        this.texture = texture;
        //this.updateFrame = true;
    };

    /**
     * @author Mat Groves http://matgroves.com/
     */

    /**
     * A tiling sprite is a fast way of rendering a tiling image
     *
     * @class TilingSprite
     * @extends Sprite
     * @constructor
     * @param texture {Texture} the texture of the tiling sprite
     * @param width {Number}  the width of the tiling sprite
     * @param height {Number} the height of the tiling sprite
     */
    PIXI.TilingSprite = function(texture, width, height)
    {
        PIXI.Sprite.call( this, texture);

        /**
         * The with of the tiling sprite
         *
         * @property width
         * @type Number
         */
        this._width = width || 100;

        /**
         * The height of the tiling sprite
         *
         * @property height
         * @type Number
         */
        this._height = height || 100;

        /**
         * The scaling of the image that is being tiled
         *
         * @property tileScale
         * @type Point
         */
        this.tileScale = new PIXI.Point(1,1);

        /**
         * A point that represents the scale of the texture object
         *
         * @property tileScaleOffset
         * @type Point
         */
        this.tileScaleOffset = new PIXI.Point(1,1);
        
        /**
         * The offset position of the image that is being tiled
         *
         * @property tilePosition
         * @type Point
         */
        this.tilePosition = new PIXI.Point(0,0);

        /**
         * Whether this sprite is renderable or not
         *
         * @property renderable
         * @type Boolean
         * @default true
         */
        this.renderable = true;

        /**
         * The tint applied to the sprite. This is a hex value
         *
         * @property tint
         * @type Number
         * @default 0xFFFFFF
         */
        this.tint = 0xFFFFFF;
        
        /**
         * The blend mode to be applied to the sprite
         *
         * @property blendMode
         * @type Number
         * @default PIXI.blendModes.NORMAL;
         */
        this.blendMode = PIXI.blendModes.NORMAL;

        

    };

    // constructor
    PIXI.TilingSprite.prototype = Object.create(PIXI.Sprite.prototype);
    PIXI.TilingSprite.prototype.constructor = PIXI.TilingSprite;


    /**
     * The width of the sprite, setting this will actually modify the scale to achieve the value set
     *
     * @property width
     * @type Number
     */
    Object.defineProperty(PIXI.TilingSprite.prototype, 'width', {
        get: function() {
            return this._width;
        },
        set: function(value) {
            
            this._width = value;
        }
    });

    /**
     * The height of the TilingSprite, setting this will actually modify the scale to achieve the value set
     *
     * @property height
     * @type Number
     */
    Object.defineProperty(PIXI.TilingSprite.prototype, 'height', {
        get: function() {
            return  this._height;
        },
        set: function(value) {
            this._height = value;
        }
    });

    PIXI.TilingSprite.prototype.setTexture = function(texture)
    {
        if (this.texture === texture) return;

        this.texture = texture;

        this.refreshTexture = true;

        this.cachedTint = 0xFFFFFF;
    };

    /**
    * Renders the object using the WebGL renderer
    *
    * @method _renderWebGL
    * @param renderSession {RenderSession} 
    * @private
    */
    PIXI.TilingSprite.prototype._renderWebGL = function(renderSession)
    {
        if (this.visible === false || this.alpha === 0) return;
        var i,j;

        if (this._mask)
        {
            renderSession.spriteBatch.stop();
            renderSession.maskManager.pushMask(this.mask, renderSession);
            renderSession.spriteBatch.start();
        }

        if (this._filters)
        {
            renderSession.spriteBatch.flush();
            renderSession.filterManager.pushFilter(this._filterBlock);
        }

       

        if (!this.tilingTexture || this.refreshTexture)
        {
            this.generateTilingTexture(true);

            if (this.tilingTexture && this.tilingTexture.needsUpdate)
            {
                //TODO - tweaking
                PIXI.updateWebGLTexture(this.tilingTexture.baseTexture, renderSession.gl);
                this.tilingTexture.needsUpdate = false;
               // this.tilingTexture._uvs = null;
            }
        }
        else
        {
            renderSession.spriteBatch.renderTilingSprite(this);
        }
        // simple render children!
        for (i=0,j=this.children.length; i<j; i++)
        {
            this.children[i]._renderWebGL(renderSession);
        }

        renderSession.spriteBatch.stop();

        if (this._filters) renderSession.filterManager.popFilter();
        if (this._mask) renderSession.maskManager.popMask(renderSession);
        
        renderSession.spriteBatch.start();
    };

    /**
    * Renders the object using the Canvas renderer
    *
    * @method _renderCanvas
    * @param renderSession {RenderSession} 
    * @private
    */
    PIXI.TilingSprite.prototype._renderCanvas = function(renderSession)
    {
        if (this.visible === false || this.alpha === 0)return;
        
        var context = renderSession.context;

        if (this._mask)
        {
            renderSession.maskManager.pushMask(this._mask, context);
        }

        context.globalAlpha = this.worldAlpha;
        
        var transform = this.worldTransform;

        var i,j;

        context.setTransform(transform.a, transform.c, transform.b, transform.d, transform.tx , transform.ty);

        if (!this.__tilePattern ||  this.refreshTexture)
        {
            this.generateTilingTexture(false);
        
            if (this.tilingTexture)
            {
                this.__tilePattern = context.createPattern(this.tilingTexture.baseTexture.source, 'repeat');
            }
            else
            {
                return;
            }
        }

        // check blend mode
        if (this.blendMode !== renderSession.currentBlendMode)
        {
            renderSession.currentBlendMode = this.blendMode;
            context.globalCompositeOperation = PIXI.blendModesCanvas[renderSession.currentBlendMode];
        }

        var tilePosition = this.tilePosition;
        var tileScale = this.tileScale;

        tilePosition.x %= this.tilingTexture.baseTexture.width;
        tilePosition.y %= this.tilingTexture.baseTexture.height;

        // offset
        context.scale(tileScale.x,tileScale.y);
        context.translate(tilePosition.x, tilePosition.y);

        context.fillStyle = this.__tilePattern;

        // make sure to account for the anchor point..
        context.fillRect(-tilePosition.x + (this.anchor.x * -this._width),
                        -tilePosition.y + (this.anchor.y * -this._height),
                        this._width / tileScale.x,
                        this._height / tileScale.y);

        context.scale(1 / tileScale.x, 1 / tileScale.y);
        context.translate(-tilePosition.x, -tilePosition.y);

        if (this._mask)
        {
            renderSession.maskManager.popMask(renderSession.context);
        }

        for (i=0,j=this.children.length; i<j; i++)
        {
            this.children[i]._renderCanvas(renderSession);
        }
    };


    /**
    * Returns the framing rectangle of the sprite as a PIXI.Rectangle object
    *
    * @method getBounds
    * @return {Rectangle} the framing rectangle
    */
    PIXI.TilingSprite.prototype.getBounds = function()
    {
        var width = this._width;
        var height = this._height;

        var w0 = width * (1-this.anchor.x);
        var w1 = width * -this.anchor.x;

        var h0 = height * (1-this.anchor.y);
        var h1 = height * -this.anchor.y;

        var worldTransform = this.worldTransform;

        var a = worldTransform.a;
        var b = worldTransform.c;
        var c = worldTransform.b;
        var d = worldTransform.d;
        var tx = worldTransform.tx;
        var ty = worldTransform.ty;
        
        var x1 = a * w1 + c * h1 + tx;
        var y1 = d * h1 + b * w1 + ty;

        var x2 = a * w0 + c * h1 + tx;
        var y2 = d * h1 + b * w0 + ty;

        var x3 = a * w0 + c * h0 + tx;
        var y3 = d * h0 + b * w0 + ty;

        var x4 =  a * w1 + c * h0 + tx;
        var y4 =  d * h0 + b * w1 + ty;

        var maxX = -Infinity;
        var maxY = -Infinity;

        var minX = Infinity;
        var minY = Infinity;

        minX = x1 < minX ? x1 : minX;
        minX = x2 < minX ? x2 : minX;
        minX = x3 < minX ? x3 : minX;
        minX = x4 < minX ? x4 : minX;

        minY = y1 < minY ? y1 : minY;
        minY = y2 < minY ? y2 : minY;
        minY = y3 < minY ? y3 : minY;
        minY = y4 < minY ? y4 : minY;

        maxX = x1 > maxX ? x1 : maxX;
        maxX = x2 > maxX ? x2 : maxX;
        maxX = x3 > maxX ? x3 : maxX;
        maxX = x4 > maxX ? x4 : maxX;

        maxY = y1 > maxY ? y1 : maxY;
        maxY = y2 > maxY ? y2 : maxY;
        maxY = y3 > maxY ? y3 : maxY;
        maxY = y4 > maxY ? y4 : maxY;

        var bounds = this._bounds;

        bounds.x = minX;
        bounds.width = maxX - minX;

        bounds.y = minY;
        bounds.height = maxY - minY;

        // store a reference so that if this function gets called again in the render cycle we do not have to recalculate
        this._currentBounds = bounds;

        return bounds;
    };



    /**
     * When the texture is updated, this event will fire to update the scale and frame
     *
     * @method onTextureUpdate
     * @param event
     * @private
     */
    PIXI.TilingSprite.prototype.onTextureUpdate = function()
    {
       // overriding the sprite version of this!
    };


    /**
    * 
    * @method generateTilingTexture
    * 
    * @param forcePowerOfTwo {Boolean} Whether we want to force the texture to be a power of two
    */
    PIXI.TilingSprite.prototype.generateTilingTexture = function(forcePowerOfTwo)
    {
        if (!this.texture.baseTexture.hasLoaded) return;

        var texture = this.texture;
        var frame = texture.frame;
        var targetWidth, targetHeight;

        //  Check that the frame is the same size as the base texture.
        var isFrame = frame.width !== texture.baseTexture.width || frame.height !== texture.baseTexture.height;

        var newTextureRequired = false;

        if (!forcePowerOfTwo)
        {
            if (isFrame)
            {
                targetWidth = frame.width;
                targetHeight = frame.height;
               
                newTextureRequired = true;
            }
        }
        else
        {
            targetWidth = PIXI.getNextPowerOfTwo(frame.width);
            targetHeight = PIXI.getNextPowerOfTwo(frame.height);

            if (frame.width !== targetWidth || frame.height !== targetHeight) newTextureRequired = true;
        }

        if (newTextureRequired)
        {
            var canvasBuffer;

            if (this.tilingTexture && this.tilingTexture.isTiling)
            {
                canvasBuffer = this.tilingTexture.canvasBuffer;
                canvasBuffer.resize(targetWidth, targetHeight);
                this.tilingTexture.baseTexture.width = targetWidth;
                this.tilingTexture.baseTexture.height = targetHeight;
                this.tilingTexture.needsUpdate = true;
            }
            else
            {
                canvasBuffer = new PIXI.CanvasBuffer(targetWidth, targetHeight);

                this.tilingTexture = PIXI.Texture.fromCanvas(canvasBuffer.canvas);
                this.tilingTexture.canvasBuffer = canvasBuffer;
                this.tilingTexture.isTiling = true;
            }

            canvasBuffer.context.drawImage(texture.baseTexture.source,
                                   texture.crop.x,
                                   texture.crop.y,
                                   texture.crop.width,
                                   texture.crop.height,
                                   0,
                                   0,
                                   targetWidth,
                                   targetHeight);

            this.tileScaleOffset.x = frame.width / targetWidth;
            this.tileScaleOffset.y = frame.height / targetHeight;
        }
        else
        {
            //  TODO - switching?
            if (this.tilingTexture && this.tilingTexture.isTiling)
            {
                // destroy the tiling texture!
                // TODO could store this somewhere?
                this.tilingTexture.destroy(true);
            }

            this.tileScaleOffset.x = 1;
            this.tileScaleOffset.y = 1;
            this.tilingTexture = texture;
        }

        this.refreshTexture = false;
        this.tilingTexture.baseTexture._powerOf2 = true;
    };
    /**
     * @author Mat Groves http://matgroves.com/ @Doormat23
     * based on pixi impact spine implementation made by Eemeli Kelokorpi (@ekelokorpi) https://github.com/ekelokorpi
     *
     * Awesome JS run time provided by EsotericSoftware
     * https://github.com/EsotericSoftware/spine-runtimes
     *
     */

    /*
     * Awesome JS run time provided by EsotericSoftware
     *
     * https://github.com/EsotericSoftware/spine-runtimes
     *
     */



    var spine = {};

    spine.BoneData = function (name, parent) {
        this.name = name;
        this.parent = parent;
    };
    spine.BoneData.prototype = {
        length: 0,
        x: 0, y: 0,
        rotation: 0,
        scaleX: 1, scaleY: 1
    };

    spine.SlotData = function (name, boneData) {
        this.name = name;
        this.boneData = boneData;
    };
    spine.SlotData.prototype = {
        r: 1, g: 1, b: 1, a: 1,
        attachmentName: null
    };

    spine.Bone = function (boneData, parent) {
        this.data = boneData;
        this.parent = parent;
        this.setToSetupPose();
    };
    spine.Bone.yDown = false;
    spine.Bone.prototype = {
        x: 0, y: 0,
        rotation: 0,
        scaleX: 1, scaleY: 1,
        m00: 0, m01: 0, worldX: 0, // a b x
        m10: 0, m11: 0, worldY: 0, // c d y
        worldRotation: 0,
        worldScaleX: 1, worldScaleY: 1,
        updateWorldTransform: function (flipX, flipY) {
            var parent = this.parent;
            if (parent != null) {
                this.worldX = this.x * parent.m00 + this.y * parent.m01 + parent.worldX;
                this.worldY = this.x * parent.m10 + this.y * parent.m11 + parent.worldY;
                this.worldScaleX = parent.worldScaleX * this.scaleX;
                this.worldScaleY = parent.worldScaleY * this.scaleY;
                this.worldRotation = parent.worldRotation + this.rotation;
            } else {
                this.worldX = this.x;
                this.worldY = this.y;
                this.worldScaleX = this.scaleX;
                this.worldScaleY = this.scaleY;
                this.worldRotation = this.rotation;
            }
            var radians = this.worldRotation * Math.PI / 180;
            var cos = Math.cos(radians);
            var sin = Math.sin(radians);
            this.m00 = cos * this.worldScaleX;
            this.m10 = sin * this.worldScaleX;
            this.m01 = -sin * this.worldScaleY;
            this.m11 = cos * this.worldScaleY;
            if (flipX) {
                this.m00 = -this.m00;
                this.m01 = -this.m01;
            }
            if (flipY) {
                this.m10 = -this.m10;
                this.m11 = -this.m11;
            }
            if (spine.Bone.yDown) {
                this.m10 = -this.m10;
                this.m11 = -this.m11;
            }
        },
        setToSetupPose: function () {
            var data = this.data;
            this.x = data.x;
            this.y = data.y;
            this.rotation = data.rotation;
            this.scaleX = data.scaleX;
            this.scaleY = data.scaleY;
        }
    };

    spine.Slot = function (slotData, skeleton, bone) {
        this.data = slotData;
        this.skeleton = skeleton;
        this.bone = bone;
        this.setToSetupPose();
    };
    spine.Slot.prototype = {
        r: 1, g: 1, b: 1, a: 1,
        _attachmentTime: 0,
        attachment: null,
        setAttachment: function (attachment) {
            this.attachment = attachment;
            this._attachmentTime = this.skeleton.time;
        },
        setAttachmentTime: function (time) {
            this._attachmentTime = this.skeleton.time - time;
        },
        getAttachmentTime: function () {
            return this.skeleton.time - this._attachmentTime;
        },
        setToSetupPose: function () {
            var data = this.data;
            this.r = data.r;
            this.g = data.g;
            this.b = data.b;
            this.a = data.a;

            var slotDatas = this.skeleton.data.slots;
            for (var i = 0, n = slotDatas.length; i < n; i++) {
                if (slotDatas[i] == data) {
                    this.setAttachment(!data.attachmentName ? null : this.skeleton.getAttachmentBySlotIndex(i, data.attachmentName));
                    break;
                }
            }
        }
    };

    spine.Skin = function (name) {
        this.name = name;
        this.attachments = {};
    };
    spine.Skin.prototype = {
        addAttachment: function (slotIndex, name, attachment) {
            this.attachments[slotIndex + ":" + name] = attachment;
        },
        getAttachment: function (slotIndex, name) {
            return this.attachments[slotIndex + ":" + name];
        },
        _attachAll: function (skeleton, oldSkin) {
            for (var key in oldSkin.attachments) {
                var colon = key.indexOf(":");
                var slotIndex = parseInt(key.substring(0, colon), 10);
                var name = key.substring(colon + 1);
                var slot = skeleton.slots[slotIndex];
                if (slot.attachment && slot.attachment.name == name) {
                    var attachment = this.getAttachment(slotIndex, name);
                    if (attachment) slot.setAttachment(attachment);
                }
            }
        }
    };

    spine.Animation = function (name, timelines, duration) {
        this.name = name;
        this.timelines = timelines;
        this.duration = duration;
    };
    spine.Animation.prototype = {
        apply: function (skeleton, time, loop) {
            if (loop && this.duration) time %= this.duration;
            var timelines = this.timelines;
            for (var i = 0, n = timelines.length; i < n; i++)
                timelines[i].apply(skeleton, time, 1);
        },
        mix: function (skeleton, time, loop, alpha) {
            if (loop && this.duration) time %= this.duration;
            var timelines = this.timelines;
            for (var i = 0, n = timelines.length; i < n; i++)
                timelines[i].apply(skeleton, time, alpha);
        }
    };

    spine.binarySearch = function (values, target, step) {
        var low = 0;
        var high = Math.floor(values.length / step) - 2;
        if (!high) return step;
        var current = high >>> 1;
        while (true) {
            if (values[(current + 1) * step] <= target)
                low = current + 1;
            else
                high = current;
            if (low == high) return (low + 1) * step;
            current = (low + high) >>> 1;
        }
    };
    spine.linearSearch = function (values, target, step) {
        for (var i = 0, last = values.length - step; i <= last; i += step)
            if (values[i] > target) return i;
        return -1;
    };

    spine.Curves = function (frameCount) {
        this.curves = []; // dfx, dfy, ddfx, ddfy, dddfx, dddfy, ...
        this.curves.length = (frameCount - 1) * 6;
    };
    spine.Curves.prototype = {
        setLinear: function (frameIndex) {
            this.curves[frameIndex * 6] = 0/*LINEAR*/;
        },
        setStepped: function (frameIndex) {
            this.curves[frameIndex * 6] = -1/*STEPPED*/;
        },
        /** Sets the control handle positions for an interpolation bezier curve used to transition from this keyframe to the next.
         * cx1 and cx2 are from 0 to 1, representing the percent of time between the two keyframes. cy1 and cy2 are the percent of
         * the difference between the keyframe's values. */
        setCurve: function (frameIndex, cx1, cy1, cx2, cy2) {
            var subdiv_step = 1 / 10/*BEZIER_SEGMENTS*/;
            var subdiv_step2 = subdiv_step * subdiv_step;
            var subdiv_step3 = subdiv_step2 * subdiv_step;
            var pre1 = 3 * subdiv_step;
            var pre2 = 3 * subdiv_step2;
            var pre4 = 6 * subdiv_step2;
            var pre5 = 6 * subdiv_step3;
            var tmp1x = -cx1 * 2 + cx2;
            var tmp1y = -cy1 * 2 + cy2;
            var tmp2x = (cx1 - cx2) * 3 + 1;
            var tmp2y = (cy1 - cy2) * 3 + 1;
            var i = frameIndex * 6;
            var curves = this.curves;
            curves[i] = cx1 * pre1 + tmp1x * pre2 + tmp2x * subdiv_step3;
            curves[i + 1] = cy1 * pre1 + tmp1y * pre2 + tmp2y * subdiv_step3;
            curves[i + 2] = tmp1x * pre4 + tmp2x * pre5;
            curves[i + 3] = tmp1y * pre4 + tmp2y * pre5;
            curves[i + 4] = tmp2x * pre5;
            curves[i + 5] = tmp2y * pre5;
        },
        getCurvePercent: function (frameIndex, percent) {
            percent = percent < 0 ? 0 : (percent > 1 ? 1 : percent);
            var curveIndex = frameIndex * 6;
            var curves = this.curves;
            var dfx = curves[curveIndex];
            if (!dfx/*LINEAR*/) return percent;
            if (dfx == -1/*STEPPED*/) return 0;
            var dfy = curves[curveIndex + 1];
            var ddfx = curves[curveIndex + 2];
            var ddfy = curves[curveIndex + 3];
            var dddfx = curves[curveIndex + 4];
            var dddfy = curves[curveIndex + 5];
            var x = dfx, y = dfy;
            var i = 10/*BEZIER_SEGMENTS*/ - 2;
            while (true) {
                if (x >= percent) {
                    var lastX = x - dfx;
                    var lastY = y - dfy;
                    return lastY + (y - lastY) * (percent - lastX) / (x - lastX);
                }
                if (!i) break;
                i--;
                dfx += ddfx;
                dfy += ddfy;
                ddfx += dddfx;
                ddfy += dddfy;
                x += dfx;
                y += dfy;
            }
            return y + (1 - y) * (percent - x) / (1 - x); // Last point is 1,1.
        }
    };

    spine.RotateTimeline = function (frameCount) {
        this.curves = new spine.Curves(frameCount);
        this.frames = []; // time, angle, ...
        this.frames.length = frameCount * 2;
    };
    spine.RotateTimeline.prototype = {
        boneIndex: 0,
        getFrameCount: function () {
            return this.frames.length / 2;
        },
        setFrame: function (frameIndex, time, angle) {
            frameIndex *= 2;
            this.frames[frameIndex] = time;
            this.frames[frameIndex + 1] = angle;
        },
        apply: function (skeleton, time, alpha) {
            var frames = this.frames,
                amount;

            if (time < frames[0]) return; // Time is before first frame.

            var bone = skeleton.bones[this.boneIndex];

            if (time >= frames[frames.length - 2]) { // Time is after last frame.
                amount = bone.data.rotation + frames[frames.length - 1] - bone.rotation;
                while (amount > 180)
                    amount -= 360;
                while (amount < -180)
                    amount += 360;
                bone.rotation += amount * alpha;
                return;
            }

            // Interpolate between the last frame and the current frame.
            var frameIndex = spine.binarySearch(frames, time, 2);
            var lastFrameValue = frames[frameIndex - 1];
            var frameTime = frames[frameIndex];
            var percent = 1 - (time - frameTime) / (frames[frameIndex - 2/*LAST_FRAME_TIME*/] - frameTime);
            percent = this.curves.getCurvePercent(frameIndex / 2 - 1, percent);

            amount = frames[frameIndex + 1/*FRAME_VALUE*/] - lastFrameValue;
            while (amount > 180)
                amount -= 360;
            while (amount < -180)
                amount += 360;
            amount = bone.data.rotation + (lastFrameValue + amount * percent) - bone.rotation;
            while (amount > 180)
                amount -= 360;
            while (amount < -180)
                amount += 360;
            bone.rotation += amount * alpha;
        }
    };

    spine.TranslateTimeline = function (frameCount) {
        this.curves = new spine.Curves(frameCount);
        this.frames = []; // time, x, y, ...
        this.frames.length = frameCount * 3;
    };
    spine.TranslateTimeline.prototype = {
        boneIndex: 0,
        getFrameCount: function () {
            return this.frames.length / 3;
        },
        setFrame: function (frameIndex, time, x, y) {
            frameIndex *= 3;
            this.frames[frameIndex] = time;
            this.frames[frameIndex + 1] = x;
            this.frames[frameIndex + 2] = y;
        },
        apply: function (skeleton, time, alpha) {
            var frames = this.frames;
            if (time < frames[0]) return; // Time is before first frame.

            var bone = skeleton.bones[this.boneIndex];

            if (time >= frames[frames.length - 3]) { // Time is after last frame.
                bone.x += (bone.data.x + frames[frames.length - 2] - bone.x) * alpha;
                bone.y += (bone.data.y + frames[frames.length - 1] - bone.y) * alpha;
                return;
            }

            // Interpolate between the last frame and the current frame.
            var frameIndex = spine.binarySearch(frames, time, 3);
            var lastFrameX = frames[frameIndex - 2];
            var lastFrameY = frames[frameIndex - 1];
            var frameTime = frames[frameIndex];
            var percent = 1 - (time - frameTime) / (frames[frameIndex + -3/*LAST_FRAME_TIME*/] - frameTime);
            percent = this.curves.getCurvePercent(frameIndex / 3 - 1, percent);

            bone.x += (bone.data.x + lastFrameX + (frames[frameIndex + 1/*FRAME_X*/] - lastFrameX) * percent - bone.x) * alpha;
            bone.y += (bone.data.y + lastFrameY + (frames[frameIndex + 2/*FRAME_Y*/] - lastFrameY) * percent - bone.y) * alpha;
        }
    };

    spine.ScaleTimeline = function (frameCount) {
        this.curves = new spine.Curves(frameCount);
        this.frames = []; // time, x, y, ...
        this.frames.length = frameCount * 3;
    };
    spine.ScaleTimeline.prototype = {
        boneIndex: 0,
        getFrameCount: function () {
            return this.frames.length / 3;
        },
        setFrame: function (frameIndex, time, x, y) {
            frameIndex *= 3;
            this.frames[frameIndex] = time;
            this.frames[frameIndex + 1] = x;
            this.frames[frameIndex + 2] = y;
        },
        apply: function (skeleton, time, alpha) {
            var frames = this.frames;
            if (time < frames[0]) return; // Time is before first frame.

            var bone = skeleton.bones[this.boneIndex];

            if (time >= frames[frames.length - 3]) { // Time is after last frame.
                bone.scaleX += (bone.data.scaleX - 1 + frames[frames.length - 2] - bone.scaleX) * alpha;
                bone.scaleY += (bone.data.scaleY - 1 + frames[frames.length - 1] - bone.scaleY) * alpha;
                return;
            }

            // Interpolate between the last frame and the current frame.
            var frameIndex = spine.binarySearch(frames, time, 3);
            var lastFrameX = frames[frameIndex - 2];
            var lastFrameY = frames[frameIndex - 1];
            var frameTime = frames[frameIndex];
            var percent = 1 - (time - frameTime) / (frames[frameIndex + -3/*LAST_FRAME_TIME*/] - frameTime);
            percent = this.curves.getCurvePercent(frameIndex / 3 - 1, percent);

            bone.scaleX += (bone.data.scaleX - 1 + lastFrameX + (frames[frameIndex + 1/*FRAME_X*/] - lastFrameX) * percent - bone.scaleX) * alpha;
            bone.scaleY += (bone.data.scaleY - 1 + lastFrameY + (frames[frameIndex + 2/*FRAME_Y*/] - lastFrameY) * percent - bone.scaleY) * alpha;
        }
    };

    spine.ColorTimeline = function (frameCount) {
        this.curves = new spine.Curves(frameCount);
        this.frames = []; // time, r, g, b, a, ...
        this.frames.length = frameCount * 5;
    };
    spine.ColorTimeline.prototype = {
        slotIndex: 0,
        getFrameCount: function () {
            return this.frames.length / 5;
        },
        setFrame: function (frameIndex, time, r, g, b, a) {
            frameIndex *= 5;
            this.frames[frameIndex] = time;
            this.frames[frameIndex + 1] = r;
            this.frames[frameIndex + 2] = g;
            this.frames[frameIndex + 3] = b;
            this.frames[frameIndex + 4] = a;
        },
        apply: function (skeleton, time, alpha) {
            var frames = this.frames;
            if (time < frames[0]) return; // Time is before first frame.

            var slot = skeleton.slots[this.slotIndex];

            if (time >= frames[frames.length - 5]) { // Time is after last frame.
                var i = frames.length - 1;
                slot.r = frames[i - 3];
                slot.g = frames[i - 2];
                slot.b = frames[i - 1];
                slot.a = frames[i];
                return;
            }

            // Interpolate between the last frame and the current frame.
            var frameIndex = spine.binarySearch(frames, time, 5);
            var lastFrameR = frames[frameIndex - 4];
            var lastFrameG = frames[frameIndex - 3];
            var lastFrameB = frames[frameIndex - 2];
            var lastFrameA = frames[frameIndex - 1];
            var frameTime = frames[frameIndex];
            var percent = 1 - (time - frameTime) / (frames[frameIndex - 5/*LAST_FRAME_TIME*/] - frameTime);
            percent = this.curves.getCurvePercent(frameIndex / 5 - 1, percent);

            var r = lastFrameR + (frames[frameIndex + 1/*FRAME_R*/] - lastFrameR) * percent;
            var g = lastFrameG + (frames[frameIndex + 2/*FRAME_G*/] - lastFrameG) * percent;
            var b = lastFrameB + (frames[frameIndex + 3/*FRAME_B*/] - lastFrameB) * percent;
            var a = lastFrameA + (frames[frameIndex + 4/*FRAME_A*/] - lastFrameA) * percent;
            if (alpha < 1) {
                slot.r += (r - slot.r) * alpha;
                slot.g += (g - slot.g) * alpha;
                slot.b += (b - slot.b) * alpha;
                slot.a += (a - slot.a) * alpha;
            } else {
                slot.r = r;
                slot.g = g;
                slot.b = b;
                slot.a = a;
            }
        }
    };

    spine.AttachmentTimeline = function (frameCount) {
        this.curves = new spine.Curves(frameCount);
        this.frames = []; // time, ...
        this.frames.length = frameCount;
        this.attachmentNames = []; // time, ...
        this.attachmentNames.length = frameCount;
    };
    spine.AttachmentTimeline.prototype = {
        slotIndex: 0,
        getFrameCount: function () {
                return this.frames.length;
        },
        setFrame: function (frameIndex, time, attachmentName) {
            this.frames[frameIndex] = time;
            this.attachmentNames[frameIndex] = attachmentName;
        },
        apply: function (skeleton, time, alpha) {
            var frames = this.frames;
            if (time < frames[0]) return; // Time is before first frame.

            var frameIndex;
            if (time >= frames[frames.length - 1]) // Time is after last frame.
                frameIndex = frames.length - 1;
            else
                frameIndex = spine.binarySearch(frames, time, 1) - 1;

            var attachmentName = this.attachmentNames[frameIndex];
            skeleton.slots[this.slotIndex].setAttachment(!attachmentName ? null : skeleton.getAttachmentBySlotIndex(this.slotIndex, attachmentName));
        }
    };

    spine.SkeletonData = function () {
        this.bones = [];
        this.slots = [];
        this.skins = [];
        this.animations = [];
    };
    spine.SkeletonData.prototype = {
        defaultSkin: null,
        /** @return May be null. */
        findBone: function (boneName) {
            var bones = this.bones;
            for (var i = 0, n = bones.length; i < n; i++)
                if (bones[i].name == boneName) return bones[i];
            return null;
        },
        /** @return -1 if the bone was not found. */
        findBoneIndex: function (boneName) {
            var bones = this.bones;
            for (var i = 0, n = bones.length; i < n; i++)
                if (bones[i].name == boneName) return i;
            return -1;
        },
        /** @return May be null. */
        findSlot: function (slotName) {
            var slots = this.slots;
            for (var i = 0, n = slots.length; i < n; i++) {
                if (slots[i].name == slotName) return slot[i];
            }
            return null;
        },
        /** @return -1 if the bone was not found. */
        findSlotIndex: function (slotName) {
            var slots = this.slots;
            for (var i = 0, n = slots.length; i < n; i++)
                if (slots[i].name == slotName) return i;
            return -1;
        },
        /** @return May be null. */
        findSkin: function (skinName) {
            var skins = this.skins;
            for (var i = 0, n = skins.length; i < n; i++)
                if (skins[i].name == skinName) return skins[i];
            return null;
        },
        /** @return May be null. */
        findAnimation: function (animationName) {
            var animations = this.animations;
            for (var i = 0, n = animations.length; i < n; i++)
                if (animations[i].name == animationName) return animations[i];
            return null;
        }
    };

    spine.Skeleton = function (skeletonData) {
        this.data = skeletonData;

        this.bones = [];
        for (var i = 0, n = skeletonData.bones.length; i < n; i++) {
            var boneData = skeletonData.bones[i];
            var parent = !boneData.parent ? null : this.bones[skeletonData.bones.indexOf(boneData.parent)];
            this.bones.push(new spine.Bone(boneData, parent));
        }

        this.slots = [];
        this.drawOrder = [];
        for (i = 0, n = skeletonData.slots.length; i < n; i++) {
            var slotData = skeletonData.slots[i];
            var bone = this.bones[skeletonData.bones.indexOf(slotData.boneData)];
            var slot = new spine.Slot(slotData, this, bone);
            this.slots.push(slot);
            this.drawOrder.push(slot);
        }
    };
    spine.Skeleton.prototype = {
        x: 0, y: 0,
        skin: null,
        r: 1, g: 1, b: 1, a: 1,
        time: 0,
        flipX: false, flipY: false,
        /** Updates the world transform for each bone. */
        updateWorldTransform: function () {
            var flipX = this.flipX;
            var flipY = this.flipY;
            var bones = this.bones;
            for (var i = 0, n = bones.length; i < n; i++)
                bones[i].updateWorldTransform(flipX, flipY);
        },
        /** Sets the bones and slots to their setup pose values. */
        setToSetupPose: function () {
            this.setBonesToSetupPose();
            this.setSlotsToSetupPose();
        },
        setBonesToSetupPose: function () {
            var bones = this.bones;
            for (var i = 0, n = bones.length; i < n; i++)
                bones[i].setToSetupPose();
        },
        setSlotsToSetupPose: function () {
            var slots = this.slots;
            for (var i = 0, n = slots.length; i < n; i++)
                slots[i].setToSetupPose(i);
        },
        /** @return May return null. */
        getRootBone: function () {
            return this.bones.length ? this.bones[0] : null;
        },
        /** @return May be null. */
        findBone: function (boneName) {
            var bones = this.bones;
            for (var i = 0, n = bones.length; i < n; i++)
                if (bones[i].data.name == boneName) return bones[i];
            return null;
        },
        /** @return -1 if the bone was not found. */
        findBoneIndex: function (boneName) {
            var bones = this.bones;
            for (var i = 0, n = bones.length; i < n; i++)
                if (bones[i].data.name == boneName) return i;
            return -1;
        },
        /** @return May be null. */
        findSlot: function (slotName) {
            var slots = this.slots;
            for (var i = 0, n = slots.length; i < n; i++)
                if (slots[i].data.name == slotName) return slots[i];
            return null;
        },
        /** @return -1 if the bone was not found. */
        findSlotIndex: function (slotName) {
            var slots = this.slots;
            for (var i = 0, n = slots.length; i < n; i++)
                if (slots[i].data.name == slotName) return i;
            return -1;
        },
        setSkinByName: function (skinName) {
            var skin = this.data.findSkin(skinName);
            if (!skin) throw "Skin not found: " + skinName;
            this.setSkin(skin);
        },
        /** Sets the skin used to look up attachments not found in the {@link SkeletonData#getDefaultSkin() default skin}. Attachments
         * from the new skin are attached if the corresponding attachment from the old skin was attached.
         * @param newSkin May be null. */
        setSkin: function (newSkin) {
            if (this.skin && newSkin) newSkin._attachAll(this, this.skin);
            this.skin = newSkin;
        },
        /** @return May be null. */
        getAttachmentBySlotName: function (slotName, attachmentName) {
            return this.getAttachmentBySlotIndex(this.data.findSlotIndex(slotName), attachmentName);
        },
        /** @return May be null. */
        getAttachmentBySlotIndex: function (slotIndex, attachmentName) {
            if (this.skin) {
                var attachment = this.skin.getAttachment(slotIndex, attachmentName);
                if (attachment) return attachment;
            }
            if (this.data.defaultSkin) return this.data.defaultSkin.getAttachment(slotIndex, attachmentName);
            return null;
        },
        /** @param attachmentName May be null. */
        setAttachment: function (slotName, attachmentName) {
            var slots = this.slots;
            for (var i = 0, n = slots.size; i < n; i++) {
                var slot = slots[i];
                if (slot.data.name == slotName) {
                    var attachment = null;
                    if (attachmentName) {
                        attachment = this.getAttachment(i, attachmentName);
                        if (attachment == null) throw "Attachment not found: " + attachmentName + ", for slot: " + slotName;
                    }
                    slot.setAttachment(attachment);
                    return;
                }
            }
            throw "Slot not found: " + slotName;
        },
        update: function (delta) {
            time += delta;
        }
    };

    spine.AttachmentType = {
        region: 0
    };

    spine.RegionAttachment = function () {
        this.offset = [];
        this.offset.length = 8;
        this.uvs = [];
        this.uvs.length = 8;
    };
    spine.RegionAttachment.prototype = {
        x: 0, y: 0,
        rotation: 0,
        scaleX: 1, scaleY: 1,
        width: 0, height: 0,
        rendererObject: null,
        regionOffsetX: 0, regionOffsetY: 0,
        regionWidth: 0, regionHeight: 0,
        regionOriginalWidth: 0, regionOriginalHeight: 0,
        setUVs: function (u, v, u2, v2, rotate) {
            var uvs = this.uvs;
            if (rotate) {
                uvs[2/*X2*/] = u;
                uvs[3/*Y2*/] = v2;
                uvs[4/*X3*/] = u;
                uvs[5/*Y3*/] = v;
                uvs[6/*X4*/] = u2;
                uvs[7/*Y4*/] = v;
                uvs[0/*X1*/] = u2;
                uvs[1/*Y1*/] = v2;
            } else {
                uvs[0/*X1*/] = u;
                uvs[1/*Y1*/] = v2;
                uvs[2/*X2*/] = u;
                uvs[3/*Y2*/] = v;
                uvs[4/*X3*/] = u2;
                uvs[5/*Y3*/] = v;
                uvs[6/*X4*/] = u2;
                uvs[7/*Y4*/] = v2;
            }
        },
        updateOffset: function () {
            var regionScaleX = this.width / this.regionOriginalWidth * this.scaleX;
            var regionScaleY = this.height / this.regionOriginalHeight * this.scaleY;
            var localX = -this.width / 2 * this.scaleX + this.regionOffsetX * regionScaleX;
            var localY = -this.height / 2 * this.scaleY + this.regionOffsetY * regionScaleY;
            var localX2 = localX + this.regionWidth * regionScaleX;
            var localY2 = localY + this.regionHeight * regionScaleY;
            var radians = this.rotation * Math.PI / 180;
            var cos = Math.cos(radians);
            var sin = Math.sin(radians);
            var localXCos = localX * cos + this.x;
            var localXSin = localX * sin;
            var localYCos = localY * cos + this.y;
            var localYSin = localY * sin;
            var localX2Cos = localX2 * cos + this.x;
            var localX2Sin = localX2 * sin;
            var localY2Cos = localY2 * cos + this.y;
            var localY2Sin = localY2 * sin;
            var offset = this.offset;
            offset[0/*X1*/] = localXCos - localYSin;
            offset[1/*Y1*/] = localYCos + localXSin;
            offset[2/*X2*/] = localXCos - localY2Sin;
            offset[3/*Y2*/] = localY2Cos + localXSin;
            offset[4/*X3*/] = localX2Cos - localY2Sin;
            offset[5/*Y3*/] = localY2Cos + localX2Sin;
            offset[6/*X4*/] = localX2Cos - localYSin;
            offset[7/*Y4*/] = localYCos + localX2Sin;
        },
        computeVertices: function (x, y, bone, vertices) {
            x += bone.worldX;
            y += bone.worldY;
            var m00 = bone.m00;
            var m01 = bone.m01;
            var m10 = bone.m10;
            var m11 = bone.m11;
            var offset = this.offset;
            vertices[0/*X1*/] = offset[0/*X1*/] * m00 + offset[1/*Y1*/] * m01 + x;
            vertices[1/*Y1*/] = offset[0/*X1*/] * m10 + offset[1/*Y1*/] * m11 + y;
            vertices[2/*X2*/] = offset[2/*X2*/] * m00 + offset[3/*Y2*/] * m01 + x;
            vertices[3/*Y2*/] = offset[2/*X2*/] * m10 + offset[3/*Y2*/] * m11 + y;
            vertices[4/*X3*/] = offset[4/*X3*/] * m00 + offset[5/*X3*/] * m01 + x;
            vertices[5/*X3*/] = offset[4/*X3*/] * m10 + offset[5/*X3*/] * m11 + y;
            vertices[6/*X4*/] = offset[6/*X4*/] * m00 + offset[7/*Y4*/] * m01 + x;
            vertices[7/*Y4*/] = offset[6/*X4*/] * m10 + offset[7/*Y4*/] * m11 + y;
        }
    }

    spine.AnimationStateData = function (skeletonData) {
        this.skeletonData = skeletonData;
        this.animationToMixTime = {};
    };
    spine.AnimationStateData.prototype = {
            defaultMix: 0,
        setMixByName: function (fromName, toName, duration) {
            var from = this.skeletonData.findAnimation(fromName);
            if (!from) throw "Animation not found: " + fromName;
            var to = this.skeletonData.findAnimation(toName);
            if (!to) throw "Animation not found: " + toName;
            this.setMix(from, to, duration);
        },
        setMix: function (from, to, duration) {
            this.animationToMixTime[from.name + ":" + to.name] = duration;
        },
        getMix: function (from, to) {
            var time = this.animationToMixTime[from.name + ":" + to.name];
                return time ? time : this.defaultMix;
        }
    };

    spine.AnimationState = function (stateData) {
        this.data = stateData;
        this.queue = [];
    };
    spine.AnimationState.prototype = {
        animationSpeed: 1,
        current: null,
        previous: null,
        currentTime: 0,
        previousTime: 0,
        currentLoop: false,
        previousLoop: false,
        mixTime: 0,
        mixDuration: 0,
        update: function (delta) {
            this.currentTime += (delta * this.animationSpeed); //timeScale: Multiply delta by the speed of animation required.
            this.previousTime += delta;
            this.mixTime += delta;

            if (this.queue.length > 0) {
                var entry = this.queue[0];
                if (this.currentTime >= entry.delay) {
                    this._setAnimation(entry.animation, entry.loop);
                    this.queue.shift();
                }
            }
        },
        apply: function (skeleton) {
            if (!this.current) return;
            if (this.previous) {
                this.previous.apply(skeleton, this.previousTime, this.previousLoop);
                var alpha = this.mixTime / this.mixDuration;
                if (alpha >= 1) {
                    alpha = 1;
                    this.previous = null;
                }
                this.current.mix(skeleton, this.currentTime, this.currentLoop, alpha);
            } else
                this.current.apply(skeleton, this.currentTime, this.currentLoop);
        },
        clearAnimation: function () {
            this.previous = null;
            this.current = null;
            this.queue.length = 0;
        },
        _setAnimation: function (animation, loop) {
            this.previous = null;
            if (animation && this.current) {
                this.mixDuration = this.data.getMix(this.current, animation);
                if (this.mixDuration > 0) {
                    this.mixTime = 0;
                    this.previous = this.current;
                    this.previousTime = this.currentTime;
                    this.previousLoop = this.currentLoop;
                }
            }
            this.current = animation;
            this.currentLoop = loop;
            this.currentTime = 0;
        },
        /** @see #setAnimation(Animation, Boolean) */
        setAnimationByName: function (animationName, loop) {
            var animation = this.data.skeletonData.findAnimation(animationName);
            if (!animation) throw "Animation not found: " + animationName;
            this.setAnimation(animation, loop);
        },
        /** Set the current animation. Any queued animations are cleared and the current animation time is set to 0.
         * @param animation May be null. */
        setAnimation: function (animation, loop) {
            this.queue.length = 0;
            this._setAnimation(animation, loop);
        },
        /** @see #addAnimation(Animation, Boolean, Number) */
        addAnimationByName: function (animationName, loop, delay) {
            var animation = this.data.skeletonData.findAnimation(animationName);
            if (!animation) throw "Animation not found: " + animationName;
            this.addAnimation(animation, loop, delay);
        },
        /** Adds an animation to be played delay seconds after the current or last queued animation.
         * @param delay May be <= 0 to use duration of previous animation minus any mix duration plus the negative delay. */
        addAnimation: function (animation, loop, delay) {
            var entry = {};
            entry.animation = animation;
            entry.loop = loop;

            if (!delay || delay <= 0) {
                var previousAnimation = this.queue.length ? this.queue[this.queue.length - 1].animation : this.current;
                if (previousAnimation != null)
                    delay = previousAnimation.duration - this.data.getMix(previousAnimation, animation) + (delay || 0);
                else
                    delay = 0;
            }
            entry.delay = delay;

            this.queue.push(entry);
        },
        /** Returns true if no animation is set or if the current time is greater than the animation duration, regardless of looping. */
        isComplete: function () {
            return !this.current || this.currentTime >= this.current.duration;
        }
    };

    spine.SkeletonJson = function (attachmentLoader) {
        this.attachmentLoader = attachmentLoader;
    };
    spine.SkeletonJson.prototype = {
        scale: 1,
        readSkeletonData: function (root) {
            /*jshint -W069*/
            var skeletonData = new spine.SkeletonData(),
                boneData;

            // Bones.
            var bones = root["bones"];
            for (var i = 0, n = bones.length; i < n; i++) {
                var boneMap = bones[i];
                var parent = null;
                if (boneMap["parent"]) {
                    parent = skeletonData.findBone(boneMap["parent"]);
                    if (!parent) throw "Parent bone not found: " + boneMap["parent"];
                }
                boneData = new spine.BoneData(boneMap["name"], parent);
                boneData.length = (boneMap["length"] || 0) * this.scale;
                boneData.x = (boneMap["x"] || 0) * this.scale;
                boneData.y = (boneMap["y"] || 0) * this.scale;
                boneData.rotation = (boneMap["rotation"] || 0);
                boneData.scaleX = boneMap["scaleX"] || 1;
                boneData.scaleY = boneMap["scaleY"] || 1;
                skeletonData.bones.push(boneData);
            }

            // Slots.
            var slots = root["slots"];
            for (i = 0, n = slots.length; i < n; i++) {
                var slotMap = slots[i];
                boneData = skeletonData.findBone(slotMap["bone"]);
                if (!boneData) throw "Slot bone not found: " + slotMap["bone"];
                var slotData = new spine.SlotData(slotMap["name"], boneData);

                var color = slotMap["color"];
                if (color) {
                    slotData.r = spine.SkeletonJson.toColor(color, 0);
                    slotData.g = spine.SkeletonJson.toColor(color, 1);
                    slotData.b = spine.SkeletonJson.toColor(color, 2);
                    slotData.a = spine.SkeletonJson.toColor(color, 3);
                }

                slotData.attachmentName = slotMap["attachment"];

                skeletonData.slots.push(slotData);
            }

            // Skins.
            var skins = root["skins"];
            for (var skinName in skins) {
                if (!skins.hasOwnProperty(skinName)) continue;
                var skinMap = skins[skinName];
                var skin = new spine.Skin(skinName);
                for (var slotName in skinMap) {
                    if (!skinMap.hasOwnProperty(slotName)) continue;
                    var slotIndex = skeletonData.findSlotIndex(slotName);
                    var slotEntry = skinMap[slotName];
                    for (var attachmentName in slotEntry) {
                        if (!slotEntry.hasOwnProperty(attachmentName)) continue;
                        var attachment = this.readAttachment(skin, attachmentName, slotEntry[attachmentName]);
                        if (attachment != null) skin.addAttachment(slotIndex, attachmentName, attachment);
                    }
                }
                skeletonData.skins.push(skin);
                if (skin.name == "default") skeletonData.defaultSkin = skin;
            }

            // Animations.
            var animations = root["animations"];
            for (var animationName in animations) {
                if (!animations.hasOwnProperty(animationName)) continue;
                this.readAnimation(animationName, animations[animationName], skeletonData);
            }

            return skeletonData;
        },
        readAttachment: function (skin, name, map) {
            /*jshint -W069*/
            name = map["name"] || name;

            var type = spine.AttachmentType[map["type"] || "region"];

            if (type == spine.AttachmentType.region) {
                var attachment = new spine.RegionAttachment();
                attachment.x = (map["x"] || 0) * this.scale;
                attachment.y = (map["y"] || 0) * this.scale;
                attachment.scaleX = map["scaleX"] || 1;
                attachment.scaleY = map["scaleY"] || 1;
                attachment.rotation = map["rotation"] || 0;
                attachment.width = (map["width"] || 32) * this.scale;
                attachment.height = (map["height"] || 32) * this.scale;
                attachment.updateOffset();

                attachment.rendererObject = {};
                attachment.rendererObject.name = name;
                attachment.rendererObject.scale = {};
                attachment.rendererObject.scale.x = attachment.scaleX;
                attachment.rendererObject.scale.y = attachment.scaleY;
                attachment.rendererObject.rotation = -attachment.rotation * Math.PI / 180;
                return attachment;
            }

                throw "Unknown attachment type: " + type;
        },

        readAnimation: function (name, map, skeletonData) {
            /*jshint -W069*/
            var timelines = [];
            var duration = 0;
            var frameIndex, timeline, timelineName, valueMap, values,
                i, n;

            var bones = map["bones"];
            for (var boneName in bones) {
                if (!bones.hasOwnProperty(boneName)) continue;
                var boneIndex = skeletonData.findBoneIndex(boneName);
                if (boneIndex == -1) throw "Bone not found: " + boneName;
                var boneMap = bones[boneName];

                for (timelineName in boneMap) {
                    if (!boneMap.hasOwnProperty(timelineName)) continue;
                    values = boneMap[timelineName];
                    if (timelineName == "rotate") {
                        timeline = new spine.RotateTimeline(values.length);
                        timeline.boneIndex = boneIndex;

                        frameIndex = 0;
                        for (i = 0, n = values.length; i < n; i++) {
                            valueMap = values[i];
                            timeline.setFrame(frameIndex, valueMap["time"], valueMap["angle"]);
                            spine.SkeletonJson.readCurve(timeline, frameIndex, valueMap);
                            frameIndex++;
                        }
                        timelines.push(timeline);
                        duration = Math.max(duration, timeline.frames[timeline.getFrameCount() * 2 - 2]);

                    } else if (timelineName == "translate" || timelineName == "scale") {
                        var timelineScale = 1;
                        if (timelineName == "scale")
                            timeline = new spine.ScaleTimeline(values.length);
                        else {
                            timeline = new spine.TranslateTimeline(values.length);
                            timelineScale = this.scale;
                        }
                        timeline.boneIndex = boneIndex;

                        frameIndex = 0;
                        for (i = 0, n = values.length; i < n; i++) {
                            valueMap = values[i];
                            var x = (valueMap["x"] || 0) * timelineScale;
                            var y = (valueMap["y"] || 0) * timelineScale;
                            timeline.setFrame(frameIndex, valueMap["time"], x, y);
                            spine.SkeletonJson.readCurve(timeline, frameIndex, valueMap);
                            frameIndex++;
                        }
                        timelines.push(timeline);
                        duration = Math.max(duration, timeline.frames[timeline.getFrameCount() * 3 - 3]);

                    } else
                        throw "Invalid timeline type for a bone: " + timelineName + " (" + boneName + ")";
                }
            }
            var slots = map["slots"];
            for (var slotName in slots) {
                if (!slots.hasOwnProperty(slotName)) continue;
                var slotMap = slots[slotName];
                var slotIndex = skeletonData.findSlotIndex(slotName);

                for (timelineName in slotMap) {
                    if (!slotMap.hasOwnProperty(timelineName)) continue;
                    values = slotMap[timelineName];
                    if (timelineName == "color") {
                        timeline = new spine.ColorTimeline(values.length);
                        timeline.slotIndex = slotIndex;

                        frameIndex = 0;
                        for (i = 0, n = values.length; i < n; i++) {
                            valueMap = values[i];
                            var color = valueMap["color"];
                            var r = spine.SkeletonJson.toColor(color, 0);
                            var g = spine.SkeletonJson.toColor(color, 1);
                            var b = spine.SkeletonJson.toColor(color, 2);
                            var a = spine.SkeletonJson.toColor(color, 3);
                            timeline.setFrame(frameIndex, valueMap["time"], r, g, b, a);
                            spine.SkeletonJson.readCurve(timeline, frameIndex, valueMap);
                            frameIndex++;
                        }
                        timelines.push(timeline);
                        duration = Math.max(duration, timeline.frames[timeline.getFrameCount() * 5 - 5]);

                    } else if (timelineName == "attachment") {
                        timeline = new spine.AttachmentTimeline(values.length);
                        timeline.slotIndex = slotIndex;

                        frameIndex = 0;
                        for (i = 0, n = values.length; i < n; i++) {
                            valueMap = values[i];
                            timeline.setFrame(frameIndex++, valueMap["time"], valueMap["name"]);
                        }
                        timelines.push(timeline);
                            duration = Math.max(duration, timeline.frames[timeline.getFrameCount() - 1]);

                    } else
                        throw "Invalid timeline type for a slot: " + timelineName + " (" + slotName + ")";
                }
            }
            skeletonData.animations.push(new spine.Animation(name, timelines, duration));
        }
    };
    spine.SkeletonJson.readCurve = function (timeline, frameIndex, valueMap) {
        /*jshint -W069*/
        var curve = valueMap["curve"];
        if (!curve) return;
        if (curve == "stepped")
            timeline.curves.setStepped(frameIndex);
        else if (curve instanceof Array)
            timeline.curves.setCurve(frameIndex, curve[0], curve[1], curve[2], curve[3]);
    };
    spine.SkeletonJson.toColor = function (hexString, colorIndex) {
        if (hexString.length != 8) throw "Color hexidecimal length must be 8, recieved: " + hexString;
        return parseInt(hexString.substr(colorIndex * 2, 2), 16) / 255;
    };

    spine.Atlas = function (atlasText, textureLoader) {
        this.textureLoader = textureLoader;
        this.pages = [];
        this.regions = [];

        var reader = new spine.AtlasReader(atlasText);
        var tuple = [];
        tuple.length = 4;
        var page = null;
        while (true) {
            var line = reader.readLine();
            if (line == null) break;
            line = reader.trim(line);
            if (!line.length)
                page = null;
            else if (!page) {
                page = new spine.AtlasPage();
                page.name = line;

                page.format = spine.Atlas.Format[reader.readValue()];

                reader.readTuple(tuple);
                page.minFilter = spine.Atlas.TextureFilter[tuple[0]];
                page.magFilter = spine.Atlas.TextureFilter[tuple[1]];

                var direction = reader.readValue();
                page.uWrap = spine.Atlas.TextureWrap.clampToEdge;
                page.vWrap = spine.Atlas.TextureWrap.clampToEdge;
                if (direction == "x")
                    page.uWrap = spine.Atlas.TextureWrap.repeat;
                else if (direction == "y")
                    page.vWrap = spine.Atlas.TextureWrap.repeat;
                else if (direction == "xy")
                    page.uWrap = page.vWrap = spine.Atlas.TextureWrap.repeat;

                textureLoader.load(page, line);

                this.pages.push(page);

            } else {
                var region = new spine.AtlasRegion();
                region.name = line;
                region.page = page;

                region.rotate = reader.readValue() == "true";

                reader.readTuple(tuple);
                var x = parseInt(tuple[0], 10);
                var y = parseInt(tuple[1], 10);

                reader.readTuple(tuple);
                var width = parseInt(tuple[0], 10);
                var height = parseInt(tuple[1], 10);

                region.u = x / page.width;
                region.v = y / page.height;
                if (region.rotate) {
                    region.u2 = (x + height) / page.width;
                    region.v2 = (y + width) / page.height;
                } else {
                    region.u2 = (x + width) / page.width;
                    region.v2 = (y + height) / page.height;
                }
                region.x = x;
                region.y = y;
                region.width = Math.abs(width);
                region.height = Math.abs(height);

                if (reader.readTuple(tuple) == 4) { // split is optional
                    region.splits = [parseInt(tuple[0], 10), parseInt(tuple[1], 10), parseInt(tuple[2], 10), parseInt(tuple[3], 10)];

                    if (reader.readTuple(tuple) == 4) { // pad is optional, but only present with splits
                        region.pads = [parseInt(tuple[0], 10), parseInt(tuple[1], 10), parseInt(tuple[2], 10), parseInt(tuple[3], 10)];

                        reader.readTuple(tuple);
                    }
                }

                region.originalWidth = parseInt(tuple[0], 10);
                region.originalHeight = parseInt(tuple[1], 10);

                reader.readTuple(tuple);
                region.offsetX = parseInt(tuple[0], 10);
                region.offsetY = parseInt(tuple[1], 10);

                region.index = parseInt(reader.readValue(), 10);

                this.regions.push(region);
            }
        }
    };
    spine.Atlas.prototype = {
        findRegion: function (name) {
            var regions = this.regions;
            for (var i = 0, n = regions.length; i < n; i++)
                if (regions[i].name == name) return regions[i];
            return null;
        },
        dispose: function () {
            var pages = this.pages;
            for (var i = 0, n = pages.length; i < n; i++)
                this.textureLoader.unload(pages[i].rendererObject);
        },
        updateUVs: function (page) {
            var regions = this.regions;
            for (var i = 0, n = regions.length; i < n; i++) {
                var region = regions[i];
                if (region.page != page) continue;
                region.u = region.x / page.width;
                region.v = region.y / page.height;
                if (region.rotate) {
                    region.u2 = (region.x + region.height) / page.width;
                    region.v2 = (region.y + region.width) / page.height;
                } else {
                    region.u2 = (region.x + region.width) / page.width;
                    region.v2 = (region.y + region.height) / page.height;
                }
            }
        }
    };

    spine.Atlas.Format = {
        alpha: 0,
        intensity: 1,
        luminanceAlpha: 2,
        rgb565: 3,
        rgba4444: 4,
        rgb888: 5,
        rgba8888: 6
    };

    spine.Atlas.TextureFilter = {
        nearest: 0,
        linear: 1,
        mipMap: 2,
        mipMapNearestNearest: 3,
        mipMapLinearNearest: 4,
        mipMapNearestLinear: 5,
        mipMapLinearLinear: 6
    };

    spine.Atlas.TextureWrap = {
        mirroredRepeat: 0,
        clampToEdge: 1,
        repeat: 2
    };

    spine.AtlasPage = function () {};
    spine.AtlasPage.prototype = {
        name: null,
        format: null,
        minFilter: null,
        magFilter: null,
        uWrap: null,
        vWrap: null,
        rendererObject: null,
        width: 0,
        height: 0
    };

    spine.AtlasRegion = function () {};
    spine.AtlasRegion.prototype = {
        page: null,
        name: null,
        x: 0, y: 0,
        width: 0, height: 0,
        u: 0, v: 0, u2: 0, v2: 0,
        offsetX: 0, offsetY: 0,
        originalWidth: 0, originalHeight: 0,
        index: 0,
        rotate: false,
        splits: null,
        pads: null
    };

    spine.AtlasReader = function (text) {
        this.lines = text.split(/\r\n|\r|\n/);
    };
    spine.AtlasReader.prototype = {
        index: 0,
        trim: function (value) {
            return value.replace(/^\s+|\s+$/g, "");
        },
        readLine: function () {
            if (this.index >= this.lines.length) return null;
            return this.lines[this.index++];
        },
        readValue: function () {
            var line = this.readLine();
            var colon = line.indexOf(":");
            if (colon == -1) throw "Invalid line: " + line;
            return this.trim(line.substring(colon + 1));
        },
        /** Returns the number of tuple values read (2 or 4). */
        readTuple: function (tuple) {
            var line = this.readLine();
            var colon = line.indexOf(":");
            if (colon == -1) throw "Invalid line: " + line;
            var i = 0, lastMatch= colon + 1;
            for (; i < 3; i++) {
                var comma = line.indexOf(",", lastMatch);
                if (comma == -1) {
                    if (!i) throw "Invalid line: " + line;
                    break;
                }
                tuple[i] = this.trim(line.substr(lastMatch, comma - lastMatch));
                lastMatch = comma + 1;
            }
            tuple[i] = this.trim(line.substring(lastMatch));
            return i + 1;
        }
    }

    spine.AtlasAttachmentLoader = function (atlas) {
        this.atlas = atlas;
    }
    spine.AtlasAttachmentLoader.prototype = {
        newAttachment: function (skin, type, name) {
            switch (type) {
            case spine.AttachmentType.region:
                var region = this.atlas.findRegion(name);
                if (!region) throw "Region not found in atlas: " + name + " (" + type + ")";
                var attachment = new spine.RegionAttachment(name);
                attachment.rendererObject = region;
                attachment.setUVs(region.u, region.v, region.u2, region.v2, region.rotate);
                attachment.regionOffsetX = region.offsetX;
                attachment.regionOffsetY = region.offsetY;
                attachment.regionWidth = region.width;
                attachment.regionHeight = region.height;
                attachment.regionOriginalWidth = region.originalWidth;
                attachment.regionOriginalHeight = region.originalHeight;
                return attachment;
            }
            throw "Unknown attachment type: " + type;
        }
    }

    spine.Bone.yDown = true;
    PIXI.AnimCache = {};

    /**
     * A class that enables the you to import and run your spine animations in pixi.
     * Spine animation data needs to be loaded using the PIXI.AssetLoader or PIXI.SpineLoader before it can be used by this class
     * See example 12 (http://www.goodboydigital.com/pixijs/examples/12/) to see a working example and check out the source
     *
     * @class Spine
     * @extends DisplayObjectContainer
     * @constructor
     * @param url {String} The url of the spine anim file to be used
     */
    PIXI.Spine = function (url) {
        PIXI.DisplayObjectContainer.call(this);

        this.spineData = PIXI.AnimCache[url];

        if (!this.spineData) {
            throw new Error("Spine data must be preloaded using PIXI.SpineLoader or PIXI.AssetLoader: " + url);
        }

        this.skeleton = new spine.Skeleton(this.spineData);
        this.skeleton.updateWorldTransform();

        this.stateData = new spine.AnimationStateData(this.spineData);
        this.state = new spine.AnimationState(this.stateData);

        this.slotContainers = [];

        for (var i = 0, n = this.skeleton.drawOrder.length; i < n; i++) {
            var slot = this.skeleton.drawOrder[i];
            var attachment = slot.attachment;
            var slotContainer = new PIXI.DisplayObjectContainer();
            this.slotContainers.push(slotContainer);
            this.addChild(slotContainer);
            if (!(attachment instanceof spine.RegionAttachment)) {
                continue;
            }
            var spriteName = attachment.rendererObject.name;
            var sprite = this.createSprite(slot, attachment.rendererObject);
            slot.currentSprite = sprite;
            slot.currentSpriteName = spriteName;
            slotContainer.addChild(sprite);
        }
    };

    PIXI.Spine.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);
    PIXI.Spine.prototype.constructor = PIXI.Spine;

    /*
     * Updates the object transform for rendering
     *
     * @method updateTransform
     * @private
     */
    PIXI.Spine.prototype.updateTransform = function () {
        this.lastTime = this.lastTime || Date.now();
        var timeDelta = (Date.now() - this.lastTime) * 0.001;
        this.lastTime = Date.now();
        this.state.update(timeDelta);
        this.state.apply(this.skeleton);
        this.skeleton.updateWorldTransform();

        var drawOrder = this.skeleton.drawOrder;
        for (var i = 0, n = drawOrder.length; i < n; i++) {
            var slot = drawOrder[i];
            var attachment = slot.attachment;
            var slotContainer = this.slotContainers[i];
            if (!(attachment instanceof spine.RegionAttachment)) {
                slotContainer.visible = false;
                continue;
            }

            if (attachment.rendererObject) {
                if (!slot.currentSpriteName || slot.currentSpriteName != attachment.name) {
                    var spriteName = attachment.rendererObject.name;
                    if (slot.currentSprite !== undefined) {
                        slot.currentSprite.visible = false;
                    }
                    slot.sprites = slot.sprites || {};
                    if (slot.sprites[spriteName] !== undefined) {
                        slot.sprites[spriteName].visible = true;
                    } else {
                        var sprite = this.createSprite(slot, attachment.rendererObject);
                        slotContainer.addChild(sprite);
                    }
                    slot.currentSprite = slot.sprites[spriteName];
                    slot.currentSpriteName = spriteName;
                }
            }
            slotContainer.visible = true;

            var bone = slot.bone;

            slotContainer.position.x = bone.worldX + attachment.x * bone.m00 + attachment.y * bone.m01;
            slotContainer.position.y = bone.worldY + attachment.x * bone.m10 + attachment.y * bone.m11;
            slotContainer.scale.x = bone.worldScaleX;
            slotContainer.scale.y = bone.worldScaleY;

            slotContainer.rotation = -(slot.bone.worldRotation * Math.PI / 180);

            slotContainer.alpha = slot.a;
            slot.currentSprite.tint = PIXI.rgb2hex([slot.r,slot.g,slot.b]);
        }

        PIXI.DisplayObjectContainer.prototype.updateTransform.call(this);
    };


    PIXI.Spine.prototype.createSprite = function (slot, descriptor) {
        var name = PIXI.TextureCache[descriptor.name] ? descriptor.name : descriptor.name + ".png";
        var sprite = new PIXI.Sprite(PIXI.Texture.fromFrame(name));
        sprite.scale = descriptor.scale;
        sprite.rotation = descriptor.rotation;
        sprite.anchor.x = sprite.anchor.y = 0.5;

        slot.sprites = slot.sprites || {};
        slot.sprites[descriptor.name] = sprite;
        return sprite;
    };

    /**
     * @author Mat Groves http://matgroves.com/ @Doormat23
     */

    PIXI.BaseTextureCache = {};
    PIXI.texturesToUpdate = [];
    PIXI.texturesToDestroy = [];

    PIXI.BaseTextureCacheIdGenerator = 0;

    /**
     * A texture stores the information that represents an image. All textures have a base texture
     *
     * @class BaseTexture
     * @uses EventTarget
     * @constructor
     * @param source {String} the source object (image or canvas)
     * @param scaleMode {Number} Should be one of the PIXI.scaleMode consts
     */
    PIXI.BaseTexture = function(source, scaleMode)
    {
        PIXI.EventTarget.call( this );

        /**
         * [read-only] The width of the base texture set when the image has loaded
         *
         * @property width
         * @type Number
         * @readOnly
         */
        this.width = 100;

        /**
         * [read-only] The height of the base texture set when the image has loaded
         *
         * @property height
         * @type Number
         * @readOnly
         */
        this.height = 100;

        /**
         * The scale mode to apply when scaling this texture
         * @property scaleMode
         * @type PIXI.scaleModes
         * @default PIXI.scaleModes.LINEAR
         */
        this.scaleMode = scaleMode || PIXI.scaleModes.DEFAULT;

        /**
         * [read-only] Describes if the base texture has loaded or not
         *
         * @property hasLoaded
         * @type Boolean
         * @readOnly
         */
        this.hasLoaded = false;

        /**
         * The source that is loaded to create the texture
         *
         * @property source
         * @type Image
         */
        this.source = source;

        //TODO will be used for futer pixi 1.5...
        this.id = PIXI.BaseTextureCacheIdGenerator++;

        /**
         * Controls if RGB channels should be premultiplied by Alpha  (WebGL only)
         *
         * @property
         * @type Boolean
         * @default TRUE
        */
        this.premultipliedAlpha = true;

        // used for webGL
        this._glTextures = [];
        
        // used for webGL teture updateing...
        this._dirty = [];
        
        if(!source)return;

        if((this.source.complete || this.source.getContext) && this.source.width && this.source.height)
        {
            this.hasLoaded = true;
            this.width = this.source.width;
            this.height = this.source.height;

            PIXI.texturesToUpdate.push(this);
        }
        else
        {

            var scope = this;
            this.source.onload = function() {

                scope.hasLoaded = true;
                scope.width = scope.source.width;
                scope.height = scope.source.height;

                for (var i = 0; i < scope._glTextures.length; i++)
                {
                    scope._dirty[i] = true;
                }

                // add it to somewhere...
                scope.dispatchEvent( { type: 'loaded', content: scope } );
            };
            this.source.onerror = function() {
                scope.dispatchEvent( { type: 'error', content: scope } );
            };
        }

        this.imageUrl = null;
        this._powerOf2 = false;

        

    };

    PIXI.BaseTexture.prototype.constructor = PIXI.BaseTexture;

    /**
     * Destroys this base texture
     *
     * @method destroy
     */
    PIXI.BaseTexture.prototype.destroy = function()
    {
        if(this.imageUrl)
        {
            delete PIXI.BaseTextureCache[this.imageUrl];
            delete PIXI.TextureCache[this.imageUrl];
            this.imageUrl = null;
            this.source.src = null;
        }
        else if (this.source && this.source._pixiId)
        {
            delete PIXI.BaseTextureCache[this.source._pixiId];
        }
        this.source = null;
        PIXI.texturesToDestroy.push(this);
    };

    /**
     * Changes the source image of the texture
     *
     * @method updateSourceImage
     * @param newSrc {String} the path of the image
     */
    PIXI.BaseTexture.prototype.updateSourceImage = function(newSrc)
    {
        this.hasLoaded = false;
        this.source.src = null;
        this.source.src = newSrc;
    };

    /**
     * Helper function that returns a base texture based on an image url
     * If the image is not in the base texture cache it will be created and loaded
     *
     * @static
     * @method fromImage
     * @param imageUrl {String} The image url of the texture
     * @param crossorigin {Boolean} 
     * @param scaleMode {Number} Should be one of the PIXI.scaleMode consts
     * @return BaseTexture
     */
    PIXI.BaseTexture.fromImage = function(imageUrl, crossorigin, scaleMode)
    {
        var baseTexture = PIXI.BaseTextureCache[imageUrl];
        
        if(crossorigin === undefined && imageUrl.indexOf('data:') === -1) crossorigin = true;

        if(!baseTexture)
        {
            // new Image() breaks tex loading in some versions of Chrome.
            // See https://code.google.com/p/chromium/issues/detail?id=238071
            var image = new Image();//document.createElement('img');
            if (crossorigin)
            {
                image.crossOrigin = '';
            }
            image.src = imageUrl;
            baseTexture = new PIXI.BaseTexture(image, scaleMode);
            baseTexture.imageUrl = imageUrl;
            PIXI.BaseTextureCache[imageUrl] = baseTexture;
        }

        return baseTexture;
    };

    /**
     * Helper function that returns a base texture based on a canvas element
     * If the image is not in the base texture cache it will be created and loaded
     *
     * @static
     * @method fromCanvas
     * @param canvas {Canvas} The canvas element source of the texture
     * @param scaleMode {Number} Should be one of the PIXI.scaleMode consts
     * @return BaseTexture
     */
    PIXI.BaseTexture.fromCanvas = function(canvas, scaleMode)
    {
        if(!canvas._pixiId)
        {
            canvas._pixiId = 'canvas_' + PIXI.TextureCacheIdGenerator++;
        }

        var baseTexture = PIXI.BaseTextureCache[canvas._pixiId];

        if(!baseTexture)
        {
            baseTexture = new PIXI.BaseTexture(canvas, scaleMode);
            PIXI.BaseTextureCache[canvas._pixiId] = baseTexture;
        }

        return baseTexture;
    };



    /**
     * @author Mat Groves http://matgroves.com/ @Doormat23
     */

    PIXI.TextureCache = {};
    PIXI.FrameCache = {};

    PIXI.TextureCacheIdGenerator = 0;

    /**
     * A texture stores the information that represents an image or part of an image. It cannot be added
     * to the display list directly. To do this use PIXI.Sprite. If no frame is provided then the whole image is used
     *
     * @class Texture
     * @uses EventTarget
     * @constructor
     * @param baseTexture {BaseTexture} The base texture source to create the texture from
     * @param frame {Rectangle} The rectangle frame of the texture to show
     */
    PIXI.Texture = function(baseTexture, frame)
    {
        PIXI.EventTarget.call( this );

        /**
         * Does this Texture have any frame data assigned to it?
         *
         * @property noFrame
         * @type Boolean
         */
        this.noFrame = false;

        if (!frame)
        {
            this.noFrame = true;
            frame = new PIXI.Rectangle(0,0,1,1);
        }

        if (baseTexture instanceof PIXI.Texture)
        {
            baseTexture = baseTexture.baseTexture;
        }

        /**
         * The base texture that this texture uses.
         *
         * @property baseTexture
         * @type BaseTexture
         */
        this.baseTexture = baseTexture;

        /**
         * The frame specifies the region of the base texture that this texture uses
         *
         * @property frame
         * @type Rectangle
         */
        this.frame = frame;

        /**
         * The trim point
         *
         * @property trim
         * @type Rectangle
         */
        this.trim = null;
        
        /**
         * This will let the renderer know if the texture is valid. If its not then it cannot be rendered.
         *
         * @property valid
         * @type Boolean
         */
        this.valid = false;

        /**
         * The context scope under which events are run.
         *
         * @property scope
         * @type Object
         */
        this.scope = this;

        /**
         * The WebGL UV data cache.
         *
         * @private
         * @property _uvs
         * @type Object
         */
        this._uvs = null;
        
        /**
         * The width of the Texture in pixels.
         *
         * @property width
         * @type Number
         */
        this.width = 0;

        /**
         * The height of the Texture in pixels.
         *
         * @property height
         * @type Number
         */
        this.height = 0;

        /**
         * This is the area of the BaseTexture image to actually copy to the Canvas / WebGL when rendering,
         * irrespective of the actual frame size or placement (which can be influenced by trimmed texture atlases)
         *
         * @property crop
         * @type Rectangle
         */
        this.crop = new PIXI.Rectangle(0, 0, 1, 1);

        if (baseTexture.hasLoaded)
        {
            if (this.noFrame) frame = new PIXI.Rectangle(0, 0, baseTexture.width, baseTexture.height);
            this.setFrame(frame);
        }
        else
        {
            var scope = this;
            baseTexture.addEventListener('loaded', function(){ scope.onBaseTextureLoaded(); });
        }
    };

    PIXI.Texture.prototype.constructor = PIXI.Texture;

    /**
     * Called when the base texture is loaded
     *
     * @method onBaseTextureLoaded
     * @param event
     * @private
     */
    PIXI.Texture.prototype.onBaseTextureLoaded = function()
    {
        var baseTexture = this.baseTexture;
        baseTexture.removeEventListener('loaded', this.onLoaded);

        if (this.noFrame) this.frame = new PIXI.Rectangle(0, 0, baseTexture.width, baseTexture.height);
        
        this.setFrame(this.frame);

        this.scope.dispatchEvent( { type: 'update', content: this } );
    };

    /**
     * Destroys this texture
     *
     * @method destroy
     * @param destroyBase {Boolean} Whether to destroy the base texture as well
     */
    PIXI.Texture.prototype.destroy = function(destroyBase)
    {
        if (destroyBase) this.baseTexture.destroy();

        this.valid = false;
    };

    /**
     * Specifies the region of the baseTexture that this texture will use.
     *
     * @method setFrame
     * @param frame {Rectangle} The frame of the texture to set it to
     */
    PIXI.Texture.prototype.setFrame = function(frame)
    {
        this.noFrame = false;

        this.frame = frame;
        this.width = frame.width;
        this.height = frame.height;

        this.crop.x = frame.x;
        this.crop.y = frame.y;
        this.crop.width = frame.width;
        this.crop.height = frame.height;

        if (!this.trim && (frame.x + frame.width > this.baseTexture.width || frame.y + frame.height > this.baseTexture.height))
        {
            throw new Error('Texture Error: frame does not fit inside the base Texture dimensions ' + this);
        }

        this.valid = frame && frame.width && frame.height && this.baseTexture.source && this.baseTexture.hasLoaded;

        if (this.trim)
        {
            this.width = this.trim.width;
            this.height = this.trim.height;
            this.frame.width = this.trim.width;
            this.frame.height = this.trim.height;
        }

        if (this.valid) PIXI.Texture.frameUpdates.push(this);

    };

    /**
     * Updates the internal WebGL UV cache.
     *
     * @method _updateWebGLuvs
     * @private
     */
    PIXI.Texture.prototype._updateWebGLuvs = function()
    {
        if(!this._uvs)this._uvs = new PIXI.TextureUvs();

        var frame = this.crop;
        var tw = this.baseTexture.width;
        var th = this.baseTexture.height;

        this._uvs.x0 = frame.x / tw;
        this._uvs.y0 = frame.y / th;

        this._uvs.x1 = (frame.x + frame.width) / tw;
        this._uvs.y1 = frame.y / th;

        this._uvs.x2 = (frame.x + frame.width) / tw;
        this._uvs.y2 = (frame.y + frame.height) / th;

        this._uvs.x3 = frame.x / tw;
        this._uvs.y3 = (frame.y + frame.height) / th;

    };

    /**
     * Helper function that returns a texture based on an image url
     * If the image is not in the texture cache it will be  created and loaded
     *
     * @static
     * @method fromImage
     * @param imageUrl {String} The image url of the texture
     * @param crossorigin {Boolean} Whether requests should be treated as crossorigin
     * @param scaleMode {Number} Should be one of the PIXI.scaleMode consts
     * @return Texture
     */
    PIXI.Texture.fromImage = function(imageUrl, crossorigin, scaleMode)
    {
        var texture = PIXI.TextureCache[imageUrl];

        if(!texture)
        {
            texture = new PIXI.Texture(PIXI.BaseTexture.fromImage(imageUrl, crossorigin, scaleMode));
            PIXI.TextureCache[imageUrl] = texture;
        }

        return texture;
    };

    /**
     * Helper function that returns a texture based on a frame id
     * If the frame id is not in the texture cache an error will be thrown
     *
     * @static
     * @method fromFrame
     * @param frameId {String} The frame id of the texture
     * @return Texture
     */
    PIXI.Texture.fromFrame = function(frameId)
    {
        var texture = PIXI.TextureCache[frameId];
        if(!texture) throw new Error('The frameId "' + frameId + '" does not exist in the texture cache ');
        return texture;
    };

    /**
     * Helper function that returns a texture based on a canvas element
     * If the canvas is not in the texture cache it will be  created and loaded
     *
     * @static
     * @method fromCanvas
     * @param canvas {Canvas} The canvas element source of the texture
     * @param scaleMode {Number} Should be one of the PIXI.scaleMode consts
     * @return Texture
     */
    PIXI.Texture.fromCanvas = function(canvas, scaleMode)
    {
        var baseTexture = PIXI.BaseTexture.fromCanvas(canvas, scaleMode);

        return new PIXI.Texture( baseTexture );

    };


    /**
     * Adds a texture to the textureCache.
     *
     * @static
     * @method addTextureToCache
     * @param texture {Texture}
     * @param id {String} the id that the texture will be stored against.
     */
    PIXI.Texture.addTextureToCache = function(texture, id)
    {
        PIXI.TextureCache[id] = texture;
    };

    /**
     * Remove a texture from the textureCache.
     *
     * @static
     * @method removeTextureFromCache
     * @param id {String} the id of the texture to be removed
     * @return {Texture} the texture that was removed
     */
    PIXI.Texture.removeTextureFromCache = function(id)
    {
        var texture = PIXI.TextureCache[id];
        delete PIXI.TextureCache[id];
        delete PIXI.BaseTextureCache[id];
        return texture;
    };

    // this is more for webGL.. it contains updated frames..
    PIXI.Texture.frameUpdates = [];

    PIXI.TextureUvs = function()
    {
        this.x0 = 0;
        this.y0 = 0;

        this.x1 = 0;
        this.y1 = 0;

        this.x2 = 0;
        this.y2 = 0;

        this.x3 = 0;
        this.y3 = 0;


    };

    /**
     * @author Mat Groves http://matgroves.com/ @Doormat23
     */

    /**
     A RenderTexture is a special texture that allows any pixi displayObject to be rendered to it.

     __Hint__: All DisplayObjects (exmpl. Sprites) that render on RenderTexture should be preloaded.
     Otherwise black rectangles will be drawn instead.

     RenderTexture takes snapshot of DisplayObject passed to render method. If DisplayObject is passed to render method, position and rotation of it will be ignored. For example:

        var renderTexture = new PIXI.RenderTexture(800, 600);
        var sprite = PIXI.Sprite.fromImage("spinObj_01.png");
        sprite.position.x = 800/2;
        sprite.position.y = 600/2;
        sprite.anchor.x = 0.5;
        sprite.anchor.y = 0.5;
        renderTexture.render(sprite);

     Sprite in this case will be rendered to 0,0 position. To render this sprite at center DisplayObjectContainer should be used:

        var doc = new PIXI.DisplayObjectContainer();
        doc.addChild(sprite);
        renderTexture.render(doc);  // Renders to center of renderTexture

     * @class RenderTexture
     * @extends Texture
     * @constructor
     * @param width {Number} The width of the render texture
     * @param height {Number} The height of the render texture
     * @param scaleMode {Number} Should be one of the PIXI.scaleMode consts
     */
    PIXI.RenderTexture = function(width, height, renderer, scaleMode)
    {
        PIXI.EventTarget.call( this );

        /**
         * The with of the render texture
         *
         * @property width
         * @type Number
         */
        this.width = width || 100;
        /**
         * The height of the render texture
         *
         * @property height
         * @type Number
         */
        this.height = height || 100;

        /**
         * The framing rectangle of the render texture
         *
         * @property frame
         * @type Rectangle
         */
        this.frame = new PIXI.Rectangle(0, 0, this.width, this.height);

        /**
         * This is the area of the BaseTexture image to actually copy to the Canvas / WebGL when rendering,
         * irrespective of the actual frame size or placement (which can be influenced by trimmed texture atlases)
         *
         * @property crop
         * @type Rectangle
         */
        this.crop = new PIXI.Rectangle(0, 0, this.width, this.height);
        
        /**
         * The base texture object that this texture uses
         *
         * @property baseTexture
         * @type BaseTexture
         */
        this.baseTexture = new PIXI.BaseTexture();
        this.baseTexture.width = this.width;
        this.baseTexture.height = this.height;
        this.baseTexture._glTextures = [];

        this.baseTexture.scaleMode = scaleMode || PIXI.scaleModes.DEFAULT;

        this.baseTexture.hasLoaded = true;

        // each render texture can only belong to one renderer at the moment if its webGL
        this.renderer = renderer || PIXI.defaultRenderer;

        if(this.renderer.type === PIXI.WEBGL_RENDERER)
        {
            var gl = this.renderer.gl;

            this.textureBuffer = new PIXI.FilterTexture(gl, this.width, this.height, this.baseTexture.scaleMode);
            this.baseTexture._glTextures[gl.id] =  this.textureBuffer.texture;

            this.render = this.renderWebGL;
            this.projection = new PIXI.Point(this.width/2 , -this.height/2);
        }
        else
        {
            this.render = this.renderCanvas;
            this.textureBuffer = new PIXI.CanvasBuffer(this.width, this.height);
            this.baseTexture.source = this.textureBuffer.canvas;
        }

        this.valid = true;
        PIXI.Texture.frameUpdates.push(this);


    };

    PIXI.RenderTexture.prototype = Object.create(PIXI.Texture.prototype);
    PIXI.RenderTexture.prototype.constructor = PIXI.RenderTexture;

    /**
     * Resize the RenderTexture.
     *
     * @method resize
     * @param width {Number} The width to resize to.
     * @param height {Number} The height to resize to.
     * @param updateBase {Boolean} Should the baseTexture.width and height values be resized as well?
     */
    PIXI.RenderTexture.prototype.resize = function(width, height, updateBase)
    {
        if (width === this.width && height === this.height)
        {
            return;
        }

        this.width = this.frame.width = this.crop.width = width;
        this.height =  this.frame.height = this.crop.height = height;

        if (updateBase)
        {
            this.baseTexture.width = this.width;
            this.baseTexture.height = this.height;
        }

        if (this.renderer.type === PIXI.WEBGL_RENDERER)
        {
            this.projection.x = this.width / 2;
            this.projection.y = -this.height / 2;
        }
        
        this.textureBuffer.resize(this.width, this.height);
    };

    /**
     * Clears the RenderTexture.
     *
     * @method clear
     */
    PIXI.RenderTexture.prototype.clear = function()
    {
        if (this.renderer.type === PIXI.WEBGL_RENDERER)
        {
            this.renderer.gl.bindFramebuffer(this.renderer.gl.FRAMEBUFFER, this.textureBuffer.frameBuffer);
        }
        
        this.textureBuffer.clear();
    };

    /**
     * This function will draw the display object to the texture.
     *
     * @method renderWebGL
     * @param displayObject {DisplayObject} The display object to render this texture on
     * @param clear {Boolean} If true the texture will be cleared before the displayObject is drawn
     * @private
     */
    PIXI.RenderTexture.prototype.renderWebGL = function(displayObject, position, clear)
    {
        //TOOD replace position with matrix..
        var gl = this.renderer.gl;

        gl.colorMask(true, true, true, true);

        gl.viewport(0, 0, this.width, this.height);

        gl.bindFramebuffer(gl.FRAMEBUFFER, this.textureBuffer.frameBuffer );

        if(clear)this.textureBuffer.clear();


        // THIS WILL MESS WITH HIT TESTING!
        var children = displayObject.children;

        //TODO -? create a new one??? dont think so!
        var originalWorldTransform = displayObject.worldTransform;
        displayObject.worldTransform = PIXI.RenderTexture.tempMatrix;
        // modify to flip...
        displayObject.worldTransform.d = -1;
        displayObject.worldTransform.ty = this.projection.y * -2;

        if(position)
        {
            displayObject.worldTransform.tx = position.x;
            displayObject.worldTransform.ty -= position.y;
        }

        for(var i=0,j=children.length; i<j; i++)
        {
            children[i].updateTransform();
        }

        // update the textures!
        PIXI.WebGLRenderer.updateTextures();

        this.renderer.spriteBatch.dirty = true;
        
        this.renderer.renderDisplayObject(displayObject, this.projection, this.textureBuffer.frameBuffer);

        displayObject.worldTransform = originalWorldTransform;

        this.renderer.spriteBatch.dirty = true;
    };


    /**
     * This function will draw the display object to the texture.
     *
     * @method renderCanvas
     * @param displayObject {DisplayObject} The display object to render this texture on
     * @param clear {Boolean} If true the texture will be cleared before the displayObject is drawn
     * @private
     */
    PIXI.RenderTexture.prototype.renderCanvas = function(displayObject, position, clear)
    {
        var children = displayObject.children;

        var originalWorldTransform = displayObject.worldTransform;

        displayObject.worldTransform = PIXI.RenderTexture.tempMatrix;
        
        if(position)
        {
            displayObject.worldTransform.tx = position.x;
            displayObject.worldTransform.ty = position.y;
        }
        else
        {
            displayObject.worldTransform.tx = 0;
            displayObject.worldTransform.ty = 0;
        }

        for(var i = 0, j = children.length; i < j; i++)
        {
            children[i].updateTransform();
        }

        if(clear)this.textureBuffer.clear();

        var context = this.textureBuffer.context;

        this.renderer.renderDisplayObject(displayObject, context);

        context.setTransform(1,0,0,1,0,0);

        displayObject.worldTransform = originalWorldTransform;
    };

    PIXI.RenderTexture.tempMatrix = new PIXI.Matrix();


    /**
     * @author Mat Groves http://matgroves.com/ @Doormat23
     */

    /**
     * A Class that loads a bunch of images / sprite sheet / bitmap font files. Once the
     * assets have been loaded they are added to the PIXI Texture cache and can be accessed
     * easily through PIXI.Texture.fromImage() and PIXI.Sprite.fromImage()
     * When all items have been loaded this class will dispatch a 'onLoaded' event
     * As each individual item is loaded this class will dispatch a 'onProgress' event
     *
     * @class AssetLoader
     * @constructor
     * @uses EventTarget
     * @param {Array<String>} assetURLs an array of image/sprite sheet urls that you would like loaded
     *      supported. Supported image formats include 'jpeg', 'jpg', 'png', 'gif'. Supported
     *      sprite sheet data formats only include 'JSON' at this time. Supported bitmap font
     *      data formats include 'xml' and 'fnt'.
     * @param crossorigin {Boolean} Whether requests should be treated as crossorigin
     */
    PIXI.AssetLoader = function(assetURLs, crossorigin)
    {
        PIXI.EventTarget.call(this);

        /**
         * The array of asset URLs that are going to be loaded
         *
         * @property assetURLs
         * @type Array<String>
         */
        this.assetURLs = assetURLs;

        /**
         * Whether the requests should be treated as cross origin
         *
         * @property crossorigin
         * @type Boolean
         */
        this.crossorigin = crossorigin;

        /**
         * Maps file extension to loader types
         *
         * @property loadersByType
         * @type Object
         */
        this.loadersByType = {
            'jpg':  PIXI.ImageLoader,
            'jpeg': PIXI.ImageLoader,
            'png':  PIXI.ImageLoader,
            'gif':  PIXI.ImageLoader,
            'webp': PIXI.ImageLoader,
            'json': PIXI.JsonLoader,
            'atlas': PIXI.AtlasLoader,
            'anim': PIXI.SpineLoader,
            'xml':  PIXI.BitmapFontLoader,
            'fnt':  PIXI.BitmapFontLoader
        };
    };

    /**
     * Fired when an item has loaded
     * @event onProgress
     */

    /**
     * Fired when all the assets have loaded
     * @event onComplete
     */

    // constructor
    PIXI.AssetLoader.prototype.constructor = PIXI.AssetLoader;

    /**
     * Given a filename, returns its extension, wil
     *
     * @method _getDataType
     * @param str {String} the name of the asset
     */
    PIXI.AssetLoader.prototype._getDataType = function(str)
    {
        var test = 'data:';
        //starts with 'data:'
        var start = str.slice(0, test.length).toLowerCase();
        if (start === test) {
            var data = str.slice(test.length);

            var sepIdx = data.indexOf(',');
            if (sepIdx === -1) //malformed data URI scheme
                return null;

            //e.g. 'image/gif;base64' => 'image/gif'
            var info = data.slice(0, sepIdx).split(';')[0];

            //We might need to handle some special cases here...
            //standardize text/plain to 'txt' file extension
            if (!info || info.toLowerCase() === 'text/plain')
                return 'txt';

            //User specified mime type, try splitting it by '/'
            return info.split('/').pop().toLowerCase();
        }

        return null;
    };

    /**
     * Starts loading the assets sequentially
     *
     * @method load
     */
    PIXI.AssetLoader.prototype.load = function()
    {
        var scope = this;

        function onLoad(evt) {
            scope.onAssetLoaded(evt.content);
        }

        this.loadCount = this.assetURLs.length;

        for (var i=0; i < this.assetURLs.length; i++)
        {
            var fileName = this.assetURLs[i];
            //first see if we have a data URI scheme..
            var fileType = this._getDataType(fileName);

            //if not, assume it's a file URI
            if (!fileType)
                fileType = fileName.split('?').shift().split('.').pop().toLowerCase();

            var Constructor = this.loadersByType[fileType];
            if(!Constructor)
                throw new Error(fileType + ' is an unsupported file type');

            var loader = new Constructor(fileName, this.crossorigin);

            loader.addEventListener('loaded', onLoad);
            loader.load();
        }
    };

    /**
     * Invoked after each file is loaded
     *
     * @method onAssetLoaded
     * @private
     */
    PIXI.AssetLoader.prototype.onAssetLoaded = function(loader)
    {
        this.loadCount--;
        this.dispatchEvent({ type: 'onProgress', content: this, loader: loader });
        if (this.onProgress) this.onProgress(loader);

        if (!this.loadCount)
        {
            this.dispatchEvent({type: 'onComplete', content: this});
            if(this.onComplete) this.onComplete();
        }
    };

    /**
     * @author Mat Groves http://matgroves.com/ @Doormat23
     */

    /**
     * The json file loader is used to load in JSON data and parse it
     * When loaded this class will dispatch a 'loaded' event
     * If loading fails this class will dispatch an 'error' event
     *
     * @class JsonLoader
     * @uses EventTarget
     * @constructor
     * @param url {String} The url of the JSON file
     * @param crossorigin {Boolean} Whether requests should be treated as crossorigin
     */
    PIXI.JsonLoader = function (url, crossorigin) {
        PIXI.EventTarget.call(this);

        /**
         * The url of the bitmap font data
         *
         * @property url
         * @type String
         */
        this.url = url;

        /**
         * Whether the requests should be treated as cross origin
         *
         * @property crossorigin
         * @type Boolean
         */
        this.crossorigin = crossorigin;

        /**
         * [read-only] The base url of the bitmap font data
         *
         * @property baseUrl
         * @type String
         * @readOnly
         */
        this.baseUrl = url.replace(/[^\/]*$/, '');

        /**
         * [read-only] Whether the data has loaded yet
         *
         * @property loaded
         * @type Boolean
         * @readOnly
         */
        this.loaded = false;

    };

    // constructor
    PIXI.JsonLoader.prototype.constructor = PIXI.JsonLoader;

    /**
     * Loads the JSON data
     *
     * @method load
     */
    PIXI.JsonLoader.prototype.load = function () {

        var scope = this;

        if(window.XDomainRequest && scope.crossorigin)
        {
            this.ajaxRequest = new window.XDomainRequest();

            // XDomainRequest has a few querks. Occasionally it will abort requests
            // A way to avoid this is to make sure ALL callbacks are set even if not used
            // More info here: http://stackoverflow.com/questions/15786966/xdomainrequest-aborts-post-on-ie-9
            this.ajaxRequest.timeout = 3000;

            this.ajaxRequest.onerror = function () {
                scope.onError();
            };
               
            this.ajaxRequest.ontimeout = function () {
                scope.onError();
            };

            this.ajaxRequest.onprogress = function() {};

        }
        else if (window.XMLHttpRequest)
        {
            this.ajaxRequest = new window.XMLHttpRequest();
        }
        else
        {
            this.ajaxRequest = new window.ActiveXObject('Microsoft.XMLHTTP');
        }

        

        this.ajaxRequest.onload = function(){

            scope.onJSONLoaded();
        };

        this.ajaxRequest.open('GET',this.url,true);

        this.ajaxRequest.send();
    };

    /**
     * Invoke when JSON file is loaded
     *
     * @method onJSONLoaded
     * @private
     */
    PIXI.JsonLoader.prototype.onJSONLoaded = function () {
        
        if(!this.ajaxRequest.responseText )
        {
            this.onError();
            return;
        }
       
        this.json = JSON.parse(this.ajaxRequest.responseText);

        if(this.json.frames)
        {
            // sprite sheet
            var scope = this;
            var textureUrl = this.baseUrl + this.json.meta.image;
            var image = new PIXI.ImageLoader(textureUrl, this.crossorigin);
            var frameData = this.json.frames;

            this.texture = image.texture.baseTexture;
            image.addEventListener('loaded', function() {
                scope.onLoaded();
            });

            for (var i in frameData)
            {
                var rect = frameData[i].frame;

                if (rect)
                {
                    PIXI.TextureCache[i] = new PIXI.Texture(this.texture, {
                        x: rect.x,
                        y: rect.y,
                        width: rect.w,
                        height: rect.h
                    });

                    PIXI.TextureCache[i].crop = new PIXI.Rectangle(rect.x, rect.y, rect.w, rect.h);

                    //  Check to see if the sprite is trimmed
                    if (frameData[i].trimmed)
                    {
                        var actualSize = frameData[i].sourceSize;
                        var realSize = frameData[i].spriteSourceSize;
                        PIXI.TextureCache[i].trim = new PIXI.Rectangle(realSize.x, realSize.y, actualSize.w, actualSize.h);
                    }
                }
            }

            image.load();

        }
        else if(this.json.bones)
        {
            // spine animation
            var spineJsonParser = new spine.SkeletonJson();
            var skeletonData = spineJsonParser.readSkeletonData(this.json);
            PIXI.AnimCache[this.url] = skeletonData;
            this.onLoaded();
        }
        else
        {
            this.onLoaded();
        }
    };

    /**
     * Invoke when json file loaded
     *
     * @method onLoaded
     * @private
     */
    PIXI.JsonLoader.prototype.onLoaded = function () {
        this.loaded = true;
        this.dispatchEvent({
            type: 'loaded',
            content: this
        });
    };

    /**
     * Invoke when error occured
     *
     * @method onError
     * @private
     */
    PIXI.JsonLoader.prototype.onError = function () {

        this.dispatchEvent({
            type: 'error',
            content: this
        });
    };

    /**
     * @author Martin Kelm http://mkelm.github.com
     */

    /**
     * The atlas file loader is used to load in Atlas data and parse it
     * When loaded this class will dispatch a 'loaded' event
     * If loading fails this class will dispatch an 'error' event
     * @class AtlasLoader
     * @extends EventTarget
     * @constructor
     * @param {String} url the url of the JSON file
     * @param {Boolean} crossorigin
     */

    PIXI.AtlasLoader = function (url, crossorigin) {
        PIXI.EventTarget.call(this);
        this.url = url;
        this.baseUrl = url.replace(/[^\/]*$/, '');
        this.crossorigin = crossorigin;
        this.loaded = false;

    };

    // constructor
    PIXI.AtlasLoader.constructor = PIXI.AtlasLoader;


     /**
     * Starts loading the JSON file
     *
     * @method load
     */
    PIXI.AtlasLoader.prototype.load = function () {
        this.ajaxRequest = new PIXI.AjaxRequest();
        this.ajaxRequest.onreadystatechange = this.onAtlasLoaded.bind(this);

        this.ajaxRequest.open('GET', this.url, true);
        if (this.ajaxRequest.overrideMimeType) this.ajaxRequest.overrideMimeType('application/json');
        this.ajaxRequest.send(null);
    };

    /**
     * Invoke when JSON file is loaded
     * @method onAtlasLoaded
     * @private
     */
    PIXI.AtlasLoader.prototype.onAtlasLoaded = function () {
        if (this.ajaxRequest.readyState === 4) {
            if (this.ajaxRequest.status === 200 || window.location.href.indexOf('http') === -1) {
                this.atlas = {
                    meta : {
                        image : []
                    },
                    frames : []
                };
                var result = this.ajaxRequest.responseText.split(/\r?\n/);
                var lineCount = -3;

                var currentImageId = 0;
                var currentFrame = null;
                var nameInNextLine = false;

                var i = 0,
                    j = 0,
                    selfOnLoaded = this.onLoaded.bind(this);

                // parser without rotation support yet!
                for (i = 0; i < result.length; i++) {
                    result[i] = result[i].replace(/^\s+|\s+$/g, '');
                    if (result[i] === '') {
                        nameInNextLine = i+1;
                    }
                    if (result[i].length > 0) {
                        if (nameInNextLine === i) {
                            this.atlas.meta.image.push(result[i]);
                            currentImageId = this.atlas.meta.image.length - 1;
                            this.atlas.frames.push({});
                            lineCount = -3;
                        } else if (lineCount > 0) {
                            if (lineCount % 7 === 1) { // frame name
                                if (currentFrame != null) { //jshint ignore:line
                                    this.atlas.frames[currentImageId][currentFrame.name] = currentFrame;
                                }
                                currentFrame = { name: result[i], frame : {} };
                            } else {
                                var text = result[i].split(' ');
                                if (lineCount % 7 === 3) { // position
                                    currentFrame.frame.x = Number(text[1].replace(',', ''));
                                    currentFrame.frame.y = Number(text[2]);
                                } else if (lineCount % 7 === 4) { // size
                                    currentFrame.frame.w = Number(text[1].replace(',', ''));
                                    currentFrame.frame.h = Number(text[2]);
                                } else if (lineCount % 7 === 5) { // real size
                                    var realSize = {
                                        x : 0,
                                        y : 0,
                                        w : Number(text[1].replace(',', '')),
                                        h : Number(text[2])
                                    };

                                    if (realSize.w > currentFrame.frame.w || realSize.h > currentFrame.frame.h) {
                                        currentFrame.trimmed = true;
                                        currentFrame.realSize = realSize;
                                    } else {
                                        currentFrame.trimmed = false;
                                    }
                                }
                            }
                        }
                        lineCount++;
                    }
                }

                if (currentFrame != null) { //jshint ignore:line
                    this.atlas.frames[currentImageId][currentFrame.name] = currentFrame;
                }

                if (this.atlas.meta.image.length > 0) {
                    this.images = [];
                    for (j = 0; j < this.atlas.meta.image.length; j++) {
                        // sprite sheet
                        var textureUrl = this.baseUrl + this.atlas.meta.image[j];
                        var frameData = this.atlas.frames[j];
                        this.images.push(new PIXI.ImageLoader(textureUrl, this.crossorigin));

                        for (i in frameData) {
                            var rect = frameData[i].frame;
                            if (rect) {
                                PIXI.TextureCache[i] = new PIXI.Texture(this.images[j].texture.baseTexture, {
                                    x: rect.x,
                                    y: rect.y,
                                    width: rect.w,
                                    height: rect.h
                                });
                                if (frameData[i].trimmed) {
                                    PIXI.TextureCache[i].realSize = frameData[i].realSize;
                                    // trim in pixi not supported yet, todo update trim properties if it is done ...
                                    PIXI.TextureCache[i].trim.x = 0;
                                    PIXI.TextureCache[i].trim.y = 0;
                                }
                            }
                        }
                    }

                    this.currentImageId = 0;
                    for (j = 0; j < this.images.length; j++) {
                        this.images[j].addEventListener('loaded', selfOnLoaded);
                    }
                    this.images[this.currentImageId].load();

                } else {
                    this.onLoaded();
                }

            } else {
                this.onError();
            }
        }
    };

    /**
     * Invoke when json file has loaded
     * @method onLoaded
     * @private
     */
    PIXI.AtlasLoader.prototype.onLoaded = function () {
        if (this.images.length - 1 > this.currentImageId) {
            this.currentImageId++;
            this.images[this.currentImageId].load();
        } else {
            this.loaded = true;
            this.dispatchEvent({
                type: 'loaded',
                content: this
            });
        }
    };

    /**
     * Invoke when error occured
     * @method onError
     * @private
     */
    PIXI.AtlasLoader.prototype.onError = function () {
        this.dispatchEvent({
            type: 'error',
            content: this
        });
    };

    /**
     * @author Mat Groves http://matgroves.com/ @Doormat23
     */

    /**
     * The sprite sheet loader is used to load in JSON sprite sheet data
     * To generate the data you can use http://www.codeandweb.com/texturepacker and publish in the 'JSON' format
     * There is a free version so thats nice, although the paid version is great value for money.
     * It is highly recommended to use Sprite sheets (also know as a 'texture atlas') as it means sprites can be batched and drawn together for highly increased rendering speed.
     * Once the data has been loaded the frames are stored in the PIXI texture cache and can be accessed though PIXI.Texture.fromFrameId() and PIXI.Sprite.fromFrameId()
     * This loader will load the image file that the Spritesheet points to as well as the data.
     * When loaded this class will dispatch a 'loaded' event
     *
     * @class SpriteSheetLoader
     * @uses EventTarget
     * @constructor
     * @param url {String} The url of the sprite sheet JSON file
     * @param crossorigin {Boolean} Whether requests should be treated as crossorigin
     */
    PIXI.SpriteSheetLoader = function (url, crossorigin) {
        /*
         * i use texture packer to load the assets..
         * http://www.codeandweb.com/texturepacker
         * make sure to set the format as 'JSON'
         */
        PIXI.EventTarget.call(this);

        /**
         * The url of the bitmap font data
         *
         * @property url
         * @type String
         */
        this.url = url;

        /**
         * Whether the requests should be treated as cross origin
         *
         * @property crossorigin
         * @type Boolean
         */
        this.crossorigin = crossorigin;

        /**
         * [read-only] The base url of the bitmap font data
         *
         * @property baseUrl
         * @type String
         * @readOnly
         */
        this.baseUrl = url.replace(/[^\/]*$/, '');

        /**
         * The texture being loaded
         *
         * @property texture
         * @type Texture
         */
        this.texture = null;

        /**
         * The frames of the sprite sheet
         *
         * @property frames
         * @type Object
         */
        this.frames = {};
    };

    // constructor
    PIXI.SpriteSheetLoader.prototype.constructor = PIXI.SpriteSheetLoader;

    /**
     * This will begin loading the JSON file
     *
     * @method load
     */
    PIXI.SpriteSheetLoader.prototype.load = function () {
        var scope = this;
        var jsonLoader = new PIXI.JsonLoader(this.url, this.crossorigin);
        jsonLoader.addEventListener('loaded', function (event) {
            scope.json = event.content.json;
            scope.onLoaded();
        });
        jsonLoader.load();
    };

    /**
     * Invoke when all files are loaded (json and texture)
     *
     * @method onLoaded
     * @private
     */
    PIXI.SpriteSheetLoader.prototype.onLoaded = function () {
        this.dispatchEvent({
            type: 'loaded',
            content: this
        });
    };

    /**
     * @author Mat Groves http://matgroves.com/ @Doormat23
     */

    /**
     * The image loader class is responsible for loading images file formats ('jpeg', 'jpg', 'png' and 'gif')
     * Once the image has been loaded it is stored in the PIXI texture cache and can be accessed though PIXI.Texture.fromFrameId() and PIXI.Sprite.fromFrameId()
     * When loaded this class will dispatch a 'loaded' event
     *
     * @class ImageLoader
     * @uses EventTarget
     * @constructor
     * @param url {String} The url of the image
     * @param crossorigin {Boolean} Whether requests should be treated as crossorigin
     */
    PIXI.ImageLoader = function(url, crossorigin)
    {
        PIXI.EventTarget.call(this);

        /**
         * The texture being loaded
         *
         * @property texture
         * @type Texture
         */
        this.texture = PIXI.Texture.fromImage(url, crossorigin);

        /**
         * if the image is loaded with loadFramedSpriteSheet
         * frames will contain the sprite sheet frames
         *
         */
        this.frames = [];
    };

    // constructor
    PIXI.ImageLoader.prototype.constructor = PIXI.ImageLoader;

    /**
     * Loads image or takes it from cache
     *
     * @method load
     */
    PIXI.ImageLoader.prototype.load = function()
    {
        if(!this.texture.baseTexture.hasLoaded)
        {
            var scope = this;
            this.texture.baseTexture.addEventListener('loaded', function()
            {
                scope.onLoaded();
            });
        }
        else
        {
            this.onLoaded();
        }
    };

    /**
     * Invoked when image file is loaded or it is already cached and ready to use
     *
     * @method onLoaded
     * @private
     */
    PIXI.ImageLoader.prototype.onLoaded = function()
    {
        this.dispatchEvent({type: 'loaded', content: this});
    };

    /**
     * Loads image and split it to uniform sized frames
     *
     *
     * @method loadFramedSpriteSheet
     * @param frameWidth {Number} width of each frame
     * @param frameHeight {Number} height of each frame
     * @param textureName {String} if given, the frames will be cached in <textureName>-<ord> format
     */
    PIXI.ImageLoader.prototype.loadFramedSpriteSheet = function(frameWidth, frameHeight, textureName)
    {
        this.frames = [];
        var cols = Math.floor(this.texture.width / frameWidth);
        var rows = Math.floor(this.texture.height / frameHeight);

        var i=0;
        for (var y=0; y<rows; y++)
        {
            for (var x=0; x<cols; x++,i++)
            {
                var texture = new PIXI.Texture(this.texture, {
                    x: x*frameWidth,
                    y: y*frameHeight,
                    width: frameWidth,
                    height: frameHeight
                });

                this.frames.push(texture);
                if (textureName) PIXI.TextureCache[textureName + '-' + i] = texture;
            }
        }

        if(!this.texture.baseTexture.hasLoaded)
        {
            var scope = this;
            this.texture.baseTexture.addEventListener('loaded', function() {
                scope.onLoaded();
            });
        }
        else
        {
            this.onLoaded();
        }
    };

    /**
     * @author Mat Groves http://matgroves.com/ @Doormat23
     */

    /**
     * The xml loader is used to load in XML bitmap font data ('xml' or 'fnt')
     * To generate the data you can use http://www.angelcode.com/products/bmfont/
     * This loader will also load the image file as the data.
     * When loaded this class will dispatch a 'loaded' event
     *
     * @class BitmapFontLoader
     * @uses EventTarget
     * @constructor
     * @param url {String} The url of the sprite sheet JSON file
     * @param crossorigin {Boolean} Whether requests should be treated as crossorigin
     */
    PIXI.BitmapFontLoader = function(url, crossorigin)
    {
        /*
         * I use texture packer to load the assets..
         * http://www.codeandweb.com/texturepacker
         * make sure to set the format as 'JSON'
         */
        PIXI.EventTarget.call(this);

        /**
         * The url of the bitmap font data
         *
         * @property url
         * @type String
         */
        this.url = url;

        /**
         * Whether the requests should be treated as cross origin
         *
         * @property crossorigin
         * @type Boolean
         */
        this.crossorigin = crossorigin;

        /**
         * [read-only] The base url of the bitmap font data
         *
         * @property baseUrl
         * @type String
         * @readOnly
         */
        this.baseUrl = url.replace(/[^\/]*$/, '');

        /**
         * [read-only] The texture of the bitmap font
         *
         * @property baseUrl
         * @type String
         */
        this.texture = null;
    };

    // constructor
    PIXI.BitmapFontLoader.prototype.constructor = PIXI.BitmapFontLoader;

    /**
     * Loads the XML font data
     *
     * @method load
     */
    PIXI.BitmapFontLoader.prototype.load = function()
    {
        this.ajaxRequest = new PIXI.AjaxRequest();
        var scope = this;
        this.ajaxRequest.onreadystatechange = function()
        {
            scope.onXMLLoaded();
        };

        this.ajaxRequest.open('GET', this.url, true);
        if (this.ajaxRequest.overrideMimeType) this.ajaxRequest.overrideMimeType('application/xml');
        this.ajaxRequest.send(null);
    };

    /**
     * Invoked when the XML file is loaded, parses the data
     *
     * @method onXMLLoaded
     * @private
     */
    PIXI.BitmapFontLoader.prototype.onXMLLoaded = function()
    {
        if (this.ajaxRequest.readyState === 4)
        {
            if (this.ajaxRequest.status === 200 || window.location.protocol.indexOf('http') === -1)
            {
                var responseXML = this.ajaxRequest.responseXML;
                if(!responseXML || /MSIE 9/i.test(navigator.userAgent) || navigator.isCocoonJS) {
                    if(typeof(window.DOMParser) === 'function') {
                        var domparser = new DOMParser();
                        responseXML = domparser.parseFromString(this.ajaxRequest.responseText, 'text/xml');
                    } else {
                        var div = document.createElement('div');
                        div.innerHTML = this.ajaxRequest.responseText;
                        responseXML = div;
                    }
                }

                var textureUrl = this.baseUrl + responseXML.getElementsByTagName('page')[0].getAttribute('file');
                var image = new PIXI.ImageLoader(textureUrl, this.crossorigin);
                this.texture = image.texture.baseTexture;

                var data = {};
                var info = responseXML.getElementsByTagName('info')[0];
                var common = responseXML.getElementsByTagName('common')[0];
                data.font = info.getAttribute('face');
                data.size = parseInt(info.getAttribute('size'), 10);
                data.lineHeight = parseInt(common.getAttribute('lineHeight'), 10);
                data.chars = {};

                //parse letters
                var letters = responseXML.getElementsByTagName('char');

                for (var i = 0; i < letters.length; i++)
                {
                    var charCode = parseInt(letters[i].getAttribute('id'), 10);

                    var textureRect = new PIXI.Rectangle(
                        parseInt(letters[i].getAttribute('x'), 10),
                        parseInt(letters[i].getAttribute('y'), 10),
                        parseInt(letters[i].getAttribute('width'), 10),
                        parseInt(letters[i].getAttribute('height'), 10)
                    );

                    data.chars[charCode] = {
                        xOffset: parseInt(letters[i].getAttribute('xoffset'), 10),
                        yOffset: parseInt(letters[i].getAttribute('yoffset'), 10),
                        xAdvance: parseInt(letters[i].getAttribute('xadvance'), 10),
                        kerning: {},
                        texture: PIXI.TextureCache[charCode] = new PIXI.Texture(this.texture, textureRect)

                    };
                }

                //parse kernings
                var kernings = responseXML.getElementsByTagName('kerning');
                for (i = 0; i < kernings.length; i++)
                {
                    var first = parseInt(kernings[i].getAttribute('first'), 10);
                    var second = parseInt(kernings[i].getAttribute('second'), 10);
                    var amount = parseInt(kernings[i].getAttribute('amount'), 10);

                    data.chars[second].kerning[first] = amount;

                }

                PIXI.BitmapText.fonts[data.font] = data;

                var scope = this;
                image.addEventListener('loaded', function() {
                    scope.onLoaded();
                });
                image.load();
            }
        }
    };

    /**
     * Invoked when all files are loaded (xml/fnt and texture)
     *
     * @method onLoaded
     * @private
     */
    PIXI.BitmapFontLoader.prototype.onLoaded = function()
    {
        this.dispatchEvent({type: 'loaded', content: this});
    };

    /**
     * @author Mat Groves http://matgroves.com/ @Doormat23
     * based on pixi impact spine implementation made by Eemeli Kelokorpi (@ekelokorpi) https://github.com/ekelokorpi
     *
     * Awesome JS run time provided by EsotericSoftware
     * https://github.com/EsotericSoftware/spine-runtimes
     *
     */

    /**
     * The Spine loader is used to load in JSON spine data
     * To generate the data you need to use http://esotericsoftware.com/ and export in the "JSON" format
     * Due to a clash of names  You will need to change the extension of the spine file from *.json to *.anim for it to load
     * See example 12 (http://www.goodboydigital.com/pixijs/examples/12/) to see a working example and check out the source
     * You will need to generate a sprite sheet to accompany the spine data
     * When loaded this class will dispatch a "loaded" event
     *
     * @class Spine
     * @uses EventTarget
     * @constructor
     * @param url {String} The url of the JSON file
     * @param crossorigin {Boolean} Whether requests should be treated as crossorigin
     */
    PIXI.SpineLoader = function(url, crossorigin)
    {
        PIXI.EventTarget.call(this);

        /**
         * The url of the bitmap font data
         *
         * @property url
         * @type String
         */
        this.url = url;

        /**
         * Whether the requests should be treated as cross origin
         *
         * @property crossorigin
         * @type Boolean
         */
        this.crossorigin = crossorigin;

        /**
         * [read-only] Whether the data has loaded yet
         *
         * @property loaded
         * @type Boolean
         * @readOnly
         */
        this.loaded = false;
    };

    PIXI.SpineLoader.prototype.constructor = PIXI.SpineLoader;

    /**
     * Loads the JSON data
     *
     * @method load
     */
    PIXI.SpineLoader.prototype.load = function () {

        var scope = this;
        var jsonLoader = new PIXI.JsonLoader(this.url, this.crossorigin);
        jsonLoader.addEventListener("loaded", function (event) {
            scope.json = event.content.json;
            scope.onLoaded();
        });
        jsonLoader.load();
    };

    /**
     * Invoke when JSON file is loaded
     *
     * @method onLoaded
     * @private
     */
    PIXI.SpineLoader.prototype.onLoaded = function () {
        this.loaded = true;
        this.dispatchEvent({type: "loaded", content: this});
    };


    /**
     * @author Mat Groves http://matgroves.com/ @Doormat23
     */

    /**
     * This is the base class for creating a pixi.js filter. Currently only webGL supports filters.
     * If you want to make a custom filter this should be your base class.
     * @class AbstractFilter
     * @constructor
     * @param fragmentSrc
     * @param uniforms
     */
    PIXI.AbstractFilter = function(fragmentSrc, uniforms)
    {
        /**
        * An array of passes - some filters contain a few steps this array simply stores the steps in a liniear fashion.
        * For example the blur filter has two passes blurX and blurY.
        * @property passes
        * @type Array an array of filter objects
        * @private
        */
        this.passes = [this];

        /**
        * @property shaders
        * @type Array an array of shaders
        * @private
        */
        this.shaders = [];
        
        this.dirty = true;
        this.padding = 0;

        /**
        * @property uniforms
        * @type object
        * @private
        */
        this.uniforms = uniforms || {};
        /**
        * @property fragmentSrc
        * @type Array
        * @private
        */
        this.fragmentSrc = fragmentSrc || [];
    };

    /**
     * @author Mat Groves http://matgroves.com/ @Doormat23
     */

    /**
     *
     * The AlphaMaskFilter class uses the pixel values from the specified texture (called the displacement map) to perform a displacement of an object.
     * You can use this filter to apply all manor of crazy warping effects
     * Currently the r property of the texture is used to offset the x and the g propery of the texture is used to offset the y.
     * @class AlphaMaskFilter
     * @contructor
     * @param texture {Texture} The texture used for the displacemtent map * must be power of 2 texture at the moment
     */
    PIXI.AlphaMaskFilter = function(texture)
    {
        PIXI.AbstractFilter.call( this );

        this.passes = [this];
        texture.baseTexture._powerOf2 = true;

        // set the uniforms
        this.uniforms = {
            mask: {type: 'sampler2D', value:texture},
            mapDimensions:   {type: '2f', value:{x:1, y:5112}},
            dimensions:   {type: '4fv', value:[0,0,0,0]}
        };

        if(texture.baseTexture.hasLoaded)
        {
            this.uniforms.mask.value.x = texture.width;
            this.uniforms.mask.value.y = texture.height;
        }
        else
        {
            this.boundLoadedFunction = this.onTextureLoaded.bind(this);

            texture.baseTexture.on('loaded', this.boundLoadedFunction);
        }

        this.fragmentSrc = [
            'precision mediump float;',
            'varying vec2 vTextureCoord;',
            'varying vec4 vColor;',
            'uniform sampler2D mask;',
            'uniform sampler2D uSampler;',
            'uniform vec2 offset;',
            'uniform vec4 dimensions;',
            'uniform vec2 mapDimensions;',

            'void main(void) {',
            '   vec2 mapCords = vTextureCoord.xy;',
            '   mapCords += (dimensions.zw + offset)/ dimensions.xy ;',
            '   mapCords.y *= -1.0;',
            '   mapCords.y += 1.0;',
            '   mapCords *= dimensions.xy / mapDimensions;',

            '   vec4 original =  texture2D(uSampler, vTextureCoord);',
            '   float maskAlpha =  texture2D(mask, mapCords).r;',
            '   original *= maskAlpha;',
            //'   original.rgb *= maskAlpha;',
            '   gl_FragColor =  original;',
            //'   gl_FragColor = gl_FragColor;',
            '}'
        ];
    };

    PIXI.AlphaMaskFilter.prototype = Object.create( PIXI.AbstractFilter.prototype );
    PIXI.AlphaMaskFilter.prototype.constructor = PIXI.AlphaMaskFilter;

    PIXI.AlphaMaskFilter.prototype.onTextureLoaded = function()
    {
        this.uniforms.mapDimensions.value.x = this.uniforms.mask.value.width;
        this.uniforms.mapDimensions.value.y = this.uniforms.mask.value.height;

        this.uniforms.mask.value.baseTexture.off('loaded', this.boundLoadedFunction);
    };

    /**
     * The texture used for the displacemtent map * must be power of 2 texture at the moment
     *
     * @property map
     * @type Texture
     */
    Object.defineProperty(PIXI.AlphaMaskFilter.prototype, 'map', {
        get: function() {
            return this.uniforms.mask.value;
        },
        set: function(value) {
            this.uniforms.mask.value = value;
        }
    });


    /**
     * @author Mat Groves http://matgroves.com/ @Doormat23
     */

    /**
     *
     * The ColorMatrixFilter class lets you apply a 4x4 matrix transformation on the RGBA
     * color and alpha values of every pixel on your displayObject to produce a result
     * with a new set of RGBA color and alpha values. Its pretty powerful!
     * @class ColorMatrixFilter
     * @contructor
     */
    PIXI.ColorMatrixFilter = function()
    {
        PIXI.AbstractFilter.call( this );

        this.passes = [this];

        // set the uniforms
        this.uniforms = {
            matrix: {type: 'mat4', value: [1,0,0,0,
                                           0,1,0,0,
                                           0,0,1,0,
                                           0,0,0,1]}
        };

        this.fragmentSrc = [
            'precision mediump float;',
            'varying vec2 vTextureCoord;',
            'varying vec4 vColor;',
            'uniform float invert;',
            'uniform mat4 matrix;',
            'uniform sampler2D uSampler;',

            'void main(void) {',
            '   gl_FragColor = texture2D(uSampler, vTextureCoord) * matrix;',
          //  '   gl_FragColor = gl_FragColor;',
            '}'
        ];
    };

    PIXI.ColorMatrixFilter.prototype = Object.create( PIXI.AbstractFilter.prototype );
    PIXI.ColorMatrixFilter.prototype.constructor = PIXI.ColorMatrixFilter;

    /**
     * Sets the matrix of the color matrix filter
     *
     * @property matrix
     * @type Array and array of 26 numbers
     * @default [1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]
     */
    Object.defineProperty(PIXI.ColorMatrixFilter.prototype, 'matrix', {
        get: function() {
            return this.uniforms.matrix.value;
        },
        set: function(value) {
            this.uniforms.matrix.value = value;
        }
    });
    /**
     * @author Mat Groves http://matgroves.com/ @Doormat23
     */

    /**
     *
     * This turns your displayObjects to black and white.
     * @class GrayFilter
     * @contructor
     */
    PIXI.GrayFilter = function()
    {
        PIXI.AbstractFilter.call( this );

        this.passes = [this];

        // set the uniforms
        this.uniforms = {
            gray: {type: '1f', value: 1}
        };

        this.fragmentSrc = [
            'precision mediump float;',
            'varying vec2 vTextureCoord;',
            'varying vec4 vColor;',
            'uniform sampler2D uSampler;',
            'uniform float gray;',

            'void main(void) {',
            '   gl_FragColor = texture2D(uSampler, vTextureCoord);',
            '   gl_FragColor.rgb = mix(gl_FragColor.rgb, vec3(0.2126*gl_FragColor.r + 0.7152*gl_FragColor.g + 0.0722*gl_FragColor.b), gray);',
         //   '   gl_FragColor = gl_FragColor;',
            '}'
        ];
    };

    PIXI.GrayFilter.prototype = Object.create( PIXI.AbstractFilter.prototype );
    PIXI.GrayFilter.prototype.constructor = PIXI.GrayFilter;

    /**
    The strength of the gray. 1 will make the object black and white, 0 will make the object its normal color
    @property gray
    */
    Object.defineProperty(PIXI.GrayFilter.prototype, 'gray', {
        get: function() {
            return this.uniforms.gray.value;
        },
        set: function(value) {
            this.uniforms.gray.value = value;
        }
    });

    /**
     * @author Mat Groves http://matgroves.com/ @Doormat23
     */

    /**
     *
     * The DisplacementFilter class uses the pixel values from the specified texture (called the displacement map) to perform a displacement of an object.
     * You can use this filter to apply all manor of crazy warping effects
     * Currently the r property of the texture is used offset the x and the g propery of the texture is used to offset the y.
     * @class DisplacementFilter
     * @contructor
     * @param texture {Texture} The texture used for the displacemtent map * must be power of 2 texture at the moment
     */
    PIXI.DisplacementFilter = function(texture)
    {
        PIXI.AbstractFilter.call( this );

        this.passes = [this];
        texture.baseTexture._powerOf2 = true;

        // set the uniforms
        this.uniforms = {
            displacementMap: {type: 'sampler2D', value:texture},
            scale:           {type: '2f', value:{x:30, y:30}},
            offset:          {type: '2f', value:{x:0, y:0}},
            mapDimensions:   {type: '2f', value:{x:1, y:5112}},
            dimensions:   {type: '4fv', value:[0,0,0,0]}
        };

        if(texture.baseTexture.hasLoaded)
        {
            this.uniforms.mapDimensions.value.x = texture.width;
            this.uniforms.mapDimensions.value.y = texture.height;
        }
        else
        {
            this.boundLoadedFunction = this.onTextureLoaded.bind(this);

            texture.baseTexture.on('loaded', this.boundLoadedFunction);
        }

        this.fragmentSrc = [
            'precision mediump float;',
            'varying vec2 vTextureCoord;',
            'varying vec4 vColor;',
            'uniform sampler2D displacementMap;',
            'uniform sampler2D uSampler;',
            'uniform vec2 scale;',
            'uniform vec2 offset;',
            'uniform vec4 dimensions;',
            'uniform vec2 mapDimensions;',// = vec2(256.0, 256.0);',
            // 'const vec2 textureDimensions = vec2(750.0, 750.0);',

            'void main(void) {',
            '   vec2 mapCords = vTextureCoord.xy;',
            //'   mapCords -= ;',
            '   mapCords += (dimensions.zw + offset)/ dimensions.xy ;',
            '   mapCords.y *= -1.0;',
            '   mapCords.y += 1.0;',
            '   vec2 matSample = texture2D(displacementMap, mapCords).xy;',
            '   matSample -= 0.5;',
            '   matSample *= scale;',
            '   matSample /= mapDimensions;',
            '   gl_FragColor = texture2D(uSampler, vec2(vTextureCoord.x + matSample.x, vTextureCoord.y + matSample.y));',
            '   gl_FragColor.rgb = mix( gl_FragColor.rgb, gl_FragColor.rgb, 1.0);',
            '   vec2 cord = vTextureCoord;',

            //'   gl_FragColor =  texture2D(displacementMap, cord);',
         //   '   gl_FragColor = gl_FragColor;',
            '}'
        ];
    };

    PIXI.DisplacementFilter.prototype = Object.create( PIXI.AbstractFilter.prototype );
    PIXI.DisplacementFilter.prototype.constructor = PIXI.DisplacementFilter;

    PIXI.DisplacementFilter.prototype.onTextureLoaded = function()
    {
        this.uniforms.mapDimensions.value.x = this.uniforms.displacementMap.value.width;
        this.uniforms.mapDimensions.value.y = this.uniforms.displacementMap.value.height;

        this.uniforms.displacementMap.value.baseTexture.off('loaded', this.boundLoadedFunction);
    };

    /**
     * The texture used for the displacemtent map * must be power of 2 texture at the moment
     *
     * @property map
     * @type Texture
     */
    Object.defineProperty(PIXI.DisplacementFilter.prototype, 'map', {
        get: function() {
            return this.uniforms.displacementMap.value;
        },
        set: function(value) {
            this.uniforms.displacementMap.value = value;
        }
    });

    /**
     * The multiplier used to scale the displacement result from the map calculation.
     *
     * @property scale
     * @type Point
     */
    Object.defineProperty(PIXI.DisplacementFilter.prototype, 'scale', {
        get: function() {
            return this.uniforms.scale.value;
        },
        set: function(value) {
            this.uniforms.scale.value = value;
        }
    });

    /**
     * The offset used to move the displacement map.
     *
     * @property offset
     * @type Point
     */
    Object.defineProperty(PIXI.DisplacementFilter.prototype, 'offset', {
        get: function() {
            return this.uniforms.offset.value;
        },
        set: function(value) {
            this.uniforms.offset.value = value;
        }
    });

    /**
     * @author Mat Groves http://matgroves.com/ @Doormat23
     */

    /**
     *
     * This filter applies a pixelate effect making display objects appear 'blocky'
     * @class PixelateFilter
     * @contructor
     */
    PIXI.PixelateFilter = function()
    {
        PIXI.AbstractFilter.call( this );

        this.passes = [this];

        // set the uniforms
        this.uniforms = {
            invert: {type: '1f', value: 0},
            dimensions: {type: '4fv', value:new Float32Array([10000, 100, 10, 10])},
            pixelSize: {type: '2f', value:{x:10, y:10}}
        };

        this.fragmentSrc = [
            'precision mediump float;',
            'varying vec2 vTextureCoord;',
            'varying vec4 vColor;',
            'uniform vec2 testDim;',
            'uniform vec4 dimensions;',
            'uniform vec2 pixelSize;',
            'uniform sampler2D uSampler;',

            'void main(void) {',
            '   vec2 coord = vTextureCoord;',

            '   vec2 size = dimensions.xy/pixelSize;',

            '   vec2 color = floor( ( vTextureCoord * size ) ) / size + pixelSize/dimensions.xy * 0.5;',
            '   gl_FragColor = texture2D(uSampler, color);',
            '}'
        ];
    };

    PIXI.PixelateFilter.prototype = Object.create( PIXI.AbstractFilter.prototype );
    PIXI.PixelateFilter.prototype.constructor = PIXI.PixelateFilter;

    /**
     *
     * This a point that describes the size of the blocs. x is the width of the block and y is the the height
     * @property size
     * @type Point
     */
    Object.defineProperty(PIXI.PixelateFilter.prototype, 'size', {
        get: function() {
            return this.uniforms.pixelSize.value;
        },
        set: function(value) {
            this.dirty = true;
            this.uniforms.pixelSize.value = value;
        }
    });

    /**
     * @author Mat Groves http://matgroves.com/ @Doormat23
     */

    PIXI.BlurXFilter = function()
    {
        PIXI.AbstractFilter.call( this );

        this.passes = [this];

        // set the uniforms
        this.uniforms = {
            blur: {type: '1f', value: 1/512}
        };

        this.fragmentSrc = [
            'precision mediump float;',
            'varying vec2 vTextureCoord;',
            'varying vec4 vColor;',
            'uniform float blur;',
            'uniform sampler2D uSampler;',

            'void main(void) {',
            '   vec4 sum = vec4(0.0);',

            '   sum += texture2D(uSampler, vec2(vTextureCoord.x - 4.0*blur, vTextureCoord.y)) * 0.05;',
            '   sum += texture2D(uSampler, vec2(vTextureCoord.x - 3.0*blur, vTextureCoord.y)) * 0.09;',
            '   sum += texture2D(uSampler, vec2(vTextureCoord.x - 2.0*blur, vTextureCoord.y)) * 0.12;',
            '   sum += texture2D(uSampler, vec2(vTextureCoord.x - blur, vTextureCoord.y)) * 0.15;',
            '   sum += texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y)) * 0.16;',
            '   sum += texture2D(uSampler, vec2(vTextureCoord.x + blur, vTextureCoord.y)) * 0.15;',
            '   sum += texture2D(uSampler, vec2(vTextureCoord.x + 2.0*blur, vTextureCoord.y)) * 0.12;',
            '   sum += texture2D(uSampler, vec2(vTextureCoord.x + 3.0*blur, vTextureCoord.y)) * 0.09;',
            '   sum += texture2D(uSampler, vec2(vTextureCoord.x + 4.0*blur, vTextureCoord.y)) * 0.05;',

            '   gl_FragColor = sum;',
            '}'
        ];
    };

    PIXI.BlurXFilter.prototype = Object.create( PIXI.AbstractFilter.prototype );
    PIXI.BlurXFilter.prototype.constructor = PIXI.BlurXFilter;

    Object.defineProperty(PIXI.BlurXFilter.prototype, 'blur', {
        get: function() {
            return this.uniforms.blur.value / (1/7000);
        },
        set: function(value) {

            this.dirty = true;
            this.uniforms.blur.value = (1/7000) * value;
        }
    });

    /**
     * @author Mat Groves http://matgroves.com/ @Doormat23
     */

    PIXI.BlurYFilter = function()
    {
        PIXI.AbstractFilter.call( this );

        this.passes = [this];

        // set the uniforms
        this.uniforms = {
            blur: {type: '1f', value: 1/512}
        };

        this.fragmentSrc = [
            'precision mediump float;',
            'varying vec2 vTextureCoord;',
            'varying vec4 vColor;',
            'uniform float blur;',
            'uniform sampler2D uSampler;',

            'void main(void) {',
            '   vec4 sum = vec4(0.0);',

            '   sum += texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y - 4.0*blur)) * 0.05;',
            '   sum += texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y - 3.0*blur)) * 0.09;',
            '   sum += texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y - 2.0*blur)) * 0.12;',
            '   sum += texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y - blur)) * 0.15;',
            '   sum += texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y)) * 0.16;',
            '   sum += texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y + blur)) * 0.15;',
            '   sum += texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y + 2.0*blur)) * 0.12;',
            '   sum += texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y + 3.0*blur)) * 0.09;',
            '   sum += texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y + 4.0*blur)) * 0.05;',

            '   gl_FragColor = sum;',
            '}'
        ];
    };

    PIXI.BlurYFilter.prototype = Object.create( PIXI.AbstractFilter.prototype );
    PIXI.BlurYFilter.prototype.constructor = PIXI.BlurYFilter;

    Object.defineProperty(PIXI.BlurYFilter.prototype, 'blur', {
        get: function() {
            return this.uniforms.blur.value / (1/7000);
        },
        set: function(value) {
            //this.padding = value;
            this.uniforms.blur.value = (1/7000) * value;
        }
    });

    /**
     * @author Mat Groves http://matgroves.com/ @Doormat23
     */

    /**
     *
     * The BlurFilter applies a Gaussian blur to an object.
     * The strength of the blur can be set for x- and y-axis separately (always relative to the stage).
     *
     * @class BlurFilter
     * @contructor
     */
    PIXI.BlurFilter = function()
    {
        this.blurXFilter = new PIXI.BlurXFilter();
        this.blurYFilter = new PIXI.BlurYFilter();

        this.passes =[this.blurXFilter, this.blurYFilter];
    };

    /**
     * Sets the strength of both the blurX and blurY properties simultaneously
     *
     * @property blur
     * @type Number the strength of the blur
     * @default 2
     */
    Object.defineProperty(PIXI.BlurFilter.prototype, 'blur', {
        get: function() {
            return this.blurXFilter.blur;
        },
        set: function(value) {
            this.blurXFilter.blur = this.blurYFilter.blur = value;
        }
    });

    /**
     * Sets the strength of the blurX property
     *
     * @property blurX
     * @type Number the strength of the blurX
     * @default 2
     */
    Object.defineProperty(PIXI.BlurFilter.prototype, 'blurX', {
        get: function() {
            return this.blurXFilter.blur;
        },
        set: function(value) {
            this.blurXFilter.blur = value;
        }
    });

    /**
     * Sets the strength of the blurX property
     *
     * @property blurY
     * @type Number the strength of the blurY
     * @default 2
     */
    Object.defineProperty(PIXI.BlurFilter.prototype, 'blurY', {
        get: function() {
            return this.blurYFilter.blur;
        },
        set: function(value) {
            this.blurYFilter.blur = value;
        }
    });

    /**
     * @author Mat Groves http://matgroves.com/ @Doormat23
     */

    /**
     *
     * This inverts your displayObjects colors.
     * @class InvertFilter
     * @contructor
     */
    PIXI.InvertFilter = function()
    {
        PIXI.AbstractFilter.call( this );

        this.passes = [this];

        // set the uniforms
        this.uniforms = {
            invert: {type: '1f', value: 1}
        };

        this.fragmentSrc = [
            'precision mediump float;',
            'varying vec2 vTextureCoord;',
            'varying vec4 vColor;',
            'uniform float invert;',
            'uniform sampler2D uSampler;',

            'void main(void) {',
            '   gl_FragColor = texture2D(uSampler, vTextureCoord);',
            '   gl_FragColor.rgb = mix( (vec3(1)-gl_FragColor.rgb) * gl_FragColor.a, gl_FragColor.rgb, 1.0 - invert);',
            //'   gl_FragColor.rgb = gl_FragColor.rgb  * gl_FragColor.a;',
          //  '   gl_FragColor = gl_FragColor * vColor;',
            '}'
        ];
    };

    PIXI.InvertFilter.prototype = Object.create( PIXI.AbstractFilter.prototype );
    PIXI.InvertFilter.prototype.constructor = PIXI.InvertFilter;

    /**
    The strength of the invert. 1 will fully invert the colors, 0 will make the object its normal color
    @property invert
    */
    Object.defineProperty(PIXI.InvertFilter.prototype, 'invert', {
        get: function() {
            return this.uniforms.invert.value;
        },
        set: function(value) {
            this.uniforms.invert.value = value;
        }
    });

    /**
     * @author Mat Groves http://matgroves.com/ @Doormat23
     */

    /**
     *
     * This applies a sepia effect to your displayObjects.
     * @class SepiaFilter
     * @contructor
     */
    PIXI.SepiaFilter = function()
    {
        PIXI.AbstractFilter.call( this );

        this.passes = [this];

        // set the uniforms
        this.uniforms = {
            sepia: {type: '1f', value: 1}
        };

        this.fragmentSrc = [
            'precision mediump float;',
            'varying vec2 vTextureCoord;',
            'varying vec4 vColor;',
            'uniform float sepia;',
            'uniform sampler2D uSampler;',

            'const mat3 sepiaMatrix = mat3(0.3588, 0.7044, 0.1368, 0.2990, 0.5870, 0.1140, 0.2392, 0.4696, 0.0912);',

            'void main(void) {',
            '   gl_FragColor = texture2D(uSampler, vTextureCoord);',
            '   gl_FragColor.rgb = mix( gl_FragColor.rgb, gl_FragColor.rgb * sepiaMatrix, sepia);',
           // '   gl_FragColor = gl_FragColor * vColor;',
            '}'
        ];
    };

    PIXI.SepiaFilter.prototype = Object.create( PIXI.AbstractFilter.prototype );
    PIXI.SepiaFilter.prototype.constructor = PIXI.SepiaFilter;

    /**
    The strength of the sepia. 1 will apply the full sepia effect, 0 will make the object its normal color
    @property sepia
    */
    Object.defineProperty(PIXI.SepiaFilter.prototype, 'sepia', {
        get: function() {
            return this.uniforms.sepia.value;
        },
        set: function(value) {
            this.uniforms.sepia.value = value;
        }
    });

    /**
     * @author Mat Groves http://matgroves.com/ @Doormat23
     */

    /**
     *
     * This filter applies a twist effect making display objects appear twisted in the given direction
     * @class TwistFilter
     * @contructor
     */
    PIXI.TwistFilter = function()
    {
        PIXI.AbstractFilter.call( this );

        this.passes = [this];

        // set the uniforms
        this.uniforms = {
            radius: {type: '1f', value:0.5},
            angle: {type: '1f', value:5},
            offset: {type: '2f', value:{x:0.5, y:0.5}}
        };

        this.fragmentSrc = [
            'precision mediump float;',
            'varying vec2 vTextureCoord;',
            'varying vec4 vColor;',
            'uniform vec4 dimensions;',
            'uniform sampler2D uSampler;',

            'uniform float radius;',
            'uniform float angle;',
            'uniform vec2 offset;',

            'void main(void) {',
            '   vec2 coord = vTextureCoord - offset;',
            '   float distance = length(coord);',

            '   if (distance < radius) {',
            '       float ratio = (radius - distance) / radius;',
            '       float angleMod = ratio * ratio * angle;',
            '       float s = sin(angleMod);',
            '       float c = cos(angleMod);',
            '       coord = vec2(coord.x * c - coord.y * s, coord.x * s + coord.y * c);',
            '   }',

            '   gl_FragColor = texture2D(uSampler, coord+offset);',
            '}'
        ];
    };

    PIXI.TwistFilter.prototype = Object.create( PIXI.AbstractFilter.prototype );
    PIXI.TwistFilter.prototype.constructor = PIXI.TwistFilter;

    /**
     *
     * This point describes the the offset of the twist
     * @property size
     * @type Point
     */
    Object.defineProperty(PIXI.TwistFilter.prototype, 'offset', {
        get: function() {
            return this.uniforms.offset.value;
        },
        set: function(value) {
            this.dirty = true;
            this.uniforms.offset.value = value;
        }
    });

    /**
     *
     * This radius describes size of the twist
     * @property size
     * @type Number
     */
    Object.defineProperty(PIXI.TwistFilter.prototype, 'radius', {
        get: function() {
            return this.uniforms.radius.value;
        },
        set: function(value) {
            this.dirty = true;
            this.uniforms.radius.value = value;
        }
    });

    /**
     *
     * This radius describes angle of the twist
     * @property angle
     * @type Number
     */
    Object.defineProperty(PIXI.TwistFilter.prototype, 'angle', {
        get: function() {
            return this.uniforms.angle.value;
        },
        set: function(value) {
            this.dirty = true;
            this.uniforms.angle.value = value;
        }
    });
    /**
     * @author Mat Groves http://matgroves.com/ @Doormat23
     */

    /**
     *
     * This lowers the color depth of your image by the given amount, producing an image with a smaller palette.
     * @class ColorStepFilter
     * @contructor
     */
    PIXI.ColorStepFilter = function()
    {
        PIXI.AbstractFilter.call( this );

        this.passes = [this];

        // set the uniforms
        this.uniforms = {
            step: {type: '1f', value: 5}
        };

        this.fragmentSrc = [
            'precision mediump float;',
            'varying vec2 vTextureCoord;',
            'varying vec4 vColor;',
            'uniform sampler2D uSampler;',
            'uniform float step;',

            'void main(void) {',
            '   vec4 color = texture2D(uSampler, vTextureCoord);',
            '   color = floor(color * step) / step;',
            '   gl_FragColor = color;',
            '}'
        ];
    };

    PIXI.ColorStepFilter.prototype = Object.create( PIXI.AbstractFilter.prototype );
    PIXI.ColorStepFilter.prototype.constructor = PIXI.ColorStepFilter;

    /**
    The number of steps.
    @property step
    */
    Object.defineProperty(PIXI.ColorStepFilter.prototype, 'step', {
        get: function() {
            return this.uniforms.step.value;
        },
        set: function(value) {
            this.uniforms.step.value = value;
        }
    });

    /**
     * @author Mat Groves http://matgroves.com/ @Doormat23
     * original filter: https://github.com/evanw/glfx.js/blob/master/src/filters/fun/dotscreen.js
     */

    /**
     *
     * This filter applies a dotscreen effect making display objects appear to be made out of black and white halftone dots like an old printer
     * @class DotScreenFilter
     * @contructor
     */
    PIXI.DotScreenFilter = function()
    {
        PIXI.AbstractFilter.call( this );

        this.passes = [this];

        // set the uniforms
        this.uniforms = {
            scale: {type: '1f', value:1},
            angle: {type: '1f', value:5},
            dimensions:   {type: '4fv', value:[0,0,0,0]}
        };

        this.fragmentSrc = [
            'precision mediump float;',
            'varying vec2 vTextureCoord;',
            'varying vec4 vColor;',
            'uniform vec4 dimensions;',
            'uniform sampler2D uSampler;',

            'uniform float angle;',
            'uniform float scale;',

            'float pattern() {',
            '   float s = sin(angle), c = cos(angle);',
            '   vec2 tex = vTextureCoord * dimensions.xy;',
            '   vec2 point = vec2(',
            '       c * tex.x - s * tex.y,',
            '       s * tex.x + c * tex.y',
            '   ) * scale;',
            '   return (sin(point.x) * sin(point.y)) * 4.0;',
            '}',

            'void main() {',
            '   vec4 color = texture2D(uSampler, vTextureCoord);',
            '   float average = (color.r + color.g + color.b) / 3.0;',
            '   gl_FragColor = vec4(vec3(average * 10.0 - 5.0 + pattern()), color.a);',
            '}'
        ];
    };

    PIXI.DotScreenFilter.prototype = Object.create( PIXI.AbstractFilter.prototype );
    PIXI.DotScreenFilter.prototype.constructor = PIXI.DotScreenFilter;

    /**
     *
     * This describes the the scale
     * @property scale
     * @type Number
     */
    Object.defineProperty(PIXI.DotScreenFilter.prototype, 'scale', {
        get: function() {
            return this.uniforms.scale.value;
        },
        set: function(value) {
            this.dirty = true;
            this.uniforms.scale.value = value;
        }
    });

    /**
     *
     * This radius describes angle
     * @property angle
     * @type Number
     */
    Object.defineProperty(PIXI.DotScreenFilter.prototype, 'angle', {
        get: function() {
            return this.uniforms.angle.value;
        },
        set: function(value) {
            this.dirty = true;
            this.uniforms.angle.value = value;
        }
    });

    /**
     * @author Mat Groves http://matgroves.com/ @Doormat23
     */

    PIXI.CrossHatchFilter = function()
    {
        PIXI.AbstractFilter.call( this );

        this.passes = [this];

        // set the uniforms
        this.uniforms = {
            blur: {type: '1f', value: 1 / 512}
        };

        this.fragmentSrc = [
            'precision mediump float;',
            'varying vec2 vTextureCoord;',
            'varying vec4 vColor;',
            'uniform float blur;',
            'uniform sampler2D uSampler;',

            'void main(void) {',
            '    float lum = length(texture2D(uSampler, vTextureCoord.xy).rgb);',

            '    gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);',

            '    if (lum < 1.00) {',
            '        if (mod(gl_FragCoord.x + gl_FragCoord.y, 10.0) == 0.0) {',
            '            gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);',
            '        }',
            '    }',

            '    if (lum < 0.75) {',
            '        if (mod(gl_FragCoord.x - gl_FragCoord.y, 10.0) == 0.0) {',
            '            gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);',
            '        }',
            '    }',

            '    if (lum < 0.50) {',
            '        if (mod(gl_FragCoord.x + gl_FragCoord.y - 5.0, 10.0) == 0.0) {',
            '            gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);',
            '        }',
            '    }',

            '    if (lum < 0.3) {',
            '        if (mod(gl_FragCoord.x - gl_FragCoord.y - 5.0, 10.0) == 0.0) {',
            '            gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);',
            '        }',
            '    }',
            '}'
        ];
    };

    PIXI.CrossHatchFilter.prototype = Object.create( PIXI.AbstractFilter.prototype );
    PIXI.CrossHatchFilter.prototype.constructor = PIXI.BlurYFilter;

    Object.defineProperty(PIXI.CrossHatchFilter.prototype, 'blur', {
        get: function() {
            return this.uniforms.blur.value / (1/7000);
        },
        set: function(value) {
            //this.padding = value;
            this.uniforms.blur.value = (1/7000) * value;
        }
    });

    /**
     * @author Mat Groves http://matgroves.com/ @Doormat23
     */

    PIXI.RGBSplitFilter = function()
    {
        PIXI.AbstractFilter.call( this );

        this.passes = [this];

        // set the uniforms
        this.uniforms = {
            red: {type: '2f', value: {x:20, y:20}},
            green: {type: '2f', value: {x:-20, y:20}},
            blue: {type: '2f', value: {x:20, y:-20}},
            dimensions:   {type: '4fv', value:[0,0,0,0]}
        };

        this.fragmentSrc = [
            'precision mediump float;',
            'varying vec2 vTextureCoord;',
            'varying vec4 vColor;',
            'uniform vec2 red;',
            'uniform vec2 green;',
            'uniform vec2 blue;',
            'uniform vec4 dimensions;',
            'uniform sampler2D uSampler;',

            'void main(void) {',
            '   gl_FragColor.r = texture2D(uSampler, vTextureCoord + red/dimensions.xy).r;',
            '   gl_FragColor.g = texture2D(uSampler, vTextureCoord + green/dimensions.xy).g;',
            '   gl_FragColor.b = texture2D(uSampler, vTextureCoord + blue/dimensions.xy).b;',
            '   gl_FragColor.a = texture2D(uSampler, vTextureCoord).a;',
            '}'
        ];
    };

    PIXI.RGBSplitFilter.prototype = Object.create( PIXI.AbstractFilter.prototype );
    PIXI.RGBSplitFilter.prototype.constructor = PIXI.RGBSplitFilter;

    Object.defineProperty(PIXI.RGBSplitFilter.prototype, 'angle', {
        get: function() {
            return this.uniforms.blur.value / (1/7000);
        },
        set: function(value) {
            //this.padding = value;
            this.uniforms.blur.value = (1/7000) * value;
        }
    });

    /**
     * @author Mat Groves http://matgroves.com/ @Doormat23
     */

        if (typeof exports !== 'undefined') {
            if (typeof module !== 'undefined' && module.exports) {
                exports = module.exports = PIXI;
            }
            exports.PIXI = PIXI;
        } else if (typeof define !== 'undefined' && define.amd) {
            define(PIXI);
        } else {
            root.PIXI = PIXI;
        }
    }).call(this);
}
$(function(){function n(n,t){console.log("Particle Spawned!");var i=new PIXI.Sprite(W[0]);return i.interactive=i.buttonMode=!1,i.anchor.x=i.anchor.y=.5,i.position.x=n,i.position.y=t,i.ticks=0,i.limit=0+4*Math.random()-1|0,i.subImg=0,i.removed=!1,i.g=.02*Math.random(),i.v={x:w.randomFlip(.8),y:0},i.tick=function(){this.ticks++,this.ticks>this.limit&&(this.ticks=0,this.texture=W[this.subImg++%W.length]),this.rotation+=.001,this.subImg>=W.length&&this.kill(),this.move()},i.move=function(){this.v.y+=this.g,this.x+=this.v.x,this.y+=this.v.y},i.kill=function(){this.removed=!0},i}function t(t,i,o,e){if(window.running){if(!t||!i){var a=$("#lamp");if(a)try{for(var c=l?40:100,u=0;c>u;u++)if(t=a.position().left+Math.random()*a.width(),i=a.position().top+Math.random()*a.height(),P.contains(t,i)){i+=a.height()/4,console.log("Inside Polygon ["+t+"]["+i+"]! "+u+" attempts.");break}}catch(d){return window.running=!0,r(),void console.log(d)}}if(x){var h=new n(t,i),f=o||1;e&&(f+=Math.random()*(e-o)|0,0>f&&(f=-f)),h.scale.x=h.scale.y=f||1,B.push(h),U.addChild(h)}else s(t,i,o,e)}}function i(){t(null,null,1,2),x&&t(null,null,3,4)}function o(){b+=.4,l&&(b+=.3),b*=1.1;var n=8;if(b>n&&(b=n),x&&!l)for(var o=0;b/3>o;o++)t();x,i(),b>4&&!G&&(G=!0,setTimeout(r,1e3))}function e(){function n(){o(n)}function o(n){var o=$("#lamp");d+=u;var e=c+d,r=a;e>r&&(e=r-(e-r),1>h?(b+=d/(20*(3*h+1)),i(),i(),i()):(b-=d/(15*(1*h+1)),i()),t(),d=-(d/1.8),h++),o.css({top:e}),c=e,v>h?setTimeout(n,f*u):o.css({top:a})}var e=$("#lamp"),a=y.y,r=1.2*-e.height();e.css("top",r-200);var s=r,c=s,u=l?.4:.25,d=2,h=0,v=4;n()}function a(){function n(){o(n)}function t(){i(t)}function i(n){I++;for(var t=[],i=0;i<B.length;i++){var o=B[i];o.removed?U.removeChild(o):(o.tick(),t.push(o))}B=t,R.render(_),window.running&&setTimeout(n,p)}function o(n){g++;var t=$("#lamp");if(t){if(b>0){var i=Math.sin(g++/(5*m))*b*2;t.rotate(i)}b*=.99,.2>b&&(b=.2)}window.running&&setTimeout(n,f)}n(),console.log("Rendering Started!"),x&&(t(),console.log("Ticking Started!"))}function r(){if(A)return!1;A=!0;var n=3e3,t=$("#video_container"),i=$("#video_id");t.fadeIn(n,function(){window.running=!1;try{l||i[0].player.play()}catch(n){console.log(n)}}),$("#lamp").animate({opacity:0},n,function(){$(this).remove()}),$("#hand_id").animate({opacity:0},n/1.2,function(){z=!1,$("#hand_id").hide()}),x&&$(M).animate({opacity:0},n,function(){$(this).remove()})}function s(n,t){console.log("Spawning Jquery Particles");var i=$("<img>").attr({src:"img/"+K[N++%K.length]+".gif"});i.addClass("trail");var o=n-i.width()/2,e=t+2*i.height()+10,a=1e3,r=o+(6*Math.random()-3)*(a>>7),s=e+6*Math.random()*(a>>7),c={opacity:0,left:r,top:s};$(document.body).append(i),i.css({position:"absolute",left:o,top:e}).animate(c,a,function(){$(this).remove()})}var c=(~"localhost".indexOf(document.URL),"localhost".indexOf(document.URL));c=!1,console&&c||(console={log:function(){}});var l=!0;WURFL&&"Desktop"===WURFL.form_factor&&(l=!1);var u=960,d=window.innerHeight,h=20,f=1e3/h,v=25,p=1e3/v,g=0,m=1;window.running=!0;var y={x:70,y:200},w={isCanvasSupported:function(){var n=document.createElement("canvas");return!(!n.getContext||!n.getContext("2d"))},movePolygon:function(n,t,i){if(!(n.length<2))for(var o=0;o<n.length;o+=2)n[o]+=t,n[o+1]+=i},drawPolygon:function(n,t){if(!(t.length<2)){var i=n,o=0;for(i.moveTo(t[o++],t[o++]);o<t.length-1;)i.lineTo(t[o++],t[o++]);i.endFill()}},distance:function(n,t){var i=t.x-n.x,o=t.y-n.y;return Math.sqrt(i*i+o*o)},randomFlip:function(n){return n=Math.abs(n),2*Math.random()*n-n}},x=w.isCanvasSupported();w.isCanvasSupported=function(){return x},$("#lamp").rotate(0);var I=0,k=$("#container"),b=($("#lamp"),0),C=[0,100,420,0,740,50,750,250,510,350,300,350,0,160],P={data:C,points:function(){for(var n=[],t=0,i=C.length;i>t;t+=2)n.push({x:C[t],y:C[t+1]});return n}(),contains:function(n,t){for(var i=!1,o=0,e=this.points.length-1;o<this.points.length;e=o++){var a=this.points[o].x,r=this.points[o].y,s=this.points[e].x,c=this.points[e].y,l=r>t!=c>t&&(s-a)*(t-r)/(c-r)+a>n;l&&(i=!i)}return i}};if(x){var M,X=u||window.innerWidth,S=d||window.innerHeight,T="canvasContainer";M=document.createElement("canvas"),$("#"+T).append(M),M&&"object"==typeof M||(console.log("Canvas not available, using no canvas fallback."),w.isCanvasSupported=function(){return!1});var _=new PIXI.Stage(546),R=PIXI.autoDetectRenderer(X,S,M,!0);if(R.view.style.position="absolute",R.view.style.top="0px",R.view.style.left="0px",c){var F=new PIXI.Graphics;F.beginFill(60928,.1),w.movePolygon(C,y.x,y.y),w.drawPolygon(F,C),_.addChild(F)}var Y=l?6:12,E=0,L=!0,U=new PIXI.SpriteBatch;_.addChild(U);for(var O=PIXI.Texture.fromImage("img/sparkle_sheet.png"),W=[],j=32,q=32,D=0;8>D;D++)for(var H=0;4>H;H++)W.push(new PIXI.Texture(O,new PIXI.Rectangle(D*j,H*q,j,q)));var B=[]}var G=!1;k.on("click",function(){return o(),!1}),e(),a();var J=!0;!function(){function n(){J&&t.fadeIn(i,function(){t.fadeOut(i,n)})}var t=$("#glow"),i=1e3;t&&n()}();var z=!0,A=!1,K=["twinkle","gcspinny","sparkles29jc","sparkle"],N=0;!function(){function t(n){if(a){var t={x:n.pageX,y:n.pageY},i=w.distance(t,a);i>u/5&&(o(),a=t)}else a={x:n.pageX,y:n.pageY}}function i(i){if(window.running){t(i);var o={x:i.pageX,y:i.pageY};if(E++,Y>E)return!1;if(E=0,L)for(var e=0;h>e;e++){var a=new n(o.x+5*e,o.y);a.v.x+=.15*e,a.v.y+=.2,a.scale.x=a.scale.y=l?2:1,B.push(a),U.addChild(a)}return!1}}function e(n){if(window.running&&(t(n),s++,!(r>s))){s=0;var i=$("<img>").attr({src:"img/"+K[N++%K.length]+".gif"});i.addClass("trail");var o=n.pageX-i.width()/2,e=n.pageY-i.height()/2,a=1e3,c=o+(6*Math.random()-3)*(a>>7),l=e+6*Math.random()*(a>>7),u={opacity:0,left:c,top:l};return $(document.body).append(i),i.css({position:"absolute",left:o,top:e}).animate(u,a,function(){$(this).remove()}),!1}}var a,r=10,s=0,c=2,d=1,h=l?d:c;$(document).mousemove(function(n){return x?i(n):e(n),!1});try{$(document).on("touchmove",function(n){var t=n.originalEvent.touches[0]||n.originalEvent.changedTouches[0];return x?i(t):e(t),!1})}catch(f){console.log(f)}}(),l?$("#hand_id").hide():($("#hand_id").show(),$(document).mousemove(function(n){$("#hand_id").offset({left:n.pageX,top:n.pageY})}))});