sap.ui.define(["ui5/ecosystem/demo/app/controller/BaseController", "sap/ui/model/json/JSONModel", "sap/m/MessageToast"], (Controller, JSONModel, MessageToast) => {
	"use strict";

	return Controller.extend("ui5.ecosystem.demo.app.controller.Main", {
		// (live) transpiling async functions to ES5 generators not yet doable in ui5-tooling ecosys :)
		/* async */ onInit() {
			var versionModel = new JSONModel();
			this.getView().setModel(versionModel, "UI5Version");

			sap.ui.getVersionInfo({ async: true }).then((versionInfo) => {
				versionModel.setData({
					current: versionInfo.libraries.find((lib) => lib.name === "sap.ui.core"),
				});
			});

			fetch("docs/index.md")
				.then((response) => response.text())
				.then((content) => {
					this.byId("doc").setValue(content);
				})
				.catch((err) => console.error(err));

			fetch("/proxy/local/hello.txt")
				.then((response) => response.text())
				.then((content) => {
					console.log(content);
				})
				.catch((err) => console.error(err));
		},

		navFwd() {
			return this.getOwnerComponent().getRouter().navTo("RouteOther");
		},
		navTest3rd() {
			return this.getOwnerComponent().getRouter().navTo("RouteThirdparty");
		},

		onPress(oEvent) {
			MessageToast.show(`${oEvent.getSource().getId()} pressed`);
		},
		onBoo() {
			MessageToast.show(`👻`);
		},
		testWebSocket() {
			if (!this.ws) {
				const socket = (this.ws = new WebSocket(`ws${location.protocol === "https:" ? "s" : ""}://${location.host}`));
				socket.onopen = function (event) {
					console.log("WebSocket.onopen", event);
					MessageToast.show(`ℹ [WS] Connection established (url=${event.target.url})`, {
						duration: 750,
						animationDuration: 250,
					});
					setTimeout(function () {
						socket.send("Hello! 👋");
					}, 1000);
				};
				socket.onmessage = function (event) {
					console.log("WebSocket.onmessage", event);
					MessageToast.show(`ℹ [WS] Server responded: ${event.data}`);
				};
				socket.onclose = function (event) {
					if (event.wasClean) {
						MessageToast.show(`ℹ [WS] Connection closed (code=${event.code} reason=${event.reason})`);
					} else {
						MessageToast.show(`⚠️ [WS] Connection died`);
					}
				};
				socket.onerror = function (error) {
					MessageToast.show(`⚠️ [WS] Error occurred: ${error}`);
				};
			} else {
				this.ws.send("Hello! 👋");
			}
		},
	});
});
