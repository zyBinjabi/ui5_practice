sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"

  ],
  function (BaseController, MessageToast) {
    "use strict";

    return BaseController.extend("practice.controller.Login", {
      onInit: function () {
      },
      onLogin: function () {
        var oView = this.getView();
        var sEmail = oView.byId("emailInput").getValue();
        var sPassword = oView.byId("passwordInput").getValue();

        // Basic validation
        if (!sEmail || !sPassword) {
          MessageToast.show("Please enter both email and password.");
          return;
        }

        // Handle login logic here
        // For demonstration, just show a success message
        MessageToast.show("Login successful!");

        // In real scenarios, you would handle authentication here
      }

    });
  }
);
