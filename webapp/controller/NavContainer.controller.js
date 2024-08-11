sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    'sap/m/MessageToast'
  ],
  function (BaseController, MessageToast) {
    "use strict";

    return BaseController.extend("practice.controller.NavContainer", {
      onInit: function () {



      },

      onNavigationFinished: function (evt) {
        var toPage = evt.getParameter("to");
        MessageToast.show("Navigation to page '" + toPage.getTitle() + "' finished");
      },

      handleNav: function (evt) {
        var navCon = this.byId("navCon");
        var target = evt.getSource().data("target");
        if (target) {
          var animation = this.byId("animationSelect").getSelectedKey();
          navCon.to(this.byId(target), animation);
        } else {
          navCon.back();
        }
      }

      // ================================== # On Functions # ==================================


      // ================================== # Get Functions # ==================================


      // ================================== # Helper Functions # ==================================






    });
  }
);
