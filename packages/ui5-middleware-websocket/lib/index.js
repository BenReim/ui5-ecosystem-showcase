const mount = require("./_mount");

const expressWs = require("express-ws");

/**
 * Simulates to be an express app to be able to add the WebSocket
 * support to the express server used underneath.
 *
 * @param {object} parameters Parameters
 * @param {@ui5/logger/Logger} parameters.log Logger instance
 * @returns {Function} Middleware function to use
 */
module.exports = ({ log }) => {
	// simulate a non-express app to get access to the app!
	return mount("ui5-middleware-websocket", (app) => {
		log.info(`WebSocket support added!`);
		expressWs(app);
	});
};
