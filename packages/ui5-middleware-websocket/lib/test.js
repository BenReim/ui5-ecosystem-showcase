const mount = require("./_mount");

/**
 * Middleware to test the web sockets support
 *
 * @param {object} parameters Parameters
 * @param {@ui5/logger/Logger} parameters.log Logger instance
 * @returns {Function} Middleware function to use
 */
module.exports = ({ log }) => {
	return mount("ui5-middleware-websocket-test", function (app) {
		app.ws("/", function (ws, req) {
			ws.on("message", function (msg) {
				log.info(`Message received: ${msg}`);
				ws.send(msg);
			});
			log.info(`Connection established with ${req.url}`);
		});
	});
};
