define(['websocket','crypto-js/aes', 'crypto-js/sha1', 'crypto-js/enc-utf8'],function (websocket, aes, sha1, utf8) {

	var 
		exports = {},

		reDigits = /^\d+$/;

	// Namespace websocket
	exports.io = websocket;

	// Namespace SHA1
	exports.SHA1 = function (string) {
		return sha1(string).toString();
	};

	// Namespace encode
	exports.AES = {
		decrypt: function (string, fgh) {
			return aes.decrypt(string, fgh).toString(utf8);
		},
		
		encrypt: function (string, fgh) {
			return aes.encrypt(string, fgh).toString();
		}
	};

	exports.ssplit = function (string, seperator) {
		var components = string.split(seperator);
		return [components.shift(), components.join(seperator)];
	};

	exports.activeElement = function () {
		try { return document.activeElement; } catch (e) {}
	};

	/**
	 * Removes all characters but 0 - 9 from given string.
	 *
	 * @method digits
	 * @param {String} str The string to sanitize
	 * @return {String} The sanitized string
	 * @example
	 * 	$.digits('foo8bar'); // `8`
	 * 	$.digits('->#5*duckM4N!!!111'); // `54111`
	 */
	exports.isDigits = function(value) {
		return reDigits.test(value);
	};

	/**
	 * A very simple templating function.
	 * @param  {} str [description]
	 * @param  {[type]} map [description]
	 * @return {[type]}     [description]
	 */
	exports.template = function (str, map) {
		return str && str.replace(/{(\w+)}/gi, function(outer, inner) {
			return map.hasOwnProperty(inner) ? map[inner] : outer /* '' */;
		});
	};

	exports.getJSON = function (path, onSuccess, onError) {
		var data, request = new XMLHttpRequest();
		request.open('GET', path, true);

		request.onreadystatechange = function() {
			if (this.readyState === 4) {
				if (this.status >= 200 && this.status < 400) {
					try {
						onSuccess && onSuccess(JSON.parse(this.responseText));
					} catch (e) {
						onError && onError();
					}
				} else {
					onError && onError();
				}
			}
		};

		request.send();
		request = null;
	};

	// Part of this is originating from mustasche.js
	// Code: 		https://github.com/janl/mustache.js/blob/master/mustache.js#L43
	// License: 	https://github.com/janl/mustache.js/blob/master/LICENSE
	exports.escapeHtml = (function () {
		var pattern = /[&<>"'\/]/g,
			entities = {
				'&': '&amp;',
				'<': '&lt;',
				'>': '&gt;',
				'"': '&quot;',
				"'": '&#39;',
				'/': '&#x2F;'
			};

		return function (string) {
			return String(string).replace(pattern, function (s) {
				return entities[s];
			});
		};
	}());

	return exports;

});
