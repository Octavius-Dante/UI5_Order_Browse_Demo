sap.ui.define([
	"sap/ui/model/type/Currency"
], function (Currency) {
	"use strict";

	return {

		/**
		 * Rounds the currency value to 2 digits
		 *
		 * @public
		 * @param {string} sValue value to be formatted
		 * @returns {string} formatted currency value with 2 digits
		 */
		currencyValue: function (sValue) {
			if (!sValue) {
				return "";
			}
			return parseFloat(sValue).toFixed(2);
		},

		/**
		 * Rounds the currency value to 2 digits
		 *
		 * @public
		 * @param {number} iQuantity product quantity
		 * @param {number} fPrice product price
		 * @param {string} sCurrencyCode currency code for the price
		 * @returns {string} formatted currency value with 2 digits
		 */
		calculateItemTotal: function (iQuantity, fPrice, sCurrencyCode) {
			var oCurrency = new Currency({showMeasure: false});
			var fTotal = iQuantity * fPrice;
			return oCurrency.formatValue([fTotal.toFixed(2), sCurrencyCode], "string");
		},

		/**
		 * Converts a binary string into an image format suitable for the src attribute
		 *
		 * @public
		 * @param {string} vData a binary string representing the image data
		 * @returns {string} formatted string with image metadata based on the input or a default image when the input is empty
		 */
		handleBinaryContent: function(vData){
			if (vData) {
				var sMetaData1 = 'data:image/jpeg;base64,';
				var sMetaData2 = vData.substr(104); // stripping the first 104 bytes from the binary data when using base64 encoding.
				return sMetaData1 + sMetaData2;
			} else {
				return "../images/Employee.png";
			}
		},

		/**
		 * Provides a text to indicate the delivery status based on shipped and required dates
		 *
		 * @public
		 * @param {object} oRequiredDate required date of the order
		 * @param {object} oShippedDate shipped date of the order
		 * @returns {string} delivery status text from the resource bundle
		 */
		deliveryText: function (oRequiredDate, oShippedDate) {
			var oResourceBundle = this.getModel("i18n").getResourceBundle();

			if (oShippedDate === null) {
				return "None";
			}

			// delivery is urgent (takes more than 7 days)
			if (oRequiredDate - oShippedDate > 0 && oRequiredDate - oShippedDate <= 432000000) {
				return oResourceBundle.getText("formatterDeliveryUrgent");
			} else if (oRequiredDate < oShippedDate) { //d elivery is too late
				return oResourceBundle.getText("formatterDeliveryTooLate");
			} else { // delivery is in time
				return oResourceBundle.getText("formatterDeliveryInTime");
			}
		},

		/**
		 * Provides a semantic state to indicate the delivery status based on shipped and required dates
		 *
		 * @public
		 * @param {object} oRequiredDate required date of the order
		 * @param {object} oShippedDate shipped date of the order
		 * @returns {string} semantic state of the order
		 */
		deliveryState: function (oRequiredDate, oShippedDate) {
			if (oShippedDate === null) {
				return "None";
			}

			// delivery is urgent (takes more than 7 days)
			if (oRequiredDate - oShippedDate > 0 && oRequiredDate - oShippedDate <= 432000000) {
				return "Warning";
			} else if (oRequiredDate < oShippedDate) { // delivery is too late
				return "Error";
			} else { // delivery is in time
				return "Success";
			}
		},

		date_epoch_utc: function(InputDate){
			if (InputDate === null) {
				return "None";
			}else{
				// epoch date time logic. SAP Demo model
                /////////////////////////////////////////////////////////////////
				// Input date : /Date(1478991600000)/ ; Epoch date value
				// Output date : 11/20/2016 (MM/DD/YYYY) ; UTC date time
				var strDate = InputDate;
				// console.log(InputDate);
				// string operation to remove '/Date(' && ')/' from the value 				

				// Removal of Substring in date text '/Date('
				var strdate1 = strDate.replace('/Date(',''); 
				// console.log(strdate1);

				// Removal of Substring in date text ')/'
				var strdate2 = strdate1.replace(')/',''); 
				// console.log(strdate2);
				
				// conversion of string to number casting
				var epochTime = Number(strdate2);
				
				// Conversion of EPOCH time to regualr date
				// this will return -->> 'Sun Nov 20 2016 15:00:00 GMT-0800 (Pacific Standard Time)'				
				var test_Date = new Date(epochTime);
				// console.log(test_Date);				

				//This will return -->> 2023-10-11T20:05:00.000Z
				// const t3_date = test_Date.toJSON(); 
				
				// Conversion of regualr lengthy date to short date
				//This will return -->> 10/24/2023
				var Outputdate = test_Date.toLocaleDateString();
				return Outputdate;				
			}
		},

		date_epoch_utc_2 : function(InputDate){
			if (InputDate === null) {
				return "None";
			}else{
				// epoch date time logic. SAP Demo model
                /////////////////////////////////////////////////////////////////
				// Input date : /Date(1478991600000)/ ; Epoch date value
				// Output date : 11/20/2016 (MM/DD/YYYY) ; UTC date time
				var strDate = InputDate;
				// console.log(InputDate);
				// string operation to remove '/Date(' && ')/' from the value 				

				// Removal of Substring in date text '/Date('
				var strdate1 = strDate.replace('/Date(',''); 
				// console.log(strdate1);

				// Removal of Substring in date text ')/'
				var strdate2 = strdate1.replace(')/',''); 
				// console.log(strdate2);
				
				// conversion of string to number casting
				var epochTime = Number(strdate2);
				
				// Conversion of EPOCH time to regualr date
				// this will return -->> 'Sun Nov 20 2016 15:00:00 GMT-0800 (Pacific Standard Time)'				
				var test_Date = new Date(epochTime);
				// console.log(test_Date);				

				//This will return -->> 2023-10-11T20:05:00.000Z
				// const t3_date = test_Date.toJSON(); 
				
				// This will return -->> Sun Nov 13 2016
				var Outputdate = test_Date.toDateString();

				// Conversion of regualr lengthy date to short date
				// This will return -->> 10/24/2023
				// var Outputdate = test_Date.toLocaleDateString();				
				return Outputdate;				
			}
		}


	};
});