sap.ui.define(
      [
          "sap/ui/core/mvc/Controller",
          "sap/m/Wizard"

      ],
      function(BaseController, Wizard) {
        "use strict";
        
        Wizard.CONSTANTS.MAXIMUM_STEPS = 12; // Example: Set to 12 or any number you need

        return BaseController.extend("practice.controller.WizardPractice", {
              // Override the MAXIMUM_STEPS constant

          onInit: function() {
          },


        });
      }
    );
    