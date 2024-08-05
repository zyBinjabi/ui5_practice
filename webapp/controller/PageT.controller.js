
    sap.ui.define(['sap/ui/core/mvc/Controller', 'sap/m/MessageToast'],
	function(Controller, MessageToast) {
	"use strict";

	var PageController = Controller.extend("practice.controller.PageT", {
		press : function(evt) {
			MessageToast.show("The GenericTag is pressed.");
		}
	});

	return PageController;
});