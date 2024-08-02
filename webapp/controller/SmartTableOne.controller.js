sap.ui.define(
      [
          "sap/ui/core/mvc/Controller",
          "sap/ui/model/json/JSONModel"

      ],
      function(BaseController, JSONModel) {
        "use strict";
    
        return BaseController.extend("practice.controller.SmartTableOne", {
          onInit: function() {
            var oModel, oView;
            oView = this.getView();

            oModel = this.getOwnerComponent().getModel('dataT1');
            if (oModel) {
  
                oView.setModel(new JSONModel(oModel.getData().d.results),'ss');
                console.log(oModel.getData().d.results);
            } else {
                console.error("Model 'navList' not found");
            }

          },

          onBeforeExport: function (oEvt) {
            var mExcelSettings = oEvt.getParameter("exportSettings");
            // GW export
            if (mExcelSettings.url) {
              return;
            }
            // For UI5 Client Export --> The settings contains sap.ui.export.SpreadSheet relevant settings that be used to modify the output of excel
      
            // Disable Worker as Mockserver is used in Demokit sample --> Do not use this for real applications!
            mExcelSettings.worker = false;
          },
          onExit: function () {
            // this._oMockServer.destroy(this.getView());
          }
      
        });
      }
    );
    