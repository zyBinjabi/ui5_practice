sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent",
    "sap/tnt/ToolPage",
    "sap/ui/core/routing/Router",
    "sap/ui/core/Fragment",
    "sap/ui/core/Configuration"



  ],
  function (Controller,
    UIComponent,
    ToolPage,
    Router,
    Fragment,
    Configuration) {
    "use strict";

    return Controller.extend("practice.controller.App", {
      onInit: function () {
        var oUserModel = new sap.ui.model.json.JSONModel({
          isLoggedIn: false,
          email: "",
          password: ""
        });
        this.getView().setModel(oUserModel, "userModel");

      },

      onToggleTheme: function () {
        if (this.isDarkMode) {
          Configuration.setTheme("sap_horizon"); // Set to normal theme
          this.byId("themeToggleButton").setTooltip("Switch to Dark Mode");
          this.byId("themeToggleButton").setIcon("sap-icon://light-mode");
        } else {
          Configuration.setTheme("sap_horizon_dark"); // Set to dark theme
          this.byId("themeToggleButton").setTooltip("Switch to Light Mode");
          this.byId("themeToggleButton").setIcon("sap-icon://dark-mode");
        }
        this.isDarkMode = !this.isDarkMode;
      },


      onMenuButtonPress: function () {
        var toolPage = this.byId('toolPage');
        if (toolPage) {
          toolPage.setSideExpanded(!toolPage.getSideExpanded());
        }
      },

      onItemSelect: function (ev) {
        var oRouter = UIComponent.getRouterFor(this);
        oRouter.navTo(ev.getParameter('item').getKey())

      },

      openNotification: function (oEvent) {
        var oButton = oEvent.getParameter("button");
        var oView = this.getView();
        var _pPopover;

        // create popover
        if (!_pPopover && oView) {
          _pPopover = Fragment.load({
            id: oView.getId(),
            name: "practice.fragment.notification",
            controller: this
          }).then(function (oPopover) {
            oView.addDependent(oPopover);
            return oPopover;
          });
        }

        _pPopover.then(function (oPopover) {
          oPopover.openBy(oButton);
        });
      },

      onLoginPress: function () {
        var oUserModel = this.getView().getModel("userModel");
        var sEmail = oUserModel.getProperty("/email");
        var sPassword = oUserModel.getProperty("/password");

        // Here you would typically check the credentials
        if (sEmail === "zz" && sPassword === "zz") {
          oUserModel.setProperty("/isLoggedIn", true);
        } else {
          sap.m.MessageToast.show("Invalid credentials");
        }
      }

    });
  }
); 