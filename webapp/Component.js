sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/resource/ResourceModel",
    "./controller/HelloDialog",
    "sap/ui/Device"
], function(
	UIComponent,
	JSONModel,
    ResourceModel,
    HelloDialog,
    Device
) {
	"use strict";

    return UIComponent.extend("sap.ui.demo.walkthrough.Component", {
        metadata: {
            // interfaces: ["sap.ui.core.IAsyncContentCreation"],
            manifest: "json"
        },
        init: function() {
            // Call the init function of the parent
            UIComponent.prototype.init.apply(this, arguments);
            // Set data models
            var oData = {
                recipient: {
                    name: "UI5"
                }
            };
            var oModel = new JSONModel(oData);
            this.setModel(oModel);
            // Set Dialog
            this._helloDialog = new HelloDialog(this.getRootControl());
            // Set device model
			var oDeviceModel = new JSONModel(Device);
			oDeviceModel.setDefaultBindingMode("OneWay");
			this.setModel(oDeviceModel, "device");
            // Create the views bsed on the url/hash
			this.getRouter().initialize();
        },
		getContentDensityClass : function () {
			if (!this._sContentDensityClass) {
				if (!Device.support.touch) {
					this._sContentDensityClass = "sapUiSizeCompact";
				} else {
					this._sContentDensityClass = "sapUiSizeCozy";
				}
			}
			return this._sContentDensityClass;
		},
        exit: function() {
            this._helloDialog.destroy();
            delete this._helloDialog;
        },
        openHelloDialog: function() {
            this._helloDialog.open();
        }
    })
});