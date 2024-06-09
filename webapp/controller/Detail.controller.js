sap.ui.define(
  [
    "sap/ui/demo/orderbrowser/controller/BaseController",
    "sap/ui/model/json/JSONModel",
    "sap/ui/demo/orderbrowser/util/formatter",
    "sap/m/library",
  ],
  function (BaseController, JSONModel, formatter, mobileLibrary) {
    "use strict";

    // shortcut for sap.m.URLHelper
    var URLHelper = mobileLibrary.URLHelper;

    return BaseController.extend("sap.ui.demo.orderbrowser.controller.Detail", {
      formatter: formatter,

      /* =========================================================== */
      /* lifecycle methods                                           */
      /* =========================================================== */

      onInit: function () {

        // Defining a local view JSON model for screen variables 
        var oDviewModel = new JSONModel({
// Header section			
		  OrderID:"",
          CompanyName: "",
          OrderDate: "",
          ShippedDate: "",
          totalOrderAmount: 0,
          currency: "",
// Shipping section 
		  ShipName:"",
		  ShipAddress:"",
		  ShipPostalCode:"",
		  ShipCity:"",
		  ShipRegion:"",
		  ShipCountry:"",
// Processor section
		  FirstName:"",
		  LastName:"",
		  EmployeeID:"",
		  JobTitle:"",
		  HomePhone:""
        });

		this.setModel(oDviewModel, "detailView");

// local variables for getting data from model file 

// Header section variables 		
			var valTotal = 0,
			valCompany, 
			valOrderID, 
			valOrderDate, 
			valShippedDate,
			valCurrency,
			oResourceBundle = this.getResourceBundle(), // Text Resource 			
// Shipping section variables
			valShipName,
			valShipAddress,
			valShipPostalCode,
			valShipCity,
			valShipRegion,
			valShipCountry,
// Processor section variables
			valFirstName,
			valLastName,
			valEmployeeID,
			valJobTitle,
			valHomePhone,
			valCustomerID;

// Test check variables for display 
			valTotal = 9999;
			valCompany = 'Dante';
			valOrderID = 'Test Order Tesla';			
			valOrderDate = '12/13/2024';
			valShippedDate = '12/13/2024';
			valCurrency = "Riyadh";

			valShipName = "Dante Shipping corp";
			valShipAddress = "Gilven lake, Rocky valley";
			valShipPostalCode = "RTX 5090";
			valShipCity = "Harisburg";
			valShipRegion = "Pensylvania";
			valShipCountry = "USA";

			valFirstName = "Artyom";
			valLastName = "Sasha";
			valEmployeeID = "609879-8860";
			valJobTitle = "Developer";
			valHomePhone = "2368663920";
			
			valCustomerID = "BERG";

// header section values 
			oDviewModel.setProperty("/totalOrderAmount", valTotal);
			oDviewModel.setProperty("/CompanyName", valCompany);
			oDviewModel.setProperty("/OrderID", valOrderID);
			oDviewModel.setProperty("/OrderDate", valOrderDate);
			oDviewModel.setProperty("/ShippedDate", valShippedDate);
			oDviewModel.setProperty("/currency", valCurrency);

// shipping section values 
			oDviewModel.setProperty("/ShipName", valShipName);
			oDviewModel.setProperty("/ShipAddress", valShipAddress);
			oDviewModel.setProperty("/ShipPostalCode", valShipPostalCode);
			oDviewModel.setProperty("/ShipCity", valShipCity);
			oDviewModel.setProperty("/ShipRegion", valShipRegion);
			oDviewModel.setProperty("/ShipCountry", valShipCountry);

// processor section values 
			oDviewModel.setProperty("/FirstName", valFirstName);
			oDviewModel.setProperty("/valLastName", valLastName);
			oDviewModel.setProperty("/EmployeeID", valEmployeeID);
			oDviewModel.setProperty("/JobTitle", valJobTitle);
			oDviewModel.setProperty("/HomePhone", valHomePhone);

			// Setting mail button variables 
			oDviewModel.setProperty("/shareSendEmailSubject",
			oResourceBundle.getText("shareSendEmailObjectSubject", [valOrderID]));
			oDviewModel.setProperty("/shareSendEmailMessage",
			oResourceBundle.getText("shareSendEmailObjectMessage", [valOrderID, valOrderID, location.href, 
			valShipName, valEmployeeID, valCustomerID]));			

      },


		// Event handler when the share by E-Mail button has been clicked		 
		onSendEmailPress : function () {
			var oViewModel = this.getModel("detailView");

			URLHelper.triggerEmail(
				null,
				oViewModel.getProperty("/shareSendEmailSubject"),
				oViewModel.getProperty("/shareSendEmailMessage")
			);
		},

		_onHandleTelephonePress : function (oEvent){
			var sNumber = oEvent.getSource().getText();
			URLHelper.triggerTel(sNumber);
		},

		/**
		 * Set the full screen mode to false and navigate to master page
		 */
		onCloseDetailPress: function () {
			this.getModel("appView").setProperty("/actionButtonsInfo/midColumn/fullScreen", false);
			// No item should be selected on master after detail page is closed
			this.getOwnerComponent().oListSelector.clearMasterListSelection();
			this.getRouter().navTo("master");
		},

		/**
		 * Toggle between full and non full screen mode.
		 */
		toggleFullScreen: function () {
			var bFullScreen = this.getModel("appView").getProperty("/actionButtonsInfo/midColumn/fullScreen");
			this.getModel("appView").setProperty("/actionButtonsInfo/midColumn/fullScreen", !bFullScreen);
			if (!bFullScreen) {
				// store current layout and go full screen
				this.getModel("appView").setProperty("/previousLayout", this.getModel("appView").getProperty("/layout"));
				this.getModel("appView").setProperty("/layout", "MidColumnFullScreen");
			} else {
				// reset to previous layout
				this.getModel("appView").setProperty("/layout",  this.getModel("appView").getProperty("/previousLayout"));
			}

		}


    });
  }
);
