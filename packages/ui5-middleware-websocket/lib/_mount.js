/**
 * This function installs an express app-like middleware function
 * to get access to the express app. This allows to install e.g.
 * the websocket support.
 *
 * @param {function} name name of the middleware function
 * @param {function} onMount callback function when the middleware has been mounted
 * @returns {Function} Middleware function to use
 */
module.exports = function mount(name, onMount) {
	// simulate a non-express app to get access to the app!
	const fn = function () {};
	Object.defineProperty(fn, "name", {
		value: name || "ui5-middleware-websocket-mount",
		writable: false,
	});
	(fn.handle = function websocket(req, res, next) {
		next(); // ignore requests
	}),
		(fn.set = () => {
			/* noop! */
		}),
		(fn.emit = (event, app) => {
			if (event === "mount" && typeof onMount === "function") {
				onMount(app, { mountpath: fn.mountpath /*, parent: fn.parent */ });
			}
		});
	return fn;
};
